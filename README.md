# Application Shopping - React + Vite

Cette application est une boutique en ligne développée avec React et Vite.

## Fonctionnalités

- Affichage d'une liste de produits
- Consommation d'une API locale avec `json-server` (fichier : `data/db.json`)
- Interface moderne avec React
- Hot Module Replacement (HMR) grâce à Vite

## Démarrage rapide

1. Installer les dépendances :

```bash
npm install
```

2. Lancer le serveur d'API locale :

```bash
json-server --watch data/db.json --port 3001
```

3. Démarrer l'application React :

```bash
npm run dev
```

## Structure du projet

- `src/` : Code source React
- `data/db.json` : Données mockées pour l'API
- `public/` : Fichiers statiques

## API locale

L'API est accessible sur [http://localhost:8888/products](http://localhost:8888/products).

## Auteur

Projet réalisé en septembre 2025.
