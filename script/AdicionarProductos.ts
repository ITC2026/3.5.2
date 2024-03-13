function setModalAdd(): void {
  //CREATING MODAL
  let modalTitle: HTMLElement | null = document.getElementById("modal-title");
  if (modalTitle) modalTitle.textContent = "Add Product";

  let modalBody: HTMLElement | null = document.getElementById("modal-body");
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
            Please enter the product's name.
          </div>
        </div>

        <div class="mb-2">
          <label for="descriptionInput" class="form-label">Description</label>
          <textarea class="form-control" id="descriptionInput" placeholder="Enter description" required></textarea>
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
              <option selected disabled value="">Choose a category</option>
            </select>
            <div class="invalid-feedback">
              Please select the product's category.
            </div>
          </div>

          <div class="col">
            <label for="brandInput" class="form-label">Brand</label>
            <select class="form-select" id="brandInput" required>
              <option selected disabled value="">Choose a brand</option>
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
              <input type="number" class="form-control" id="priceInput"  aria-describedby="inputGroupPrepend" required>
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
              <input type="number" step="0.01" min="0" max="100" class="form-control" id="discountInput"  aria-describedby="inputGroupPrepend" required>
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
              <input type="number" step="0.01" min="0" max="5" class="form-control" id="ratingInput"  aria-describedby="inputGroupPrepend" required>
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
            <input type="number" class="form-control" id="stockInput" aria-describedby="inputGroupPrepend" required>
            <div class="invalid-feedback">
            Please enter the product's stock
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="thumbnailInput">Thumbnail</label>
          <input id="thumbnailInput" type="file" class="form-control" aria-label="file example" required>
          <div class="invalid-feedback">Invalid form file</div>
        </div>

        <div class="mb-3">
          <label for="imagesInput">Images</label>
          <input id="imagesInput" type="file" class="form-control" aria-label="file example" multiple required>
          <div class="invalid-feedback">Invalid form file</div>
        </div>

        <button id="submitBtn" type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    `;

  let modalFooter: HTMLElement | null = document.getElementById("modal-footer");

  if (!modalFooter) {
    return;
  }

  modalFooter.innerHTML = ``; // Clear the footer

  // Populate category select
  fetch("https://dummyjson.com/products/categories")
    .then((response) => response.json())
    .then((categories: string[]) => {
      const selectElement: HTMLSelectElement | null = document.getElementById(
        "categoryInput"
      ) as HTMLSelectElement | null;
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
    .then((data: { products: { brand: string }[] }) => {
      const products = data.products;
      const brands: string[] = [];

      // Extract all unique brands
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (brands.indexOf(product.brand) === -1) {
          brands.push(product.brand);
        }
      }

      // Populate the select dropdown with brand options
      const brandInput: HTMLSelectElement | null = document.getElementById(
        "brandInput"
      ) as HTMLSelectElement | null;
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
  const form: HTMLFormElement | null = document.querySelector(
    'form[name="modalForm"]'
  );
  if (form) {
    form.addEventListener(
      "submit",
      function (event) {
        const nameInput: HTMLInputElement | null = document.getElementById(
          "nameInput"
        ) as HTMLInputElement | null;
        const descriptionInput: HTMLTextAreaElement | null =
          document.getElementById(
            "descriptionInput"
          ) as HTMLTextAreaElement | null;
        const categoryInput: HTMLSelectElement | null = document.getElementById(
          "categoryInput"
        ) as HTMLSelectElement | null;
        const brandInput: HTMLSelectElement | null = document.getElementById(
          "brandInput"
        ) as HTMLSelectElement | null;
        const priceInput: HTMLInputElement | null = document.getElementById(
          "priceInput"
        ) as HTMLInputElement | null;
        const discountInput: HTMLInputElement | null = document.getElementById(
          "discountInput"
        ) as HTMLInputElement | null;
        const ratingInput: HTMLInputElement | null = document.getElementById(
          "ratingInput"
        ) as HTMLInputElement | null;
        const stockInput: HTMLInputElement | null = document.getElementById(
          "stockInput"
        ) as HTMLInputElement | null;
        const thumbnailInput: HTMLInputElement | null = document.getElementById(
          "thumbnailInput"
        ) as HTMLInputElement | null;
        const imagesInput: HTMLInputElement | null = document.getElementById(
          "imagesInput"
        ) as HTMLInputElement | null;

        event.preventDefault(); // para que no redireccione cuando se manda
        if (form.checkValidity()) {
          postData();
        } else {
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  }
}

function postData(): void {
  console.log('postData function called');
  let title: string = (document.getElementById("nameInput") as HTMLInputElement).value;
  let thumbnail: string = (document.getElementById("thumbnailInput") as HTMLInputElement).value;
  let description: string = (document.getElementById("descriptionInput") as HTMLTextAreaElement).value;
  let stock: string = (document.getElementById("stockInput") as HTMLInputElement).value;
  let brand: string = (document.getElementById("brandInput") as HTMLSelectElement).value;
  let category: string = (document.getElementById("categoryInput") as HTMLSelectElement).value;
  let price: string = (document.getElementById("priceInput") as HTMLInputElement).value;
  let rating: string = (document.getElementById("ratingInput") as HTMLInputElement).value;
  let images: string = (document.getElementById("imagesInput") as HTMLInputElement).value;

  let data: object = {
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
      console.log('Success:', data);
      //getAllProducts(); //si se fuera a actualizar de verdad
      showSuccessAlert();
      // Hide the modal using Bootstrap's modal method
      let modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.parentNode?.removeChild(modalBackdrop);
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

  

function showSuccessAlert(): void {
  const alertElement: HTMLDivElement = document.createElement('div');
  alertElement.classList.add('alert', 'alert-success');
  alertElement.setAttribute('role', 'alert');
  alertElement.textContent = "Operation was successful!";

  let alertMessage = document.getElementById('alert-messages');

  if (!alertMessage) {
    return 
  }

  alertMessage.appendChild(alertElement);

  // Quita la alerta
  setTimeout(() => {
    alertElement.remove();
  }, 5000);
}
