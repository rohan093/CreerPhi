let balance = 1000;

function updateBalance() {
  document.getElementById("balance").innerText = balance;
}

function showMessage(msg) {
  const messageDiv = document.getElementById("message");
  messageDiv.innerText = msg;
  setTimeout(() => {
    messageDiv.innerText = "";
  }, 3000);
}

function deposit() {
  const amount = parseFloat(document.getElementById("amount").value);
  if (amount > 0) {
    balance += amount;
    updateBalance();
    showMessage(`Deposited: $${amount}`);
  } else {
    showMessage("Please enter a valid amount.");
  }
  document.getElementById("amount").value = "";
}

function withdraw() {
  const amount = parseFloat(document.getElementById("amount").value);
  if (amount > 0 && amount <= balance) {
    balance -= amount;
    updateBalance();
    showMessage(`Withdrew: $${amount}`);
  } else {
    showMessage("Invalid amount or insufficient funds.");
  }
  document.getElementById("amount").value = "";
}

//balance display
updateBalance();
