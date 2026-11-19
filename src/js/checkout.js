import ExternalServices from "./ExternalServices.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const externalServices = new ExternalServices("tents");
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

    // Collect form information
    const formData = new FormData(form);

    const order = {
        orderDate: new Date().toISOString(),
        fname: formData.get("fname"),
        lname: formData.get("lname"),
        street: formData.get("street"),
        city: formData.get("city"),
        state: formData.get("state"),
        zip: formData.get("zip"),
        cardNumber: formData.get("cardNumber"),
        expiration: formData.get("expiration"),
        code: formData.get("code"),
        items: checkout.packageItems(),
        orderTotal: checkout.orderTotal,
        shipping: checkout.shipping,
        tax: checkout.tax,
    };

    // Send the order to the backend
    try {
        const response = await externalServices.checkout(order);

        alert(`Order successfully placed! Your Order ID is ${response.orderId}`);

        localStorage.removeItem("so-cart");

        window.location.href = "/index.html";
    } catch (error) {
        console.error("Checkout error:", error);
    }
});