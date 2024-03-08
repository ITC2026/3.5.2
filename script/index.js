function getAllProducts() {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      let { products } = data;
      let tbody = document.getElementById("tbody");
      let btnAdd = document.getElementById("AddProductButton");
      btnAdd.onclick = () => setModalAdd();
      btnAdd.setAttribute("data-bs-toggle", "modal");
      btnAdd.setAttribute("data-bs-target", "#staticBackdrop");

      tbody.innerHTML = `<tr>
            <th>Id</th>
            <th></th>
            <th>Title</th>
            <th>Description</th>
            <th>Discount %</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th><Modificar></th>
            <th><Eliminar></th>
            <th><Info></th>
          </tr>`;

      // CHANGE: Use array.map instead the traditional <for>
      for (let i = 0; i < products.length; i++) {
        // New table row
        let tr = document.createElement("tr");

        // Id cell
        let tdId = document.createElement("td");
        tdId.textContent = products[i].id;
        tr.appendChild(tdId);

        // Thumbnail cell
        let tdThumb = document.createElement("td");
        let img = document.createElement("img");
        img.src = products[i].thumbnail;
        img.width = 50;
        tdThumb.appendChild(img);
        tr.appendChild(tdThumb);

        // Title cell
        let tdTitle = document.createElement("td");
        tdTitle.textContent = products[i].title;
        tr.appendChild(tdTitle);

        // Desc cell
        let tdDesc = document.createElement("td");
        tdDesc.textContent = products[i].description;
        tr.appendChild(tdDesc);

        // Discount cell
        let tdDisc = document.createElement("td");
        // Ejemplo de uso de variables de js con texto ``
        tdDisc.textContent = `${products[i].discountPercentage} %`;
        tr.appendChild(tdDisc);

        // Brand cell
        let tdBrand = document.createElement("td");
        tdBrand.textContent = products[i].brand;
        tr.appendChild(tdBrand);

        // Category cell
        let tdCategory = document.createElement("td");
        tdCategory.textContent = products[i].category;
        tr.appendChild(tdCategory);

        // Price cell
        let tdPrice = document.createElement("td");
        tdPrice.textContent = "$ " + products[i].price;
        tr.appendChild(tdPrice);

        // Rating cell
        let tdRating = document.createElement("td");
        tdRating.textContent = products[i].rating;
        tr.appendChild(tdRating);

        // Eliminar cell
        let tdEl = document.createElement("td");
        let btnEl = document.createElement("button");
        btnEl.textContent = "Eliminar";
        btnEl.setAttribute("class", "btn btn-outline-secondary");
        tdEl.appendChild(btnEl);
        tr.appendChild(tdEl);

        // Modificar cell
        let tdMod = document.createElement("td");
        let btnMod = document.createElement("button");
        btnMod.textContent = "Modificar";
        btnMod.setAttribute("class", "btn btn-outline-secondary");
        btnMod.onclick = () => setModalModify(products[i].id);
        btnMod.setAttribute("data-bs-toggle", "modal");
        btnMod.setAttribute("data-bs-target", "#staticBackdrop");
        tdMod.appendChild(btnMod);

        tr.appendChild(tdMod);

        //Info de cell
        let tdInfo = document.createElement("td");
        let btnInfo = document.createElement("button");
        btnInfo.textContent = "Info";
        btnInfo.setAttribute("class", "btn btn-outline-secondary");
        btnInfo.onclick = () => setModalInfo(products[i].id);

        btnInfo.setAttribute("data-bs-toggle", "modal");
        btnInfo.setAttribute("data-bs-target", "#staticBackdrop");
        tdInfo.appendChild(btnInfo);

        tr.appendChild(tdInfo);

        // products[i].id
        tbody.appendChild(tr);
      }
    });
}

