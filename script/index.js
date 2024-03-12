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

export function displayProducts(products, currentPage, search = false) {
  let tbody = document.getElementById("tbody");

  if (!search){ 
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
      dispImages(product.title, product.images[0]);
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

export function populateCategories() {
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

export function populateBrand() {
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

function dispImages(productTitle, productImgs) {
  var modalTitle = document.getElementById("modal-title");
  if (modalTitle)
    modalTitle.textContent = "arriba";
  var modalBody = document.getElementById("modal-body");
  if (modalBody)
    modalBody.innerHTML = `
    <div>
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
    </div>
  `;
}

getAllProducts();