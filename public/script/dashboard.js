// Toggle Accordion

var acc = document.getElementsByClassName("accordion");

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

// toggle Actions

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

const sortingBtns = document.querySelectorAll(".sort");

sortingBtns.forEach((btn) => {
  btn.addEventListener("click", (i) => {
    sortingBtns.forEach(f => f.classList.remove('highlight'));
    i.target.classList.toggle("highlight");
  });
});

let modal = document.getElementById("create_stack_modal");
let btn = document.getElementById("create_stack_button");
let span = document.getElementsByClassName("create_stack_model_close")[0];

btn.addEventListener("click", () => {
  modal.style.display = "block";
});

span.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

const form = document.getElementById ("create_stack_form");

form.addEventListener("submit"), async (e) => {
  e.preventDefault();
}

const stackName = document.getElementById ("create_stack_name");
const stackDomain = document.getElementById ("create_stack_domain");

try {
  const response = await axios.post("https://portainer.kubelab.dk/api", {stackName}); //hvilken url skal vi bruge her? den med vores endpoint til at finde stacken eller til url filecontent for at rette i det?
  console.log(response.data.message);
} catch (error) {
  console.error("Error creating stack", error.message);
}