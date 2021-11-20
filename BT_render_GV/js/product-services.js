function ProductServices() {
    this.getListProudctApi = function() {
        return axios({
            url: "https://6187f09a057b9b00177f9b28.mockapi.io/api/teacher_student_QLTT",
            method: "GET"
        });
    };
}
