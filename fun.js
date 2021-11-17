
var i = 0;

function myFunction() 
{
  if (i == 0)
  {
    document.getElementById("header1").innerHTML = "No, why? Why did you click that button?";
    i += 1;
  }
  else if (i == 1)
  {
    document.getElementById("header1").innerHTML = "Word Famous Artisan";
    i += -1;
  }
}

var inputData;

function changeColors() 
{
  inputData = document.getElementById("bagcolor").value;
  document.getElementById("body1").style.backgroundColor = inputData;
  document.getElementById("header1").style.color = document.getElementById("header1color").value;
}
