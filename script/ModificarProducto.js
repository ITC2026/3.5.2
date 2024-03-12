"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function setModalModify(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://dummyjson.com/products/${id}`);
            const data = yield response.json();
            const product = data;
            const modalTitle = document.getElementById("modal-title");
            modalTitle.textContent = "Modify Product";
            const modalBody = document.getElementById("modal-body");
            modalBody.innerHTML = `
      <div class="modal-body p-5 my-0">
      <form class="needs-validation" autocomplete="off" name="modalForm" novalidate netlify>
  
        <div class="mb-2">
          <label for="nameInput" class="form-label">Name</label>
          <input type="text" class="form-control" id="nameInput" name="nameInput" value="${product.title}" required>
          <div class="valid-feedback">
            Looks good!
          </div>
          <div class="invalid-feedback">
            Please enter the product's name.
          </div>
        </div>
  
        <div class="mb-2">
          <label for="descriptionInput" class="form-label">Description</label>
          <textarea class="form-control" id="descriptionInput" required>${product.description}</textarea>
          <div class="valid-feedback">
            Looks good!
          </div>
          <div class="invalid-feedback">
            Please enter the product's description.
          </div>
        </div>
  
        <div class="row mb-2 g-2">
          <div class="col">
            <label for="categoryInput" class="form-label">Category</label>
            <select class="form-select" id="categoryInput" required>
              <option selected disabled value="${product.category}">${product.category}</option>
            </select>
            <div class="invalid-feedback">
              Please select the product's category.
            </div>
          </div>

          
          
          <div class="col">
            <label for="brandInput" class="form-label">Brand</label>
            <select class="form-select" id="brandInput" required>
              <option selected disabled value="${product.brand}">${product.brand}</option>
            </select>
            <div class="invalid-feedback">
              Please select the product's brand.
            </div>
          </div>
        </div>
  
        <div class="row mb-2 g-2">
          <div class="col">
            <label for="priceInput">Price</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupPrepend">$</span>
              </div>
              <input type="number" class="form-control" id="priceInput" value="${product.price}" aria-describedby="inputGroupPrepend" required>
              <div class="invalid-feedback">
                Please enter the product's price
              </div>
            </div>
          </div>
  
          <div class="col">
            <label for="discountInput">Discount</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupPrepend">%</span>
              </div>
              <input type="number" class="form-control" id="discountInput" value="${product.discountPercentage}" aria-describedby="inputGroupPrepend" required>
              <div class="invalid-feedback">
              Please enter the product's discount
              </div>
            </div>
          </div>
  
          <div class="col">
            <label for="ratingInput">Rating</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupPrepend">★</span>
              </div>
              <input type="number" class="form-control" id="ratingInput" value="${product.rating}" aria-describedby="inputGroupPrepend" required>
              <div class="invalid-feedback">
              Please enter the product's rating
              </div>
            </div>
          </div>
        </div>
  
        <div class="col-md-4">
          <label for="stockInput" class="form-label">Stock</label>
          <div class="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend">#</span>
            <input type="number" class="form-control" id="stockInput" value="${product.stock}" aria-describedby="inputGroupPrepend" required>
            <div class="invalid-feedback">
              Please enter the product's stock 
            </div>
          </div>
        </div>
  
        <div class="mb-3">
          <label for="thumbnailInput">Thumbnail</label>
          <input id="thumbnailInput" type="url" class="form-control" value="${product.thumbnail}" aria-label="file example" required>
          <div class="invalid-feedback">Example invalid form file feedback</div>
        </div>
  
        <div class="mb-3">
          <label for="imagesInput">Images</label>
          <input id="imagesInput" type="url" class="form-control" value="${product.images}" aria-label="file example" multiple required>
          <div class="invalid-feedback">Example invalid form file feedback</div>
        </div>
  
        <button id="submitBtn" type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
     
      `;
            // Populate category select
            const categoriesResponse = yield fetch('https://dummyjson.com/products/categories');
            const categories = yield categoriesResponse.json();
            const selectElement = document.getElementById('categoryInput');
            categories.forEach((category) => {
                const option = document.createElement('option');
                option.text = category;
                option.value = category;
                selectElement.add(option);
            });
            const productsResponse = yield fetch('https://dummyjson.com/products');
            const productsData = yield productsResponse.json();
            const products = productsData.products;
            const brands = [];
            // Extract all unique brands
            products.forEach((product) => {
                if (!brands.includes(product.brand)) {
                    brands.push(product.brand);
                }
            });
            // Populate the select dropdown with brand options
            const brandInput = document.getElementById('brandInput');
            brands.forEach((brand) => {
                const option = document.createElement('option');
                option.value = brand;
                option.textContent = brand;
                brandInput.appendChild(option);
            });
            // VALIDATE FILLED INPUTS
            const form = document.forms.namedItem('modalForm');
            form.addEventListener('submit', (event) => {
                const nameInput = document.getElementById('nameInput');
                const descriptionInput = document.getElementById('descriptionInput');
                const categoryInput = document.getElementById('categoryInput');
                const brandInput = document.getElementById('brandInput');
                const priceInput = document.getElementById('priceInput');
                const discountInput = document.getElementById('discountInput');
                const ratingInput = document.getElementById('ratingInput');
                const stockInput = document.getElementById('stockInput');
                const thumbnailInput = document.getElementById('thumbnailInput');
                const imagesInput = document.getElementById('imagesInput');
                event.preventDefault(); // para que no redireccione cuando se manda
                form.classList.add('was-validated');
                if (!nameInput.checkValidity() || !descriptionInput.checkValidity()
                    || !brandInput.checkValidity() || !priceInput.checkValidity()
                    || !discountInput.checkValidity() || !ratingInput.checkValidity()
                    || !stockInput.checkValidity() || !thumbnailInput.checkValidity()
                    || !categoryInput.checkValidity() || !imagesInput.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                }
                // Posts answers
                postData();
            }, false);
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
