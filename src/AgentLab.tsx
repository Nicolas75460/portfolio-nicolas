import { useEffect, useRef, useState } from 'react';
import { initialTrace, moduleDetails, requestReceived, workflowLines, type Language, type Module, type Scenario, type TraceLine } from './data';

export function AgentLab({language}:{language:Language}) {
  const pt=language==='pt-BR';
  const [module,setModule]=useState<Module>('orchestrator');
  const [scenario,setScenario]=useState<Scenario>('overview');
  const [running,setRunning]=useState(false);
  const [trace,setTrace]=useState<TraceLine[]>(initialTrace);
  const timers=useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);
  function runWorkflow() {
    if(running)return;
    setRunning(true);setTrace([{text:requestReceived}]);
    const lines=workflowLines[scenario];
    lines.forEach((line,index)=>timers.current.push(setTimeout(()=>{
      setTrace(previous=>[...previous,line]);
      if(index===lines.length-1){setRunning(false);timers.current=[];}
    },(index+1)*720)));
  }
  function moduleButton(id:Module,index:string){const info=moduleDetails[id];return <button data-module={id} aria-pressed={module===id} onClick={()=>setModule(id)}><span>{index}</span><b>{info.name[language]}</b><small>{info.short[language]}</small></button>;}
  return <section className="section lab" id="lab">
    <div className="section-heading reveal"><div><p className="eyebrow">02 / {pt?'LABORATÓRIO INTERATIVO':'INTERACTIVE LAB'}</p><h2>{pt?'Veja as conexões.':'See the connections.'}</h2></div><p>{pt?'Uma boa arquitetura merece mais que um diagrama.':'Good architecture deserves more than a diagram.'}<br/>{pt?'Explore uma versão simplificada do fluxo multiagente.':'Step inside a simplified multi-agent workflow.'}</p></div>
    <div className="lab-shell reveal"><div className="lab-bar"><span><span className="red-dot"/>{pt?'LABORATÓRIO DE AGENTES':'AGENT PLAYGROUND'}</span><span>{pt?'DEMONSTRAÇÃO ILUSTRATIVA · NO NAVEGADOR':'ILLUSTRATIVE DEMO · RUNS IN YOUR BROWSER'}</span></div>
      <div className="lab-layout"><div className="lab-system"><div className="lab-instruction"><span className="micro">01 — {pt?'SELECIONE UM COMPONENTE':'SELECT A COMPONENT'}</span><span>↓</span></div>
        <div className="architecture"><div className="modules-left">{moduleButton('context','01')}{moduleButton('memory','02')}</div><div className="architecture-core">{moduleButton('orchestrator','✳')}</div><div className="modules-right">{moduleButton('models','03')}{moduleButton('tools','04')}{moduleButton('output','05')}</div></div>
        <div className="component-detail" aria-live="polite"><span className="micro" id="module-label">{moduleDetails[module].label[language]}</span><h3 id="module-title">{moduleDetails[module].title[language]}</h3><p>{moduleDetails[module].description[language]}</p></div>
      </div><div className="terminal"><div className="terminal-heading"><span>workflow.trace</span><span>● ● ●</span></div><label htmlFor="scenario">02 — {pt?'ESCOLHA UMA SOLICITAÇÃO':'CHOOSE A REQUEST'}</label><select id="scenario" value={scenario} onChange={e=>setScenario(e.target.value as Scenario)} disabled={running}><option value="overview">{pt?'Resumir o perfil de crédito de um cliente':'Summarize a customer’s credit profile'}</option><option value="payments">{pt?'Explorar o histórico de pagamentos':'Explore payment history'}</option><option value="contracts">{pt?'Revisar os contratos existentes':'Review existing contracts'}</option></select><button className="button primary" id="run-demo" onClick={runWorkflow} disabled={running}>{running?(pt?'Coordenando agentes…':'Coordinating agents…'):(pt?'Executar fluxo':'Run workflow')}<span>{running?'◌':'▶'}</span></button>
        <div id="trace" className="trace" role="log" aria-live="polite">{trace.map((line,i)=><p className={line.kind==='muted'?'trace-muted':line.kind==='success'?'trace-success':''} key={i}>{line.kind!=='muted'&&<span>›</span>}{line.text[language]}</p>)}</div><div className="terminal-note">{pt?'Uma explicação visual da orquestração de agentes.':'A visual explanation of agent orchestration.'}<br/>{pt?'Sem chamadas reais de IA ou dados reais de clientes.':'No live AI calls or real customer data.'}</div>
      </div></div>
    </div>
  </section>;
}
