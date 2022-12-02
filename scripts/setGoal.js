function writeGoal() {
    console.log("in")
    let GoalName = document.getElementById("validationName").value; //get GoalName from user's input
    let Deadline = document.getElementById("validationDeadline").value; //get Deadline from user's input
    let Amount = document.getElementById("validationAmount").value; //get Amount from user's input
    let Notes = document.getElementById("validationNotes").value; //get Notes from user's input

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID = user.uid; //get the user's id
            db.collection("Goals").add({
                userID: userID, 
                validationName: GoalName,
                validationDeadline: Deadline,
                validationAmount: Amount,
                validationNotes: Notes,
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
