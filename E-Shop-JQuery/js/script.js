import handleRemoteRequest from "./shares/api.js";

const categoriesContainer = $("#categories");
const loadingElement = $("#loading");
const errorElement = $("#error");
const mainElement = $("#main-content");
const itemsElement = $("#items");
const searchInput = $("#search-input");
const searchButton = $("#search-button");
const categorySelect = $("#category-select");
const itemsCount = $("#items-count");
const cartItemsContainer = $("#cart-items");
const emptyCartMessage = $("#empty-cart-message");

let cartItems = [];

function startLoading() {
  console.log("Start loading");
  loadingElement.removeClass("d-none");
}

function stopLoading() {
  console.log("Stop loading");
  loadingElement.addClass("d-none");
}

function showError(errorMessage) {
  console.error("Error:", errorMessage);
  errorElement.removeClass("d-none");
  errorElement.addClass("d-flex");
  mainElement.removeClass("row");
  mainElement.addClass("d-none");
  errorElement.find(".alert").text(errorMessage);
}

function hideError() {
  errorElement.addClass("d-none");
  errorElement.removeClass("d-flex");
}

function fetchCategories() {
  console.log("Fetching categories");
  handleRemoteRequest(
    "products/categories",
    function (data) {
      console.log("Categories fetched:", data);
      mainElement.removeClass("d-none");
      mainElement.addClass("row");

      categoriesContainer.html(
        data.map((item) => `<li class="category-item" data-category="${item.name}">${item.name}</li>`).join("")
      );

      categorySelect.html(
        `<option value="">All Categories</option>` +
        data.map((item) => `<option value="${item.name}">${item.name}</option>`).join("")
      );
    },
    function (err) {
      showError(err.message);
    },
    startLoading,
    stopLoading
  );
}

function fetchProducts(query = "", category = "") {
  let endpoint = "products";
  if (query) {
    endpoint = `products/search?q=${query}`;
  } else if (category) {
    endpoint = `products/category/${category}`;
  }

  console.log("Fetching products from endpoint:", endpoint);
  handleRemoteRequest(
    endpoint,
    function (data) {
      console.log("Products fetched:", data);
      hideError();
      mainElement.removeClass("d-none");
      mainElement.addClass("row");
      itemsElement.html(
        data.products.map((item) => `
          <div class="col-md-4">
            <div class="card">
              <img src="${item.thumbnail}" alt="${item.title}">
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item.description}</p>
                <div class="price">$${item.price}</div>
                <button class="btn add-to-cart" data-id="${item.id}" data-item='${JSON.stringify(item)}'>Add to cart</button>
              </div>
            </div>
          </div>
        `).join("")
      );
    },
    function (err) {
      showError(err.message);
    },
    startLoading,
    stopLoading
  );
}

function updateCartDisplay() {
  itemsCount.text(cartItems.length);
  if (cartItems.length > 0) {
    itemsCount.removeClass("d-none");
    emptyCartMessage.addClass("d-none");
  } else {
    emptyCartMessage.removeClass("d-none");
  }
}

function renderCartItems() {
  if (cartItems.length === 0) {
    emptyCartMessage.removeClass("d-none");
    cartItemsContainer.html("");
  } else {
    emptyCartMessage.addClass("d-none");
    cartItemsContainer.html(
      cartItems.map((item, index) => `
        <li class="cart-item d-flex justify-content-between align-items-center mb-2">
          <div>
            <h5>${item.title}</h5>
            <p>$${item.price}</p>
            <div class="d-flex align-items-center">
              <button class="btn btn-secondary btn-sm decrease-quantity" data-index="${index}">-</button>
              <span class="mx-2">${item.quantity}</span>
              <button class="btn btn-secondary btn-sm increase-quantity" data-index="${index}">+</button>
            </div>
          </div>
          <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
        </li>
      `).join("")
    );
  }
}

function addToCart(item) {
  const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    if (existingItem.quantity < item.stock) {
      existingItem.quantity += 1;
    } else {
      alert('Cannot add more items than available in stock.');
    }
  } else {
    cartItems.push({ ...item, quantity: 1 });
  }
  updateCartDisplay();
  renderCartItems();
}

searchButton.on("click", function () {
  const query = searchInput.val().trim();
  fetchProducts(query);
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
  fetchProducts("", category);
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

// Initialize
itemsCount.removeClass("d-none");  // Show the item count at the beginning
fetchCategories();
fetchProducts();
