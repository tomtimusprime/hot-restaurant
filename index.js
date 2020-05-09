const express = require("express");
const app = express();
const path = require("path");
const reservations = require("./reservations.js");
const waitList = require("./waitlist.js");
const PORT = process.env.PORT || 3000;

// used for converting/reading data as json that is in POST body.
app.use(express.json());
// used to read arrays/strings that the FORM POSTs.
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (request, response) {
    console.log(`/ called`);
    response.sendFile(path.join(__dirname, "/public/home.html"));
    // response.sendFile(__dirname + "/public/index.html");
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/tables.html"));
});

app.get("/api/waitList", function (request, response) {
    console.log(`/api/waitList called`);
    response.json(waitList);
});

app.get("/api/tables", function (request, response) {
    console.log(`/api/tables called`);
    response.json(reservations);
});

app.get("/api/tables/:id", function (request, response) {
    console.log(`/api/tables/${request.params.id} called`);

    let reservationId = request.params.id;

    for (let i = 0; i < reservations.length; i++) {
        if (reservations[i].id === reservationId) {
            console.log(reservations[i]);

            return response.json(reservations[i]);
        }
}
    return response.json(false);
});

app.post("/api/tables", function (request, response) {
    console.log(`POST /api/tables called`);
    const newReservation = request.body;
    newReservation.id = (request.body.name.split(" "))[0].toLowerCase();

    console.log(newReservation);

    if(reservations.length > 5) {
        waitList.push(newReservation);
        console.log(waitList);
        response.json("You've been added to the waitlist.");
    }
    else {
        reservations.push(newReservation);
        response.json("Your reservation has been added.");
    }
});
// app.post("/api/waitList", function (request, response) {
//     console.log(`POST /api/waitList called`);

//     console.log(newReservation);
//     if(reservations.length > 5) {
//         const newReservation = request.body;
//         newReservation.id = (request.body.name.split(" "))[0].toLowerCase();
//         waitList.push(newReservation);
//         response.json(newReservation);
//     }
// });



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});

// app.post("/api/reservations", (request, response) => {
//     console.log(`Api waitlist called`);
//     const newWaitList = request.body;
//     newWaitList.id = (request.body.name.split(" "))[0].toLowerCase();
    
//     console.log(newWaitList);
//     waitList.push(newWaitList);
//     response.json(newWaitList);
// })


