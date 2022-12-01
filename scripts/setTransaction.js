function writeTransaction() {
    console.log("in")
    var GoalName = document.getElementById("TName").value;
    var Time = document.getElementById("budget").value;
    var cost = document.getElementById("cost").value;
    var notes = document.getElementById("notes").value;
    console.log(GoalName, cost, notes);



    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the docuement for current user.
            currentUser.get()
                .then(userDoc => {
                    console.log("added");
                    db.collection("Transactions").doc(userID).set({
                        userID: userID,
                        TName: GoalName,
                        Cost: cost,
                        Notes: notes,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "thanks.html";
                    });

                });
        } else {
            //No user is signed in.
        }
    });
}