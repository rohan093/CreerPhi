let claims = [];

document
  .getElementById("claim-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const policyNumber = document.getElementById("policy-number").value;
    const incidentDate = document.getElementById("incident-date").value;
    const incidentDescription = document.getElementById(
      "incident-description"
    ).value;

    // Simple validation
    if (!policyNumber || !incidentDate || !incidentDescription) {
      document.getElementById("form-feedback").innerText =
        "All fields are required!";
      document.getElementById("form-feedback").style.color = "red";
      return;
    }

    const claimID = claims.length + 1; // Generate a simple ID
    claims.push({ claimID, policyNumber, incidentDate, status: "Pending" });

    document.getElementById("form-feedback").innerText =
      "Claim submitted successfully!";
    document.getElementById("claim-form").reset();

    renderClaims();
  });

// Claim rendering function
function renderClaims() {
  const tbody = document.getElementById("claims-table").querySelector("tbody");
  tbody.innerHTML = ""; // Clear previous data

  claims.forEach((claim) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${claim.claimID}</td><td>${claim.policyNumber}</td><td>${claim.incidentDate}</td><td>${claim.status}</td>`;
    tbody.appendChild(row);
  });
}

// Implement a basic search function
document.getElementById("search-claims").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const filteredClaims = claims.filter((claim) =>
    claim.claimID.toString().includes(searchTerm)
  );
  const tbody = document.getElementById("claims-table").querySelector("tbody");
  tbody.innerHTML = ""; // Clear previous data

  filteredClaims.forEach((claim) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${claim.claimID}</td><td>${claim.policyNumber}</td><td>${claim.incidentDate}</td><td>${claim.status}</td>`;
    tbody.appendChild(row);
  });
});
