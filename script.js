/* =========================================
   HAJARA STORE
   BOUTIQUE + ADMINISTRATION
========================================= */


/* =========================================
   MOT DE PASSE ADMIN
========================================= */

const MOT_DE_PASSE_ADMIN = "Hajara2026";


/* =========================================
   PRODUITS PAR DÉFAUT
========================================= */

const produitsParDefaut = [

    {
        id: 1,
        nom: "Parfum Asad",
        prix: 15000,
        description: "Parfum élégant et raffiné.",
        image: ""
    },

    {
        id: 2,
        nom: "Parfum Yara",
        prix: 18000,
        description: "Une fragrance douce et féminine.",
        image: ""
    },

    {
        id: 3,
        nom: "Savon",
        prix: 4000,
        description: "Savon adapté à tous types de peau.",
        image: ""
    }

];


/* =========================================
   CHARGER LES PRODUITS
========================================= */

let produits =
    JSON.parse(
        localStorage.getItem("hajaraProduits")
    ) || produitsParDefaut;


/* =========================================
   PANIER
========================================= */

let panier = [];

let moyenPaiement = "";


/* =========================================
   AFFICHER LES PRODUITS
========================================= */

function afficherProduits() {

    const container =
        document.getElementById(
            "products-container"
        );


    container.innerHTML = "";


    if (produits.length === 0) {

        container.innerHTML = `
            <p class="empty-products">
                Aucun produit disponible pour le moment.
            </p>
        `;

        return;
    }


    produits.forEach(produit => {

        const carte =
            document.createElement("article");


        carte.className =
            "product-card";


        let photo;


        if (produit.image) {

            photo = `
                <img
                    src="${produit.image}"
                    alt="${produit.nom}"
                >
            `;

        } else {

            photo = `
                <div class="product-placeholder">
                    🛍️
                </div>
            `;

        }


        carte.innerHTML = `

            <div class="product-photo">

                ${photo}

            </div>


            <div class="product-info">

                <h3>
                    ${produit.nom}
                </h3>


                <p class="product-description">
                    ${produit.description || ""}
                </p>


                <div class="product-price">
                    ${formaterPrix(produit.prix)}
                </div>


                <button
                    class="add-cart"
                    onclick="ajouterAuPanier(${produit.id})"
                >
                    🛒 Ajouter au panier
                </button>

            </div>

        `;


        container.appendChild(carte);

    });

}


/* =========================================
   FORMAT PRIX
========================================= */

function formaterPrix(prix) {

    return new Intl.NumberFormat("fr-FR")
        .format(prix)
        + " FCFA";

}


/* =========================================
   PANIER
========================================= */

function ajouterAuPanier(id) {

    const produit =
        produits.find(
            item => item.id === id
        );


    if (!produit) return;


    const articleExistant =
        panier.find(
            item => item.id === id
        );


    if (articleExistant) {

        articleExistant.quantite++;

    } else {

        panier.push({
            ...produit,
            quantite: 1
        });

    }


    afficherPanier();

    mettreAJourCompteur();


    alert(
        produit.nom +
        " a été ajouté au panier."
    );

}


function mettreAJourCompteur() {

    const compteur =
        document.getElementById(
            "cart-count"
        );


    const totalArticles =
        panier.reduce(
            (total, produit) =>
                total + produit.quantite,
            0
        );


    compteur.textContent =
        totalArticles;

}


function afficherPanier() {

    const container =
        document.getElementById(
            "cart-items"
        );


    const totalElement =
        document.getElementById(
            "cart-total"
        );


    container.innerHTML = "";


    if (panier.length === 0) {

        container.innerHTML = `
            <p class="empty-cart">
                Votre panier est vide.
            </p>
        `;

        totalElement.textContent =
            "0 FCFA";

        return;
    }


    let total = 0;


    panier.forEach(produit => {

        const sousTotal =
            produit.prix *
            produit.quantite;


        total += sousTotal;


        const ligne =
            document.createElement("div");


        ligne.className =
            "cart-item";


        ligne.innerHTML = `

            <div class="cart-item-info">

                <strong>
                    ${produit.nom}
                </strong>

                <span>
                    ${formaterPrix(produit.prix)}
                </span>

            </div>


            <div class="quantity-controls">

                <button
                    onclick="modifierQuantite(${produit.id}, -1)"
                >
                    −
                </button>


                <strong>
                    ${produit.quantite}
                </strong>


                <button
                    onclick="modifierQuantite(${produit.id}, 1)"
                >
                    +
                </button>

            </div>


            <button
                class="remove-item"
                onclick="supprimerDuPanier(${produit.id})"
            >
                🗑️
            </button>

        `;


        container.appendChild(ligne);

    });


    totalElement.textContent =
        formaterPrix(total);

}


