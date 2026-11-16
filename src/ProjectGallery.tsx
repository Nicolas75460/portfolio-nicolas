import { useState, type ReactNode } from 'react';
import { projects, type Filter, type Language, type Project, type ProjectId } from './data';
import { SystemMap, DocumentPipeline, JarvisPreview, CrewMonitor } from './ProjectVisuals';

const countWords = {en:['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine'],'pt-BR':['Zero','Um','Dois','Três','Quatro','Cinco','Seis','Sete','Oito','Nove']};

export function ProjectGallery({language,onProject}:{language:Language;onProject:(id:ProjectId)=>void}) {
  const pt=language==='pt-BR';
  const [filter,setFilter]=useState<Filter>('all');
  const visible=projects.filter(project=>filter==='all'||project.category===filter);
  const total=String(projects.length).padStart(2,'0');
  const filters:{id:Filter;label:string}[]=[{id:'all',label:pt?'Todos':'All work'},{id:'ai',label:pt?'Sistemas de IA':'AI systems'},{id:'software',label:'Software'},{id:'automation',label:pt?'Automação':'Automation'}];
  const featured:Partial<Record<ProjectId,{meta:[string,string];index:string;headline:[string,string];cta:ReactNode;note:string;visual:ReactNode;reverse?:boolean}>>={
    multiagent:{meta:[pt?'SISTEMAS DE IA':'AI SYSTEMS',pt?'PROJETO EM EQUIPE':'TEAM PROJECT'],index:pt?'ANÁLISE MULTIAGENTE':'MULTI-AGENT ANALYSIS',headline:[pt?'Uma pergunta.':'One question.',pt?'Múltiplas perspectivas.':'Multiple perspectives.'],
      cta:<button className="text-link" data-project="multiagent" onClick={()=>onProject('multiagent')}>{pt?'Explorar a arquitetura':'Explore the architecture'}<span>↗</span></button>,
      note:pt?'Código não público. Explore uma representação do sistema.':'Source not public. Explore a representation of the system.',visual:<SystemMap language={language}/>},
    astracare:{meta:['NASA SPACE APPS 2026',pt?'HACKATHON EM EQUIPE':'TEAM HACKATHON'],index:pt?'SAÚDE DE ASTRONAUTAS':'ASTRONAUT HEALTH',headline:[pt?'A Terra está a minutos.':'Earth is minutes away.',pt?'O cuidado não pode esperar.':'Care can’t wait.'],
      cta:<div className="featured-actions"><a className="text-link" href="https://nasa-hackaton.vercel.app/" target="_blank" rel="noopener noreferrer">{pt?'Abrir a demonstração':'Open the live demo'}<span>↗</span></a><button className="text-link quiet" data-project="astracare" onClick={()=>onProject('astracare')}>{pt?'Detalhes do projeto':'Project details'}<span>→</span></button></div>,
      note:pt?'Treinado com dados sintéticos calibrados pela NASA. Nunca diagnostica sozinho.':'Trained on NASA-calibrated synthetic data. It never diagnoses on its own.',visual:<CrewMonitor language={language}/>,reverse:true}
  };
  function details(project:Project) {return <div className="compact-copy"><p className="project-meta">{project.index} / {project.type[language]}</p><h3>{project.title[language]} <button aria-label={`${pt?'Ver projeto':'View project'} ${project.title[language]}`} data-project={project.id} onClick={()=>onProject(project.id)}>↗</button></h3><p>{project.intro[language]}</p><div className="tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>{!project.links&&<span className="private-caption">{pt?'CÓDIGO NÃO PÚBLICO · REPRESENTAÇÃO CONCEITUAL':'SOURCE NOT PUBLIC · CONCEPTUAL REPRESENTATION'}</span>}</div>;}
  function compactVisual(project:Project) {
    if (project.image) return <button className={`project-visual screenshot-preview screenshot-${project.id}`} aria-label={`${pt?'Ver detalhes de':'View details of'} ${project.title[language]}`} onClick={()=>onProject(project.id)}><div className="screenshot-browser"><span>● ● ●</span><span>{project.title[language].toUpperCase()}</span><span>↗</span></div><div className="screenshot-window"><img src={project.image} alt={project.imageAlt?.[language]||''} loading="lazy" width={project.id==='exchange'?1077:1901} height={project.id==='exchange'?1791:937}/></div><span className="screenshot-caption">{pt?'INTERFACE ORIGINAL · PT-BR':'ORIGINAL INTERFACE · PT-BR'}</span></button>;
    return project.id==='jarvis'?<JarvisPreview language={language}/>:<DocumentPipeline language={language}/>;
  }
  return <section className="section work" id="work">
    <div className="section-heading reveal"><div><p className="eyebrow">01 / {pt?'PROJETOS SELECIONADOS':'SELECTED WORK'}</p><h2>{pt?'Ideias em construção.':'Ideas, engineered.'}</h2></div><p>{pt?'Plataformas, automação e inteligência aplicada.':'Platforms, automation and applied intelligence.'}<br/>{countWords[language][projects.length]} {pt?'projetos. Diferentes formas de resolver problemas.':'projects. Different ways to solve problems.'}</p></div>
    <div className="work-toolbar"><div className="filters" role="group" aria-label={pt?'Filtrar projetos':'Filter projects'}>{filters.map(item=><button key={item.id} data-filter={item.id} aria-pressed={filter===item.id} onClick={()=>setFilter(item.id)}>{item.label}{item.id==='all'&&<span>{total}</span>}</button>)}</div><span className="micro" id="project-count" aria-live="polite">{String(visible.length).padStart(2,'0')} {pt?(visible.length===1?'PROJETO':'PROJETOS'):(visible.length===1?'PROJECT':'PROJECTS')}</span></div>
    <div className="projects">
      {projects.map(project=>{
        const hidden=filter!=='all'&&filter!==project.category;
        const feature=featured[project.id];
        if (feature) return <article key={project.id} className={`project featured reveal${feature.reverse?' reverse':''}`} data-category={project.category} data-project-card={project.id} hidden={hidden}>
          <div className="project-copy"><p className="project-meta"><span className="red-dot"/>{feature.meta[0]}<span>{feature.meta[1]}</span></p><p className="project-index">{project.index} / {feature.index}</p><h3>{feature.headline[0]}<br/>{feature.headline[1]}</h3><p>{project.intro[language]}</p><div className="tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>{feature.cta}<p className="source-note">{feature.note}</p></div>{feature.visual}
        </article>;
        return <article key={project.id} className="project compact reveal" data-category={project.category} data-project-card={project.id} hidden={hidden}>{compactVisual(project)}{details(project)}</article>;
      })}
    </div><a className="github-more" href="https://github.com/Nicolas75460?tab=repositories" target="_blank" rel="noopener noreferrer">{pt?'Mais experimentos no GitHub':'More experiments live on GitHub'}<span>↗</span></a>
  </section>;
}
