---
title: 服务端介绍
icon: server
order: 2
---

## 部署

除了在 Vercel 免费部署外，你可以通过 docker 进行部署或直接部署在自托管环境上，也可以部署到其他常见云平台。详见

- [独立部署](../deploy/vps.md)

- [阿里云函数计算](../deploy/aliyun-fc.md)

- [阿里云计算巢](../deploy/aliyun-computenest.md)

- [百度云函数计算](../deploy/baidu-cfc.md)

- [Cloudbase](../deploy/cloudbase.md)

- [Railway](../deploy/railway.md)

## 多数据库支持

除了官方默认的 LeanCloud 之外，Waline 还支持多种数据库，包括 MySQL、PostgreSQL、SQLite 以及 MongoDB。

你只需配置对应的数据库的环境变量，Waline 会自动根据你配置的环境变量切换到对应的数据存储服务。

详情请见 [多数据库支持](../database.md)。

## 配置

服务端大部分的配置可以通过通过环境变量进行配置，你也可以在主入口文件中配置一些高级选项。

有关配置的详细信息，详见 [服务端参考 → 环境变量](../../reference/server/env.md) 和 [服务端参考 → 配置](../../reference/server/config.md)。

## 评论通知

我们支持多种方式在用户评论时向用户或博主发出通知，详见 [评论通知](../features/notification.md)。

## 社交登录

我们支持社交帐号登录，目前支持 GitHub、Twitter、Facebook。

::: tip

我们计划在未来版本添加更多的社交应用支持，敬请期待。

:::
