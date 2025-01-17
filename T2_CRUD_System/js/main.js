// // Initialize variables
// let products = JSON.parse(localStorage.getItem('products')) || [];
// let filteredProducts = [];
// const productsContainer = document.getElementById("product-tabel-container");
// const warningMessage = document.getElementById("warning-msg");
// const tabelBody = document.getElementById("tabel-body");
// const productForm = document.getElementById("product-form");
// const productName = document.getElementById("product_name");
// const productCat = document.getElementById("product_category");
// const productPrice = document.getElementById("product_price");
// const productDesc = document.getElementById("prodct_desc");
// const createBtn = document.getElementById("create-btn");
// const searchInput = document.getElementById("search-input");

// // Validation patterns
// const namePattern = /^[a-zA-Z\s]+$/;
// const categoryPattern = /^[a-zA-Z\s]+$/;
// const pricePattern = /^\d+(\.\d{1,2})?$/;

// // Helper function to create table rows
// const createTableRow = (product, index) => {
//     const tr = document.createElement('tr');
//     tr.classList.add('fade-in');

//     const th = document.createElement('th');
//     th.textContent = index + 1;
//     tr.appendChild(th);

//     const tdName = document.createElement('td');
//     tdName.textContent = product.name;
//     tr.appendChild(tdName);

//     const tdCat = document.createElement('td');
//     tdCat.textContent = product.cat;
//     tr.appendChild(tdCat);

//     const tdPrice = document.createElement('td');
//     tdPrice.textContent = product.price;
//     tr.appendChild(tdPrice);

//     const tdDesc = document.createElement('td');
//     tdDesc.textContent = product.desc;
//     tr.appendChild(tdDesc);

//     const tdEdit = document.createElement('td');
//     const editBtn = document.createElement('button');
//     editBtn.classList.add('btn', 'btn-outline-success');
//     editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
//     editBtn.onclick = () => editProduct(index);
//     tdEdit.appendChild(editBtn);
//     tr.appendChild(tdEdit);

//     const tdDelete = document.createElement('td');
//     const deleteBtn = document.createElement('button');
//     deleteBtn.classList.add('btn', 'btn-outline-danger');
//     deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
//     deleteBtn.onclick = () => deleteProduct(index);
//     tdDelete.appendChild(deleteBtn);
//     tr.appendChild(tdDelete);

//     return tr;
// };

// // Function to render data
// const renderData = () => {
//     const productsToRender = searchInput.value ? filteredProducts : products;

//     if (productsToRender.length !== 0) {
//         productsContainer.classList.replace("d-none", "d-block");
//         warningMessage.classList.replace("d-block", "d-none");

//         tabelBody.innerHTML = ''; // Clear existing rows
//         productsToRender.forEach((product, index) => {
//             const row = createTableRow(product, index);
//             tabelBody.appendChild(row);
//         });
//     } else {
//         tabelBody.innerHTML = ''; // Clear existing rows
//         productsContainer.classList.replace("d-block", "d-none");
//         warningMessage.classList.replace("d-none", "d-block");
//     }
// };

// // Function to validate form inputs
// const validateForm = () => {
//     if (!namePattern.test(productName.value)) {
//         alert("Invalid product name. Only letters and spaces are allowed.");
//         return false;
//     }
//     if (!categoryPattern.test(productCat.value)) {
//         alert("Invalid product category. Only letters and spaces are allowed.");
//         return false;
//     }
//     if (!pricePattern.test(productPrice.value)) {
//         alert("Invalid product price. Only numbers and up to two decimal places are allowed.");
//         return false;
//     }
//     if (!productDesc.value) {
//         alert("Product description cannot be empty.");
//         return false;
//     }
//     return true;
// };

// // Save products to local storage
// const saveToLocalStorage = () => {
//     localStorage.setItem('products', JSON.stringify(products));
// };

// // Handle form submission
// productForm.onsubmit = (event) => {
//     event.preventDefault();

//     if (!validateForm()) {
//         return;
//     }

//     const product = {
//         name: productName.value,
//         cat: productCat.value,
//         price: productPrice.value,
//         desc: productDesc.value,
//     };

//     const index = createBtn.getAttribute('data-index');

//     if (createBtn.textContent === "Add Product") {
//         products.push(product);
//     } else {
//         products[index] = product;
//         createBtn.textContent = "Add Product";
//         createBtn.removeAttribute('data-index');
//     }

//     saveToLocalStorage();
//     renderData();
//     productForm.reset();
// };

// // Handle clear button click
// document.querySelector(".btn-primary:nth-of-type(2)").onclick = (event) => {
//     event.preventDefault();
//     productForm.reset();
// };

// // Edit product function
// const editProduct = (index) => {
//     const product = products[index];
//     productName.value = product.name;
//     productCat.value = product.cat;
//     productPrice.value = product.price;
//     productDesc.value = product.desc;
//     createBtn.textContent = "Update Product";
//     createBtn.setAttribute('data-index', index);
// };

// //Delete
// // function deleteProduct(index) {
// //   if (confirm("Are you sure you want to delete this product?")) {
// //       products.splice(index, 1);
// //       handelREnderData();
// //   }
// // }

