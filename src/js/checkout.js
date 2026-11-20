import CheckoutProcess from "./CheckoutProcess.mjs";
import { alertMessage } from "./utils.mjs";

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
        await checkout.checkout(form);

        // Clear the shopping cart after successful checkout
        localStorage.removeItem("so-cart");

        // Redirect to the success page
        window.location.href = "./success.html";

    } catch (error) {
        console.error("Checkout error:", error);

        // Display an error message inside the page
        alertMessage("Sorry, there was a problem placing your order. Please try again.");
    }
});