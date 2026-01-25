const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../config");

/**
 * Middleware pour vérifier le JWT dans les requêtes
 */
const checkJwt = (req, res, next) => {
    // Récupération du token depuis le header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ message: "Token manquant" });
    }

    // Format attendu : "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: "Format du token invalide" });
    }

    try {
        // Vérification et décodage du token
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        
        // Ajout des infos utilisateur dans la requête
        req.utilisateur = decoded;
        
        // Passage au prochain middleware/route
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ message: "Token expiré" });
        }
        return res.status(403).send({ message: "Token invalide" });
    }
};

module.exports = checkJwt;
