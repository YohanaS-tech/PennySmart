const budgetForm = document.getElementById('budget-form');
const balanceDisplay = document.getElementById("available-balance");
const budgetInput = document.getElementById("monthly-budget-input");
const budgetMessage= document.getElementById("budget-message");
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expensePriceInput = document.getElementById("expense-price");
const purchaseList = document.getElementById("purchase-list");
const emptyPurchaseMessage = document.getElementById("empty-purchase-message");
const totalSpentDisplay = document.getElementById("total-spent");

let monthlyBudget = 0;
let availableBalance = 0;
let totalSpent = 0;
let purchases = [ 
    {
        name: "CeraVe Cleanser",
        price: 12
    }
]


budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newBudget = Number(budgetInput.value);

    if (budgetInput.value.trim() === "" || !Number.isFinite(newBudget) || newBudget < 0) {
        alert("Please enter a valid monthly budget of zero or more.");
        return;
    }

    monthlyBudget = newBudget;
    availableBalance = monthlyBudget - totalSpent;

    balanceDisplay.textContent = "$" + availableBalance.toFixed(2);

    if (availableBalance < 0) {
        budgetMessage.textContent = "Warning: Your spending is higher than your new budget.";
    } else {
        budgetMessage.textContent = "Your budget has been saved successfully!";
    }

    console.log("Monthly Budget:", monthlyBudget);
});

budgetInput.addEventListener("input", function() {
    budgetMessage.textContent = "";
});

expenseForm.addEventListener("submit", function(event) {
    event.preventDefault(); //prevent the form from submitting and refreshing the page

    const itemName = expenseNameInput.value;
    const itemPrice = Number(expensePriceInput.value);//convert the input value to a number
    
    if(itemName.trim() === "" || ! Number.isFinite(itemPrice) || itemPrice <= 0)
 {
    alert("Please enter a valid item name and price.");
    return;
 } // first if checks that the item name and prices are valid.

    if(itemPrice > availableBalance) {
        alert("You don't have enough avaialable money for this purchase.");
        return;
    } // checks whether the purchase costs more than the avialbale balance.


    console.log("Item:", itemName);
    console.log("Price:", itemPrice);
    
    const purchaseItem = document.createElement("div");

    const itemDetails = document.createElement("span");
    itemDetails.textContent = itemName + "- $" + itemPrice.toFixed(2);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    purchaseItem.appendChild(itemDetails);
    purchaseItem.appendChild(deleteButton);

    availableBalance -= itemPrice; 
    balanceDisplay.textContent = "$" + availableBalance.toFixed(2); 

    totalSpent += itemPrice; // adds the new purchase price to the running total
    
    totalSpentDisplay.textContent = "Total spent: $" + totalSpent.toFixed(2); // updates the amount shown on the dashboard 


    if(emptyPurchaseMessage.isConnected) {
        emptyPurchaseMessage.remove(); // remove the "No purchases yet" message when a purchase is made
    }
    purchaseList.appendChild(purchaseItem); // appendchild is used to add the new purchase item to the list of purchases.

    deleteButton.addEventListener("click", function() {
        availableBalance += itemPrice; // add the price of the deleted item back to the available balance 

        balanceDisplay.textContent = "$" + availableBalance.toFixed(2); // update the available balance display

        purchaseItem.remove(); 
        
        totalSpent -= itemPrice;
        totalSpentDisplay.textContent = "Total spent: $" + totalSpent.toFixed(2);
    })



    expenseNameInput.value = "";// clear the item name
    expensePriceInput.value = "";// clear the item price

})

