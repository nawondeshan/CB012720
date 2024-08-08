document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Product data for each category
    const products = {
        fruits: [
            { name: "Pomegranates (500g) - Rs.900", price: 900 },
            { name: "Mango (Alphonso) (1Kg) - Rs.600", price: 600 },
            { name: "Grapes (500g) - Rs.970", price: 970 },
            { name: "Banana (500g) - Rs.370", price: 370 },
            { name: "Apple (250g) - Rs.250", price: 250 },
            { name: "Orange (500g) - Rs.1830", price: 1830 },
        ],
        vegetables: [
            { name: "Carrot (1Kg) - Rs.230", price: 230 },
            { name: "Potatoes (1Kg) - Rs.380", price: 380 },
            { name: "Tomatoes (1Kg) - Rs.190", price: 190 },
            { name: "Onions (1Kg) - Rs.280", price: 280 },
            { name: "Bell Peppers (1Kg) - Rs.890", price: 890 },
            { name: "Cucumbers (1Kg) - Rs.510", price: 510 },
        ],
        dairy: [
            { name: "Fresh Milk (1L) - Rs.510", price: 510 },
            { name: "Cheese (500g) - Rs.2750", price: 2750 },
            { name: "Butter (500g) - Rs.2550", price: 2550 },
            { name: "Yogurt (80ml) - Rs.90", price: 90 },
            { name: "Curd - Rs.810", price: 810 },
            { name: "Ice-Cream (500ml) - Rs.490", price: 490 },
        ],
        meatSeafood: [
            { name: "Beef (500g) - Rs.1100", price: 1100 },
            { name: "Pork (1Kg) - Rs.1700", price: 1700 },
            { name: "Chicken (250g) - Rs.500", price: 500 },
            { name: "Prawns (1Kg) - Rs.2600", price: 2600 },
            { name: "Paraw Fish (100g) - Rs.350", price: 350 },
            { name: "Cuttle Fish (1Kg) - Rs.4500", price: 4500 },
        ],
        bakingCooking: [
            { name: "Flour (500g) - Rs.150", price: 150 },
            { name: "Vanila Essence (100ml) - Rs.310", price: 310 },
            { name: "Sugar (500g) - Rs.200", price: 200 },
            { name: "Salt (1Kg) - Rs.240", price: 240 },
            { name: "Baking Powder (100g) - Rs.150", price: 150 },
            { name: "Vegetable Oil (1L) - Rs.1500", price: 1500 },
        ],
        cosmetics: [
            { name: "Natural Face Cream - Rs.450", price: 450 },
            { name: "Herbal Shampoo - Rs.480", price: 480 },
            { name: "Organic Lip Balm - Rs.150", price: 150 },
            { name: "Body Lotion - Rs.680", price: 680 },
            { name: "Skin Care Oil - Rs.800", price: 800 },
        ]
    };

    // Initialize the product sections
    function initProducts() {
        Object.keys(products).forEach(category => {
            const section = document.getElementById(category);
            if (section) {
                products[category].forEach(product => {
                    const productItem = document.createElement("div");
                    productItem.innerHTML = `
                        <span>${product.name}</span>
                        <input type="number" min="0" step="1" value="1" data-name="${product.name}" data-price="${product.price}">
                        <button class="addItem">Add</button>
                    `;
                    section.appendChild(productItem);
                });
            }
        });

        // Add event listeners to "Add" buttons
        document.querySelectorAll(".addItem").forEach((button) => {
            button.addEventListener("click", addItemToCart);
        });
    }

    // Add item to the cart
    function addItemToCart(event) {
        const input = event.target.previousElementSibling;
        const quantity = parseInt(input.value);
        const name = input.dataset.name;
        const price = parseFloat(input.dataset.price);

        if (quantity > 0) {
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.price += price * quantity;
            } else {
                cart.push({ name, quantity, price: price * quantity });
            }
            updateCart();
        }
    }

    // Update cart display
    function updateCart() {
        const cartTableBody = document.querySelector("#cart tbody");
        cartTableBody.innerHTML = ""; // Clear existing rows

        let totalPrice = 0;
        cart.forEach((item) => {
            totalPrice += item.price;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>Rs${item.price.toFixed(2)}</td>
            `;
            cartTableBody.appendChild(row);
        });

        document.getElementById("totalPrice").textContent = `Rs${totalPrice.toFixed(2)}`;

        // Save cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Handle "Buy Now" button click
    document.getElementById("buyNow").addEventListener("click", function () {
        // Redirect to checkout page
        window.location.href = "checkout.html";
    });

    // Handle saving to favorites
    document.getElementById("addToFavorites").addEventListener("click", function () {
        localStorage.setItem("favoriteCart", JSON.stringify(cart));
        alert('Added to Favourites.');
    });

    // Handle applying favorites
    document.getElementById("applyFavorites").addEventListener("click", function () {
        const favoriteCart = JSON.parse(localStorage.getItem("favoriteCart"));
        if (favoriteCart) {
            cart.length = 0; // Clear existing cart
            cart.push(...favoriteCart);
            updateCart();
            alert('Favourites Applied.');
        } else {
            alert('No favourite order found.');
        }
    });

    // Handle "Clear Cart" button click
    document.getElementById("clearCart").addEventListener("click", function () {
        // Clear the cart array and localStorage
        cart.length = 0;
        updateCart();
        localStorage.removeItem("cart");
        alert('Cart Cleared');
    });

    initProducts();
    updateCart(); // Ensure cart is updated on page load
});
