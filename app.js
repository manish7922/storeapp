let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,OPTIONS,POST,PATCH,DELETE,HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});
const port = 2410;
app.listen(port, () => console.log(`node app listening on port ${port}!`));
let { shopData } = require("./data");
let { productData } = require("./data");
let { purchaseData } = require("./data");
let fs = require("fs");
let fname = "shops.json";
let fname1 = "products.json";
let fname2 = "purchases.json";

app.get("/shops", function (req, res) {
  fs.readFile(fname, "utf8", function (err, data) {
    if (err) res.status(404).send(err);
    else {
      let studentArr = JSON.parse(data);
      console.log(studentArr);
      res.send(studentArr);
    }
  });
});
app.get("/products", function (req, res) {
  fs.readFile(fname1, "utf8", function (err, data) {
    if (err) res.status(404).send(err);
    else {
      let studentArr = JSON.parse(data);
      res.send(studentArr);
    }
  });
});
app.get("/purchases", function (req, res) {
  fs.readFile(fname2, "utf8", function (err, data) {
    if (err) res.status(404).send(err);
    else {
      let studentArr = JSON.parse(data);
      res.send(studentArr);
    }
  });
});
app.post("/shops", function (req, res) {
  let body = req.body;
  fs.readFile(fname, "utf8", function (err, data) {
    if (err) res.status(404).send(err);
    else {
      let studentArr = JSON.parse(data);
      let maxid = studentArr.reduce(
        (a, c) => (c.shopId >= a ? c.shopId : a),
        0
      );
      let newid = maxid + 1;
      let newStudent = { shopId: newid, ...body };
      studentArr.push(newStudent);
      let data1 = JSON.stringify(studentArr);
      fs.writeFile(fname, data1, function (err) {
        if (err) res.status(404).send(err);
        else res.send(newStudent);
      });
    }
  });
});
app.post("/products", function (req, res) {
  let body = req.body;
  fs.readFile(fname1, "utf8", function (err, data) {
    if (err) res.status(404).send(err);
    else {
      let studentArr = JSON.parse(data);
      let maxid = studentArr.reduce(
        (a, c) => (c.productId >= a ? c.productId : a),
        0
      );
      let newid = maxid + 1;
      let newStudent = { productId: newid, ...body };
      studentArr.push(newStudent);
      let data1 = JSON.stringify(studentArr);
      fs.writeFile(fname1, data1, function (err) {
        if (err) res.status(404).send(err);
        else res.send(newStudent);
      });
    }
  });
});
app.post("/purchases", function (req, res) {
  let body = req.body;
  fs.readFile(fname2, "utf8", function (err, data) {
    if (err) res.status(404).send(err);
    else {
      let studentArr = JSON.parse(data);
      let maxid = studentArr.reduce(
        (a, c) => (c.purchaseId >= a ? c.purchaseId : a),
        0
      );
      let newid = maxid + 1;
      let newStudent = { purchaseId: newid, ...body };
      studentArr.push(newStudent);
      let data1 = JSON.stringify(studentArr);
      fs.writeFile(fname2, data1, function (err) {
        if (err) res.status(404).send(err);
        else res.send(newStudent);
      });
    }
  });
});
app.get("/products/:productId", function (req, res) {
  let productId = +req.params.productId;
  fs.readFile(fname1, "utf8", function (err, data) {
    if (err) res.status(404).send(err);
    else {
      let studentArr = JSON.parse(data);
      let student = studentArr.find((st) => st.productId === productId);
      if (student) res.send(student);
      else res.status(404).send("no student find");
    }
  });
});
app.put("/products/:productId", function (req, res) {
  let productId = +req.params.productId;
  let body = req.body;
  fs.readFile(fname1, "utf8", function (err, data) {
    if (err) res.status(404).send(err);
    else {
      let studentArr = JSON.parse(data);
      console.log(studentArr);
      let index = studentArr.findIndex((st) => st.productId === productId);
      if (index > 0) {
        let updatedStudent = { ...studentArr[index], ...body };
        productData[index] = updatedStudent;
        let data1 = JSON.stringify(studentArr);
        fs.writeFile(fname1, data1, function (err) {
          if (err) res.status(404).send(err);
          else res.send(updatedStudent);
        });
      } else {
        res.status(404).send("no data find");
      }
    }
  });
});
app.get("/purchases/products/:productid", function (req, res) {
  let productid = +req.params.productid;
  fs.readFile(fname2, "utf8", function (err, data) {
    if (err) res.status(404).send(err);
    else {
      let studentArr = JSON.parse(data);
      let student = studentArr.filter((st) => st.productid === productid);
      if (student) res.send(student);
      else res.status(404).send("no student find");
    }
  });
});
app.get("/purchases/shops/:shopId", function (req, res) {
  let shopId = +req.params.shopId;
  fs.readFile(fname2, "utf8", function (err, data) {
    if (err) res.status(404).send(err);
    else {
      let studentArr = JSON.parse(data);
      let student = studentArr.filter((st) => st.shopId === shopId);
      if (student) res.send(student);
      else res.status(404).send("no student find");
    }
  });
});
app.post("/shops", function (req, res) {
  let body = req.body;
  fs.readFile(fname, "utf8", function (err, data) {
    if (err) res.status(404).send(err);
    else {
      let studentArr = JSON.parse(data);
      let maxid = studentArr.reduce(
        (a, c) => (c.shopId >= a ? c.shopId : a),
        0
      );
      let newid = maxid + 1;
      let newStudent = { shopId: newid, ...body };
      studentArr.push(newStudent);
      let data1 = JSON.stringify(studentArr);
      fs.writeFile(fname, data1, function (err) {
        if (err) res.status(404).send(err);
        else res.send(newStudent);
      });
    }
  });
});

app.post("/totalPurchases/:productid", function (req, res) {
  let productid = +req.params.productid;
  fs.readFile(fname2, "utf8", function (err, data) {
    if (err) res.status(404).send(err);
    else {
      let studentArr = JSON.parse(data);
      let maxid = studentArr.reduce(
        (a, c) => (c.productid == a ? c.productid : a),
        0
      );
    }
  });
});
