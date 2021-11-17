
var i = 0;

function myFunction() {
  if (i == 0)
  {
    document.getElementById("demo").innerHTML = "No, why? Why did you click that button?";
    i += 1;
  }
  else if (i == 1)
  {
    document.getElementById("demo").innerHTML = "Word Famous Artisan";
    i += -1;
  }
}
