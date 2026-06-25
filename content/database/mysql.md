---
title: MySQL
category: 数据库
tags: [数据库, mysql, sql]
order: 1
icon: 🐬
---

# MySQL 关系型数据库教程

## 概述

MySQL 是全球最流行的开源关系型数据库管理系统（RDBMS）。它由瑞典 MySQL AB 公司开发，后被 Oracle 收购。MySQL 以其可靠性、易用性和高性能著称，被广泛应用于 Web 应用（如 WordPress、Facebook 早期）和企业系统。

## 安装与连接

```bash
# 安装 MySQL（Ubuntu/Debian）
sudo apt install mysql-server

# 安装 MySQL（macOS）
brew install mysql

# 连接 MySQL
mysql -u root -p

# 查看版本
mysql --version
```

## 数据库与表操作

```sql
-- 创建数据库
CREATE DATABASE mydb
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE mydb;

-- 创建表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 查看表结构
DESCRIBE users;

-- 修改表
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
ALTER TABLE users MODIFY COLUMN name VARCHAR(100);
ALTER TABLE users DROP COLUMN phone;

-- 删除表
DROP TABLE IF EXISTS users;
```

## CRUD 操作

```sql
-- CREATE: 插入数据
INSERT INTO users (name, email, age) VALUES
    ('Alice', 'alice@example.com', 25),
    ('Bob', 'bob@example.com', 30),
    ('Charlie', 'charlie@example.com', 28);

-- READ: 查询数据
SELECT * FROM users;
SELECT id, name, email FROM users WHERE age > 25;
SELECT * FROM users ORDER BY created_at DESC;
SELECT * FROM users LIMIT 10 OFFSET 0;

-- 条件查询
SELECT * FROM users
WHERE age BETWEEN 20 AND 30
    AND email LIKE '%@example.com';

-- 聚合查询
SELECT COUNT(*) AS total FROM users;
SELECT AVG(age) AS avg_age FROM users;
SELECT is_active, COUNT(*) FROM users GROUP BY is_active;

-- UPDATE: 更新数据
UPDATE users SET age = 26 WHERE id = 1;

-- DELETE: 删除数据
DELETE FROM users WHERE id = 3;

-- 软删除（推荐）
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP NULL;
UPDATE users SET deleted_at = NOW() WHERE id = 3;
```

## JOIN 连接查询

```sql
-- 创建关联表
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product VARCHAR(100),
    amount DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO orders (user_id, product, amount) VALUES
    (1, 'Laptop', 5999.00),
    (1, 'Mouse', 199.00),
    (2, 'Keyboard', 899.00);

-- INNER JOIN：只返回匹配的行
SELECT u.name, o.product, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN：返回左表所有行
SELECT u.name, o.product, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- 多表 JOIN
SELECT u.name, o.product, o.amount, o.created_at
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.amount > 500
ORDER BY o.created_at DESC;
```

## 索引

```sql
-- 创建索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_name_age ON users(name, age);  -- 复合索引

-- 唯一索引
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- 全文索引
CREATE FULLTEXT INDEX idx_content ON articles(title, content);

-- 查看索引
SHOW INDEX FROM users;

-- 删除索引
DROP INDEX idx_users_email ON users;
```

## 事务

```sql
-- 开启事务
START TRANSACTION;

-- 执行操作
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- 检查逻辑
SELECT balance FROM accounts WHERE id = 1;

-- 提交（用户余额充足）
COMMIT;

-- 或者回滚（余额不足）
-- ROLLBACK;
```

## 核心功能

- **CRUD 操作**：INSERT、SELECT、UPDATE、DELETE
- **JOIN**：INNER JOIN、LEFT JOIN、RIGHT JOIN、CROSS JOIN
- **索引**：B-Tree、Hash、全文、空间索引
- **事务**：ACID 事务，支持提交和回滚
- **存储过程**：预编译的 SQL 代码块
- **视图**：虚拟表，封装复杂查询
- **触发器**：数据变更时自动执行的逻辑
- **主从复制**：数据冗余和高可用方案

## 总结

MySQL 是 Web 开发的"标配"数据库，从个人项目到大型网站都能胜任。熟练掌握 SQL 语句、理解索引优化和事务管理，是后端开发者的必备技能。对于大多数 Web 应用，MySQL 仍然是最稳妥可靠的选择。
