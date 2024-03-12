export function displayProducts(products, currentPage, search = null) {
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