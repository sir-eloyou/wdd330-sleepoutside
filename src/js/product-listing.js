import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

const heading = document.querySelector(".products h2");
heading.textContent = `Products: ${category.replace("-", " ")}`;

const myList = new ProductList(category, dataSource, listElement);
myList.init();