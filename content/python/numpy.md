---
title: NumPy
category: Python / 数据科学
tags: [python, 科学计算, 数据分析]
order: 2
icon: 📊
---

# NumPy

NumPy（Numerical Python）是 Python 科学计算的基础库，提供高性能的多维数组对象及相关操作工具。

## 核心特性

- **ndarray**：N 维数组对象，高效存储和操作大型数据集
- **广播机制**：不同形状数组间的算术运算
- **向量化运算**：无需显式循环即可进行批量计算

## 快速开始

```python
import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])
print(arr)

# 创建全零矩阵
zeros = np.zeros((3, 3))
print(zeros)

# 数组运算
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(a + b)  # [5 7 9]
```

## 常用操作

- `np.array()` — 创建数组
- `np.zeros()` / `np.ones()` — 创建全零/全一数组
- `np.arange()` — 创建等差数组
- `np.linspace()` — 创建等间隔数组
- `np.random` — 随机数生成
