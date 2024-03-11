function setModalInfo(id: number) {
  fetch(`https://dummyjson.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      let product = data;
      let modalTitle = document.getElementById("modal-title");
      let modalBody = document.getElementById("modal-body");
      let modalFooter = document.getElementById("modal-footer");
      if (!modalTitle || !modalBody || !modalFooter) {
        return;
      }

      modalTitle.textContent = product.title;
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

      modalFooter.innerHTML = `
        <div>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Understood</button>
        </div>
            `;
    });
}
