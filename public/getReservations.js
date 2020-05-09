$(document).ready(function () {

    $.get(`./api/tables`, function (data) {
        console.log(data);
        if (data) {
                for (let i = 0; data.length; i++) {
                    const listItem = $("<li>")
                    listItem.addClass("list-group-item")
                    const heading = $("<h4>").text(`Table #${i+1}`);
                    const itemName = $("<h4>")
                    itemName.text("Name: " + data[i].name)
                    const itemPhone = $("<h4>")
                    itemPhone.text("Phone:" + data[i].phone)
                    const itemEmail = $("<h4>")
                    itemEmail.text("Email:" + data[i].email)
                    const itemId = $("<h4>")
                    itemId.text("Id:" + data[i].id)
                    $(listItem).append([heading, itemName, itemPhone, , itemEmail, itemId])
                    $("#tableList").append(listItem);
                }

        }
        else {
            const errorListItem = ("<li>").text("No tables booked yet");
            $("#waitingList").append(errorListItem);
        }
    });

    $.get(`./api/waitList`, (data) => {
        if (data) {
            for (let i = 0; data.length; i++) {
                const listItem = $("<li>")
                listItem.addClass("list-group-item")
                const heading = $("<h4>").text(`Table #${i}`);
                const itemName = $("<h4>")
                itemName.text(data[i].name)
                const itemPhone = $("<h4>")
                itemPhone.text(data[i].phone)
                const itemEmail = $("<h4>")
                itemEmail.text(data[i].email)
                const itemId = $("<h4>")
                itemId.text(data[i].id)
                $(listItem).append([heading, itemName, itemPhone, , itemEmail, itemId])
                $("#waitingList").append(listItem);
            }
        }
        else {
            const errorListItem = ("<li>").text("Nobody on the wait list yet.");
            $("#waitingList").append(errorListItem);
        }

    })

})