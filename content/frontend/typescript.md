---
title: TypeScript
category: 前端开发
tags: [前端, typescript, 类型系统]
order: 5
icon: 🔷
---

# TypeScript 类型化 JavaScript 超集教程

## 概述

TypeScript 是由 Microsoft 开发的开源编程语言，它是 JavaScript 的类型化超集。TypeScript 在 JavaScript 的基础上添加了可选的静态类型系统，能够在不运行代码的情况下发现潜在错误。它编译为纯 JavaScript，可以在任何支持 JS 的环境中运行。

## 为什么使用 TypeScript

- **类型安全**：在编译阶段捕获类型错误，减少运行时 bug
- **更好的 IDE 支持**：自动补全、类型提示、重构更准确
- **自文档化**：类型定义即文档，代码可读性更强
- **大型项目维护**：类型系统让重构更安全、更高效

## 基础类型注解

```typescript
// 基本类型
const name: string = 'Alice';
const age: number = 25;
const isAdmin: boolean = true;
const hobbies: string[] = ['reading', 'coding'];
const tuple: [string, number] = ['Alice', 25];

// 接口（Interface）
interface User {
    name: string;
    age: number;
    email?: string;           // 可选属性
    readonly id: number;      // 只读属性
}

const user: User = {
    name: 'Alice',
    age: 25,
    id: 1
};

// 类型别名（Type Alias）
type ID = string | number;
type Point = { x: number; y: number };
type Callback = (data: unknown) => void;
```

## 泛型

泛型让函数、接口和类能够处理多种类型而不丢失类型信息：

```typescript
// 泛型函数
function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

const num = firstElement([1, 2, 3]);        // 推断为 number
const str = firstElement(['a', 'b', 'c']);  // 推断为 string

// 泛型接口
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

type UserResponse = ApiResponse<User>;
type ListResponse = ApiResponse<User[]>;

// 泛型约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const userName = getProperty(user, 'name'); // 类型安全访问
```

## 枚举

```typescript
// 数字枚举
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

// 字符串枚举
enum Status {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
    Pending = 'PENDING',
}

function handleStatus(status: Status) {
    switch (status) {
        case Status.Active:
            return '已激活';
        case Status.Inactive:
            return '未激活';
        case Status.Pending:
            return '待处理';
    }
}
```

## 高级类型

```typescript
// 联合类型与类型守卫
function process(input: string | number) {
    if (typeof input === 'string') {
        return input.toUpperCase();  // 类型缩窄为 string
    }
    return input.toFixed(2);         // 类型缩窄为 number
}

// 交叉类型
type AdminUser = User & { permissions: string[] };

// 类型推导
let x = 3;  // 自动推导为 number

// 工具类型
type PartialUser = Partial<User>;       // 所有属性变为可选
type ReadonlyUser = Readonly<User>;     // 所有属性变为只读
type UserPreview = Pick<User, 'name' | 'age'>;  // 选取部分属性
type UserWithoutId = Omit<User, 'id'>;  // 排除部分属性
type UserRecord = Record<string, User>; // 键值映射类型
```

## 类与接口

```typescript
class Animal {
    constructor(public name: string) {}

    makeSound(): void {
        console.log('Some sound...');
    }
}

class Dog extends Animal {
    constructor(name: string, private breed: string) {
        super(name);
    }

    makeSound(): void {
        console.log('Woof!');
    }
}

// 实现接口
interface Printable {
    print(): void;
}

class Document implements Printable {
    print(): void {
        console.log('Printing document...');
    }
}
```

## 核心特性

- **类型注解**：显式声明变量、参数和返回值的类型
- **接口**：定义对象的结构契约
- **泛型**：创建可复用的类型安全组件
- **枚举**：命名的常量集合
- **类型推导**：自动推断类型，减少冗余注解
- **工具类型**：Partial、Required、Pick、Omit、Record 等
- **类型守卫**：运行时检查缩小类型范围
- **声明文件**：`.d.ts` 文件为 JS 库提供类型信息

## 总结

TypeScript 在现代前端开发中已经成为事实上的标准。对于大型项目，TypeScript 的类型系统能够显著提升代码质量和维护效率。它与 Vue、React 等框架的无缝集成，让前端开发体验更上一层楼。
