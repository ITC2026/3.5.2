function getAllProducts(q) {
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
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Discount %</th>
            <th>Rating</th>
            <th>Stock</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Thumbnail</th>
            <th>Images</th>
            <th><Modificar></th>
          </tr>`;
      let imageIndex = 0;

      // CHANGE: Use array.map instead the traditional <for>
      for (let i = q-10; i < q; i++) { 
        // New table row
        let tr = document.createElement("tr");

        // Id cell
        let tdId = document.createElement("td");
        tdId.textContent = products[i].id;
        tr.appendChild(tdId);

        // Title cell
        let tdTitle = document.createElement("td");
        tdTitle.textContent = products[i].title;
        tr.appendChild(tdTitle);

        // Desc cell
        let tdDesc = document.createElement("td");
        tdDesc.textContent = products[i].description;
        tr.appendChild(tdDesc);

        // Price cell
        let tdPrice = document.createElement("td");
        tdPrice.textContent = "$" + products[i].price;
        tr.appendChild(tdPrice);

        // Discount cell
        let tdDisc = document.createElement("td");
        // Ejemplo de uso de variables de js con texto ``
        tdDisc.textContent = `${products[i].discountPercentage}%`;
        tr.appendChild(tdDisc);

        // Rating cell
        let tdRating = document.createElement("td");
        tdRating.textContent = products[i].rating;
        tr.appendChild(tdRating);

        // Stock cell
        let tdStock = document.createElement("td");
        tdStock.textContent = products[i].stock;
        tr.appendChild(tdStock);

        // Brand cell
        let tdBrand = document.createElement("td");
        tdBrand.textContent = products[i].brand;
        tr.appendChild(tdBrand);

        // Category cell
        let tdCategory = document.createElement("td");
        tdCategory.textContent = products[i].category;
        tr.appendChild(tdCategory);

        // Thumbnail cell
        let tdThumb = document.createElement("td");
        let img = document.createElement("img");
        img.src = products[i].thumbnail;
        img.width = 50;
        tdThumb.appendChild(img);
        tr.appendChild(tdThumb);
      
        // Images cell
        
        // Previous button
        let currentIndex = -1;
        let imgs = document.createElement("td");
        imgs.className = "imagesoptions";
        let prev = document.createElement("button");
        prev.textContent = "<";
        prev.onclick = function() {
            currentIndex--;
            if (currentIndex >= 0) {
                displayImages(products[i].images, tdImage, currentIndex);
            } else {
                currentIndex = 0;
            }
        };
        imgs.appendChild(prev);
        tr.appendChild(imgs);
        
        
        let tdImage = document.createElement("div");
        currentIndex = displayImages(products[i].images, tdImage, currentIndex); // Assigning currentIndex
        imgs.appendChild(tdImage);

        // Next button
        let next = document.createElement("button");
        next.textContent = ">";
        next.onclick = function() {
            currentIndex++;
            if (currentIndex < products[i].images.length) {
                displayImages(products[i].images, tdImage, currentIndex);
            } else {
                currentIndex = products[i].images.length - 1;
            }
        };
        imgs.appendChild(next);


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

        
  // Populate category select
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
    });
}




/*function hideModal() {
  document.getElementById("modal-body").setAttribute("aria-hidden", "true");
  document.getElementById("exampleModal").classList.remove("show");
  document.getElementById("exampleModal").style.display = "none";
}*/

function changeIdDefault() {
  let parent = document.getElementsByClassName('pagination')[0]; // Assuming there's only one element with class 'pagination'
  let children = parent.children;

  for (let i = 0; i < children.length; i++) {
    if (children[i].classList.contains('disable')) {
      children[i].classList.remove('disable');
    }
    if (children[i].classList.contains('active')) {
      children[i].classList.remove('active');
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
  let elem = document.getElementById('page' + strn);
  console.log(elem.textContent)
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

getAllProducts(10);
