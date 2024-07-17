const API_KEY = '8f3ec22b98f1669104ecdfe0b9b3be92';
const BASE_URL = 'https://api.themoviedb.org/3';

const endpoints = {
  nowPlaying: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`,
  popular: `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
  trending: `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
  upcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
};

document.addEventListener('DOMContentLoaded', () => {
  fetchMovies(endpoints.nowPlaying);
  setupSidebar();
  setupSearch();
  setupFormValidation();
});

function fetchMovies(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => displayMovies(data.results))
    .catch(error => console.error('Error fetching movies:', error));
}

function displayMovies(movies) {
  const movieList = document.getElementById('movie-list');
  movieList.innerHTML = '';

  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="movie-details">
        <h3>${movie.title}</h3>
        <p>${movie.overview}</p>
      </div>
    `;
    movieList.appendChild(movieElement);
  });
}

function setupSidebar() {
  document.querySelectorAll('.sidebar .nav-links li a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const endpoint = event.target.getAttribute('data-endpoint');
      if (endpoint) {
        fetchMovies(endpoints[endpoint]);
      }
      document.querySelectorAll('.sidebar .nav-links li a').forEach(link => link.classList.remove('active'));
      event.target.classList.add('active');
    });
  });
}

function setupSearch() {
  const searchInput = document.getElementById('search-bar');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query.length >= 3) {
      searchMovies();
    } else {
      clearSearchResults();
    }
  });
}

function searchMovies() {
  const query = document.getElementById('search-bar').value;
  if (query) {
    const searchUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    fetch(searchUrl)
      .then(response => response.json())
      .then(data => displaySearchResults(data.results))
      .catch(error => console.error('Error searching movies:', error));
  }
}

function displaySearchResults(movies) {
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = '';

  if (movies.length === 0) {
    searchResults.innerHTML = `
      <p>No results found. <button class="btn btn-link" onclick="returnToHome()">Return to Home Page</button></p>
    `;
  } else {
    movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');
      movieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <div class="movie-details">
          <h3>${movie.title}</h3>
          <p>${movie.overview}</p>
        </div>
      `;
      searchResults.appendChild(movieElement);
    });
  }
}

function clearSearchResults() {
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = '';
}

function returnToHome() {
  fetchMovies(endpoints.nowPlaying);
  document.getElementById('search-bar').value = '';
}

function setupFormValidation() {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const age = document.getElementById('age');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    let isValid = true;

    if (name.value === '') {
      markError(name);
      isValid = false;
    } else {
      markValid(name);
    }

    if (!validateEmail(email.value)) {
      markError(email);
      isValid = false;
    } else {
      markValid(email);
    }

    if (!validatePhone(phone.value)) {
      markError(phone);
      isValid = false;
    } else {
      markValid(phone);
    }

    if (!validateAge(age.value)) {
      markError(age);
      isValid = false;
    } else {
      markValid(age);
    }

    if (!validatePassword(password.value)) {
      markError(password);
      isValid = false;
    } else {
      markValid(password);
    }

    if (password.value !== confirmPassword.value || confirmPassword.value === '') {
      markError(confirmPassword);
      isValid = false;
    } else {
      markValid(confirmPassword);
    }

    if (isValid) {
      // Form submission logic here
      form.reset(); // Reset form after successful submission
    }
  });

  function markError(input) {
    input.classList.add('error');
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Please fill out this field correctly.';
    input.parentNode.insertBefore(errorMessage, input.nextSibling);
  }

  function markValid(input) {
    input.classList.remove('error');
    const errorMessage = input.nextSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
      errorMessage.remove();
    }
  }

  function validateEmail(email) {
    // Regular expression for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePhone(phone) {
    // Regular expression for basic phone number validation
    const regex = /^\d{10}$/;
    return regex.test(phone);
  }

  function validateAge(age) {
    // Age validation (example: between 18 and 100)
    const ageNum = parseInt(age);
    return !isNaN(ageNum) && ageNum >= 18 && ageNum <= 100;
  }

  function validatePassword(password) {
    // Password validation (example: at least 6 characters)
    return password.length >= 6;
  }
}
