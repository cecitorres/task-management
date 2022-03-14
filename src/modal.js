// MODAL FUNCTIONS
const modalbg = document.getElementById("modal-bg");
const modalSwitch = document.getElementById("modal-switch");
const modalBox = document.getElementById("modal-box");
const createTaskBtn = document.getElementById("createTask");

function showModal() {
  modalBox.classList.remove("hidden");
  modalbg.classList.remove("hidden");
}

function hideModal() {
  modalBox.classList.add("hidden");
  modalbg.classList.add("hidden");
}

function initModal() {
  modalbg.addEventListener("click", function () {
    hideModal();
  });
  
  modalSwitch.addEventListener("click", function () {
    showModal();
  });
}

export { initModal, showModal, hideModal };
