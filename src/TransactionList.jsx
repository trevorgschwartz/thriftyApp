import React from 'react';
import TransactionListEntry from './TransactionListEntry';

const TransactionList = ({transactionCategory, categories, i}) => {
    
    if (transactionCategory.length > 0) {
        return (
        
            // <div className="txn">
            //     <h3>{categories[i].name} Transactions</h3>
            //     <div className="txn-table">
            //         <div className="txn-header txn-row">
            //         {/* <div className="txn-header txn-row"> */}
            //             <div className="txn-data">Date</div>
            //             <div className="txn-data">Description</div>
            //             <div className="txn-data">Amount</div>
            //             <div className="txn-data">Category</div>
            //         </div>
            //         {transactionCategory.map((transaction, i) => (<TransactionListEntry key={i} transaction={transaction} />))}
            //     {/* {data.map((transaction, i) => (<TransactionListEntry key={i} transaction={transaction} categories={categories} handleAddingCategory={handleAddingCategory}/>))} */}
            //     </div>
            // </div>
            <div className="container">
                <section>
            <h2 className="has-text-weight-bold">{categories[i].name}</h2>
            <table className="table"  className="table is-fullwidth is-spaced is-bordered is-striped is-narrow is-hoverable">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                        {/* <div className="txn-data">Date</div>
                        <div className="txn-data">Description</div>
                        <div className="txn-data">Amount</div>
                        <div className="txn-data">Category</div> */}
                    
                    {transactionCategory.map((transaction, i) => (<TransactionListEntry key={i} transaction={transaction} />))}
            {/* {data.map((transaction, i) => (<TransactionListEntry key={i} transaction={transaction} categories={categories} handleAddingCategory={handleAddingCategory}/>))} */}
            </table>
            </section>
            </div>
        )

    }
}

export default TransactionList;