//lytter efter click
// document.getElementById('theme-toggle').addEventListener('click', function () {
// 	//henter attribute data-Theme
// 	const currentTheme = document.documentElement.getAttribute('data-theme');
// 	// tjekker hvis det er dark så skal det var ligth og omvent
// 	const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
// 	//sætter det nye theme udfra overstående
// 	document.documentElement.setAttribute('data-theme', newTheme);

// 	// Gem det valgte tema i localStorage, så det huskes
// 	localStorage.setItem('theme', newTheme);
// });

// Tjek ved load hvilket tema brugeren sidst valgte
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
