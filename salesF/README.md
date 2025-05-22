<<<<<<< HEAD
# Sales1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
=======
🔐 1. Authentication & Role Management
Fonctionnalités :

Authentification par JWT ou session

Attribution de rôles : Admin, Pre-seller, Direct Seller, Supervisor, Unit Manager

Middleware/interceptor pour vérifier les permissions sur chaque action

📦 2. Gestion des Produits / Clients / Routes
Entities :

Product, Client, Route, User

Particularités :

Client → Type (WHS, HFS, SMM)

Route → Assignée à un ou plusieurs vendeurs

Admin → CRUD complet

Assignation de clients et routes aux vendeurs

🛒 3. Gestion des Ventes
Pre-seller :

Crée des commandes

Contrôle de revisite pour clients HFS/SMM tous les 3 jours

Direct Seller :

Gère stock sur camion

Ventes en temps réel avec déduction automatique

Workflow commun :

Sélection du client (filtré par route)

Parcours des produits

Saisie des quantités

Récapitulatif de commande

Vérification des promotions

Soumission de commande

🎁 4. Moteur de Promotions
Types de règles :

TPR (réduction temporaire)

LPR (réduction longue durée)

Cadeau (Ex : "Achetez 3, obtenez 1 gratuit")

Remise selon volume

Attribution des promos :

Par type de client

Par période

🚚 5. Gestion des Stocks
Spécificités :

Stock par camion (emplacement + quantité)

Chargement/déchargement quotidien

Mouvements de stock synchronisés avec les ventes

📊 6. Module de Reporting
Indicateurs clés :

Ventes par vendeur, type, région

Respect des routes & planning de revisite (SMM/HFS)

Efficacité des promotions

Corrélation stock vs ventes
👥 Rôles Utilisateur & Responsabilités
✨ Admin
Rôle central avec contrôle total du système

🛠️ Permissions :
✅ CRUD : Produits, Clients, Routes

✅ Création de promotions (TPR, LPR, cadeaux, remises)

✅ Gestion des utilisateurs et attribution des rôles

✅ Accès complet aux tableaux de bord et exports

🛍️ Pre-seller
Prend les commandes, sans livraison directe

🛠️ Permissions :
✅ Voir ses routes et clients assignés

✅ Créer, modifier, annuler des commandes

✅ Suivi de revisite (SMM/HFS) tous les 3 jours

🧾 Processus de commande :
Sélection client (par route/type)

Affichage produits (stock + promos actives)

Saisie des quantités

Résumé de la commande

Application des promotions éligibles

Validation & envoi

🚗 Direct Seller (Auto Seller)
Vend et livre directement depuis le camion

🛠️ Permissions :
✅ Charger le stock quotidiennement

✅ Vente en temps réel (stock camion déduit immédiatement)

✅ Synchronisation avec le système central

🔄 Processus de vente :
Vérifier stock camion

Sélection client & produits

Saisie quantités

Affichage promotions applicables

Déduction stock & confirmation vente

👩‍💼 Supervisor
Gère les vendeurs dans une unité

🛠️ Permissions :
✅ Suivre la performance des vendeurs

✅ Approuver promotions clients ou grosses commandes

✅ Contrôler le respect des tournées (SMM/HFS revisites)

✅ Check-in quotidien avec routes assignées

🧱 Unit Manager
Coordonne plusieurs équipes

🛠️ Permissions :
✅ Valider les allocations de stock

✅ Accès aux rapports multi-routes

✅ Suivi de performance vendeurs

✅ Contrôle budget & efficacité des promotions

✅ Demandes administratives (utilisateurs, anomalies)
>>>>>>> cbd6dd91dd4a2732cb0d681f56c014a47be758e8
