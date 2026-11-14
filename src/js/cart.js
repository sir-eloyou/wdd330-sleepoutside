import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function getCart() {
  return getLocalStorage("so-cart") || [];
}

function renderCartContents() {
  const cartItems = getCart();
  const list = document.querySelector(".product-list");

  if (cartItems.length === 0) {
    list.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    list.innerHTML = cartItems.map(cartItemTemplate).join("");
  }

  document.querySelectorAll(".cart-card__remove").forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });
  renderCartTotal(cartItems);
}

function renderCartTotal(cartItems) {
  const footer = document.querySelector(".cart-footer");
  if (cartItems.length === 0) {
    footer.classList.add("hide");
    return;
  }
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  document.querySelector(".cart-total").textContent =
    `Total: $${total.toFixed(2)}`;
  footer.classList.remove("hide");
}

function removeFromCart(e) {
  const id = e.currentTarget.dataset.id;
  const cartItems = getCart();
  const index = cartItems.findIndex((item) => item.Id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <span class="cart-card__remove" data-id="${item.Id}" role="button" tabindex="0" aria-label="Remove ${item.Name} from cart">X</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

renderCartContents();
