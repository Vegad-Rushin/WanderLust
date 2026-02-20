document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("authModal");
    const openLogin = document.getElementById("openLogin");
    const openSignup = document.getElementById("openSignup");
    const closeBtn = document.getElementById("closeModal");
  
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
  
    const switchToSignup = document.getElementById("switchToSignup");
    const switchToLogin = document.getElementById("switchToLogin");
  
    function openModal() {
      modal.classList.add("active");
      document.body.classList.add("modal-open");
    }
  
    function closeModal() {
      modal.classList.remove("active");
      document.body.classList.remove("modal-open");
    }
  
    function showLogin() {
      loginForm.style.display = "block";
      signupForm.style.display = "none";
    }
  
    function showSignup() {
      loginForm.style.display = "none";
      signupForm.style.display = "block";
    }
  
    if (openLogin) {
      openLogin.addEventListener("click", function () {
        showLogin();
        openModal();
      });
    }
  
    if (openSignup) {
      openSignup.addEventListener("click", function () {
        showSignup();
        openModal();
      });
    }
  
    if (switchToSignup) {
      switchToSignup.addEventListener("click", showSignup);
    }
  
    if (switchToLogin) {
      switchToLogin.addEventListener("click", showLogin);
    }
  
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }
  
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          closeModal();
        }
      });
    }
  
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeModal();
      }
    });
  
  });
  