// // Delete product function with SweetAlert confirmation
// const deleteProduct = (index) => {
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             products.splice(index, 1);
//             saveToLocalStorage();
//             renderData();
//             Swal.fire(
//                 'Deleted!',
//                 'Your product has been deleted.',
//                 'success'
//             );
//         }
//     });
// };

// // Handle search input on key up
// searchInput.onkeyup = function () {
//     const searchText = searchInput.value.toLowerCase();
//     filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchText));
//     renderData();
// }

// // Initial rendering of data
// renderData();

//•	Refactor the CRUD project using the OOP paradigm.

class Product {
  constructor(name, category, price, description) {
    this.name = name;
    this.category = category;
    this.price = price;
    this.description = description;
  }
}

class ProductManager {
  constructor() {
    this.products = JSON.parse(localStorage.getItem('products')) || [];
    this.filteredProducts = [];
    this.productsContainer = document.getElementById("product-table-container");
    this.warningMessage = document.getElementById("warning-msg");
    this.tableBody = document.getElementById("table-body");
    this.productForm = document.getElementById("product-form");
    this.productName = document.getElementById("product_name");
    this.productCategory = document.getElementById("product_category");
    this.productPrice = document.getElementById("product_price");
    this.productDesc = document.getElementById("product_desc");
    this.createBtn = document.getElementById("create-btn");
    this.searchInput = document.getElementById("search-input");

    this.namePattern = /^[a-zA-Z\s]+$/;
    this.categoryPattern = /^[a-zA-Z\s]+$/;
    this.pricePattern = /^\d+(\.\d{1,2})?$/;

    this.productForm.onsubmit = (event) => this.handleFormSubmit(event);
    document.querySelector(".btn-primary:nth-of-type(2)").onclick = (event) => this.handleClear(event);
    this.searchInput.onkeyup = () => this.handleSearch();

    this.renderData();
  }

  saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  createTableRow(product, index) {
    const tr = document.createElement('tr');
    tr.classList.add('fade-in');

    tr.innerHTML = `
      <th>${index + 1}</th>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${product.price}</td>
      <td>${product.description}</td>
      <td><button class="btn btn-outline-success" onclick="productManager.editProduct(${index})"><i class="fa-solid fa-pen-to-square"></i></button></td>
      <td><button class="btn btn-outline-danger" onclick="productManager.deleteProduct(${index})"><i class="fa-solid fa-trash"></i></button></td>
    `;

    return tr;
  }

  renderData() {
    const productsToRender = this.searchInput.value ? this.filteredProducts : this.products;

    if (productsToRender.length !== 0) {
      this.productsContainer.classList.replace("d-none", "d-block");
      this.warningMessage.classList.replace("d-block", "d-none");

      this.tableBody.innerHTML = ''; // Clear existing rows
      productsToRender.forEach((product, index) => {
        const row = this.createTableRow(product, index);
        this.tableBody.appendChild(row);
      });
    } else {
      this.tableBody.innerHTML = ''; // Clear existing rows
      this.productsContainer.classList.replace("d-block", "d-none");
      this.warningMessage.classList.replace("d-none", "d-block");
    }
  }

  validateForm() {
    if (!this.namePattern.test(this.productName.value)) {
      alert("Invalid product name. Only letters and spaces are allowed.");
      return false;
    }
    if (!this.categoryPattern.test(this.productCategory.value)) {
      alert("Invalid product category. Only letters and spaces are allowed.");
      return false;
    }
    if (!this.pricePattern.test(this.productPrice.value)) {
      alert("Invalid product price. Only numbers and up to two decimal places are allowed.");
      return false;
    }
    if (!this.productDesc.value) {
      alert("Product description cannot be empty.");
      return false;
    }
    return true;
  }

  handleFormSubmit(event) {
    event.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    const product = new Product(
      this.productName.value,
      this.productCategory.value,
      this.productPrice.value,
      this.productDesc.value
    );

    const index = this.createBtn.getAttribute('data-index');

    if (this.createBtn.textContent === "Add Product") {
      this.products.push(product);
    } else {
      this.products[index] = product;
      this.createBtn.textContent = "Add Product";
      this.createBtn.removeAttribute('data-index');
    }

    this.saveToLocalStorage();
    this.renderData();
    this.productForm.reset();
  }

  handleClear(event) {
    event.preventDefault();
    this.productForm.reset();
  }

  editProduct(index) {
    const product = this.products[index];
    this.productName.value = product.name;
    this.productCategory.value = product.category;
    this.productPrice.value = product.price;
    this.productDesc.value = product.description;
    this.createBtn.textContent = "Update Product";
    this.createBtn.setAttribute('data-index', index);
  }

  deleteProduct(index) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.products.splice(index, 1);
        this.saveToLocalStorage();
        this.renderData();
        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        );
      }
    });
  }

  handleSearch() {
    const searchText = this.searchInput.value.toLowerCase();
    this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(searchText));
    this.renderData();
  }
}

const productManager = new ProductManager();
