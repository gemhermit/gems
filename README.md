# 宝石居士博客

这是基于 Hexo 框架构建的个人博客网站，主题为 Nexmoe。

## 简介

宝石居士的个人博客，专注于计算机、教育、社会等话题的思想碰撞与分享。

- **站点地址**: https://gem.bago.top
- **博客主题**: Nexmoe
- **框架版本**: Hexo 7.3.0

## 功能特性

- 📝 支持 Markdown 文章编写
- 🎨 使用 Nexmoe 主题，界面简洁美观
- 🎵 集成 APlayer/Meting 音乐播放器
- 📊 文章字数统计功能
- 📡 RSS/Atom 订阅支持
- 🗺️ Sitemap 站点地图（SEO）
- 🤖 robots.txt 搜索引擎抓取规则
- 🏷️ 标签和分类管理
- 📱 响应式设计，支持移动端访问

## 快速开始

### 环境要求

- Node.js >= 14.0（Hexo 7 要求）
- Git

### 安装

```bash
# 克隆项目
git clone git@github.com:gemhermit/gem.git
cd gem

# 安装依赖
npm install
```

### 本地运行

```bash
# 启动本地服务器
npm run server

# 访问 http://localhost:4000
```

### 创建新文章

```bash
# 创建新文章
hexo new "文章标题"

# 文章将在 source/_posts/ 目录下生成
```

### 构建和部署

```bash
# 清理缓存
npm run clean

# 生成静态文件
npm run build

# 部署到 GitHub Pages
npm run deploy
```

## 项目结构

```
gem/
├── source/              # 源文件目录
│   ├── _posts/         # 文章目录
│   ├── img/            # 图片资源
│   ├── about.md        # 关于页面
│   ├── cv.md           # 简历页面
│   ├── friends.md      # 友链页面
│   └── donate.md       # 捐赠页面
├── themes/             # 主题目录
├── public/             # 生成的静态文件
├── _config.yml         # 站点配置文件
├── _config.nexmoe.yml  # Nexmoe 主题配置
└── package.json        # 项目依赖
```

## 配置说明

### 站点配置

编辑 `_config.yml` 文件可以修改站点基本信息：

- `title`: 网站标题
- `author`: 作者名称
- `url`: 网站地址
- `language`: 语言设置
- `theme`: 使用的主题

### 主题配置

编辑 `_config.nexmoe.yml` 文件可以自定义 Nexmoe 主题的样式和功能。

## 技术栈

- **框架**: Hexo 7.3.0
- **主题**: Nexmoe 4.2.2
- **渲染引擎**:
  - hexo-renderer-marked (Markdown)
  - hexo-renderer-ejs (模板)
  - hexo-renderer-stylus (样式)
- **插件**:
  - hexo-deployer-git (自动部署)
  - hexo-generator-feed (RSS 生成)
  - hexo-generator-sitemap (SEO 站点地图)
  - aplayer / meting (音乐播放器)
  - hexo-wordcount (字数统计)

## 部署

本项目配置了自动部署到 GitHub Pages：

```yaml
deploy:
  type: git
  repo: git@github.com:gemhermit/gem.git
  branch: master
```

执行 `npm run deploy` 即可自动构建并推送到远程仓库。

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run server` | 启动本地预览服务器 |
| `npm run build` | 生成静态文件 |
| `npm run clean` | 清理缓存和生成的文件 |
| `npm run deploy` | 部署到远程服务器 |
| `hexo new [layout] <title>` | 创建新文章 |
| `hexo new page <name>` | 创建新页面 |

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

本项目仅供个人学习和交流使用。

## 联系方式

- 博客: https://gem.bago.top
- 作者: 宝石居士

---

使用 Hexo 强力驱动 | 主题: Nexmoe
