// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//sample data
const tables = [ {
    id: "trilogy1",
    name: "trilogy",
    email: "some@email.com",
    phone: "00000000000000"
} ];

const waitlist = [{
    id: "trilogy2",
    name: "frthvvv",
    email: "some1@email.com",
    phone: "00000000000000"
} ];

// Routes
// =============================================================
//adding home page route
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./templates/home.html"));
});

//tables route. GET returning tables data
app.get("/tables", function(req, res) {
    return res.json(tables);
});

// Displays all table info JSON format.
app.get("/api/tables", function (req, res) {
  return res.json(tables);
});

// Displays all table info.
app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});

// Basic route that sends the user first to the AJAX Page
app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "./templates/reservations.html"));
});


//post route
app.post("/add/customer", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    let customer  = req.body;
    // Using a RegEx Pattern to remove spaces from newCharacter
    customer.routeName = customer.name.replace(/\s+/g, "").toLowerCase();
    console.log(customer);
    makeRes(customer)
    res.json(customer);
  });

function makeRes(customer){
    let count= tables.length;
    if (count <= 5){
        tables.push(customer)
    }
    else {
        waitlist.push(customer)
    }
}

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
