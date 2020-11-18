import React, {useState, useEffect} from 'react'

import BudgetList from './BudgetList'

function BudgetBook({ listData, titleName, removeList }) {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(listData)

    if (listData.length === 0) {
      return setTotal(0);
    }

    let num = 0;
    for (const iterator of data) {
      num = num += parseInt(iterator.sum);
      setTotal(num);
    }
  }, [data, listData])

  const list = data.map((value, key) => (
    <BudgetList id={key} key={`${value.product}-${key}`} product={value.product} categories={value.categories} sum={`${parseInt(value.sum).toFixed(2)} zł`} onClick={() => removeList(value.id, value.type)} />
  ));

  return (
    <div className="budget-book-container">
      <h1 className="budget-book-title">{titleName}</h1>
      <BudgetList product="Produkt" categories="Kategoria" sum="Suma" />
      {list}
      <div className="budget-book-sum"><h3>Suma: {parseInt(total).toFixed(2)} zł</h3></div>
    </div>
  )
}

export default BudgetBook
