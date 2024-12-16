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


/////////////////////////////////////////////
// Stop Stack

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelector(".uil-stop-circle");

  buttons.addEventListener("click", (event) => {
    const accordionRow = event.target.closest(".accordion");
    const stackId = accordionRow.getAttribute("value");

    if (stackId) {
      console.log(`Stopping stack with ID: ${stackId}`);
    }
  });
});

/////////////////////////////////////////////
// Start Stack

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelector(".uil-play-circle");
  if(buttons) {
    buttons.addEventListener("click", (event) => {
        const accordionRow = event.target.closest(".accordion");
        const stackId = accordionRow.getAttribute("value");

        if (stackId) {
            console.log(`Starting stack with ID: ${stackId}`);
        }
    });
  }
});

/////////////////////////////////////////////
  // Restart Stack

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelector(".uil-redo");

  buttons.addEventListener("click", (event) => {
      const accordionRow = event.target.closest(".accordion");
      const stackId = accordionRow.getAttribute("value");

      if (stackId) {
          console.log(`Stopping stack with ID: ${stackId}`);
          stopStack(stackId);
      } else if (stackId) {
        console.log(`starting stack with ID: ${stackId}`);
      }
  });
});

/////////////////////////////////////////////
// Delete Stack



    // // Get the modal
    // var deleteModal = document.getElementById("confirmDeleteModal");

    // // Function to show the modal
    // function popUpForm() {
    //     modal.style.display = "block";
    // }

    // // Function to close the modal
    // function closeModal() {
    //     modal.style.display = "none";
    // }

    // // Close the modal if the user clicks anywhere outside of the modal
    // window.onclick = function(event) {
    //     if (event.target == modal) {
    //         closeModal();
    //     }
    // }

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelector(".uil-trash-alt");
  if(buttons) {
    buttons.addEventListener("click", (event) => {
        const accordionRow = event.target.closest(".accordion");
        const stackId = accordionRow.getAttribute("value");

        if (stackId) {
            console.log(`Delete stack with ID: ${stackId}`);
        }
    });
  }
});

/////////////////////////////////////////////
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

/////////////////////////////////////////////
// sorting 

const accordionsArray = Array.from(document.querySelectorAll(".accordion"));
let isNameAscending = true; // which order asc/desc. stack name
let isAuthorAscending = true; // which order asc/desc. author of stack
let isDateAscending = true; // which order asc/desc. creationDate of stack

// SORTS ON STACK NAME
document.querySelector(".list_info_name").addEventListener("click", () => {
    accordionsArray.sort((a, b) => {
        const nameA = a.querySelector('.stack_info_name').textContent.trim().toLowerCase();
        const nameB = b.querySelector('.stack_info_name').textContent.trim().toLowerCase();

        return isNameAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA); // Toggle order. localeCompare compares strings alphabetically
    });

    const parentNode = accordionsArray[0].parentNode;
    accordionsArray.forEach(button => {
        parentNode.appendChild(button); 
    });

    // Toggle the sort order for the next click
    isNameAscending = !isNameAscending;
});

// SORTS ON AUTHOR
document.querySelector(".list_info_author").addEventListener("click", () => { 
  accordionsArray.sort((a, b) => {
      const nameA = a.querySelector('.stack_info_author').textContent.trim().toLowerCase();
      const nameB = b.querySelector('.stack_info_author').textContent.trim().toLowerCase();

      return isAuthorAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA); // Toggle order. localeCompare compares alphabetically
  });

  const parentNode = accordionsArray[0].parentNode;
  accordionsArray.forEach(button => {
      parentNode.appendChild(button);
  });

  // Toggle the sort order for the next click
  isAuthorAscending = !isAuthorAscending;
});

function convertDateForComparison(input) {
  const [date, time] = input.split(' ');
  const [day, month, year] = date.split('-');

  // Create a new date string in the format YYYY-MM-DDTHH:mm:ss
  const formattedDateString = `${year}-${month}-${day}T${time}`;

  return new Date(formattedDateString).getTime();
}

// SORTS ON CREATION DATE
document.querySelector(".list_info_creation_date").addEventListener("click", () => {   
  accordionsArray.sort((a, b) => {
      const dateA = convertDateForComparison(a.querySelector('.stack_info_creation_date').textContent.trim());
      const dateB = convertDateForComparison(b.querySelector('.stack_info_creation_date').textContent.trim());

      return isDateAscending ? dateA - dateB : dateB - dateA; // Toggle order
  });

  const parentNode = accordionsArray[0].parentNode;
  accordionsArray.forEach(button => {
      parentNode.appendChild(button);
  });

  // Toggle the sort order for the next click
  isDateAscending = !isDateAscending;
});

////////////////
// end of sorting

///////////////
// filter
let superAdminRows = document.querySelectorAll("[data-role='superAdmin']"); // ryder op senere. 

// Hide superAdmin rows initially
superAdminRows.forEach((k) => {
    k.style.display = "none";
});

// Function to update odd/even styling for visible accordions
function updateOddEvenStyling() {
    const visibleAccordions = Array.from(document.querySelectorAll(".accordion")).filter(
        (el) => el.style.display !== "none"
    );

    visibleAccordions.forEach((el, index) => {
        // Clear previous odd/even styles
        el.classList.remove("odd", "even");
        // Apply new odd/even styles
        el.classList.add(index % 2 === 0 ? "odd" : "even");
    });
}

// Sort "Other Projects" click event
document.getElementById("sort_other_projects").addEventListener("click", () => {
    document.querySelectorAll(".accordion, .panel").forEach((j) => {
        if (j.style.display !== "none") {
            if (j.classList.contains("accordion")) j.classList.replace("accordion", "accordionRemoved");
            if (j.classList.contains("panel")) j.classList.replace("panel", "panelRemoved");
            j.style.display = "none";
        }
    });

    superAdminRows.forEach((k) => {
        if (k.dataset.role === "superAdmin") k.style.display = "grid";
    });

    // Update styles after visibility changes
    updateOddEvenStyling();
});

// Sort "My Projects" click event
document.getElementById("sort_my_projects").addEventListener("click", () => {
    document.querySelectorAll(".accordionRemoved, .panelRemoved").forEach((j) => {
        if (j.classList.contains("accordionRemoved")) j.classList.replace("accordionRemoved", "accordion");
        if (j.classList.contains("panelRemoved")) j.classList.replace("panelRemoved", "panel");

        if (j.tagName === "BUTTON") {
            j.style.display = "grid";
        } else {
            j.style.display = "block";
        }
    });

    superAdminRows.forEach((k) => {
        k.style.display = "none";
    });

    // Update styles after visibility changes
    updateOddEvenStyling();
});

// Initial odd/even update
updateOddEvenStyling();
