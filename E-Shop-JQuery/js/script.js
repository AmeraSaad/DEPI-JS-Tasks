import { 
  categoriesContainer, 
  searchButton, 
  searchInput, 
  categorySelect, 
  itemsElement, 
  cartItemsContainer 
} from "./shares/ui/dom-elements.js";

import { fetchCategories } from "./Features/Categories.js";
import { fetchProducts } from "./Features/Products.js";
import { addToCart, cartItems, updateCartDisplay, renderCartItems } from "./Features/cart.js";

searchButton.on("click", function () {
  const query = searchInput.val().trim();
  if (query) {
      fetchProducts(query);
  } else {
      itemsElement.html(`<h3 class="m-3">There is no category with this name</h3>`);
  }
});

categorySelect.on("change", function () {
  const category = $(this).val();
  if (category) {
      fetchProducts("", category);
  } else {
      fetchProducts();
  }
});

categoriesContainer.on("click", ".category-item", function () {
  const category = $(this).data("category");
  categorySelect.val(category);
  if (category) {
      fetchProducts("", category);
  } else {
      fetchProducts();
  }
});

itemsElement.on("click", ".add-to-cart", function () {
  const item = JSON.parse($(this).attr('data-item'));
  addToCart(item);
});

cartItemsContainer.on("click", ".remove-item", function () {
  const index = $(this).data("index");
  cartItems.splice(index, 1);
  updateCartDisplay();
  renderCartItems();
});

cartItemsContainer.on("click", ".increase-quantity", function () {
  const index = $(this).data("index");
  if (cartItems[index].quantity < cartItems[index].stock) {
      cartItems[index].quantity += 1;
  } else {
      alert('Cannot add more items than available in stock.');
  }
  updateCartDisplay();
  renderCartItems();
});

cartItemsContainer.on("click", ".decrease-quantity", function () {
  const index = $(this).data("index");
  if (cartItems[index].quantity > 1) {
      cartItems[index].quantity -= 1;
  }
  updateCartDisplay();
  renderCartItems();
});

$(document).ready(function () {
  fetchCategories();
  fetchProducts();
});
