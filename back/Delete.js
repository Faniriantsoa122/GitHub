
const mysql = require("mysql");
const db = mysql.createConnection(
  {
      host:'localhost',
      user: 'root',
      password:'',
      database:'vente'
  });
function DeletePhone(id_phone, callback){
db.query('DELETE FROM phones WHERE id_phone = ?', [id_phone], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression du téléphone:", err);
      callback(err,null)
    } else {
      console.log("Téléphone supprimé avec succès");
      callback(null,result)
    }
  });
}
function DeleteCommande(id_commande, callback){
  db.query('DELETE FROM commandes WHERE id_commande = ?', [id_commande], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression de la commande:", err);
      callback(err,null)
    } else {
      console.log("Commande supprimée avec succès");
      callback(null,result)
    }
  });
}
module.exports = {DeletePhone,DeleteCommande};