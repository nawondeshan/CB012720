document.addEventListener("DOMContentLoaded", function () {
    const checkoutTableBody = document.querySelector("#checkout-table tbody");
    const checkoutTotalPrice = document.getElementById("checkout-total-price");
    const checkoutForm = document.getElementById("checkout-form");

    // Retrieve cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to update checkout table
    function updateCheckoutTable() {
        checkoutTableBody.innerHTML = ""; // Clear existing rows

        let totalPrice = 0;
        cart.forEach((item) => {
            totalPrice += item.price * item.quantity;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>Rs${(item.price * item.quantity).toFixed(2)}</td>
            `;
            checkoutTableBody.appendChild(row);
        });

        checkoutTotalPrice.textContent = `Rs${totalPrice.toFixed(2)}`;
    }

    // Function to handle form submission
    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(checkoutForm);
        const customerDetails = {
            name: formData.get("name"),
            email: formData.get("email"),
            address: formData.get("address"),
            paymentMethod: formData.get("payment-method"),
        };

        // Clear the cart and localStorage
        localStorage.removeItem("cart");

        // Calculate the estimated delivery date
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 7); // Estimated delivery in 7 days
        const formattedDate = deliveryDate.toLocaleDateString();

        // Redirect to confirmation page with query parameters
        const queryString = new URLSearchParams({
            name: customerDetails.name,
            deliveryDate: formattedDate
        }).toString();

        window.location.href = `confirmation.html?${queryString}`;
    });

    // Initialize the checkout table with cart items
    updateCheckoutTable();
});
