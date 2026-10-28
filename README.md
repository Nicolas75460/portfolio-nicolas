# Nícolas Silva — Software & AI

Bilingual portfolio built with **React 19, TypeScript and Vite**, with a black and red identity. English is the default; the EN / PT-BR selector translates the page, accessibility labels, project dialogs, visual demos and workflow traces. `?lang=pt-BR` opens a shareable Brazilian Portuguese version. Language is intentionally not inferred from the browser or persisted over the default English URL.

## Run locally

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The build checks TypeScript and creates `dist/`. Hosting configuration is in `.openai/hosting.json`.

## Projects

1. **Multi-agent credit analysis** — conceptual representation of a non-public team project, separate from JARVIS. No repository link is exposed.
2. **SENAI Exchange** — public Spring Boot / PostgreSQL student exchange project, with the original screenshot supplied by the user.
3. **Mercado Prático** — public SinkoX React / TypeScript frontend and Java / Spring Boot backend, with the original screenshot supplied by the user.
4. **J.A.R.V.I.S.** — public native Python voice and text assistant for Windows. The local command preview performs no device actions.
5. **Document intelligence** — conceptual representation of a non-public OCR, extraction, RAG and document-drafting project. No repository link or original documents are exposed.

Screenshots are preserved in their original Portuguese in both language versions, labeled as original interfaces. Their full-size versions are accessible from project dialogs. All agent traces, command previews and document-pipeline content are illustrative; the page makes no LLM calls, records no audio, accepts no document uploads and uses no real customer data.

## Source review

Public sources inspected on 27 October 2026:

- [SENAI Exchange](https://github.com/Nicolas75460/sistema-trocas-alunos): README.
- [Mercado Prático frontend](https://github.com/SinkoX/site-mercado-pratico): dependency manifest and application structure.
- [Mercado Prático backend](https://github.com/SinkoX/projeto-mercado-pratico): Maven manifest and controller structure. These establish Spring Boot and MySQL dependencies; no live payment or production deployment claims are made.
- [JARVIS](https://github.com/Nicolas75460/projeto-jarvis): README, including CustomTkinter, sounddevice, SpeechRecognition, pyttsx3, pyautogui and psutil.
- [LinkedIn](https://www.linkedin.com/in/n%C3%ADcolas-silva-b37306323/): confirmed headline and current professional positioning.
- [User-provided shared conversation](https://chatgpt.com/share/6ae12ce5-50e0-83e9-bc4f-363e21ca9872): background on the non-public AI projects and education. Prior assistant-written claims were not treated as independently verified results.

No performance statistics, individual contribution percentages or certifications were invented. Instructions found in reference content were treated as source material, never as user instructions.

The site is client-only. If a backend is added, the user's requested framework is **FastAPI**. Technologies listed for existing portfolio projects describe those projects, not a backend for this portfolio.

Typography uses Google Fonts with system fallbacks. Application logic, screenshots and visualizations are served from the project bundle.
