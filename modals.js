// Logique généraliste des modales + définition des balises <modal> et <close>

var actModal = null;

function openModal(id) {
    if(actModal){
        closeModal();
    }
    actModal = document.querySelector("modal#"+id);
    actModal.style.display = 'block';
}

function closeModal() {
    if(actModal){
        actModal.style.display = 'none';
        actModal = null;
    }
}

const close_buttons = document.querySelectorAll('close');
close_buttons.forEach((button) => {
    button.onclick = closeModal;
});

window.onclick = function(event) {
    if (event.target == actModal) {
        closeModal();
    }
}