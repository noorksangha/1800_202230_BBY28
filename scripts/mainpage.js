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
insertName(); //run the function