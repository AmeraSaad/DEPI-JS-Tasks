import handleRemoteRequest from "./shares/api.js";

const categoriesContainer = $("#categories");
const loadingElement = $("#loading");
const errorElement = $("#error");
const mainElement = $("#main-content");
const itemsElement = $("#items");
const searchInput = $("#search-input");
const searchButton = $("#search-button");
const categorySelect = $("#category-select");
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

      // Assuming each category is an object with a 'name' property
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
                <button class="btn add-to-cart" data-id="${item.id}">Add to cart</button>
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


// Initialize
fetchCategories();
fetchProducts();