import React from 'react'

function BudgetList( props ) {
  const {product, categories, sum, onClick} = props;

  return (
    <div className="budget-list-container">
      <div className="budget-list-name">{product}</div>
      <div className="budget-list-categories">{categories}</div>
      <div className="budget-list-sum">{sum}</div>
      <div className="budget-list-remove" onClick={onClick}>X</div>
    </div>
  )
}

export default BudgetList
