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

// Populate sidebar
const sidebar = document.getElementById('sidebar');
options.forEach(option => {
  const li = document.createElement('li');
  li.textContent = option;
  li.classList.add('list-group-item', 'list-group-item-action', 'bg-dark', 'text-white-50');
  li.addEventListener('click', () => fetchRecipes(option));
  sidebar.appendChild(li);
});

// Fetch recipes from API
async function fetchRecipes(query) {
  try {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`);
    const data = await res.json();
    displayRecipes(data.data.recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

// Display recipes
function displayRecipes(recipes) {
  const resultsContainer = document.getElementById('resipes-container');
  resultsContainer.innerHTML = '';
  recipes.forEach(recipe => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('col-lg-4', 'col-md-6', 'recipe');
    recipeDiv.innerHTML = `
      <div class="card h-100">
        <img src="${recipe.image_url}" class="card-img-top" alt="${recipe.title}">
        <div class="card-body">
          <h5 class="card-title">${recipe.title}</h5>
          <p class="card-text">${recipe.publisher}</p>
        </div>
      </div>
    `;
    resultsContainer.appendChild(recipeDiv);
  });
}

// Toggle sidebar
document.getElementById('control-menu').addEventListener('click', () => {
  const menu = document.getElementById('menu');
  if (menu.style.left === '0px') {
    menu.style.left = '-100%';
  } else {
    menu.style.left = '0px';
  }
});
