let icon = {
    success:
    '<span class="material-symbols-outlined">Success</span>', // display type
    danger:
    '<span class="material-symbols-outlined">Error</span>', // display type
};

const showToast = (
    message = "Sample Message",
    toastType = "info",
    duration = 5000) => {
    if (
        !Object.keys(icon).includes(toastType))
        toastType = "info";

    let box = document.createElement("div");
    box.classList.add(
        "toast", `toast-${toastType}`);
    box.innerHTML = ` <div class="toast-content-wrapper">
                      <div class="toast-icon">
                      ${icon[toastType]}
                      </div>
                      <div class="toast-message">${message}</div>
                      <div class="toast-progress"></div>
                      </div>`;
    duration = duration || 5000;
    box.querySelector(".toast-progress").style.animationDuration =
            `${duration / 1000}s`;

    let toastAlready = 
        document.body.querySelector(".toast");
    if (toastAlready) {
        toastAlready.remove();
    }

    document.body.appendChild(box)
	};
    
	if (isCurrentPasswordCorrectType == "danger") {
		showToast(isCurrentPasswordCorrectText, "danger", 3500); //text, type(for the code), durationbar (NOT TOAST DURATION, that is in the css)
	} else if (isCurrentPasswordCorrectType == "success") {
		showToast(isCurrentPasswordCorrectText, "success", 3500); //text, type(for the code), durationbar (NOT TOAST DURATION, that is in the css)
	}
	wrongPassword = null;