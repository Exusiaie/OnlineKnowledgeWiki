---
title: TensorFlow
category: AI / 智能开发
tags: [ai, 深度学习, 框架]
order: 1
icon: 🧠
---

# TensorFlow 深度学习框架教程

## 概述

TensorFlow 是由 Google Brain 团队开发的开源深度学习框架，是目前最流行的机器学习平台之一。它提供了完整的端到端工作流，从数据处理、模型构建到训练部署一应俱全。TensorFlow 2.x 版本全面拥抱 Keras API，大幅降低了使用门槛。

## 核心概念

TensorFlow 的核心是张量（Tensor）和计算图（Graph）：

- **张量**：多维数组，是 TensorFlow 中的基本数据结构
- **计算图**：描述计算流程的有向无环图（DAG）
- **Session**：执行计算图的环境（2.x 中已简化）
- **变量**：可训练的模型参数

## 安装与配置

```bash
# 安装 TensorFlow
pip install tensorflow

# GPU 版本（需要 CUDA 和 cuDNN）
pip install tensorflow-gpu
```

## 基础示例

```python
import tensorflow as tf
import numpy as np

# 准备数据
x_train = np.array([1.0, 2.0, 3.0, 4.0, 5.0], dtype=np.float32)
y_train = np.array([2.0, 4.0, 6.0, 8.0, 10.0], dtype=np.float32)

# 构建模型
model = tf.keras.Sequential([
    tf.keras.layers.Dense(units=1, input_shape=[1])
])

# 编译模型
model.compile(optimizer='sgd', loss='mean_squared_error')

# 训练模型
model.fit(x_train, y_train, epochs=500, verbose=0)

# 预测
print(model.predict([6.0]))
```

## 深度神经网络示例

```python
# 更复杂的模型结构
model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu', input_shape=(784,)),
    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)
```

## 核心功能

- **Keras API**：高级 API，Sequential 和 Functional 两种建模方式
- **Eager Execution**：命令式编程，方便调试和动态计算
- **TensorBoard**：可视化工具，监控训练过程和模型结构
- **模型部署**：TF Serving、TF Lite（移动端）、TF.js（浏览器端）
- **分布式训练**：多 GPU、多节点训练策略
- **数据管道**：tf.data API 构建高效输入管道
- **自动微分**：GradientTape 记录计算过程
- **预训练模型**：TF Hub 提供丰富的预训练模型

## 自定义训练循环

```python
@tf.function
def train_step(x, y):
    with tf.GradientTape() as tape:
        predictions = model(x, training=True)
        loss = loss_fn(y, predictions)
    gradients = tape.gradient(loss, model.trainable_variables)
    optimizer.apply_gradients(zip(gradients, model.trainable_variables))
    return loss
```

## 总结

TensorFlow 凭借其全面的生态、强大的分布式能力和成熟的部署方案，特别适合工业级的大规模机器学习应用。结合 Keras 的简洁 API，无论是研究还是生产环境都能很好地满足需求。
