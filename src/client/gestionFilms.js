let ligneFilms="";

let remplirCard = (unFilm)=> {
    return ` 
                       
                           
   
                        <div class="card mb-3" >
                        <div class="row g-0" id='mov-${unFilm.id}'>
                            <div class="col-md-4">
                                <img src=${unFilm.posterUrl} class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <hr>
                                    <h3 class="card-title">${unFilm.title}</h3>
                                    <i class="fas fa-edit" onclick="UpdateFilm(this);"></i>
                                    <i class="fas fa-trash-alt" onclick="deleteBtn(this);"></i>
                                    <hr>
                                    <h5 class="card-title">Année : ${unFilm.year}</h5>
                                    <hr>
                                    <h5 class="card-title">Durée : ${unFilm.runtime} minutes</h5>
                                    <hr>
                                    <h5 class="card-title">  Catégories</h5> <h4> ${unFilm.genres}</h4>
                                    <hr>
                                    <p class="card-text"><small class="text-muted">${unFilm.plot}</small></p>
                                    
                                </div>
                            </div>
                           
                        </div>
                    </div>
                    


                        `
    
}

let listerTousLesFilms = (duree,titre, annee,ordeDeTri) => {
    if (listeFilmsDisponible){
        let contenu = `<div class="row row-cols-12">`;
        if (annee >= 0){
             if (ordeDeTri == 'D'){  //(b.year > a.year)?1:-1);
                listeFilms.sort((a,b) => parseInt(b.year)-parseInt(a.year));//ordre décroissant
             }else { 
                listeFilms.sort((a,b) => parseInt(a.year)-parseInt(b.year));// cas ordreDeTri == 'C' ordre croissant
             }
                // Par année
                for (unFilm of listeFilms){
                    if (parseInt(unFilm.year) >= annee){//liste selon année
                        contenu+=remplirCard(unFilm);
                    }else if (annee == 0) {//toute la liste
                        contenu+=remplirCard(unFilm);
                    }
                }   
        }else if(titre != null){// if (titre == true)
            if (ordeDeTri == 'D'){
                listeFilms.sort((a,b) => (b.title > a.title)?1:-1);//ordre décroissant
             }else { 
                listeFilms.sort((a,b) => (b.title < a.title)?1:-1);// cas ordreDeTri == 'C' ordre croissant
             }
            // Par titre
            for (unFilm of listeFilms){
                    contenu+=remplirCard(unFilm);
            }
           
        } else if(duree >= 0){
            if (ordeDeTri == 'D'){
                listeFilms.sort((a,b) => parseInt(b.runtime)-parseInt(a.runtime));//ordre décroissant
             }else { 
                listeFilms.sort((a,b) => parseInt(a.runtime)-parseInt(b.runtime));// cas ordreDeTri == 'C' ordre croissant
             }
                // Par année
                for (unFilm of listeFilms){
                    if (parseInt(unFilm.runtime) > duree){
                        contenu+=remplirCard(unFilm);
                    }else if (duree == 0) {
                        contenu+=remplirCard(unFilm);
                    }
                }   
           
        }
        contenu+= `</div>`;
        $('#contenu').html(contenu);
    }
    else { alert("SVP vous devez charger la liste des films en premier"); }
}

let listerLesPlusRecents = (annee) => {
    listeFilms.sort((a,b) => parseInt(b.year)-parseInt(a.year));//ordre décroissant
    const LIMITE=20;//maximum de films à lister dans la page d'accueil au départ
    
    let taille=listeFilms.length;
    let contenu = `<div class="row row-cols-12">`;
    let resteAfficher=LIMITE;
    let i=0;
    while (resteAfficher > 0 && i <= taille){
            let unFilm=listeFilms[i++];
            if (parseInt(unFilm.year) >= annee){//liste selon année
                contenu+=remplirCard(unFilm);
                resteAfficher--;
               
            }else {
                annee--;
            }
    }
    contenu+= `</div>`;
    //afficher le select des catégories
    let navSelCategs = document.getElementById('selCategs');
    let formSelCategs = document.getElementById('formSelCategs');
    for(let unCateg of listeCategs){
        navSelCategs.options[navSelCategs.options.length]=new Option(unCateg,unCateg.substring(0,3));
        formSelCategs.options[formSelCategs.options.length]=new Option(unCateg,unCateg.substring(0,3));
    }
    $('#contenu').html(contenu);
}


// Selectionner par Catégories
let afficherFilmsParCategorie = () => {

let chosenCat = selCategs.value
var filterNews = listeFilms.filter(item => item.genres.filter(cat => chosenCat.indexOf(cat.substring(0,3)) > -1).length);
console.log (filterNews)



const LIMITE=4;//maximum de films à lister dans la page d'accueil au départ
    
let taille=filterNews.length;
let contenu = `<div class="row row-cols-12">`;
let resteAfficher=LIMITE;
let i=0;
while (resteAfficher > 0 && i <= taille){
        let unFilm=filterNews[i++];
            contenu+=remplirCard(unFilm);
            resteAfficher--;
           
      
}
contenu+= `</div>`;

$('#contenu').html(contenu);


}


