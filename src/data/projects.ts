export const categories = ['AI+电商', 'AI+金融', 'AI+自媒体', '其他'] as const

export type ProjectCategory = (typeof categories)[number]

export type Project = {
  id: string
  code: string
  title: string
  shortTitle: string
  category: ProjectCategory
  company: string
  role: string
  year: string
  summary: string
  decision: string
  evidence: Array<{ value: string; label: string }>
  tags: string[]
  href: string
  private?: boolean
  provenance: string
}

export const projects: Project[] = [
  {
    id: 'ecommerce-service', code: 'A01', title: '跨境电商智能客服 Demo', shortTitle: '跨境客服 Agent', category: 'AI+电商',
    company: '南洋理工大学 · Capstone', role: '产品设计 / 全栈实现', year: '2026.01–2026.04',
    summary: '为复杂多意图咨询设计两阶段识别、工具调用与人工确认闭环，让查单、改址和退款安全地发生在同一段对话中。',
    decision: '模型负责理解语言，确定性后端负责权限、校验与执行。',
    evidence: [
      { value: '98%', label: '第一阶段召回率 · 自建测试集' },
      { value: '87%', label: '第二阶段精确匹配率' },
      { value: '200+', label: 'QPS · 模拟并发验证' },
    ],
    tags: ['两阶段意图识别', 'MCP', 'HITL', '多语言'],
    href: 'https://github.com/b-bzy/cross-border-ecommerce-customer-service-demo',
    provenance: '跨境电商业务原型 / 脱敏 Demo；指标按自建测试集与模拟压测口径展示。',
  },
  {
    id: 'voice-sales', code: 'A02', title: 'AI 语音外呼销售 Agent', shortTitle: '语音销售 Agent', category: 'AI+电商',
    company: 'KapibalaAI', role: 'AI 产品经理', year: '2026.01–2026.08',
    summary: '从销售任务配置、拨号、实时对话到数据回流搭建 0→1 SaaS MVP，并以系统化评测支持模型选择和客户交付。',
    decision: '把对话体验拆成拟人度、稳定性与转化效果，避免只凭主观试听选模型。',
    evidence: [
      { value: '0→1', label: '语音销售 SaaS MVP' },
      { value: '3D', label: '多维对话评测体系' },
      { value: 'Full', label: '全双工模型方案参与' },
    ],
    tags: ['Voice AI', 'LLM 评测', '出海 SaaS', '客户交付'],
    href: 'https://github.com/b-bzy/ai-voice-sales-agent',
    provenance: '公司项目脱敏重构 Demo；历史业务结果不等同于仓库复现结果。',
  },
  {
    id: 'feishu-workflow', code: 'A03', title: '电商中台业务 Agent', shortTitle: '飞书业务 Agent', category: 'AI+电商',
    company: '万物新生 / 爱回收', role: 'AI 产品经理 / POC 开发', year: '2026.08–至今',
    summary: '把优惠券等运营 SOP 转化为可审核、可追踪的飞书 Agent 工作流，连接员工入口、数据底座和管理端。',
    decision: 'AI 负责理解和填充，正式提交、附件绑定与关键审批继续保留人工确认。',
    evidence: [
      { value: 'Bot', label: '员工自然语言入口' },
      { value: 'Base', label: '业务草稿与审计底座' },
      { value: 'HITL', label: '正式提交人工确认' },
    ],
    tags: ['飞书工作流', '业务 Agent', '审计链路', '人机协同'],
    href: 'https://github.com/b-bzy/paixiaobao-feishu-workflow', private: true,
    provenance: '真实业务流程的脱敏项目档案；仓库为私有访问。',
  },
  {
    id: 'conversation-hub', code: 'A04', title: '会话数据中台 × Agent 标签引擎', shortTitle: '会话数据中台', category: 'AI+电商',
    company: 'KapibalaAI', role: '产品方案 / 架构设计', year: '2026',
    summary: '统一多平台会话数据模型，以六维标签和分层标注漏斗持续生产分析、评测与训练数据。',
    decision: '先统一会话事实层，再派生标签、评测和训练数据，避免各业务重复建设。',
    evidence: [
      { value: '10', label: '张核心数据表' },
      { value: '6D', label: '六维标签体系' },
      { value: '3', label: '类训练数据路径' },
    ],
    tags: ['数据中台', 'SFT / DPO', '蒸馏', '弱监督'],
    href: 'https://github.com/b-bzy/conversation-data-hub', private: true,
    provenance: 'KapibalaAI 业务系统档案；只展示可公开的结构与方法。',
  },
  {
    id: 'pv-insurance', code: 'B01', title: '分布式光伏指数保险定价', shortTitle: '光伏指数保险', category: 'AI+金融',
    company: '金融工程研究项目', role: '项目负责人', year: '2022–2024',
    summary: '从长期卫星辐照数据出发，完成气象风险建模、指数触发器设计、费率厘定与风险分层。',
    decision: '用可解释的气象指数连接能源损失与保险定价，让触发规则可验证、可执行。',
    evidence: [
      { value: '468', label: '个月 NASA GHI 数据' },
      { value: '8.04%', label: 'P75 年费率' },
      { value: '10+', label: '省级以上奖项' },
    ],
    tags: ['ARIMA', '保险定价', '绿色金融', '数据建模'],
    href: 'https://github.com/b-bzy/distributed-pv-index-insurance',
    provenance: '团队研究项目；页面区分团队成果与本人项目负责职责。',
  },
  {
    id: 'compliance-rag', code: 'B02', title: '期货合规 RAG 问答助手', shortTitle: '合规 RAG', category: 'AI+金融',
    company: '东海期货 · 独立公开复现', role: 'AI 产品经理 / 独立复现', year: '2024.10–2025.03',
    summary: '面向监管条款构建可追溯检索问答，从文档解析、混合召回到融合排序和引用拒答形成完整链路。',
    decision: '准确回答之前先保证“找到正确条款”，并让每个结论都能回到来源。',
    evidence: [
      { value: '191', label: '份公开规则文档' },
      { value: '0.807', label: 'Recall@1' },
      { value: '+8pp', label: '相较基线提升' },
    ],
    tags: ['RAG', 'RRF', 'Cross-Encoder', '金融合规'],
    href: 'https://github.com/b-bzy/futures-compliance-rag',
    provenance: '基于公开语料的独立实现，指标可按仓库说明复现。',
  },
  {
    id: 'sentiment-agent', code: 'B03', title: '大盘市场情绪 Agent', shortTitle: '市场情绪 Agent', category: 'AI+金融',
    company: '东海期货', role: 'AI 产品经理', year: '2024.10–2025.03',
    summary: '将研究文本中的多空表述转成可纵向追踪、横向比较的市场情绪信号，并设计定期推送机制。',
    decision: '不让模型直接给交易结论，而是先输出可解释、可回溯的结构化中间信号。',
    evidence: [
      { value: 'Multi', label: '多源研报采集' },
      { value: 'Score', label: '观点量化评分' },
      { value: 'Push', label: '定期信号推送' },
    ],
    tags: ['Agent', '研报解析', '情绪量化', '指标设计'],
    href: 'https://github.com/b-bzy/research-sentiment-agent',
    provenance: '公司实践的脱敏项目档案。',
  },
  {
    id: 'collab-agent', code: 'C01', title: 'AI-Native 内部协作 Agent', shortTitle: '协作 Agent', category: '其他',
    company: 'KapibalaAI', role: 'AI 产品经理', year: '2026.01–2026.08',
    summary: '把 Slack 与 Notion 中的自然语言需求路由到反馈、报销、招聘、任务等结构化协作流程。',
    decision: '将“理解意图”和“执行工作流”分层，通过状态机、权限和回写保障协作可靠性。',
    evidence: [
      { value: '9', label: '类业务意图' },
      { value: '95%+', label: '历史意图路由准确率' },
      { value: '2-way', label: 'Slack × Notion' },
    ],
    tags: ['意图路由', '审批状态机', '权限', 'HITL'],
    href: 'https://github.com/b-bzy/ai-native-collaboration-agent-demo',
    provenance: '公开仓库使用合成数据；95%+ 为历史业务项目口径，不是 Demo 复现指标。',
  },
  {
    id: 'content-ops', code: 'D01', title: 'AI 内容运营与自媒体作品集', shortTitle: 'AI 内容运营', category: 'AI+自媒体',
    company: '个人实践', role: '账号主理 / 内容运营', year: '2025–2026',
    summary: '从选题、检索到成稿、配图、渲染与发布，沉淀可复用的 AI 内容生产流程。',
    decision: '把内容生产拆成可复用步骤，同时保留选题判断、观点和最终审核的人工作用。',
    evidence: [
      { value: '1091', label: '企业官号关注者' },
      { value: '11', label: '视频与图文作品' },
      { value: '62s', label: '品牌视频' },
    ],
    tags: ['内容策略', '账号运营', 'AI 创作'],
    href: 'https://github.com/b-bzy/ai-content-operations', provenance: '个人运营与内容作品档案。',
  },
  {
    id: 'hotspot-daily', code: 'D02', title: 'AI-Hotspot-Daily', shortTitle: 'AI 热点日报', category: 'AI+自媒体',
    company: '个人实践', role: '独立开发', year: '2026',
    summary: '用云端流水线聚合中英文信息源，持续生成日报、选题榜、长文与资讯笔记。',
    decision: '用多源交叉、去重和排序降低信息噪音，再让生成模块服务不同内容载体。',
    evidence: [
      { value: '25', label: '个中英文信息源' },
      { value: '5', label: '条云端流水线' },
      { value: '4', label: '类内容产品' },
    ],
    tags: ['GitHub Actions', '内容自动化', '信息聚合'],
    href: 'https://github.com/b-bzy/AI-Hotspot-Daily', provenance: '个人开源项目。',
  },
  {
    id: 'flashidea', code: 'D03', title: 'FlashIdea', shortTitle: 'FlashIdea', category: 'AI+自媒体',
    company: '个人实践', role: '产品设计 / 全栈实现', year: '2026',
    summary: '让语音与文本闪念经过多模态转写和结构化生成，进入可继续加工的内容资产库。',
    decision: '以“捕获—处理—管理”闭环替代一次性生成，让灵感可以积累、检索和再利用。',
    evidence: [
      { value: '3-step', label: '捕获 / 处理 / 管理' },
      { value: 'Gemini', label: '2.5 Flash' },
      { value: 'Multi', label: '语音与文本输入' },
    ],
    tags: ['AI Native', '多模态', '内容资产'], href: 'https://github.com/b-bzy/FlashIdea', provenance: '个人开源项目。',
  },
  {
    id: 'claude-skills', code: 'D04', title: 'Claude Skills', shortTitle: 'Agent Skills', category: 'AI+自媒体',
    company: '个人实践', role: 'Skill 设计 / 开发', year: '2026',
    summary: '把稳定规范固化进可复用 Skill，把需要理解上下文和取舍的部分留给模型。',
    decision: '规范交给 Harness，判断交给模型，减少长提示词在重复工作中的漂移。',
    evidence: [
      { value: '5', label: '个可复用 Skills' },
      { value: 'Less', label: '重复提示与返工' },
      { value: 'More', label: '流程一致性' },
    ],
    tags: ['Agent Skill', 'Prompt', 'Harness'], href: 'https://github.com/b-bzy/claude-skills', provenance: '个人开源项目。',
  },
  {
    id: 'persona-drift', code: 'D05', title: 'Persona Drift Demo', shortTitle: '人格漂移实验', category: '其他',
    company: '个人实践', role: '实验设计 / 开发', year: '2026',
    summary: '用可统计检验的漂移指标比较多轮对话中的人格一致性，并验证多层防漂移约束。',
    decision: '把“感觉变了”转化为可度量、可对照、可复跑的评测问题。',
    evidence: [
      { value: '141', label: '项自动化测试' },
      { value: '3', label: '类漂移指标' },
      { value: 'A/B', label: '显著性对照' },
    ],
    tags: ['LLM 评测', '实验设计', '统计检验'], href: 'https://github.com/b-bzy/persona-drift-demo', private: true,
    provenance: '个人实验项目；仓库为私有访问。',
  },
  {
    id: 'ai-education', code: 'D06', title: 'AI 教育平台产品设计', shortTitle: 'AI 教育平台', category: '其他',
    company: '个人实践', role: '产品设计', year: '2026',
    summary: '面向教师、学生和管理员三类角色，定义 AI 教育平台的信息架构、数据模型与 MVP 路线。',
    decision: '先用三角色核心任务约束范围，再把安全、数据与内容治理写进产品底座。',
    evidence: [
      { value: '3', label: '类角色工作台' },
      { value: 'MVP', label: '范围与路线' },
      { value: 'Safe', label: '合规与内容治理' },
    ],
    tags: ['产品设计', '平台架构', '教育'], href: 'https://github.com/b-bzy/ai-education-platform', provenance: '个人开源项目。',
  },
]
