# Café Restaurant Management Application

Une application web complète de gestion pour café-restaurant avec menu, commandes, tables, inventaire et paiements.

## 🎯 Fonctionnalités

- ☕ **Gestion du Menu** - Boissons (chaudes/froides), petit-déjeuner, déjeuner, dîner, entrées, salades, desserts
- 📋 **Système de Commandes** - Créer et suivre les commandes en temps réel
- 🪑 **Gestion des Tables** - Visualiser l'état et la capacité des tables
- 📦 **Inventaire** - Suivi du stock avec alertes de stock faible
- 💳 **Paiements** - Enregistrement des transactions et historique
- 📊 **Tableau de Bord** - Statistiques et analyse en temps réel

## 🛠 Architecture

```
CafeRestaurantApp/
├── backend/                 # API Node.js/Express
│   ├── src/
│   │   ├── config/         # Configuration de la base de données
│   │   ├── routes/         # Routes API
│   │   ├── models/         # Modèles de données
│   │   ├── controllers/    # Logique métier
│   │   └── index.js        # Serveur principal
│   └── package.json
│
└── frontend/                # Application React
    ├── public/
    ├── src/
    │   ├── components/     # Composants React
    │   ├── pages/         # Pages principales
    │   ├── api/           # Client API
    │   ├── styles/        # Feuilles de style CSS
    │   └── App.jsx        # Composant principal
    └── package.json
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn

### Backend

1. Naviguez vers le dossier backend:
```bash
cd backend
```

2. Installez les dépendances:
```bash
npm install
```

3. Créez un fichier `.env`:
```bash
cp .env.example .env
```

4. Démarrez le serveur:
```bash
npm run dev
```

Le serveur sera disponible à `http://localhost:5000`

### Frontend

1. Dans un nouveau terminal, naviguez vers le dossier frontend:
```bash
cd frontend
```

2. Installez les dépendances:
```bash
npm install
```

3. Démarrez l'application React:
```bash
npm start
```

L'application sera disponible à `http://localhost:3000`

## 📡 API Endpoints

### Menu
- `GET /api/menu/categories` - Récupérer les catégories
- `POST /api/menu/categories` - Créer une catégorie
- `GET /api/menu/items` - Récupérer tous les articles
- `GET /api/menu/items/:categoryId` - Récupérer les articles d'une catégorie
- `POST /api/menu/items` - Ajouter un article

### Commandes
- `GET /api/orders` - Récupérer toutes les commandes
- `GET /api/orders/:id` - Récupérer une commande par ID
- `POST /api/orders` - Créer une nouvelle commande
- `PATCH /api/orders/:id` - Mettre à jour le statut d'une commande

### Tables
- `GET /api/tables` - Récupérer toutes les tables
- `GET /api/tables/:id` - Récupérer une table par ID
- `POST /api/tables` - Créer une table
- `PATCH /api/tables/:id` - Mettre à jour le statut d'une table

### Inventaire
- `GET /api/inventory` - Récupérer l'inventaire
- `POST /api/inventory` - Ajouter un article à l'inventaire
- `PATCH /api/inventory/:id` - Mettre à jour la quantité

### Paiements
- `GET /api/payments` - Récupérer tous les paiements
- `POST /api/payments` - Enregistrer un paiement

## 🗄 Base de Données

L'application utilise SQLite avec les tables suivantes:
- `users` - Utilisateurs et personnel
- `categories` - Catégories de menu
- `menu_items` - Articles du menu
- `tables` - Tables du restaurant
- `orders` - Commandes
- `order_items` - Détail des commandes
- `inventory` - Stock et inventaire
- `payments` - Historique des paiements

## 🎨 Interface Utilisateur

- **Navigation intuitive** - Menu principal pour accéder aux fonctionnalités
- **Tableau de bord** - Vue d'ensemble avec statistiques clés
- **Responsif** - Adapté à tous les appareils (desktop, tablette, mobile)
- **Thème café** - Design chaleureux avec palette marron et or

## 📝 Utilisation

1. Accédez au **tableau de bord** pour une vue d'ensemble
2. Utilisez **Commandes** pour créer et suivre les commandes
3. Visualisez l'**état des tables** en temps réel
4. Gérez le **menu** et les prix
5. Suivez le **stock** avec les alertes
6. Consultez l'**historique des paiements**

## 🔧 Variables d'Environnement

Créez un fichier `.env` dans le dossier backend:

```
PORT=5000
NODE_ENV=development
DATABASE_PATH=./data/cafe.db
CORS_ORIGIN=http://localhost:3000
```

## 📚 Technologies Utilisées

### Backend
- Express.js - Framework web
- SQLite3 - Base de données
- CORS - Gestion des requêtes cross-origin
- dotenv - Gestion des variables d'environnement

### Frontend
- React 18 - Framework UI
- React Router - Navigation
- Axios - Client HTTP
- CSS3 - Styling

## 🐛 Dépannage

**Erreur de connexion à la base de données:**
- Assurez-vous que le dossier `data/` existe
- Vérifiez les permissions du fichier

**Frontend ne se connecte pas au backend:**
- Vérifiez que le backend s'exécute sur le port 5000
- Vérifiez la variable `REACT_APP_API_URL` dans le frontend

**Erreur CORS:**
- Vérifiez que la variable `CORS_ORIGIN` correspond à l'URL du frontend

## 📄 Licence

ISC

## 👨‍💻 Support

Pour toute question ou problème, consultez la documentation ou contactez le support.

---

**Version:** 1.0.0  
**Dernière mise à jour:** 2026
