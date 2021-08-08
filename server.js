const express = require('express');
const app = express();
app.use(requireHTTPS);

// Serve static files
app.use(express.static("/dist/angularcargahoras"));

// Send all requests to index.html
app.get("/*", function(req, res) {
  res.sendFile("index.html", {root: "dist/angularcargahoras/"});
});

// default Heroku port
app.listen(process.env.PORT || 8080);

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

