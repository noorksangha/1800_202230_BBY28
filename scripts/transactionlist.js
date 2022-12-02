
// Populate the transactions list page with transaction pulled from Firebase.
function tpopulate() {
    console.log("in")
    let translisttemplate = document.getElementById("translist-template");
    let translistgroup = document.getElementById("trans-table");

    //Check for user.
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID2 = user.uid;
            var docref = db.collection("Transactions");
            let numberid = 0;
            docref.get().then(allTrans => {
                allTrans.forEach(doc => {
                    // Add data into transaction list
                    // If userID match add the item for that user to the list.
                    if (doc.data().userID == userID2){
                        numberid++;         
                        var tName = doc.data().TName;
                        var spending = doc.data().cost;
                        var tdeadline = doc.data().deadline;
                        let translist = translisttemplate.content.cloneNode(true);
                        translist.querySelector('.trans-row').innerHTML = numberid;
                        translist.querySelector('.Name').innerHTML = tName;
                        translist.querySelector('.trans-cost').innerHTML = spending;
                        translist.querySelector('.trans-date').innerHTML = tdeadline;
                        translistgroup.appendChild(translist);
                    }
                });
            });

        }
        else {
            // No user is signed in.
        }
    });

}
tpopulate();