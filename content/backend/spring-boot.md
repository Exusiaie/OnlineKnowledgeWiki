---
title: Spring Boot
category: 后端开发
tags: [后端, java, 框架, spring]
order: 5
icon: 🍃
---

# Spring Boot Java 企业框架教程

## 概述

Spring Boot 是 Spring 家族的核心项目，旨在简化 Spring 应用的初始搭建和开发过程。它通过"约定优于配置"的理念，提供了自动配置、内嵌服务器和丰富的 Starter 依赖，让开发者能够快速创建生产级的 Java 应用。

## 为什么选择 Spring Boot

传统的 Spring 框架虽然功能强大，但配置繁琐（大量的 XML 配置）。Spring Boot 解决了这些痛点：

- **自动配置**：根据类路径中的依赖自动配置应用
- **内嵌服务器**：内置 Tomcat、Jetty 或 Undertow，无需部署 WAR
- **Starter 依赖**：一站式引入相关依赖
- **Actuator**：生产级监控和管理端点
- **无代码生成**：不需要 XML 配置

## 快速开始

使用 Spring Initializr 创建项目或手动创建：

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }

    @GetMapping("/hello/{name}")
    public String helloWithName(@PathVariable String name) {
        return "Hello, " + name + "!";
    }
}
```

## REST API 开发

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // 获取所有用户
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    // 获取单个用户
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // 创建用户
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User saved = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // 更新用户
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody User user) {
        User updated = userService.update(id, user);
        return ResponseEntity.ok(updated);
    }

    // 删除用户
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

## 数据访问（JPA）

```java
// 实体类
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // getters and setters...
}

// 仓库接口
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByNameContaining(String keyword);
    boolean existsByEmail(String email);
}

// 服务类
@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User save(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("邮箱已存在");
        }
        return userRepository.save(user);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
```

## 配置文件

Spring Boot 使用 `application.yml` 或 `application.properties`：

```yaml
# application.yml
server:
  port: 8080

spring:
  application:
    name: my-app
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: ${DB_PASSWORD}
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

# 自定义配置
app:
  name: "My Application"
  max-upload-size: 10MB

# 多环境配置
---
spring:
  config:
    activate:
      on-profile: production

server:
  port: 80
```

## 核心特性

- **自动配置**：根据依赖自动配置 Spring 上下文
- **Starter**：spring-boot-starter-web、spring-boot-starter-data-jpa 等
- **Actuator**：健康检查、指标、环境信息等监控端点
- **JPA**：通过 Spring Data JPA 简化数据库操作
- **Security**：Spring Security 集成，认证和授权
- **测试**：单元测试、集成测试全面支持
- **外部化配置**：属性文件、环境变量、命令行参数
- **DevTools**：热重启、自动刷新等开发增强功能

## 全局异常处理

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .collect(Collectors.joining(", "));
        ErrorResponse error = new ErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            message
        );
        return ResponseEntity.badRequest().body(error);
    }
}
```

## 总结

Spring Boot 已成为 Java 后端开发的事实标准。它以约定优于配置的理念大幅简化了企业级应用开发，配合 Spring 生态（Spring Security、Spring Data、Spring Cloud）能够构建从单体应用到微服务架构的全栈解决方案。
