# Jeux de traduction de mots

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

### Pré-requis

Vous devez vous assurez de bien avoir sur votre machine les services suivants:

- Angular CLI: 9.0.1
- Node: 13.8.0
- MongoDB

### Installation et Démarrage

Avant de cloner le projet, vous devez préalablement télécharger le fichier à cette adresse https://drive.google.com/file/d/1_XBPIZp5sWsH6rswXLfIdNNv3MSIT56u/view , il permettra de peupler votre base de données.

Une fois ce fichier téléchargé, placé vous à l'emplacement de ce fichier via le terminal et effectué cette commande "mongoimport -d translate-words-api -c words word-game.json".

Ensuite une fois cela effectué, clonez le projet et rendez-vous dans le dossier back, lancez la commande "npm i",
et lancé la commande "npm start".

Ouvrez un autre terminal.

Une fois cela effectué rendez-vous dans le dossier front et effectué la commande "npm i" et lancé la commande "ng serve -o".

Et maintenant Have fun ;)

### Fonctionnement de l'application

L'application Words game, se decoupe en deux parties,

la première partie et la partie back, elle permet de fournir des ressources via des endpoints.

voici comment elle fonctionne: 

Le fichier "app.js" est le fichier source de l'application, il va permettre de générer le serveur grâce au framework Express ainsi que d'utiliser les différents modules qui nous sont nécéssaires pour le fonctionnement de l'application.

il est aussi muni d'une route ici ('/generate/word') qui génére une requête http GET et qui fournira les ressources lié à cette route.

Explication de cette route: 

app.get('/generate/word', async (req, res) => {
    try {
        const randomWord = await Word.randomWord(req.query.difficulty * 1)
        const translatedWord = await translateWord(randomWord)
        res.send({ randomWord, translatedWord })
    } catch(e) {
        res.status(404).send()
    }
})

La constante randomWord vas utiliser la méthode "randomWord" du modèle de schéma defini avec mongoose, il permet fournir un mot aléatoirement se trouvant dans la base de données à laquelle on s'est connecté (voir /back/src/db/mongoose.js) fonction de la difficulté fourni (ici on utilise req.query.difficulty). La technique utilisée est ce qu'on appelle une agrégation. Voir /back/src/models/words.js




