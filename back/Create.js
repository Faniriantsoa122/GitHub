
const mysql = require("mysql");
const db = mysql.createConnection(
  {
      host:'localhost',
      user: 'root',
      password:'',
      database:'vente'
  })  
function CreatePhone(marque, version, memoire,promotion,quantite) {
  marque = String(marque);
  version = String(version);
  memoire = String(memoire);
  promotion = String(promotion);
  quantite = String(quantite);
  db.query('INSERT INTO phones (marque, version,memoire,promotion,quantite) VALUES (?, ?, ?, ?, ?)', [marque, version,memoire,promotion,quantite], (err, result) => {
    if (err) {
      console.error("Erreur lors de la création du téléphone:", err);
      
    } else {
      console.log("Téléphone créé avec succès",result);
                                                                                    
    }
  });
}

function CreateCommande(marque_commande,version_commande , memoire_commande,email_commandeur,quantite_commande ,date_commande) {
  marque_commande = String(marque_commande);
  version_commande = String(version_commande );
  memoire_commande = String(memoire_commande);
  email_commandeur = String(email_commandeur);
  quantite_commande = String(quantite_commande);
  date_commande= String(date_commande);

  db.query('INSERT INTO commandes (marque_commande,version_commande,memoire_commande,email_commandeur,quantite_commande ,date_commande) VALUES (?, ?, ?, ?, ?,?)', [marque_commande,version_commande , memoire_commande,email_commandeur,quantite_commande ,date_commande], (err, result) => {
    if (err) {
      console.error("Erreur lors de la création du commande:", err);
      
    } else {
      console.log("Commandes créé avec succès",result);
                                                                                    
    }
  });
}


module.exports = {CreatePhone, CreateCommande} ;
