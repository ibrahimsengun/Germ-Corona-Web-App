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

var caseNumDaily = document.getElementById("case_num_daily");
var testNumDaily = document.getElementById("test_num_daily");
var deathNumDaily = document.getElementById("death_num_daily");
var healNumDaily = document.getElementById("heal_num_daily");
var date = document.getElementById("date");

var db = firebase.firestore();

var docRef = db.collection("Covid-19").doc("TurkeyDaily");

docRef.get().then(function(doc) {
    if (doc.exists) {
        caseNumDaily.innerText = doc.data().caseNumDaily;
        testNumDaily.innerText = doc.data().testNumDaily;
        deathNumDaily.innerText = doc.data().deathNumDaily;
        healNumDaily.innerText = doc.data().healNumDaily;
        date.innerText = doc.data().date;
    } else {
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


var totalCaseTurkey = document.getElementById("total_case_turkey");
var newCaseTurkey = document.getElementById("new_case_turkey");
var totalDeathTurkey = document.getElementById("total_death_turkey");
var newDeathTurkey = document.getElementById("new_death_turkey");
var totalHealTurkey = document.getElementById("total_heal_turkey");
var criticalCaseTurkey = document.getElementById("critical_case_turkey");
var activeCaseTurkey = document.getElementById("active_case_turkey");
var dateGeneral = document.getElementById("date_general");

var docRef = db.collection("Covid-19").doc("TurkeyGeneral");

docRef.get().then(function(doc) {
    if (doc.exists) {
        totalCaseTurkey.innerText = doc.data().totalCases;
        newCaseTurkey.innerText = doc.data().newCases;
        totalDeathTurkey.innerText = doc.data().totalDeaths;
        newDeathTurkey.innerText = doc.data().newDeaths;
        totalHealTurkey.innerText = doc.data().totalHeals;
        criticalCaseTurkey.innerText = doc.data().criticalCases;
        activeCaseTurkey.innerText = doc.data().activeCases;
        dateGeneral.innerText = doc.data().date;
    } else {
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

var totalCaseWorld = document.getElementById("total_case_world");
var newCaseWorld = document.getElementById("new_case_world");
var totalDeathWorld = document.getElementById("total_death_world");
var newDeathWorld = document.getElementById("new_death_world");
var totalHealWorld = document.getElementById("total_heal_world");
var criticalCaseWorld = document.getElementById("critical_case_world");
var activeCaseWorld = document.getElementById("active_case_world");

var docRef = db.collection("Covid-19").doc("World");

docRef.get().then(function(doc) {
    if (doc.exists) {
        totalCaseWorld.innerText = doc.data().totalCases;
        newCaseWorld.innerText = doc.data().newCases;
        totalDeathWorld.innerText = doc.data().totalDeaths;
        newDeathWorld.innerText = doc.data().newDeaths;
        totalHealWorld.innerText = doc.data().totalHeals;
        criticalCaseWorld.innerText = doc.data().criticalCases;
        activeCaseWorld.innerText = doc.data().activeCases;
    } else {
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

var covidInfo = document.getElementById("covid_info");

db.collection("Pandemics").doc("COVID-19").get().then(function(doc) {
    if(doc.exists){
        var card = '<div class="col-12">'+
        '<div class="card text-center mt-3 bg-main-light">'+
        '<div class="card-header"><h2 class="card-title">' + doc.data().name + '</h2>' +
        '<h5 class="card-subtitle mb-2">' + doc.data().date + '</h5>' +
        '<h6 class="card-subtitle mb-2 text-light">Türü: ' + doc.data().type + '</h6>' +'</div>'+
        '<div class="card-body">'+
        '<p class="card-text">'+ doc.data().desc +'</p>'+
        '</div>'+
        '<div class="card-footer"><h1>' + doc.data().deatNum + '</h1></div>' +
        '</div></div>';
    
    covidInfo.innerHTML += card;
    }
});

var container = document.getElementById("container");

db.collection("Pandemics").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        var card = '<div class="col-12">'+
            '<div class="card text-center mt-3 bg-main-light">'+
            '<div class="card-header"><h2 class="card-title">' + doc.data().name + '</h2>' +
            '<h5 class="card-subtitle mb-2">' + doc.data().date + '</h5>' +
            '<h6 class="card-subtitle mb-2 text-light">Türü: ' + doc.data().type + '</h6>' +'</div>'+
            '<div class="card-body">'+
            '<p class="card-text">'+ doc.data().desc +'</p>'+
            '</div>'+
            '<div class="card-footer"><h1>' + doc.data().deatNum + '</h1></div>' +
            '</div></div>';
        
        container.innerHTML += card;
    });
});

function adminLogin(){
    console.log("Console Log: " + document.getElementById("admin_username").value);
    db.collection("Admins").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if(document.getElementById("admin_username").value == doc.data().username && document.getElementById("admin_pass").value == doc.data().password){
                location.href = "admin.html";   
            }
            else{
                console.log("Yanlış");
                document.getElementById("alert-admin").style.display = "block";
            }
        });
    });
}