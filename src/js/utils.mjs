// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });

  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(template);

  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Display an alert message at the top of the main element
export function alertMessage(message, scroll = true) {
  const main = document.querySelector("main");

  if (!main) return;

  const alert = document.createElement("div");
  alert.classList.add("alert");

  const messageText = document.createElement("p");
  messageText.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.textContent = "X";
  closeButton.setAttribute("aria-label", "Close alert");

  closeButton.addEventListener("click", () => {
    alert.remove();
  });

  alert.append(messageText, closeButton);

  // Add the alert at the beginning of main
  main.prepend(alert);

  // Scroll to the top of the page
  if (scroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}