// Initialize variables
var products = [];
var productsContainer = document.getElementById("product-tabel-container");
var warningMessage = document.getElementById("warning-msg");
var tabelBody = document.getElementById("tabel-body");

// Function to render data
function handelREnderData() {
    if (products.length !== 0) {
        // If products are available, display the table and hide the warning message
        productsContainer.classList.remove("d-none");
        productsContainer.classList.add("d-block");
        warningMessage.classList.add("d-none");
        warningMessage.classList.remove("d-block");

        var rows_elements = "";

        // Create table rows for each product
        for (var i = 0; i < products.length; i++) {
            rows_elements += `
                <tr>
                    <th>${i + 1}</th>
                    <td>${products[i].name}</td>
                    <td>${products[i].cat}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].desc}</td>
                    <td>
                        <button class="btn btn-outline-success" onclick="editProduct(${i})">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-outline-danger" onclick="deleteProduct(${i})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }

        tabelBody.innerHTML = rows_elements;
    } else {
        // If no products, hide the table and display the warning message
        warningMessage.classList.remove("d-none");
        warningMessage.classList.add("d-block");
        productsContainer.classList.add("d-none");
        productsContainer.classList.remove("d-block");
    }
}

// Handle form submission
var productName = document.getElementById("product_name");
var productCat = document.getElementById("product_category");
var productPrice = document.getElementById("product_price");
var productDesc = document.getElementById("prodct_desc");
var createBtn = document.getElementById("create-btn");
var productForm = document.getElementById("product-form");

productForm.onsubmit = function (event) {
    event.preventDefault();

    // Validate form inputs
    if (!productName.value || !productCat.value || !productPrice.value || !productDesc.value) {
        alert("Empty data cannot be added");
        return;
    }

    var product = {
        name: productName.value,
        cat: productCat.value,
        price: productPrice.value,
        desc: productDesc.value,
    };

    // Check if adding a new product or updating an existing one
    if (createBtn.textContent === "Add Product") {
        products.push(product);
    } else {
        var index = createBtn.getAttribute('data-index');
        products[index] = product;
        createBtn.textContent = "Add Product";
    }

    handelREnderData();
    productForm.reset();
};

// Handle clear button click
document.querySelector(".btn-primary:nth-of-type(2)").onclick = function (event) {
    event.preventDefault();
    productForm.reset();
};

// Edit product function
function editProduct(index) {
    var product = products[index];
    productName.value = product.name;
    productCat.value = product.cat;
    productPrice.value = product.price;
    productDesc.value = product.desc;
    createBtn.textContent = "Update Product";
    createBtn.setAttribute('data-index', index);
}

//Delete
// function deleteProduct(index) {
//   if (confirm("Are you sure you want to delete this product?")) {
//       products.splice(index, 1);
//       handelREnderData();
//   }
// }

// Delete product function with SweetAlert confirmation
function deleteProduct(index) {
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
            products.splice(index, 1);
            handelREnderData();
            Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
            )
        }
    });
}

// Initial rendering of data
handelREnderData();
