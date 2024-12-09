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
			const formattedCSV = formatCSV(csvContent); // Formater CSV-indholdet
			document.getElementById('csv-textbox').value = formattedCSV; // Indsæt i tekstboksen
		};
		reader.readAsText(file); // Læs filen som tekst
	}
});

// Funktion til at formatere CSV til tekst, der kan vises
function formatCSV(csv) {
	// Split CSV-indholdet på linjer (hver linje repræsenterer en post)
	const lines = csv.split('\n');
	let formattedText = '';

	// Gennemgå hver linje og tilføj den til den formaterede tekst
	lines.forEach(function (line) {
		// Erstat kommaer med tabulatorer eller mellemrum (for nemmere læsning)
		const formattedLine = line.replace(/,/g, '\t');
		formattedText += formattedLine + '\n'; // Tilføj linjen til tekstboksen
	});

	return formattedText;
}
