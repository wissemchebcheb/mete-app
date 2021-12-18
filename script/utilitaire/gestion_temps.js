const tableJourDeSemaine=["lundi", "mardi", "mercredi","jeudi","vendredi","samedi","dimanche"];
let aujourdhui=new Date();
let options={weekday:"long"};
let jouractuel=aujourdhui.toLocaleDateString("fr-FR",options);
// console.log(jouractuel);
// console.log(aujourdhui);
// jouractuel=jouractuel.charAt(0).toUpperCase()+jouractuel.slice(1); //resultat Vendredi
let tabJourEnOrdre=tableJourDeSemaine.slice(tableJourDeSemaine.indexOf(jouractuel)).concat(tableJourDeSemaine.slice(0,tableJourDeSemaine.indexOf(jouractuel)));
// console.log(tabJourEnOrdre);
export default tabJourEnOrdre;
