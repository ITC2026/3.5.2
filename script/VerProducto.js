function setModalInfo(id) {
    fetch("https://dummyjson.com/products/".concat(id))
        .then(function (res) { return res.json(); })
        .then(function (data) {
        var product = data;
        var modalTitle = document.getElementById("modal-title");
        var modalBody = document.getElementById("modal-body");
        var modalFooter = document.getElementById("modal-footer");
        if (!modalTitle || !modalBody || !modalFooter) {
            return;
        }
        modalTitle.textContent = product.title;
        modalBody.innerHTML = "\n          <div class=\"modal-body\">\n            <img src=\"".concat(product.thumbnail, "\" width=\"100\" />\n            <p>").concat(product.description, "</p>\n            <p>Brand: ").concat(product.brand, "</p>\n            <p>Category: ").concat(product.category, "</p>\n            <p>Price: $").concat(product.price, "</p>\n            <p>Rating: ").concat(product.rating, "</p>\n          </div>\n          ");
        modalFooter.innerHTML = "\n        <div>\n          <button type=\"button\" class=\"btn btn-primary\" data-bs-dismiss=\"modal\">Understood</button>\n        </div>\n            ";
    });
}
