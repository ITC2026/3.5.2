import { displayProducts, populateCategories } from "./index.js";
function setModalSearch() {
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");
    const modalFooter = document.getElementById("modal-footer");
    modalTitle.textContent = "Search Product";
    modalBody.innerHTML = `
  <div class="modal-body p-5 my-0">
    <form class="needs-validation" autocomplete="off" name="modalForm" novalidate netlify>

      <div class="mb-2">
        <label for="nameInput" class="form-label">Name</label>
        <input type="text" class="form-control" id="nameInput" name="nameInput" placeholder="Enter Name" required>
        <div class="valid-feedback">
          Looks good!
        </div>
        <div class="invalid-feedback">
          Please enter the product's name.
        </div>
      </div>

      <div class="mb-2">
        <label for="priceInput">Maximum Price</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroupPrepend">$</span>
          </div>
          <input type="number" class="form-control" id="maxpriceInput"  aria-describedby="inputGroupPrepend" required>
          <div class="invalid-feedback">
            Please enter the maximum product's price
          </div>
        </div>
      </div>

      <div class="mb-2">
        <label for="categoryInput" class="form-label">Category</label>
        <select class="form-select" id="categoryInput" required>
          <option selected disabled value="">Choose a category</option>
        </select>
        <div class="invalid-feedback">
          Please select the product's category.
        </div>
      </div>

    </form>
  </div>
  `;
    modalFooter.innerHTML = `
  <div>
    <button id="searchBtn" type="submit" class="btn btn-primary">Search</button>
  </div>
  `;
    populateCategories();
    const searchBtn = document.getElementById("searchBtn");
    searchBtn.onclick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = document.querySelector('.needs-validation');
        const nameInput = document.getElementById("nameInput");
        const maxPriceInput = document.getElementById("maxpriceInput");
        const categoryInput = document.getElementById("categoryInput");
        form.classList.add('was-validated');
        if (!form.checkValidity()) {
            return;
        }
        searchProducts(nameInput.value, parseFloat(maxPriceInput.value), categoryInput.value);
    };
}
function searchProducts(name, maxPrice, category) {
    fetch(`https://dummyjson.com/products/search?q=${name}`)
        .then((res) => res.json())
        .then((data) => {
        let { products } = data;
        const filteredProducts = products.filter(product => {
            return product.price <= maxPrice && product.category === category;
        });
        displayProducts(filteredProducts, 0, true);
    });
}
