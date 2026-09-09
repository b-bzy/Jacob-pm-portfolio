# 鲍泽英 · AI 产品经理作品集

> 南洋理工大学 管理科学与工程（人工智能方向）硕士 · 上海立信会计金融学院 金融工程学士
> 求职意向：AI 产品经理 / 金融 AI 产品经理
> GitHub [@b-bzy](https://github.com/b-bzy) ｜ bbzy78161@gmail.com

金融工程本科（GPA 90.8、专业前 1%）+ 人工智能方向硕士，三段 AI 产品经理实习覆盖**跨境语音、期货合规、供应链**三类场景。这个作品集收录 5 个项目，横跨 **AI 语音产品、Agent 工作流、RAG 知识库、金融量化建模**四条主线——既有从 0 到 1 的产品设计，也有牵头 20+ 人团队完成的两年期学术研究。

---

## 一、项目索引

| # | 项目 | 类型 | 场景 | 关键成果 |
|---|---|---|---|---|
| ① | [AI 语音外呼销售 Agent](https://github.com/b-bzy/ai-voice-sales-agent) | AI 语音产品 · 0→1 | 金融 / 跨境电商外呼 | 跑通 MVP 闭环，建三维评测体系，推动全双工模型自研落地 |
| ② | [AI-Native 内部协作 Agent](https://github.com/b-bzy/slack-notion-ops-agent) | Agent 工作流 | 跨时区团队运营 | 覆盖 9 类业务，意图路由准确率 95%+ |
| ③ | [大盘市场情绪 Agent](https://github.com/b-bzy/research-sentiment-agent) | Agent · 金融科技 | 期货交易决策 | 研报多空观点量化打分，情绪指标定期主动推送 |
| ④ | [期货合规 RAG 问答助手](https://github.com/b-bzy/futures-compliance-rag) | RAG 知识库 | 期货风控合规 | 本地化部署，OCR → 语义切分 → 混合召回 → 重排序全链路 |
| ⑤ | [分布式光伏指数保险定价](https://github.com/b-bzy/distributed-pv-index-insurance) | 金融建模 · 产品设计 | 绿色金融 / 保险精算 | 国创项目负责人，牵头 20+ 人团队，省级以上奖项 10 余项 |

---

## 二、项目详述

### ① [AI 语音外呼销售 Agent（K-tel）](https://github.com/b-bzy/ai-voice-sales-agent)

`KapibalaAI · AI 产品经理 · 新加坡 & 阿联酋 · 2026.01 – 2026.08`

面向金融行业与海外电商的 AI 语音外呼产品，从 0 到 1 建设。负责终端系统信息架构设计与 MVP 验证闭环（取任务 → 拨号 → 对话 → 落库），搭建问卷测评台并招募母语测试团队，参与建立**拟人度 / 稳定性 / 转化率**三维 AI 调优评测体系。针对外采 API 成本高、效果差的问题，参与电销场景**全双工语音模型**自研（与高校共研），支持数据标注与后训练方向制定，建立 bad case 收集机制并推动自研模型落地。

`AI 语音` `全双工模型` `信息架构` `MVP 验证` `LLM 评测` `后训练` `出海产品`

### ② [AI-Native 内部协作 Agent（Slack × Notion）](https://github.com/b-bzy/slack-notion-ops-agent)

`KapibalaAI · AI 产品经理 · 新加坡 & 阿联酋 · 2026.01 – 2026.08`

测试并交付 Slack × Notion 协作 Agent，让团队在 Slack 里说人话、Agent 负责识别意图并在 Notion 里结构化落库。覆盖**反馈 / 报销 / 招聘 / 任务 / 会议纪要等 9 类业务**，意图路由准确率 **95%+**，把跨时区团队的运营流程沉淀为可配置的自动化工作流。

`AI Agent` `意图路由` `Slack / Notion 集成` `工作流自动化` `内部效率工具`

### ③ [大盘市场情绪 Agent](https://github.com/b-bzy/research-sentiment-agent)

`东海期货（总部）· AI 产品经理 · 上海 · 2024.10 – 2025.03`

基于交易员对大盘情绪指标的需求，搭建研报情绪化打分 Agent。实现批量抓取多家期货公司研报，提取多空观点关键词、设定统计区间、建立评测指标与打分模型，把定性的多空表述转成可横向纵向比较的量化指标，并定期主动推送。

`AI Agent` `金融科技` `研报解析` `情绪量化` `数据采集` `指标设计`

### ④ [期货合规 RAG 问答助手](https://github.com/b-bzy/futures-compliance-rag)

`东海期货（总部）· AI 产品经理 · 上海 · 2024.10 – 2025.03`

针对法规更新频繁、合规文件涉密不可出内网的痛点，设计基于**本地化 RAG 架构**的合规 AI 助手。打通 PDF 文件 OCR 识别 → 语义切分入库 → 混合召回 → 重排序的完整链路，提供对话式合规条款即时查询并给出条款出处。

`RAG` `本地化部署` `金融合规` `OCR` `混合检索` `Rerank`

### ⑤ [分布式光伏指数保险定价](https://github.com/b-bzy/distributed-pv-index-insurance)

`国家级大学生创新创业训练计划项目（S202311047082）· 项目负责人 · 2022.10 – 2024.05`

作为总负责人牵头 20+ 人跨学科团队完成为期两年的研究。基于 NASA POWER 卫星辐照数据（1984–2022 共 468 个月 GHI 数据），用 ARIMA(1,0,1)(2,0,1,12) 对辐照建模预测，以累积能量产出（AEP）为指数触发器设计分布式光伏指数保险产品，按分位数逐月厘定费率（触发水平 P75 时年费率 8.04%，P90 时 2.74%）。仓库归档论文、参赛作品与获奖证书共 5 份成果。

累计获省级以上奖项 10 余项，包括**美国大学生数学建模竞赛（ICM）国际一等奖**（全球前 8%）、正大杯全国大学生市场调查与分析大赛上海市一等奖、中天科技杯上海市三等奖等。

`指数保险 / 参数保险` `ARIMA 时序建模` `NASA 辐照数据` `费率厘定` `极值理论` `结构方程模型` `绿色金融`

---

## 三、能力地图

| 方向 | 相关项目 |
|---|---|
| AI 语音产品设计与评测 | ① |
| Agent 设计与工作流自动化 | ① ② ③ |
| RAG 与知识库架构 | ④ |
| 金融业务理解（期货 / 保险 / 风控合规） | ③ ④ ⑤ |
| 数据建模与量化分析 | ③ ⑤ |
| 0 → 1 产品设计与 MVP 验证 | ① ② |

**技能标签**：需求分析、信息架构设计、MVP 验证、AI Agent、RAG、LLM 评测、语音产品、数据标注与后训练、金融风控合规、供应链数字化、Python、R、TypeScript、Go、Docker、Git、Claude Code、Codex

---

## 四、其他公开仓库

作品集之外的一些个人实践：

- [derivatives-clause-rag](https://github.com/b-bzy/derivatives-clause-rag) — 期权条款检索系统，BM25 + BGE-M3 混合检索 · 自研 score-aware RRF · 交叉编码器重排，覆盖境内六家交易所与 SGX/HKEX/OCC
- [AI-Hotspot-Daily](https://github.com/b-bzy/AI-Hotspot-Daily) — AI 热点日报自动抓取与整理
- [KapibalaAI_SKILL](https://github.com/b-bzy/KapibalaAI_SKILL) — 面向日常办公场景设计的 Agent Skill 集合

---

## 五、说明

① – ④ 源自实习期间的公司项目，仓库内公开材料以**产品设计思路与方法论**为主，不包含任何公司数据、客户信息、内部文档与源码。⑤ 为完整可公开的学术研究成果归档。

联系方式：bbzy78161@gmail.com ｜ 微信 bzy-151
