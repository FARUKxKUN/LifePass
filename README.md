# LifePass

**1st place, DevHeist hackathon at ISIMa.**

LifePass lets patients keep their medical records in one place and share them with a doctor through a personal QR code. A doctor scans the code, sees the patient's history, and can add a new report. The patient sees an access log of who opened their file and when.

This repo is the clickable prototype we presented. All patient data is mocked, and the UI is in French.

## Team

Built as a team. Our teammates led the concept and the pitch. Farouk Battikh and Yassine Bouteraa built the prototype together.

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

- React + Vite
- Tailwind CSS
- Framer Motion
- React Router
- qrcode.react
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Demo accounts are defined in `src/data/mockData.js`.
