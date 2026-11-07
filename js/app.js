const budgetForm = document.getElementById('budget-form');

const budgetInput = document.getElementById("monthly-budget-input");

budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let monthlyBudget = Number(budgetInput.value);

    console.log("Monthly Budget:", monthlyBudget);
});

