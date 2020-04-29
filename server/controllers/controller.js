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
    }
};
