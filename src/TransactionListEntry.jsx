import React from 'react';


const TransactionListEntry = ({transaction}) => {
    return (
    //     <div className="txn-row">
    //         <div className="txn-data">{transaction.date}</div>
    //         <div className="txn-data">{transaction.description}</div>
    //         <div className="txn-data">{transaction.amount}</div>
    //         {/* <select onChange={handleCategoryChange} className="txn-data" value={transaction.category || 'none'}>
    //             <option value="select">{transaction.category || 'none'}</option>
    //             {transaction.map((category, i) => {
    //             return <option key={i} value={category}>{category}</option>
    //         })}
    //     </select> */}
        
    //     {/* <div className="txn-data">category</div> */}
    // </div>
        <tbody>
            <tr>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
            </tr>
        </tbody>
    )
}

export default TransactionListEntry;