let currentPage = 0;
const productsPerPage = 10;

function getAllProducts(page) {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      let { products } = data;
      let tbody = document.getElementById("tbody");
      let btnAdd = document.getElementById("AddProductButton");

      /*For add product button*/
      btnAdd.onclick = () => setModalAdd();
      btnAdd.setAttribute("data-bs-toggle", "modal");
      btnAdd.setAttribute("data-bs-target", "#staticBackdrop");

      tbody.innerHTML = `<tr> 
            <th>Id</th>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Discount %</th>
            <th>Stock</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Images</th>
            <th><Modificar></th>
            <th><Info></th>
          </tr>`;

      const endIndex = (currentPage + 1) * productsPerPage;
      const startIndex = endIndex - 10;

      console.log(
        `page: ${page}, startIndex: ${startIndex}, endIndex: ${endIndex}, productsPerPage: ${productsPerPage}`
      );

      const productsForPage = products.slice(startIndex, endIndex);

      productsForPage.forEach((product) => {
        // New table row
        let tr = document.createElement("tr");

        let tdId = document.createElement("td");
        tdId.textContent = product.id;
        tr.appendChild(tdId);

        // Thumbnail cell
        let tdThumb = document.createElement("td");
        let img = document.createElement("img");
        img.src = product.thumbnail;
        img.width = 50;
        tdThumb.appendChild(img);
        tr.appendChild(tdThumb);

        // Title cell
        let tdTitle = document.createElement("td");
        tdTitle.textContent = product.title;
        tr.appendChild(tdTitle);

        // Desc cell
        let tdDesc = document.createElement("td");
        tdDesc.textContent = product.description;
        tr.appendChild(tdDesc);

        // Discount cell
        let tdDisc = document.createElement("td");
        // Example of using variables with template literals ``
        tdDisc.textContent = `${product.discountPercentage} %`;
        tr.appendChild(tdDisc);

        // Stock cell
        let tdStock = document.createElement("td");
        tdStock.textContent = product.stock;
        tr.appendChild(tdStock);

        // Brand cell
        let tdBrand = document.createElement("td");
        tdBrand.textContent = product.brand;
        tr.appendChild(tdBrand);

        // Category cell
        let tdCategory = document.createElement("td");
        tdCategory.textContent = product.category;
        tr.appendChild(tdCategory);

        // Price cell
        let tdPrice = document.createElement("td");
        tdPrice.textContent = "$ " + product.price;
        tr.appendChild(tdPrice);

        // Rating cell
        let tdRating = document.createElement("td");
        tdRating.textContent = product.rating;
        tr.appendChild(tdRating);

        // Images cell
        let tdImages = document.createElement("td");
        let imgButton = document.createElement("button");
        imgButton.textContent = "Show";
        imgButton.setAttribute("class", "btn btn-outline-secondary");
        imgButton.onclick = () => {
          let currentIndex = -1;
          currentIndex = displayImages(product.images, tdImages, currentIndex);
          imgButton.onclick = () => {
            currentIndex = displayImages(
              product.images,
              tdImages,
              currentIndex
            );
          };
        };
        tdImages.appendChild(imgButton);
        tr.appendChild(tdImages);

        // Modificar cell
        let tdMod = document.createElement("td");
        let btnMod = document.createElement("button");
        btnMod.textContent = "Modificar";
        btnMod.setAttribute("class", "btn btn-outline-secondary");
        btnMod.onclick = () => setModalModify(product.id);
        btnMod.setAttribute("data-bs-toggle", "modal");
        btnMod.setAttribute("data-bs-target", "#staticBackdrop");
        tdMod.appendChild(btnMod);

        tr.appendChild(tdMod);

        //Info de cell
        let tdInfo = document.createElement("td");
        let btnInfo = document.createElement("button");
        btnInfo.textContent = "Info";
        btnInfo.setAttribute("class", "btn btn-outline-secondary");
        btnInfo.onclick = () => setModalInfo(product.id);

        btnInfo.setAttribute("data-bs-toggle", "modal");
        btnInfo.setAttribute("data-bs-target", "#staticBackdrop");
        tdInfo.appendChild(btnInfo);

        tr.appendChild(tdInfo);

        // products[i].id
        tbody.appendChild(tr);
      });
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

      <button id="submitBtn" type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
  `;

  // Populate category select
  fetch("https://dummyjson.com/products/categories")
    .then((response) => response.json())
    .then((categories) => {
      const selectElement = document.getElementById("categoryInput");
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.text = category;
        option.value = category;
        selectElement.add(option);
      });
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
      products.forEach((product) => {
        if (!brands.includes(product.brand)) {
          brands.push(product.brand);
        }
      });

      // Populate the select dropdown with brand options
      const brandInput = document.getElementById("brandInput");
      brands.forEach((brand) => {
        const option = document.createElement("option");
        option.value = brand;
        option.textContent = brand;
        brandInput.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  //VALIDATE FILLED INPUTS
  const form = document.forms["modalForm"];
  form.addEventListener(
    "submit",
    function (event) {
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
      form.classList.add("was-validated");

      if (
        !nameInput.checkValidity() ||
        !descriptionInput.checkValidity() ||
        !brandInput.checkValidity() ||
        !priceInput.checkValidity() ||
        !discountInput.checkValidity() ||
        !ratingInput.checkValidity() ||
        !stockInput.checkValidity() ||
        !thumbnailInput.checkValidity() ||
        !categoryInput.checkValidity() ||
        !imagesInput.checkValidity()
      ) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // Posts answers
      postData();
    },
    false
  );
}

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

  fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      //getAllProducts(); //si se fuera a actualizar de verdad
      showSuccessAlert();
      $("#staticBackdrop").modal("hide"); // quita el form
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function showSuccessAlert() {
  const alertElement = document.createElement("div");
  alertElement.classList.add("alert", "alert-success");
  alertElement.setAttribute("role", "alert");
  alertElement.textContent = "Operation was successful!";

  document.body.appendChild(alertElement);

  // Quita la alerta
  setTimeout(() => {
    alertElement.remove();
  }, 5000);
}

function changeIdDefault() {
  let parent = document.getElementsByClassName("pagination")[0]; // Assuming there's only one element with class 'pagination'
  let children = parent.children;

  for (let i = 0; i < children.length; i++) {
    if (children[i].classList.contains("disable")) {
      children[i].classList.remove("disable");
    }
    if (children[i].classList.contains("active")) {
      children[i].classList.remove("active");
    }
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function setActiveItem(strn) {
  changeIdDefault();
  let elem = document.getElementById("page" + strn);
  console.log("strn: ", strn);
  currentPage = strn - 1;
  elem.classList.add("active");
}

function displayImages(images, container, currentIndex) {
  let tdImages = document.createElement("div");
  let image = document.createElement("img");

  if (currentIndex < images.length - 1) {
    currentIndex++;
    image.src = images[currentIndex];
    image.width = 50;
    tdImages.appendChild(image);
  } else {
    return;
  }
  removeAllChildNodes(container);
  container.appendChild(tdImages);
  return currentIndex;
}

getAllProducts(currentPage);
