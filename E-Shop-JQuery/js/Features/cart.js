import { itemsCount, cartItemsContainer, emptyCartMessage } from "../shares/ui/dom-elements.js";

export class Cart {
  constructor() {
    this.cartItems = [];
    this.updateCartDisplay();
    this.renderCartItems();
  }

  addItem(item) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      if (existingItem.quantity < item.stock) {
        existingItem.quantity += 1;
      } else {
        alert('Cannot add more items than available in stock.');
      }
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
    this.updateCartDisplay();
    this.renderCartItems();
  }

  removeItem(index) {
    this.cartItems.splice(index, 1);
    this.updateCartDisplay();
    this.renderCartItems();
  }

  increaseQuantity(index) {
    if (this.cartItems[index].quantity < this.cartItems[index].stock) {
      this.cartItems[index].quantity += 1;
    } else {
      alert('Cannot add more items than available in stock.');
    }
    this.updateCartDisplay();
    this.renderCartItems();
  }

  decreaseQuantity(index) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
    }
    this.updateCartDisplay();
    this.renderCartItems();
  }

  updateCartDisplay() {
    itemsCount.text(this.cartItems.length);
    if (this.cartItems.length > 0) {
      emptyCartMessage.addClass("d-none");
    } else {
      emptyCartMessage.removeClass("d-none");
    }
  }

  renderCartItems() {
    if (this.cartItems.length === 0) {
      emptyCartMessage.removeClass("d-none");
      cartItemsContainer.html("");
    } else {
      emptyCartMessage.addClass("d-none");
      cartItemsContainer.html(
        this.cartItems.map((item, index) => 
          `<li class="cart-item d-flex justify-content-between align-items-center mb-2">
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
          </li>`
        ).join("")
      );
    }
  }
}
