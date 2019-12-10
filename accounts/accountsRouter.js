const express = require("express");
const knex = require("../data/dbConfig");
const router = express.Router();

//----------GET Requests----------//

//returns a list of all accounts
router.get("/", (req, res) => {
  knex
    .select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error getting the accounts" });
    })
});

//----------POST Requests----------//
router.post('/', (req, res) => {
  accountData = req.body;

  knex('accounts')
    .insert(accountData, "id")
    .then(ids => {
      const id = ids[0];


      return knex('accounts')
        .select('id', 'name', 'budget')
        .where({ id })
        .first()
        .then(account => {
          res.status(201).json(account);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error adding the account" })
    })
});

//----------PUT Requests----------//
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  knex('accounts')
    .where({ id: id })
    .update(changes)
    .then(account => {
      res.status(200).json({ message: "Account updated successfully" })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error updating the account"
      });
    });
})

//----------DELETE Requests----------//
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  knex('accounts')
    .where({ id: id })
    .del()
    .then(account => {
      res.status(200).json({ message: "Account deleted successfully" })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error removing the account"
      });
    });
})

module.exports = router;
