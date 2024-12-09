console.log('Script is running!');

document.querySelectorAll('.tab').forEach(tab => {
	tab.addEventListener('click', function () {
		document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
		this.classList.add('active');
	});
});

// Når knappen (dropzone) bliver klikket, åbner fil-input
document.getElementById('csv-dropzone').addEventListener('click', function () {
	document.getElementById('csv-file-input').click();
});

// Når filen er valgt, læses den og vises i tekstboksen
document.getElementById('csv-file-input').addEventListener('change', function (event) {
	const file = event.target.files[0]; // Hent den valgte fil
	if (file) {
		const reader = new FileReader(); // FileReader til at læse filindhold
		reader.onload = function (e) {
			const csvContent = e.target.result; // CSV-indholdet
			document.getElementById('csv-textbox').value = csvContent; // Indsæt i tekstboksen
		};
		reader.readAsText(file); // Læs filen som tekst
	}
});
