---
title: Pandas
category: Python / 数据科学
tags: [python, 数据分析, 数据处理]
order: 3
icon: 📋
---

# Pandas

Pandas 是 Python 中最强大的数据分析与数据处理库，提供了 DataFrame 等核心数据结构。

## 核心数据结构

- **Series**：一维带标签数组
- **DataFrame**：二维表格型数据结构

## 快速开始

```python
import pandas as pd

# 创建 DataFrame
df = pd.DataFrame({
    '姓名': ['张三', '李四', '王五'],
    '年龄': [25, 30, 28],
    '城市': ['北京', '上海', '广州']
})

print(df)
```

## 常用操作

```python
# 读取 CSV 文件
df = pd.read_csv('data.csv')

# 查看前 5 行
df.head()

# 基本统计
df.describe()

# 筛选数据
df[df['年龄'] > 25]

# 分组聚合
df.groupby('城市').mean()
```

## 主要功能

- 数据清洗（处理缺失值、重复值）
- 数据转换（合并、重塑、透视表）
- 数据聚合与分组操作
- 时间序列分析
- 多种格式读写（CSV、Excel、SQL、JSON）
