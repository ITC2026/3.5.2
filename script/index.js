function changeIdDefault() {
  let parent = document.getElementsByClassName('pagination')[0];
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

function setActiveItem(strn) {
  changeIdDefault();
  let elem = document.getElementById('page' + strn);
  console.log(elem.textContent)
  elem.classList.add("active");
}

function displayProducts(products) {
  let tbody = document.getElementById("tbody");
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
        <th><Modificar></th>
        <th><Eliminar></th>
      </tr>`;
  
  for (let i = 0; i < products.length; i++) { 
    let tr = document.createElement("tr");

    let tdId = document.createElement("td");
    tdId.textContent = products[i].id;
    tr.appendChild(tdId);

    let tdTitle = document.createElement("td");
    tdTitle.textContent = products[i].title;
    tr.appendChild(tdTitle);

    let tdDesc = document.createElement("td");
    tdDesc.textContent = products[i].description;
    tr.appendChild(tdDesc);

    let tdPrice = document.createElement("td");
    tdPrice.textContent = "$" + products[i].price;
    tr.appendChild(tdPrice);

    let tdDisc = document.createElement("td");
    tdDisc.textContent = `${products[i].discountPercentage}%`;
    tr.appendChild(tdDisc);

    let tdRating = document.createElement("td");
    tdRating.textContent = products[i].rating;
    tr.appendChild(tdRating);

    let tdStock = document.createElement("td");
    tdStock.textContent = products[i].stock;
    tr.appendChild(tdStock);

    let tdBrand = document.createElement("td");
    tdBrand.textContent = products[i].brand;
    tr.appendChild(tdBrand);

    let tdCategory = document.createElement("td");
    tdCategory.textContent = products[i].category;
    tr.appendChild(tdCategory);

    let tdThumb = document.createElement("td");
    let img = document.createElement("img");
    img.src = products[i].thumbnail;
    img.width = 50;
    tdThumb.appendChild(img);
    tr.appendChild(tdThumb);

    let tdMod = document.createElement("td");
    let btnMod = document.createElement("button");
    btnMod.textContent = "Modificar";
    tdMod.appendChild(btnMod);
    tr.appendChild(tdMod);

    let tdEl = document.createElement("td");
    let btnEl = document.createElement("button");
    btnEl.textContent = "Eliminar";
    tdEl.appendChild(btnEl);
    tr.appendChild(tdEl);

    tbody.appendChild(tr);
  }
  updateEntryCount(products.length);
}

function getAllProducts(q) {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayProducts(data.products.slice(q-10, q));
    });
}

function getCategories() {
  fetch('https://dummyjson.com/products/categories')
    .then(response => response.json())
    .then(data => {
    });
}

function searchProducts(name, price, category) {
  var url = 'https://dummyjson.com/products/search?q=' + name + '&price=' + price + '&category=' + category;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayProducts(data.products);
    });
}

function addSearchButtonEvent() {
  var searchButton = document.getElementById('searchButton');
  if (searchButton) {
    searchButton.addEventListener('click', function() {
      var name = prompt("Ingrese el nombre del producto");
      var price = prompt("Ingrese el precio del producto");
      var category = prompt("Ingrese la categoría del producto");
      searchProducts(name, price, category);
    });
  }
}

function updateEntryCount(count) {
  var entryCountElement = document.getElementById('entryCount');
  console.log('entryCountElement:', entryCountElement);
  if (entryCountElement) {
    entryCountElement.innerText = `Showing ${count} entries`;
  }
}

window.onload = function() {
  getCategories();
  getAllProducts(10);
  addSearchButtonEvent();
};
