(() => {
  const SYMBOLS = [
    { symbol: 'EUR', name: 'Euro' },
    { symbol: 'USD', name: 'US dollar' },
    { symbol: 'JPY', name: 'Japanese yen' },
    { symbol: 'GBP', name: 'Pound sterling' },
    { symbol: 'CAD', name: 'Canadian dollar' },
    { symbol: 'AUD', name: 'Australian dollar' },
    { symbol: 'NZD', name: 'New Zealand dollar' },
    { symbol: 'CHF', name: 'Swiss franc' },
    { symbol: 'RUB', name: 'Russian rouble' },
    { symbol: 'CNY', name: 'Chinese yuan renminbi' },
    { symbol: 'CZK', name: 'Czech koruna' },
    { symbol: 'BGN', name: 'Bulgarin lev' },
    { symbol: 'BRL', name: 'Brazilian real' },
    { symbol: 'DKK', name: 'Danish krone' },
    { symbol: 'HKD', name: 'Hong Kong dollar' },
    { symbol: 'HRK', name: 'Croatian kuna' },
    { symbol: 'HUF', name: 'Hungarian forint' },
    { symbol: 'IDR', name: 'Indonesian rupiah' },
    { symbol: 'ILS', name: 'Israeli shekel' },
    { symbol: 'INR', name: 'Indian rupee' },
    { symbol: 'ISK', name: 'Icelandic krona' },
    { symbol: 'KRW', name: 'South Korean won' },
    { symbol: 'MXN', name: 'Mexican peso' },
    { symbol: 'MYR', name: 'Malaysian ringgit' },
    { symbol: 'NOK', name: 'Norwegian krone' },
    { symbol: 'PHP', name: 'Philippine peso' },
    { symbol: 'PLN', name: 'Polish zloty' },
    { symbol: 'RON', name: 'Romanian leu' },
    { symbol: 'SEK', name: 'Swedish krona' },
    { symbol: 'SGD', name: 'Singapore dollar' },
    { symbol: 'THB', name: 'Thai bath' },
    { symbol: 'TRY', name: 'Turkish lira' },
    { symbol: 'ZAR', name: 'South African rand' },
  ];
  const currencyOrigin = document.querySelector('#currency-origin');
  const currencyDestiny = document.querySelector('#currency-destiny');
  const amountOriginElement = document.querySelector('#amount-origin');
  const amountDestinyElement = document.querySelector('#amount-destiny');
  const swapElement = document.querySelector('#swap');

  function displayRate(element, base, rateSymbol, rate) {
    const display = element;
    display.textContent = `1 ${base} = ${rate} ${rateSymbol}`;
  }

  function displayExchange(element, amount) {
    const display = element;
    display.value = amount;
  }

  function calculateExchange(amount, rate) {
    const destinyExchange = amount * rate;
    displayExchange(amountDestinyElement, destinyExchange.toFixed(5));
  }

  // fetch exchange rates alternative
  function fetchRates(base) {
    const url = `https://api.exchangeratesapi.io/latest?base=${base}`;

    return fetch(url)
      .then(res => res.json())
      .then(data => data.rates);
  }

  async function getRates(base, rateSymbol) {
    let rates = {};

    // when currencyOrigin is EUR and currencyDestiny is EUR, API returns undefinded
    if (base === rateSymbol) {
      rates[rateSymbol] = 1;
    } else {
      rates = await fetchRates(base);
    }

    return rates;
  }

  async function handleExchange() {
    const display = document.querySelector('#rate');
    const base = currencyOrigin.value;
    const rateSymbol = currencyDestiny.value;

    const rates = await getRates(base, rateSymbol);
    const rate = rates[rateSymbol];

    displayRate(display, base, rateSymbol, rate.toFixed(5));
    calculateExchange(amountOriginElement.value, rate);
  }

  function swapCurrencies() {
    [currencyOrigin.value, currencyDestiny.value] = [
      currencyDestiny.value,
      currencyOrigin.value,
    ];

    handleExchange();
  }

  function populateSelect(symbols) {
    const options = document.createDocumentFragment();
    for (let item = 0, len = symbols.length; item < len; item += 1) {
      const option = document.createElement('option');
      option.value = symbols[item].symbol;
      option.text = symbols[item].symbol;
      options.append(option);
    }

    currencyOrigin.appendChild(options);
    currencyOrigin.selectedIndex = 0;
    currencyDestiny.innerHTML = currencyOrigin.innerHTML;
    currencyDestiny.selectedIndex = 1;
  }

  function init() {
    populateSelect(SYMBOLS);
    handleExchange();
  }

  currencyOrigin.addEventListener('change', handleExchange);
  amountOriginElement.addEventListener('input', handleExchange);
  currencyDestiny.addEventListener('change', handleExchange);
  swapElement.addEventListener('click', swapCurrencies);
  window.addEventListener('load', init);
})();
