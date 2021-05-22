(() => {
  const list = document.querySelector('.list');
  const btnAddUser = document.querySelector('#add_user');
  const btnDouble = document.querySelector('#double');
  const btnShowMillionaires = document.querySelector('#show_millionaires');
  const btnSort = document.querySelector('#sort');
  const btnCalculateWealth = document.querySelector('#calculate_wealth');

  let data = [];

  async function fetchUser() {
    const user = await fetch('https://randomuser.me/api')
      .then(res => res.json())
      .then(dataUser => dataUser);

    return user.results[0];
  }

  function appendNewUser(obj) {
    data.push(obj);
  }

  async function getRamdonUser() {
    const user = await fetchUser();
    return {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000),
    };
  }

  function formatMoney(number) {
    return `$ ${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }

  function updateDOM(providedData = data) {
    const listElement = document.querySelector('.list__items');
    listElement.innerHTML = '';

    providedData.forEach(item => {
      const element = document.createElement('div');
      element.classList.add('list__item');
      element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
        item.money
      )}`;
      listElement.appendChild(element);
    });

    list.appendChild(listElement);
  }

  async function handleAddUser() {
    const newUser = await getRamdonUser();
    appendNewUser(newUser);
    updateDOM();
  }

  function doubleMoney() {
    data = data.map(user => ({ ...user, money: user.money * 2 }));
  }

  function handleDouble() {
    doubleMoney();
    updateDOM();
  }

  function sortByRichest() {
    data.sort((usera, userb) => userb.money - usera.money);
  }

  function handleSortByRichest() {
    sortByRichest();
    updateDOM();
  }

  function showMillionaires() {
    data = data.filter(item => item.money >= 1000000);
  }

  function handleShowMillionaries() {
    showMillionaires();
    updateDOM();
  }

  function calculateWealth() {
    return data.reduce((acc, user) => acc + user.money, 0);
  }

  function displayWealth(number) {
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3 class="total">Total Wealth: <strong>${number}</strong></h3>`;
    const listElement = document.querySelector('.list__items');
    listElement.appendChild(wealthElement);
  }

  function handleCalculateWealth() {
    const total = formatMoney(calculateWealth());
    updateDOM();
    displayWealth(total);
  }

  btnAddUser.addEventListener('click', handleAddUser);
  btnDouble.addEventListener('click', handleDouble);
  btnSort.addEventListener('click', handleSortByRichest);
  btnShowMillionaires.addEventListener('click', handleShowMillionaries);
  btnCalculateWealth.addEventListener('click', handleCalculateWealth);
})();
