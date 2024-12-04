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
let btnMobile = document.getElementById("create_stack_button_mobile");
let span = document.getElementsByClassName("create_stack_model_close")[0];

btn.addEventListener("click", () => {
  modal.style.display = "block";
});

btnMobile.addEventListener("click", () => {
  modal.style.display = "block";
  openMobileNav()
});

span.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

function updatePreview() {
  const inputField = document.getElementById('create_stack_domain');
  const preview = document.getElementById('domain_preview');
  
  const inputValue = inputField.value.trim();
  preview.textContent = '.kubelab.dk';
  //inputValue ? `${inputValue}.kubelab.dk` : '.kubelab.dk';
}

// console.log(fName);

// const filteredData = {
//   ...data,
//   stack: data.stack.filter((item) => item.author == fName)
// };
// console.log(filteredData);    

const stacks = res.stack;
const statusElements = document.getElementsByClassName("stack_info_status");

stacks.forEach((stack, index) => {
    const status = reeeeee.stack.status[3];
    const element = statusElements[index];

    if (element) {
        if (status === 0) {
          if (status === 0) {
            element.innerHTML = "Offline";
        } else if (status === 1) {
            element.innerHTML = "Online";
        } else {
            console.error("Status error");
        }
}};
});