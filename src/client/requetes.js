let listeFilms;
let listeCategs;
let listeFilmsDisponible = false;

let chargerFilms = () => {
    $.ajax({
        "type"      :   "GET",
        "url"       :   "src/serveur/dbfilms.json",
        "async"     :   false,
        "data"      :   {"nom":"Antonio"},
        "dataType"  :   "json",
        "success"   : (reponse) =>{
            listeFilms = reponse.movies;
            listeCategs = reponse.genres;
            listeFilmsDisponible = true;
            const dateCourrante = new Date();
            listerLesPlusRecents(dateCourrante.getFullYear());
        },
        "fail"      : (e) => {
                    //Afficher message sur votre page
        }

    })
}

