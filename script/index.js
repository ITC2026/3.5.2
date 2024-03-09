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

function getAllProducts(q) {
  // removeAllChildNodes(tbody);
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let { products } = data;
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
            <th>Images</th>
            <th><Modificar></th>
            <th><Eliminar></th>
          </tr>`;
      let imageIndex = 0;
      function slideImages([]){

      }
      
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
        tdMod.appendChild(btnMod);
        tr.appendChild(tdMod);

        // Eliminar cell
        let tdEl = document.createElement("td");
        let btnEl = document.createElement("button");
        btnEl.textContent = "Eliminar";
        tdEl.appendChild(btnEl);
        tr.appendChild(tdEl);

        tbody.appendChild(tr);
      }
    });
}

getAllProducts(10);