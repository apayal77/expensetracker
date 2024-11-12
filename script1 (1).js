document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const generateChartButton = document.getElementById("generate-chart");
    const generateBarChartButton = document.getElementById("generate-chart1");
    let expenses = [];

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("expense-name").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const category = document.getElementById("expense-category").value;
        const date = document.getElementById("expense-date").value;

        if (!name || isNaN(amount) || amount <= 0 || !category || !date) {
            alert("Please fill out all fields correctly.");
            return;
        }

        const expense = {
            id: Date.now(),
            name,
            amount,
            category,
            date
        };

        expenses.push(expense);
        displayExpenses(expenses);
        updateTotalAmount();
        expenseForm.reset();
    });

    
    function displayExpenses(expenses) {
        expenseList.innerHTML = "";
        expenses.forEach(expense => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;
            expenseList.appendChild(row);
        });
    }

    
    function updateTotalAmount() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }

    
    expenseList.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-btn")) {
            const id = e.target.dataset.id;
            editExpense(id);
        } else if (e.target.classList.contains("delete-btn")) {
            const id = e.target.dataset.id;
            deleteExpense(id);
        }
    });

    function editExpense(id) {
        const expenseToEdit = expenses.find(expense => expense.id == id);
        if (expenseToEdit) {
            document.getElementById("expense-name").value = expenseToEdit.name;
            document.getElementById("expense-amount").value = expenseToEdit.amount;
            document.getElementById("expense-category").value = expenseToEdit.category;
            document.getElementById("expense-date").value = expenseToEdit.date;

            expenses = expenses.filter(expense => expense.id != id); 
            displayExpenses(expenses); 
            updateTotalAmount();
        }
    }

    function deleteExpense(id) {
        expenses = expenses.filter(expense => expense.id != id); 
        displayExpenses(expenses); 
        updateTotalAmount();
    }

    
    generateChartButton.addEventListener("click", () => {
        const categories = {};
        expenses.forEach(expense => {
            if (categories[expense.category]) {
                categories[expense.category] += expense.amount;
            } else {
                categories[expense.category] = expense.amount;
            }
        });

        const categoryNames = Object.keys(categories);
        const categoryAmounts = Object.values(categories);

        const ctx = document.getElementById("expenseChart").getContext("2d");
        new Chart(ctx, {
            type: "pie",
            data: {
                labels: categoryNames,
                datasets: [{
                    label: "Expenses",
                    data: categoryAmounts,
                
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(255, 87, 34, 0.2)",
                        "rgba(63, 81, 181, 0.2)",
                        "rgba(0, 150, 136, 0.2)",
                        "rgba(139, 195, 74, 0.2)",
                        "rgba(233, 30, 99, 0.2)",
                        "rgba(103, 58, 183, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                        "rgba(255, 87, 34, 1)",
                        "rgba(63, 81, 181, 1)",
                        "rgba(0, 150, 136, 1)",
                        "rgba(139, 195, 74, 1)",
                        "rgba(233, 30, 99, 1)",
                        "rgba(103, 58, 183, 1)"
                    ],
                    borderWidth: 1
                }]
            }
        });
    });

    
    generateBarChartButton.addEventListener("click", () => {
        const categories = {};
        expenses.forEach(expense => {
            if (categories[expense.category]) {
                categories[expense.category] += expense.amount;
            } else {
                categories[expense.category] = expense.amount;
            }
        });

        const categoryNames = Object.keys(categories);
        const categoryAmounts = Object.values(categories);

        const ctx = document.getElementById("expenseChart1").getContext("2d");

        
        if (window.barChartInstance) {
            window.barChartInstance.destroy();
        }

        window.barChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: categoryNames,
                datasets: [{
                    label: "Category",
                    data: categoryAmounts,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(255, 87, 34, 0.2)",
                        "rgba(63, 81, 181, 0.2)",
                        "rgba(0, 150, 136, 0.2)",
                        "rgba(139, 195, 74, 0.2)",
                        "rgba(233, 30, 99, 0.2)",
                        "rgba(103, 58, 183, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                        "rgba(255, 87, 34, 1)",
                        "rgba(63, 81, 181, 1)",
                        "rgba(0, 150, 136, 1)",
                        "rgba(139, 195, 74, 1)",
                        "rgba(233, 30, 99, 1)",
                        "rgba(103, 58, 183, 1)"
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount (in rupees)'
                        }

                
                    }
                }
            }
            
        });
    });
});
