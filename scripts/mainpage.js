function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            user_Name = user.displayName;
            var docref = db.collection("users").doc(user.uid);
            var yourIncome = null;
            docref.get().then(function (doc) {
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

function getTopGoals(user,n) {
    let count = 0;
    let CardTemplate = document.getElementById("CardTemplate");
    db.collection("Goals").where("userID", "==", user).get().then((allGoals) => {
        let newCard = CardTemplate.content.cloneNode(true);
        newCard.querySelector('.card-name').innerHTML = "<h3>Goal name</h3>";
        newCard.querySelector('.card-deadline').innerHTML = "<h3>Deadline</h3>";
        newCard.querySelector('.card-amount').innerHTML = "<h3>Goal amount</h3>";
        document.getElementById('goalCard').appendChild(newCard);

        allGoals.forEach((doc) => {
            if (count<n) {
                var name = doc.data().validationName; //gets the name field
                var amount = doc.data().validationAmount; //gets the amount field
                var amount_f=new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CAD' }).format(amount);
                var deadline = doc.data().validationDeadline; //gets the deadline field
                newCard = CardTemplate.content.cloneNode(true);
                newCard.querySelector('.card-name').innerHTML = name;
                newCard.querySelector('.card-deadline').innerHTML = deadline;
                newCard.querySelector('.card-amount').innerHTML = amount_f;
                document.getElementById('goalCard').appendChild(newCard);
            count++;
        }
                
        });
    });
}
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        insertName();
        getTopGoals(user.uid,3);
    } else {
        window.location.href = "thanks.html";
        console.log("No user is signed in");
    }
});