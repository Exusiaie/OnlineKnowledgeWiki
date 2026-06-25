---
title: Keras
category: AI / 智能开发
tags: [ai, 深度学习, 高层API]
order: 3
icon: ⚡
---

# Keras 高层深度学习 API 教程

## 概述

Keras 是一个高层神经网络 API，用 Python 编写，能够以 TensorFlow、JAX 或 PyTorch 作为后端运行。Keras 的设计原则是：用户友好、模块化、可组合、易于扩展。它让开发者能够以最少的代码快速构建和实验深度学习模型。

自 TensorFlow 2.0 起，Keras 被作为 TensorFlow 的官方高层 API（tf.keras），成为 TensorFlow 生态的核心组件。

## 设计理念

Keras 的核心设计理念是"渐进式揭示复杂性"。你可以从最简单的 Sequential 模型开始，逐步深入到 Functional API 和子类化 API，每一步都只引入必要的复杂性。

## 快速开始

```python
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Activation, Dropout

# 构建模型
model = Sequential([
    Dense(64, activation='relu', input_shape=(784,)),
    Dropout(0.3),
    Dense(64, activation='relu'),
    Dropout(0.3),
    Dense(10, activation='softmax')
])

# 编译
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# 查看模型结构
model.summary()
```

## Sequential API

Sequential API 是最简单的方式，适用于层与层之间线性堆叠的模型。

```python
model = Sequential()
model.add(Dense(32, input_dim=784, activation='relu'))
model.add(Dense(16, activation='relu'))
model.add(Dense(1, activation='sigmoid'))
```

## Functional API

Functional API 支持更复杂的模型拓扑，如多输入多输出、共享层、残差连接等。

```python
from tensorflow.keras.layers import Input, concatenate
from tensorflow.keras.models import Model

# 多输入示例
input_a = Input(shape=(64,), name='input_a')
input_b = Input(shape=(64,), name='input_b')

x1 = Dense(32, activation='relu')(input_a)
x2 = Dense(32, activation='relu')(input_b)

merged = concatenate([x1, x2])
output = Dense(1, activation='sigmoid')(merged)

model = Model(inputs=[input_a, input_b], outputs=output)
```

## 训练与评估

```python
# 训练
history = model.fit(
    x_train, y_train,
    batch_size=32,
    epochs=50,
    validation_split=0.2,
    verbose=1
)

# 评估
test_loss, test_acc = model.evaluate(x_test, y_test)
print(f'Test accuracy: {test_acc:.4f}')

# 预测
predictions = model.predict(x_new)
```

## 核心特性

- **Sequential API**：线性堆叠模型，适合初学者和简单任务
- **Functional API**：灵活构建复杂模型，支持多输入多输出
- **预训练模型**：丰富的预训练模型（ResNet、VGG、MobileNet 等）
- **回调函数**：EarlyStopping、ModelCheckpoint、TensorBoard 等
- **损失函数**：丰富的内置损失函数，支持自定义
- **评估指标**：准确率、精确率、召回率、AUC 等
- **数据预处理**：图像增强、文本向量化、序列填充
- **模型保存**：支持完整模型、权重、架构的灵活保存

## 回调函数示例

```python
callbacks = [
    tf.keras.callbacks.EarlyStopping(
        monitor='val_loss',
        patience=5,
        restore_best_weights=True
    ),
    tf.keras.callbacks.ModelCheckpoint(
        'best_model.h5',
        save_best_only=True
    ),
    tf.keras.callbacks.ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.5,
        patience=3
    )
]
```

## 总结

Keras 以其简洁优雅的 API 设计，大幅降低了深度学习的入门门槛。无论是快速原型开发、学术研究还是工业部署，Keras 都能提供高效的开发体验。结合 TensorFlow 的强大后端，Keras 在易用性和性能之间取得了出色的平衡。
