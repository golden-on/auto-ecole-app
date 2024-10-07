# Getting Started with Create React App

Ce projet a été initialisé avec [Create React App](https://github.com/facebook/create-react-app).

## Scripts Disponibles

Dans le répertoire du projet, vous pouvez exécuter :

### `npm start`

Lance l'application en mode développement.\
Ouvrez [http://localhost:3000](http://localhost:3000) pour la voir dans le navigateur.

La page se rechargera si vous faites des modifications.\
Vous verrez également toutes les erreurs de lint dans la console.

### `npm test`

Lance le test runner en mode interactif.\
Voir la section sur [l'exécution des tests](https://facebook.github.io/create-react-app/docs/running-tests) pour plus d'informations.

### `npm run build`

Construit l'application pour la production dans le dossier `build`.\
Il regroupe correctement React en mode production et optimise la construction pour les meilleures performances.

La construction est minifiée et les noms de fichiers incluent les hachages.\
Votre application est prête à être déployée !

Voir la section sur [le déploiement](https://facebook.github.io/create-react-app/docs/deployment) pour plus d'informations.

### `npm run eject`

**Note: c'est une opération à sens unique. Une fois que vous `eject`, vous ne pouvez plus revenir en arrière !**

Si vous n'êtes pas satisfait des choix d'outils et de configuration, vous pouvez `eject` à tout moment. Cette commande supprimera la dépendance de construction unique de votre projet.

Au lieu de cela, elle copiera tous les fichiers de configuration et les dépendances transitoires (webpack, Babel, ESLint, etc.) directement dans votre projet afin que vous ayez un contrôle total sur eux. Toutes les commandes sauf `eject` fonctionneront toujours, mais elles pointeront vers les scripts copiés afin que vous puissiez les modifier. À ce stade, vous êtes seul.

Vous n'avez jamais besoin d'utiliser `eject`. L'ensemble de fonctionnalités organisé est adapté aux petits et moyens déploiements, et vous ne devriez pas vous sentir obligé d'utiliser cette fonctionnalité. Cependant, nous comprenons que cet outil ne serait pas utile si vous ne pouviez pas le personnaliser lorsque vous êtes prêt.

## En Savoir Plus

Vous pouvez en apprendre davantage dans la [documentation de Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Pour apprendre React, consultez la [documentation de React](https://reactjs.org/).

## Documentation

### Déploiement et Utilisation

Pour déployer et utiliser l'application, suivez les étapes ci-dessous :

1. **Installation des dépendances** : Exécutez `npm install` pour installer toutes les dépendances nécessaires.
2. **Configuration de l'environnement** : Assurez-vous que toutes les variables d'environnement nécessaires sont définies.
3. **Lancement en mode développement** : Utilisez `npm start` pour lancer l'application en mode développement.
4. **Construction pour la production** : Utilisez `npm run build` pour créer une version optimisée de l'application.
5. **Déploiement** : Déployez le contenu du dossier `build` sur votre serveur de production.

### Choix Techniques

- **Gestion des dépendances** : Nous utilisons npm pour gérer les dépendances. Toutes les dépendances sont listées dans le fichier `package.json`.
- **Décisions architecturales** : L'application est construite en utilisant une architecture basée sur les composants de React, ce qui permet une réutilisation et une maintenance faciles du code.
- **Workflows CI/CD** : Nous utilisons GitHub Actions pour automatiser les tests et les déploiements. Chaque commit déclenche un workflow qui exécute les tests et, si tout passe, déploie automatiquement l'application.

### Côté Serveur

Le serveur est construit avec Express.js et gère les opérations suivantes :

- **Enregistrement des utilisateurs** : Les données des utilisateurs sont enregistrées dans un fichier JSON via l'endpoint `/save-user`.
- **Authentification** : Les utilisateurs peuvent se connecter via l'endpoint `/logIn`, qui vérifie les informations d'identification contre les données enregistrées.
- **Middleware** : Le serveur utilise `body-parser` pour analyser les requêtes JSON et `cors` pour permettre les requêtes cross-origin.

Le serveur écoute sur le port 3001 et peut être démarré avec la commande `node server.js`.


