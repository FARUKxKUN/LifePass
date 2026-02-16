# LifePass - Plateforme de Gestion de Dossiers Médicaux

LifePass est une plateforme moderne et sécurisée permettant aux patients de centraliser leurs dossiers médicaux et aux professionnels de santé d'y accéder instantanément via un système de QR Code.

![LifePass Banner](https://raw.githubusercontent.com/FARUKxKUN/LifePass/main/public/banner.png) *(Note: Placeholder pour une future bannière)*

## 🚀 Fonctionnalités Clés

### 👤 Pour les Patients
- **Tableau de Bord Intuitif** : Suivi de l'activité récente et des accès.
- **Dossier Médical Centralisé** : Accès rapide aux rapports, ordonnances et historique.
- **Mon QR Code** : Votre passeport médical personnel pour un accès rapide par les médecins.
- **Journal d'Accès** : Visualisez qui a consulté vos données et quand.

### ⚕️ Pour les Professionnels de Santé
- **Scan QR Code** : Accès immédiat au profil médical du patient en cas d'urgence ou de consultation.
- **Historique des Patients** : Gestion simplifiée des patients consultés.
- **Ajout de Rapports** : Possibilité de mettre à jour le dossier du patient avec de nouveaux comptes-rendus.

## 🛠️ Stack Technique

- **Frontend** : [React](https://reactjs.org/) (Vite)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **Routage** : [React Router v7](https://reactrouter.com/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **QR Code** : [qrcode.react](https://www.npmjs.com/package/qrcode.react)

## 📦 Installation et Lancement

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/FARUKxKUN/LifePass.git
   cd LifePass
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer l'application en mode développement** :
   ```bash
   npm run dev
   ```

4. **Accéder à l'application** :
   Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## 📂 Architecture du Projet

```text
src/
├── components/     # Composants UI réutilisables
├── context/        # Gestion de l'état (Auth, etc.)
├── layouts/        # Structures de pages (Patient, Docteur)
├── pages/          # Vues de l'application
│   ├── patient/    # Portail patient
│   └── doctor/     # Portail médecin
├── router.jsx      # Configuration des routes
└── index.css       # Styles globaux et Tailwind
```

## 🔒 Sécurité et Confidentialité

La sécurité des données est au cœur de LifePass. Chaque accès est consigné et seul l'utilisateur final a le plein contrôle sur son dossier médical.

---
Développé avec ❤️ par [FARUKxKUN](https://github.com/FARUKxKUN)
