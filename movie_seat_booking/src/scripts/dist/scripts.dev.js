"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(function () {
  var theater = document.querySelector('.theater-container');
  var seats = theater.querySelectorAll('.seat:not(.occupied)');
  var movieSelect = document.querySelector('#movie');
  var movies = [{
    title: 'Avengers: Endgame',
    price: 10,
    theater: 1
  }, {
    title: 'Joker',
    price: 12,
    theater: 2
  }, {
    title: 'Toy Story 4',
    price: 8,
    theater: 3
  }, {
    title: 'The Lion King',
    price: 9,
    theater: 4
  }];
  var ticketPrice = +movieSelect.value;
  var selectedSeatsCount = 0;
  var selectedSeatsAmount = 0;
  var selectedSeats = null;

  var amountSelectedSeats = function amountSelectedSeats() {
    return selectedSeatsCount * ticketPrice;
  };

  var setSelectedSeats = function setSelectedSeats() {
    selectedSeats = document.querySelectorAll('.row .seat.selected');
  };

  var setSelectedSeatsCount = function setSelectedSeatsCount() {
    selectedSeatsCount = selectedSeats.length;
  };

  var setSelectedSeatsAmount = function setSelectedSeatsAmount() {
    selectedSeatsAmount = amountSelectedSeats();
  };

  var setTicketPrice = function setTicketPrice(newPrice) {
    ticketPrice = newPrice;
  };

  var displaySelectedSeatsCount = function displaySelectedSeatsCount() {
    var count = document.querySelector('#count');
    count.textContent = selectedSeatsCount;
  };

  var displaySelectedSeatsAmount = function displaySelectedSeatsAmount() {
    var total = document.querySelector('#total');
    total.textContent = selectedSeatsAmount;
  };

  var updateDataFromUser = function updateDataFromUser() {
    setSelectedSeats();
    setSelectedSeatsCount();
    setSelectedSeatsAmount();
    displaySelectedSeatsCount();
    displaySelectedSeatsAmount();
  };

  var storeSelectedSeatsData = function storeSelectedSeatsData() {
    var seatsIndex = _toConsumableArray(selectedSeats).map(function (seat) {
      return _toConsumableArray(seats).indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  };

  var storeMovieData = function storeMovieData(movieIndex, price) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', price);
  };

  var getStoredSelectedSeatsData = function getStoredSelectedSeatsData() {
    return JSON.parse(localStorage.getItem('selectedSeats'));
  };

  var getStoredMovieData = function getStoredMovieData() {
    return [localStorage.getItem('selectedMovieIndex'), localStorage.getItem('selectedMoviePrice')];
  };

  var handleSelectSeats = function handleSelectSeats(event) {
    var targetClass = event.target.classList;

    if (targetClass.contains('seat') && !targetClass.contains('occupied')) {
      targetClass.toggle('selected');
      updateDataFromUser();
      storeSelectedSeatsData();
    }
  };

  var handleSelectMovie = function handleSelectMovie(event) {
    var price = +event.target.value;
    setTicketPrice(price);
    updateDataFromUser();
    storeMovieData(event.target.selectedIndex, price);
  };

  var populateSelect = function populateSelect() {
    var options = document.createDocumentFragment();

    for (var item = 0, len = movies.length; item < len; item += 1) {
      var option = document.createElement('option');
      option.value = movies[item].price;
      option.text = "".concat(movies[item].title, " ($").concat(movies[item].price, ")");
      options.append(option);
    }

    movieSelect.appendChild(options);
    movieSelect.selectedIndex = 0;
  }; // Load and setup initial data


  var init = function init() {
    // Populate UI
    populateSelect(); // Getting data from localStore if any

    var seatsIndex = getStoredSelectedSeatsData();

    if (seatsIndex !== null && seatsIndex.length > 0) {
      seats.forEach(function (seat, index) {
        if (seatsIndex.includes(index)) {
          seat.classList.add('selected');
        }
      });
    }

    var _ref = _toConsumableArray(getStoredMovieData()),
        movieIndex = _ref[0];

    if (movieIndex !== null) {
      movieSelect.selectedIndex = movieIndex;
    } else {
      storeMovieData(0, movies[0].price);
    }

    updateDataFromUser();
  };

  init(); // Movie select event

  movieSelect.addEventListener('change', handleSelectMovie); // Seat click event

  theater.addEventListener('click', handleSelectSeats);
})();