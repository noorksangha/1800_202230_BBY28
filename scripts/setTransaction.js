function writeTransaction() {
    console.log("in")
    let TNAME = document.getElementById("TName").value;
    let Deadline = document.getElementById("deadline").value;
    let Cost = document.getElementById("Cost").value;
    let Notes = document.getElementById("notes").value;
    console.log(TNAME, Deadline, Cost, Notes);



    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the docuement for current user.
            currentUser.get()
                .then(userDoc => {
                    // Add data into database
                    db.collection("Transactions").add({
                        userID: userID,
                        TName: TNAME,
                        deadline: Deadline,
                        cost: Cost,
                        notes: Notes,
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