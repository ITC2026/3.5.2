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
