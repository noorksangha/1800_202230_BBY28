function incomeHandler() {
  console.log("bruh");
  if (document.getElementById("hourly-income").checked) {
    document.getElementById("exampleFormControlInput1").disabled = false;
    document.getElementById("exampleFormControlInput2").disabled = false;
  } else {
    document.getElementById("exampleFormControlInput1").disabled = true;
    document.getElementById("exampleFormControlInput2").disabled = true;
  }
}

function writeIncome() {
  console.log("in");
  var income2 = document.getElementById("incomeAmount").value;
  let type = "monthly";
  if (document.getElementById("hourly-income").checked) {
    var days = document.getElementById("exampleFormControlInput2").value;
    var hours = document.getElementById("exampleFormControlInput1").value;
    income2 = income2 * hours * days;
  }
  if (document.getElementById("monthly-income").checked) {
    type = "monthly";
  }
  if (document.getElementById("yearly-income").checked) {
    income2 = income2 * 12;
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid);
      //var currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      db.collection("users")
        .doc(user.uid)
        .update({
          income: income2
        }).then(()=>(window.location.href = "mainpage.html"));
        console.log("added");
        //.then(()=>(window.location.href = "mainpage.html"));
    } else {
      //No user is signed in.
    }
  });
}
