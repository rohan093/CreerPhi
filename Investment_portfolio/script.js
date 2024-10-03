document.addEventListener("DOMContentLoaded", () => {
  const investmentForm = document.getElementById("investmentForm");
  const investmentList = document.getElementById("investmentList");
  const totalValueDisplay = document.getElementById("totalValue");
  const portfolioChart = document.getElementById("portfolioChart");

  let investments = [];
  let totalValue = 0;

  const updateTotalValue = () => {
    totalValue = investments.reduce(
      (sum, investment) => sum + investment.currentValue,
      0
    );
    totalValueDisplay.textContent = totalValue.toFixed(2);
    updateChart();
  };

  const updateChart = () => {
    const labels = investments.map((inv) => inv.assetName);
    const data = investments.map((inv) => inv.currentValue);

    if (window.chart) {
      window.chart.data.labels = labels;
      window.chart.data.datasets[0].data = data;
      window.chart.update();
    } else {
      window.chart = new Chart(portfolioChart.getContext("2d"), {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Portfolio Distribution",
              data: data,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    }
  };

  const addInvestmentToList = (investment) => {
    const investmentItem = document.createElement("div");
    investmentItem.className = "investment-item";

    investmentItem.innerHTML = `
          <div>
              <strong>${investment.assetName}</strong><br>
              Amount Invested: $${investment.amountInvested.toFixed(2)}<br>
              Current Value: $${investment.currentValue.toFixed(2)}<br>
              Change: ${(
                ((investment.currentValue - investment.amountInvested) /
                  investment.amountInvested) *
                100
              ).toFixed(2)}%
          </div>
          <button class="removeButton">Remove</button>
          <button class="updateButton">Update</button>
      `;

    investmentList.appendChild(investmentItem);

    investmentItem
      .querySelector(".removeButton")
      .addEventListener("click", () => {
        investments = investments.filter((inv) => inv !== investment);
        investmentList.removeChild(investmentItem);
        updateTotalValue();
      });

    investmentItem
      .querySelector(".updateButton")
      .addEventListener("click", () => {
        const newValue = prompt(
          "Enter new current value:",
          investment.currentValue
        );
        if (newValue !== null && !isNaN(newValue)) {
          investment.currentValue = parseFloat(newValue);
          updateTotalValue();
          investmentItem.innerHTML = `
                  <div>
                      <strong>${investment.assetName}</strong><br>
                      Amount Invested: $${investment.amountInvested.toFixed(
                        2
                      )}<br>
                      Current Value: $${investment.currentValue.toFixed(2)}<br>
                      Change: ${(
                        ((investment.currentValue - investment.amountInvested) /
                          investment.amountInvested) *
                        100
                      ).toFixed(2)}%
                  </div>
                  <button class="removeButton">Remove</button>
                  <button class="updateButton">Update</button>
              `;
          investmentItem
            .querySelector(".removeButton")
            .addEventListener("click", () => {
              investments = investments.filter((inv) => inv !== investment);
              investmentList.removeChild(investmentItem);
              updateTotalValue();
            });
          investmentItem
            .querySelector(".updateButton")
            .addEventListener("click", () => {
              const newValue = prompt(
                "Enter new current value:",
                investment.currentValue
              );
              if (newValue !== null && !isNaN(newValue)) {
                investment.currentValue = parseFloat(newValue);
                updateTotalValue();
                investmentItem.innerHTML = `
                          <div>
                              <strong>${investment.assetName}</strong><br>
                              Amount Invested: $${investment.amountInvested.toFixed(
                                2
                              )}<br>
                              Current Value: $${investment.currentValue.toFixed(
                                2
                              )}<br>
                              Change: ${(
                                ((investment.currentValue -
                                  investment.amountInvested) /
                                  investment.amountInvested) *
                                100
                              ).toFixed(2)}%
                          </div>
                          <button class="removeButton">Remove</button>
                          <button class="updateButton">Update</button>
                      `;
              }
            });
        }
      });
  };

  investmentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const assetName = document.getElementById("assetName").value;
    const amountInvested = parseFloat(
      document.getElementById("amountInvested").value
    );
    const currentValue = parseFloat(
      document.getElementById("currentValue").value
    );

    const investment = { assetName, amountInvested, currentValue };
    investments.push(investment);
    addInvestmentToList(investment);
    updateTotalValue();
    investmentForm.reset();
  });
});
