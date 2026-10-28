import { useEffect, useRef } from 'react';
import { projects, type Language, type ProjectId } from './data';
import { DocumentPipeline } from './ProjectVisuals';

export function ProjectDialog({project,onClose,language}:{project:ProjectId|null;onClose:()=>void;language:Language}) {
  const ref=useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog=ref.current;
    if (!dialog) return;
    if (project) { dialog.showModal(); document.body.style.overflow='hidden'; }
    else { dialog.close(); document.body.style.overflow=''; }
    return () => { document.body.style.overflow=''; };
  },[project]);
  const details=projects.find(item=>item.id===project);
  const pt=language==='pt-BR';
  return <dialog ref={ref} id="project-dialog" aria-labelledby="dialog-title" onCancel={event=>{event.preventDefault();onClose();}} onClick={event=>{if(event.target===ref.current){const r=ref.current!.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)onClose();}}}>
    <button className="dialog-close" aria-label={pt?'Fechar detalhes do projeto':'Close project details'} onClick={onClose}>×</button>
    {details && <><p className="eyebrow">{details.index} / {details.type[language]}</p><h2 id="dialog-title">{details.title[language]}</h2><p>{details.intro[language]}</p>
      {details.image&&<figure className="dialog-screenshot"><a href={details.image} target="_blank" rel="noopener noreferrer" aria-label={pt?'Abrir captura original em tamanho completo':'Open original screenshot at full size'}><img src={details.image} alt={details.imageAlt?.[language]||''}/></a><figcaption>{pt?'Interface original em português · clique para ampliar':'Original interface in Portuguese · click to enlarge'}</figcaption></figure>}
      {project==='documents'&&<DocumentPipeline language={language}/>}
      <div>{details.sections.map(section=><section key={section.title.en}><h3>{section.title[language]}</h3><ul>{section.items.map(item=><li key={item.en}>{item[language]}</li>)}</ul></section>)}{details.note&&<p className="detail-note">{details.note[language]}</p>}</div>
      {details.links&&<div className="dialog-links">{details.links.map(link=><a key={link.url} className="button primary" href={link.url} target="_blank" rel="noopener noreferrer">{link.label[language]}<span>↗</span></a>)}</div>}
      {project==='multiagent'&&<a className="button primary" href="#lab" onClick={onClose}>{pt?'Explorar o laboratório':'Explore the interactive lab'}<span>↘</span></a>}
    </>}
  </dialog>;
}
