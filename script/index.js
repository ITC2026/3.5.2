let currentPage = 0;
const productsPerPage = 10;

function getAllProducts(page) {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      let { products } = data;
      displayProducts(products);
    });
}

function displayProducts(products) {
  let tbody = document.getElementById("tbody");

  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="12">Your search was not found</td></tr>`;
    updateEntryCount(0);
    return;
  }

  let btnAdd = document.getElementById("AddProductButton");
  let btnSearchModal = document.getElementById("SearchProductButton");

  /*For add product button*/
  btnAdd.onclick = () => setModalAdd();
  btnAdd.setAttribute("data-bs-toggle", "modal");
  btnAdd.setAttribute("data-bs-target", "#staticBackdrop");

  /*For search product button*/
  btnSearchModal.onclick = () => setModalSearch();
  btnSearchModal.setAttribute("data-bs-toggle", "modal");
  btnSearchModal.setAttribute("data-bs-target", "#staticBackdrop");

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

  updateEntryCount(products.length);

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
}

function updateEntryCount(count) {
  var entryCountElement = document.getElementById('entryCount');
  if (entryCountElement) {
    entryCountElement.innerText = `Showing ${count} entries`;
  }
}

function populateCategories() {
  fetch('https://dummyjson.com/products/categories')
    .then(response => response.json())
    .then(categories => {
      const selectElement = document.getElementById('categoryInput');
      categories.forEach(category => {
        const option = document.createElement('option');
        option.text = category;
        option.value = category;
        selectElement.add(option);
      });
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });
}

function populateBrand() {
  fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(data => {
    const products = data.products;
    const brands = [];

    // Extract all unique brands
    products.forEach(product => {
      if (!brands.includes(product.brand)) {
        brands.push(product.brand);
      }
    });

    // Populate the select dropdown with brand options
    const brandInput = document.getElementById('brandInput');
    brands.forEach(brand => {
      const option = document.createElement('option');
      option.value = brand;
      option.textContent = brand;
      brandInput.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}

function setModalSearch() {
  let modalTitle = document.getElementById("modal-title");
  modalTitle.textContent = "Search Product";

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

  let modalFooter = document.getElementById("modal-footer");
  modalFooter.innerHTML = `
  <div>
    <button id="searchBtn" type="submit" class="btn btn-primary">Search</button>
  </div>
  `;

  populateCategories();

  const searchBtn = document.getElementById("searchBtn");

  searchBtn.onclick = () => {
    const form = document.querySelector('.needs-validation');
    form.classList.add('was-validated');
    const nameInput = document.getElementById("nameInput").value;
    const maxPriceInput = document.getElementById("maxpriceInput").value;
    const categoryInput = document.getElementById("categoryInput").value;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    searchProducts(nameInput, maxPriceInput, categoryInput);
  }
}

function searchProducts(name, maxPrice, category) {
  fetch(`https://dummyjson.com/products/search?q=${name}`)
    .then((res) => res.json())
    .then((data) => {
      let { products } = data;
      const filteredProducts = products.filter(product => {
        return product.price <= maxPrice && product.category === category
      });
      displayProducts(filteredProducts);
  });
}

  // Populate category select
  populateCategories();

  // Populate brand select
  populateBrand();

  //VALIDATE FILLED INPUTS
  const form = document.forms['modalForm'];
  form.addEventListener('submit', function(event) {
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





/*function hideModal() {
  document.getElementById("modal-body").setAttribute("aria-hidden", "true");
  document.getElementById("exampleModal").classList.remove("show");
  document.getElementById("exampleModal").style.display = "none";
}*/

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

function updateData(id) {
  console.log('updateData function called');

  // Toma los elementos modificados para actualizarlos
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

  // Se usa PATCH para actualizar los datos individuales
  fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PATCH', 
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
      showSuccessAlert();
  })
  .catch(error => {
      console.error('Error:', error);
  });
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

getAllProducts();
