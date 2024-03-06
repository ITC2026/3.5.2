function getAllProducts() {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let { products } = data;
      let tbody = document.getElementById("tbody");
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
        tdEl.appendChild(btnEl);
        tr.appendChild(tdEl);


        // Modificar cell
        let tdMod = document.createElement("td");
        let btnMod = document.createElement("button");
        btnMod.textContent = "Modificar";
        tdMod.appendChild(btnMod);
        tr.appendChild(tdMod);

        let tdInfo = document.createElement("td");
        let btnInfo = document.createElement("button");
        btnInfo.textContent = "Info";
        tdInfo.appendChild(btnInfo);
        tr.appendChild(tdInfo);
        // products[i].id
        

        tbody.appendChild(tr);
      }
    });
}

getAllProducts();
