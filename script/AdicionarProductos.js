"use strict";
function setModalAdd() {
    //CREATING MODAL
    let modalTitle = document.getElementById("modal-title");
    if (modalTitle)
        modalTitle.textContent = "Add Product";
    let modalBody = document.getElementById("modal-body");
    if (modalBody)
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
            Please enter the product´s name.
          </div>
        </div>

        <div class="mb-2">
          <label for="descriptionInput" class="form-label">Description</label>
          <textarea class="form-control" id="descriptionInput" placeholder="Enter description" required></textarea>
          <div class="valid-feedback">
            Looks good!
          </div>
          <div class="invalid-feedback">
            Please enter the product´s description.
          </div>
        </div>

        <div class="row mb-2 g-2">
          <div class="col">
            <label for="categoryInput" class="form-label">Category</label>
            <select class="form-select" id="categoryInput" required>
              <option selected disabled value="">Choose a category</option>
            </select>
            <div class="invalid-feedback">
              Please select the product´s category.
            </div>
          </div>

          <div class="col">
            <label for="brandInput" class="form-label">Brand</label>
            <select class="form-select" id="brandInput" required>
              <option selected disabled value="">Choose a brand</option>
            </select>
            <div class="invalid-feedback">
              Please select the product´s brand.
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
              <input type="number" class="form-control" id="priceInput"  aria-describedby="inputGroupPrepend" required>
              <div class="invalid-feedback">
                Please enter the product´s price
              </div>
            </div>
          </div>

          <div class="col">
            <label for="discountInput">Discount</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupPrepend">%</span>
              </div>
              <input type="number" step="0.01" class="form-control" id="discountInput"  aria-describedby="inputGroupPrepend" required>
              <div class="invalid-feedback">
              Please enter the product´s discount
              </div>
            </div>
          </div>

          <div class="col">
            <label for="ratingInput">Rating</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupPrepend">★</span>
              </div>
              <input type="number" step="0.01" class="form-control" id="ratingInput"  aria-describedby="inputGroupPrepend" required>
              <div class="invalid-feedback">
              Please enter the product´s rating
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <label for="stockInput" class="form-label">Stock</label>
          <div class="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend">#</span>
            <input type="number" class="form-control" id="stockInput" aria-describedby="inputGroupPrepend" required>
            <div class="invalid-feedback">
              Please choose a username.
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="thumbnailInput">Thumbnail</label>
          <input id="thumbnailInput" type="file" class="form-control" aria-label="file example">
          <div class="invalid-feedback">Example invalid form file feedback</div>
        </div>

        <div class="mb-3">
          <label for="imagesInput">Images</label>
          <input id="imagesInput" type="file" class="form-control" aria-label="file example" multiple>
          <div class="invalid-feedback">Example invalid form file feedback</div>
        </div>

        <button id="submitBtn" type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    `;
    // Populate category select
    fetch("https://dummyjson.com/products/categories")
        .then((response) => response.json())
        .then((categories) => {
        const selectElement = document.getElementById("categoryInput");
        if (selectElement) {
            categories.forEach((category) => {
                const option = document.createElement("option");
                option.text = category;
                option.value = category;
                selectElement.add(option);
            });
        }
    })
        .catch((error) => {
        console.error("Error fetching categories:", error);
    });
    fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((data) => {
        const products = data.products;
        const brands = [];
        // Extract all unique brands
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            if (brands.indexOf(product.brand) === -1) {
                brands.push(product.brand);
            }
        }
        // Populate the select dropdown with brand options
        const brandInput = document.getElementById("brandInput");
        if (brandInput) {
            brands.forEach((brand) => {
                const option = document.createElement("option");
                option.value = brand;
                option.textContent = brand;
                brandInput.appendChild(option);
            });
        }
    })
        .catch((error) => {
        console.error("Error fetching data:", error);
    });
    //VALIDATE FILLED INPUTS
    const form = document.querySelector('form[name="modalForm"]');
    if (form) {
        form.addEventListener("submit", function (event) {
            const nameInput = document.getElementById("nameInput");
            const descriptionInput = document.getElementById("descriptionInput");
            const categoryInput = document.getElementById("categoryInput");
            const brandInput = document.getElementById("brandInput");
            const priceInput = document.getElementById("priceInput");
            const discountInput = document.getElementById("discountInput");
            const ratingInput = document.getElementById("ratingInput");
            const stockInput = document.getElementById("stockInput");
            const thumbnailInput = document.getElementById("thumbnailInput");
            const imagesInput = document.getElementById("imagesInput");
            event.preventDefault(); // para que no redireccione cuando se manda
            if (form.checkValidity()) {
                postData();
            }
            else {
                event.stopPropagation();
            }
            form.classList.add("was-validated");
        }, false);
    }
}
function postData() {
    console.log('postData function called');
    let title = document.getElementById("nameInput").value;
    let thumbnail = document.getElementById("thumbnailInput").value;
    let description = document.getElementById("descriptionInput").value;
    let stock = document.getElementById("stockInput").value;
    let brand = document.getElementById("brandInput").value;
    let category = document.getElementById("categoryInput").value;
    let price = document.getElementById("priceInput").value;
    let rating = document.getElementById("ratingInput").value;
    let images = document.getElementById("imagesInput").value;
    let data = {
        title,
        thumbnail,
        description,
        stock,
        brand,
        category,
        price,
        rating,
        images,
    };
    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
        var _a;
        console.log('Success:', data);
        //getAllProducts(); //si se fuera a actualizar de verdad
        showSuccessAlert();
        // Hide the modal using Bootstrap's modal method
        let modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
            (_a = modalBackdrop.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(modalBackdrop);
        }
        let modal = document.getElementById('staticBackdrop');
        if (modal) {
            modal.style.display = 'none';
        }
        // Ensure body overflow is restored to scroll
        document.body.style.overflow = 'auto';
    })
        .catch((error) => {
        console.error('Error:', error);
    });
}
function showSuccessAlert() {
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert', 'alert-success');
    alertElement.setAttribute('role', 'alert');
    alertElement.textContent = "Operation was successful!";
    let alertMessage = document.getElementById('alert-messages');
    if (!alertMessage) {
        return;
    }
    alertMessage.appendChild(alertElement);
    // Quita la alerta
    setTimeout(() => {
        alertElement.remove();
    }, 5000);
}
