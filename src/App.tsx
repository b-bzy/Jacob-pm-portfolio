import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Database,
  Download,
  GitFork,
  GraduationCap,
  Layers3,
  LockKeyhole,
  Mail,
  Mic2,
  MousePointer2,
  Network,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'
import gsap from 'gsap'
import { categories, projects, type Project, type ProjectCategory } from './data/projects'

type View = 'intro' | 'experience' | 'portfolio' | 'skills' | 'education'

const navItems: Array<{ id: View; label: string }> = [
  { id: 'intro', label: '关于我' },
  { id: 'experience', label: '实习经历' },
  { id: 'portfolio', label: '项目作品' },
  { id: 'skills', label: '能力图谱' },
  { id: 'education', label: '教育荣誉' },
]

const experiences = [
  {
    id: 'aihuishou',
    no: '01',
    company: '万物新生 / 爱回收',
    role: 'AI 产品经理',
    time: '2026.08 — NOW',
    location: '北京',
    direction: 'AI+电商',
    intro: '面向二手电商内部运营与客服场景，负责 AI 工具、业务 Agent 和流程自动化方案。',
    bullets: ['参与“拍小宝”Agent 的能力拆分与指标设计', '将运营 SOP 抽象为可执行、可追踪的 Agent 流程', '推进优惠券 OA 等业务流程 AI 化并保留人工确认'],
    links: [{ id: 'feishu-workflow', label: '电商中台业务 Agent' }],
  },
  {
    id: 'kapibala',
    no: '02',
    company: 'KapibalaAI',
    role: 'AI 产品经理',
    time: '2026.01 — 2026.08',
    location: '迪拜总部',
    direction: 'AI+电商 / AI+协作',
    intro: '负责 AI 语音销售 SaaS、会话数据中台和内部协作 Agent 的产品设计、模型评测与客户方案。',
    bullets: ['建立任务、外呼、对话、数据回流的销售 MVP 闭环', '建设多维评测方案支持模型选择与业务复盘', '设计 9 类协作场景，历史意图路由准确率 95%+'],
    links: [
      { id: 'voice-sales', label: '语音销售 Agent' },
      { id: 'conversation-hub', label: '会话数据中台' },
      { id: 'collab-agent', label: '协作 Agent' },
    ],
  },
  {
    id: 'donghai',
    no: '03',
    company: '东海期货',
    role: 'AI 产品经理',
    time: '2024.10 — 2025.03',
    location: '上海总部',
    direction: 'AI+金融',
    intro: '面向期货合规、研究与中后台流程，探索 AI 与金融业务流程结合的可靠方案。',
    bullets: ['设计合规尽调辅助方案，预期效率提升约 40%', '将非结构化研报转为可比较的市场情绪信号', '探索带引用、可拒答的合规 RAG 问答流程'],
    links: [
      { id: 'compliance-rag', label: '期货合规 RAG' },
      { id: 'sentiment-agent', label: '市场情绪 Agent' },
    ],
  },
  {
    id: 'rexel',
    no: '04',
    company: 'Rexel',
    role: 'AI 产品经理',
    time: '2024.01 — 2024.05',
    location: '上海',
    direction: 'AI+供应链',
    intro: '面向供应链信息更新和数据采集场景，设计轻量自动化 Agent。',
    bullets: ['将单次数据更新操作缩短至约 56 秒', '按项目估算每月减少 80 小时以上重复操作', '完成数据采集 Agent 的需求、流程和结果验证'],
    links: [],
  },
]

const skillGroups = [
  {
    no: '01',
    title: '产品与业务',
    subtitle: 'PRODUCT',
    icon: BriefcaseBusiness,
    items: ['业务流程抽象与需求分析', '0→1 MVP 与范围管理', 'PRD、原型与交付规划'],
    proof: 'A02 · A03 · D06',
  },
  {
    no: '02',
    title: 'AI 方案',
    subtitle: 'AI SYSTEM',
    icon: Bot,
    items: ['Agent 任务拆解与工具编排', 'RAG 检索、引用、拒答', '模型选择与上下文工程'],
    proof: 'A01 · B02 · C01',
  },
  {
    no: '03',
    title: '评测与数据',
    subtitle: 'EVALUATION',
    icon: Database,
    items: ['意图识别与检索评测', '会话标签与训练数据设计', 'Python / R / SQL 数据分析'],
    proof: 'A01 · A04 · B02 · D05',
  },
  {
    no: '04',
    title: '工程与交付',
    subtitle: 'DELIVERY',
    icon: Workflow,
    items: ['TypeScript / Go / Python', 'Redis / Docker / Git / API', 'MCP 与全栈 POC'],
    proof: 'A01 · A03 · D02 · D03',
  },
]

