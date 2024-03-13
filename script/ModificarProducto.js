var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function setModalModify(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, product, modalTitle, modalBody, categoriesResponse, categories, selectElement_1, productsResponse, productsData, products, brands_1, brandInput_1, form_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, fetch("https://dummyjson.com/products/".concat(id))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    product = data;
                    modalTitle = document.getElementById("modal-title");
                    modalTitle.textContent = "Modify Product";
                    modalBody = document.getElementById("modal-body");
                    modalBody.innerHTML = "\n      <div class=\"modal-body p-5 my-0\">\n      <form class=\"needs-validation\" autocomplete=\"off\" name=\"modalForm\" novalidate netlify>\n  \n        <div class=\"mb-2\">\n          <label for=\"nameInput\" class=\"form-label\">Name</label>\n          <input type=\"text\" class=\"form-control\" id=\"nameInput\" name=\"nameInput\" value=\"".concat(product.title, "\" required>\n          <div class=\"valid-feedback\">\n            Looks good!\n          </div>\n          <div class=\"invalid-feedback\">\n            Please enter the product's name.\n          </div>\n        </div>\n  \n        <div class=\"mb-2\">\n          <label for=\"descriptionInput\" class=\"form-label\">Description</label>\n          <textarea class=\"form-control\" id=\"descriptionInput\" required>").concat(product.description, "</textarea>\n          <div class=\"valid-feedback\">\n            Looks good!\n          </div>\n          <div class=\"invalid-feedback\">\n            Please enter the product's description.\n          </div>\n        </div>\n  \n        <div class=\"row mb-2 g-2\">\n          <div class=\"col\">\n            <label for=\"categoryInput\" class=\"form-label\">Category</label>\n            <select class=\"form-select\" id=\"categoryInput\" required>\n              <option selected disabled value=\"").concat(product.category, "\">").concat(product.category, "</option>\n            </select>\n            <div class=\"invalid-feedback\">\n              Please select the product's category.\n            </div>\n          </div>\n\n          \n          \n          <div class=\"col\">\n            <label for=\"brandInput\" class=\"form-label\">Brand</label>\n            <select class=\"form-select\" id=\"brandInput\" required>\n              <option selected disabled value=\"").concat(product.brand, "\">").concat(product.brand, "</option>\n            </select>\n            <div class=\"invalid-feedback\">\n              Please select the product's brand.\n            </div>\n          </div>\n        </div>\n  \n        <div class=\"row mb-2 g-2\">\n          <div class=\"col\">\n            <label for=\"priceInput\">Price</label>\n            <div class=\"input-group\">\n              <div class=\"input-group-prepend\">\n                <span class=\"input-group-text\" id=\"inputGroupPrepend\">$</span>\n              </div>\n              <input type=\"number\" class=\"form-control\" id=\"priceInput\" value=\"").concat(product.price, "\" aria-describedby=\"inputGroupPrepend\" required>\n              <div class=\"invalid-feedback\">\n                Please enter the product's price\n              </div>\n            </div>\n          </div>\n  \n          <div class=\"col\">\n            <label for=\"discountInput\">Discount</label>\n            <div class=\"input-group\">\n              <div class=\"input-group-prepend\">\n                <span class=\"input-group-text\" id=\"inputGroupPrepend\">%</span>\n              </div>\n              <input type=\"number\" class=\"form-control\" id=\"discountInput\" value=\"").concat(product.discountPercentage, "\" aria-describedby=\"inputGroupPrepend\" step=\"0.01\" min=\"0\" max=\"100\" required>\n              <div class=\"invalid-feedback\">\n              Please enter the product's discount\n              </div>\n            </div>\n          </div>\n  \n          <div class=\"col\">\n            <label for=\"ratingInput\">Rating</label>\n            <div class=\"input-group\">\n              <div class=\"input-group-prepend\">\n                <span class=\"input-group-text\" id=\"inputGroupPrepend\">\u2605</span>\n              </div>\n              <input type=\"number\" class=\"form-control\" id=\"ratingInput\" value=\"").concat(product.rating, "\" aria-describedby=\"inputGroupPrepend\" step=\"0.01\" min=\"0\" max=\"5\" required>\n              <div class=\"invalid-feedback\">\n              Please enter the product's rating\n              </div>\n            </div>\n          </div>\n        </div>\n  \n        <div class=\"col-md-4\">\n          <label for=\"stockInput\" class=\"form-label\">Stock</label>\n          <div class=\"input-group has-validation\">\n            <span class=\"input-group-text\" id=\"inputGroupPrepend\">#</span>\n            <input type=\"number\" class=\"form-control\" id=\"stockInput\" value=\"").concat(product.stock, "\" aria-describedby=\"inputGroupPrepend\" required>\n            <div class=\"invalid-feedback\">\n              Please enter the product's stock \n            </div>\n          </div>\n        </div>\n  \n        <div class=\"mb-3\">\n          <label for=\"thumbnailInput\">Thumbnail</label>\n          <input id=\"thumbnailInput\" type=\"url\" class=\"form-control\" value=\"").concat(product.thumbnail, "\" aria-label=\"file example\" required>\n          <div class=\"invalid-feedback\">Example invalid form file feedback</div>\n        </div>\n  \n        <div class=\"mb-3\">\n          <label for=\"imagesInput\">Images</label>\n          <input id=\"imagesInput\" type=\"url\" class=\"form-control\" value=\"").concat(product.images, "\" aria-label=\"file example\" multiple required>\n          <div class=\"invalid-feedback\">Example invalid form file feedback</div>\n        </div>\n  \n        <button id=\"submitBtn\" type=\"submit\" class=\"btn btn-primary\">Submit</button>\n      </form>\n    </div>\n     \n      ");
                    return [4 /*yield*/, fetch('https://dummyjson.com/products/categories')];
                case 3:
                    categoriesResponse = _a.sent();
                    return [4 /*yield*/, categoriesResponse.json()];
                case 4:
                    categories = _a.sent();
                    selectElement_1 = document.getElementById('categoryInput');
                    categories.forEach(function (category) {
                        var option = document.createElement('option');
                        option.text = category;
                        option.value = category;
                        selectElement_1.add(option);
                    });
                    return [4 /*yield*/, fetch('https://dummyjson.com/products')];
                case 5:
                    productsResponse = _a.sent();
                    return [4 /*yield*/, productsResponse.json()];
                case 6:
                    productsData = _a.sent();
                    products = productsData.products;
                    brands_1 = [];
                    // Extract all unique brands
                    products.forEach(function (product) {
                        if (!brands_1.includes(product.brand)) {
                            brands_1.push(product.brand);
                        }
                    });
                    brandInput_1 = document.getElementById('brandInput');
                    brands_1.forEach(function (brand) {
                        var option = document.createElement('option');
                        option.value = brand;
                        option.textContent = brand;
                        brandInput_1.appendChild(option);
                    });
                    form_1 = document.forms.namedItem('modalForm');
                    form_1.addEventListener('submit', function (event) {
                        var nameInput = document.getElementById('nameInput');
                        var descriptionInput = document.getElementById('descriptionInput');
                        var categoryInput = document.getElementById('categoryInput');
                        var brandInput = document.getElementById('brandInput');
                        var priceInput = document.getElementById('priceInput');
                        var discountInput = document.getElementById('discountInput');
                        var ratingInput = document.getElementById('ratingInput');
                        var stockInput = document.getElementById('stockInput');
                        var thumbnailInput = document.getElementById('thumbnailInput');
                        var imagesInput = document.getElementById('imagesInput');
                        event.preventDefault(); // para que no redireccione cuando se manda
                        form_1.classList.add('was-validated');
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
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
