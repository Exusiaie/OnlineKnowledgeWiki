---
title: SQLite
category: 数据库
tags: [数据库, sqlite, 嵌入式]
order: 5
icon: 📱
---

# SQLite 嵌入式关系型数据库教程

## 概述

SQLite 是一个嵌入式的关系型数据库引擎，以其零配置、轻量级和自包含的特性著称。与 MySQL、PostgreSQL 等客户端-服务器架构的数据库不同，SQLite 直接嵌入到应用程序进程中，数据存储在一个单独的磁盘文件中。它是世界上部署最广泛的数据库引擎，运行在每一台智能手机和大多数电脑上。

## 为什么使用 SQLite

- **嵌入式**：不需要单独的服务器进程，直接链接到应用中
- **单文件**：整个数据库存储在一个文件中，备份和迁移极其简单
- **零配置**：无需安装、配置和管理，开箱即用
- **ACID 兼容**：支持完整的事务特性
- **跨平台**：文件格式跨平台兼容，32 位和 64 位系统通用
- **适合移动端**：Android 和 iOS 原生支持

## 安装与使用

```bash
# 大多数系统已预装 sqlite3
sqlite3 --version

# 创建/打开数据库
sqlite3 myapp.db

# SQLite CLI 命令
.help          # 查看帮助
.tables        # 查看所有表
.schema        # 查看建表语句
.mode column   # 列对齐输出
.headers on    # 显示列标题
.quit          # 退出
```

## 基础操作

```sql
-- 创建表
CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE note_tags (
    note_id INTEGER,
    tag_id INTEGER,
    PRIMARY KEY (note_id, tag_id),
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- 插入数据
INSERT INTO notes (title, content) VALUES
    ('购物清单', '牛奶、面包、鸡蛋'),
    ('会议纪要', '讨论了下一季度的项目计划'),
    ('学习笔记', 'SQLite 是一个嵌入式数据库');

INSERT INTO tags (name) VALUES ('个人'), ('工作'), ('学习');

INSERT INTO note_tags VALUES (1, 1), (2, 2), (3, 3), (3, 1);

-- 查询数据
SELECT * FROM notes;

-- 带条件的查询
SELECT * FROM notes WHERE title LIKE '%笔记%';

-- JOIN 查询
SELECT n.title, n.content, t.name AS tag
FROM notes n
JOIN note_tags nt ON n.id = nt.note_id
JOIN tags t ON nt.tag_id = t.id;

-- 更新数据
UPDATE notes SET content = '牛奶、面包、鸡蛋、水果' WHERE id = 1;

-- 删除数据
DELETE FROM notes WHERE id = 2;

-- 外键约束需要手动开启
PRAGMA foreign_keys = ON;
```

## 数据类型

SQLite 使用动态类型系统，但提供了类型亲和性（Type Affinity）：

```sql
-- SQLite 的存储类别
-- NULL, INTEGER, REAL, TEXT, BLOB

CREATE TABLE demo (
    id INTEGER PRIMARY KEY,  -- 自动作为 ROWID 别名
    name TEXT,                -- 文本
    age INTEGER,              -- 整数
    score REAL,               -- 浮点数
    data BLOB                 -- 二进制
);
```

## 事务与性能

```sql
-- 开启事务
BEGIN TRANSACTION;

INSERT INTO notes (title, content) VALUES ('Note 1', 'Content 1');
INSERT INTO notes (title, content) VALUES ('Note 2', 'Content 2');
INSERT INTO notes (title, content) VALUES ('Note 3', 'Content 3');

-- 提交事务
COMMIT;

-- 或者回滚
-- ROLLBACK;

-- 性能优化建议
PRAGMA journal_mode = WAL;       -- Write-Ahead Logging
PRAGMA synchronous = NORMAL;     -- 降低同步频率
PRAGMA cache_size = -8000;       -- 设置缓存大小（KB）
PRAGMA foreign_keys = ON;        -- 开启外键约束
```

## Python 中使用 SQLite

```python
import sqlite3

# 连接数据库（如果不存在则创建）
conn = sqlite3.connect('myapp.db')
cursor = conn.cursor()

# 创建表
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
    )
''')

# 插入数据
cursor.execute(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    ('Alice', 'alice@example.com')
)

# 批量插入
users = [('Bob', 'bob@example.com'), ('Charlie', 'charlie@example.com')]
cursor.executemany('INSERT INTO users (name, email) VALUES (?, ?)', users)

# 查询数据
cursor.execute('SELECT * FROM users')
for row in cursor.fetchall():
    print(row)

# 提交更改
conn.commit()

# 关闭连接
conn.close()
```

## 核心特性

- **嵌入式**：无需服务器，直接嵌入应用程序
- **单文件**：整个数据库是一个跨平台的文件
- **零配置**：无需安装和管理
- **ACID 兼容**：支持完整的事务（原子性、一致性、隔离性、持久性）
- **适合移动端**：Android、iOS 原生支持
- **全文搜索**：FTS5 扩展模块
- **JSON 支持**：内置 JSON 函数（3.9+）
- **空间数据**：R-Tree 扩展

## 适用场景

- **移动应用**：Android、iOS App 的本地数据存储
- **桌面应用**：浏览器（Chrome、Firefox）、邮件客户端的配置和缓存
- **嵌入式设备**：IoT 设备、机顶盒、汽车系统
- **小型 Web 应用**：低流量网站和小型项目
- **数据交换格式**：作为应用文件格式（替代 JSON/CSV）

## 不适用场景

- **高并发写入**：SQLite 使用数据库级锁，不适合大量并发写入
- **大型 Web 应用**：需要水平扩展和多节点部署
- **网络共享**：文件系统锁在网络文件系统上不可靠

## 总结

SQLite 是世界上最被低估却部署最广泛的数据库。它简单、可靠、无处不在。对于移动开发、原型设计和小型项目，SQLite 是完美的数据存储方案。正如其官网所说：SQLite 不作为 MySQL 或 PostgreSQL 的替代品，而是 fopen() 的替代品。
