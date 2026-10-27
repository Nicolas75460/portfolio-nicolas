export type Orbit = 'ai' | 'data' | 'code';
export type Filter = 'all' | 'ai' | 'software' | 'data';
export type ProjectId = 'jarvis' | 'exchange' | 'hive' | 'todo';
export type Module = 'context' | 'memory' | 'orchestrator' | 'models' | 'tools' | 'output';
export type Scenario = 'overview' | 'payments' | 'contracts';
export interface TraceLine { text: string; kind?: 'muted' | 'success' }
export const orbitCaptions: Record<Orbit,string> = {
  ai: 'Specialized agents. One coordinated system.',
  data: 'Connecting information to useful insights.',
  code: 'From a clear contract to a working application.'
};
export const moduleDetails: Record<Module,{label:string;title:string;description:string}> = {
  context: {label:'THE REQUEST LAYER',title:'Give the system a clear starting point.',description:'Instructions, the current question and relevant conversation history establish what the agents should do and how they should respond.'},
  memory: {label:'THE INFORMATION LAYER',title:'Keep relevant information within reach.',description:'An agent architecture can retrieve relevant information from a session or a knowledge store, rather than sending every piece of information to the model.'},
  orchestrator: {label:'THE COORDINATION LAYER',title:'One system. Specialized responsibilities.',description:'The orchestrator interprets a request, delegates to the right specialists, and combines their findings into one response.'},
  models: {label:'THE LANGUAGE LAYER',title:'Interpret the question. Choose the next step.',description:'A language model helps interpret requests and select appropriate tools. Clear instructions and tool descriptions guide that decision.'},
  tools: {label:'THE ACTION LAYER',title:'Connect reasoning to actual operations.',description:'Tools give agents defined ways to retrieve records, query data or calculate indicators. Their inputs and outputs form an explicit contract.'},
  output: {label:'THE RESPONSE LAYER',title:'Make the result useful to another system.',description:'Specialist findings can be consolidated into a structured response such as JSON, with supporting explanations and explicit limitations.'}
};
export const workflowLines: Record<Scenario,TraceLine[]> = {
  overview: [
    {text:'Orchestrator → bureau + payments'},
    {text:'Orchestrator → cards + contracts'},
    {text:'Specialists → sample findings returned'},
    {text:'Synthesis → combine the four perspectives'},
    {text:'Demo complete. Structured summary ready.',kind:'success'}
  ],
  payments: [
    {text:'Orchestrator → payment specialist'},
    {text:'Tool → retrieve illustrative payment records'},
    {text:'Specialist → summarize timing and history'},
    {text:'Demo complete. Payment summary ready.',kind:'success'}
  ],
  contracts: [
    {text:'Orchestrator → contract specialist'},
    {text:'Tool → retrieve illustrative contract records'},
    {text:'Specialist → summarize existing obligations'},
    {text:'Demo complete. Contract summary ready.',kind:'success'}
  ]
};
interface Project {type:string; title:string; intro:string; sections:{title:string;items:string[]}[];note?:string;url:string;linkLabel?:string}
export const projects: Record<ProjectId,Project> = {
  jarvis: {
    type:'01 / AI SYSTEMS · TEAM PROJECT', title:'JARVIS / Multi-agent analysis',
    intro:'A credit-analysis project discussed in my shared professional background, organized around an orchestrator and specialized agents.',
    sections:[
      {title:'The architectural idea',items:['An orchestrator receives a question and delegates to specialists.','Bureau, payment, card and contract perspectives are combined into a structured response.','Python and Google ADK provide the foundation described in the shared project overview.']},
      {title:'Explore the concept',items:['The interactive lab below offers a simplified view of delegation and synthesis.','The visual model is an explanation of the pattern, rather than a running instance of the original project.']}
    ],
    note:'The supplied Bitbucket URL requires access or is unavailable. The repository code could not be independently inspected. Project details here are limited to the shared background; the playground uses no real customer data.',
    url:'https://bitbucket.org/2rp-net/multi-agent-system-jarvis/src/master/',linkLabel:'Open Bitbucket (access may be required)'
  },
  exchange: {
    type:'02 / FULL-STACK · COLLABORATIVE PROJECT',title:'SENAI Exchange',
    intro:'A collaborative-economy platform for SENAI students to share, donate and exchange academic materials, tools, books and electronic components.',
    sections:[
      {title:'What the system brings together',items:['Student registration and login with BCrypt password hashing.','Item listings, category filters and exchange proposals.','Messaging linked to exchanges and student profiles.']},
      {title:'Engineering approach',items:['Java 17 and Spring Boot serve both REST endpoints and static frontend resources.','Spring Data JPA / Hibernate connect the application to PostgreSQL.','Docker Compose provisions PostgreSQL and pgAdmin.']}
    ],note:'Summary based on the public repository README. The portfolio preview is a new interface concept, not a screenshot of the deployed project. Team project; no individual contribution percentages or performance claims are implied.',url:'https://github.com/Nicolas75460/sistema-trocas-alunos'
  },
  hive: {
    type:'03 / DATA & IoT · SENSOR SYSTEMS',title:'Colmeia Smart',
    intro:'A beehive-monitoring project that connects ESP32 sensor readings to messaging, storage and dashboards.',
    sections:[
      {title:'The data journey',items:['ESP32 devices collect temperature, humidity and bee-movement readings.','Mosquitto provides MQTT messaging, with MariaDB storing the collected data.','Next.js and Grafana provide interfaces for visualization.']},
      {title:'Supporting infrastructure',items:['Docker Compose manages the service environment.','Node-RED supports embedded-device simulation and testing.','Portainer provides container management.']}
    ],note:'Technologies and system description come from the public README. Its setup instructions reference the upstream mundobee project. The portfolio chart uses illustrative data and is not live hive telemetry.',url:'https://github.com/Nicolas75460/projeto-colmeia-smart'
  },
  todo: {
    type:'04 / BACKEND & TESTING · LEARNING PROJECT',title:'To-Do API / testing lab',
    intro:'A practical Flask REST API lab focused on testing at multiple levels and continuous integration.',
    sections:[
      {title:'Testing across the application',items:['Unit tests isolate models and business logic.','Integration tests verify routes, HTTP contracts and status codes.','End-to-end tests exercise the task lifecycle.']},
      {title:'Continuous integration',items:['The documented workflow uses Pytest, pytest-cov and GitHub Actions.','The lab specifies an 80% coverage quality gate as a configuration target, rather than a measured portfolio result.']}
    ],note:'This is an academic learning project, described from its public README. The original API uses Flask; this portfolio itself has no backend.',url:'https://github.com/Nicolas75460/TodoApp_N2'
  }
};
