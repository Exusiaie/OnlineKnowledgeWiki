#!/usr/bin/env node

/**
 * ============================================================
 * generate-index.js —— 自动扫描 content/ 目录，生成 index.json
 * ============================================================
 *
 * ## 用途
 *
 * 扫描 `content/` 下所有 Markdown 文件，读取每个文件的 YAML Frontmatter，
 * 自动生成 Renderer 所需的 `index.json`（侧边栏 + 首页卡片 + 分类结构）。
 *
 * 从此更新知识库只需要一步：
 *
 *   1. 在 content/ 对应分类下新建或编辑 .md 文件
 *   2. 运行 node generate-index.js
 *   3. 刷新浏览器
 *
 * ## 使用方式
 *
 *   node generate-index.js
 *
 * ## 依赖
 *
 *   Node.js（任意版本，无额外 npm 依赖，仅使用内置 fs/path 模块）
 *
 * ## 工作原理
 *
 *   1. 读取已有的 index.json 中的 site 配置（保留不覆盖）
 *   2. 递归扫描 content/ 下的所有 .md 文件
 *   3. 解析每个文件的 YAML Frontmatter（title / category / tags / order / icon / desc）
 *   4. 按 category 字段将文章归入对应分类
 *   5. 自动提取描述（优先用 frontmatter 中的 desc，否则取正文首段）
 *   6. 按 order 字段排序每个分类下的文章
 *   7. 生成 nav 树和 home.cards 列表
 *   8. 写入 index.json
 *
 * ## Frontmatter 约定
 *
 *   每个 .md 文件的 Frontmatter 应包含以下字段：
 *
 *   ---
 *   title: 文章标题（必填，用于侧边栏和卡片）
 *   category: 所属分类（必填，如 "Python / 数据科学"）
 *   tags: [标签1, 标签2]        （可选，用于搜索索引）
 *   order: 1                     （可选，同分类内的排序，默认为 0）
 *   icon: 🐍                     （可选，emoji 图标，默认 📄）
 *   desc: 简短描述                （可选，卡片描述，不填则自动取正文首段）
 *   ---
 *
 * ## 分类索引文件约定
 *
 *   每个分类子目录需包含一个 index.md，其 Frontmatter 中的 title 和 icon
 *   将被用作该分类在侧边栏中的显示名和图标。order 字段决定分类的排列顺序。
 *
 * ============================================================
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ============================================================
// 全局常量
// ============================================================

/** content 目录路径 */
const CONTENT_DIR = path.join(__dirname, 'content');

/** 输出文件路径 */
const OUTPUT_FILE = path.join(__dirname, 'index.json');

/** 首页卡片的颜色轮播（按顺序循环分配，保证每张卡片视觉不单调） */
const COLOR_PALETTE = [
  'green', 'blue', 'orange', 'purple',
  'red', 'teal', 'indigo', 'brown'
];

// ============================================================
// 工具函数
// ============================================================

/**
 * 解析 Markdown 文件中的 YAML Frontmatter
 *
 * Frontmatter 格式：
 *   ---
 *   key: value
 *   ---
 *   Markdown 正文...
 *
 * @param {string} raw - 完整的 .md 文件原始内容
 * @returns {{ meta: object, body: string }}
 *   - meta: 解析出的键值对（title / category / tags / order / icon / desc）
 *   - body: Frontmatter 之后的 Markdown 正文
 */
function parseFrontmatter(raw) {
  const meta = {};
  let body = raw;

  // 用正则匹配开头的 --- ... --- 块
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    // 没有 Frontmatter，整个内容都是正文
    return { meta, body };
  }

  const yamlBlock = match[1];
  body = match[2];

  // 逐行解析 key: value 格式（支持简单 YAML 子集）
  yamlBlock.split('\n').forEach(line => {
    const kv = line.match(/^\s*(\w+)\s*:\s*(.+?)\s*$/);
    if (!kv) return;

    const key = kv[1];
    let val = kv[2].trim();

    // 去掉首尾引号（单引号或双引号）
    val = val.replace(/^['"]|['"]$/g, '');

    // 数组解析：[tag1, tag2]
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1)
        .split(',')
        .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    }
    // 数字解析
    else if (/^\d+(\.\d+)?$/.test(val)) {
      val = parseFloat(val);
    }

    meta[key] = val;
  });

  return { meta, body };
}

