$(document).ready(function () {
    $("#submit-btn").on("click", function(e) {
        e.preventDefault();
        let reservation = {
            name: $("#reserve-name").val().trim(),
            phone: $("#reserve-phone").val().trim(),
            email: $("#reserve-email").val().trim(),
            id: $("#reserve-id").val().trim()
        }
        $.post("./api/tables", reservation)
            .then((data) => {
                console.log(data);
                alert(data);
            })
            .catch((err) => {
                console.log(err);
            }); 

    })
})