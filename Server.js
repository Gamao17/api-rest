let express = require('express')
let app = express()


const path = require('path');
const dotenv = require('dotenv');

// Spécifiez le chemin relatif vers votre fichier .env
const envFilePath = path.resolve(__dirname, 'config', '.env');
dotenv.config({ path: envFilePath });

let mongoose = require('mongoose');
const url = process.env.MONGO_URL
const User = require('./models/User')
const database = 'users_contactlist';



// connexion à la base de donnée
     mongoose.connect(`${url}/${database}`, {})
       .then(() => {
         console.log('connexion reussie')
       })
       .catch(err => {
         console.error('erreur de connexion', err)
       })

// route pour lire les utilisateur
       app.get('/', (req, res) => {
        User.find()
        .then((users) => {
          if (users.length === 0) {
            console.log('Aucun utilisateur trouvé');
            res.json({ message: 'Aucun utilisateur trouvé' });
          } else {
            res.json(users);
            console.log(users);
          }
        })
        .catch((err) => {
          console.log('Erreur :', err);
          res.status(500).json({ message: 'Erreur lors de la recherche des utilisateurs' });
        });
      });
      


// Route pour créer un nouvel utilisateur
app.post('/users', async (req, res) => {
  try {
    const newUser = await User.create({ name: "Karim", age: 28 });
    res.json(newUser);
  } catch (error) {
    console.error('Erreur lors de la création d\'un nouvel utilisateur :', error);
    res.status(500).json({ message: error.message });
  }
});


// route pour la mise à jour d'un utilisateur
app.put('/users/:id', async (req,res)=>{
  try{
      const id = req.params.id
      const user = await User.findByIdAndUpdate(id, {name : 'Ansou'}, {new : true})
      res.json(user)
  }
  catch{
      res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
}) 

// route pour suppression d'utilisateur
app.delete('/users/:id', async (req,res)=>{
  try{
      const id = req.params.id
      const user = await User.findByIdAndDelete(id)
      res.json(user)
  }
  catch{
      res.status(404).json({ message: 'Utilisateur non trouvé'});
  }
}) 

app.listen(3000, ()=>{
  console.log('le serveur est lancé, rendez vous sur le lien suivant : http://localhost:3000')
})
