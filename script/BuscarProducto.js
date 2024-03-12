"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
function setModalSearch() {
    var modalTitle = document.getElementById("modal-title");
    var modalBody = document.getElementById("modal-body");
    var modalFooter = document.getElementById("modal-footer");
    modalTitle.textContent = "Search Product";
    modalBody.innerHTML = "\n  <div class=\"modal-body p-5 my-0\">\n    <form class=\"needs-validation\" autocomplete=\"off\" name=\"modalForm\" novalidate netlify>\n\n      <div class=\"mb-2\">\n        <label for=\"nameInput\" class=\"form-label\">Name</label>\n        <input type=\"text\" class=\"form-control\" id=\"nameInput\" name=\"nameInput\" placeholder=\"Enter Name\" required>\n        <div class=\"valid-feedback\">\n          Looks good!\n        </div>\n        <div class=\"invalid-feedback\">\n          Please enter the product's name.\n        </div>\n      </div>\n\n      <div class=\"mb-2\">\n        <label for=\"priceInput\">Maximum Price</label>\n        <div class=\"input-group\">\n          <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\" id=\"inputGroupPrepend\">$</span>\n          </div>\n          <input type=\"number\" class=\"form-control\" id=\"maxpriceInput\"  aria-describedby=\"inputGroupPrepend\" required>\n          <div class=\"invalid-feedback\">\n            Please enter the maximum product's price\n          </div>\n        </div>\n      </div>\n\n      <div class=\"mb-2\">\n        <label for=\"categoryInput\" class=\"form-label\">Category</label>\n        <select class=\"form-select\" id=\"categoryInput\" required>\n          <option selected disabled value=\"\">Choose a category</option>\n        </select>\n        <div class=\"invalid-feedback\">\n          Please select the product's category.\n        </div>\n      </div>\n\n    </form>\n  </div>\n  ";
    modalFooter.innerHTML = "\n  <div>\n    <button id=\"searchBtn\" type=\"submit\" class=\"btn btn-primary\">Search</button>\n  </div>\n  ";
    (0, index_1.populateCategories)();
    var searchBtn = document.getElementById("searchBtn");
    searchBtn.onclick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var form = document.querySelector('.needs-validation');
        var nameInput = document.getElementById("nameInput");
        var maxPriceInput = document.getElementById("maxpriceInput");
        var categoryInput = document.getElementById("categoryInput");
        form.classList.add('was-validated');
        if (!form.checkValidity()) {
            return;
        }
        searchProducts(nameInput.value, parseFloat(maxPriceInput.value), categoryInput.value);
    };
}
function searchProducts(name, maxPrice, category) {
    fetch("https://dummyjson.com/products/search?q=".concat(name))
        .then(function (res) { return res.json(); })
        .then(function (data) {
        var products = data.products;
        var filteredProducts = products.filter(function (product) {
            return product.price <= maxPrice && product.category === category;
        });
        (0, index_1.displayProducts)(filteredProducts, 0, true);
    });
}
