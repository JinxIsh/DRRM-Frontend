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
  }