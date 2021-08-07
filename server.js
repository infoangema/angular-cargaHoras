const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static("./dist/angularcargahoras"));

// Send all requests to index.html
app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "dist/angularcargahoras" });
});

// default Heroku port
app.listen(process.env.PORT || 8080);

