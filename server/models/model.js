const db = require('../db/index.js')

module.exports = {
    categories: {
        getAll: () => {
            let q = `SELECT * FROM categories`;
            return db.queryAsync(q).spread(res => res);
        },

        add: (category) => {
            let q = `INSERT INTO categories (name) VAlUES (?)`;
            return db.queryAsync(q, [category]).spread(res => res);
        }
    },

    transactions: {
        getAllByCategory: (categoryID) => {
            let q = `SELECT * FROM transactions WHERE category_id = ${categoryID}`
            return db.queryAsync(q).spread(res => res);
        },

        saveTransaction: ({date, amount, description, category_id}) => {
            let q = `INSERT INTO transactions (date, amount, description, category_id) VALUES (?, ?, ?, ?)`;
            return db.queryAsync(q, [date, amount, description, category_id]).spread(res => res);
        }
    },

    income: {
        save: ({income}) => {
            let q = 'INSERT INTO income (income) VALUES (?)';
            return db.queryAsync(q, income).spread(res => res);
        },

        get: () => {
            let q = 'SELECT * FROM income';
            return db.queryAsync(q).spread(res => res);
        },

        update: ({income, id}) => {
            let q = `UPDATE income SET income = (?) WHERE id=${id}`;
            return db.queryAsync(q, income).spread(res => res);
        }
    }

   
}
