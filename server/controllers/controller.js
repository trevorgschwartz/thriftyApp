const model = require('../models/model.js');

module.exports = {
    saveTransaction: (req, res) => {
        model.transactions.saveTransaction(req.body)
        .then(data => {
            console.log('transaction saved')
            console.log(data)
        })
        .catch(err => {
            console.log('error saving transaction', err)
            res.sendStatus(500)
        })
    },

    getCategories: (req, res) => {
        // res.send('hello')
        model.categories.getAll()
        .then(results => res.send(results))
        .catch(err => {
            console.log('error getting all categories', err);
            res.sendStatus(500);
        })
    },

    getTransactionByCategory: (req, res) => {
        model.transactions.getAllByCategory(req.body.id)
        .then(results => res.send(results))
        .catch(err => {
            console.log('error getting transactions by category', err);
            res.sendStatus(500);
        });
    },

    saveIncome: (req, res) => {
        model.income.save(req.body)
       .then(data => {
           res.sendStatus(201);
       })
       .catch(err => {
           console.log('error saving income', err);
           res.sendStatus(500);
       })
    },

    getIncome: (req, res) => {
        model.income.get()
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    },

    updateIncome: (req, res) => {
        model.income.update(req.body)
        .then (data => {
            console.log(data);
            res.sendStatus(201);
        })
        .catch(err => {
            console.log('error updating income', err);
            res.sendStatus(500);
        })
    },

    addCategory: (req, res) => {
        model.categories.add(req.body.category)
        .then (() => {
            console.log('added category')
            res.sendStatus(201)
        })
        .catch(err => {
            console.log('error adding category', err);
            res.sendStatus(500)
        })
    }


};
