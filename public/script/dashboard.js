const acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = "fit-content";
    } 
  });
}



function myFunction(toggleIcon) {
  console.log(toggleIcon)
  if (toggleIcon.classList == "uil-play-circle") {
      toggleIcon.classList.remove("uil-play-circle")
      toggleIcon.classList.add("uil-stop-circle")
  } else {
      toggleIcon.classList.remove("uil-stop-circle")
      toggleIcon.classList.add("uil-play-circle")
  }
  
}



/*on click show stacks where author equals userName*/