type Lesson = { title: string; duration: string; tag: string; href: string; cover?: string }
const lessons: Lesson[] = []

function Brand({ onClick }: { onClick: () => void }) {
  return (
    <button className="brand" onClick={onClick} aria-label="返回鲍泽英作品集首页">
      <span>BZY</span>
      <small>AI Product<br />Portfolio</small>
    </button>
  )
}

function SiteHeader({ view, navigate }: { view: View; navigate: (view: View) => void }) {
  return (
    <header className="site-header">
      <Brand onClick={() => navigate('intro')} />
      <nav className="site-nav" aria-label="个人作品集导航">
        {navItems.map((item) => (
          <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => navigate(item.id)}>
            {item.label}
          </button>
        ))}
      </nav>
      <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">
        简历.pdf <ArrowUpRight size={13} />
      </a>
    </header>
  )
}

function Intro({ navigate }: { navigate: (view: View) => void }) {
  return (
    <section className="page page-intro" aria-labelledby="intro-title">
      <SiteHeader view="intro" navigate={navigate} />
      <main className="intro-main page-reveal">
        <div className="intro-copy">
          <div className="eyebrow"><span className="status-dot" /> HELLO / 你好</div>
          <h1 id="intro-title"><span>你好，我是</span>鲍泽英。</h1>
          <p className="intro-role">AI 产品经理 <i /> FDE <i /> 售前解决方案</p>
          <p className="intro-statement">近两年持续参与金融、企业效率、智能客服和电商 B2B 场景的 AI 产品实践。从业务问题出发，完成需求抽象、Agent / RAG 方案、模型评测、原型搭建与跨团队交付。</p>

          <div className="intro-metrics" aria-label="个人作品集数据">
            <div><b>4</b><span>段 AI 产品实践</span></div>
            <div><b>14</b><span>个项目档案</span></div>
            <div><b>4</b><span>类业务场景</span></div>
            <div><b>0→1</b><span>产品闭环</span></div>
          </div>

          <div className="intro-actions">
            <button className="primary-button" onClick={() => navigate('portfolio')}>查看作品 <ArrowRight size={18} /></button>
            <a className="secondary-button" href="/resume.pdf" target="_blank" rel="noreferrer"><Download size={15} /> 下载简历</a>
          </div>

          <div className="contact-strip" aria-label="联系方式">
            <span>CONTACT</span>
            <a href="mailto:P250005@e.ntu.edu.sg"><Mail size={14} /> P250005@e.ntu.edu.sg</a>
            <a href="https://github.com/b-bzy" target="_blank" rel="noreferrer"><GitFork size={14} /> GitHub / b-bzy</a>
          </div>
        </div>

        <div className="portrait-scene" aria-label="鲍泽英个人照片与职业档案">
          <div className="portrait-orbit orbit-a" />
          <div className="portrait-orbit orbit-b" />
          <div className="portrait-card">
            <div className="portrait-meta"><span>AI NATIVE</span><small>PROFILE · 2026</small></div>
            <img src="/profile.png" alt="鲍泽英个人照片" />
            <div className="portrait-caption"><small>PRODUCT FILE</small><b>让 AI 进入真实业务</b><span>PM · Agent · Evaluation · Delivery</span></div>
          </div>
          <div className="floating-note note-now"><small>NOW</small><b>AI × 产品 × 交付</b><span>从问题到验证闭环</span></div>
          <div className="floating-note note-projects"><Sparkles size={14} /><b>14</b><span>PROJECT FILES</span></div>
        </div>
      </main>
      <PageFooter index="00" label="ABOUT & CONTACT" next="实习经历" onNext={() => navigate('experience')} />
    </section>
  )
}

