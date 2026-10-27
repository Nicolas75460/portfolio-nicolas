import { useEffect, useRef, useState } from 'react';
import { NetworkCanvas, ScrollProgress } from './Visuals';
import { ProjectDialog } from './ProjectDialog';
import { moduleDetails, orbitCaptions, type Orbit, type Module, type ProjectId, type Filter, type Scenario, type TraceLine, workflowLines } from './data';
import './styles.css';

const temperaturePath = 'M0 85L25 78L50 85L75 48L100 58L125 35L150 48L175 26L200 43L225 30L250 54L275 37L300 55L325 15L350 37L375 27L400 45L425 13L450 25L475 8L500 24';
const humidityPath = 'M0 40L25 25L50 32L75 18L100 35L125 43L150 28L175 47L200 39L225 55L250 42L275 65L300 45L325 55L350 66L375 47L400 60L425 75L450 62L475 78L500 68';
export default function App() {
  const [paused, setPaused] = useState(() => { try { const saved=localStorage.getItem('ns-motion'); return saved ? saved === 'off' : matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; } });
  const [menuOpen, setMenuOpen] = useState(false);
  const [orbit, setOrbit] = useState<Orbit>('ai');
  const [filter, setFilter] = useState<Filter>('all');
  const [sensor, setSensor] = useState('temperature');
  const [module, setModule] = useState<Module>('orchestrator');
  const [project, setProject] = useState<ProjectId | null>(null);
  const [scenario, setScenario] = useState<Scenario>('overview');
  const [running, setRunning] = useState(false);
  const [trace, setTrace] = useState<TraceLine[]>([{text:'Ready to explore.'},{text:'Select a request and watch the agents coordinate.',kind:'muted'}]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const projectCount = filter === 'all' ? 4 : filter === 'software' ? 2 : 1;
  useEffect(() => {
    document.documentElement.classList.toggle('motion-paused', paused);
    document.documentElement.classList.toggle('js-motion', !paused);
    try { localStorage.setItem('ns-motion', paused ? 'off' : 'on'); } catch { /* Optional preference storage. */ }
    document.querySelectorAll('svg').forEach(svg => { if (paused) svg.pauseAnimations?.(); else svg.unpauseAnimations?.(); });
  }, [paused]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }),{threshold:.08});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  function runWorkflow() {
    if (running) return;
    setRunning(true); setTrace([{text:'Request received. Planning specialist tasks.'}]);
    const lines = workflowLines[scenario];
    lines.forEach((line,index) => timers.current.push(setTimeout(() => {
      setTrace(previous => [...previous,line]);
      if (index === lines.length - 1) { setRunning(false); timers.current=[]; }
    },(index+1)*720)));
  }
  return <>

<a className="skip" href="#main">Skip to content</a>
<ScrollProgress />
<header className="header">
  <a className="brand" href="#home" aria-label="Nícolas Silva home"><span className="brand-symbol">n<span>›</span></span><span>Nícolas Silva<span className="brand-dot">.</span></span></a>
  <nav aria-label="Main navigation" id="navigation" className={menuOpen ? "open" : ""} onClick={() => setMenuOpen(false)}><a href="#work">Work <span>01</span></a><a href="#lab">Lab <span>02</span></a><a href="#about">About <span>03</span></a></nav>
  <div className="header-actions"><button className="motion" aria-pressed={paused} title={paused ? "Resume animations" : "Pause animations"} onClick={() => setPaused(!paused)}><span className="motion-icon">{paused ? "▶" : "Ⅱ"}</span><span className="motion-label">Motion {paused ? "off" : "on"}</span></button><a className="contact-link" href="#contact">Let’s connect <span>↗</span></a><button className="menu" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>☰</button></div>
