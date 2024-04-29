// server.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
require('dotenv').config();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const {CreatePhone,CreateCommande}= require('./Create');
const {DeletePhone,DeleteCommande}= require('./Delete');
const {UpdatePhone,  UpdateCommande}= require('./Update');
const db = mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password:'',
        database:'vente'
    });

  
    app.get('/phones', (req, res) => {
      db.query('SELECT * FROM phones', (err, results) => {
        if (err) {
          console.error('Erreur lors de la récupération des données de la table:', err);
          res.status(500).send('Erreur lors de la récupération des données de la table');
        } else {
          res.json(results);
        }
      });
    });  

      app.get('/commandes', (req, res) => {
        db.query('SELECT * FROM commandes', (err, result) => {
          if (err) {
            console.error("Erreur lors de la récupération des téléphones:", err);
            res.status(500).send("Erreur lors de la récupération des téléphones");
          } else {
            res.send(result); // Renvoie les données récupérées
          }
        });
      });
// Route pour créer un téléphone
app.post('/phones', (req, res) => {
  const { marque, version, memoire,promotion,quantite } = req.body;
  CreatePhone(marque, version, memoire,promotion,quantite, (err, result) => {
    if (err) {
      res.status(500).send("Erreur lors de la création du téléphone");
    } else {
      res.send(result);
    }
  });
});

//Route créer un commandes
app.post('/commandes', (req, res) => {
  const { marque_commande,version_commande,memoire_commande,email_commandeur,quantite_commande,date_commande } = req.body;

  CreateCommande( marque_commande,version_commande,memoire_commande,email_commandeur,quantite_commande,date_commande,(err, result) => {
    if (err) {
      res.status(500).send("Erreur lors de la création de la commande");
    } else {
      res.send(result);
    }
  });
});

app.delete('/phones/:id',(req,res)=>{
const idPhone = req.params.id
DeletePhone(idPhone,(err,result)=>{
  if(err){
    res.status(500).send("Erreur suppression")
  }else{
    res.send(result)
  }
})
});

app.delete('/commandes/:id',(req,res)=>{
  const idCommande = req.params.id
  DeleteCommande(idCommande,(err,result)=>{
    if(err){
      res.status(500).send("Erreur suppression")
    }else{
      res.send(result)
    }
  })
  });

 //Route phones pour modifiication
  app.put('/phones/:id', (req, res) => {
    const phoneId = req.params.id;
    const newData = req.body;
    UpdatePhone(phoneId, newData,(err, result)=>{
     if(err){
      res.status(500).send("Erreur mise en jours")
     }else{
      res.send(result)
     }

    }
    );
});

//Route commande pour modification
app.put('/commandes/:id', (req, res) => {
    const commandeId = req.params.id;
    const newData = req.body;
    UpdateCommande(commandeId, newData,(err, result)=>{
      if(err){
       res.status(500).send("Erreur mise en jours")
      }else{
       res.send(result)
    }
    })
});

//Route créer le login
app.post('/vente',(req, res)=>{
const sql ="INSERT INTO vendeurs( `nom`,`email`,`password`,`adresse`,`num_compte`) VALUES (?)";
const Values =[
  req.body.name,
  req.body.email,
  req.body.password,
  req.body.adresse,
  req.body.num_compte,
]
db.query(sql,[Values], (err, data) =>{
  if(err ){
        return res.json("Error");
  }
  return res.json(data);
})
});
//Route recuperer nom et password vendeur

app.post("/vendeurs", (req, res) => {
  const sql = "SELECT * FROM vente.vendeurs WHERE `email` = ? AND `password` = ?";

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Fail");
    }
  });
});
//Route poster le nom et email vendeur
app.get("/vend", (req, res) => {
  const sql = "SELECT nom, email FROM vendeurs";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête SQL :", err);
      return res.status(500).json({ error: "Erreur serveur interne" });
    }
    if (data.length > 0) {
      return res.status(200).json(data); // Renvoyer les données des vendeurs
    } else {
      return res.status(404).json({ message: "Aucun enregistrement trouvé" });
    }
  });
});
//Route créer inscription vendues

app.post('/ventes', (req, res) => {
  const sql = "INSERT INTO vendues(`email_client`, `password_client`, `quantite_produit`, `num_compte_client`, `date_vendue`) VALUES (?, ?, ?, ?, ?)";
  const values = [
      req.body.email_client,
      req.body.password_client,
      req.body.quantite_produit,
      req.body.num_compte_client,
      req.body.date_vendue,
  ];
  db.query(sql, values, (err, data) => {
      if (err) {
          console.log(err); // Affiche l'erreur dans la console pour le débogage
          return res.json("Error");
      }
      return res.json(data);
  });
});


app.listen(3002, () => {
  console.log('Serveur Express fonctionnant sur le port 3002');
});