function Experience({ navigate, openProject }: { navigate: (view: View) => void; openProject: (id: string) => void }) {
  return (
    <section className="page page-experience" aria-labelledby="experience-title">
      <SiteHeader view="experience" navigate={navigate} />
      <main className="section-main page-reveal">
        <SectionHeading index="01" kicker="THE PRACTITIONER" title="我在真实业务现场做过什么" description="四段 AI 产品实践。有关联作品的经历可以直接定位到对应项目；Rexel 作为 AI+供应链经历展示，不计入作品统计。" />
        <div className="experience-grid">
          {experiences.map((item) => (
            <article className="experience-card" key={item.id}>
              <div className="experience-top">
                <span className="experience-no">{item.no}</span>
                <span className="direction-tag">{item.direction}</span>
              </div>
              <div className="experience-time">{item.time} · {item.location}</div>
              <h2>{item.company}</h2>
              <strong>{item.role}</strong>
              <p>{item.intro}</p>
              <ul>{item.bullets.map((bullet) => <li key={bullet}><CheckCircle2 size={13} />{bullet}</li>)}</ul>
              <div className="experience-links">
                {item.links.length > 0 ? item.links.map((link) => (
                  <button key={link.id} onClick={() => openProject(link.id)}>{link.label}<ChevronRight size={13} /></button>
                )) : <span className="no-project">暂无独立作品项目</span>}
              </div>
            </article>
          ))}
        </div>
      </main>
      <PageFooter index="01" label="INTERNSHIP" next="项目作品" onNext={() => navigate('portfolio')} />
    </section>
  )
}

function ProjectVisual({ project }: { project: Project }) {
  const Icon = project.category === 'AI+金融'
    ? Layers3
    : project.category === 'AI+自媒体'
      ? PlayCircle
      : project.id === 'collab-agent'
        ? Network
        : project.id === 'ai-education'
          ? GraduationCap
          : project.id === 'persona-drift'
            ? ShieldCheck
            : project.id === 'voice-sales'
              ? Mic2
              : Bot
  return (
    <div className={`project-visual category-${project.category.slice(3)}`}>
      <div className="visual-window">
        <div className="visual-topbar"><span><i /> SYSTEM MAP</span><span>{project.code} / {project.year}</span></div>
        <div className="visual-hero">
          <div className="visual-icon"><Icon size={38} strokeWidth={1.5} /></div>
          <div><small>{project.category}</small><h3>{project.shortTitle}</h3><p>{project.company}</p></div>
        </div>
        <div className="system-flow" aria-label="项目系统结构示意">
          <div><span>01</span><b>业务输入</b><small>{project.tags[0]}</small></div>
          <i><ArrowRight size={14} /></i>
          <div><span>02</span><b>AI 处理</b><small>{project.tags[1]}</small></div>
          <i><ArrowRight size={14} /></i>
          <div><span>03</span><b>交付闭环</b><small>{project.tags[2]}</small></div>
        </div>
        <div className="visual-evidence">
          {project.evidence.map((item) => <div key={item.value}><b>{item.value}</b><span>{item.label}</span></div>)}
        </div>
      </div>
      <div className="visual-sticker"><Sparkles size={13} /> {project.code}</div>
    </div>
  )
}

function ProjectSlide({ project, position, total }: { project: Project; position: number; total: number }) {
  return (
    <article className="project-slide" id={`project-${project.id}`} aria-label={`${project.code} ${project.title}`}>
      <div className="project-showcase">
        <ProjectVisual project={project} />
        <div className="project-copy">
          <div className="project-meta"><span>{project.code} / {String(position + 1).padStart(2, '0')}—{String(total).padStart(2, '0')}</span><span>{project.year}</span></div>
          <p className="project-company">{project.company} · {project.role}</p>
          <h2>{project.title}</h2>
          <p className="project-summary">{project.summary}</p>
          <div className="decision-box"><small>KEY DECISION / 关键判断</small><p>{project.decision}</p></div>
          <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="project-source"><ShieldCheck size={14} /><span>{project.provenance}</span></div>
          <a className={`github-button ${project.private ? 'private' : ''}`} href={project.href} target="_blank" rel="noreferrer">
            {project.private ? <LockKeyhole size={15} /> : <GitFork size={15} />}
            {project.private ? 'Private / 需授权访问' : '查看 GitHub'}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </article>
  )
}