</header>
<main id="main">
  <section className="hero" id="home">
    <div className="hero-copy">
      <p className="eyebrow"><span className="live-dot"></span> SOFTWARE DEVELOPMENT · GENERATIVE AI</p>
      <h1>Building software.<br />Connecting<br /><em>intelligence.</em></h1>
      <p className="hero-description">I’m Nícolas. I connect code, data and AI agents to turn complex ideas into working systems.</p>
      <div className="hero-actions"><a className="button primary" href="#work">Explore my work <span>↘</span></a><a className="text-link" href="https://github.com/Nicolas75460" target="_blank" rel="noopener noreferrer">GitHub <span>↗</span></a></div>
      <p className="hero-footnote"><span className="tiny-cross">+</span> Intern at 2RPnet <span className="divider">/</span> Student at SENAI São Paulo</p>
    </div>
    <div className="hero-art" aria-label="Interactive visualization of connected software, data and AI systems">
      <div className="art-top"><span><i></i> SYSTEMS IN EXPLORATION</span><span>NS / 001</span></div>
      <NetworkCanvas paused={paused} active={orbit} />
      <div className="orbital-label label-ai"><button data-orbit="ai" aria-pressed={orbit === 'ai'} onClick={() => setOrbit('ai')}><span>01</span> AI AGENTS <b>↗</b></button></div>
      <div className="orbital-label label-data"><button data-orbit="data" aria-pressed={orbit === 'data'} onClick={() => setOrbit('data')}><span>02</span> DATA <b>↗</b></button></div>
      <div className="orbital-label label-code"><button data-orbit="code" aria-pressed={orbit === 'code'} onClick={() => setOrbit('code')}><span>03</span> SOFTWARE <b>↗</b></button></div>
      <div className="art-bottom"><div><span className="micro">CONNECTED THINKING</span><p id="orbit-caption" aria-live="polite">{orbitCaptions[orbit]}</p></div><span className="art-coordinate">23° / 47°</span></div>
    </div>
    <div className="hero-bottom"><a href="#work"><span className="scroll-line"></span> SCROLL TO EXPLORE</a><span>CODE WITH PURPOSE. BUILD WITH CURIOSITY.</span></div>
  </section>
  <div className="stack-strip" aria-label="Technologies"><span>THE BUILDING BLOCKS</span><div>Python <i>✳</i> Google ADK <i>✳</i> Java <i>✳</i> TypeScript <i>✳</i> PostgreSQL <i>✳</i> Docker</div></div>
  <section className="section work" id="work">
    <div className="section-heading reveal"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Ideas, engineered.</h2></div><p>From collaborative platforms to connected data.<br />A selection of things I’m building and exploring.</p></div>
    <div className="work-toolbar"><div className="filters" role="group" aria-label="Filter projects"><button data-filter="all" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All work <span>04</span></button><button data-filter="ai" aria-pressed={filter === 'ai'} onClick={() => setFilter('ai')}>AI systems</button><button data-filter="software" aria-pressed={filter === 'software'} onClick={() => setFilter('software')}>Software</button><button data-filter="data" aria-pressed={filter === 'data'} onClick={() => setFilter('data')}>Data & IoT</button></div><span className="micro" id="project-count" aria-live="polite">{String(projectCount).padStart(2,"0")} {projectCount === 1 ? "PROJECT" : "PROJECTS"}</span></div>
    <div className="projects">
      <article className="project featured reveal" data-category="ai" hidden={filter !== 'all' && filter !== 'ai'}>
        <div className="project-copy"><p className="project-meta"><span className="red-dot"></span> AI SYSTEMS <span>TEAM PROJECT</span></p><p className="project-index">01 / JARVIS</p><h3>One question.<br />Multiple perspectives.</h3><p>A multi-agent approach to credit analysis: an orchestrator connects specialized agents and brings their findings into a structured response.</p><div className="tags"><span>Python</span><span>Google ADK</span><span>Agent orchestration</span></div><button className="text-link" data-project="jarvis" onClick={() => setProject('jarvis')}>Explore the architecture <span>↗</span></button><p className="source-note">Project discussed in my shared background. Source repository requires access.</p></div>
        <div className="jarvis-visual"><div className="visual-caption"><span>JARVIS / SYSTEM MAP</span><span className="status"><i></i> ORCHESTRATED</span></div><div className="map"><div className="map-grid"></div><div className="map-orbit"></div><div className="core"><span>J</span><small>ORCHESTRATOR</small></div><div className="satellite sat-one"><span>⌁</span>BUREAU</div><div className="satellite sat-two"><span>↔</span>PAYMENTS</div><div className="satellite sat-three"><span>▱</span>CARDS</div><div className="satellite sat-four"><span>≡</span>CONTRACTS</div><svg className="map-lines" viewBox="0 0 500 380" aria-hidden="true"><path d="M250 190 L115 83 M250 190 L395 107 M250 190 L100 285 M250 190 L385 292"/><circle r="3"><animateMotion dur="3s" repeatCount="indefinite" path="M115 83 L250 190 L395 107"/></circle><circle r="3"><animateMotion dur="4s" repeatCount="indefinite" path="M100 285 L250 190 L385 292"/></circle></svg></div><div className="map-footer"><span>REQUEST → DELEGATE → SYNTHESIZE</span><span>↗</span></div></div>
      </article>
      <article className="project compact reveal" data-category="software" hidden={filter !== 'all' && filter !== 'software'}><div className="project-visual exchange"><div className="mini-browser"><span className="browser-dots">● ● ●</span><span>SENAI EXCHANGE</span><span>↗</span></div><div className="exchange-layout"><div className="exchange-sidebar"><b>sx<span>.</span></b><span className="selected">⌂ &nbsp; Explore</span><span>⇄ &nbsp; My exchanges</span><span>□ &nbsp; Messages</span></div><div className="exchange-content"><span className="micro">GIVE THINGS A SECOND CHAPTER</span><h4>Less waste.<br />More possibilities.</h4><div className="mini-items"><div><span>⌨</span><small>Electronics</small></div><div><span>▤</span><small>Books</small></div><div><span>⌁</span><small>Tools</small></div></div></div></div><span className="mockup-label">INTERFACE CONCEPT</span></div><div className="compact-copy"><p className="project-meta">02 / FULL-STACK <span>COLLABORATIVE PROJECT</span></p><h3>SENAI Exchange <button aria-label="Read SENAI Exchange project" data-project="exchange" onClick={() => setProject('exchange')}>↗</button></h3><p>A student marketplace for sharing, donating and exchanging academic materials.</p><div className="tags"><span>Java / Spring Boot</span><span>PostgreSQL</span><span>Docker</span></div></div></article>
      <article className="project compact reveal" data-category="data" hidden={filter !== 'all' && filter !== 'data'}><div className="project-visual hive"><div className="visual-caption"><span>COLMEIA SMART</span><span>IoT / MONITORING</span></div><div className="hive-metrics"><div><span>{sensor.toUpperCase()}</span><strong id="hive-value">{sensor === "temperature" ? "32.4" : "64.8"}<small>{sensor === "temperature" ? "°C" : "%"}</small></strong></div><div className="hexagon">⬡</div></div><svg viewBox="0 0 500 105" className="chart" aria-label="Illustrative sensor time series"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f04452" stopOpacity=".25"/><stop offset="1" stopColor="#f04452" stopOpacity="0"/></linearGradient></defs><path className="chart-area" d={`${sensor === "temperature" ? temperaturePath : humidityPath}V105H0Z`}/><path className="chart-line" d={sensor === "temperature" ? temperaturePath : humidityPath}/></svg><div className="hive-controls" role="group" aria-label="Illustrative sensor metrics"><button aria-pressed={sensor === 'temperature'} data-sensor="temperature" onClick={() => setSensor('temperature')}>Temperature</button><button aria-pressed={sensor === 'humidity'} data-sensor="humidity" onClick={() => setSensor('humidity')}>Humidity</button><span>SAMPLE DATA</span></div></div><div className="compact-copy"><p className="project-meta">03 / DATA & IoT <span>SENSOR SYSTEMS</span></p><h3>Colmeia Smart <button aria-label="Read Colmeia Smart project" data-project="hive" onClick={() => setProject('hive')}>↗</button></h3><p>Connecting hive sensors, messaging and dashboards for beehive monitoring.</p><div className="tags"><span>Next.js</span><span>MQTT</span><span>Grafana</span><span>MariaDB</span></div></div></article>
      <article className="project api-project reveal" data-category="software" hidden={filter !== 'all' && filter !== 'software'}><span className="api-symbol">{ }</span><div><p className="project-meta">04 / BACKEND & TESTING</p><h3>To-Do API / testing lab</h3><p>A Flask REST API learning project with unit, integration and end-to-end testing.</p></div><div className="api-end"><div className="tags"><span>Python</span><span>Flask</span><span>Pytest</span></div><button className="text-link" data-project="todo" onClick={() => setProject('todo')}>View project <span>↗</span></button></div></article>
    </div>
    <a className="github-more" href="https://github.com/Nicolas75460?tab=repositories" target="_blank" rel="noopener noreferrer">More experiments live on GitHub <span>↗</span></a>
  </section>
  <section className="section lab" id="lab"><div className="section-heading reveal"><div><p className="eyebrow">02 / INTERACTIVE LAB</p><h2>See the connections.</h2></div><p>Good architecture deserves more than a diagram.<br />Step inside a simplified agent workflow.</p></div>
    <div className="lab-shell reveal"><div className="lab-bar"><span><span className="red-dot"></span> AGENT PLAYGROUND</span><span>ILLUSTRATIVE DEMO · RUNS IN YOUR BROWSER</span></div><div className="lab-layout"><div className="lab-system"><div className="lab-instruction"><span className="micro">01 — SELECT A COMPONENT</span><span>↓</span></div><div className="architecture"><div className="modules-left"><button data-module="context" aria-pressed={module === 'context'} onClick={() => setModule('context')}><span>01</span><b>Context</b><small>Instructions & history</small></button><button data-module="memory" aria-pressed={module === 'memory'} onClick={() => setModule('memory')}><span>02</span><b>Memory</b><small>Relevant information</small></button></div><div className="architecture-core"><button data-module="orchestrator" aria-pressed={module === 'orchestrator'} onClick={() => setModule('orchestrator')}><span>✳</span><b>Orchestrator</b><small>Plan → Delegate → Synthesize</small></button></div><div className="modules-right"><button data-module="models" aria-pressed={module === 'models'} onClick={() => setModule('models')}><span>03</span><b>Model</b><small>Language understanding</small></button><button data-module="tools" aria-pressed={module === 'tools'} onClick={() => setModule('tools')}><span>04</span><b>Tools</b><small>Retrieve & calculate</small></button><button data-module="output" aria-pressed={module === 'output'} onClick={() => setModule('output')}><span>05</span><b>Output</b><small>Structured response</small></button></div></div><div className="component-detail" aria-live="polite"><span className="micro" id="module-label">{moduleDetails[module].label}</span><h3 id="module-title">{moduleDetails[module].title}</h3><p id="module-description">{moduleDetails[module].description}</p></div></div><div className="terminal"><div className="terminal-heading"><span>workflow.trace</span><span>● ● ●</span></div><label htmlFor="scenario">02 — CHOOSE A REQUEST</label><select id="scenario" value={scenario} onChange={e => setScenario(e.target.value as Scenario)} disabled={running}><option value="overview">Summarize a customer’s credit profile</option><option value="payments">Explore payment history</option><option value="contracts">Review existing contracts</option></select><button className="button primary" id="run-demo" onClick={runWorkflow} disabled={running}>{running ? "Coordinating agents…" : "Run workflow"} <span>{running ? "◌" : "▶"}</span></button><div id="trace" className="trace" role="log" aria-live="polite">{trace.map((line, i) => <p className={line.kind === "muted" ? "trace-muted" : line.kind === "success" ? "trace-success" : ""} key={i}>{line.kind !== "muted" && <span>›</span>}{line.text}</p>)}</div><div className="terminal-note">A visual explanation of agent orchestration.<br />No live AI calls or real customer data.</div></div></div></div>
  </section>
  <section className="section about" id="about"><div className="about-intro reveal"><p className="eyebrow">03 / THE PERSON BEHIND THE CODE</p><h2>Curious by nature.<br /><em>Builder by choice.</em></h2><p>I’m Nícolas Silva, a software development intern at 2RPnet and a Systems Analysis and Development student at SENAI São Paulo.</p><p>I’m interested in how software, data and generative AI come together. I learn by building: from full-stack applications to systems where specialized agents work toward a shared goal.</p><a className="text-link" href="https://www.linkedin.com/in/n%C3%ADcolas-silva-b37306323/" target="_blank" rel="noopener noreferrer">More about my background <span>↗</span></a></div><div className="about-details reveal"><div className="timeline"><div><span className="micro">EXPERIENCE / CURRENT</span><h3>Software Development Intern</h3><p>2RPnet</p><small>Applied software development, AI agents and automation.</small></div><div><span className="micro">EDUCATION / 2026 — 2028 EXPECTED</span><h3>Systems Analysis & Development</h3><p>SENAI São Paulo</p><small>Software engineering, databases and intelligent applications.</small></div></div><div className="toolbox"><span className="micro">TOOLS I BUILD WITH</span><div className="skill-row"><span>AI & DATA</span><p>Python · Google ADK · Gemini · SQL</p></div><div className="skill-row"><span>SOFTWARE</span><p>Java · Spring Boot · JavaScript · TypeScript</p></div><div className="skill-row"><span>SYSTEMS</span><p>PostgreSQL · Docker · Git · REST APIs</p></div></div></div></section>
  <section className="contact section" id="contact"><div className="contact-top"><p className="eyebrow"><span className="live-dot"></span> LET’S BUILD SOMETHING USEFUL</p><span className="micro">A CONVERSATION IS A GOOD START.</span></div><a className="contact-title" href="https://www.linkedin.com/in/n%C3%ADcolas-silva-b37306323/" target="_blank" rel="noopener noreferrer">Connect the dots<span>↗</span></a><div className="contact-bottom"><p>Have a project, an opportunity, or an interesting problem?<br />I’d love to hear about it.</p><div><a href="https://www.linkedin.com/in/n%C3%ADcolas-silva-b37306323/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://github.com/Nicolas75460" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></div></section>
</main>
<footer><a className="brand" href="#home">n<span className="brand-dot">›</span> <span>Nícolas Silva.</span></a><p>Always learning. Always building.</p><a href="#home">BACK TO TOP ↑</a><span>© 2026</span></footer>
<ProjectDialog project={project} onClose={() => setProject(null)} />

</>;
}
