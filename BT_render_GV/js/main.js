let services = new ProductServices();

function getELE(id) {
    return document.getElementById(id);
}

function getListProduct() {
    services
            .getListProudctApi()
            .then(result => {
                console.log(result);
                let tmp = result.data;
                const newLine = /\n/;
                tmp.forEach(product => {
                    product.moTa = product.moTa.replace(newLine, `</br>`);
                });
                renderListData(tmp);
            })
            .catch(error => {
                console.log(error);
            });
}
getListProduct();

function renderListData(arrProduct) {
    let contentHTML = "";
    arrProduct.forEach(product => {
        if(product.loaiND == "GV") {
            contentHTML += `
            <div class="col-3 override">
                <div class="products__item">
                    <div class="products__img">
                        <img src="./images/${product.hinhAnh}" alt="">
                    </div>
        
                    <div class="products__text">
                        <h3>${product.ngonNgu}</h3>
                        <h2>${product.hoTen}</h2>
                        <p>${product.moTa}</p>
                    </div>
                </div>
            </div>`;
        }
    });
    getELE("products__content").innerHTML = contentHTML;
}