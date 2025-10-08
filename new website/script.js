let cart = [];
const cartList = document.getElementById('cart-list');
const cartTotalElement = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-btn');

/**
 * Adds an item to the cart array and updates the display.
 * @param {string} name - The name of the food item.
 * @param {number} price - The price of the food item.
 */
function addItemToCart(name, price) {
    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCartDisplay();
}

/**
 * Recalculates the total and re-renders the cart list.
 */
function updateCartDisplay() {
    cartList.innerHTML = ''; // Clear the current list
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} (x${item.quantity}) - $${itemTotal.toFixed(2)}`;
        cartList.appendChild(listItem);
    });

    // Update the total display
    cartTotalElement.textContent = total.toFixed(2);

    // Enable/disable checkout button
    checkoutButton.disabled = cart.length === 0;

    // Optional: Add a simple alert for checkout
    checkoutButton.onclick = () => {
        if (cart.length > 0) {
            alert(`Order Placed! Total amount is $${total.toFixed(2)}.`);
            // In a real app, this would send data to a backend server
            // and redirect to a payment page.
            cart = []; // Clear the cart after "checkout"
            updateCartDisplay();
        }
    };
}