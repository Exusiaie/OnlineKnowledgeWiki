---
title: MongoDB
category: 数据库
tags: [数据库, mongodb, nosql, 文档型]
order: 2
icon: 🍃
---

# MongoDB 文档型 NoSQL 数据库教程

## 概述

MongoDB 是最流行的文档型 NoSQL 数据库。它以 BSON（Binary JSON）格式存储数据，每个数据记录都是一个灵活的文档（类似 JSON 对象）。MongoDB 摒弃了关系型数据库的表和行概念，用集合（Collection）和文档（Document）取而代之，为现代应用提供了极高的灵活性。

## 核心概念

| RDBMS | MongoDB |
|-------|---------|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |
| JOIN | $lookup / 嵌入文档 |
| Primary Key | _id（ObjectId） |

## 安装与连接

```bash
# 安装 MongoDB（macOS）
brew tap mongodb/brew
brew install mongodb-community

# 启动服务
brew services start mongodb-community

# 连接 shell
mongosh
```

## 基础 CRUD 操作

```javascript
// 切换到（或创建）数据库
use mydb

// CREATE：插入文档
db.users.insertOne({
    name: 'Alice',
    email: 'alice@example.com',
    age: 25,
    hobbies: ['reading', 'coding'],
    address: {
        city: 'Beijing',
        street: 'Chang\'an Avenue'
    }
});

// 插入多个文档
db.users.insertMany([
    { name: 'Bob', email: 'bob@example.com', age: 30 },
    { name: 'Charlie', email: 'charlie@example.com', age: 28 }
]);

// READ：查询文档
db.users.find();                          // 查询所有
db.users.find({ name: 'Alice' });         // 条件查询
db.users.findOne({ _id: ObjectId('...') }); // 查询单个

// 比较操作符
db.users.find({ age: { $gt: 20 } });      // 大于 20
db.users.find({ age: { $gte: 20, $lte: 30 } }); // 20-30 之间
db.users.find({ name: { $in: ['Alice', 'Bob'] } }); // 在列表中
db.users.find({ email: { $exists: true } }); // 字段存在

// 逻辑操作符
db.users.find({
    $and: [
        { age: { $gte: 25 } },
        { name: { $ne: 'Bob' } }
    ]
});

// 投影（只返回指定字段）
db.users.find({}, { name: 1, email: 1, _id: 0 });

// 排序与分页
db.users.find().sort({ age: -1 }).limit(10).skip(20);

// UPDATE：更新文档
db.users.updateOne(
    { name: 'Alice' },
    { $set: { age: 26, 'address.city': 'Shanghai' } }
);

db.users.updateMany(
    { age: { $lt: 30 } },
    { $inc: { age: 1 } }  // 年龄加 1
);

// DELETE：删除文档
db.users.deleteOne({ name: 'Charlie' });
db.users.deleteMany({ age: { $lt: 18 } });
```

## 聚合管道

聚合管道是 MongoDB 最强大的工具，数据经过多个阶段（Stage）的处理：

```javascript
db.orders.aggregate([
    // 筛选
    { $match: { status: 'completed' } },

    // 关联
    { $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
    } },

    // 分组统计
    { $group: {
        _id: '$userId',
        totalAmount: { $sum: '$amount' },
        orderCount: { $sum: 1 },
        avgAmount: { $avg: '$amount' }
    } },

    // 排序
    { $sort: { totalAmount: -1 } },

    // 限制
    { $limit: 10 }
]);
```

## 索引

```javascript
// 单字段索引
db.users.createIndex({ email: 1 });

// 复合索引
db.users.createIndex({ name: 1, age: -1 });

// 唯一索引
db.users.createIndex({ email: 1 }, { unique: true });

// 文本索引
db.articles.createIndex({ title: 'text', content: 'text' });

// 查看索引
db.users.getIndexes();

// 删除索引
db.users.dropIndex('email_1');

// 查看查询执行计划
db.users.find({ email: 'alice@example.com' }).explain('executionStats');
```

## 核心特性

- **文档模型**：JSON/BSON 格式，灵活的数据结构
- **集合**：无模式（Schema-less），同一集合中文档可以有不同的字段
- **聚合管道**：强大的数据处理能力，多阶段转换和计算
- **索引**：支持单字段、复合、文本、地理空间等多种索引
- **副本集**：数据冗余和自动故障转移
- **分片**：水平扩展，数据分布在多台服务器
- **GridFS**：大文件存储方案
- **Change Streams**：实时数据变更监听

## 嵌入 vs 引用

MongoDB 中处理关联有两种方式：

```javascript
// 嵌入文档（适用于一对一关系、数据总是一起访问）
db.users.insertOne({
    name: 'Alice',
    profile: {
        bio: 'Software Engineer',
        website: 'https://alice.dev'
    }
});

// 引用（适用于一对多关系、数据独立更新）
// 类似关系型数据库的外键概念
db.posts.insertOne({
    title: 'My Post',
    userId: ObjectId('...')  // 引用 users 集合中的文档
});
```

## 总结

MongoDB 灵活的文档模型让它在快速迭代和数据结构不确定的项目中表现出色。它的水平扩展能力和丰富的查询语法，使其成为现代 Web 应用、内容管理系统和实时分析场景的热门选择。
