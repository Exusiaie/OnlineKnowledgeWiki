---
title: Go
category: 后端开发
tags: [后端, go, 编译型]
order: 2
icon: 🔵
---

# Go 语言教程

## 概述

Go（又称 Golang）是 Google 在 2009 年发布的开源编程语言。它结合了 Python 的开发效率和 C/C++ 的执行性能，以简洁的语法、强大的并发支持和快速的编译速度著称。Go 是云原生基础设施（Docker、Kubernetes）的首选语言。

## 设计哲学

Go 的设计哲学是"少即是多"，体现在以下几个方面：

- **简洁性**：去除了类继承、泛型（Go 1.18 前）、异常处理等复杂特性
- **高效性**：编译为原生机器码，启动快、内存占用低
- **并发性**：goroutine 和 channel 让并发编程变得简单
- **工具链**：内置格式化（gofmt）、测试、文档生成等工具

## 快速开始

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
```

```bash
# 运行
go run main.go

# 编译
go build -o app main.go

# 初始化模块
go mod init myapp
```

## 基础语法

```go
package main

import "fmt"

// 变量声明
var name string = "Alice"
var age = 25

// 简短声明（仅函数内）
count := 0

// 常量
const PI = 3.14159

// 函数
func add(a, b int) int {
    return a + b
}

// 多返回值
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("除数不能为0")
    }
    return a / b, nil
}

// 结构体和方法
type User struct {
    Name  string
    Email string
}

func (u User) Greet() string {
    return "Hello, " + u.Name
}
```

## 并发编程

Go 的 goroutine 和 channel 是其最强大的特性：

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    // 启动 goroutine
    go func() {
        fmt.Println("goroutine 执行中...")
    }()

    // channel 通信
    ch := make(chan string)

    go func() {
        time.Sleep(1 * time.Second)
        ch <- "消息内容"
    }()

    msg := <-ch
    fmt.Println(msg)

    // 带缓冲的 channel
    buffered := make(chan int, 3)
    buffered <- 1
    buffered <- 2
    buffered <- 3

    // select 多路复用
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        time.Sleep(1 * time.Second)
        ch1 <- "来自 ch1"
    }()

    go func() {
        time.Sleep(2 * time.Second)
        ch2 <- "来自 ch2"
    }()

    for i := 0; i < 2; i++ {
        select {
        case msg1 := <-ch1:
            fmt.Println("收到:", msg1)
        case msg2 := <-ch2:
            fmt.Println("收到:", msg2)
        case <-time.After(3 * time.Second):
            fmt.Println("超时")
            return
        }
    }
}
```

## 标准库

Go 拥有出色的标准库，"电池全含"：

```go
// HTTP 服务器
package main

import (
    "encoding/json"
    "net/http"
)

type Response struct {
    Message string `json:"message"`
    Code    int    `json:"code"`
}

func handler(w http.ResponseWriter, r *http.Request) {
    resp := Response{
        Message: "Hello, World!",
        Code:    200,
    }
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(resp)
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}
```

## 核心特性

- **goroutine**：轻量级线程，一个程序可以轻松运行成千上万个
- **channel**：goroutine 之间的通信管道，"不通过共享内存来通信，而是通过通信来共享内存"
- **接口**：隐式实现，鸭子类型风格的面向对象
- **defer**：延迟执行，常用于资源清理（关闭文件、释放锁）
- **标准库**：丰富的标准库，网络、加密、文件操作等开箱即用
- **静态编译**：编译为单个独立二进制文件，无需运行时依赖
- **垃圾回收**：自动内存管理，低延迟 GC

## 接口示例

```go
type Writer interface {
    Write([]byte) (int, error)
}

type ConsoleWriter struct{}

func (cw ConsoleWriter) Write(data []byte) (int, error) {
    n, err := fmt.Print(string(data))
    return n, err
}

func WriteData(w Writer, data string) {
    w.Write([]byte(data))
}
```

## 总结

Go 是现代后端开发中的高性能利器。它填补了 C/C++ 性能和 Python/Java 开发效率之间的空白，在微服务、云原生、CLI 工具和网络编程等领域表现出色。简洁的语法和强大的并发模型让 Go 成为学习后端开发的高性价比选择。
