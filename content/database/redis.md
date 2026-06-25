---
title: Redis
category: 数据库
tags: [数据库, redis, 缓存, 内存]
order: 3
icon: 🔴
---

# Redis 内存数据结构存储教程

## 概述

Redis（Remote Dictionary Server）是一个开源的、基于内存的键值数据存储系统。它支持多种数据结构（字符串、列表、哈希、集合、有序集合等），常被用作缓存、消息队列和实时数据处理引擎。Redis 以其亚毫秒级的响应速度著称，是现代高并发系统的标配。

## 为什么使用 Redis

- **极速性能**：纯内存操作，每秒可处理数十万次读写
- **丰富的数据结构**：远超简单 K-V 存储
- **持久化**：支持 RDB 快照和 AOF 日志
- **高可用**：主从复制、哨兵模式、集群模式
- **原子操作**：所有命令原子执行
- **发布订阅**：内置消息传递机制

## 安装与连接

```bash
# 安装 Redis（macOS）
brew install redis

# 安装 Redis（Ubuntu）
sudo apt install redis-server

# 启动 Redis
redis-server

# 连接 Redis CLI
redis-cli

# 测试连接
PING  # 返回 PONG
```

## 数据类型与操作

### 字符串（String）

最基础的数据类型，可存储文本、数字、二进制数据：

```bash
# 设置和获取
SET user:1:name "Alice"
GET user:1:name

# 带过期时间（秒）
SET session:token123 "user_data" EX 3600

# 数字操作
SET counter 0
INCR counter        # 1
INCR counter        # 2
INCRBY counter 10   # 12
DECR counter        # 11

# 条件设置（当键不存在时）
SETNX lock:task1 "locked"

# 同时设置多个
MSET key1 "value1" key2 "value2"
MGET key1 key2
```

### 列表（List）

有序的字符串列表，可用作队列或栈：

```bash
# 从左侧推入
LPUSH tasks "task1"
LPUSH tasks "task2"

# 从右侧推入
RPUSH tasks "task3"

# 弹出
LPOP tasks    # "task2"（左侧弹出，FIFO 队列）
RPOP tasks    # "task3"（右侧弹出，栈）

# 范围查询
LRANGE tasks 0 -1  # 获取所有元素
LRANGE tasks 0 4    # 获取前5个

# 列表长度
LLEN tasks

# 阻塞弹出（用于消息队列）
BLPOP queue 0  # 0 表示无限阻塞直到有元素
```

### 哈希（Hash）

字段-值对的集合，适合存储对象：

```bash
# 设置字段
HSET user:1 name "Alice" age 25 email "alice@example.com"

# 获取字段
HGET user:1 name
HMGET user:1 name email

# 获取所有字段和值
HGETALL user:1

# 字段是否存在
HEXISTS user:1 age

# 数字字段操作
HINCRBY user:1 age 1

# 删除字段
HDEL user:1 email
```

### 集合（Set）

无序且不重复的字符串集合：

```bash
# 添加成员
SADD tags:article:1 "python" "redis" "tutorial"

# 查询所有成员
SMEMBERS tags:article:1

# 成员数量
SCARD tags:article:1

# 判断成员是否存在
SISMEMBER tags:article:1 "python"

# 集合运算
SADD set1 "a" "b" "c"
SADD set2 "b" "c" "d"
SINTER set1 set2   # 交集: b, c
SUNION set1 set2    # 并集: a, b, c, d
SDIFF set1 set2     # 差集: a
```

### 有序集合（Sorted Set）

每个成员关联一个分数，按分数排序：

```bash
# 添加成员（带分数）
ZADD leaderboard 100 "Alice"
ZADD leaderboard 85 "Bob"
ZADD leaderboard 92 "Charlie"

# 排名查询
ZRANK leaderboard "Alice"      # 按分数升序排名
ZREVRANK leaderboard "Alice"   # 按分数降序排名

# 按分数范围查询
ZRANGE leaderboard 0 -1 WITHSCORES  # 获取所有

# 分数更新
ZINCRBY leaderboard 5 "Alice"
```

## 发布订阅

```bash
# 终端 1：订阅频道
SUBSCRIBE news:channel

# 终端 2：发布消息
PUBLISH news:channel "Breaking news!"

# 模式订阅
PSUBSCRIBE news:*
```

## 持久化策略

| 方式 | 原理 | 优点 | 缺点 |
|------|------|------|------|
| RDB | 定期快照 | 文件小、恢复快 | 可能丢失数据 |
| AOF | 记录每条写命令 | 数据安全性高 | 文件大、恢复慢 |
| 混合 | RDB + AOF | 两者兼得 | 需 Redis 4.0+ |

## 核心特性

- **字符串**：最基础的 K-V 存储，支持计数器和位图操作
- **列表**：双向链表，适合消息队列和时间线
- **哈希**：存储对象，内存优化
- **集合**：无序去重，好友关系、标签系统
- **有序集合**：排行榜、延迟队列、范围查询
- **发布订阅**：消息广播和实时推送
- **持久化**：RDB 快照和 AOF 日志
- **事务**：MULTI/EXEC 原子执行多条命令

## 总结

Redis 是现代 Web 架构中的性能利器。无论是作为缓存层加速数据库查询、实现分布式锁、还是构建消息队列和实时排行榜，Redis 都能凭借其亚毫秒级的响应带来显著的性能提升。在高并发系统中，合理使用 Redis 往往能将接口响应时间从秒级降低到毫秒级。
