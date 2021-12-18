import tabJourEnOrdre from "./utilitaire/gestion_temps.js";

const CLEAPI= "1bc025f55508e0b3ac098939dff896a6";
let resultatApi;
const temps=document.querySelector(".temps");
const temperature=document.querySelector(".temperature");
const localisation=document.querySelector(".localisation");
const heure=document.querySelectorAll(".heure-nom-prevision");
const valeur=document.querySelectorAll(".heure-prevision-valeur");
const nomjour=document.querySelectorAll(".jour-prevision-nom");
const tempjour=document.querySelectorAll(".jour-prevision-temps");
const logo=document.querySelector(".logo-meteo");
const chargement=document.querySelector("#load");

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition((pos)=>{
        // console.log(pos);
        let long=pos.coords.longitude;
        let lat=pos.coords.latitude;
        appelAPI(long,lat);
    }
    ,()=>{
        alert("Vous avez refusé la géolocalisation, vueillez l'activer sinon l'application ne poura pas fonctionner")
    }
    )

}

function appelAPI(long,lat){
    // console.log(long,lat);
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely
    &units=metric&lang=fr&appid=${CLEAPI}
    `)

    .then(res=>{
        //  console.log(res);
        return res.json()
    })

    .then(data=>{

        // console.log(data);
        resultatApi=data;
        temps.innerText=resultatApi.current.weather[0].description;
        temperature.innerText=`${Math.trunc(resultatApi.current.temp)}°`;
        localisation.innerText=resultatApi.timezone;
        let heureactuel=new Date().getHours();

        for (let index = 0; index < heure.length; index++) {
           let heureinc=heureactuel+index*3;
           if(heureinc> 24){
            heure[index].innerHTML=`${heureinc-24}H`;
           }else if(heureinc==24){
            heure[index].innerHTML=`00 H`;
           }else{
            heure[index].innerHTML=`${heureinc}H`;
           }
            
        }

        for (let i = 0; i < valeur.length; i++) {
           valeur[i].innerText=`${Math.trunc(resultatApi.hourly[i*3].temp)}°`
            
        }

        for (let j = 0; j < tabJourEnOrdre.length; j++) {
    
            nomjour[j].innerText=tabJourEnOrdre[j].slice(0,3);
        }
        
        for (let y = 0; y < 7; y++) {  
            tempjour[y].innerText=`${Math.trunc(resultatApi?.daily[y+1].temp.day)}°`;
            
        }

        chargement.classList.add("disparition");

        //logo
        if (heureactuel>= 6 && heureactuel<21){
            logo.src=`ressources/nuit/${resultatApi.current.weather[0].icon}.svg`

        }else{
            logo.src=`ressources/nuit/${resultatApi.current.weather[0].icon}.svg`
    }
    
    })

   

}


