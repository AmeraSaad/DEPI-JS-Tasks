import handleRemoteRequest from "../shares/api.js";
import { categoriesContainer, categorySelect, mainElement } from "../shares/ui/dom-elements.js";
import { UI } from "../shares/ui/UI.js";

export function fetchCategories() {
  handleRemoteRequest(
    "products/categories",
    function (data) {
      mainElement.removeClass("d-none");
      mainElement.addClass("row");

      categoriesContainer.html(
        `<li class="category-item">All</li>` +
        data.map((item) => `<li class="category-item" data-category="${item.name}">${item.name}</li>`).join("")
      );

      categorySelect.html(
        `<option value="">All Categories</option>` +
        data.map((item) => `<option value="${item.name}">${item.name}</option>`).join("")
      );
    },
    function (err) {
      UI.showError(err.message);
    },
    UI.startLoading,
    UI.stopLoading
  );
}
