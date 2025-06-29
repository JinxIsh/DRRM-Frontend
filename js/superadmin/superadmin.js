const logs = [
  {
    name: "Juan Dela Cruz",
    role: "Admin",
    action: "Updated user access rights",
    timestamp: "2025-06-25T10:30:00",
    fullDetails: {
      user_id: "1234",
      role: "Admin",
      user_name: "Juan Dela Cruz",
      action: "Updated access",
      description: "Modified user role and permissions",
      performed_at: "2025-06-25 10:30 AM"
    }
  },
  {
    name: "Maria Santos",
    role: "User",
    action: "Logged in",
    timestamp: "2025-05-01T09:10:00",
    fullDetails: {
      user_id: "5678",
      role: "User",
      user_name: "Maria Santos",
      action: "Login",
      description: "User logged in successfully",
      performed_at: "2024-05-01 9:10 AM"
    }
  }
];

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

function groupLogsByDate(logs) {
  return logs.reduce((acc, log) => {
    const day = formatDate(log.timestamp);
    acc[day] = acc[day] || [];
    acc[day].push(log);
    return acc;
  }, {});
}

function displayLogs(filter = '') {
  const logList = document.getElementById("logList");
  logList.innerHTML = "";
  const groupedLogs = groupLogsByDate(logs);
  const range = document.getElementById("timeRange").value;
  let hasResults = false;

  for (const [date, logGroup] of Object.entries(groupedLogs)) {
    const groupContainer = document.createElement("div");
    const dateHeading = document.createElement("div");
    dateHeading.className = "log-date-group";
    dateHeading.innerHTML = `<i class='bi bi-calendar-event me-2'></i>${date}`;
    let count = 0;

    logGroup.forEach(log => {
      const logDate = new Date(log.timestamp);
      const today = new Date();
      const daysAgo = parseInt(range);
      const matchRange = !range || (today - logDate <= daysAgo * 24 * 60 * 60 * 1000);

      const searchLower = filter.toLowerCase();
      const matchSearch = !filter || (
        log.name.toLowerCase().includes(searchLower) ||
        log.role.toLowerCase().includes(searchLower) ||
        log.action.toLowerCase().includes(searchLower)
      );

      if (matchSearch && matchRange) {
        const row = document.createElement("div");
        row.className = "log-row";
        row.setAttribute("data-bs-toggle", "modal");
        row.setAttribute("data-bs-target", "#logModal");
        row.onclick = () => showLogDetails(log.fullDetails);
        if (filter) row.classList.add("highlight");

        row.innerHTML = `
          <div><i class="bi bi-person me-2"></i>${log.name}</div>
          <div><i class="bi bi-person-badge me-2"></i>${log.role}</div>
          <div><i class="bi bi-pencil-square me-2"></i>${log.action}</div>
          <div><i class="bi bi-clock me-2"></i>${log.timestamp}</div>
        `;
        groupContainer.appendChild(row);
        count++;
      }
    });

    if (count > 0) {
      hasResults = true;
      logList.appendChild(dateHeading);
      logList.appendChild(groupContainer);
    }
  }

  if (!hasResults) {
    logList.innerHTML = '<div class="no-results">No logs found for the selected filters.</div>';
  }
}

function showLogDetails(detail) {
  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
    <div class="row"><div class="col-sm-4 fw-bold">User ID:</div><div class="col-sm-8">${detail.user_id}</div></div>
    <div class="row"><div class="col-sm-4 fw-bold">Role:</div><div class="col-sm-8">${detail.role}</div></div>
    <div class="row"><div class="col-sm-4 fw-bold">Username:</div><div class="col-sm-8">${detail.user_name}</div></div>
    <div class="row"><div class="col-sm-4 fw-bold">Action:</div><div class="col-sm-8">${detail.action}</div></div>
    <div class="row"><div class="col-sm-4 fw-bold">Description:</div><div class="col-sm-8">${detail.description}</div></div>
    <div class="row"><div class="col-sm-4 fw-bold">Action Performed At:</div><div class="col-sm-8">${detail.performed_at}</div></div>
  `;
}

function searchLogs() {
  const value = document.getElementById("searchInput").value.trim();
  displayLogs(value);
}

displayLogs();