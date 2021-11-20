let services    = new PeopleServices();
let validation  = new Validation();
function getELE(id) {
    return document.getElementById(id);
}

function getListPeople() {
    services
            .getListPeopleApi()
            .then(result => {
                renderListData(result.data);
                setLocalStorage(result.data);
            }) 
            .catch(error => {
                console.log(error);
            });
}
getListPeople();

function renderListData(arrPeople) {
    let contentHTMl = "";
    arrPeople.forEach((person, index) => {
        contentHTMl += `
            <tr>    
                <td>${index}</td>
                <td>${person.taiKhoan}</td>
                <td>${person.matKhau}</td>
                <td>${person.hoTen}</td>
                <td>${person.email}</td>
                <td>${person.ngonNgu}</td>
                <td>${person.moTa}</td>
                <td>${person.loaiND}</td>
                <td>
                    <button onclick="editPerson('${person.id}')" class="btn btn-success"  data-toggle="modal" data-target="#myModal">Edit</button>
                    <button onclick="deletePeople('${person.id}')" class="btn btn-danger">Delete</button>
                </td>
            </tr>
        `;
    });
    getELE("tblDanhSachNguoiDung").innerHTML = contentHTMl;
}

/**
 * Add People
 */

getELE("btnThemNguoiDung").onclick = () => {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm Người Mới";
    let footer = `<button onclick="addPeople()" class="btn btn-success">
                    Thêm
                </button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
}

/**
 * Form Validation
 */

function isValidForm(taiKhoan, hoTen, matKhau, email, loaiNguoiDung, loaiNgonNgu, moTa, hinhAnh, peopleArray) {
    let isValid = true;

    isValid &= validation.checkEmpty(taiKhoan, "Tài Khoản Không Được Để Trống!!!", "txtTaiKhoan") && validation.checkDuplicateUsername(taiKhoan, "Trùng tài Khoản !!!", "txtTaiKhoan", peopleArray);

    isValid &= validation.checkEmpty(hoTen, "Họ Tên Không Được Để Trống!!!", "txtHoTen") && validation.checkFullName(hoTen, "Không chứa số và ký tự đặc biệt", "txtHoTen");
    
    isValid &= validation.checkEmpty(matKhau, "Mật Khẩu Không Được Để Trống!!!", "txtPassword") && validation.checkPassword(matKhau, "Mật khẩu phải Đúng Định Dạng!!!", "txtPassword");

    isValid &= validation.checkEmpty(email, "Email Không Được Để Trống !!!", "txtEmail") && validation.checkEmail(email, "Email Phải Đúng Định Dạng", "txtEmail");

    isValid &= validation.checkEmpty(hinhAnh, "Hình Ảnh Không Được Để Trống", "txtHinhAnh");

    isValid &= validation.isSelected(loaiNguoiDung, "Loại Người Dùng Không Được Để Trống!!!", "txtLoaiNguoiDung");

    isValid &= validation.isSelected(loaiNgonNgu, "Loại Ngôn Ngữ Không Được Để Trống", "txtLoaiNgonNgu");

    console.log(moTa);
    isValid &= validation.checkDescription(moTa, "Mô Tả Không Được Để Trống", "txtMoTa");

    return isValid;
}

/**
 * Add People
 */

function addPeople() {
    let taiKhoan        = getELE("TaiKhoan").value;
    let hoTen           = getELE("HoTen").value;
    let matKhau         = getELE("MatKhau").value;
    let email           = getELE("Email").value;
    let hinhAnh         = getELE("HinhAnh").value;
    let loaiNguoiDung   = getELE("loaiNguoiDung").value;
    let loaiNgonNgu     = getELE("loaiNgonNgu").value;
    let moTa            = getELE("MoTa").value;
    let people          = new People("", taiKhoan, hoTen, matKhau, email, loaiNguoiDung, loaiNgonNgu, moTa, hinhAnh);

    // let isValid         = true;
    services 
            .getListPeopleApi()
            .then(result => {
                let isValid = true;

                isValid =  isValidForm(taiKhoan, hoTen, matKhau, email, loaiNguoiDung, loaiNgonNgu, moTa, hinhAnh, result.data);

                if(isValid) {
                    services 
                            .addPeopleApi(people)
                            .then(result => {
                                alert("Add successfully!!!!");
                                document.getElementsByClassName("close")[0].click();
                                getListPeople();
                                setLocalStorage(result.data);
                                
                            })
                            .catch(error => {
                                console.log(error);
                            })
                }
            })
            .catch(error => {
                console.log(error);
            })
    
}   

/**
 * Delete People
 */

function deletePeople(id) {
    services
            .deletePeopleApi(id)
            .then(result => {
                alert("Delete successfully!!!");
                getListPeople();
                setLocalStorage(result.data);
            })
            .catch(error => {
                console.log(error);
            });
}

/**
 * Edit Person
 */

function editPerson(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa Thông Tin"; 
    let footer = `
        <button onclick="updatePerson('${id}')" class="btn btn-success">
            Xác Nhận
        </button>
    `;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

    services
            .getPersonByID(id)
            .then(result => {
                getELE("TaiKhoan").value       = result.data.taiKhoan;
                getELE("HoTen").value          = result.data.hoTen;
                getELE("MatKhau").value        = result.data.matKhau;
                getELE("Email").value          = result.data.email;
                getELE("HinhAnh").value        = result.data.hinhAnh;
                getELE("loaiNguoiDung").value  = result.data.loaiND;
                getELE("loaiNgonNgu").value    = result.data.ngonNgu;
                getELE("MoTa").value           = result.data.moTa;
            })
            .catch(error => {
                console.log(error);
            });

}

function updatePerson(id) {
    let taiKhoan        = getELE("TaiKhoan").value;
    let hoTen           = getELE("HoTen").value;
    let matKhau         = getELE("MatKhau").value;
    let email           = getELE("Email").value;
    let hinhAnh         = getELE("HinhAnh").value;
    let loaiNguoiDung   = getELE("loaiNguoiDung").value;
    let loaiNgonNgu     = getELE("loaiNgonNgu").value;
    let moTa            = getELE("MoTa").value;
    let person          = new People(id, taiKhoan, hoTen, matKhau, email, loaiNguoiDung, loaiNgonNgu, moTa, hinhAnh);

    services 
            .updatePersonApi(person)
            .then(result => {
                alert("Update successfully!!!!");
                document.getElementsByClassName("close")[0].click();
                getListPeople();
            })
            .catch(error => {
                console.log(error);
            })
}

/**
 * Search Person
 */

function setLocalStorage(peopleArray) {
    localStorage.setItem("peopleArray", JSON.stringify(peopleArray));
}


getELE("txtSearch").onkeyup = () => {
    let keyword = getELE("txtSearch").value;
    console.log(keyword);
    services
            .getListPeopleApi()
            .then(result => {
                let newPeopleArray = processSearch(result.data, keyword);
                console.log(newPeopleArray);
                if(newPeopleArray.length) {
                    renderListData(newPeopleArray);
                    console.log("ok");
                }
            })
            .catch(error => {
                console.log(error);
            })
}

function processSearch(peopleArray, keyword) {
    let newPeopleArray = [];
    //Valid 
    let kword = keyword.trim().toLowerCase();
    peopleArray.forEach(person => {
        let nameOfPerson = person.hoTen.toLowerCase();
        console.log(nameOfPerson);
        if(nameOfPerson.indexOf(kword) > -1) {
            console.log("Search Successfully");
            newPeopleArray.push(person);
        }
    });
    return newPeopleArray;
}
