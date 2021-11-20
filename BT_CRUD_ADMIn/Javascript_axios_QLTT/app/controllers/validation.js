function Validation() {
    this.checkEmpty = function(value, message, pID) {
        if(value.trim() != "") {
            document.getElementById(pID).innerHTML =  "";
            document.getElementById(pID).style.display = "none";
            return true;
        } 
            document.getElementById(pID).innerHTML = message;
            document.getElementById(pID).style.display = "block";
            return false;
    }

    this.checkDuplicateUsername = function(value, message, pID, peopleArray) {
        let isExist = true;
        console.log(peopleArray);
        isExist =  peopleArray.some(person => {
            return person.taiKhoan == value;
        });

        if(isExist) {
            document.getElementById(pID).innerHTML = message;
            document.getElementById(pID).style.display = "block";
            return false;
        }
            document.getElementById(pID).innerHTML =  "";
            document.getElementById(pID).style.display = "none";
            return true;
    }

    this.checkFullName = function(value, message, pID) {
        let pattern = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$";

        //pattern transform to RegExp
        let regex = new RegExp(pattern);
        if(regex.test(value)) {
            document.getElementById(pID).innerHTML =  "";
            document.getElementById(pID).style.display = "none";
            return true;
        }
            document.getElementById(pID).innerHTML = message;
            document.getElementById(pID).style.display = "block";
            return false;
    }

    this.checkPassword = function(value, message, pID) {
        let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;

        if(value.match(pattern)) {
            document.getElementById(pID).innerHTML =  "";
            document.getElementById(pID).style.display = "none";
            return true;
        }
            document.getElementById(pID).innerHTML = message;
            document.getElementById(pID).style.display = "block";
            return false;
    }

    this.checkEmail = function(value, message, pID) {
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(value.match(pattern)) {
            document.getElementById(pID).innerHTML =  "";
            document.getElementById(pID).style.display = "none";
            return true;
        }

            document.getElementById(pID).innerHTML = message;
            document.getElementById(pID).style.display = "block";
            return false;
    }

    this.isSelected = function(value, message, pID) {
        if(value != "0") {
            document.getElementById(pID).innerHTML =  "";
            document.getElementById(pID).style.display = "none";
            return true;   
        }
            document.getElementById(pID).innerHTML = message;
            document.getElementById(pID).style.display = "block";
            return false;
    }

    this.checkDescription = function(value, message, pID) {
        if(value.trim() != "" && value.length <= 60) {
            document.getElementById(pID).innerHTML =  "";
            document.getElementById(pID).style.display = "none";
            return true; 
        }
            document.getElementById(pID).innerHTML = message;
            document.getElementById(pID).style.display = "block";
            return false;
    }
}   