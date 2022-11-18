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
            docref.get().then(function (doc) {
                console.log(doc.data().income);
                yourIncome = doc.data().income;
                $("#incomeMain").text("Monthly Budget: $" + yourIncome);
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
    let CardTemplate = document.getElementById("CardTemplate");
    db.collection("Goals").where("userID", "==", user).get().then((allGoals) => {
        allGoals.forEach((doc) => {
            console.log(user);
            var name = doc.data().validationName; //gets the name field
            var amount = doc.data().validationAmount; //gets the amount field
            var deadline = doc.data().validationDeadline; //gets the deadline field
            let newCard = CardTemplate.content.cloneNode(true);
            newCard.querySelector('.card-name').innerHTML = name;
            newCard.querySelector('.card-deadline').innerHTML = deadline;
            newCard.querySelector('.card-amount').innerHTML = amount;
            document.getElementById('hikeCardGroup').appendChild(newCard);
        });
});
}
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log(user.uid);
        insertName();
        getBookmarks(user.uid);
    } else {
        window.location.href = "thanks.html";
        console.log("No user is signed in");
    }
});