function setColormode(newTheme) {
	document.documentElement.setAttribute('data-theme', newTheme);
	// Gem det valgte tema i localStorage, så det huskes
	localStorage.setItem('theme', newTheme);
}

let body = document.querySelector("body");
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
	let wrapper = document.querySelectorAll(".colorMode_btn");
	wrapper.forEach((k) => {
		console.log(k);
		
		if(k.tagName == "DIV") {
			console.log("boop");
			
		}
	});
	localStorage.getItem("theme")
}
presetLocalStorageSelected();

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
		}
		});
	}
}

function fontSizeChange(font) {
	let textContent = font.querySelector("span").textContent.toLowerCase();
	if(!textContent || textContent == "default") {
		textContent = "unset";
	}
	localStorage.setItem("fontSize", textContent)
	
	if(textContent == "small")
		localStorage.setItem("lineHeight", 1.4);
	if(textContent == "unset")
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