const db = require('../db/index.js')

module.exports = {
    categories: {
        getAll: () => {
            let q = `SELECT * FROM categories`;
            return db.queryAsync(q).spread(res => res);
        }
    },

    transactions: {
        getAllByCategory: (categoryID) => {
            let q = `SELECT * FROM transactions WHERE category_id = ${categoryID}`
            return db.queryAsync(q).spread(res => res);
        },

        saveTransaction: ({date, amount, description}) => {
            let q = `INSERT INTO transactions (date, amount, description) VALUES (?, ?, ?)`;
            return db.queryAsync(q, [date, amount, description]).spread(res => res);
        }
    }

   
}
