---
title: OpenCV
category: AI / 智能开发
tags: [ai, 计算机视觉, 图像处理]
order: 5
icon: 👁
---

# OpenCV 计算机视觉库教程

## 概述

OpenCV（Open Source Computer Vision Library）是最流行的计算机视觉开源库。它提供了超过 2500 个优化算法，涵盖图像处理、视频分析、目标检测、人脸识别等领域。OpenCV 支持 C++、Python、Java 等多种语言，跨平台运行。

## 安装

```bash
pip install opencv-python

# 包含 contrib 模块（额外功能）
pip install opencv-contrib-python
```

## 图像基本操作

```python
import cv2
import numpy as np

# 读取图像
img = cv2.imread('photo.jpg')

# 显示图像基本信息
print(f'Shape: {img.shape}')  # (height, width, channels)
print(f'Size: {img.size}')

# 色彩空间转换
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# 保存图像
cv2.imwrite('output.jpg', gray)

# 显示图像（在桌面环境）
cv2.imshow('Window', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
```

## 图像处理操作

```python
# 调整大小
resized = cv2.resize(img, (640, 480))

# 旋转
(h, w) = img.shape[:2]
center = (w // 2, h // 2)
M = cv2.getRotationMatrix2D(center, 45, 1.0)
rotated = cv2.warpAffine(img, M, (w, h))

# 边缘检测
edges = cv2.Canny(img, 100, 200)

# 高斯模糊
blurred = cv2.GaussianBlur(img, (5, 5), 0)

# 绘图
cv2.rectangle(img, (50, 50), (200, 200), (0, 255, 0), 2)
cv2.circle(img, (300, 300), 50, (255, 0, 0), -1)
cv2.putText(img, 'Hello', (100, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
```

## 人脸检测

```python
# 使用 Haar 级联分类器
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
)

# 转换为灰度图
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 检测人脸
faces = face_cascade.detectMultiScale(
    gray,
    scaleFactor=1.1,
    minNeighbors=5,
    minSize=(30, 30)
)

# 绘制检测框
for (x, y, w, h) in faces:
    cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)

print(f'检测到 {len(faces)} 张人脸')
```

## 视频处理

```python
# 读取视频
cap = cv2.VideoCapture('video.mp4')
# cap = cv2.VideoCapture(0)  # 摄像头

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # 处理每一帧
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    cv2.imshow('Video', gray)
    if cv2.waitKey(25) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

## 核心功能

- **图像读写**：支持多种图片格式的读写操作
- **几何变换**：缩放、旋转、平移、仿射变换、透视变换
- **边缘检测**：Canny、Sobel、Laplacian 等算子
- **人脸识别**：Haar 级联、LBPH、深度学习方案
- **视频处理**：摄像头捕获、视频读写、帧处理
- **图像滤波**：均值、高斯、中值、双边滤波
- **形态学操作**：腐蚀、膨胀、开运算、闭运算
- **轮廓检测**：寻找和绘制图像轮廓

## 轮廓检测示例

```python
# 转换为二值图
_, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)

# 查找轮廓
contours, hierarchy = cv2.findContours(
    thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE
)

# 绘制轮廓
cv2.drawContours(img, contours, -1, (0, 255, 0), 2)
```

## 总结

OpenCV 是计算机视觉领域的瑞士军刀，无论是简单的图像处理还是复杂的视觉分析任务，它都能提供高效的解决方案。结合深度学习模型，OpenCV 在自动驾驶、安防监控、医疗影像等领域发挥着重要作用。