function modifierQuantite(
    id,
    changement
) {

    const produit =
        panier.find(
            item => item.id === id
        );


    if (!produit) return;


    produit.quantite +=
        changement;


    if (produit.quantite <= 0) {

        supprimerDuPanier(id);

        return;
    }


    afficherPanier();

    mettreAJourCompteur();

}


function supprimerDuPanier(id) {

    panier =
        panier.filter(
            produit =>
                produit.id !== id
        );


    afficherPanier();

    mettreAJourCompteur();

}


function ouvrirPanier() {

    const modal =
        document.getElementById(
            "cart-modal"
        );


    modal.style.display =
        "block";


    afficherPanier();

}


function fermerPanier() {

    const modal =
        document.getElementById(
            "cart-modal"
        );


    modal.style.display =
        "none";

}


/* =========================================
   PAIEMENT
========================================= */

function choisirPaiement(moyen) {

    moyenPaiement =
        moyen;


    const info =
        document.getElementById(
            "payment-info"
        );


    if (moyen === "Wave") {

        info.innerHTML = `

            <strong>
                🟣 Paiement Wave
            </strong>

            <br>

            Numéro :
            <strong>
                +221 77 281 81 49
            </strong>

            <br>

            <small>
                Après le paiement,
                envoyez la capture
                sur WhatsApp.
            </small>

        `;

    }


    if (moyen === "Orange Money") {

        info.innerHTML = `

            <strong>
                🟠 Paiement Orange Money
            </strong>

            <br>

            Numéro :
            <strong>
                +221 70 424 38 28
            </strong>

            <br>

            <small>
                Après le paiement,
                envoyez la capture
                sur WhatsApp.
            </small>

        `;

    }

}


/* =========================================
   WHATSAPP
========================================= */

function commanderWhatsApp() {

    if (panier.length === 0) {

        alert(
            "Votre panier est vide."
        );

        return;
    }


    if (moyenPaiement === "") {

        alert(
            "Veuillez choisir Wave ou Orange Money."
        );

        return;
    }


    let message =
        "Bonjour Hajara Store 👋%0A%0A";


    message +=
        "Je souhaite passer cette commande :%0A%0A";


    let total = 0;


    panier.forEach(produit => {

        const sousTotal =
            produit.prix *
            produit.quantite;


        total += sousTotal;


        message +=
            "• " +
            produit.nom +
            " x" +
            produit.quantite +
            " = " +
            formaterPrix(sousTotal) +
            "%0A";

    });


    message +=
        "%0A💰 Total : " +
        formaterPrix(total);


    message +=
        "%0A💳 Paiement : " +
        encodeURIComponent(
            moyenPaiement
        );


    message +=
        "%0A%0AJe vais envoyer la capture du paiement sur WhatsApp pour validation.";


    const numeroWhatsApp =
        "221772818149";


    const url =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        message;


    window.open(
        url,
        "_blank"
    );

}


/* =========================================
   OUVRIR CONNEXION ADMIN
========================================= */

function ouvrirConnexion() {

    const modal =
        document.getElementById(
            "login-modal"
        );


    modal.style.display =
        "block";


    document
        .getElementById(
            "admin-password"
        )
        .value = "";


    document
        .getElementById(
            "login-error"
        )
        .textContent = "";


    setTimeout(() => {

        document
            .getElementById(
                "admin-password"
            )
            .focus();

    }, 100);

}


/* =========================================
   FERMER CONNEXION
========================================= */

function fermerConnexion() {

    document
        .getElementById(
            "login-modal"
        )
        .style.display =
        "none";

}


/* =========================================
   VÉRIFIER MOT DE PASSE
========================================= */

function verifierMotDePasse() {

    const password =
        document
            .getElementById(
                "admin-password"
            )
            .value;


    const error =
        document.getElementById(
            "login-error"
        );


    if (
        password ===
        MOT_DE_PASSE_ADMIN
    ) {

        fermerConnexion();

        ouvrirAdministration();

    } else {

        error.textContent =
            "❌ Mot de passe incorrect.";

    }

}


/* =========================================
   OUVRIR ADMINISTRATION
========================================= */

