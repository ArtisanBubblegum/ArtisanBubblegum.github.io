var coll = document.getElementsByClassName("collapsible");
var collUP = document.getElementsByClassName("collapsibleUP")
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
      this.textContent = "Expand"
    } else {
      content.style.display = "block";
      this.textContent = "Collapse"
    }
  });
}

for (i = 0; i < collUP.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.parentElement;
    if (content.style.display === "block") {
      content.style.display = "none";
      this.parentElement.previousElementSibling.textContent = "Expand"
    } else {
      content.style.display = "block";
      this.parentElement.previousElementSibling.textContent = "Collapse"
    }
  });
}