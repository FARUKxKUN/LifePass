# LifePass

Redesigned in October 2026. The version presented at the hackathon is tagged `hackathon-2026-02`.

**Live demo: https://lifepass-sandy.vercel.app** (prototype with mock data)

**1st place, DevHeist hackathon at ISIMa.**

LifePass lets patients keep their medical records in one place and share them with a doctor through a personal QR code. A doctor scans the code, sees the patient's history, and can add a new report. The patient sees an access log of who opened their file and when.

This repo is the clickable prototype we presented. All patient data is mocked, the UI is in French, and this is a prototype: not a medical product and not compliant with any health-data regulation.

![LifePass landing](docs/screenshot.png)

![The patient QR code](docs/patient-qr.png)

## Team

Built as a team. [Yassine Bouteraa](https://github.com/yassinebouteraa) and [Rayen Chatti](https://github.com/rayenchatti) led the concept and the pitch. Farouk Battikh built the prototype.

## What's in the prototype

**Patient side**
- Dashboard with recent activity
- Medical records (reports, prescriptions, history)
- Personal QR code
- Access log
- Settings

**Doctor side**
- QR scan to open a patient's file
- Patient view with history
- Add a report to a patient's file
- Dashboard of recently seen patients

## Stack

- React + Vite + TypeScript
- Tailwind CSS v4 (CSS-first tokens)
- motion and GSAP ScrollTrigger
- React Router
- qrcode.react
- Phosphor icons
- Fraunces, Figtree and Geist Mono (self-hosted)

## Run locally

```bash
npm install
npm run dev
```

Demo accounts are defined in `src/data/mockData.ts`.
