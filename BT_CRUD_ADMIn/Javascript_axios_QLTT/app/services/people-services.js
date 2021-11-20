function PeopleServices() {
    this.getListPeopleApi = function() {
        return axios({
            url: `https://6187f09a057b9b00177f9b28.mockapi.io/api/teacher_student_QLTT`,
            method: "GET"
        });
    }

    this.addPeopleApi = function(people) {
        return axios({
            url: `https://6187f09a057b9b00177f9b28.mockapi.io/api/teacher_student_QLTT`,
            method: "POST",
            data: people
        });
    }

    this.deletePeopleApi = function(id) {
        return axios({
            url: `https://6187f09a057b9b00177f9b28.mockapi.io/api/teacher_student_QLTT/${id}`,
            method: "DELETE"
        });
    }

    this.getPersonByID = function(id) {
        return axios({
            url: `https://6187f09a057b9b00177f9b28.mockapi.io/api/teacher_student_QLTT/${id}`,
            method: "GET"
        })       
    }

    this.updatePersonApi = function(person) {
        return axios({
            url: `https://6187f09a057b9b00177f9b28.mockapi.io/api/teacher_student_QLTT/${id}`,
            method: "PUT",
            data: person
        });
    }
}