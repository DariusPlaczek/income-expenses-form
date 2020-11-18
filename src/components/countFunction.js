function countFunction(argsOne, argsTwo) {
  let countExpenditure = 0;
  let countRevenue = 0;

  for (const iterator of argsOne) {
    countExpenditure += parseInt(iterator.sum)
  }

  for (const iterator of argsTwo) {
    countRevenue += parseInt(iterator.sum)
  }

  return countRevenue - countExpenditure;

}

export default countFunction
