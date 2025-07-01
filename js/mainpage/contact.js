AOS.init();

  const backToTopBtn = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('show', window.scrollY > 200);
  });

  // Dynamic Registrar Contacts (Name + Contact only)
  const registrarContacts = [
    {
      heading: "Registrar Contact Person",
      name: "Mrs. 1",
      contact: "0912-123-4567"
    },
    {
      heading: "Registrar Contact Person",
      name: "Mrs. 2",
      contact: "0912-987-6543"
    }
  ];

  const container = document.getElementById("registrarContactsContainer");

  registrarContacts.forEach(contact => {
    const card = document.createElement("div");
    card.className = "col-lg-6 col-md-12";
    card.innerHTML = `
      <div class="card p-4 h-100 shadow-sm border-0">
        <h4 class="mb-3 text-danger"><i class="bi bi-person-fill me-2"></i>${contact.heading}</h4>
        <ul class="list-unstyled mb-4">
          <li class="mb-3">
            <strong>${contact.name}</strong><br>
            <i class="bi bi-telephone-fill me-2 text-danger"></i>${contact.contact}
          </li>
        </ul>
      </div>
    `;
    container.appendChild(card);
  });