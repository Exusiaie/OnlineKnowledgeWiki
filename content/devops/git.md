---
title: Git
category: DevOps
tags: [devops, git, 版本控制]
order: 4
icon: 🔀
---

# Git 分布式版本控制系统教程

## 概述

Git 是由 Linus Torvalds（Linux 内核创始人）创建的分布式版本控制系统，是目前软件开发的标配工具。无论你是独立开发者还是大型团队成员，Git 都能帮你高效地追踪代码变更、协同工作和管理发布。

与集中式版本控制（如 SVN）不同，Git 的每个开发者本地都拥有完整的代码仓库和历史记录，可以离线工作，速度快且安全性高。

## 核心概念

### Git 的四个区域

1. **工作区（Workspace）**：你实际编辑的文件
2. **暂存区（Stage/Index）**：准备提交的更改
3. **本地仓库（Local Repository）**：提交的版本历史
4. **远程仓库（Remote Repository）**：托管在 GitHub/GitLab 等服务器上

### 文件状态
- **Untracked**：新文件，未被 Git 跟踪
- **Modified**：已修改但未暂存
- **Staged**：已暂存，等待提交
- **Committed**：已提交到本地仓库

## 基础操作

```bash
# 初始化仓库
git init
git clone https://github.com/user/repo.git
git clone git@github.com:user/repo.git  # SSH

# 配置
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global init.defaultBranch main

# 基本工作流
git status                    # 查看状态
git add file.txt              # 添加到暂存区
git add .                     # 添加所有修改
git add -p                    # 交互式部分添加
git commit -m "feat: 添加用户登录功能"
git commit -am "fix: 修复样式问题"  # 添加并提交已跟踪文件

# 查看历史
git log                       # 提交历史
git log --oneline             # 简洁历史
git log --graph --oneline     # 图形化分支历史
git log -p file.txt           # 查看文件的变更历史
git show <commit-hash>        # 查看某次提交的详细内容
git diff                      # 查看工作区与暂存区的差异
git diff --staged             # 查看暂存区与最后一次提交的差异
git blame file.txt            # 查看文件每一行的修改者和提交
```

## 分支管理

分支是 Git 最强大的特性之一，让你可以并行开发不同的功能：

```bash
# 查看分支
git branch                    # 本地分支
git branch -r                 # 远程分支
git branch -a                 # 所有分支

# 创建分支
git branch feature/login      # 创建分支
git checkout -b feature/login # 创建并切换到新分支
git switch -c feature/login   # Git 2.23+ 推荐写法

# 切换分支
git checkout main
git switch main               # Git 2.23+ 推荐写法

# 合并分支
git checkout main
git merge feature/login       # 将 feature/login 合并到 main

# 删除分支
git branch -d feature/login   # 删除已合并的分支
git branch -D feature/login   # 强制删除
git push origin --delete feature/login  # 删除远程分支

# 变基（Rebase）
git checkout feature/login
git rebase main               # 将当前分支的提交移到 main 之上
```

## 撤销操作

```bash
# 撤销工作区的修改
git checkout -- file.txt      # 放弃单个文件的修改
git restore file.txt          # Git 2.23+ 推荐

# 取消暂存
git reset HEAD file.txt
git restore --staged file.txt # Git 2.23+ 推荐

# 修改最后一次提交
git commit --amend            # 修改提交信息或补充文件

# 回退版本
git reset --soft HEAD~1       # 回退提交，保留修改在暂存区
git reset --mixed HEAD~1      # 回退提交，保留修改在工作区（默认）
git reset --hard HEAD~1       # 回退提交，删除所有修改（危险！）
git revert <commit-hash>      # 创建新提交来撤销某次提交（安全）

# 恢复忘记的提交
git reflog                    # 查看所有 HEAD 变更历史
git checkout <reflog-hash>    # 恢复到某个状态
```

## 远程操作

```bash
# 远程仓库管理
git remote -v                             # 查看远程仓库
git remote add origin <url>               # 添加远程仓库
git remote remove origin                  # 移除远程仓库

# 推送与拉取
git push origin main                      # 推送到远程
git push -u origin main                   # 首次推送并建立追踪
git push origin feature/login             # 推送分支
git push --force-with-lease origin main   # 安全地强制推送

# 拉取更新
git pull origin main                      # 拉取并合并（fetch + merge）
git pull --rebase origin main             # 拉取并变基（推荐）
git fetch origin                          # 仅获取远程更新，不合并

# 删除远程分支
git push origin --delete feature/login
```

## 协作工作流

### Git Flow

适合有计划发布周期的项目：

- `main`：生产环境代码
- `develop`：开发主干
- `feature/*`：功能开发（从 develop 切出，合并回 develop）
- `release/*`：发布准备（bug 修复、版本号更新）
- `hotfix/*`：紧急修复（从 main 切出，合并到 main 和 develop）

### GitHub Flow

适合持续部署的项目（更简单）：

- `main`：始终可部署
- `feature/*`：功能分支，通过 PR 合并

## 高级技巧

```bash
# 暂存当前工作（Stash）
git stash                          # 暂存修改
git stash save "WIP: 用户模块"      # 带描述的暂存
git stash list                     # 查看暂存列表
git stash pop                      # 恢复最近的暂存
git stash apply stash@{1}          # 恢复指定暂存
git stash drop stash@{1}           # 删除指定暂存

# Cherry-pick：挑选特定提交
git cherry-pick <commit-hash>      # 将某次提交应用到当前分支

# 交互式变基（整理提交历史）
git rebase -i HEAD~3               # 编辑最近 3 次提交

# 标签（Tag）
git tag v1.0.0                     # 轻量标签
git tag -a v1.0.0 -m "Release v1.0.0"  # 附注标签
git push origin v1.0.0             # 推送标签
git push origin --tags             # 推送所有标签

# 暂存区文件恢复
git checkout <commit-hash> -- file.txt  # 从历史中恢复文件
```

## 核心概念

- **分支管理**：创建、切换、合并、删除、变基
- **合并与变基**：merge vs rebase 的选择
- **远程仓库**：clone、push、pull、fetch
- **标签**：版本发布标记
- **暂存区**：add、reset、restore
- **Git Flow**：规范化的工作流程
- **冲突解决**：合并和变基时处理冲突
- **reflog**：恢复"丢失"的提交

## 冲突解决

```bash
# 合并出现冲突时
git merge feature/login
# 冲突! 手动编辑冲突文件

# 冲突标记
<<<<<<< HEAD
当前分支的代码
=======
合并分支的代码
>>>>>>> feature/login

# 解决冲突后
git add resolved_file.txt
git commit -m "merge: 解决与 feature/login 的冲突"
```

## 总结

Git 是所有开发者的必备技能。从简单的 add/commit/push 到复杂的分支管理和变基操作，熟练掌握 Git 能显著提升开发效率。建议在日常工作中多使用命令行而非 GUI 工具，深入理解每个命令背后的原理。记住：提交频繁、描述清晰、分支合理。
