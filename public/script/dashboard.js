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
//let btnMobile = document.getElementById("create_stack_button_mobile");
let span = document.getElementsByClassName("create_stack_model_close")[0];

btn.addEventListener("click", () => {
  modal.style.display = "block";
});

// btnMobile.addEventListener("click", () => {
//   modal.style.display = "block";
//   openMobileNav()
// });

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
}

// Stop Stack

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelector(".uil-stop-circle");

  buttons.addEventListener("click", (event) => {
    const accordionRow = event.target.closest(".accordion");
    const stackId = accordionRow.getAttribute("data-id");

    if (stackId) {
      console.log(`Stopping stack with ID: ${stackId}`);
      stopStack(stackId);
    }
  });
});

// Start Stack

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelector(".uil-play-circle");

  buttons.addEventListener("click", (event) => {
      const accordionRow = event.target.closest(".accordion");
      const stackId = accordionRow.getAttribute("data-id");

      if (stackId) {
          console.log(`Starting stack with ID: ${stackId}`);
          stopStack(stackId);
      }
  });
});

  // Restart Stack

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelector(".uil-redo");

  buttons.addEventListener("click", (event) => {
      const accordionRow = event.target.closest(".accordion");
      const stackId = accordionRow.getAttribute("data-id");

      if (stackId) {
          console.log(`Stopping stack with ID: ${stackId}`);
          stopStack(stackId);
      } else if (stackId) {
        console.log(`starting stack with ID: ${stackId}`);
        startStack(stackId);
      }
  });
});

// dynamic search input
document.querySelector('#searchInput').addEventListener('input', function (event) {
  const searchTerm = event.target.value.toLowerCase();
  const listItems = document.querySelectorAll('.accordion');

      listItems.forEach(function (item) {
          const nameElement = item.querySelector('.stack_info_name');
          const itemText = nameElement.textContent.toLowerCase();

          if (itemText.includes(searchTerm)) {
              item.style.display = 'grid';
          } else {
              item.style.display = 'none';
          }
      });
  });