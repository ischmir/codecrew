function setColormode(newTheme) {
	document.documentElement.setAttribute('data-theme', newTheme);
	// Gem det valgte tema i localStorage, så det huskes
	localStorage.setItem('theme', newTheme);
}
