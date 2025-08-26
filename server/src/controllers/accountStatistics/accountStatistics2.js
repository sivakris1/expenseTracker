const calcTransaction = arr => {
  const tranArr = arr?.map(data => Number(data?.amount)) || [];

  const sumTotal = tranArr.reduce((acc, curr) => acc + curr, 0);
  const avg = tranArr.length > 0 ? sumTotal / tranArr.length : 0;
  const min = tranArr.length > 0 ? Math.min(...tranArr) : 0;
  const max = tranArr.length > 0 ? Math.max(...tranArr) : 0;

  return {
    sumTotal,
    avg,
    min,
    max
  };
};

export default calcTransaction;
