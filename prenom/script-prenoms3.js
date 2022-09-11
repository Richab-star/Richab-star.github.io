function clique()
{
   $.get("prenoms.json", function(objetJs){mesCalculs(objetJs);});
}


function mesCalculs(data)
{
   const prenom = document.getElementById("nom").value;
   const age = document.getElementById("age").value;
   var notredate = new Date()
   var cette_annee = notredate.getFullYear()
   const naissance = parseInt(cette_annee) - parseInt(age);
   const tailleJson = data.length;
   var genre = ["","garçons nommés","filles nommées"];
   var garconAnnee = [];
   var garconNombre = [];
   var filleAnnee = [];
   var filleNombre = [];

   for (var i=0; i<313346; i++)
  {
     if (data[i].preusuel == prenom.toUpperCase())
      {
         if (data[i].annais != "XXXX")
            {  garconAnnee.push(data[i].annais);
               garconNombre.push(data[i].nombre);
            }
            else {break ;}
      };
  }
   
  for (var j=313347; j<tailleJson; j++)
  {
      if (data[j].preusuel == prenom.toUpperCase())
      {
         if (data[j].annais != "XXXX")
            {  filleAnnee.push(data[j].annais);
               filleNombre.push(data[j].nombre);
            }
            else {break ;}
      };
   }
     
  if (garconAnnee.length == 0 && filleAnnee == 0)
   {
      var resultat = "Aucune naissance avec le prénom "+prenom+" en France depuis 1900 !";
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
          size: 24
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
}
