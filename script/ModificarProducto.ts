async function setModalModify(id: string): Promise<void> {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      const product = data;
  
      const modalTitle = document.getElementById("modal-title")!;
      modalTitle.textContent = "Modify Product";
  
      const modalBody = document.getElementById("modal-body")!;
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

      let modalFooter = document.getElementById("modal-footer")!;
      modalFooter.innerHTML = ``; // Clear the footer
  
      // Populate category select
      const categoriesResponse = await fetch('https://dummyjson.com/products/categories');
      const categories = await categoriesResponse.json();
      const selectElement = document.getElementById('categoryInput') as HTMLSelectElement;
      categories.forEach((category: string) => {
        const option = document.createElement('option');
        option.text = category;
        option.value = category;
        selectElement.add(option);
      });
  
      const productsResponse = await fetch('https://dummyjson.com/products');
      const productsData = await productsResponse.json();
      const products = productsData.products;
      const brands: string[] = [];
  
      // Extract all unique brands
      products.forEach((product: { brand: string }) => {
        if (!brands.includes(product.brand)) {
          brands.push(product.brand);
        }
      });
  
      // Populate the select dropdown with brand options
      const brandInput = document.getElementById('brandInput') as HTMLSelectElement;
      brands.forEach((brand: string) => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandInput.appendChild(option);
      });
  
      // VALIDATE FILLED INPUTS
      const form = document.forms.namedItem('modalForm')!;
      form.addEventListener('submit', (event) => {
        const nameInput = document.getElementById('nameInput') as HTMLInputElement;
        const descriptionInput = document.getElementById('descriptionInput') as HTMLTextAreaElement;
        const categoryInput = document.getElementById('categoryInput') as HTMLSelectElement;
        const brandInput = document.getElementById('brandInput') as HTMLSelectElement;
        const priceInput = document.getElementById('priceInput') as HTMLInputElement;
        const discountInput = document.getElementById('discountInput') as HTMLInputElement;
        const ratingInput = document.getElementById('ratingInput') as HTMLInputElement;
        const stockInput = document.getElementById('stockInput') as HTMLInputElement;
        const thumbnailInput = document.getElementById('thumbnailInput') as HTMLInputElement;
        const imagesInput = document.getElementById('imagesInput') as HTMLInputElement;
  
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
        postData(true);
      }, false);
    } catch (error) {
      console.error('Error:', error);
    }
  }
