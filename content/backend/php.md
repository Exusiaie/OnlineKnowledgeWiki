---
title: PHP
category: 后端开发
tags: [后端, php, web]
order: 4
icon: 🐘
---

# PHP 服务端脚本语言教程

## 概述

PHP（Hypertext Preprocessor）是一种广泛用于 Web 开发的服务器端脚本语言。它诞生于 1994 年，经历了长足的发展，至今仍为全球大量网站提供动力（包括 Facebook、Wikipedia、WordPress）。PHP 8.x 版本带来了 JIT 编译器、命名参数、联合类型等现代化特性。

## PHP 的特点

- **专为 Web 设计**：与 HTML 无缝混合，部署简单
- **跨平台**：可在 Linux、Windows、macOS 等平台上运行
- **庞大的生态**：WordPress、Laravel、Symfony 等框架和 CMS
- **学习曲线平缓**：语法直观，新手可以快速上手
- **共享主机友好**：几乎所有虚拟主机都预装 PHP

## 基础语法

```php
<?php
// 输出
echo "Hello World";
print "Hello PHP";

// 变量（$ 前缀）
$name = "Alice";
$age = 25;
$price = 99.99;
$isActive = true;

// 字符串连接
$greeting = "Hello, " . $name . "!";
// 或使用双引号变量解析
$greeting = "Hello, $name!";

// 数组
$arr = [1, 2, 3, 4, 5];
$fruits = array("apple", "banana", "cherry");

// 关联数组（类似字典）
$user = [
    "name" => "Alice",
    "age" => 25,
    "email" => "alice@example.com"
];

// 遍历数组
foreach ($arr as $value) {
    echo $value . "\n";
}

// 遍历关联数组
foreach ($user as $key => $value) {
    echo "$key: $value\n";
}
?>
```

## 函数与类型

```php
<?php
// 类型声明（PHP 7+）
function add(int $a, int $b): int {
    return $a + $b;
}

function greet(string $name = "Guest"): string {
    return "Hello, $name!";
}

// 可变参数
function sum(int ...$numbers): int {
    return array_sum($numbers);
}

echo sum(1, 2, 3, 4, 5); // 15

// 匿名函数
$multiply = function(int $a, int $b): int {
    return $a * $b;
};

// 箭头函数（PHP 7.4+）
$double = fn(int $x) => $x * 2;
?>
```

## 面向对象

```php
<?php
class User {
    // 属性
    private string $name;
    private int $age;

    // 构造方法
    public function __construct(string $name, int $age) {
        $this->name = $name;
        $this->age = $age;
    }

    // Getter
    public function getName(): string {
        return $this->name;
    }

    // 方法
    public function display(): void {
        echo "User: {$this->name}, Age: {$this->age}\n";
    }
}

// 继承
class AdminUser extends User {
    private string $role;

    public function __construct(string $name, int $age, string $role) {
        parent::__construct($name, $age);
        $this->role = $role;
    }

    public function display(): void {
        parent::display();
        echo "Role: {$this->role}\n";
    }
}

$user = new AdminUser("Alice", 25, "管理员");
$user->display();
?>
```

## 数据库连接

```php
<?php
// PDO 连接 MySQL
try {
    $pdo = new PDO(
        "mysql:host=localhost;dbname=mydb;charset=utf8mb4",
        "username",
        "password",
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    // 查询
    $stmt = $pdo->query("SELECT * FROM users");
    while ($row = $stmt->fetch()) {
        echo $row['name'] . "\n";
    }

    // 预处理语句（防止 SQL 注入）
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
    $stmt->execute(['id' => 1]);
    $user = $stmt->fetch();

    // 插入
    $stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    $stmt->execute(['Bob', 'bob@example.com']);
    $lastId = $pdo->lastInsertId();

} catch (PDOException $e) {
    echo "数据库错误: " . $e->getMessage();
}
?>
```

## Session 管理

```php
<?php
// 启动 Session
session_start();

// 存储数据
$_SESSION['user_id'] = 1;
$_SESSION['username'] = 'Alice';

// 读取数据
$userId = $_SESSION['user_id'] ?? null;

// 销毁 Session
session_destroy();
?>
```

## 核心特性

- **变量与类型**：动态类型，支持类型声明，8 种基本类型
- **数组操作**：丰富的数组处理函数（array_map、array_filter、array_reduce）
- **面向对象**：类、继承、接口、trait、命名空间
- **数据库连接**：PDO 提供统一的数据库抽象层
- **Session 与 Cookie**：用户状态管理
- **文件处理**：文件读写、上传管理
- **正则表达式**：PCRE 兼容的模式匹配
- **错误处理**：try-catch、自定义异常处理器

## JSON 处理

```php
<?php
// 编码
$data = ["name" => "Alice", "age" => 25];
$json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

// 解码
$decoded = json_decode($json, true); // true 返回关联数组
echo $decoded['name']; // "Alice"
?>
```

## 总结

PHP 虽然在流行度上有所下降，但其庞大的历史遗产和低成本部署的优势让它在 Web 开发中仍然占有一席之地。现代 PHP 框架（如 Laravel）让 PHP 开发体验大幅提升，对于内容管理系统和中小型 Web 项目，PHP 仍是实用高效的选择。
