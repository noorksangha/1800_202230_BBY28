function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid);
            console.log(user.displayName);
            user_Name = user.displayName;
            var docref = db.collection("users").doc(user.uid);
            var yourIncome = null;
            docref.get().then(function(doc){
                console.log(doc.data().income);
                yourIncome = doc.data().income;
                $("#incomeMain").text("Monthly Budget: $" + yourIncome );
            });

            //method #1:  insert with html only
            //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
            //method #2:  insert using jquery
            $("#name-goes-here").text(user_Name); //using jquery
            //$("#incomeMain").text(yourIncome);

        } else {
            // No user is signed in.
        }
    });
}
function getBookmarks(user) {
    db.collection("Goals").get().then(allGoals => {
        let CardTemplate = document.getElementById("CardTemplate");
        allGoals.forEach(allGoals => {
            console.log(user);
            db.collection("Goals").where("userID", "==", user).get().then(snap => {
                size = snap.size;
                queryData = snap.docs;
                if (size == 1) {
                    var doc = queryData[0].data();
                    var name = doc.validationName; //gets the name field
                    var amount = doc.validationAmount; //gets the unique ID field
                    var deadline = doc.validationDeadline; //gets the length field
                    let newCard = CardTemplate.content.cloneNode(true);
                    newCard.querySelector('.card-name').innerHTML = name;
                    newCard.querySelector('.card-deadline').innerHTML = deadline;
                    newCard.querySelector('.card-amount').innerHTML = amount;
                    hikeCardGroup.appendChild(newCard);
                } else {
                    console.log("Query has more than one data")
                }
            })
        });
     }
);
        
    
    
}
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log(user.uid);
        insertName();
        getBookmarks(user.uid);
        getBookmarks(user.uid);
    } else {
        window.location.href = "thanks.html";
        console.log("No user is signed in");
    }
});