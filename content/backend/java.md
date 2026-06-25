---
title: Java
category: 后端开发
tags: [后端, java, 企业级]
order: 3
icon: ☕
---

# Java 后端开发教程

## 概述

Java 是全球使用最广泛的编程语言之一，由 Sun Microsystems（现 Oracle）于 1995 年发布。凭借"Write Once, Run Anywhere"的跨平台能力、成熟的生态系统和强大的性能，Java 在企业级应用中占据主导地位，是银行、电商、金融等大型系统的首选语言。

## Java 平台体系

Java 的生态包括三个主要部分：

- **JVM（Java Virtual Machine）**：Java 虚拟机，运行编译后的字节码
- **JRE（Java Runtime Environment）**：Java 运行时环境，包含 JVM 和核心类库
- **JDK（Java Development Kit）**：Java 开发工具包，包含 JRE 和开发工具

## 基础语法

```java
// 定义一个公共类
public class Main {
    // 程序入口
    public static void main(String[] args) {
        // 输出
        System.out.println("Hello, Java!");

        // 变量
        String name = "Alice";
        int age = 25;
        double salary = 50000.0;
        boolean isActive = true;

        // 数组
        int[] numbers = {1, 2, 3, 4, 5};
        String[] names = new String[3];

        // 条件判断
        if (age >= 18) {
            System.out.println(name + " 是成年人");
        } else {
            System.out.println(name + " 是未成年人");
        }

        // 循环
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("索引 " + i + ": " + numbers[i]);
        }

        // foreach 循环
        for (int num : numbers) {
            System.out.println(num);
        }
    }
}
```

## 面向对象

Java 是纯面向对象语言，所有代码都必须在类中：

```java
// 封装
public class User {
    // 私有字段
    private String name;
    private int age;

    // 构造方法
    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Getter 和 Setter
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // 方法
    public void display() {
        System.out.println("User: " + name + ", Age: " + age);
    }
}

// 继承
public class AdminUser extends User {
    private String role;

    public AdminUser(String name, int age, String role) {
        super(name, age);  // 调用父类构造方法
        this.role = role;
    }

    @Override
    public void display() {
        super.display();
        System.out.println("Role: " + role);
    }
}

// 接口
public interface Printable {
    void print();
}

// 实现接口
public class Document implements Printable {
    @Override
    public void print() {
        System.out.println("Printing document...");
    }
}
```

## 集合框架

```java
import java.util.*;

// List - 有序集合
List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.add("Cherry");
list.get(1);              // "Banana"
list.remove(0);

// Set - 不重复集合
Set<String> set = new HashSet<>();
set.add("A");
set.add("B");
set.add("A");             // 不会重复添加
set.contains("A");        // true

// Map - 键值对
Map<String, Integer> map = new HashMap<>();
map.put("Alice", 25);
map.put("Bob", 30);
map.get("Alice");         // 25

// 遍历 Map
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
```

## Stream API

```java
import java.util.*;
import java.util.stream.*;

// 使用 Stream 进行函数式数据处理
List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

// 过滤、映射、收集
List<String> result = names.stream()
    .filter(name -> name.length() > 3)       // 过滤
    .map(String::toUpperCase)                 // 映射
    .sorted()                                 // 排序
    .collect(Collectors.toList());            // 收集

// 统计
long count = names.stream()
    .filter(name -> name.startsWith("A"))
    .count();
```

## 核心特性

- **面向对象**：封装、继承、多态、抽象类与接口
- **JVM**：Java 虚拟机，通过 JIT 编译和垃圾回收实现高效运行
- **集合框架**：List、Set、Map、Queue 等丰富的集合类
- **多线程**：Thread、Runnable、ExecutorService、CompletableFuture
- **Stream API**：函数式编程风格的数据处理管道
- **异常处理**：try-catch-finally、throw/throws、自定义异常
- **泛型**：类型安全的集合和方法
- **注解**：元数据标记（@Override、@Deprecated 等）

## 异常处理

```java
public class ExceptionDemo {
    public static int divide(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("除数不能为 0");
        }
        return a / b;
    }

    public static void main(String[] args) {
        try {
            int result = divide(10, 0);
            System.out.println("结果: " + result);
        } catch (ArithmeticException e) {
            System.err.println("计算错误: " + e.getMessage());
        } finally {
            System.out.println("清理资源...");
        }
    }
}
```

## 总结

Java 凭借其稳定性、可扩展性和丰富的生态系统，长期占据企业级开发的主流地位。虽然 Go 和 Node.js 在新兴领域发展迅速，但 Java 在大型系统、金融交易和分布式架构中的统治地位短期内难以撼动。
