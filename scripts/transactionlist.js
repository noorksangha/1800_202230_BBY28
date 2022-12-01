function tpopulate() {
    console.log("in")
    let translisttemplate = document.getElementById("translist-template");
    let translistgroup = document.getElementById("trans-table");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID2 = user.uid;
            var docref = db.collection("Transactions");
            let numberid = 0;
            docref.get().then(allTrans => {
                allTrans.forEach(doc => {
                    
                    if (doc.data().userID == userID2){
                        numberid++;         
                        var tName = doc.data().TName;
                        var spending = doc.data().cost;
                        var tdeadline = doc.data().deadline;
                        let translist = translisttemplate.content.cloneNode(true);
                        console.log(spending);
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