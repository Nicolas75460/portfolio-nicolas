import { useId, useState } from 'react';
import type { Language } from './data';

export function SystemMap({language}:{language:Language}) {
  const pt=language==='pt-BR';
  return <div className="jarvis-visual" role="img" aria-label={pt?'Representação conceitual de um orquestrador conectado a quatro agentes especialistas':'Conceptual representation of an orchestrator connected to four specialist agents'}>
    <div className="visual-caption"><span>{pt?'MULTIAGENTES / ARQUITETURA':'MULTI-AGENT / SYSTEM MAP'}</span><span className="status"><i/>{pt?'REPRESENTAÇÃO':'CONCEPTUAL VIEW'}</span></div>
    <div className="map"><div className="map-grid"/><div className="map-orbit"/><div className="core"><span>✳</span><small>{pt?'ORQUESTRADOR':'ORCHESTRATOR'}</small></div>
      <div className="satellite sat-one"><span>⌁</span>BUREAU</div><div className="satellite sat-two"><span>↔</span>{pt?'PAGAMENTOS':'PAYMENTS'}</div><div className="satellite sat-three"><span>▱</span>{pt?'CARTÕES':'CARDS'}</div><div className="satellite sat-four"><span>≡</span>{pt?'CONTRATOS':'CONTRACTS'}</div>
      <svg className="map-lines" viewBox="0 0 500 380" aria-hidden="true"><path d="M250 190 L115 83 M250 190 L395 107 M250 190 L100 285 M250 190 L385 292"/><circle r="3"><animateMotion dur="3s" repeatCount="indefinite" path="M115 83 L250 190 L395 107"/></circle><circle r="3"><animateMotion dur="4s" repeatCount="indefinite" path="M100 285 L250 190 L385 292"/></circle></svg>
    </div><div className="map-footer"><span>{pt?'SOLICITAR → DELEGAR → CONSOLIDAR':'REQUEST → DELEGATE → SYNTHESIZE'}</span><span>↗</span></div>
  </div>;
}

export function JarvisPreview({language}:{language:Language}) {
  const pt=language==='pt-BR';
  const [command,setCommand]=useState(0);
  const commands=[
    {label:pt?'Aplicativos':'Applications',input:'abra a calculadora',output:pt?'Comando de abertura de aplicativo reconhecido.':'Application-launch command recognized.'},
    {label:pt?'Sistema':'System',input:'como está o sistema?',output:pt?'Comando de consulta de CPU, memória e bateria reconhecido.':'CPU, memory and battery query recognized.'},
    {label:pt?'Busca':'Search',input:'pesquise sobre inteligência artificial',output:pt?'Comando de pesquisa no navegador reconhecido.':'Browser-search command recognized.'}
  ];
  return <div className="project-visual voice-preview">
    <div className="visual-caption"><span>J.A.R.V.I.S. / WINDOWS</span><span>{pt?'PRÉVIA ILUSTRATIVA':'ILLUSTRATIVE PREVIEW'}</span></div>
    <div className="voice-center"><div className="arc-ring"><span>J</span></div><div className="voice-copy"><span className="micro">{pt?'VOZ + TEXTO / PT-BR':'VOICE + TEXT / PT-BR'}</span><p>{pt?'Sua voz. Um comando.':'Your voice. A command.'}</p><div className="voice-bars" aria-hidden="true">{Array.from({length:15},(_,i)=><i key={i} style={{height:8+(i*17%31),animationDelay:`${i*.07}s`}}/>)}</div></div></div>
    <div className="command-options" role="group" aria-label={pt?'Prévia de comandos':'Command preview'}>{commands.map((item,i)=><button key={i} aria-pressed={i===command} onClick={()=>setCommand(i)} data-command={i}>{item.label}</button>)}</div>
    <div className="command-result" aria-live="polite"><code>› {commands[command].input}</code><p>{commands[command].output}</p></div>
    <span className="visual-note">{pt?'SIMULAÇÃO LOCAL · SEM CONTROLE DO DISPOSITIVO':'LOCAL SIMULATION · NO DEVICE CONTROL'}</span>
  </div>;
}

export function DocumentPipeline({language}:{language:Language}) {
  const pt=language==='pt-BR';
  const [stage,setStage]=useState(0);
  const id=useId();
  const stages=pt?[
    {name:'Origem',title:'PDF e Word como ponto de partida.',sample:'documento_exemplo.pdf',description:'Um documento fictício inicia o fluxo de processamento.'},
    {name:'Extração',title:'Do conteúdo visual ao texto.',sample:'OCR → texto extraído',description:'OCR para páginas digitalizadas; extração direta para texto acessível.'},
    {name:'Índice',title:'Contexto organizado em trechos.',sample:'trecho_01 · trecho_02 · trecho_03',description:'Os trechos formam uma base de contexto que pode ser recuperado.'},
    {name:'Busca',title:'O contexto certo para a pergunta.',sample:'pergunta → trechos relevantes',description:'A recuperação seleciona passagens relacionadas à tarefa de análise ou redação.'},
    {name:'Redação',title:'Uma minuta apoiada nas fontes.',sample:'contexto → minuta → revisão humana',description:'O conteúdo recuperado apoia a redação, seguida de revisão humana.'}
  ]:[
    {name:'Source',title:'PDF and Word as the starting point.',sample:'example_document.pdf',description:'A fictional document starts the processing workflow.'},
    {name:'Extract',title:'From visual content to text.',sample:'OCR → extracted text',description:'OCR for scanned pages; direct extraction for accessible text.'},
    {name:'Index',title:'Context organized into passages.',sample:'chunk_01 · chunk_02 · chunk_03',description:'Passages form a context collection that can be retrieved.'},
    {name:'Retrieve',title:'The right context for the question.',sample:'question → relevant passages',description:'Retrieval selects passages related to the analysis or drafting task.'},
    {name:'Draft',title:'A draft supported by sources.',sample:'context → draft → human review',description:'Retrieved content supports drafting, followed by human review.'}
  ];
  return <div className="project-visual document-preview">
    <div className="visual-caption"><span>{pt?'OCR / EXTRAÇÃO / RAG':'OCR / EXTRACTION / RAG'}</span><span>{pt?'REPRESENTAÇÃO':'CONCEPTUAL VIEW'}</span></div>
    <div className="pipeline-steps" role="group" aria-label={pt?'Etapas do processamento documental':'Document processing stages'}>{stages.map((item,i)=><button key={i} aria-pressed={stage===i} aria-controls={id} onClick={()=>setStage(i)} data-stage={i}><span>0{i+1}</span>{item.name}</button>)}</div>
    <div className="pipeline-detail" id={id} aria-live="polite"><div className="document-icon" aria-hidden="true"><span>≡</span><i/><i/><i/></div><div><h4>{stages[stage].title}</h4><p>{stages[stage].description}</p></div></div>
    <code className="pipeline-sample">{stages[stage].sample}</code><span className="visual-note">{pt?'EXEMPLO FICTÍCIO · SEM DOCUMENTOS ORIGINAIS':'FICTIONAL EXAMPLE · NO ORIGINAL DOCUMENTS'}</span>
  </div>;
}
