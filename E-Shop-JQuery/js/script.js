import handleRemoteRequest from "./shares/api.js";
import { 
  categoriesContainer, 
  loadingElement, 
  errorElement, 
  mainElement, 
  itemsElement, 
  searchInput, 
  searchButton, 
  categorySelect, 
  itemsCount, 
  cartItemsContainer, 
  emptyCartMessage 
} from "./shares/ui/dom-elements.js";
import { fetchCategories } from "./Features/Categories.js";
import { fetchProducts } from "./Features/Products.js";
import { Cart } from "./Features/cart.js";
import { UI } from "./shares/ui/UI.js";

// Initialize cart and UI
const cart = new Cart();
const ui = new UI();

searchButton.on("click", function () {
  const query = searchInput.val().trim();
  fetchProducts(query);
});

categorySelect.on("change", function () {
  const category = $(this).val();
  fetchProducts("", category);
});

categoriesContainer.on("click", ".category-item", function () {
  const category = $(this).data("category");
  categorySelect.val(category);
  fetchProducts("", category);
});

itemsElement.on("click", ".add-to-cart", function () {
  const item = JSON.parse($(this).attr('data-item'));
  cart.addItem(item);
});

cartItemsContainer.on("click", ".remove-item", function () {
  const index = $(this).data("index");
  cart.removeItem(index);
});

cartItemsContainer.on("click", ".increase-quantity", function () {
  const index = $(this).data("index");
  cart.increaseQuantity(index);
});

cartItemsContainer.on("click", ".decrease-quantity", function () {
  const index = $(this).data("index");
  cart.decreaseQuantity(index);
});

$(document).ready(function () {
  fetchCategories();
  fetchProducts();
});