function ouvrirAdministration() {

    const panel =
        document.getElementById(
            "admin-panel"
        );


    panel.classList.add(
        "visible"
    );


    afficherProduitsAdmin();


    panel.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================
   FERMER ADMINISTRATION
========================================= */

function fermerAdministration() {

    const panel =
        document.getElementById(
            "admin-panel"
        );


    panel.classList.remove(
        "visible"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   SAUVEGARDER PRODUITS
========================================= */

function sauvegarderProduits() {

    localStorage.setItem(
        "hajaraProduits",
        JSON.stringify(produits)
    );

}


/* =========================================
   AJOUTER PRODUIT
========================================= */

const productForm =
    document.getElementById(
        "product-form"
    );


productForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const imageInput =
            document.getElementById(
                "product-image"
            );


        const nameInput =
            document.getElementById(
                "product-name"
            );


        const priceInput =
            document.getElementById(
                "product-price"
            );


        const descriptionInput =
            document.getElementById(
                "product-description"
            );


        const nom =
            nameInput.value.trim();


        const prix =
            Number(
                priceInput.value
            );


        const description =
            descriptionInput.value.trim();


        if (!nom) {

            alert(
                "Veuillez entrer le nom du produit."
            );

            return;
        }


        if (!prix || prix < 0) {

            alert(
                "Veuillez entrer un prix valide."
            );

            return;
        }


        if (
            imageInput.files.length === 0
        ) {

            ajouterNouveauProduit(
                nom,
                prix,
                description,
                ""
            );

            return;

        }


        const fichier =
            imageInput.files[0];


        const lecteur =
            new FileReader();


        lecteur.onload =
            function(e) {

                ajouterNouveauProduit(
                    nom,
                    prix,
                    description,
                    e.target.result
                );

            };


        lecteur.readAsDataURL(
            fichier
        );

    }
);


/* =========================================
   CRÉER PRODUIT
========================================= */

function ajouterNouveauProduit(
    nom,
    prix,
    description,
    image
) {

    const nouveauProduit = {

        id:
            Date.now(),

        nom:
            nom,

        prix:
            prix,

        description:
            description,

        image:
            image

    };


    produits.push(
        nouveauProduit
    );


    sauvegarderProduits();

    afficherProduits();

    afficherProduitsAdmin();


    document
        .getElementById(
            "product-form"
        )
        .reset();


    alert(
        "✅ Produit ajouté avec succès !"
    );

}


/* =========================================
   AFFICHER ADMIN
========================================= */

function afficherProduitsAdmin() {

    const container =
        document.getElementById(
            "admin-products"
        );


    container.innerHTML = "";


    if (produits.length === 0) {

        container.innerHTML = `
            <p>
                Aucun produit enregistré.
            </p>
        `;

        return;
    }


    produits.forEach(produit => {

        const ligne =
            document.createElement("div");


        ligne.className =
            "admin-product";


        ligne.innerHTML = `

            <div class="admin-product-info">

                ${
                    produit.image
                    ?
                    `
                    <img
                        src="${produit.image}"
                        alt="${produit.nom}"
                    >
                    `
                    :
                    `
                    <div class="admin-product-placeholder">
                        🛍️
                    </div>
                    `
                }


                <div>

                    <strong>
                        ${produit.nom}
                    </strong>

                    <span>
                        ${formaterPrix(produit.prix)}
                    </span>

                </div>

            </div>


            <button
                class="delete-product"
                onclick="supprimerProduit(${produit.id})"
            >
                🗑️ Supprimer
            </button>

        `;


        container.appendChild(
            ligne
        );

    });

}


/* =========================================
   SUPPRIMER PRODUIT
========================================= */

function supprimerProduit(id) {

    const produit =
        produits.find(
            item =>
                item.id === id
        );


    if (!produit) return;


    const confirmation =
        confirm(
            "Voulez-vous vraiment supprimer « " +
            produit.nom +
            " » ?"
        );


    if (!confirmation) return;


    produits =
        produits.filter(
            item =>
                item.id !== id
        );


    sauvegarderProduits();


    panier =
        panier.filter(
            item =>
                item.id !== id
        );


    afficherProduits();

    afficherProduitsAdmin();

    afficherPanier();

    mettreAJourCompteur();


    alert(
        "🗑️ Produit supprimé."
    );

}


/* =========================================
   FERMER LES FENÊTRES EN CLIQUANT DEHORS
========================================= */

window.addEventListener(
    "click",
    function(event) {

        const cartModal =
            document.getElementById(
                "cart-modal"
            );


        const loginModal =
            document.getElementById(
                "login-modal"
            );


        if (
            event.target ===
            cartModal
        ) {

            fermerPanier();

        }


        if (
            event.target ===
            loginModal
        ) {

            fermerConnexion();

        }

    }
);


/* =========================================
   DÉMARRAGE
========================================= */

afficherProduits();

mettreAJourCompteur();