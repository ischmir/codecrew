// Toggle Accordion

//var acc = document.getElementsByClassName("accordion");
function toggleActive(acc) {
    acc.classList.toggle("active");
    let panel = acc.nextElementSibling;
    console.log(panel);
    
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
}

// for (i = 0; i < acc.length; i++) {
//   acc[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     let panel = this.nextElementSibling;
//     if (panel.style.maxHeight) {
//       panel.style.maxHeight = null;
//     } else {
//       panel.style.maxHeight = panel.scrollHeight + "px";
//     } 
//   });
// }
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
let isAscending = true; // which order asc/desc. 

// SORTS 
function sortOn(sortBtn, sortContent) {
  document.querySelector(sortBtn).addEventListener("click", () => {
    const wrapper = document.querySelector(".dashboard_list");
    const content = Array.from(wrapper.children); // Get all content of the wrapper as an array, so we can sort on it.
                                                 // when using querySelectorAll() and a like, we get a nodeList, which we can't sort on.
  
    const pairs = [];
    for (let i = 1; i < content.length; i++) { // we start the loop on 1 instead of 0 becourse, we want to ignore the first child (.list_info)
        const accordion = content[i];
        const panel = content[i + 1];
  
        if (accordion.classList.contains("accordion") && panel.classList.contains("panel")) {
            pairs.push({ accordion, panel });
            i++;
        }
    }
  
    // Toggle the sort order for the next click
    isAscending = !isAscending;
  
    pairs.sort((a, b) => {
        const nameA = a.accordion.querySelector(sortContent).textContent.trim().toLowerCase();
        const nameB = b.accordion.querySelector(sortContent).textContent.trim().toLowerCase();
        return isAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
  
    pairs.forEach(({ accordion, panel }) => {
        wrapper.appendChild(accordion);
        wrapper.appendChild(panel);
    });
  });  
}
sortOn(".list_info_name", ".stack_info_name"); // sort on stack name
sortOn(".list_info_author", ".stack_info_author"); // sort on author


function convertDateForComparison(input) {
  const [date, time] = input.split(' ');
  const [day, month, year] = date.split('-');

  // Create a date string in the format YYYY-MM-DDTHH:mm:ss
  // so js Date can work with it.
  const formattedDateString = `${year}-${month}-${day}T${time}`;

  return new Date(formattedDateString).getTime();
}

// Sorts on creation date
document.querySelector(".list_info_creation_date").addEventListener("click", () => {
    const wrapper = document.querySelector(".dashboard_list");
    const content = Array.from(wrapper.children);

    
    const pairs = [];
    for (let i = 1; i < content.length; i++) { // we start the loop on 1 instead of 0 becourse, we want to ignore the first child (.list_info)
        const accordion = content[i];
        const panel = content[i + 1];

      if (accordion.classList.contains("accordion") && panel.classList.contains("panel")) {
          pairs.push({ accordion, panel });
          i++;
      }
    }

    isAscending = !isAscending;

    pairs.sort((a, b) => {
        const dateA = convertDateForComparison(
            a.accordion.querySelector(".stack_info_creation_date").textContent.trim());
        const dateB = convertDateForComparison(
            b.accordion.querySelector(".stack_info_creation_date").textContent.trim());
        return isAscending ? dateA - dateB : dateB - dateA;
    });

    pairs.forEach(({ accordion, panel }) => {
        wrapper.appendChild(accordion);
        wrapper.appendChild(panel);
    });
});


////////////////
// end of sorting

///////////////
// filter
let superAdminRows = document.querySelectorAll("[data-role='superAdmin']");
// TODO toggle active på filter

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

////////////////
// end of fliter