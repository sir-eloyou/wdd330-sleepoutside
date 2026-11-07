async function displayDiscounts() {
    try {
        const response = await fetch("/json/tents.json");
        const products = await response.json();

        const productCards = document.querySelectorAll(".product-card");

        productCards.forEach((card) => {
            const link = card.querySelector("a");
            const productId = new URL(link.href).searchParams.get("product");

            const product = products.find((item) => item.Id === productId);

            if (
                product &&
                product.FinalPrice < product.SuggestedRetailPrice
            ) {
                const discount =
                    ((product.SuggestedRetailPrice - product.FinalPrice) /
                        product.SuggestedRetailPrice) *
                    100;

                const badge = document.createElement("span");
                badge.classList.add("discount-badge");
                badge.textContent = `${Math.round(discount)}% OFF`;

                card.appendChild(badge);
            }
        });
    } catch (error) {
        console.error("Error displaying discounts:", error);
    }
}

displayDiscounts();