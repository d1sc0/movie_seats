//
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

//save the selected movie and price into storage
function updateMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;

  //create array of selected seat indexes
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  //save seat indexes into local storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  //update counts
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  //retrieve and update seats based on local storage
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  //retrieve and update selected movie from local storage
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;

  updateMovieData(e.target.selectedIndex, e.target.value);

  updateSelectedCount();
});

// seat click event listener
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Initial count and total set on page load
updateSelectedCount();
