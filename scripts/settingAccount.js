//Enable input type if hourly income is enable
function incomeHandler() {
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
  // Calculate monthly budget based on type of income. 
  if (document.getElementById("hourly-income").checked) {
    //Get days and hours if income type is hourly
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
      // Check for user
      console.log(user.uid);
      // Add income information to firebase.
      db.collection("users")
        .doc(user.uid)
        .update({
          income: income2
          // Redirect to mainpage after inputing income.
        }).then(()=>(window.location.href = "mainpage.html"));
        console.log("added");
        //.then(()=>(window.location.href = "mainpage.html"));
    } else {
      //No user is signed in.
    }
  });
}
