// SDB
const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;
const id = require("uniqid");

app.set("view engine", "pug");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  let created = req.query.created;

  let students = getAll("students");

  if (created) {
    res.render("list", { created: true, students: students });
  } else {
    res.render("list", { created: false, students: students });
  }
});

app.get("/detail", (req, res) => {
  let id = req.query.id;

  let students = getAll("students");

  let student = students.find((s) => s.id == id);

  res.render("list", { student: student });
});

app.get("/student/:id", (req, res) => {
  let selectedId = req.params.id;

  let students = getAll("students");

  let student = students.find((s) => s.id === selectedId);

  res.render("list", {
    selectedId: selectedId,
    student: student,
    students: students,
  });
});

app.get("/create", (req, res) => {
  res.render("create", {});
});

app.post("/create", (req, res) => {
  let data = req.body;

  let student = {
    id: id(),
    fullname: data.fullname,
    phone: data.phone,
    email: data.email,
    address: data.address,
    index: data.postindex,
  };

  let students = getAll("students");

  students.push(student);

  writeAll("students", students);

  res.redirect("/?created=true");
});

app.post("/delete", (req, res) => {
  let id = req.body.id;

  let students = getAll("students");

  try {
    let index = students.findIndex((s) => s.id === id);

    if (index !== -1) {
      students.splice(index, 1);

      writeAll("students", students);

      res.redirect("/?deleted=true");
    } else {
      res.status(404).send("Student not found");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/update/:id", (req, res) => {
  const id = req.params.id;

  let students = getAll("students");

  let student = students.find((s) => s.id === id);

  res.render("update", { student: student });
});

app.post("/update", (req, res) => {
  let data = req.body;

  let students = getAll("students");

  let index = students.findIndex((s) => s.id === data.id);

  if (index !== -1) {
    students[index].fullname = data.fullname;
    students[index].phone = data.phone;
    students[index].email = data.email;
    students[index].address = data.address;
    students[index].index = data.postindex;

    writeAll("students", students);

    res.redirect(`/student/${data.id}`);
  } else {
    res.status(404).send("Student not found");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function getAll(filename) {
  return JSON.parse(fs.readFileSync(`./data/${filename}.json`));
}

function writeAll(filename, data) {
  return fs.writeFileSync(`./data/${filename}.json`, JSON.stringify(data));
}
