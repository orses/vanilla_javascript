(() => {
  const theater = document.querySelector('.theater-container');
  const seats = theater.querySelectorAll('.seat:not(.occupied)');
  const movieSelect = document.querySelector('#movie');

  const movies = [
    { title: 'Avengers: Endgame', price: 10, theater: 1 },
    { title: 'Joker', price: 12, theater: 2 },
    { title: 'Toy Story 4', price: 8, theater: 3 },
    { title: 'The Lion King', price: 9, theater: 4 },
  ];

  let ticketPrice = 0;
  let selectedSeatsCount = 0;
  let selectedSeatsAmount = 0;
  let selectedSeats = null;

  const populateSelect = () => {
    const options = document.createDocumentFragment();
    for (let item = 0, len = movies.length; item < len; item += 1) {
      const option = document.createElement('option');
      option.value = movies[item].price;
      option.text = `${movies[item].title} ($${movies[item].price})`;
      options.append(option);
    }

    movieSelect.appendChild(options);
    movieSelect.selectedIndex = 0;
  };

  const amountSelectedSeats = () => {
    return selectedSeatsCount * ticketPrice;
  };

  const setSelectedSeats = () => {
    selectedSeats = document.querySelectorAll('.row .seat.selected');
  };

  const setSelectedSeatsCount = () => {
    selectedSeatsCount = selectedSeats.length;
  };

  const setSelectedSeatsAmount = () => {
    selectedSeatsAmount = amountSelectedSeats();
  };

  const setTicketPrice = newPrice => {
    ticketPrice = newPrice;
  };

  const displaySelectedSeatsCount = () => {
    const count = document.querySelector('#count');
    count.textContent = selectedSeatsCount;
  };

  const displaySelectedSeatsAmount = () => {
    const total = document.querySelector('#total');
    total.textContent = selectedSeatsAmount;
  };

  const updateDataFromUser = () => {
    setSelectedSeats();
    setSelectedSeatsCount();
    setSelectedSeatsAmount();
    displaySelectedSeatsCount();
    displaySelectedSeatsAmount();
  };

  const storeSelectedSeatsData = () => {
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  };

  const storeMovieData = (movieIndex, price) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', price);
  };

  const getStoredSelectedSeatsData = () => {
    return JSON.parse(localStorage.getItem('selectedSeats'));
  };

  const getStoredMovieData = () => {
    return [
      localStorage.getItem('selectedMovieIndex'),
      localStorage.getItem('selectedMoviePrice'),
    ];
  };

  const handleSelectSeats = event => {
    const targetClass = event.target.classList;

    if (targetClass.contains('seat') && !targetClass.contains('occupied')) {
      targetClass.toggle('selected');
      updateDataFromUser();
      storeSelectedSeatsData();
    }
  };

  const handleSelectMovie = event => {
    const price = +event.target.value;
    setTicketPrice(price);
    updateDataFromUser();
    storeMovieData(event.target.selectedIndex, price);
  };

  // Load and setup initial data
  const init = () => {
    // Populate UI
    populateSelect();

    // Getting data from localStore if any
    const seatsIndex = getStoredSelectedSeatsData();

    if (seatsIndex !== null && seatsIndex.length > 0) {
      seats.forEach((seat, index) => {
        if (seatsIndex.includes(index)) {
          seat.classList.add('selected');
        }
      });
    }

    const [movieIndex] = [...getStoredMovieData()];

    if (movieIndex !== null) {
      movieSelect.selectedIndex = movieIndex;
    } else {
      storeMovieData(0, movies[0].price);
    }

    setTicketPrice(+movieSelect.value);
    updateDataFromUser();
  };

  init();

  // Movie select event
  movieSelect.addEventListener('change', handleSelectMovie);

  // Seat click event
  theater.addEventListener('click', handleSelectSeats);
})();
