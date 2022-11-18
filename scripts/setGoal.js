function writeGoal() {
    console.log("in")
    let GoalName = document.getElementById("validationName").value;
    let Deadline = document.getElementById("validationDeadline").value;
    let Amount = document.getElementById("validationAmount").value;
    let Notes = document.getElementById("validationDefault03").value;
    console.log(GoalName, Deadline, Amount, Notes);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);
            db.collection("Goals").add({
                userID: userID,
                validationName: GoalName,
                validationDeadline: Deadline,
                validationAmount: Amount,
                validationDefault03: Notes,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                window.location.href = "thanks.html";
            })
            // })
        } else {
            //No user is signed in.
        }
    });
}
