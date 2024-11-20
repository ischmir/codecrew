const fileInput = document.getElementById('csvFile');
fileInput.addEventListener('change', function () {
	const file = fileInput.files[0];
	if (file && file.type === 'text/csv') {
		alert('CSV file has been selected: ' + file.name);
		handleCsvFile(file);
	} else {
		alert('Please select a CSV file.');
	}
});

function handleCsvFile(file) {
	console.log(file.name);
	// Implement file handling logic here
}
