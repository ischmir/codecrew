console.log('Script is running!');

document.querySelectorAll('.tab').forEach(tab => {
  // Hent alle tab-elementer
  tab.addEventListener('click', function () {
    // Når et tab-element bliver klikket, fjerner alle active-classes fra alle tab-elementer
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    // Tilføjer active-class til dette tab-element
    this.classList.add('active');
    // Tilføjer active-class til dette tab-element
  });
});
