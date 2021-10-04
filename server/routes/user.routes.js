const express = require("express");
const router = express.Router();
const MoloniApi = require("../api/moloni");
const Goal = require("../models/goalmodel");
const DanceClass = require("../models/danceclassmodel");

const { isAuthenticated } = require("./../middleware/jwt.middleware.js");

router.get("/my-goals", isAuthenticated, (req, res) => {
  const user = req.payload;

  Goal.find({ user: user._id })
    .then((goals) => {
      res.status(201).json(goals);
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

router.get("/my-invoices", isAuthenticated, (req, res) => {
  const user = req.payload;

  MoloniApi.getInvoices(user.customer_id).then((response) => {
    const documents = response.data;

    const documentsInfo = documents.map((document) => {
      return {
        document_id: document.document_id,
        date: document.date.slice(0, 10),
        value: `${document.net_value}€`,
      };
    });

    return res.status(200).json(documentsInfo);
  });
  return;
});

router.get("/download-document/:documentId", isAuthenticated, (req, res) => {
  const user = req.payload;
  const { documentId } = req.params;

  MoloniApi.getPDFLink(documentId).then((response) => {
    return res.status(200).json(response.data);
  });
  return;
});

router.post("/add-my-goal", (req, res) => {
  const { title, plan, user } = req.body;

  if (title === "" || plan === "") {
    res.status(400).json({
      message: "Por favor coloca o teu objectivo e o plano para alcançá-lo.",
    });
    return;
  }

  Goal.create({ title, plan, user })
    .then((goal) => {
      res.status(201).json({ goal });
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

router.post("/edit-my-goal", isAuthenticated, (req, res) => {
  const { title, plan, _id } = req.body;
  const user = req.payload;
  console.log(`req.payload`, req.payload);

  if (title === "" || plan === "") {
    res.status(400).json({
      message: "Por favor coloca o teu objectivo e o plano para alcançá-lo.",
    });
    return;
  }

  Goal.findById(_id)
    .then((goal) => {
      if (user._id == goal.user) {
        goal.title = title;
        goal.plan = plan;
        goal
          .save()
          .then(() => {
            res.status(201).json({ goal });
          })
          .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
});

router.post("/delete-my-goal", isAuthenticated, (req, res) => {
  const { title, plan, _id } = req.body;
  const user = req.payload;
  console.log(`req.payload`, req.payload);

  if (title === "" || plan === "") {
    res.status(400).json({
      message: "Por favor coloca o teu objectivo e o plano para alcançá-lo.",
    });
    return;
  }

  Goal.findById(_id)
    .then((goal) => {
      if (user._id == goal.user) {
        goal
          .remove()
          .then(() => {
            res.status(201).json({ goal });
          })
          .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
});

/* GET users listing. */
router.get("/get-customer/:vat", (req, res, next) => {
  const { vat } = req.params;
  console.log("aqui", vat);

  MoloniApi.getByVat(vat).then((response) => {
    console.log(response);
    if (response.data.length === 0) {
      res.status(400).json({ message: "no customer" });
    } else {
      res.status(200).json(response.data);
    }
  });
});

router.get("/count", (req, res, next) => {
  console.log("entrou");

  MoloniApi.getCountClients().then((response) => {
    console.log(response);
    res.status(200).json(response.data);
    // res.json(user)
  });
});

// just to populate my database with some dance style classes
router.get("/add-my-class", (req, res) => {
  DanceClass.create({ style: "ballet", level: "grade 5" })
    .then((danceClass) => {
      res.status(201).json({ danceClass });
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

router.get("/classes", (req, res) => {
  DanceClass.find()
    .then((classes) => {
      res.status(201).json(classes);
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

module.exports = router;
