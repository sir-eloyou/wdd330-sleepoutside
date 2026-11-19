import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemTotal();

        // Display the number of items
        document.querySelector("#item-count").textContent = this.list.length;

        // Display subtotal
        document.querySelector("#subtotal").textContent =
            `$${this.itemTotal.toFixed(2)}`;

        // Calculate totals when the ZIP code is entered
        document.querySelector("#zip").addEventListener("change", () => {
            this.calculateOrderTotal();
        });
    }

    calculateItemTotal() {
        this.itemTotal = this.list.reduce(
            (total, item) => total + Number(item.FinalPrice),
            0,
        );
    }

    calculateOrderTotal() {
        // Calculate tax (6%)
        this.tax = this.itemTotal * 0.06;

        // Calculate shipping
        this.shipping = this.list.length > 0
            ? 10 + (this.list.length - 1) * 2
            : 0;

        // Calculate order total
        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        // Display tax
        document.querySelector("#tax").textContent =
            `$${this.tax.toFixed(2)}`;

        // Display shipping
        document.querySelector("#shipping").textContent =
            `$${this.shipping.toFixed(2)}`;

        // Display order total
        document.querySelector("#order-total").textContent =
            `$${this.orderTotal.toFixed(2)}`;
    }

    packageItems() {
        return this.list.map((item) => {
            return {
                id: item.Id,
                name: item.Name,
                price: item.FinalPrice,
                quantity: 1,
            };
        });
    }

    async checkout(form) {
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
            items: this.packageItems(),
            orderTotal: this.orderTotal.toFixed(2),
            shipping: this.shipping,
            tax: this.tax.toFixed(2),
        };

        const externalServices = new ExternalServices("tents");

        return await externalServices.checkout(order);
    }
}