import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

function getWishlist() {
  return getLocalStorage("so-wishlist") || [];
}

function renderWishlist() {
  const items = getWishlist();
  const list = document.querySelector(".product-list");

  if (items.length === 0) {
    list.innerHTML = "<p>Your wishlist is empty.</p>";
    return;
  }

  list.innerHTML = items.map(wishlistItemTemplate).join("");

  document.querySelectorAll(".wishlist-remove").forEach((btn) => {
    btn.addEventListener("click", removeItem);
  });

  document.querySelectorAll(".wishlist-to-cart").forEach((btn) => {
    btn.addEventListener("click", moveToCart);
  });
}

function wishlistItemTemplate(product) {
  return `<li class="cart-card divider">
  <a href="../product_pages/?product=${product.Id}" class="cart-card__image">
    <img src="${product.Image}" alt="${product.Name}" />
  </a>
  <a href="../product_pages/?product=${product.Id}">
    <h2 class="card__name">${product.Name}</h2>
  </a>
  <p class="cart-card__color">${product.Colors[0].ColorName}</p>
  <p class="cart-card__price">$${product.FinalPrice}</p>
  <div class="wishlist-actions">
    <button class="wishlist-to-cart" data-id="${product.Id}">Add to Cart</button>
    <button class="wishlist-remove" data-id="${product.Id}">Remove</button>
  </div>
</li>`;
}

function removeItem(e) {
  const id = e.target.dataset.id;
  const items = getWishlist().filter((product) => product.Id !== id);
  setLocalStorage("so-wishlist", items);
  renderWishlist();
}

function moveToCart(e) {
  const id = e.target.dataset.id;
  const found = getWishlist().find((product) => product.Id === id);
  const cart = getLocalStorage("so-cart") || [];
  cart.push(found);
  setLocalStorage("so-cart", cart);
  removeItem(e);
}

renderWishlist();
loadHeaderFooter();