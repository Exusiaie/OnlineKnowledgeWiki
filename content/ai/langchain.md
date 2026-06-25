---
title: LangChain
category: AI / 智能开发
tags: [ai, llm, 大语言模型, agent]
order: 6
icon: 🔗
---

# LangChain 大语言模型应用框架教程

## 概述

LangChain 是一个用于开发由大语言模型（LLM）驱动的应用程序的框架。它提供了标准化的接口来连接模型、数据源和其他工具，让开发者能够构建复杂的 LLM 应用，如聊天机器人、知识问答系统、智能代理等。

## 核心设计理念

LangChain 的核心理念是通过"链"（Chain）将不同的组件串联起来，形成完整的应用工作流。每个链可以包含 LLM 调用、数据库查询、API 请求等操作，输出可以作为下一个链的输入。

## 安装

```bash
pip install langchain langchain-openai
```

## 基础使用

```python
from langchain.llms import OpenAI

# 初始化 LLM
llm = OpenAI(temperature=0.7)

# 直接调用
result = llm("Hello! What can you do?")
print(result)
```

## Prompt 模板

Prompt 模板是 LangChain 的核心抽象之一，允许你创建可复用的提示词。

```python
from langchain.prompts import PromptTemplate

# 定义模板
template = PromptTemplate.from_template(
    "请用{language}语言解释什么是{topic}，要求简明扼要。"
)

# 填充变量
prompt = template.format(language="中文", topic="机器学习")
response = llm(prompt)
```

## 链式调用

```python
from langchain.chains import SimpleSequentialChain, LLMChain

# 第一个链：生成大纲
outline_chain = LLMChain(
    llm=llm,
    prompt=PromptTemplate.from_template(
        "为关于{topic}的文章生成一个3点大纲。\n\n主题：{topic}"
    )
)

# 第二个链：展开内容
expand_chain = LLMChain(
    llm=llm,
    prompt=PromptTemplate.from_template(
        "根据以下大纲，展开写成完整段落。\n\n大纲：{outline}"
    )
)

# 串联
chain = SimpleSequentialChain(chains=[outline_chain, expand_chain])
result = chain.run("Python 编程")
```

## Agents 智能代理

Agents 是 LangChain 最强大的特性之一。Agent 可以决定使用什么工具、以什么顺序使用，并动态规划执行路径。

```python
from langchain.agents import initialize_agent, AgentType, Tool
from langchain.tools import tool

# 定义工具
@tool
def calculator(expression: str) -> str:
    """计算数学表达式"""
    return str(eval(expression))

@tool
def search(query: str) -> str:
    """搜索信息"""
    return f"搜索结果：关于'{query}'的信息..."

# 创建 Agent
tools = [calculator, search]
agent = initialize_agent(
    tools, llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

# 执行
result = agent.run("计算 123 * 456 的结果，然后搜索 Python 相关信息")
```

## 核心功能

- **Prompt 模板**：灵活的提示词管理，支持变量、示例、聊天模板
- **Chains**：将多个 LLM 调用和其他组件组合成流水线
- **Agents**：基于 LLM 的自主决策系统，根据任务选择工具
- **Memory**：对话记忆模块，维护会话上下文
- **向量存储**：与 Chroma、Pinecone、FAISS 等集成
- **文档加载**：支持 PDF、网页、数据库等多种数据源
- **检索增强生成（RAG）**：结合文档检索和 LLM 生成
- **输出解析器**：结构化输出（JSON、CSV 等）

## RAG 示例

```python
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

# 加载文档
loader = TextLoader('knowledge_base.txt')
documents = loader.load()

# 文本分割
text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
docs = text_splitter.split_documents(documents)

# 向量化存储
vectorstore = Chroma.from_documents(docs, OpenAIEmbeddings())

# 检索+问答
retriever = vectorstore.as_retriever()
# 可以构建基于检索的问答链
```

## 总结

LangChain 正在重塑 LLM 应用的开发范式。它将复杂的 LLM 应用抽象为链和代理的概念，让开发者能够以结构化的方式构建功能强大的 AI 应用。随着 LLM 能力的不断提升，LangChain 的重要性还在持续增长。
