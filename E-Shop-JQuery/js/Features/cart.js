import { itemsCount, cartItemsContainer, emptyCartMessage } from "../shares/ui/dom-elements.js";

let cartItems = [];

function updateCartDisplay() {
    itemsCount.text(cartItems.length);
    if (cartItems.length > 0) {
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
        let totalCost = 0;
        cartItemsContainer.html(
            cartItems.map((item, index) => {
                const itemTotalCost = item.price * item.quantity;
                totalCost += itemTotalCost;
                return `
                    <li class="cart-item d-flex justify-content-between align-items-center mb-2">
                        <div class="d-flex align-items-center">
                            <img src="${item.thumbnail}" alt="${item.title}" class="w-50 h-50">
                            <div class="ml-3">
                                <h5>${item.title}</h5>
                                <p>$${item.price} x ${item.quantity} = $${itemTotalCost.toFixed(2)}</p>
                                <div class="d-flex align-items-center">
                                    <button class="btn btn-secondary btn-sm decrease-quantity" data-index="${index}">-</button>
                                    <span class="mx-2">${item.quantity}</span>
                                    <button class="btn btn-secondary btn-sm increase-quantity" data-index="${index}">+</button>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
                    </li>
                `;
            }).join("") + `
            <li class="cart-item-total d-flex justify-content-between align-items-center mt-3">
                <h5>Total Cost:</h5>
                <h5>$${totalCost.toFixed(2)}</h5>
            </li>
            `
        );
    }
}

function addToCart(item) {
    if (item.stock === 0) {
        alert('This item is out of stock.');
        return;
    }

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

export { addToCart, cartItems, updateCartDisplay, renderCartItems };
