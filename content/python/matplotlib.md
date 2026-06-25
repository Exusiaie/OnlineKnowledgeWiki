---
title: Matplotlib
category: Python / 数据科学
tags: [python, 数据可视化, 绘图]
order: 4
icon: 📈
---

# Matplotlib

Matplotlib 是 Python 最流行的 2D 绘图库，可生成出版质量级别的图形。

## 快速开始

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y, label='sin(x)')
plt.xlabel('x 轴')
plt.ylabel('y 轴')
plt.title('正弦函数')
plt.legend()
plt.show()
```

## 常用图表类型

- **折线图**：`plt.plot()`
- **散点图**：`plt.scatter()`
- **柱状图**：`plt.bar()`
- **饼图**：`plt.pie()`
- **直方图**：`plt.hist()`

## 主要特性

- 高度可定制（颜色、线型、标签、图例）
- 支持 LaTeX 数学公式渲染
- 多种输出格式（PNG、PDF、SVG）
- 与 NumPy、Pandas 无缝集成
