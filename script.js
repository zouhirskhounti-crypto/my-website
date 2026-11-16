document.addEventListener('DOMContentLoaded', function () {
  const isLoggedIn = sessionStorage.getItem('porscheLoggedIn') === 'true';
  const requiresLogin = document.body.dataset.authRequired === 'true';
  const isLoginPage = document.body.dataset.loginPage === 'true';

  if (requiresLogin && !isLoggedIn) {
    window.location.replace('login.html');
    return;
  }

  if (requiresLogin) {
    document.body.classList.add('authenticated');
  }

  if (isLoginPage && isLoggedIn) {
    window.location.replace('index.html');
    return;
  }

  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      sessionStorage.setItem('porscheLoggedIn', 'true');
      window.location.replace('index.html');
    });
  }

  const logoutButton = document.querySelector('#logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      sessionStorage.removeItem('porscheLoggedIn');
    });
  }

  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
  });

  revealElements.forEach(el => observer.observe(el));

  const accountForm = document.querySelector('#create-account-form');
  if (accountForm) {
    accountForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = new FormData(accountForm);
      const fullName = formData.get('fullName')?.toString().trim();
      if (fullName) {
        localStorage.setItem('porscheAccountName', fullName);
      }
      window.location.href = 'account-created.html';
    });
  }

  const welcomeName = document.querySelector('.welcome-name');
  if (welcomeName) {
    const savedName = localStorage.getItem('porscheAccountName');
    if (savedName) {
      welcomeName.textContent = savedName;
    }
  }
});
