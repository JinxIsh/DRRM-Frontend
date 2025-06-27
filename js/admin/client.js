let currentRequest = {};

function highlightText(text) {
  const term = document.getElementById('searchInput')?.value.toLowerCase() || '';
  if (!term) return text;
  const regex = new RegExp(`(${term})`, 'gi');
  return text.replace(regex, '<span class="custom-highlight">$1</span>');
}

function refreshClientTable() {
  const clientTable = document.getElementById("requestTable");
  clientTable.innerHTML = '';

  const clientRequests = JSON.parse(localStorage.getItem("clientRequests")) || [];
  const searchValue = document.getElementById('searchInput')?.value.toLowerCase() || '';

  clientRequests.forEach(request => {
    const match =
      request.name.toLowerCase().includes(searchValue) ||
      request.id.toLowerCase().includes(searchValue) ||
      request.studentNumber.toLowerCase().includes(searchValue) ||
      request.course.toLowerCase().includes(searchValue);

    if (match) {
      const row = document.createElement("tr");
      row.setAttribute("data-id", request.id);
      row.innerHTML = `
        <td>${highlightText(request.name)}</td>
        <td>${new Date().toISOString().split('T')[0]}</td>
        <td>
          <span class="badge ${request.validated ? 'bg-success' : 'bg-secondary'}">
            ${request.validated ? 'Paid' : 'Unpaid'}
          </span>
          <span class="badge ${request.forDelivery ? 'bg-info' : 'bg-warning text-dark'}">
            ${request.forDelivery ? 'For Delivery' : 'Pending Delivery'}
          </span>
          <span class="badge bg-light text-dark">${request.terminated ? 'Terminated' : 'Active'}</span>
        </td>
        <td>
          <button class="btn btn-primary btn-sm me-1" data-bs-toggle="modal" data-bs-target="#requestModal"
            onclick="openRequestModal(
              '${request.name}',
              '${request.id}',
              '${request.studentNumber}',
              '${request.documents}',
              '${request.lastSY}',
              '${request.course}',
              '${request.proofURL}',
              ${request.validated},
              ${request.forDelivery},
              ${request.terminated}
            )"
          >View</button>
          <button class="btn btn-outline-danger btn-sm" onclick="terminateRequest('${request.id}')">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      clientTable.appendChild(row);
    }
  });
}

function openRequestModal(name, id, studentNumber, documents, lastSY, course, proofURL, validated, forDelivery, terminated) {
  document.getElementById('modalName').textContent = name;
  document.getElementById('modalID').textContent = id;
  document.getElementById('modalStudentNumber').textContent = studentNumber;
  document.getElementById('modalDocuments').textContent = documents;
  document.getElementById('modalSY').textContent = lastSY;
  document.getElementById('modalCourse').textContent = course;
  document.getElementById('paymentProof').src = proofURL;

  currentRequest = { name, id, studentNumber, documents, lastSY, course, proofURL, validated, forDelivery, terminated };

  const paymentBtn = document.getElementById('togglePayment');
  const deliveryBtn = document.getElementById('toggleDelivery');
  const terminationBtn = document.getElementById('toggleTermination');

  if (paymentBtn) paymentBtn.textContent = validated ? 'Unmark Payment' : 'Mark as Paid';
  if (deliveryBtn) deliveryBtn.textContent = forDelivery ? 'Unmark Delivery' : 'Mark for Delivery';
  if (terminationBtn) terminationBtn.textContent = terminated ? 'Unmark Termination' : 'Mark as Terminated';
}

function updateRequestStatus() {
  let clientList = JSON.parse(localStorage.getItem('clientRequests')) || [];
  clientList = clientList.map(req => req.id === currentRequest.id ? currentRequest : req);
  localStorage.setItem('clientRequests', JSON.stringify(clientList));
  refreshClientTable();
}

function terminateRequest(id) {
  const confirmTerminate = confirm("Are you sure you want to terminate this request?");
  if (!confirmTerminate) return;

  let clientList = JSON.parse(localStorage.getItem('clientRequests')) || [];
  let terminatedList = JSON.parse(localStorage.getItem('terminatedRequests')) || [];

  const request = clientList.find(r => r.id === id);
  if (!request) return;

  clientList = clientList.filter(r => r.id !== id);
  request.terminated = true;
  terminatedList.push(request);

  localStorage.setItem('clientRequests', JSON.stringify(clientList));
  localStorage.setItem('terminatedRequests', JSON.stringify(terminatedList));

  alert(`${request.name} has been moved to Terminated Records.`);
  window.location.href = "../AdminPage/TerminatedRecords.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const existing = JSON.parse(localStorage.getItem("clientRequests")) || [];

  // Add dummy data if none exists
  if (existing.length === 0) {
    const dummy = [{
      id: "req001",
      name: "Juan Dela Cruz",
      studentNumber: "2022-12345",
      documents: "TOR, Diploma",
      lastSY: "2021-2022",
      course: "BSIT",
      proofURL: "https://via.placeholder.com/200x150.png?text=Payment+Proof",
      validated: false,
      forDelivery: false,
      terminated: false
    }];
    localStorage.setItem("clientRequests", JSON.stringify(dummy));
  }

  refreshClientTable();

  // Attach search input listener
  document.getElementById('searchInput')?.addEventListener('input', refreshClientTable);

  // Modal buttons
  document.getElementById('togglePayment')?.addEventListener('click', function () {
    currentRequest.validated = !currentRequest.validated;
    updateRequestStatus();
  });

  document.getElementById('toggleDelivery')?.addEventListener('click', function () {
    currentRequest.forDelivery = !currentRequest.forDelivery;
    updateRequestStatus();
  });

  document.getElementById('toggleTermination')?.addEventListener('click', function () {
    const confirmTerm = confirm(`Are you sure you want to ${currentRequest.terminated ? 'undo' : 'mark'} termination for ${currentRequest.name}?`);
    if (!confirmTerm) return;

    currentRequest.terminated = !currentRequest.terminated;

    let clientList = JSON.parse(localStorage.getItem('clientRequests')) || [];
    let terminatedList = JSON.parse(localStorage.getItem('terminatedRequests')) || [];

    clientList = clientList.filter(r => r.id !== currentRequest.id);
    terminatedList = terminatedList.filter(r => r.id !== currentRequest.id);

    if (currentRequest.terminated) {
      terminatedList.push(currentRequest);
      alert(`${currentRequest.name} marked as Terminated.`);
    } else {
      clientList.push(currentRequest);
      alert(`${currentRequest.name} restored to Client Requests.`);
    }

    localStorage.setItem('clientRequests', JSON.stringify(clientList));
    localStorage.setItem('terminatedRequests', JSON.stringify(terminatedList));

    const modal = bootstrap.Modal.getInstance(document.getElementById('requestModal'));
    modal.hide();

    refreshClientTable();
  });
});
