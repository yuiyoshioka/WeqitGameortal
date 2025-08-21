const btnMain = document.getElementById("btnMain");
const modal = document.getElementById("loginModal");

btnMain.addEventListener("click", () => {
  console.log("Login button clicked!");
  modal.style.display = "flex";
});

window.closeModal = () => modal.style.display = "none";