// Enregistrer

let enregistrerFilm = () => {
    var tabCategs = new Array();
    let formSelCategs = document.getElementById('formSelCategs');
    for(var i=0; i<formSelCategs.options.length; i++)
    {
        if(formSelCategs.options[i].selected == true)
        {
            tabCategs[tabCategs.length] = formSelCategs.options[i].text;
        }
    }  

    let unFilm = {"title":$('#titre').val(),
    "year":$('#annee').val(),"runtime":$('#duree').val(),"genres":tabCategs,
    "plot":$('#desc').val(), "posterUrl":$('#pochette').val()};

    listeFilms.push(unFilm);
}





//Supprimer
function deleteBtn(elem){
    document.getElementById("delbtn").click();
    document.getElementById("finalDel").setAttribute("mov", elem.parentNode.parentNode.parentNode.id); // mov est Le id films 
    document.getElementById("finalDel").onclick = function(){
        document.getElementById(this.getAttribute("mov")).remove(); //finalDel est le id du modal 
        let Fid = parseInt(this.getAttribute("mov").replace("mov-", ''));
        listeFilms = listeFilms.filter(function(elem){
            if(elem.id == Fid){
                return false;
            }
            else{
                return true;
            }
        });
    }
}

//Modifier
function UpdateFilm(elem){
    document.getElementById("editbtn").click();
    let formSelCategs = document.getElementById('edit_formSelCategs');
    formSelCategs.length = 0;
    for(let unCateg of listeCategs){
        formSelCategs.options[formSelCategs.options.length]=new Option(unCateg,unCateg.substring(0,3));
    }
    let movi = document.getElementById(elem.parentNode.parentNode.parentNode.id);
    let movid = parseInt(elem.parentNode.parentNode.parentNode.id.replace("mov-", ''));
    let title = '';
    let year = '';
    let runtime = '';
    let plot = '';
    let posterUrl = '';
    let genre = [];
    let formtitre = document.getElementById("edit_titre");
    let formannee = document.getElementById("edit_annee");
    let formduree= document.getElementById("edit_duree");
    let formdesc = document.getElementById("edit_desc");
    let formpochette = document.getElementById("edit_pochette");

    //Formulaire de modification
    listeFilms.forEach(function(val){
        if(val.id == movid){
            title = val.title;
            year = val.year;
            runtime = val.runtime;
            plot = val.plot;
            posterUrl = val.posterUrl;
            val.genres.forEach((val)=>{
                genre.push(val);
            });
        }
    });

    formtitre.value = title;
    formannee.value = year;
    formduree.value = runtime;
    formdesc.value = plot;
    formpochette.value = posterUrl;
    let edit_formSelCategs = document.getElementById('edit_formSelCategs');
    for(var i=0; i<edit_formSelCategs.options.length; i++)
    {
        if(genre.includes(edit_formSelCategs.options[i].text))
        {
            edit_formSelCategs.options[i].selected = true;
        }
    }
    

    let Updatebtn = document.getElementById("Updatebtn");
    Updatebtn.setAttribute("mov", elem.parentNode.parentNode.parentNode.id);
    Updatebtn.onclick = function(){
        let Fid = parseInt(this.getAttribute("mov").replace("mov-", ''));
        let formtitre = document.getElementById("edit_titre").value;
        let formannee = document.getElementById("edit_annee").value;
        let formduree = document.getElementById("edit_duree").value;
        let formdesc = document.getElementById("edit_desc").value;
        let formpochette = document.getElementById("edit_pochette").value;
        var tabCategs = new Array();
        let formSelCategs = document.getElementById('edit_formSelCategs');
        for(var i=0; i<formSelCategs.options.length; i++)
        {
            if(formSelCategs.options[i].selected == true)
            {
                tabCategs[tabCategs.length] = formSelCategs.options[i].text;
            }
        }

        listeFilms.forEach(function(val){
            if(val.id == Fid){
                val.title = formtitre;
                val.year = formannee;
                val.runtime = formduree;
                val.plot = formdesc;
                val.posterUrl = formpochette;
                val.genres = [...tabCategs];

            }
        });
        
        let movi = document.getElementById(elem.parentNode.parentNode.parentNode.id);
        movi.querySelector(".card-title").innerText = formtitre;
        movi.querySelectorAll(".card-text")[0].innerText = "Année : " + formannee;
        movi.querySelectorAll(".card-text")[1].innerText = "Durée : " + formduree;
        movi.querySelectorAll(".card-text")[2].innerText = formdesc;
        movi.querySelector(".card-img-top").src = formpochette;    
    }
}