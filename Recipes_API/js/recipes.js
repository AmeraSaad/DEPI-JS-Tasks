const options = [
  "carrot", "broccoli", "asparagus", "cauliflower", "corn", "cucumber", 
  "green pepper", "lettuce", "mushrooms", "onion", "potato", "pumpkin", 
  "red pepper", "tomato", "beetroot", "brussel sprouts", "peas", "zucchini", 
  "radish", "sweet potato", "artichoke", "leek", "cabbage", "celery", "chili", 
  "garlic", "basil", "coriander", "parsley", "dill", "rosemary", "oregano", 
  "cinnamon", "saffron", "green bean", "bean", "chickpea", "lentil", "apple", 
  "apricot", "avocado", "banana", "blackberry", "blackcurrant", "blueberry", 
  "boysenberry", "cherry", "coconut", "fig", "grape", "grapefruit", "kiwifruit", 
  "lemon", "lime", "lychee", "mandarin", "mango", "melon", "nectarine", "orange", 
  "papaya", "passion fruit", "peach", "pear", "pineapple", "plum", "pomegranate", 
  "quince", "raspberry", "strawberry", "watermelon", "salad", "pizza", "pasta", 
  "popcorn", "lobster", "steak", "bbq", "pudding", "hamburger", "pie", "cake", 
  "sausage", "tacos", "kebab", "poutine", "seafood", "chips", "fries", "masala", 
  "paella", "som tam", "chicken", "toast", "marzipan", "tofu", "ketchup", "hummus", 
  "chili", "maple syrup", "parma ham", "fajitas", "champ", "lasagna", "poke", 
  "chocolate", "croissant", "arepas", "bunny chow", "pierogi", "donuts", "rendang", 
  "sushi", "ice cream", "duck", "curry", "beef", "goat", "lamb", "turkey", "pork", 
  "fish", "crab", "bacon", "ham", "pepperoni", "salami", "ribs"
];

document.addEventListener('DOMContentLoaded', async () => {
  const controlMenu = document.getElementById('control-menu');
  const menu = document.getElementById('menu');
  const sidebar = document.getElementById('sidebar');
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const recipesContainer = document.getElementById('resipes-container');

  // Populate sidebar
  options.forEach(option => {
    const li = document.createElement('li');
    li.textContent = option;
    li.classList.add('list-group-item', 'list-group-item-action', 'bg-dark', 'text-white-50');
    sidebar.appendChild(li);
  });

  controlMenu.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

  searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query) {
      console.log(`Searching for recipes with query: ${query}`);
      const recipes = await fetchRecipes(query);
      displayRecipes(recipes);
    }
  });

  async function fetchRecipes(query) {
    try {
      const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched recipes:', data.recipes);
      return data.recipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  }

  function displayRecipes(recipes) {
    recipesContainer.innerHTML = ''; // Clear previous results
    if (recipes.length === 0) {
      recipesContainer.innerHTML = '<p class="text-white">No recipes found.</p>';
      return;
    }

    recipes.forEach(recipe => {
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('col-md-4');

      recipeCard.innerHTML = `
        <div class="card">
          <img src="${recipe.image_url}" class="card-img-top" alt="${recipe.title}">
          <div class="card-body">
            <h5 class="card-title">${recipe.title}</h5>
            <p class="card-text">Publisher: ${recipe.publisher}</p>
            <a href="${recipe.source_url}" target="_blank" class="btn btn-primary">View Recipe</a>
          </div>
        </div>
      `;
      recipesContainer.appendChild(recipeCard);
    });
  }

  // Initial fetch with a default query
  const initialRecipes = await fetchRecipes('pizza');
  displayRecipes(initialRecipes);
});
