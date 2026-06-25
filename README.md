# 开发计划

1. 解决 tag搜索不到的问题
2. 新增在页面中添加图片的功能
3. 完成左边栏的内容搭建
4. 将侧边栏内容修改流程输出进该文档





































# 如何添加页面？

在content对应文件夹下新增.md文档， 且配置好 frontmatter

> frontmatter含义：
>
> title: Pandas                                                      
>   category: Python / 数据科学                                        
>   tags: [python, 数据分析, 数据处理]                                 
>   order: 3                                                           
>   icon: 📋这几个 Frontmatter是什么含义                               
>
>   Thought for 1s (ctrl+o to expand)
>
> ● 这五个字段各自控制页面中的一个具体位置：
>
>   title: Pandas
>
>   侧边栏里的文字 + 卡片上的标题 + 页面内的大标题。
>
>   一个字段，三处使用。
>
>   category: Python / 数据科学
>
>   归属哪个分类。
>   脚本靠这个字段把文章挂到正确的侧边栏分组下。值必须和对应目录下
>   index.md 的 title
>   完全一致，否则脚本找不到匹配分类就会扔进"未分类"。
>
>   tags: [python, 数据分析, 数据处理]
>
>   搜索关键词。 用户在顶部搜索框输入"数据"时，搜不到标题里的文字也能靠
>   标签命中。不影响任何可见 UI。
>
>   order: 3
>
>   排序权重。 决定 Pandas 在"Python /
>   数据科学"这个侧边栏分组里排第几位。数字越小越靠前。
>
>   Python3 教程  (order: 1)  ← 最上面
>   NumPy        (order: 2)
>   Pandas       (order: 3)
>   Matplotlib   (order: 4)
>   ...
>
>   icon: 📋
>
>   卡片和侧边栏前面的小图标。 纯 emoji，没有就用默认的 📄。
>

写完md后执行 node generate-index.js

该脚本会 

 1. 遍历 content/ 下全部 .md 文件

  2. 逐个解析 Frontmatter
  3. 从零重建整个 index.json

  不追加、不增量——本质上就是"把当前 content/ 目录的完整快照，翻译成
  index.json"。新增文件、删除文件、修改文件等等，跑一次脚本就能正确反映目录的当前状态。