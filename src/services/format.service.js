
const toCurrency = (numberString) => {
  const format = { minimumFractionDigits: 2 }
  const number = parseFloat(numberString);
  return number.toLocaleString('pt-BR', format);
};

const formatDestiny = (destiny) => {
  return destiny ? destiny : '--';
};

const formatType = (type) => {
  switch (type) {
    case 'MONTHLY_INCOME':
      return 'Recebimento Mensal'
    case 'BUY':
      return 'Compra'
    case 'TRANSFER':
      return 'Transferência'
    default:
      console.log('Sorry');
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleString("pt-br");
}

const formatOrigin = (origin) => {
  return origin === 'SYSTEM' ? 'Sistema' : origin;
}

const formatService = {
  toCurrency,
  formatDestiny,
  formatType,
  formatDate,
  formatOrigin
};

export default formatService;
