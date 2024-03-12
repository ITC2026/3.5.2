let currentPage = 0;
const productsPerPage = 10;

function getAllProducts() {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      let { products } = data;
      displayProducts(products, currentPage);
    });
}

function displayProducts(products, currentPage, search = null) {
  let tbody = document.getElementById("tbody");

  if (search != null){ 
    changeIdDefault();
  }

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
            <th class = "modcell"></th>
            <th class = "infcell"></th>
          </tr>`;



  const endIndex = (currentPage + 1) * productsPerPage;
  const startIndex = endIndex - 10;
  const productsForPage = products.slice(startIndex, endIndex);

  updateEntryCount(productsForPage.length);

  productsForPage.forEach((product) => {
    let tr = document.createElement("tr");

    let tdId = document.createElement("td");
    tdId.textContent = product.id;
    tdId.className = "firstcell";
    tr.appendChild(tdId);

    let tdThumb = document.createElement("td");
    let img = document.createElement("img");
    img.src = product.thumbnail;
    img.width = 50;
    tdThumb.className = "cell";
    tdThumb.appendChild(img);
    tr.appendChild(tdThumb);

    let tdTitle = document.createElement("td");
    tdTitle.textContent = product.title;
    tdTitle.className = "cell";
    tr.appendChild(tdTitle);

    let tdDesc = document.createElement("td");
    tdDesc.textContent = product.description;
    tdDesc.className = "cell";
    tr.appendChild(tdDesc);

    let tdDisc = document.createElement("td");
    tdDisc.textContent = `${product.discountPercentage} %`;
    tdDisc.className = "cell";
    tr.appendChild(tdDisc);

    let tdStock = document.createElement("td");
    tdStock.textContent = product.stock;
    tdStock.className = "cell";
    tr.appendChild(tdStock);

    let tdBrand = document.createElement("td");
    tdBrand.textContent = product.brand;
    tdBrand.className = "cell";
    tr.appendChild(tdBrand);

    let tdCategory = document.createElement("td");
    tdCategory.textContent = product.category;
    tdCategory.className = "cell";
    tr.appendChild(tdCategory);

    let tdPrice = document.createElement("td");
    tdPrice.textContent = "$ " + product.price;
    tdPrice.className = "cell";
    tr.appendChild(tdPrice);

    let tdRating = document.createElement("td");
    tdRating.textContent = product.rating;
    tdRating.className = "cell";
    tr.appendChild(tdRating);

    let tdImages = document.createElement("td");
    let imgButton = document.createElement("button");
    imgButton.textContent = "Show";
    imgButton.setAttribute("class", "btn btn-outline-secondary");
    imgButton.onclick = () => {
      displayImages(product.title, product.images);
    };
    imgButton.setAttribute("data-bs-toggle", "modal");
    imgButton.setAttribute("data-bs-target", "#staticBackdrop");
    tdImages.appendChild(imgButton);
    tdImages.className = "cell";
    tr.appendChild(tdImages);

    let tdMod = document.createElement("td");
    let btnMod = document.createElement("button");
    btnMod.textContent = "Modificar";
    btnMod.setAttribute("class", "btn btn-outline-secondary");
    btnMod.onclick = () => setModalModify(product.id);
    btnMod.setAttribute("data-bs-toggle", "modal");
    btnMod.setAttribute("data-bs-target", "#staticBackdrop");
    tdMod.appendChild(btnMod);
    tdMod.className = "cell";
    tr.appendChild(tdMod);

    let tdInfo = document.createElement("td");
    let btnInfo = document.createElement("button");
    btnInfo.textContent = "Info";
    btnInfo.setAttribute("class", "btn btn-outline-secondary");
    btnInfo.onclick = () => setModalInfo(product.id);
    btnInfo.setAttribute("data-bs-toggle", "modal");
    btnInfo.setAttribute("data-bs-target", "#staticBackdrop");
    tdInfo.appendChild(btnInfo);
    tdInfo.className = "cell";
    tr.appendChild(tdInfo);

    tbody.appendChild(tr);
  }
  );
}

function updateEntryCount(count) {
  let entryCountElement = document.getElementById('entryCount');
  let hintText = document.getElementById('hint-text'); 

  hintText.innerHTML = `Showing <b>${count}</b> out of <b>30</b> entries.`;

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
    if (!form.checkValidity()) {
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
      displayProducts(filteredProducts, 0, search = true);

  });
}

function changeIdDefault() {
  let parent = document.getElementsByClassName("pagination")[0]; 
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
  currentPage = strn - 1;
  elem.classList.add("active");
}

function displayImages(productTitle, productImgs) {
  var modalTitle = document.getElementById("modal-title");
  if (modalTitle)
    modalTitle.textContent = `Images of ${productTitle}`;
  var modalBody = document.getElementById("modal-body");
  if (modalBody) {
    // Clear previous carousel content
    modalBody.innerHTML = '';

    // Create carousel container
    var carousel = document.createElement('div');
    carousel.id = 'carouselExampleControls';
    carousel.classList.add('carousel', 'slide');
    carousel.setAttribute('data-ride', 'carousel');

    // Create carousel inner container
    var carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel-inner');

    // Create carousel items for each image
    productImgs.forEach((imgSrc, index) => {
      var carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      if (index === 0) {
        carouselItem.classList.add('active');
      }

      var img = document.createElement('img');
      img.classList.add('d-block', 'w-100');
      img.src = imgSrc;
      img.alt = `Slide ${index + 1}`;

      carouselItem.appendChild(img);
      carouselInner.appendChild(carouselItem);
    });

    carousel.appendChild(carouselInner);

    // Create carousel controls
    var prevControl = document.createElement('a');
    prevControl.classList.add('carousel-control-prev');
    prevControl.href = '#carouselExampleControls';
    prevControl.role = 'button';
    prevControl.setAttribute('data-slide', 'prev');

    var prevIcon = document.createElement('span');
    prevIcon.classList.add('carousel-control-prev-icon');
    prevIcon.setAttribute('aria-hidden', 'true');

    var prevText = document.createElement('span');
    prevText.classList.add('sr-only');
    prevText.textContent = 'Previous';

    prevControl.appendChild(prevIcon);
    prevControl.appendChild(prevText);

    var nextControl = document.createElement('a');
    nextControl.classList.add('carousel-control-next');
    nextControl.href = '#carouselExampleControls';
    nextControl.role = 'button';
    nextControl.setAttribute('data-slide', 'next');

    var nextIcon = document.createElement('span');
    nextIcon.classList.add('carousel-control-next-icon');
    nextIcon.setAttribute('aria-hidden', 'true');

    var nextText = document.createElement('span');
    nextText.classList.add('sr-only');
    nextText.textContent = 'Next';

    nextControl.appendChild(nextIcon);
    nextControl.appendChild(nextText);

    carousel.appendChild(prevControl);
    carousel.appendChild(nextControl);

    modalBody.appendChild(carousel);
  }
}


getAllProducts();
