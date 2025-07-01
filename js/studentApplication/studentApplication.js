  AOS.init();

  function toggleOtherCourse() {
    const courseSelect = document.getElementById("courseSelect");
    const otherGroup = document.getElementById("otherCourseGroup");
    otherGroup.style.display = courseSelect.value === "other" ? "block" : "none";
  }

  function nextStep(step) {
    const steps = document.querySelectorAll('.form-step');
    steps.forEach((s, i) => s.classList.toggle('active', i === step - 1));
    updateStepper(step);
    updateSummary();
  }

  function goToStep(step) {
    nextStep(step);
  }

  function updateStepper(currentStep) {
    const stepElems = document.querySelectorAll('.step');
    stepElems.forEach((step, index) => {
      step.classList.toggle('active', index === currentStep - 1);
    });
  }

  function updateSummary() {
    document.getElementById("summaryAddress").innerText = document.getElementById("address").value;
    document.getElementById("summaryMobile").innerText = document.getElementById("mobile").value;
    document.getElementById("summarySY").innerText = document.getElementById("schoolYear").value;
    const course = document.getElementById("courseSelect").value;
    const other = document.getElementById("otherCourseInput").value;
    document.getElementById("summaryCourse").innerText = course === "other" ? other : document.querySelector("#courseSelect option:checked").text;
    document.getElementById("summaryShippingAddress").innerText = document.getElementById("shippingAddress").value;
    document.getElementById("summarySpecialRequest").innerText = document.getElementById("specialRequest").value;

    // Document summary
    const rows = document.querySelectorAll("#documentTableBody tr");
    const summaryDocs = document.getElementById("summaryDocs");
    summaryDocs.innerHTML = "";
    let total = 0;
    rows.forEach(row => {
      const name = row.cells[1].innerText;
      const fee = parseFloat(row.cells[2].innerText);
      const copies = parseInt(row.querySelector("input").value || "0");
      const amount = copies * fee;
      if (copies > 0) {
        summaryDocs.innerHTML += `<tr><td>${name}</td><td>${copies}</td><td>₱${amount}</td></tr>`;
        total += amount;
      }
    });
    total += 300; // Add shipping fee
    document.getElementById("summaryTotal").innerText = total;

    // Upload summary
    const validIdInput = document.getElementById("validIdUpload");
    const paymentProofInput = document.getElementById("paymentProofUpload");

    function previewFile(input, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous

  if (input.files && input.files[0]) {
    const file = input.files[0];

    if (file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.style.maxWidth = "200px";
      img.style.marginTop = "0.5rem";
      container.appendChild(img);
    } else {
      container.textContent = file.name;
    }
  } else {
    container.textContent = "No file uploaded";
  }
}

// Inside updateSummary:
previewFile(validIdInput, "summaryValidId");
previewFile(paymentProofInput, "summaryPaymentProof");


    const summaryValidId = document.getElementById("summaryValidId");
    const summaryPaymentProof = document.getElementById("summaryPaymentProof");

    if (summaryValidId && summaryPaymentProof) {
      summaryValidId.textContent = validIdName;
      summaryPaymentProof.textContent = paymentProofName;
    }
  }

  document.querySelectorAll(".copy-input").forEach(input => {
    input.addEventListener("input", () => {
      const fee = parseFloat(input.dataset.fee);
      const quantity = parseInt(input.value) || 0;
      const rowTotal = fee * quantity;
      input.closest("tr").querySelector(".row-total").innerText = rowTotal;
      let total = 0;
      document.querySelectorAll(".row-total").forEach(cell => {
        total += parseFloat(cell.innerText || "0");
      });
      document.getElementById("totalFee").innerText = total;
    });
  });

  function saveDraft() {
    alert("Draft saved locally. You can submit later.");
    // You can expand this to use localStorage or send to a backend
  }

  function validateUploadsAndNext() {
    const validIdInput = document.getElementById('validIdUpload');
    const paymentProofInput = document.getElementById('paymentProofUpload');

    if (!validIdInput.files.length) {
      alert('Please upload your Valid ID.');
      validIdInput.focus();
      return;
    }

    if (!paymentProofInput.files.length) {
      alert('Please upload your Proof of Payment.');
      paymentProofInput.focus();
      return;
    }

    nextStep(5); // Move to summary
    updateSummary(); // Update summary including uploaded file names
  }