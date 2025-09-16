# Premier projet React

Ce projet est basé sur Create React App.

## Fonctionnalités principales

- Affichage d'une liste de produits/articles avec leurs détails.
- Chaque carte d'article propose un bouton **Show** pour afficher le contenu (description, stock, prix, etc.).
- Une fois le contenu affiché, un bouton **Reduce** permet de le masquer.
- Gestion du stock et du statut "like" sur chaque produit.
- Composants réutilisables (Button, ProductCard, ArticleCard...).

## Démarrage

```bash
npm install
npm start
```

Accédez à [http://localhost:3000](http://localhost:3000).

## Structure du projet

- `src/components/product/article/ArticleCard.jsx` : carte d'article avec boutons Show/Reduce.
- `src/components/utils/Button.jsx` : composant bouton réutilisable.
- `src/data/data.jsx` : données des produits/articles.

## Scripts disponibles

- `npm start` : lance le serveur de développement.
- `npm test` : lance les tests unitaires.
- `npm run build` : génère la version production.

## Pour aller plus loin

Consultez la documentation officielle :

- [React](https://reactjs.org/)
- [Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
