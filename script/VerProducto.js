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
        modalBody.innerHTML = "\n          <div>\n            <img src=\"".concat(product.thumbnail, "\" width=\"100\" />\n            <p class = \"product-desc\">").concat(product.description, "</p>\n            <p><b>Brand:</b> ").concat(product.brand, "</p>\n            <p><b>Category:</b> ").concat(product.category, "</p>\n            <p><b>Price:</b> $").concat(product.price, "</p>\n            <p><b>Rating:</b> ").concat(product.rating, "</p>\n            <style type=\"text/css\">\n\n            .product-desc {\n              margin-top:1rem;\n            }\n\n            #modal-body {\n                  text-align: left;\n                  width: 80%;\n                  margin-left: 2rem;\n              }\n              #modal-body img {\n                width: 60%;\n                height: auto;\n              }\n\n\n            </style>\n          </div>\n          ");
        modalFooter.innerHTML = ""; // Clear the footer
    });
}
