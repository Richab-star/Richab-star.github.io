function clique()
{
   document.getElementById("zoneTexte").innerHTML = "";
   document.getElementById("visu1").innerHTML = "";
   document.getElementById("visu2").innerHTML = "";
   document.getElementById("visu3").innerHTML = "";
   $.get("prenoms.json", function(objetJs){mesCalculs(objetJs);});
}


function httprequest(url) {
   // Permet de faire une requête HTTP
   var req = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

   // On essaye si le fichier "existe", on le récupère
   try {
       req.open("get", url, false);
       req.send(null);
   } catch (e) {
       // Sinon on arrête la fonction
       console.log(url + " ne peut pas être récupéré.");
       return;
   }
  
   return req.responseText;

}


function mesCalculs(myJson)
{
   const prenom = document.getElementById("nom").value;
   const age = document.getElementById("age").value;
   const tailleJson = myJson.length;
   var garconAnnee = [];
   var garconNombre = [];
   var filleAnnee = [];
   var filleNombre = [];
   var resultat;
   
   if ( prenom == "" || age === ""){
      document.getElementById("visu1").innerHTML = 
      "Entrez vos données !!";
      return
   } else {
      document.getElementById("visu1").innerHTML = 
      "Fréquence de ce prénom au cours des années :"
   };

   for (var i=0; i<313346; i++)
  {
     if (myJson[i].preusuel == prenom.toUpperCase())
      {
         if (myJson[i].annais != "XXXX")
            {  garconAnnee.push(myJson[i].annais);
               garconNombre.push(myJson[i].nombre);
            }
            else {break ;}
      };
  }
   
  for (var j=313347; j<tailleJson; j++)
  {
      if (myJson[j].preusuel == prenom.toUpperCase())
      {
         if (myJson[j].annais != "XXXX")
            {  filleAnnee.push(myJson[j].annais);
               filleNombre.push(myJson[j].nombre);
            }
            else {break ;}
      };
   }
     
  if (garconAnnee.length == 0 && filleAnnee == 0)
   {
      resultat = "Aucune naissance avec le prénom "+prenom+" en France depuis 1900 !";
      document.getElementById("zoneTexte").innerHTML = resultat;
   };

   var trace1 = {
      x: garconAnnee,
      y: garconNombre,
      name: 'Garçons',
      type: 'scatter'
   };
   var trace2 = {
      x: filleAnnee,
      y: filleNombre,
      name: 'Filles',
      type: 'scatter'
   };
   var data = [trace1, trace2];
   var layout = {
      title: {
        text:"Le prénom " + prenom,
        font: {
          family: 'Arial',
          size: 28
         },
        xref: 'paper',
        x: 0.05,
      },
      xaxis: {
        title: {
          text: 'ANNEES',
          font: {
            family: 'Arial',
            size: 18,
            color: '#7f7f7f'
           }
         },
      },
      yaxis: {
        title: {
          text: 'NOMBRE',
          font: {
            family: 'Arial',
            size: 18,
            color: '#7f7f7f'
           }
         }
      }
   };
   
   Plotly.newPlot('monGraphe', data, layout);

   
   var notredate = new Date();
   var cette_annee = notredate.getFullYear();
   const naissance = parseInt(cette_annee) - parseInt(age);

   // Recherche Nbr garcon/filles avec ce prenom cette année :
   var nbrNomGa;
   var nbrNomFi;
   var index;
   var resultat;
   index = garconAnnee.indexOf(naissance);
   if(index < 0){nbrNomGa = 0}
   else{nbrNomGa = garconNombre[index]};
   index = filleAnnee.indexOf(naissance);
   if(index < 0){nbrNomFi = 0}
   else{nbrNomFi = filleNombre[index]};
   resultat = "En " + naissance + " , l'année de votre naissance, ";
   resultat += nbrNomGa + " garçons et " + nbrNomFi + " filles ";
   resultat += "avaient reçu le prénom " + prenom + " en France.";
   $("#visu2").append(
      resultat).
      css("color", "blue").
      css("font-size", "16px"
   );

   // Recherche noms garcons et filles les plus fréquents de l'année :
   var maxNomGa = 0;
   var maxNomFi = 0;
   var nomMaxGa = "";
   var nomMaxFi = "";
   var resultat2 = "";
   for (var i=0; i<313346; i++){
      if(myJson[i].annais == naissance && myJson[i].nombre > maxNomGa){
         maxNomGa = myJson[i].nombre;
         nomMaxGa = myJson[i].preusuel;
      };
   }
   for (var j=313347; j<tailleJson; j++){
      if(myJson[j].annais == naissance && myJson[j].nombre > maxNomFi){
         maxNomFi = myJson[j].nombre;
         nomMaxFi = myJson[j].preusuel;
      };
   }
   resultat2 += "Mais le prenom de garçon le plus fréquent cette année là ";
   resultat2 += "était " + nomMaxGa + " , et le plus fréquent chez les filles ";
   resultat2 += "était " + nomMaxFi + ".";
   $("#visu2").append("\n" + resultat2);

   // Recherche des évènements de l'année de naissance :
   var mesEvenements = httprequest("https://raw.githubusercontent.com/Richab-star/Richab-star.github.io/main/prenom/evenements.txt");
   
   var lines = mesEvenements.split("\n");
   var numeroLignes = naissance - 1900;
   var maLigne = lines[numeroLignes];
   console.log(maLigne);
   $("#visu3").text(
      "Voici des évènements de " + naissance + " , l'année de votre naissance :").
      css("color", "red").
      css("font-size", "24px"
   );
   $("#zoneTexte").append(maLigne); 
   
}
