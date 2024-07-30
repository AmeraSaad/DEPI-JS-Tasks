import { loadingElement, errorElement, mainElement } from "./dom-elements.js";

export class UI {
  static startLoading() {
    loadingElement.removeClass("d-none");
  }

  static stopLoading() {
    loadingElement.addClass("d-none");
  }

  static showError(errorMessage) {
    errorElement.removeClass("d-none");
    errorElement.addClass("d-flex");
    mainElement.removeClass("row");
    mainElement.addClass("d-none");
    errorElement.find(".alert").text(errorMessage);
  }

  static hideError() {
    errorElement.addClass("d-none");
    errorElement.removeClass("d-flex");
  }
}
