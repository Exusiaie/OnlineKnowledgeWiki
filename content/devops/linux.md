---
title: Linux
category: DevOps
tags: [devops, linux, 操作系统]
order: 3
icon: 🐧
---

# Linux 操作系统教程

## 概述

Linux 是一个开源的操作系统内核，基于 Unix 架构设计。它驱动着全球绝大多数服务器、超级计算机和嵌入式设备，是云计算和 DevOps 的基石。无论是作为后端开发者还是运维工程师，熟练使用 Linux 命令行是必备的核心技能。

Linux 发行版众多，常见的有：Ubuntu（新手友好）、CentOS/Rocky Linux（服务器常用）、Debian（稳定）、Arch Linux（激进更新）。

## 文件系统与路径

Linux 文件系统采用树形结构，一切皆文件：

```
/              根目录
├── /bin       基本命令二进制文件
├── /etc       系统配置文件
├── /home      用户主目录
├── /var       可变数据（日志、缓存）
├── /tmp       临时文件
├── /usr       用户程序和库
├── /opt       第三方软件
├── /proc      进程和系统信息（虚拟文件系统）
└── /dev       设备文件
```

## 基础命令

```bash
# 目录操作
pwd                          # 显示当前目录
ls -la                       # 详细列出所有文件
ls -lh                       # 人类可读的文件大小
cd /path/to/dir              # 切换目录
cd ~                         # 回到主目录
cd -                         # 回到上一个目录
mkdir -p a/b/c               # 递归创建目录
rmdir dirname                # 删除空目录

# 文件操作
touch file.txt               # 创建空文件
cp source.txt dest.txt       # 复制文件
cp -r source_dir/ dest_dir/  # 递归复制目录
mv old.txt new.txt           # 移动/重命名
rm file.txt                  # 删除文件
rm -rf directory/            # 递归强制删除目录（危险！）
cat file.txt                 # 查看文件内容
less file.txt                # 分页查看（q 退出）
head -n 10 file.txt          # 查看前 10 行
tail -n 20 file.txt          # 查看后 20 行
tail -f file.txt             # 实时跟踪文件增长

# 查找文件
find . -name "*.log"         # 按名称查找
find . -type d -name "node_modules"  # 查找目录
find . -mtime -7             # 最近 7 天修改的文件
find . -size +100M           # 大于 100MB 的文件
```

## 文本处理

```bash
# grep：文本搜索
grep "error" log.txt                        # 搜索包含 error 的行
grep -i "error" log.txt                     # 忽略大小写
grep -r "TODO" ./src/                       # 递归搜索目录
grep -v "debug" log.txt                     # 排除匹配行
grep -c "error" log.txt                     # 统计匹配行数
grep -A 3 -B 2 "error" log.txt              # 显示前后文

# sed：流编辑器
sed 's/old/new/g' file.txt                  # 替换文本
sed -i 's/old/new/g' file.txt               # 直接修改文件
sed -n '5,10p' file.txt                     # 打印 5-10 行
sed '/pattern/d' file.txt                   # 删除匹配行

# awk：文本分析工具
awk '{print $1, $3}' file.txt               # 打印第 1 和第 3 列
awk -F: '{print $1}' /etc/passwd            # 以冒号分隔
awk '$3 > 100 {print $1}' file.txt          # 条件过滤

# 管道与重定向
command1 | command2                         # 管道：将输出传给下一个命令
command > output.txt                        # 重定向输出（覆盖）
command >> output.txt                       # 重定向输出（追加）
command 2> error.txt                        # 重定向错误输出
command &> all.txt                          # 重定向所有输出
command < input.txt                         # 文件作为输入
```

## 权限管理

```bash
# 文件权限（r=4, w=2, x=1）
# -rwxr-xr--  1 user group  size date name
#  ↑  ↑  ↑
#  |  |  其他用户权限 (r--)
#  |  组权限 (r-x)
#  所有者权限 (rwx)

chmod +x script.sh           # 添加执行权限
chmod 755 script.sh           # rwxr-xr-x
chmod 644 file.txt            # rw-r--r--
chmod -R 755 directory/       # 递归修改

# 所有者修改
chown user:group file.txt
chown -R user:group directory/
```

## 进程管理

```bash
# 查看进程
ps aux                        # 所有进程
ps aux | grep nginx           # 查找特定进程
top                           # 实时进程监控（q 退出）
htop                          # 更友好的进程查看器

# 管理进程
kill <PID>                    # 终止进程（SIGTERM）
kill -9 <PID>                 # 强制终止（SIGKILL）
killall nginx                 # 按名称终止
pkill -f "python app.py"      # 按命令匹配终止

# 后台运行
command &                     # 后台运行
nohup command &               # 退出终端后继续运行
bg                            # 查看后台任务
fg %1                         # 将任务 1 调到前台

# 系统信息
uname -a                      # 系统信息
df -h                         # 磁盘使用
du -sh *                      # 目录大小
free -h                       # 内存使用
uptime                        # 运行时间
```

## Shell 脚本

```bash
#!/bin/bash
# 这是我的第一个 Shell 脚本

set -e  # 遇到错误立即退出

# 变量
APP_NAME="myapp"
VERSION="1.0.0"
DEPLOY_DIR="/opt/$APP_NAME"

# 条件判断
if [ ! -d "$DEPLOY_DIR" ]; then
    echo "创建部署目录: $DEPLOY_DIR"
    mkdir -p "$DEPLOY_DIR"
fi

# 循环
echo "开始备份..."
for file in "$DEPLOY_DIR"/*; do
    if [ -f "$file" ]; then
        echo "备份: $file"
        cp "$file" "$file.backup"
    fi
done

# 函数
deploy() {
    echo "部署 $APP_NAME v$VERSION 到 $DEPLOY_DIR"
    # 部署逻辑...
}

rollback() {
    echo "回滚操作..."
    # 回滚逻辑...
}

# 参数处理
case "$1" in
    deploy)
        deploy
        ;;
    rollback)
        rollback
        ;;
    *)
        echo "用法: $0 {deploy|rollback}"
        exit 1
        ;;
esac

echo "操作完成!"
```

## 核心知识

- **文件系统**：树形目录结构，一切皆文件
- **权限管理**：用户、组、权限位（rwx）
- **进程管理**：ps、top、kill、后台运行
- **Shell 脚本**：变量、条件、循环、函数、参数
- **包管理**：apt（Debian/Ubuntu）、yum/dnf（CentOS/RHEL）
- **网络配置**：ip、ss、netstat、curl
- **计划任务**：crontab 定时执行脚本
- **系统服务**：systemctl 管理守护进程

## 包管理

```bash
# Ubuntu/Debian (apt)
sudo apt update                       # 更新包列表
sudo apt upgrade                      # 升级所有包
sudo apt install nginx                # 安装
sudo apt remove nginx                 # 卸载
sudo apt search keyword               # 搜索

# CentOS/RHEL (yum/dnf)
sudo yum update
sudo yum install nginx
sudo yum remove nginx
```

## 总结

Linux 是服务器世界的主角，99% 的云服务器运行着 Linux。从文件操作到进程管理，从 Shell 脚本到系统调优，扎实的 Linux 功底是 DevOps 和后端开发的基石。日常多使用命令行，多读 man 手册（man command），日积月累便能游刃有余。
