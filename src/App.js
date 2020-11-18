import React,{ useState, useEffect } from 'react';
import './App.css';

import BudgetBook from './components/BudgetBook';
import { Form, Input, Select, Radio } from './components/FormComponents'
import countFunction from './components/countFunction';

function App() {

  const [revenue, setRevenue] =  useState([]);
  const [expenditure, setExpenditure] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalBG, setTotalBG] = useState('green')

   const styles = {
     backgroundColor: totalBG
   }

   useEffect(() => {

     if (JSON.parse(localStorage.getItem("expenditure")) === null) {
      setExpenditure([])
    } else {
      setExpenditure(JSON.parse(localStorage.getItem("expenditure")));
    }

    if (JSON.parse(localStorage.getItem("revenue")) === null) {
      setRevenue([])
    } else {
      setRevenue(JSON.parse(localStorage.getItem("revenue")));
    }
   }, [])

  useEffect(() => {
    setTotal(countFunction(expenditure, revenue));

    if (Math.sign(total > 0)) {
      setTotalBG('green')
    } else {
      setTotalBG('red')
    }
  }, [expenditure, revenue, total])

  useEffect(() => {
      localStorage.setItem( 'expenditure', JSON.stringify( expenditure ));
  }, [expenditure])

  useEffect(() => {
    localStorage.setItem( 'revenue', JSON.stringify( revenue ));
  }, [revenue])

  const onSubmit = (data, event) => {

    if (data.structures === 'expenditure') {
      setExpenditure([...expenditure, {type: 'expenditure', product: data.name, categories: data.categories, sum: data.sum, id: Math.floor( Math.random() * 1000000 )}])
    } else {
      setRevenue([...revenue, {type: 'revenue', product: data.name, categories: data.categories, sum: data.sum, id: Math.floor( Math.random() * 1000000 )}])
    }
    event.target.reset();
  }

  const removeList = (id, type) => {
    if (type === 'expenditure')  {
      const newList = expenditure.filter((data) => data.id !== id);
      setExpenditure(newList);
    } else {
      const newList = revenue.filter((data) => data.id !== id);
      setRevenue(newList);
    }
  }

  return (
    <div className="budget-wrapper">
      <div className="budget-container">
        <BudgetBook listData={expenditure} titleName="Wydadki" removeList={removeList} />
        <BudgetBook listData={revenue} titleName="Dochody" removeList={removeList}/>

        <div className="budget-form-container">
          <Form onSubmit={onSubmit}>
          <Input name="name" placeholder="Nazwa" />
          <Input type="number" name="sum" placeholder="Kwota" />
          <Radio name="structures" options={[ 'Wydatek', 'Dochód' ]} value={['expenditure', 'revenue']} />
          <Select name="categories" options={[ 'Dom', 'Zakupy', 'Wypłata' ]} />
          <Input type="submit" value="Submit" />
          </Form>
          <h4>Wszystkie pola są wymagane</h4>
        </div>
      </div>
      <div className="budget-book-total" style={styles}><h2>{total.toFixed(2)} zł</h2></div>
    </div>
  );
}

export default App;
