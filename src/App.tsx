import { useEffect, useState } from 'react';
import { NetworkCanvas, ScrollProgress } from './Visuals';
import { ProjectDialog } from './ProjectDialog';
import { ProjectGallery } from './ProjectGallery';
import { AgentLab } from './AgentLab';
import { orbitCaptions, type Language, type Orbit, type ProjectId } from './data';
import './styles.css';
import './projects.css';

const github='https://github.com/Nicolas75460';
const linkedin='https://www.linkedin.com/in/n%C3%ADcolas-silva-b37306323/';

export default function App() {
  // English is the default regardless of browser locale; a shareable URL can select PT-BR.
  const [language,setLanguage]=useState<Language>(()=>new URLSearchParams(location.search).get('lang')==='pt-BR'?'pt-BR':'en');
  const [paused,setPaused]=useState(()=>{try{const saved=localStorage.getItem('ns-motion');return saved?saved==='off':matchMedia('(prefers-reduced-motion: reduce)').matches;}catch{return false;}});
  const [menuOpen,setMenuOpen]=useState(false);
  const [orbit,setOrbit]=useState<Orbit>('ai');
  const [project,setProject]=useState<ProjectId|null>(null);
  const t=(en:string,pt:string)=>language==='en'?en:pt;

  useEffect(()=>{
    document.documentElement.lang=language;
    document.title=language==='en'?'Nícolas Silva — Software & AI':'Nícolas Silva — Software e IA';
    const description=language==='en'?'Nícolas Silva — software development, generative AI and automation. Explore five projects and an interactive agent architecture.':'Nícolas Silva — desenvolvimento de software, IA generativa e automação. Explore cinco projetos e uma arquitetura interativa de agentes.';
    document.querySelector('meta[name="description"]')?.setAttribute('content',description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content',document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content',description);
    const url=new URL(location.href);if(language==='pt-BR')url.searchParams.set('lang','pt-BR');else url.searchParams.delete('lang');
    history.replaceState(null,'',url);
  },[language]);
  useEffect(()=>{
    document.documentElement.classList.toggle('motion-paused',paused);
    document.documentElement.classList.toggle('js-motion',!paused);
    try{localStorage.setItem('ns-motion',paused?'off':'on');}catch{/* Optional preference storage. */}
    document.querySelectorAll('svg').forEach(svg=>{if(paused)svg.pauseAnimations?.();else svg.unpauseAnimations?.();});
  },[paused]);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible');}),{threshold:.08});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
    const escape=(event:KeyboardEvent)=>{if(event.key==='Escape')setMenuOpen(false);};
    addEventListener('keydown',escape);
    return()=>{observer.disconnect();removeEventListener('keydown',escape);};
  },[]);
  useEffect(()=>{
    const syncLanguage=()=>setLanguage(new URLSearchParams(location.search).get('lang')==='pt-BR'?'pt-BR':'en');
    addEventListener('popstate',syncLanguage);return()=>removeEventListener('popstate',syncLanguage);
  },[]);

  return <>
    <a className="skip" href="#main">{t('Skip to content','Pular para o conteúdo')}</a><ScrollProgress/>
    <header className="header">
      <a className="brand" href="#home" aria-label={t('Nícolas Silva home','Nícolas Silva — início')}><span className="brand-symbol">n<span>›</span></span><span>Nícolas Silva<span className="brand-dot">.</span></span></a>
      <nav aria-label={t('Main navigation','Navegação principal')} id="navigation" className={menuOpen?'open':''} onClick={()=>setMenuOpen(false)}><a href="#work">{t('Work','Projetos')}<span>01</span></a><a href="#lab">Lab<span>02</span></a><a href="#about">{t('About','Sobre')}<span>03</span></a></nav>
      <div className="header-actions">
        <div className="language-toggle" role="group" aria-label={t('Site language','Idioma do site')}><button onClick={()=>setLanguage('en')} aria-pressed={language==='en'} aria-label="English" data-language="en">EN</button><button onClick={()=>setLanguage('pt-BR')} aria-pressed={language==='pt-BR'} aria-label="Português brasileiro" data-language="pt-BR">PT-BR</button></div>
        <button className="motion" aria-pressed={paused} aria-label={paused?t('Resume animations','Ativar animações'):t('Pause animations','Pausar animações')} title={paused?t('Resume animations','Ativar animações'):t('Pause animations','Pausar animações')} onClick={()=>setPaused(!paused)}><span className="motion-icon">{paused?'▶':'Ⅱ'}</span><span className="motion-label">{t('Motion','Animações')} {paused?t('off','inativas'):t('on','ativas')}</span></button>
        <a className="contact-link" href="#contact">{t('Let’s connect','Vamos conversar')}<span>↗</span></a><button className="menu" aria-label={menuOpen?t('Close navigation','Fechar navegação'):t('Open navigation','Abrir navegação')} aria-expanded={menuOpen} aria-controls="navigation" onClick={()=>setMenuOpen(!menuOpen)}>☰</button>
      </div>
    </header>
    <main id="main">
      <section className="hero" id="home">
        <div className="hero-copy"><p className="eyebrow"><span className="live-dot"/>{t('SOFTWARE DEVELOPMENT · GENERATIVE AI','DESENVOLVIMENTO DE SOFTWARE · IA GENERATIVA')}</p><h1>{t('Building software.','Criando software.')}<br/>{t('Connecting','Conectando')}<br/><em>{t('intelligence.','inteligência.')}</em></h1><p className="hero-description">{t('I’m Nícolas. I connect code, data and AI agents to turn complex ideas into working systems.','Sou Nícolas. Conecto código, dados e agentes de IA para transformar ideias complexas em sistemas funcionais.')}</p>
          <div className="hero-actions"><a className="button primary" href="#work">{t('Explore my work','Explore meus projetos')}<span>↘</span></a><a className="text-link" href={github} target="_blank" rel="noopener noreferrer">GitHub<span>↗</span></a></div><p className="hero-footnote"><span className="tiny-cross">+</span>{t('Intern at 2RPnet','Estagiário na 2RPnet')}<span className="divider">/</span>{t('Student at SENAI São Paulo','Aluno do SENAI São Paulo')}</p>
        </div>
        <div className="hero-art" aria-label={t('Interactive visualization of connected software, data and AI systems','Visualização interativa de software, dados e sistemas de IA conectados')}><div className="art-top"><span><i/>{t('SYSTEMS IN EXPLORATION','SISTEMAS EM EXPLORAÇÃO')}</span><span>NS / 001</span></div><NetworkCanvas paused={paused} active={orbit}/>
          <div className="orbital-label label-ai"><button data-orbit="ai" aria-pressed={orbit==='ai'} onClick={()=>setOrbit('ai')}><span>01</span>{t('AI AGENTS','AGENTES DE IA')}<b>↗</b></button></div><div className="orbital-label label-data"><button data-orbit="data" aria-pressed={orbit==='data'} onClick={()=>setOrbit('data')}><span>02</span>{t('DATA','DADOS')}<b>↗</b></button></div><div className="orbital-label label-code"><button data-orbit="code" aria-pressed={orbit==='code'} onClick={()=>setOrbit('code')}><span>03</span>SOFTWARE<b>↗</b></button></div>
          <div className="art-bottom"><div><span className="micro">{t('CONNECTED THINKING','PENSAMENTO CONECTADO')}</span><p id="orbit-caption" aria-live="polite">{orbitCaptions[orbit][language]}</p></div><span className="art-coordinate">23° / 47°</span></div>
        </div><div className="hero-bottom"><a href="#work"><span className="scroll-line"/>{t('SCROLL TO EXPLORE','ROLE PARA EXPLORAR')}</a><span>{t('CODE WITH PURPOSE. BUILD WITH CURIOSITY.','CÓDIGO COM PROPÓSITO. CONSTRUÇÃO COM CURIOSIDADE.')}</span></div>
      </section>
      <div className="stack-strip" aria-label={t('Technologies','Tecnologias')}><span>{t('THE BUILDING BLOCKS','AS BASES DA CONSTRUÇÃO')}</span><div>Python<i>✳</i>Google ADK<i>✳</i>Java<i>✳</i>TypeScript<i>✳</i>PostgreSQL<i>✳</i>Docker</div></div>
      <ProjectGallery language={language} onProject={setProject}/><AgentLab language={language}/>
      <section className="section about" id="about"><div className="about-intro reveal"><p className="eyebrow">03 / {t('THE PERSON BEHIND THE CODE','A PESSOA POR TRÁS DO CÓDIGO')}</p><h2>{t('Curious by nature.','Curioso por natureza.')}<br/><em>{t('Builder by choice.','Criador por escolha.')}</em></h2><p>{t('I’m Nícolas Silva, a software development intern at 2RPnet and a Systems Analysis and Development student at SENAI São Paulo.','Sou Nícolas Silva, estagiário em desenvolvimento de software na 2RPnet e estudante de Análise e Desenvolvimento de Sistemas no SENAI São Paulo.')}</p><p>{t('I’m interested in how software, data and generative AI come together. I learn by building: from full-stack applications to systems where specialized agents work toward a shared goal.','Tenho interesse em como software, dados e IA generativa se conectam. Aprendo construindo: de aplicações full-stack a sistemas em que agentes especializados trabalham por um objetivo comum.')}</p><a className="text-link" href={linkedin} target="_blank" rel="noopener noreferrer">{t('More about my background','Mais sobre minha trajetória')}<span>↗</span></a></div>
        <div className="about-details reveal">
          <div className="timeline">
            <div><span className="micro">{t('EXPERIENCE / CURRENT','EXPERIÊNCIA / ATUAL')}</span><h3>{t('Software Development Intern','Estagiário em Desenvolvimento de Software')}</h3><p>2RPnet</p><small>{t('Applied software development, AI agents and automation.','Desenvolvimento de software, agentes de IA e automação.')}</small></div>
            <div><span className="micro">{t('HIGHER EDUCATION / 2026 — 2027 EXPECTED','GRADUAÇÃO / 2026 — 2027 PREVISTO')}</span><h3>{t('Systems Analysis & Development','Análise e Desenvolvimento de Sistemas')}</h3><p>SENAI São Paulo</p><small>{t('Software engineering, databases and intelligent applications.','Engenharia de software, bancos de dados e aplicações inteligentes.')}</small></div>
            <div><span className="micro">{t('TECHNICAL EDUCATION / 2024 — 2025','FORMAÇÃO TÉCNICA / 2024 — 2025')}</span><h3>{t('Technical Diploma in Systems Development','Técnico em Desenvolvimento de Sistemas')}</h3><p>SENAI São Paulo</p><small>{t('Technical education in software development.','Formação técnica em desenvolvimento de sistemas.')}</small></div>
          </div>
          <div className="toolbox"><span className="micro">{t('TOOLS I BUILD WITH','FERRAMENTAS QUE UTILIZO')}</span><div className="skill-row"><span>{t('AI & DATA','IA E DADOS')}</span><p>Python · Google ADK · Gemini · SQL</p></div><div className="skill-row"><span>SOFTWARE</span><p>React · TypeScript · Java · Spring Boot</p></div><div className="skill-row"><span>{t('SYSTEMS','SISTEMAS')}</span><p>PostgreSQL · Docker · Git · {t('REST APIs','APIs REST')}</p></div></div>
        </div>
      </section>
      <section className="contact section" id="contact"><div className="contact-top"><p className="eyebrow"><span className="live-dot"/>{t('LET’S BUILD SOMETHING USEFUL','VAMOS CONSTRUIR ALGO ÚTIL')}</p><span className="micro">{t('A CONVERSATION IS A GOOD START.','UMA CONVERSA É UM BOM COMEÇO.')}</span></div><a className="contact-title" href={linkedin} target="_blank" rel="noopener noreferrer">{t('Connect the dots','Conecte as ideias')}<span>↗</span></a><div className="contact-bottom"><p>{t('Have a project, an opportunity, or an interesting problem?','Tem um projeto, uma oportunidade ou um problema interessante?')}<br/>{t('I’d love to hear about it.','Vou gostar de conhecer sua ideia.')}</p><div><a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href={github} target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></div></section>
    </main>
    <footer><a className="brand" href="#home">n<span className="brand-dot">›</span><span>Nícolas Silva.</span></a><p>{t('Always learning. Always building.','Sempre aprendendo. Sempre construindo.')}</p><a href="#home">{t('BACK TO TOP ↑','VOLTAR AO TOPO ↑')}</a><span>© 2026</span></footer><ProjectDialog project={project} language={language} onClose={()=>setProject(null)}/>
  </>;
}
