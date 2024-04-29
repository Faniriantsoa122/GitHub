// Fonction pour mettre à jour un téléphone
const mysql = require("mysql");
const db = mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password:'',
        database:'vente'
    });
function UpdatePhone(id_phone, newData, callback) {
    db.query('UPDATE phones SET ? WHERE id_phone = ?', [newData, id_phone], (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour du téléphone:", err);
            callback(err, null);
        } else {
            console.log("Téléphone mis à jour avec succès");
            callback(null, result);
        }
    });
}

// Fonction pour mettre à jour une commande
function UpdateCommande(id_commande, newData, callback) {
    db.query('UPDATE commandes SET ? WHERE id_commande = ?', [newData, id_commande], (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour de la commande:", err);
            callback(err, null);
        } else {
            console.log("Commande mise à jour avec succès");
            callback(null, result);
        }
    });
}

module.exports = { UpdatePhone,UpdateCommande};
