import { useEffect, useRef } from 'react';
import { projects, type ProjectId } from './data';

export function ProjectDialog({project,onClose}:{project:ProjectId|null;onClose:()=>void}) {
  const ref=useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog=ref.current;
    if (!dialog) return;
    if (project) { dialog.showModal(); document.body.style.overflow='hidden'; }
    else { dialog.close(); document.body.style.overflow=''; }
    return () => { document.body.style.overflow=''; };
  },[project]);
  const details=project ? projects[project] : null;
  return <dialog ref={ref} id="project-dialog" aria-labelledby="dialog-title" onCancel={event=>{event.preventDefault();onClose();}} onClick={event=>{if(event.target===ref.current){const r=ref.current!.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)onClose();}}}>
    <button className="dialog-close" aria-label="Close project details" onClick={onClose}>×</button>
    {details && <><p className="eyebrow">{details.type}</p><h2 id="dialog-title">{details.title}</h2><p>{details.intro}</p><div>{details.sections.map(section=><section key={section.title}><h3>{section.title}</h3><ul>{section.items.map(item=><li key={item}>{item}</li>)}</ul></section>)}{details.note && <p className="detail-note">{details.note}</p>}</div><a className="button primary" href={details.url} target="_blank" rel="noopener noreferrer">{details.linkLabel||'View repository'} <span>↗</span></a></>}
  </dialog>;
}
