import handleRemoteRequest from "./shares/api.js";
import { UI } from "./shares/ui/UI.js";
import { addToCart } from "./Features/cart.js";

const productDetailsElement = $("#product-details");

function fetchProductDetails(productId) {
    const endpoint = `products/${productId}`;
    
    handleRemoteRequest(
        endpoint,
        function (data) {
            console.log("Product details fetched:", data);
            UI.hideError();
            productDetailsElement.html(`
                <div class="card">
                    <img src="${data.thumbnail}" alt="${data.title}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.description}</p>
                        <p class="rate w-25 rounded-pill">${data.rating}</p>
                        <p class="price">$${data.price}</p>
                        <button class="btn btn-primary add-to-cart" data-item='${JSON.stringify(data)}'>Add to Cart</button>
                    </div>
                </div>
            `);

            // Add event listener for Add to Cart button
            $(".add-to-cart").on("click", function () {
                const item = JSON.parse($(this).attr('data-item'));
                addToCart(item);
            });
        },
        function (err) {
            UI.showError(err.message);
        },
        UI.startLoading,
        UI.stopLoading
    );
}

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (productId) {
        fetchProductDetails(productId);
    } else {
        UI.showError("Product ID is missing in the URL.");
    }
});