function Portfolio({ navigate, targetId }: { navigate: (view: View) => void; targetId: string | null }) {
  const target = projects.find((project) => project.id === targetId)
  const [category, setCategory] = useState<ProjectCategory>(target?.category ?? 'AI+电商')
  const [activeIndex, setActiveIndex] = useState(() => {
    if (!target) return 0
    return projects.filter((project) => project.category === target.category).findIndex((project) => project.id === target.id)
  })
  const scroller = useRef<HTMLDivElement>(null)
  const frame = useRef<number | null>(null)
  const categoryProjects = useMemo(() => projects.filter((project) => project.category === category), [category])

  const goTo = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const next = Math.max(0, Math.min(index, categoryProjects.length - 1))
    setActiveIndex(next)
    scroller.current?.scrollTo({ left: next * scroller.current.clientWidth, behavior })
  }

  const changeCategory = (next: ProjectCategory) => {
    setCategory(next)
    setActiveIndex(0)
    requestAnimationFrame(() => scroller.current?.scrollTo({ left: 0, behavior: 'auto' }))
  }

  useEffect(() => {
    const element = scroller.current
    if (!element) return
    requestAnimationFrame(() => goTo(activeIndex, 'auto'))
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
      event.preventDefault()
      element.scrollBy({ left: event.deltaY, behavior: 'smooth' })
    }
    const onScroll = () => {
      if (frame.current) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => setActiveIndex(Math.round(element.scrollLeft / Math.max(element.clientWidth, 1))))
    }
    element.addEventListener('wheel', onWheel, { passive: false })
    element.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      element.removeEventListener('wheel', onWheel)
      element.removeEventListener('scroll', onScroll)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [category])

  return (
    <section className="page page-portfolio" aria-label="项目作品">
      <SiteHeader view="portfolio" navigate={navigate} />
      <div className="portfolio-toolbar page-reveal">
        <div><span>02 / PROJECT FILES</span><h1>从业务问题，到可验证的产品证据</h1></div>
        <div className="category-tabs" aria-label="作品分类">
          {categories.map((item) => {
            const count = projects.filter((project) => project.category === item).length
            return <button key={item} className={category === item ? 'active' : ''} onClick={() => changeCategory(item)}>{item}<span>{count}</span></button>
          })}
        </div>
      </div>

      <div className="horizontal-scroller" ref={scroller}>
        {categoryProjects.map((project, index) => <ProjectSlide key={project.id} project={project} position={index} total={categoryProjects.length} />)}
      </div>

      <footer className="portfolio-footer">
        <div className="portfolio-count"><b>{String(activeIndex + 1).padStart(2, '0')}</b><i style={{ '--progress': `${((activeIndex + 1) / categoryProjects.length) * 100}%` } as React.CSSProperties} /><span>{String(categoryProjects.length).padStart(2, '0')}</span><small>{categoryProjects[activeIndex]?.shortTitle}</small></div>
        <div className="portfolio-hint"><MousePointer2 size={14} /> 左右滑动浏览项目</div>
        <div className="slide-controls">
          <button onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="上一个项目"><ArrowLeft /></button>
          <button onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === categoryProjects.length - 1} aria-label="下一个项目"><ArrowRight /></button>
        </div>
      </footer>
    </section>
  )
}

function Skills({ navigate }: { navigate: (view: View) => void }) {
  return (
    <section className="page page-skills" aria-labelledby="skills-title">
      <SiteHeader view="skills" navigate={navigate} />
      <main className="section-main page-reveal">
        <SectionHeading index="03" kicker="SKILLS & KNOWLEDGE" title="能力不写百分比，用项目来作证" description="每项能力都能回到具体项目。后续录制的讲课视频会自动出现在本页，并与能力和案例相互关联。" id="skills-title" />
        <div className="skills-grid">
          {skillGroups.map((group) => {
            const Icon = group.icon
            return (
              <article className="skill-card" key={group.no}>
                <div className="skill-card-top"><span>{group.no}</span><Icon size={23} /></div>
                <small>{group.subtitle}</small>
                <h2>{group.title}</h2>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                <div className="skill-proof">PROJECT PROOF <b>{group.proof}</b></div>
              </article>
            )
          })}
        </div>

        {lessons.length > 0 && (
          <section className="lesson-rail" aria-label="自媒体讲课视频">
            <div className="lesson-heading"><PlayCircle size={20} /><div><small>KNOWLEDGE SHARING</small><h2>讲课视频</h2></div></div>
            {lessons.map((lesson) => <a key={lesson.title} href={lesson.href} target="_blank" rel="noreferrer"><span>{lesson.tag}</span><b>{lesson.title}</b><small>{lesson.duration}</small></a>)}
          </section>
        )}
      </main>
      <PageFooter index="03" label="SKILLS" next="教育荣誉" onNext={() => navigate('education')} />
    </section>
  )
}