function setModalInfo(id) {
  fetch(`https://dummyjson.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      let product = data;
      let modalTitle = document.getElementById("modal-title");

      modalTitle.textContent = product.title;

      let modalBody = document.getElementById("modal-body");
      modalBody.innerHTML = `
        <div class="modal-body">
          <img src="${product.thumbnail}" width="100" />
          <p>${product.description}</p>
          <p>Brand: ${product.brand}</p>
          <p>Category: ${product.category}</p>
          <p>Price: $${product.price}</p>
          <p>Rating: ${product.rating}</p>
        </div>
        `;
      let modalFooter = document.getElementById("modal-footer");
      modalFooter.innerHTML = `
      <div>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Understood</button>
      </div>
          `;
    });
}

function setModalModify(id) {
  fetch(`https://dummyjson.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      let product = data;
      let modalTitle = document.getElementById("modal-title");

      modalTitle.textContent = "Modify Product";

      let modalBody = document.getElementById("modal-body");
      modalBody.innerHTML = `
        <div class="modal-body">
          <form>
            <label for="nameInput">Product Name:</label> 
            <input type="text" id="nameInput" name="productName" value="${product.title}">
            <br>

            <label for="thumbnailInput">Product Thumbnail:</label>
            <input type="text" id="thumbnailInput" name="productName" value="${product.thumbnail}">
            <br>

            <label for="descriptionInput">Product Description:</label>
            <input type="text" id="descriptionInput" name="productName" value="${product.description}">
            <br>

            <label for="brandInput">Product Brand:</label>
            <input type="text" id="brandInput" name="productName" value="${product.brand}">
            <br>

            <label for="categoryInput">Product Category:</label>
            <input type="text" id="categoryInput" name="productName" value="${product.category}">
            <br>

            <label for="priceInput">Product Price:</label>
            <input type="text" id="priceInput" name="productName" value="${product.price}">
            <br>

            <label for="ratingInput">Product Rating:</label>
            <input type="text" id="ratingInput" name="productName" value="${product.rating}">
            <br>

          </form>
        </div>
        `;
      let modalFooter = document.getElementById("modal-footer");
      modalFooter.innerHTML = `
        <div>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
        </div>
          `;
    });
}

function setModalAdd() {
  //CREATING MODAL
  let modalTitle = document.getElementById("modal-title");
  modalTitle.textContent = "Add Product";

  let modalBody = document.getElementById("modal-body");
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
    <label for="validationTextarea" class="form-label">Description</label>
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
        <input type="number" class="form-control" id="discountInput"  aria-describedby="inputGroupPrepend" required>
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
        <input type="number" class="form-control" id="ratingInput"  aria-describedby="inputGroupPrepend" required>
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



  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  </div>
`;

  const form = document.forms['modalForm'];
  form.addEventListener('submit', function(event) {
    const nameInput = document.getElementById('nameInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const categoryInput = document.getElementById('categoryInput');

    if (!nameInput.checkValidity() || !descriptionInput.checkValidity() || !categoryInput.checkValidity()) {
      event.preventDefault(); 
      event.stopPropagation(); 
    }
    form.classList.add('was-validated');
  }, false);
  //POST AFTER CLICKING FINISH BUTTON
  document
    .getElementById("finishButton")
    .addEventListener("click", function () {

      // TODO: Add validation for the inputs
      postData();
    });
}

/*
function hideModal() {
  document.getElementById("modal-body").setAttribute("aria-hidden", "true");
  document.getElementById("exampleModal").classList.remove("show");
  document.getElementById("exampleModal").style.display = "none";
}


*/

function postData() {
  let title = document.getElementById("nameInput").value;
  let thumbnail = document.getElementById("thumbnailInput").value;
  let description = document.getElementById("descriptionInput").value;
  let stock = document.getElementById("stockInput").value;
  let brand = document.getElementById("brandInput").value;
  let category = document.getElementById("categoryInput").value;
  let price = document.getElementById("priceInput").value;
  let rating = document.getElementById("ratingInput").value;
  let images = document.getElementById("imagesInput").value;
  let martin = document.getElementById("martinInput").value;

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
      martin
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
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}


getAllProducts();
