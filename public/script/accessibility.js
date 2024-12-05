function setColormode(newTheme) {
	document.documentElement.setAttribute('data-theme', newTheme);
	// Gem det valgte tema i localStorage, så det huskes
	localStorage.setItem('theme', newTheme);
}

const btn = document.getElementById("advDyslexiaOptions_btn");

function highlightThemeBtn(btn) {
	let wrapper = document.querySelectorAll(".colorMode_btn");
	
	wrapper.forEach((k) => {		
		k.classList.remove("accessabilitybtn_selected");
	});
	btn.classList.add("accessabilitybtn_selected")
}
function highlightModeBtn(btn) {
	let wrapper = document.querySelectorAll(".fontFamilyMode_btn");
	
	wrapper.forEach((k) => {		
		k.classList.remove("accessabilitybtn_selected");
	});
	btn.classList.add("accessabilitybtn_selected")
}
function highlightFontSizeBtn(btn) {
	let wrapper = document.querySelectorAll(".fontSizeMode_btn");
	
	wrapper.forEach((k) => {		
		k.classList.remove("accessabilitybtn_selected");
	});
	btn.classList.add("accessabilitybtn_selected")
}

function presetLocalStorageSelected() {
	let colorWrapper = document.querySelectorAll(".colorMode_btn");
	colorWrapper.forEach((k) => {
		if(k.tagName == "DIV") {
			k.childNodes.forEach((j) => {
				if(j.textContent.toLowerCase() == localStorage.getItem("theme")) {
					k.classList.add("accessabilitybtn_selected");
				}
			})
			
		}
	});

	let modeWrapper = document.querySelectorAll(".fontFamilyMode_btn");
	let modeNameConvert = localStorage.getItem("dyslexia") == "true" ? "dyslexic" : "default";
	modeWrapper.forEach((k) => {
		if(k.tagName == "DIV") {
			k.childNodes.forEach((j) => {
				if(j.textContent.toLowerCase() == modeNameConvert) {
					k.classList.add("accessabilitybtn_selected");
				}
			})
		}
	});

	let fontSizeWrapper = document.querySelectorAll(".fontSizeMode_btn");
	fontSizeWrapper.forEach((k) => {
		if(k.tagName == "DIV") {
			k.childNodes.forEach((j) => {
				if(j.textContent.toLowerCase() == localStorage.getItem("fontSize")) {
					k.classList.add("accessabilitybtn_selected");
				}
				else if(localStorage.getItem("fontSize") == "medium") {
					if(j.textContent.toLowerCase() == "default") {
						k.classList.add("accessabilitybtn_selected");
					}
				}
			})
		}
	});
};
presetLocalStorageSelected()

function showAdvDyslexiaOptions() {
	let wrapper = document.querySelector(".advDyslexiaOptions_Wrapper");
	
	if(wrapper.style.display == "none" || wrapper.style.display == "") {
		wrapper.style.display = "block"
		btn.innerHTML = "Close advanced options";
	}
	else {
		wrapper.style.display = "none";
		btn.innerHTML = "Show advanced options";
	}
}

function ChangeFontSize() {
	if(localStorage.getItem("fontSize")) {
		let fontSize = localStorage.getItem("fontSize");
		let lineHeight = localStorage.getItem("lineHeight");
		document.querySelectorAll("li, a, p, span").forEach((element) => {
			if (element.tagName === "SPAN" || element.tagName === "P") {
				element.style.fontSize = fontSize;
				element.style.lineHeight = lineHeight;
				body.style.fontSize = fontSize;
				body.style.lineHeight = lineHeight;
			}
		});
	}
}

function fontSizeChange(font) {
	let textContent = font.querySelector("span").textContent.toLowerCase();
	if(!textContent || textContent == "default") {
		textContent = "medium";
	}
	localStorage.setItem("fontSize", textContent)
	
	if(textContent == "small")
		localStorage.setItem("lineHeight", 1.4);
	if(textContent == "medium")
		localStorage.setItem("lineHeight", 1.5);
	if(textContent == "large") 
		localStorage.setItem("lineHeight", 1.6);

	ChangeFontSize()
}

function dyslexicMode() {
	localStorage.setItem("dyslexia", true);

	if(!body.classList.contains("dyslexia_mode"))
		body.classList.add("dyslexia_mode");
}
function defaultMode() {
	localStorage.setItem("dyslexia", false);
	if(body.classList.contains("dyslexia_mode"))
		body.classList.remove("dyslexia_mode");
}