---
title: Scikit-learn
category: AI / 智能开发
tags: [ai, 机器学习, 经典算法]
order: 4
icon: 🎯
---

# Scikit-learn 机器学习库教程

## 概述

Scikit-learn（sklearn）是 Python 生态中最受欢迎的机器学习库。它建立在 NumPy、SciPy 和 Matplotlib 之上，提供了统一的 API 接口来实现各类经典机器学习算法。无论是初学者还是专家，都能通过它高效地完成机器学习任务。

## 统一 API 设计

Scikit-learn 最大的特点之一是其统一的 API 设计模式。所有模型都遵循相同的接口规范：

- `fit(X, y)`：训练模型
- `predict(X)`：对新数据进行预测
- `score(X, y)`：评估模型性能
- `transform(X)` / `fit_transform(X)`：数据变换

## 安装

```bash
pip install scikit-learn
```

## 快速示例

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# 划分数据集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 训练模型
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# 预测与评估
y_pred = clf.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy:.4f}')
print(classification_report(y_test, y_pred))
```

## 主要算法分类

### 分类算法（Classification）

```python
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier

# 逻辑回归
lr = LogisticRegression()
lr.fit(X_train, y_train)
```

### 回归算法（Regression）

```python
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.svm import SVR
from sklearn.ensemble import RandomForestRegressor

# 线性回归
reg = LinearRegression()
reg.fit(X_train, y_train)
```

### 聚类算法（Clustering）

```python
from sklearn.cluster import KMeans, DBSCAN, AgglomerativeClustering

# K-Means 聚类
kmeans = KMeans(n_clusters=3, random_state=42)
labels = kmeans.fit_predict(X)
```

### 降维算法（Dimensionality Reduction）

```python
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE

# PCA 降维
pca = PCA(n_components=2)
X_reduced = pca.fit_transform(X)
```

## Pipeline 工作流

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier())
])

pipeline.fit(X_train, y_train)
predictions = pipeline.predict(X_test)
```

## 核心功能

- **分类**：逻辑回归、SVM、决策树、随机森林、KNN
- **回归**：线性回归、岭回归、Lasso、SVR
- **聚类**：K-Means、DBSCAN、层次聚类
- **降维**：PCA、t-SNE、LDA
- **模型选择**：交叉验证、网格搜索、随机搜索
- **预处理**：标准化、归一化、编码、缺失值处理
- **特征选择**：方差阈值、单变量选择、递归消除
- **评估指标**：准确率、精确率、召回率、F1、AUC

## 网格搜索

```python
from sklearn.model_selection import GridSearchCV

param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 10, 20, 30],
    'min_samples_split': [2, 5, 10]
}

grid_search = GridSearchCV(
    RandomForestClassifier(),
    param_grid,
    cv=5,
    scoring='accuracy'
)
grid_search.fit(X_train, y_train)
print(f'Best parameters: {grid_search.best_params_}')
```

## 总结

Scikit-learn 以其统一的设计和丰富的算法库，成为了机器学习入门的首选工具。在实际应用中，它通常用于数据预处理和经典 ML 模型的基线建立，是数据科学家工具箱中的必备利器。