function Education({ navigate }: { navigate: (view: View) => void }) {
  return (
    <section className="page page-education" aria-labelledby="education-title">
      <SiteHeader view="education" navigate={navigate} />
      <main className="section-main page-reveal">
        <SectionHeading index="04" kicker="LEARNING PATH" title="金融工程底座，连接 AI 产品实践" description="从量化分析到管理科学，再把方法带回真实业务和产品交付。" id="education-title" />
        <div className="education-grid">
          <article className="education-card ntu-card">
            <div className="school-mark"><GraduationCap size={27} /></div>
            <div className="education-time">2025.08 — 2027.01</div>
            <small>MASTER · TOP 15%</small>
            <h2>南洋理工大学</h2>
            <h3>管理科学与工程硕士</h3>
            <p>AI Management and Analytics。以跨境电商智能客服为 Capstone，将产品方法、模型能力与工程交付结合。</p>
            <div className="education-tags"><span>AI 产品</span><span>管理分析</span><span>跨境电商</span></div>
          </article>
          <article className="education-card lixin-card">
            <div className="school-mark"><GraduationCap size={27} /></div>
            <div className="education-time">2021.09 — 2025.06</div>
            <small>BACHELOR · TOP 1%</small>
            <h2>上海立信会计金融学院</h2>
            <h3>金融工程本科 · GPA 90.8</h3>
            <p>以金融、统计与数据建模训练建立分析底座，并在保险定价、研究与产品项目中持续验证。</p>
            <div className="education-tags"><span>金融工程</span><span>统计建模</span><span>数据分析</span></div>
          </article>
        </div>
        <div className="award-strip">
          <span>SELECTED HONORS</span>
          <div><b>1‰</b><small>潘序伦奖学金</small></div>
          <div><b>Top 8%</b><small>ICM 国际一等奖</small></div>
          <div><b>FRM</b><small>准资格</small></div>
          <div><b>全国冠军</b><small>赛艇赛事</small></div>
          <div><b>一等奖</b><small>正大杯</small></div>
        </div>
      </main>
      <PageFooter index="04" label="EDUCATION" next="回到首页" onNext={() => navigate('intro')} />
    </section>
  )
}

function SectionHeading({ index, kicker, title, description, id }: { index: string; kicker: string; title: string; description: string; id?: string }) {
  return (
    <header className="section-heading">
      <span>{index} / {kicker}</span>
      <h1 id={id}>{title}</h1>
      <p>{description}</p>
    </header>
  )
}

function PageFooter({ index, label, next, onNext }: { index: string; label: string; next: string; onNext: () => void }) {
  return (
    <footer className="page-footer">
      <span>{index} / {label}</span>
      <i />
      <button onClick={onNext}>{next}<ArrowRight size={14} /></button>
    </footer>
  )
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<View>('intro')
  const [targetProjectId, setTargetProjectId] = useState<string | null>(null)

  const navigate = (next: View) => {
    if (next === 'portfolio' && view !== 'experience') setTargetProjectId(null)
    setView(next)
  }

  const openProject = (id: string) => {
    setTargetProjectId(id)
    setView('portfolio')
  }

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.from('.page-reveal', { y: 16, opacity: 0, duration: 0.55, ease: 'power3.out' })
      gsap.from('.site-header', { y: -14, opacity: 0, duration: 0.45, ease: 'power3.out' })
      const cards = gsap.utils.toArray<HTMLElement>('.experience-card, .skill-card, .education-card')
      if (cards.length > 0) {
        gsap.from(cards, { y: 22, opacity: 0, duration: 0.55, stagger: 0.07, delay: 0.1, ease: 'power3.out' })
      }
    }, root)
    return () => context.revert()
  }, [view])

  return (
    <div className="app-shell" ref={root}>
      {view === 'intro' && <Intro navigate={navigate} />}
      {view === 'experience' && <Experience navigate={navigate} openProject={openProject} />}
      {view === 'portfolio' && <Portfolio key={targetProjectId ?? 'portfolio'} navigate={navigate} targetId={targetProjectId} />}
      {view === 'skills' && <Skills navigate={navigate} />}
      {view === 'education' && <Education navigate={navigate} />}
    </div>
  )
}

export default App
