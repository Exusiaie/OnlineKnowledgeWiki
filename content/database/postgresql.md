---
title: PostgreSQL
category: 数据库
tags: [数据库, postgresql, sql, 高级]
order: 4
icon: 🐘
---

# PostgreSQL 高级关系型数据库教程

## 概述

PostgreSQL（简称 PG）是世界上功能最丰富的开源关系型数据库管理系统。它诞生于加州大学伯克利分校的 POSTGRES 项目，经过 30 多年的发展，已成为企业级应用的强力选择。PG 以其对 SQL 标准的严格遵循、强大的扩展性和高级特性（JSONB、全文搜索、窗口函数等）著称。

## MySQL vs PostgreSQL

| 特性 | MySQL | PostgreSQL |
|------|-------|------------|
| SQL 标准 | 部分遵循 | 高度遵循 |
| JSON 支持 | JSON 类型 | JSONB（二进制、可索引） |
| 全文搜索 | 内置 | 内置（更强大） |
| 并发控制 | MVCC | MVCC（更先进） |
| 扩展性 | 有限 | 极其丰富（自定义类型、操作符） |
| 地理空间 | 基本 | PostGIS（业界领先） |

## 安装与连接

```bash
# 安装 PostgreSQL（macOS）
brew install postgresql

# 安装 PostgreSQL（Ubuntu）
sudo apt install postgresql postgresql-contrib

# 启动服务
brew services start postgresql

# 连接
psql -U postgres
```

## 基础操作

```sql
-- 创建数据库
CREATE DATABASE myapp;

-- 连接数据库
\c myapp

-- 创建表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    age INT CHECK (age >= 0 AND age <= 150),
    data JSONB,
    interests TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 插入数据
INSERT INTO users (name, email, age, data, interests) VALUES
    ('Alice', 'alice@example.com', 25,
     '{"city": "Beijing", "skills": ["Python", "SQL"]}',
     ARRAY['coding', 'reading']),
    ('Bob', 'bob@example.com', 30,
     '{"city": "Shanghai", "skills": ["Java", "Go"]}',
     ARRAY['gaming', 'music']);

-- 查询
SELECT * FROM users;

-- \d 查看表结构
\d users
```

## JSONB 操作

PostgreSQL 的 JSONB 类型支持索引和高效查询：

```sql
-- JSONB 访问操作符
SELECT name, data->>'city' AS city FROM users;
SELECT name, data->'skills'->>0 AS primary_skill FROM users;

-- JSONB 查询
SELECT * FROM users WHERE data->>'city' = 'Beijing';

-- JSONB 包含查询
SELECT * FROM users WHERE data @> '{"city": "Shanghai"}';

-- JSONB 键存在查询
SELECT * FROM users WHERE data ? 'skills';

-- JSONB 索引
CREATE INDEX idx_users_data ON users USING GIN (data);

-- 更新 JSONB
UPDATE users
SET data = jsonb_set(data, '{city}', '"Shenzhen"')
WHERE name = 'Alice';

-- 数组追加
UPDATE users
SET data = jsonb_set(data, '{skills}',
    (data->'skills')::jsonb || '["Docker"]'::jsonb)
WHERE name = 'Alice';
```

## 窗口函数

窗口函数允许在不被 GROUP BY 折叠的情况下进行复杂的分析计算：

```sql
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    product TEXT,
    category TEXT,
    amount DECIMAL,
    sale_date DATE
);

-- ROW_NUMBER：行号
SELECT
    product,
    amount,
    ROW_NUMBER() OVER (ORDER BY amount DESC) AS rank
FROM sales;

-- RANK / DENSE_RANK：排名
SELECT
    category,
    product,
    amount,
    RANK() OVER (PARTITION BY category ORDER BY amount DESC)
FROM sales;

-- LAG / LEAD：前后行访问
SELECT
    product,
    amount,
    LAG(amount) OVER (ORDER BY sale_date) AS prev_amount,
    LEAD(amount) OVER (ORDER BY sale_date) AS next_amount
FROM sales;

-- 累计和
SELECT
    sale_date,
    amount,
    SUM(amount) OVER (ORDER BY sale_date) AS running_total
FROM sales;
```

## 全文搜索

```sql
-- 创建全文搜索索引
CREATE INDEX idx_articles_search ON articles
USING GIN (to_tsvector('english', title || ' ' || content));

-- 全文搜索查询
SELECT title, ts_rank(
    to_tsvector('english', title || ' ' || content),
    plainto_tsquery('english', 'python tutorial')
) AS rank
FROM articles
WHERE to_tsvector('english', title || ' ' || content)
    @@ plainto_tsquery('english', 'python tutorial')
ORDER BY rank DESC;
```

## CTE（公共表表达式）

```sql
-- 递归 CTE：组织架构树
WITH RECURSIVE org_tree AS (
    -- 基础情况：顶级员工
    SELECT id, name, manager_id, 1 AS level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- 递归情况：下属
    SELECT e.id, e.name, e.manager_id, t.level + 1
    FROM employees e
    INNER JOIN org_tree t ON e.manager_id = t.id
)
SELECT * FROM org_tree ORDER BY level, name;
```

## 核心特性

- **JSONB**：二进制 JSON 存储，支持索引和复杂查询
- **全文搜索**：内置 `tsvector` 和 `tsquery`，多语言支持
- **窗口函数**：ROW_NUMBER、RANK、LAG、LEAD、聚合窗口
- **CTE**：WITH 子句，支持递归查询
- **扩展**：PostGIS（地理）、pgvector（向量）、pgcrypto（加密）
- **并发控制**：MVCC、行级锁、咨询锁
- **自定义类型**：枚举、复合类型、自定义操作符
- **数组**：原生数组类型和数组操作符

## 总结

PostgreSQL 是开发者最为推崇的开源关系型数据库。无论是其严格的 SQL 标准支持、强大的 JSONB 能力，还是丰富的扩展生态，都让它在复杂应用、数据分析和企业级系统中表现出色。对于追求技术卓越的团队，PostgreSQL 是数据库选型的理想之选。
