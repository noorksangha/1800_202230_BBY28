function getTransactions(user) {
    let TTemplate = document.getElementById("TTemplate");
    db.collection("Transactions").where("userID", "==", user).get().then((allTransactions) => {
        allTranasactions.forEach((doc) => {
            console.log(user);
            var transaction = doc.data().TName; //gets the name field
            var tdeadline = doc.data().deadline; //gets the amount field
            var tamount = doc.data().cost; //gets the deadline field
            let newCard = CardTemplate.content.cloneNode(true);
            newCard.querySelector('.card-TName').innerHTML = transaction;
            newCard.querySelector('.card-Tdeadline').innerHTML = tdeadline;
            newCard.querySelector('.card-Tcost').innerHTML = tamount;
            document.getElementById('TCardGroup').appendChild(newCard);
        });
});
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log(user.uid);
        getTransactions(user.uid);
    } else {
        window.location.href = "thanks.html";
        console.log("No user is signed in");
    }
});