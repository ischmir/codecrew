console.log('Script is running!');

function myFunction() {
	var element = document.body;
	element.classList.toggle('light-mode');
}

// const csvDropzone = document.getElementById('csv-dropzone');
// console.log(csvDropzone ? 'Dropzone found!' : 'Dropzone not found!');
// csvDropzone.addEventListener('dragover', function (event) {
// 	event.preventDefault();
// 	csvDropzone.classList.add('dragover');

// 	console.log('Dragover event triggered!');
// });
// csvDropzone.addEventListener('dragleave', function (event) {
// 	event.preventDefault();
// 	csvDropzone.classList.remove('dragover');

// 	console.log('Drop event triggered!');
// 	console.log('Files:', event.dataTransfer.files);
// });
// csvDropzone.addEventListener('drop', function (event) {
// 	event.preventDefault();
// 	csvDropzone.classList.remove('dragover');
// 	const csvFile = event.dataTransfer.files[0];
// 	if (csvFile && (csvFile.type === 'text/csv' || csvFile.name.endsWith('.csv'))) {
// 		alert('CSV file has been selected');
// 		handleCsvFile(csvFile);
// 	} else {
// 		alert('Please drop a CSV file.');
// 	}
// });

// function handleCsvFile(file) {
// 	console.log(file.name);
// 	// Implement file handling logic here
// }
