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
          `  
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

function setModalAdd(){
  //CREATING MODAL
  let modalTitle = document.getElementById("modal-title");
  modalTitle.textContent = "Add Product";

  let modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
    <div class="modal-body">
      <form>
        <label for="nameInput">Product Name:</label> 
        <input type="text" id="nameInput" name="productName" placeholder="Insert name" required>
        <br>

        <label for="thumbnailInput">Product Thumbnail:</label>
        <input type="text" id="thumbnailInput" name="productThumbnail" placeholder="Load thumbnail" required>
        <br>

        <label for="descriptionInput">Product Description:</label>
        <input type="text" id="descriptionInput" name="productDescription" placeholder="Insert description" required>
        <br>

        <label for="stockInput">Product Stock:</label>
        <input type="text" id="stockInput" name="productStock" placeholder="Insert stock" required>
        <br>

        <label for="discountInput">Product Discount:</label>
        <input type="text" id="discountInput" name="productDiscount" placeholder="Insert discount percentage" required>
        <br>

        <label for="brandInput">Product Brand:</label>
        <input type="text" id="brandInput" name="productBrand" placeholder="Insert brand" required>
        <br>

        <label for="categoryInput">Product Category:</label>
        <input type="text" id="categoryInput" name="productCategory" placeholder="Insert category" required>
        <br>

        <label for="priceInput">Product Price:</label>
        <input type="number" id="priceInput" name="productPrice" placeholder="Insert price" required>
        <br>

        <label for="ratingInput">Product Rating:</label>
        <input type="text" id="ratingInput" name="productRating" placeholder="Insert rating" required>
        <br>

        <label for="imagesInput">Product Images:</label>
        <input type="text" id="imagesInput" name="productImages" placeholder="Insert images" required>
        <br>

      </form>
    </div>
  `;
    let modalFooter = document.getElementById("modal-footer");
    modalFooter.innerHTML = `
    <div>
      <button id = "finishButton" type="button" class="btn btn-primary" data-bs-dismiss="modal">Finish</button>
    </div>
  `;
  
  //POST AFTER CLICKING FINISH BUTTON
  document.getElementById("finishButton").addEventListener("click", function () {
    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: document.getElementById("nameInput").value,
        thumbnail: document.getElementById("thumbnailInput").value,
        description: document.getElementById("descriptionInput").value,
        stock: document.getElementById("stockInput").value,
        discount: document.getElementById("discountInput").value,
        brand: document.getElementById("brandInput").value,
        category: document.getElementById("categoryInput").value,
        price: document.getElementById("priceInput").value,
        rating: document.getElementById("ratingInput").value,
        images: document.getElementById("imagesInput").value,
      }),
    })
    .then(res => res.json())
    .then(console.log);
  })
}

/*
function hideModal() {
  document.getElementById("modal-body").setAttribute("aria-hidden", "true");
  document.getElementById("exampleModal").classList.remove("show");
  document.getElementById("exampleModal").style.display = "none";
}

*/
getAllProducts();
