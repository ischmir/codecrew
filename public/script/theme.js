// console.log('Hello :)');

const savedTheme = localStorage.getItem('theme') || 'light';
// Tjek ved load hvilket tema brugeren sidst valgte
document.documentElement.setAttribute('data-theme', savedTheme);
// Sætter temaet til det brugeren sidst valgte
