# NOOVOY AI: research findings

Source synthesis, not independent market research. Compiled 2026-10-12 from the team's shared Drive (`NOOVOY_AI_TRL4_OnboardingAgent`) and the Open Call 3 competition site (https://noovoy-ai.netlify.app). Market figures and competitor claims come from the competition submission and were **not re-verified**.

## Naming and organisation

- **NİRENE**: *Next-Generation Employee Readiness and Integration through Networked AI Ecosystems*. Project/ecosystem name used in the latest partner correspondence (survey v5 mail from Prof. Dr. Semail Ülgen).
- **NOOVOY AI**: product brand. Signature in the same mail: "INNOSU R&D – NOOVOY AI".
- **INNOSU R&D**: developing company, AOSB Teknopark Antalya. Collaboration with Antalya Bilim Üniversitesi (ABÜ).
- Drive documents (July–September 2026) use only "NOOVOY AI"; "NİRENE" appears only in the latest mail. Final naming is not confirmed (see PRD open questions).

## Product vision (long term)

Eight cooperating HR agents: Onboarding, Wellness, HR Intelligence, Manager, Culture, Learning, Crisis, Retention. Positioned as a "system of intelligence" versus SAP SuccessFactors / Workday as "systems of record". Ethics positioning: EU AI Act, GDPR, KVKK, human-in-the-loop.

## Current scope (Master PRD, authored by Yusuf Berat Negiz)

- First milestone: **Onboarding Agent MVP validated at TRL 4** in a controlled environment.
- P0: approved document upload with metadata, RAG Q&A with source references, "information not found" behaviour, role profiles (≥5), role-based 30/60/90-day plan, missions/tasks, HR review/edit, logging, TRL 4 evidence.
- P1: declared skills, CV-based skill gap, multi-language, HRIS integrations.
- P2 (explicitly out of the MVP): Wellness, Retention, Confusion Score, Hidden Talent, burnout/turnover prediction, Slack/Teams/email tone monitoring, automated alerts about individuals.
- Users: new employee, HR specialist, manager (limited, read-only support role), technical admin.
- Proposed TRL 4 metrics (targets, not achieved): workflow completion ≥90%, correct source retrieval ≥85%, hallucination ≤5%, "not found" correctness ≥90%, avg response ≤8 s, prompt-injection resistance ≥90%, PII disclosure 0.

## Strategy and programme

- Strategic goal: Women TechEU grant application; TRL 4 evidence package is the proof point (NOOVOY AI Academy bootcamp, 6 July 2026).
- 5D roadmap: DISCOVER → DESIGN → DEVELOP → DEPLOY → DEMONSTRATE. Only DISCOVER has content so far.
- Pilot partners with signed LOIs: **AGT Ağaç Sanayi** (operational onboarding, HR workload), **DOKA** (human-centred adaptation), **DESIRD** (role-based personalisation). Negotiations: CW Enerji, Swandor Hotels & Resorts.
- Data collection starts with surveys (employee, HR/process owner, manager; v5 sent to partners).

## Technical direction agreed in Drive

- Backend: Python + FastAPI; PostgreSQL + pgvector; Row-Level Security on `company_id` + `role` to isolate AGT/DOKA/DESIRD data.
- LLM: API-first behind a provider interface; pseudonymisation and data minimisation before every LLM call; sensitive topics (salary, health, discipline, termination) escalate to a human.
- Single orchestrator for the MVP; no CrewAI. LangGraph only if multi-agent need is proven.
- Embeddings: multilingual (e.g. BGE-M3 or `text-embedding-3-small`); Turkish support required.
- Frontend research (FR_1/FR_2): React component architecture, design tokens, 8px grid, WCAG 2.1 AA, light/dark. REST API draft: `POST /api/auth/login`, `GET /api/dashboard`, `GET|PATCH /api/missions`, `GET /api/journey`, `POST /api/chat`, `GET|PATCH /api/profile`, `GET /api/hr/employees`, `GET /api/hr/feedback`, `GET|PATCH /api/slack/flows`.
- Wireframes (Platform_Wireframes.pdf): Login, Dashboard, AI Chat with source cards, Mission Center, Journey (30/60/90), HR Dashboard, Slack Flow.
- FR_1 palette (#5B4BFF purple, #6DD5FA cyan) conflicts with project design rules (no purple-to-blue); not adopted.

## Content available for the product page

- Problem framing: generic documents for everyone, HR answering the same questions, unclear first weeks, scattered knowledge.
- Onboarding Agent capabilities (P0 list above) and the source-citation answer pattern from the wireframes.
- Pilot partners and their lenses (AGT / DOKA / DESIRD).
- Team: Prof. Dr. Semail Ülgen (PI), Prof. Dr. Hilal Kazan, Prof. Dr. Aytuğ Onan, Assoc. Prof. Dr. Fatih Ak, Ali Badran, Havva Cebel; scientific advisor Assoc. Prof. Dr. Aydın Çivilidağ.
- Target metrics from the competition site (projections, unmeasured): −70% HR operational load, −30% time-to-productivity, +15 eNPS, <10% first-6-month attrition.
- Pricing from the competition site (Starter €1,400, Growth €3,200, Enterprise €7,400+, Pilot free). To be shown as **mock** until confirmed.
- Demo RAG corpus candidate: INNOSU Employee Handbook parts 2, 4, 5, 6, 8 (Turkish, draft policies).

## Risks for public messaging

- Competition site presents P2 capabilities (behavioural monitoring, turnover prediction, Confusion Score) as product features. Under the EU AI Act, employment-related monitoring and decision support is high-risk. Product page should present them as roadmap only.
- All numeric outcomes are projections; label them as targets.
- Partner names: LOIs signed, but logo/name usage permission is unconfirmed.

## Unread sources

- `NOOVOY_AI_Handbook_Taslaklari_AGT_DESIRD_Doka[1].docx` (redirects to SharePoint login).
- `NOOVOY_Employee_Handbook_Template_v1.0` (Google Doc not accessible).
- Mini-RAG `.py` files (download blocked); their notes were read.
