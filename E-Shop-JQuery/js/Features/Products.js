import handleRemoteRequest from "../shares/api.js";
import { itemsElement, mainElement } from "../shares/ui/dom-elements.js";
import { UI } from "../shares/ui/UI.js";

export function fetchProducts(query = "", category = "") {
  let endpoint = "products";
  if (query) {
    endpoint = `products/search?q=${query}`;
  } else if (category) {
    endpoint = `products/category/${category}`;
  }

  handleRemoteRequest(
    endpoint,
    function (data) {
      mainElement.removeClass("d-none");
      mainElement.addClass("row");
      itemsElement.html(
        data.products.map((item) => 
          `<div class="col-md-4">
            <div class="card">
              <a href="product.html?id=${item.id}">
                <img src="${item.thumbnail}" alt="${item.title}" class="card-img-top">
              </a>
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item.description}</p>
                <p class="rate w-25 rounded-pill">${item.rating}</p>
                <div class="d-flex align-items-center">
                  <p class="price">$${item.price}</p>
                  <button class="btn add-to-cart ms-auto" data-id="${item.id}" data-item='${JSON.stringify(item)}'>Add to cart</button>
                </div>
              </div>
            </div>
          </div>`
        ).join("")
      );
    },
    function (err) {
      UI.showError(err.message);
    },
    UI.startLoading,
    UI.stopLoading
  );
}
