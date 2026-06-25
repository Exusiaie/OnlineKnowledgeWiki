---
title: PyTorch
category: AI / 智能开发
tags: [ai, 深度学习, 框架]
order: 2
icon: 🔥
---

# PyTorch 深度学习框架教程

## 概述

PyTorch 是由 Facebook（现 Meta）AI Research 实验室开发的开源深度学习框架。以其动态计算图和 Pythonic 风格著称，深受学术界和工业界喜爱。PyTorch 的设计哲学强调灵活性和易用性，让开发者能够以最自然的方式表达深度学习模型。

## 动态计算图

与 TensorFlow 1.x 的静态图不同，PyTorch 采用动态计算图（Define-by-Run）机制。计算图在每次前向传播时动态构建，这意味着：

- 可以使用 Python 原生的控制流（if/for/while）
- 调试更加直观，可以随时 print 中间结果
- 模型结构可以随输入数据变化

## 安装

```bash
# CPU 版本
pip install torch torchvision

# CUDA 11.8 版本
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
```

## 张量操作

```python
import torch

# 创建张量
x = torch.tensor([1.0, 2.0, 3.0])
y = torch.randn(3, 4)
z = torch.zeros(2, 3)

# 张量运算
a = torch.tensor([1.0, 2.0, 3.0])
b = torch.tensor([4.0, 5.0, 6.0])
c = a + b  # 逐元素相加
d = torch.matmul(y, z.T)  # 矩阵乘法

# GPU 加速
if torch.cuda.is_available():
    x = x.to('cuda')
    y = y.to('cuda')
```

## 构建神经网络

```python
import torch.nn as nn
import torch.optim as optim

# 定义模型
class SimpleNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear1 = nn.Linear(10, 1)
        self.relu = nn.ReLU()

    def forward(self, x):
        x = self.linear1(x)
        return self.relu(x)

model = SimpleNN()
```

## 训练流程

```python
# 定义损失函数和优化器
criterion = nn.MSELoss()
optimizer = optim.SGD(model.parameters(), lr=0.01)

# 训练循环
for epoch in range(100):
    # 前向传播
    outputs = model(inputs)
    loss = criterion(outputs, targets)

    # 反向传播
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

## 核心特性

- **动态图**：灵活的计算图构建，易于调试和实验
- **自动求导**：autograd 引擎自动计算梯度
- **GPU 加速**：无缝切换 CPU/GPU，充分利用硬件
- **TorchScript**：将模型序列化为可优化的静态图格式
- **丰富生态**：torchvision、torchaudio、torchtext 等工具包
- **分布式训练**：多卡、多机训练支持
- **数据中心**：DataLoader 支持高效的数据加载和预处理
- **模型导出**：支持 ONNX 格式，跨平台部署

## 数据加载

```python
from torch.utils.data import DataLoader, TensorDataset

dataset = TensorDataset(inputs, targets)
dataloader = DataLoader(dataset, batch_size=32, shuffle=True)

for batch_inputs, batch_targets in dataloader:
    outputs = model(batch_inputs)
    loss = criterion(outputs, batch_targets)
```

## 总结

PyTorch 以其直观的编程接口和强大的灵活性，成为了深度学习研究和开发的首选框架。对于科研人员来说，动态图的特性让实验迭代更快；对于工程师而言，TorchScript 和 ONNX 支持让模型部署更为便捷。
