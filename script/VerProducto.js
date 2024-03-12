"use strict";
function setModalInfo(id) {
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
          <div>
            <img src="${product.thumbnail}" width="100" />
            <p class = "product-desc">${product.description}</p>
            <p><b>Brand:</b> ${product.brand}</p>
            <p><b>Category:</b> ${product.category}</p>
            <p><b>Price:</b> $${product.price}</p>
            <p><b>Rating:</b> ${product.rating}</p>
            <style type="text/css">

            .product-desc {
              margin-top:1rem;
            }

            #modal-body {
                  text-align: left;
                  width: 80%;
                  margin-left: 2rem;
              }
              #modal-body img {
                width: 60%;
                height: auto;
              }


            </style>
          </div>
          `;
    });
}
