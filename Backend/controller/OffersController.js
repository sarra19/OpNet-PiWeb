const Offer = require("../models/offer");
const  User = require('../models/user');



async function getAllOffers(req, res) {
  try {
    const { searchTerm, offerType, contractType } = req.query; // Récupérer les termes de recherche depuis les paramètres de requête

    let query = { archived: false }; // Filtre pour récupérer uniquement les offres non archivées par défaut

    // Si un terme de recherche est fourni, mettez à jour la requête pour inclure le filtre de recherche sur le titre de l'offre
    if (searchTerm) {
      query = {
        ...query,
        title: { $regex: searchTerm, $options: 'i' } // Recherche insensible à la casse dans le titre de l'offre
      };
    }

    // Si un type d'offre est fourni, ajoutez le filtre correspondant
    if (offerType) {
      query = {
        ...query,
        offerType: offerType // Filtre sur le type d'offre
      };
    }

    // Si un type de contrat est fourni, ajoutez le filtre correspondant
    if (contractType) {
      query = {
        ...query,
        contractType: contractType // Filtre sur le type de contrat
      };
    }

    const data = await Offer.find(query);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


async function getOfferById(req, res) {
  try {
    const data = await Offer.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function addOffer(req, res) {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.status(201).json({ message: "Offer added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateOffer(req, res) {
  try {
    await Offer.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Offer updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteOffer(req, res) {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function archiveOffer(req, res) {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    // Récupérer la date actuelle au format ISO 8601 (UTC)
    const currentDate = new Date().toISOString().split('T')[0];

    // Vérifier si la date d'expiration est dépassée
    const expirationDate = new Date(offer.expirationDate);

    console.log('Current Date:', currentDate);
    console.log('Expiration Date:', expirationDate.toISOString().split('T')[0]);

    if (currentDate >= expirationDate.toISOString().split('T')[0]) {
      // Marquer l'offre comme archivée
      offer.archived = true;

      // Sauvegarder les modifications
      await offer.save();

      return res.status(200).json({ message: "Offer archived successfully" });
    } else {
      return res.status(400).json({ error: "Offer is not expired yet" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}



async function getArchivedOffers(req, res) {
  try {
    const archivedOffers = await Offer.find({ archived: true });
    res.status(200).json(archivedOffers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

//crud commentaire 
async function addComment(req, res) {
  try {
    const { text } = req.body;
    const offer = await Offer.findById(req.params.offerId); // Utiliser req.params.offerId
    //const user = await User.findById(req.userId); // Utilisez le modèle User pour récupérer l'utilisateur actuel


    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    // Récupérer l'utilisateur à partir de la requête (ou utilisez un nom d'utilisateur par défaut)
    let user;
    if (req.user) {
      // Si vous avez un système d'authentification en place et que l'utilisateur est authentifié
      user = req.user; // Utilisez l'utilisateur authentifié pour le commentaire
    } else {
      // Utilisez un nom d'utilisateur par défaut (vous pouvez le personnaliser selon vos besoins)
      user = "Anonymous";
    }

    offer.comments.push({ text: text, user: user }); // Ajoutez le nom de l'utilisateur au commentaire
    await offer.save();
    res.status(201).json({ message: "Comment added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


async function updateComment(req, res) {
  try {
    const { text } = req.body;
    const offer = await Offer.findById(req.params.offerId);

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    const comment = offer.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Mettre à jour le texte du commentaire
    comment.text = text;

    // Enregistrer les modifications dans la base de données
    await offer.save();

    // Répondre avec un message de succès
    return res.status(200).json({ message: "Comment updated successfully" });
  } catch (err) {
    // Gérer les erreurs
    return res.status(400).json({ error: err.message });
  }
}



async function deleteComment(req, res) {
  try {
    const offer = await Offer.findById(req.params.offerId);

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    // Trouver l'index du commentaire dans le tableau des commentaires
    const commentIndex = offer.comments.findIndex(comment => comment._id.toString() === req.params.commentId);

    // Vérifier si le commentaire existe
    if (commentIndex === -1) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Supprimer le commentaire à l'index trouvé
    offer.comments.splice(commentIndex, 1);

    await offer.save();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



async function getCommentsByOfferId(req, res) {
  try {
    const offer = await Offer.findById(req.params.offerId);
    
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    // Récupérer les commentaires de l'offre avec les informations sur l'utilisateur pour chaque commentaire
    const comments = offer.comments;

    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
// Fonction pour gérer les likes des commentaires
async function likeComment(req, res) {
  try {
    const offer = await Offer.findById(req.params.offerId);

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    const comment = offer.comments.id(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Incrémenter le compteur de likes pour ce commentaire
    comment.likes += 1;

    await offer.save();

    res.status(200).json({ message: "Comment liked successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


// CRUD pour les likes
async function addLike(req, res) {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    offer.likes += 1; // Incrémenter le nombre de likes
    await offer.save();
    res.status(201).json({ message: "Like added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function removeLike(req, res) {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    if (offer.likes > 0) {
      offer.likes -= 1; // Décrémenter le nombre de likes si possible
    }

    await offer.save();
    res.status(200).json({ message: "Like removed successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
// Ajoutez une nouvelle route pour obtenir le nombre de likes d'une offre spécifique
async function getLike(req, res) {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }
    res.status(200).json({ likes: offer.likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}





module.exports = {
  getAllOffers,
  getOfferById,
  addOffer,
  updateOffer,
  deleteOffer,
  addComment,
  updateComment,
  deleteComment,
  likeComment,
  archiveOffer, 
  getArchivedOffers ,
  addLike,
  removeLike,
  getCommentsByOfferId,
  getLike,
};
