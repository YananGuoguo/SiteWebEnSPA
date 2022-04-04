async function getFilms() {
    //Fetch un fichier json
    //Ceci OK pour Web mais pas pour une PWA installable. 
    //Raison ? window.location.href n'est plus connue.
    //let url = window.location.href + '/src/donnees/films.json';
    let url = '../serveur/donnees/films.json';
    let reponse = await fetch(url);
    return await reponse.json(); // lit reponse du body et retourne en format JSON
}