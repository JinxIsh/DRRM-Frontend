  function switchTab(tabName) {
    const requests = document.getElementById('requestsSection');
    const drafts = document.getElementById('draftsSection');
    const btnReq = document.getElementById('tabRequestsBtn');
    const btnDrf = document.getElementById('tabDraftsBtn');

    if (tabName === 'requests') {
      requests.classList.remove('d-none');
      drafts.classList.add('d-none');
      btnReq.classList.add('active');
      btnDrf.classList.remove('active');
    } else {
      requests.classList.add('d-none');
      drafts.classList.remove('d-none');
      btnDrf.classList.add('active');
      btnReq.classList.remove('active');
    }

    if (window.innerWidth < 768) {
      document.getElementById('sidebar').classList.remove('show');
    }
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('sidebarToggle');
    const toggleIcon = document.getElementById('toggleIcon');

    sidebar.classList.toggle('show');
    const isVisible = sidebar.classList.contains('show');
    toggleButton.setAttribute('aria-expanded', isVisible);
    toggleIcon.className = isVisible ? 'bi bi-x-lg' : 'bi bi-list';
  }

  function logoutUser() {
    alert("Logging out...");
    // Replace this with actual logout logic if needed
  }