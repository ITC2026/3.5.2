function setModalAdd() {
    //CREATING MODAL
    var modalTitle = document.getElementById("modal-title");
    if (modalTitle)
        modalTitle.textContent = "Add Product";
    var modalBody = document.getElementById("modal-body");
    if (modalBody)
        modalBody.innerHTML = "\n    <div class=\"modal-body p-5 my-0\">\n      <form class=\"needs-validation\" autocomplete=\"off\" name=\"modalForm\" novalidate netlify>\n\n        <div class=\"mb-2\">\n          <label for=\"nameInput\" class=\"form-label\">Name</label>\n          <input type=\"text\" class=\"form-control\" id=\"nameInput\" name=\"nameInput\" placeholder=\"Enter Name\" required>\n          <div class=\"valid-feedback\">\n            Looks good!\n          </div>\n          <div class=\"invalid-feedback\">\n            Please enter the product\u00B4s name.\n          </div>\n        </div>\n\n        <div class=\"mb-2\">\n          <label for=\"descriptionInput\" class=\"form-label\">Description</label>\n          <textarea class=\"form-control\" id=\"descriptionInput\" placeholder=\"Enter description\" required></textarea>\n          <div class=\"valid-feedback\">\n            Looks good!\n          </div>\n          <div class=\"invalid-feedback\">\n            Please enter the product\u00B4s description.\n          </div>\n        </div>\n\n        <div class=\"row mb-2 g-2\">\n          <div class=\"col\">\n            <label for=\"categoryInput\" class=\"form-label\">Category</label>\n            <select class=\"form-select\" id=\"categoryInput\" required>\n              <option selected disabled value=\"\">Choose a category</option>\n            </select>\n            <div class=\"invalid-feedback\">\n              Please select the product\u00B4s category.\n            </div>\n          </div>\n\n          <div class=\"col\">\n            <label for=\"brandInput\" class=\"form-label\">Brand</label>\n            <select class=\"form-select\" id=\"brandInput\" required>\n              <option selected disabled value=\"\">Choose a brand</option>\n            </select>\n            <div class=\"invalid-feedback\">\n              Please select the product\u00B4s brand.\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row mb-2 g-2\">\n          <div class=\"col\">\n            <label for=\"priceInput\">Price</label>\n            <div class=\"input-group\">\n              <div class=\"input-group-prepend\">\n                <span class=\"input-group-text\" id=\"inputGroupPrepend\">$</span>\n              </div>\n              <input type=\"number\" class=\"form-control\" id=\"priceInput\"  aria-describedby=\"inputGroupPrepend\" required>\n              <div class=\"invalid-feedback\">\n                Please enter the product\u00B4s price\n              </div>\n            </div>\n          </div>\n\n          <div class=\"col\">\n            <label for=\"discountInput\">Discount</label>\n            <div class=\"input-group\">\n              <div class=\"input-group-prepend\">\n                <span class=\"input-group-text\" id=\"inputGroupPrepend\">%</span>\n              </div>\n              <input type=\"number\" step=\"0.01\" class=\"form-control\" id=\"discountInput\"  aria-describedby=\"inputGroupPrepend\" required>\n              <div class=\"invalid-feedback\">\n              Please enter the product\u00B4s discount\n              </div>\n            </div>\n          </div>\n\n          <div class=\"col\">\n            <label for=\"ratingInput\">Rating</label>\n            <div class=\"input-group\">\n              <div class=\"input-group-prepend\">\n                <span class=\"input-group-text\" id=\"inputGroupPrepend\">\u2605</span>\n              </div>\n              <input type=\"number\" step=\"0.01\" class=\"form-control\" id=\"ratingInput\"  aria-describedby=\"inputGroupPrepend\" required>\n              <div class=\"invalid-feedback\">\n              Please enter the product\u00B4s rating\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-md-4\">\n          <label for=\"stockInput\" class=\"form-label\">Stock</label>\n          <div class=\"input-group has-validation\">\n            <span class=\"input-group-text\" id=\"inputGroupPrepend\">#</span>\n            <input type=\"number\" class=\"form-control\" id=\"stockInput\" aria-describedby=\"inputGroupPrepend\" required>\n            <div class=\"invalid-feedback\">\n              Please choose a username.\n            </div>\n          </div>\n        </div>\n\n        <div class=\"mb-3\">\n          <label for=\"thumbnailInput\">Thumbnail</label>\n          <input id=\"thumbnailInput\" type=\"file\" class=\"form-control\" aria-label=\"file example\">\n          <div class=\"invalid-feedback\">Example invalid form file feedback</div>\n        </div>\n\n        <div class=\"mb-3\">\n          <label for=\"imagesInput\">Images</label>\n          <input id=\"imagesInput\" type=\"file\" class=\"form-control\" aria-label=\"file example\" multiple>\n          <div class=\"invalid-feedback\">Example invalid form file feedback</div>\n        </div>\n\n        <button id=\"submitBtn\" type=\"submit\" class=\"btn btn-primary\">Submit</button>\n      </form>\n    </div>\n    ";
    var modalFooter = document.getElementById("modal-footer");
    if (!modalFooter) {
        return;
    }
    modalFooter.innerHTML = ""; // Clear the footer
    // Populate category select
    fetch("https://dummyjson.com/products/categories")
        .then(function (response) { return response.json(); })
        .then(function (categories) {
        var selectElement = document.getElementById("categoryInput");
        if (selectElement) {
            categories.forEach(function (category) {
                var option = document.createElement("option");
                option.text = category;
                option.value = category;
                selectElement.add(option);
            });
        }
    })
        .catch(function (error) {
        console.error("Error fetching categories:", error);
    });
    fetch("https://dummyjson.com/products")
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var products = data.products;
        var brands = [];
        // Extract all unique brands
        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            if (brands.indexOf(product.brand) === -1) {
                brands.push(product.brand);
            }
        }
        // Populate the select dropdown with brand options
        var brandInput = document.getElementById("brandInput");
        if (brandInput) {
            brands.forEach(function (brand) {
                var option = document.createElement("option");
                option.value = brand;
                option.textContent = brand;
                brandInput.appendChild(option);
            });
        }
    })
        .catch(function (error) {
        console.error("Error fetching data:", error);
    });
    //VALIDATE FILLED INPUTS
    var form = document.querySelector('form[name="modalForm"]');
    if (form) {
        form.addEventListener("submit", function (event) {
            var nameInput = document.getElementById("nameInput");
            var descriptionInput = document.getElementById("descriptionInput");
            var categoryInput = document.getElementById("categoryInput");
            var brandInput = document.getElementById("brandInput");
            var priceInput = document.getElementById("priceInput");
            var discountInput = document.getElementById("discountInput");
            var ratingInput = document.getElementById("ratingInput");
            var stockInput = document.getElementById("stockInput");
            var thumbnailInput = document.getElementById("thumbnailInput");
            var imagesInput = document.getElementById("imagesInput");
            event.preventDefault(); // para que no redireccione cuando se manda
            if (form.checkValidity()) {
                postData();
            }
            else {
                event.stopPropagation();
            }
            form.classList.add("was-validated");
        }, false);
    }
}
function postData() {
    console.log('postData function called');
    var title = document.getElementById("nameInput").value;
    var thumbnail = document.getElementById("thumbnailInput").value;
    var description = document.getElementById("descriptionInput").value;
    var stock = document.getElementById("stockInput").value;
    var brand = document.getElementById("brandInput").value;
    var category = document.getElementById("categoryInput").value;
    var price = document.getElementById("priceInput").value;
    var rating = document.getElementById("ratingInput").value;
    var images = document.getElementById("imagesInput").value;
    var data = {
        title: title,
        thumbnail: thumbnail,
        description: description,
        stock: stock,
        brand: brand,
        category: category,
        price: price,
        rating: rating,
        images: images,
    };
    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var _a;
        console.log('Success:', data);
        //getAllProducts(); //si se fuera a actualizar de verdad
        showSuccessAlert();
        // Hide the modal using Bootstrap's modal method
        var modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
            (_a = modalBackdrop.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(modalBackdrop);
        }
        var modal = document.getElementById('staticBackdrop');
        if (modal) {
            modal.style.display = 'none';
        }
        // Ensure body overflow is restored to scroll
        document.body.style.overflow = 'auto';
    })
        .catch(function (error) {
        console.error('Error:', error);
    });
}
function showSuccessAlert() {
    var alertElement = document.createElement('div');
    alertElement.classList.add('alert', 'alert-success');
    alertElement.setAttribute('role', 'alert');
    alertElement.textContent = "Operation was successful!";
    var alertMessage = document.getElementById('alert-messages');
    if (!alertMessage) {
        return;
    }
    alertMessage.appendChild(alertElement);
    // Quita la alerta
    setTimeout(function () {
        alertElement.remove();
    }, 5000);
}
