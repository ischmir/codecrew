console.log('Hello :)');
// Tjek ved load hvilket tema brugeren sidst valgte
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
