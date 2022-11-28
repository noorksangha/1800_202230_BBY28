function writeTransaction() {
    console.log("in")
    let Costname = document.getElementById("TName").value;
    let Time = document.getElementById("budget").value;
    let Cost = document.getElementById("cost").value;
    let Notes = document.getElementById("notes").value;
    console.log(GoalName, Deadline, Amount, Notes);



    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the docuement for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("Transactions").add({
                        userID: userID,
                        TName: TName,
                        budget: budget,
                        Cost: Cost,
                        Notes: notes,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "thanks.html";
                    })

                })
        } else {
            //No user is signed in.
        }
    });
}