const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// model =>
const EmployeList = require("./model/employeList.js");
const TodayClass = require("./model/todayClass.js");
const PostActivity = require("./model/postactivity.js");
const User = require("./model/user.js");
const TestList = require("./model/testlist.js");

const app = express();

mongoose.connect("mongodb+srv://mahfuj-nm-one:mahfuj123@nm-one-cluster.1jgtb.mongodb.net/nmtest?retryWrites=true&w=majority", () => {
  console.log("MongoDB Connected!");
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello!");
});

//////////// Employelist ///////////
// post testlist data
app.post("/testlist", (req, res) => {
  const items = {
    name: req.body.name,
    officeTime: req.body.officeTime,
    desgnation: req.body.desgnation,
    dayOff: req.body.dayOff,
    details: req.body.details,
  };
  const doc = new TestList(items);
  doc.save();
  res.send("Data added!");
});

app.get("/testlist", async (req, res) => {
  let data = await TestList.find({});
  res.send(data);
});

// post employe data
app.post("/employelist", (req, res) => {
  const items = {
    name: req.body.name,
    officeTime: req.body.officeTime,
    desgnation: req.body.desgnation,
    dayOff: req.body.dayOff,
  };
  const doc = new EmployeList(items);
  doc.save();
});

// get employe all json data
app.get("/employelist", async (req, res) => {
  const data = await EmployeList.find({});
  res.send(data);
});

// delete employe with id
app.delete("/employelist/:id", (req, res) => {
  EmployeList.findByIdAndDelete(req.params.id, (err, docs) => {
    console.log(err);
    console.log(docs);
  });
});

// get single employelist with id
app.get("/employelist/:id", async (req, res) => {
  const data = await EmployeList.findById(req.params.id);
  res.send(data);
});

// edit/put employelist data with id
app.put("/employelist/:id", function (req, res) {
  let items = {
    name: req.body.name,
    officeTime: req.body.officeTime,
    desgnation: req.body.desgnation,
    dayOff: req.body.dayOff,
  };
  EmployeList.findByIdAndUpdate(req.params.id, items, (err, docs) => {
    console.log(err);
    console.log(docs);
  });
});

////////// TodayClass ///////

// post todayclass data
app.post("/todayclass", (req, res) => {
  items = {
    batch: req.body.batch,
    time: req.body.time,
    room: req.body.room,
    present: req.body.present,
  };

  const doc = new TodayClass(items);
  doc.save();
});

// get todayclass data
app.get("/todayclass", async (req, res) => {
  const data = await TodayClass.find({});
  res.send(data);
});

// delete todayclass data with id
app.delete("/todayclass/:id", (req, res) => {
  TodayClass.findByIdAndDelete(req.params.id, (err, docs) => {});
});

// edit/put todayclass data with id
app.put("/todayclass/:id", (req, res) => {
  const items = {
    batch: req.body.batch,
    time: req.body.time,
    room: req.body.room,
    present: req.body.present,
  };
  TodayClass.findByIdAndUpdate(req.params.id, items, (err, docs) => {
    console.log(err);
    console.log(docs);
  });
});

////////// Activity Details //////////
// post activity data
app.post("/postactivity", (req, res) => {
  const items = {
    name: req.body.name,
    hour: req.body.hour,
    details: req.body.details,
  };
  const doc = new PostActivity(items);
  doc.save();
});

// get post activity data
app.get("/postactivity", async (req, res) => {
  const data = await PostActivity.find({});
  res.send(data);
});

// post activity delete
app.delete("/postactivity/:id", (req, res) => {
  PostActivity.findByIdAndDelete(req.params.id, (err, docs) => {
    console.log(err);
    console.log(docs);
  });
});

// post activity edit/put
app.put("/postactivity/:id", (req, res) => {
  const items = {
    name: req.body.name,
    hour: req.body.hour,
    details: req.body.details,
  };
  PostActivity.findByIdAndUpdate(req.params.id, items, (err, docs) => {
    console.log(err);
    console.log(docs);
  });
});

// Registration
// post registration data
app.post("/registration", (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    // Store hash in your password DB.
    items = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
    };

    const doc = new User(items);
    doc.save();

    res.send({
      msg: "account-created",
      currentUser: {
        uid: "",
        displayName: req.body.name,
        email: req.body.email,
      },
      metaData: {
        created: "21 May 2022",
        lastLogin: "29 May 2022",
      },
    });
  });
});

// get user all json data
app.get("/user", async (req, res) => {
  const data = await User.find({});
  res.send(data);
});

//post and get login user data
app.post("/login", async (req, res) => {
  const data = await User.find({ email: req.body.email });

  if (data[0]) {
    bcrypt.compare(req.body.password, data[0].password, function (err, result) {
      if (result) {
        res.send({
          msg: "account-found",
          currentUser: {
            uid: data[0]._id,
            displayName: data[0].name,
            email: data[0].email,
          },
          metaData: {
            created: "21 May 2022",
            lastLogin: "29 May 2022",
          },
        });
      } else {
        res.send({ msg: "wrong-password" });
      }
    });
  } else {
    res.send({ msg: "email-not-found" });
  }
});

// server running port
app.listen("8000", () => {
  console.log("Server running on 8000 port!");
});
