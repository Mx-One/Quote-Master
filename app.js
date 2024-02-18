const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(express.static("public"));

// libraries
const papaParse = 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js';
const jspreadsheetCE_1 = "https://bossanova.uk/jspreadsheet/v4/jexcel.js";
const jspreadsheetCE_2 = "https://jsuites.net/v4/jsuites.js";
const jspreadsheetCE_3 = "https://jsuites.net/v4/jsuites.css";
const jspreadsheetCE_4 = "https://bossanova.uk/jspreadsheet/v4/jexcel.css";
const html2pdf = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js";
const numberFormater = "https://cdn.jsdelivr.net/npm/number-formatter@1.2.0/lib/format.min.js";
const twoJS = "https://cdnjs.cloudflare.com/ajax/libs/two.js/0.8.10/two.min.js"


let url = "entry.ejs";

const trueLogin = "User";
const truePass = "Test";

let login = "";
let pass = "";
let layoutBtn = 0;


app.get("/", function(req,res) {

  const port = app.get('port')

  if (layoutBtn > 0) {

    url = 'optimal-cutting.min.ejs';

  }

  if (login == trueLogin && pass == truePass) {

    // url = 'optimal-cutting-algo-test.ejs';
    url = 'main-mini.ejs';
    login = "";
    pass = "";

  }

  res.render(url,
  {
    library1: papaParse,
    library2: jspreadsheetCE_1,
    library3: jspreadsheetCE_2,
    library4: jspreadsheetCE_3,
    library5: jspreadsheetCE_4,
    library6: html2pdf,
    library7: numberFormater,
    library8: twoJS,
  }
)

// url = "main-mini.ejs";

})

app.post('/', function(req,res) {

  if (req.body.layoutBtn === 'btn') {

    layoutBtn = 1;

  } else {

    layoutBtn = 0;
    login = req.body.login
    pass = req.body.password

  }

  res.redirect('/')
})


app.post('/submit', function(req,res) {

  layoutBtn = 0;
  url = 'main-mini.ejs';
  res.redirect('/');

});




app.set('port', (process.env.PORT || 3000));

//Start Server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
