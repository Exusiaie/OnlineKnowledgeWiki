---
title: SciPy
category: Python / 数据科学
tags: [python, 科学计算, 工程应用]
order: 5
icon: ⚙
---

# SciPy

SciPy 建立在 NumPy 之上，提供了科学计算与工程应用中常用的算法和数学工具。

## 快速开始

```python
from scipy import optimize, stats, signal

# 求函数最小值
result = optimize.minimize(lambda x: x**2 + 10*np.sin(x), 0)
print(result.x)

# 统计分析
data = stats.norm.rvs(size=1000)
print(stats.describe(data))
```

## 主要模块

| 模块 | 功能 |
|------|------|
| `scipy.optimize` | 优化与求根 |
| `scipy.stats` | 统计分布与检验 |
| `scipy.signal` | 信号处理 |
| `scipy.linalg` | 线性代数 |
| `scipy.fft` | 傅里叶变换 |
| `scipy.interpolate` | 插值 |
| `scipy.integrate` | 数值积分 |