/**
 * 从 Markdown 正文中自动提取描述
 *
 * 规则：
 *  1. 跳过 # 开头的标题行
 *  2. 跳过空行
 *  3. 取第一个非空的普通段落，截断到 40 个字符
 *
 * @param {string} body - Frontmatter 之后的 Markdown 正文
 * @returns {string} 提取出的描述文本
 */
function extractDescription(body) {
  if (!body) return '暂无描述';

  const lines = body.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    // 跳过标题行（# 开头）
    if (trimmed.startsWith('#')) continue;
    // 跳过空行
    if (trimmed === '') continue;
    // 跳过代码块标记
    if (trimmed.startsWith('```')) continue;
    // 跳过表格行
    if (trimmed.startsWith('|')) continue;

    // 找到第一个有效段落，去掉行内 Markdown 标记后截断
    const clean = trimmed
      .replace(/[*_`~\[\]]/g, '')   // 去掉粗体、斜体、代码、链接标记
      .replace(/^[-*+]\s+/, '')     // 去掉无序列表前缀
      .replace(/^\d+\.\s+/, '');    // 去掉有序列表前缀

    if (clean.length > 0) {
      return clean.length > 40 ? clean.slice(0, 40) + '...' : clean;
    }
  }

  return '暂无描述';
}

/**
 * 将路径中的非法字符替换为连字符，生成 URL 安全的路径片段
 *
 * 例如："Python / 数据科学" → "python-数据科学"
 *       "HTML / CSS"        → "html-css"
 *
 * @param {string} str - 原始分类名或文章名
 * @returns {string} URL 安全路径片段
 */
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\s*\/\s*/g, '-')   // 斜杠替换为连字符
    .replace(/[^\w一-鿿-]/g, '') // 保留字母、中文、数字、连字符
    .replace(/-+/g, '-')         // 合并连续连字符
    .replace(/^-|-$/g, '');      // 去掉首尾连字符
}

// ============================================================
// 主流程
// ============================================================

console.log('🔍 扫描 content/ 目录...\n');

// --- 步骤 1：读取已有的 site 配置（保留站点基本信息） ---
let siteConfig = {
  title: '知识库',
  subtitle: '',
  theme: 'runoob-like',
  primaryColor: '#5FB878',
  logoIcon: '✎',
  footer: ''
};

if (fs.existsSync(OUTPUT_FILE)) {
  try {
    const existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
    if (existing.site) {
      // 保留用户已有的 site 设置，避免每次覆盖
      // 如果字段缺失，用默认值补齐
      siteConfig = { ...siteConfig, ...existing.site };
    }
  } catch (e) {
    console.warn('⚠  读取现有 index.json 失败，使用默认 site 配置。');
  }
}

// --- 步骤 2：递归扫描 content/ 下所有 .md 文件 ---

/**
 * 递归收集目录下的所有文件路径
 * @param {string} dir - 要扫描的目录
 * @returns {string[]} 文件路径数组
 */
function getAllFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

const allMdFiles = getAllFiles(CONTENT_DIR);

// --- 步骤 3：解析所有 .md 文件的 Frontmatter ---

/** @type {Array<{ filePath: string, relativePath: string, isIndex: boolean, meta: object, desc: string }>} */
const parsedFiles = [];

for (const filePath of allMdFiles) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { meta, body } = parseFrontmatter(raw);

  // 相对于 content/ 的路径（如 "python/django.md"）
  const relativePath = path.relative(CONTENT_DIR, filePath).replace(/\\/g, '/');
  // 文件名（不含扩展名）
  const fileName = path.basename(filePath, '.md');
  // 是否是分类索引文件
  const isIndex = (fileName === 'index');

  // 自动提取描述
  const desc = meta.desc || extractDescription(body);

  parsedFiles.push({
    filePath,
    relativePath,
    isIndex,
    meta: {
      title:    meta.title    || fileName,
      category: meta.category || '',
      tags:     meta.tags     || [],
      order:    meta.order    || 0,
      icon:     meta.icon     || '📄',
      ...(meta.color ? { color: meta.color } : {})
    },
    desc
  });

  console.log(`  📄 ${relativePath}  →  "${meta.title || fileName}"`);
}

// --- 步骤 4：按 category 分组 ---

/**
 * 分类 Map 结构：
 *   categoryName → {
 *     title: string,     // 分类显示名（取自 index.md）
 *     icon: string,      // 分类图标（取自 index.md）
 *     order: number,     // 分类排序
 *     categoryPath: string,  // URL 路径（如 /python）
 *     indexMeta: object, // index.md 的完整 meta
 *     articles: []       // 该分类下的文章列表（不含 index.md）
 *   }
 */
const categoryMap = new Map();

// 第一轮：处理所有 index.md，建立分类元信息
for (const entry of parsedFiles) {
  if (!entry.isIndex) continue;

  const categoryName = entry.meta.category || entry.meta.title;
  // 从文件路径提取分类目录名（如 content/python/index.md → python）
  const dirName = path.dirname(entry.relativePath); // "python"

  categoryMap.set(categoryName, {
    title:        entry.meta.title || categoryName,
    icon:         entry.meta.icon || '📁',
    order:        entry.meta.order || 0,
    categoryPath: '/' + dirName,   // "/python"
    indexMeta:    entry.meta,
    articles:     []
  });
}

// 第二轮：将非 index 文章归入对应分类
for (const entry of parsedFiles) {
  if (entry.isIndex) continue;

  const categoryName = entry.meta.category;
  const category = categoryMap.get(categoryName);

  if (category) {
    category.articles.push(entry);
  } else {
    // 分类不存在（该分类可能缺少 index.md），自动创建
    console.warn(`  ⚠  分类 "${categoryName}" 缺少 index.md，自动归入未分类`);
    const dirName = path.dirname(entry.relativePath);
    if (!categoryMap.has('未分类')) {
      categoryMap.set('未分类', {
        title: '未分类',
        icon: '📂',
        order: 999,
        categoryPath: '/uncategorized',
        indexMeta: {},
        articles: []
      });
    }
    categoryMap.get('未分类').articles.push(entry);
  }
}

// --- 步骤 5：按 order 排序 ---

// 分类按 order 排序
const sortedCategories = [...categoryMap.entries()]
  .sort((a, b) => a[1].order - b[1].order);

// 每个分类内的文章按 order 排序
for (const [, category] of sortedCategories) {
  category.articles.sort((a, b) => a.meta.order - b.meta.order);
}

// --- 步骤 6：构建 nav 树 ---

const nav = [
  // 始终将"首页"放在第一位
  { title: '首页', icon: '🏠', path: '/' }
];

for (const [categoryName, category] of sortedCategories) {
  const children = category.articles.map(article => {
    // 生成 URL 路径：/分类目录/文件名
    const dirName = path.dirname(article.relativePath);    // "python"
    const baseName = path.basename(article.relativePath, '.md'); // "django"
    const pagePath = '/' + dirName + '/' + baseName;       // "/python/django"

    return {
      title: article.meta.title,
      path:  pagePath,
      file:  article.relativePath,
      icon:  article.meta.icon || '📄',
      order: article.meta.order || 0
    };
  });

  nav.push({
    title: category.title,
    icon:  category.icon,
    path:  category.categoryPath,
    children
  });
}

// --- 步骤 7：构建 home.cards ---

const cards = [];
let colorIndex = 0; // 用于颜色轮播

for (const [, category] of sortedCategories) {
  for (const article of category.articles) {
    cards.push({
      title: article.meta.title,
      desc:  article.desc,
      icon:  article.meta.icon || '📄',
      path:  '/' + path.dirname(article.relativePath) + '/' +
             path.basename(article.relativePath, '.md'),
      color: article.meta.color || COLOR_PALETTE[colorIndex % COLOR_PALETTE.length]
    });
    colorIndex++;
  }
}

// --- 步骤 8：组装最终 JSON 并写入 ---

const indexJSON = {
  site: siteConfig,
  nav,
  home: { cards }
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(indexJSON, null, 2) + '\n', 'utf-8');

// --- 步骤 9：输出统计 ---

const categoryCount = sortedCategories.length;
const articleCount  = parsedFiles.filter(f => !f.isIndex).length;
const cardCount     = cards.length;

console.log('\n✅ index.json 已生成！');
console.log(`   分类：${categoryCount} 个`);
console.log(`   文章：${articleCount} 篇`);
console.log(`   卡片：${cardCount} 张`);
console.log(`   输出：${OUTPUT_FILE}\n`);
