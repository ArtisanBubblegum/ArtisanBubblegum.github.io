
var i = 0;

function cookieStart()
{
  document.getElementById("body1").style.backgroundColor = getCookie("bagcolor");
  
  document.getElementById("header1").style.color = getCookie("header1color");
  document.getElementById("p1").style.color = getCookie("header1color");
  
  if(getCookie("threecolor") != "")
  {
    cubelist.forEach(colorChange)
    function colorChange(item)
    {
      item.mesh.material.color.setHex( "0x" + getCookie("threecolor").substring(1) );
    }
  }
  else
  {
    cube.material.color.setHex( "0x774659")
  }
  
  if(getCookie("threebool") == "false")
  {
    document.getElementById("threeddiv").style.display = "none";
  }
  else
  {
    document.cookie = "threebool="+document.getElementById("threebool").checked;
  }
}

function myFunction() 
{
  if (i == 0)
  {
    document.getElementById("header1").innerHTML = "No, why? Why did you click there?";
    i += 1;
  }
  else if (i == 1)
  {
    document.getElementById("header1").innerHTML = "Word Famous Artisan";
    i += 1;
  }
  else if (i == 2)
  {
    document.getElementById("header1").innerHTML = "Oof!";
    i += 1;
  }
  else if (i == 3)
  {
    document.getElementById("header1").innerHTML = "Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot! Riot!";
    i = 0;
  }
}

var inputData;

function changeCookies() 
{
  document.getElementById("body1").style.backgroundColor = document.getElementById("bagcolor").value;
  document.cookie = "bagcolor="+document.getElementById("bagcolor").value;
  
  document.getElementById("header1").style.color = document.getElementById("header1color").value;
  document.getElementById("p1").style.color = document.getElementById("header1color").value;
  document.cookie = "header1color="+document.getElementById("header1color").value;
  
  document.cookie = "threecolor="+document.getElementById("threecolor").value;
  cube.material.color.setHex( "0x"+getCookie("threecolor").substring(1));
  
  document.cookie = "threebool="+document.getElementById("threebool").checked;
  if(getCookie("threebool") == "false")
  {
    document.getElementById("threeddiv").style.display = "none";
  }
  else
  {
    document.getElementById("threeddiv").style.display = "block";
  }
}

function setCookie(cname,cvalue,exdays)
{
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


// Line Break

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
