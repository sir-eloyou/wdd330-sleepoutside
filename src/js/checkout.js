import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", ".order-summary");

checkout.init();

const form = document.querySelector("#checkout-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Check that all required fields are completed
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Calculate the final order totals
    checkout.calculateOrderTotal();

    // Send the order to the backend
    try {
        const response = await checkout.checkout(form);

        alert(`Order successfully placed! Your Order ID is ${response.orderId}`);

        // Clear the shopping cart
        localStorage.removeItem("so-cart");

        // Return to the home page
        window.location.href = "/index.html";

    } catch (error) {
        console.error("Checkout error:", error);
        alert("Sorry, there was a problem placing your order. Please try again.");
    }
});