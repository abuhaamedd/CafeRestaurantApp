# 🚀 Guide de Démarrage Rapide

## ✅ Prérequis
- Node.js v16+ installé
- npm ou yarn disponible
- VS Code (avec cet espace de travail ouvert)

## 📋 Structure du Projet

```
CafeRestaurantApp/
├── backend/          - API Node.js/Express (port 5000)
├── frontend/         - Application React (port 3000)
├── data/             - Base de données SQLite
└── .vscode/          - Configuration VS Code (tasks, launch configs)
```

## 🎯 Étape 1: Démarrer le Backend

### Option A: Via la tâche VS Code
1. Appuyez sur `Ctrl+Shift+B` (macOS: `Cmd+Shift+B`)
2. Sélectionnez: **Backend: Start Server**
3. Attendez: "Server running on http://localhost:5000"

### Option B: Via le terminal
```bash
cd backend
npm run dev
```

✅ **Succès**: Le serveur affiche "Server running on http://localhost:5000"

## 🎯 Étape 2: Démarrer le Frontend

### Option A: Via la tâche VS Code
1. Appuyez sur `Ctrl+Shift+B` (macOS: `Cmd+Shift+B`)
2. Sélectionnez: **Frontend: Start Dev Server**
3. Attendez l'ouverture automatique du navigateur

### Option B: Via le terminal (nouveau terminal)
```bash
cd frontend
npm start
```

✅ **Succès**: L'application ouvre automatiquement http://localhost:3000

## 🚀 Démarrage Rapide (Les Deux Ensemble)

1. Appuyez sur `Ctrl+Shift+B`
2. Sélectionnez: **Start All (Backend + Frontend)**
3. Attendez le démarrage complet (30-60 secondes)

## 📱 Accès à l'Application

- **Dashboard**: http://localhost:3000
- **API Backend**: http://localhost:5000/api
- **Vérifier l'état**: http://localhost:5000/api/health

## 📊 Pages Disponibles

Une fois lancée, utilisez la barre de navigation pour:
- 📊 **Dashboard** - Vue d'ensemble avec statistiques
- 📋 **Commandes** - Gestion des commandes
- 🪑 **Tables** - État des tables
- ☕ **Menu** - Catalogue des articles
- 📦 **Inventaire** - Gestion du stock
- 💳 **Paiements** - Historique des transactions

## 🔧 Arrêter les Serveurs

Dans le panel Terminal VS Code:
- Cliquez le X pour arrêter une tâche spécifique
- Ou pressez `Ctrl+C` dans le terminal

## ⚙️ Configuration

Les fichiers de configuration sont:
- **Backend**: `backend/.env`
- **Frontend**: Variables d'environnement dans `frontend/src/api/client.js`

## 🐛 Dépannage

### Erreur: "Port 5000 déjà utilisé"
```bash
# Trouvez et arrêtez le processus
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Erreur: "CORS blocked"
- Vérifiez que le backend s'exécute sur http://localhost:5000
- Vérifiez le frontend sur http://localhost:3000

### Base de données vide
- Elle se crée automatiquement au premier démarrage
- Dossier: `data/cafe.db`

### Installation incomplète
```bash
# Réinstallez les dépendances
cd backend && npm install
cd ../frontend && npm install
```

## 📖 Prochaines Étapes

1. **Ajouter des données**: Utilisez les endpoints API via un client REST
2. **Personnaliser le style**: Modifiez les fichiers CSS dans `src/styles/`
3. **Ajouter des fonctionnalités**: Explorez les fichiers dans `src/pages/` et `src/components/`

## 🎓 Ressources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [SQLite Documentation](https://www.sqlite.org/)
- [API REST Best Practices](https://restfulapi.net/)

## 📞 Support

Pour plus d'aide, consultez:
- [README.md](./README.md) - Documentation complète
- Commentaires dans le code source
- Logs du terminal pour les erreurs détaillées

---

**Bon développement! ☕**
