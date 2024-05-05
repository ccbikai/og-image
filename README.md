# og-image

提取网页 OpenGraph 图片用于卡片预览。

---

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-F69652?style=flat&logo=cloudflare&logoColor=white)
![GitHub License](https://img.shields.io/github/license/ccbikai/og-image)
![GitHub Repo stars](https://img.shields.io/github/stars/ccbikai/og-image)

## 使用方法

**在任意网页URL前面增加`https://og-image.html.zone/`**。

比如 <https://html.zone/> => <https://og-image.html.zone/https://html.zone/> 。

## 部署方式

支持 CLoudflare Worker 部署。

```sh
# 克隆此项目
git clone https://github.com/ccbikai/og-image.git
cd og-image

# 安装依赖
npm install

# 发布
npm run deploy
```

## 演示

### HTML.ZONE

![HTML.ZONE](https://og-image.html.zone/https://html.zone/)

### Astro

![Astro](https://og-image.html.zone/https://astro.build)

### Next.js

![Next.js](https://og-image.html.zone/https://nextjs.org)

### Nuxt

![Nuxt](https://og-image.html.zone/https://nuxt.com)
