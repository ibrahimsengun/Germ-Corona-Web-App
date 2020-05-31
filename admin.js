var firebaseConfig = {
    apiKey: "AIzaSyDPt3Hwpnov7otuFy0qgM7Bh7IGrQHx36o",
    authDomain: "germ-webapp.firebaseapp.com",
    databaseURL: "https://germ-webapp.firebaseio.com",
    projectId: "germ-webapp",
    storageBucket: "germ-webapp.appspot.com",
    messagingSenderId: "414895569093",
    appId: "1:414895569093:web:1bb04d260c2ee8b23318ac",
    measurementId: "G-N2K8T4F070"
};

firebase.initializeApp(firebaseConfig);
var months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

var db = firebase.firestore();

function numberWithDots(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function UpdateDaily(){
    var caseNumDailyT = document.getElementById("admin-case-num-daily-t");
    var deathNumDailyT = document.getElementById("admin-death-num-daily-t");
    var healNumDailyT = document.getElementById("admin-heal-num-daily-t");
    var testNumDailyT = document.getElementById("admin-test-num-daily-t");

    if(caseNumDailyT.value.length == 0 || deathNumDailyT.value.length == 0 || healNumDailyT.value.length == 0 || testNumDailyT.value.length == 0){
        document.getElementById("error-daily").style.display = "block";
        document.getElementById("error-daily").innerText = "Boş bırakmayınız";
    }
    else{
        document.getElementById("error-daily").style.display = "none";
        var date = new Date();
        var day = date.getDate();
        var year = date.getFullYear();
        var month = months[date.getMonth()];
    
        db.collection("Covid-19").doc("TurkeyDaily").set({
            caseNumDaily: numberWithDots(caseNumDailyT.value),
            deathNumDaily: numberWithDots(deathNumDailyT.value),
            healNumDaily: numberWithDots(healNumDailyT.value),
            testNumDaily: numberWithDots(testNumDailyT.value),
            date: day + " " + month + " " + year
        }).then(function() {
            console.log("Document successfully written! (Daily)");
        })
    
        db.collection("Covid-19").doc("TurkeyGeneral").update({
            newCases: numberWithDots(caseNumDailyT.value),
            newDeaths: numberWithDots(deathNumDailyT.value)
        }).then(function() {
            console.log("Document successfully written! (General)");
            document.getElementById("alert-daily").style.display = "block";
        })
    }
}

function UpdateGeneral(){
    var activeCasesT = document.getElementById("admin-active-cases-t");
    var criticalCasesT = document.getElementById("admin-critical-cases-t");
    var totalCasesT = document.getElementById("admin-case-num-total-t");
    var totalDeathsT = document.getElementById("admin-case-death-total-t");
    var totalHealsT = document.getElementById("admin-case-heal-total-t");

    if(activeCasesT.value.length == 0 || criticalCasesT.value.length == 0
         || totalCasesT.value.length == 0 || totalDeathsT.value.length == 0 || totalHealsT.value.length == 0){
        document.getElementById("error-general").style.display = "block";
        document.getElementById("error-general").innerText = "Boş bırakmayınız";
    }
    else{
        document.getElementById("error-general").style.display = "none";
        var date = new Date();
        var day = date.getDate();
        var year = date.getFullYear();
        var month = months[date.getMonth()];
    
        db.collection("Covid-19").doc("TurkeyGeneral").update({
            activeCases: numberWithDots(activeCasesT.value),
            criticalCases: numberWithDots(criticalCasesT.value),
            totalCases: numberWithDots(totalCasesT.value),
            totalDeaths: numberWithDots(totalDeathsT.value),
            totalHeals: numberWithDots(totalHealsT.value),
            date: day + " " + month + " " + year
        }).then(function() {
            console.log("Document successfully written!");
            document.getElementById("alert-general").style.display = "block";
        })
    }
}

function UpdateWorld(){
    var activeCasesW = document.getElementById("admin-active-cases-w");
    var criticalCasesW = document.getElementById("admin-critical-cases-w");
    var totalCasesW = document.getElementById("admin-case-num-total-w");
    var totalDeathsW = document.getElementById("admin-case-death-total-w");
    var totalHealsW = document.getElementById("admin-case-heal-total-w");
    var newCasesW = document.getElementById("admin-new-cases-w");
    var newDeathsW = document.getElementById("admin-new-deaths-w");

    if(activeCasesW.value.length == 0 || criticalCasesW.value.length == 0 || totalCasesW.value.length == 0 
        || totalDeathsW.value.length == 0 || totalHealsW.value.length == 0 || newCasesW.value.length == 0 || newDeathsW.value.length == 0){
       document.getElementById("error-world").style.display = "block";
       document.getElementById("error-world").innerText = "Boş bırakmayınız";
   }
   else{
        document.getElementById("error-world").style.display = "none";
        var date = new Date();
        var day = date.getDate();
        var year = date.getFullYear();
        var month = months[date.getMonth()];

        db.collection("Covid-19").doc("World").set({
            activeCases: numberWithDots(activeCasesW.value),
            criticalCases: numberWithDots(criticalCasesW.value),
            totalCases: numberWithDots(totalCasesW.value),
            totalDeaths: numberWithDots(totalDeathsW.value),
            totalHeals: numberWithDots(totalHealsW.value),
            newCases: numberWithDots(newCasesW.value),
            newDeaths: numberWithDots(newDeathsW.value),
            date: day + " " + month + " " + year
        }).then(function() {
            console.log("Document successfully written!");
            document.getElementById("alert-world").style.display = "block";
        })
        
        db.collection("Pandemics").doc("COVID-19").update({
            deatNum: numberWithDots(totalDeathsW.value)
        })
   }
}