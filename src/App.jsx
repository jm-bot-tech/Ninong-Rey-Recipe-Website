import { useState } from 'react'
import carbonaraImg from './assets/carbonara.png'
import ceasarSaladImg from './assets/ceasar-salad.png'
import chickenAdoboImg from './assets/chicken-adobo.png'
import friedRiceImg from './assets/fried-rice.png'
import recipeIcon from './assets/recipe-icon.png'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import FoodCard from './components/FoodCard'
import { SearchIcon, PlusIcon, CloseIcon, UploadIcon } from './components/icons'

function App() {
  const [recipes, setRecipes] = useState([
    {
      image: carbonaraImg,
      title: 'Carbonara',
      description: 'Creamy Italian pasta with eggs, cheese, and crispy pancetta.',
      ingredients: [
        '200g spaghetti',
        '100g pancetta or bacon, diced',
        '2 large eggs',
        '1 egg yolk',
        '50g grated Parmesan cheese',
        'Black pepper',
        'Salt',
      ],
      instructions: [
        'Cook spaghetti in salted boiling water until al dente.',
        'Fry pancetta until crispy.',
        'Whisk eggs, egg yolk, and Parmesan together.',
        'Toss hot pasta with pancetta, then remove from heat and mix in the egg mixture.',
        'Season with black pepper and serve immediately.',
      ],
    },
    {
      image: ceasarSaladImg,
      title: 'Caesar Salad',
      description: 'Crisp romaine lettuce tossed in a tangy Caesar dressing with croutons.',
      ingredients: [
        '1 head romaine lettuce, chopped',
        '1/2 cup croutons',
        '1/4 cup grated Parmesan cheese',
        '1/4 cup Caesar dressing',
        'Black pepper',
      ],
      instructions: [
        'Wash and chop the romaine lettuce.',
        'Toss lettuce with Caesar dressing.',
        'Top with croutons and Parmesan cheese.',
        'Season with black pepper and serve.',
      ],
    },
    {
      image: chickenAdoboImg,
      title: 'Chicken Adobo',
      description: 'Classic Filipino chicken stewed in soy sauce, vinegar, and garlic.',
      ingredients: [
        '1 kg chicken, cut into pieces',
        '1/2 cup soy sauce',
        '1/4 cup vinegar',
        '6 cloves garlic, crushed',
        '2 bay leaves',
        '1 tsp whole peppercorns',
        '1 onion, sliced',
        '1 cup water',
      ],
      instructions: [
        'Combine chicken, soy sauce, vinegar, garlic, bay leaves, and peppercorns; marinate for 30 minutes.',
        'Sauté onion in a pan until fragrant.',
        'Add the marinated chicken and cook until lightly browned.',
        'Pour in water and bring to a boil.',
        'Lower heat, cover, and simmer for 30 minutes until chicken is tender.',
        'Adjust seasoning and serve hot with rice.',
      ],
    },
    {
      image: friedRiceImg,
      title: 'Fried Rice',
      description: 'Savory fried rice tossed with garlic, egg, and vegetables.',
      ingredients: [
        '3 cups cooked rice, preferably day-old',
        '2 eggs, beaten',
        '3 cloves garlic, minced',
        '1/2 cup mixed vegetables (carrots, peas)',
        '2 tbsp soy sauce',
        '2 tbsp cooking oil',
        'Spring onions, chopped',
        'Salt and pepper to taste',
      ],
      instructions: [
        'Heat oil in a wok over high heat and sauté garlic until golden.',
        'Push garlic aside, pour in beaten eggs, and scramble until just set.',
        'Add mixed vegetables and stir-fry for 2 minutes.',
        'Add rice, breaking up clumps, and stir-fry until heated through.',
        'Season with soy sauce, salt, and pepper.',
        'Garnish with spring onions and serve.',
      ],
    },
  ]);

  // Search
  const [searchText, setSearchText] = useState('');

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // View modal
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  function viewRecipe(recipe) {
    setSelectedRecipe(recipe);
  }

  function closeViewModal() {
    setSelectedRecipe(null);
  }

  // Add form
  const [showAddForm, setShowAddForm] = useState(false);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [recipeImage, setRecipeImage] = useState(null);

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setRecipeImage(URL.createObjectURL(file));
    }
  }

  function closeAddForm() {
    setShowAddForm(false);
    setRecipeTitle('');
    setRecipeDescription('');
    setRecipeIngredients('');
    setRecipeInstructions('');
    setRecipeImage(null);
  }

  function addRecipe() {
    if (recipeTitle.trim() === '') return;

    const newRecipe = {
      image: recipeImage || recipeIcon,
      title: recipeTitle,
      description: recipeDescription,
      ingredients: recipeIngredients.split('\n').filter((line) => line.trim() !== ''),
      instructions: recipeInstructions.split('\n').filter((line) => line.trim() !== ''),
    };

    setRecipes([...recipes, newRecipe]);
    closeAddForm();
  }

  // Edit modal
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editIngredients, setEditIngredients] = useState('');
  const [editInstructions, setEditInstructions] = useState('');
  const [editImage, setEditImage] = useState(null);

  function editRecipe(index) {
    const recipe = recipes[index];

    setEditTitle(recipe.title);
    setEditDescription(recipe.description);
    setEditIngredients(recipe.ingredients.join('\n'));
    setEditInstructions(recipe.instructions.join('\n'));
    setEditImage(recipe.image);
    setEditingIndex(index);
  }

  function handleEditImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setEditImage(URL.createObjectURL(file));
    }
  }

  function closeEditModal() {
    setEditingIndex(null);
  }

  function updateRecipe() {
    const updatedRecipes = [...recipes];

    updatedRecipes[editingIndex] = {
      ...updatedRecipes[editingIndex],
      image: editImage,
      title: editTitle,
      description: editDescription,
      ingredients: editIngredients.split('\n').filter((line) => line.trim() !== ''),
      instructions: editInstructions.split('\n').filter((line) => line.trim() !== ''),
    };

    setRecipes(updatedRecipes);
    closeEditModal();
  }

  // Delete confirmation modal
  const [deleteIndex, setDeleteIndex] = useState(null);

  function confirmDeleteRecipe(index) {
    setDeleteIndex(index);
  }

  function closeDeleteModal() {
    setDeleteIndex(null);
  }

  function deleteRecipe() {
    const updatedRecipes = recipes.filter((_, currentIndex) => currentIndex !== deleteIndex);
    setRecipes(updatedRecipes);
    closeDeleteModal();
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-orange-50 to-amber-50 flex flex-col">
      <Header />
      <Hero />

      <main className="max-w-6xl mx-auto px-4 py-10 w-full">
        <div className="relative max-w-md mx-auto mb-12">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-amber-500">
            <SearchIcon />
          </span>
          <input
            className="border border-amber-200 bg-white/80 rounded-full py-3 pl-11 pr-4 w-full shadow-sm focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all duration-300"
            type="text"
            placeholder="Search recipes..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-6 justify-center mb-12">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <FoodCard
                key={recipe.title}
                image={recipe.image}
                title={recipe.title}
                description={recipe.description}
                delay={index * 80}
                onView={() => viewRecipe(recipe)}
                onEdit={() => editRecipe(recipes.indexOf(recipe))}
                onDelete={() => confirmDeleteRecipe(recipes.indexOf(recipe))}
              />
            ))
          ) : (
            <p className="text-gray-500 animate-fade-in">No recipes found.</p>
          )}
        </div>

        {!showAddForm && (
          <div className="max-w-xl mx-auto text-center">
            <button
              className="inline-flex items-center gap-2 bg-linear-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg shadow-amber-300/50 hover:shadow-xl hover:shadow-amber-400/50 hover:scale-105 active:scale-95 transition-all duration-300 font-semibold"
              onClick={() => setShowAddForm(true)}
            >
              <PlusIcon />
              Add Recipe
            </button>
          </div>
        )}

        {showAddForm && (
          <div className="relative bg-white rounded-3xl shadow-xl p-6 max-w-xl mx-auto animate-fade-in-up overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-amber-400 via-orange-500 to-amber-400" />

            <h2 className="text-xl font-bold text-gray-800 font-heading mb-4">Add a New Recipe</h2>

            {recipeImage && (
              <img src={recipeImage} alt="Preview" className="w-full h-40 object-cover rounded-xl mb-3 shadow-sm" />
            )}

            <label className="flex items-center gap-2 border border-dashed border-amber-300 bg-amber-50/60 rounded-xl p-3 w-full mb-3 text-sm text-amber-700 cursor-pointer hover:bg-amber-50 transition-colors duration-300">
              <UploadIcon />
              Upload a photo
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>

            <input
              className="border border-gray-200 rounded-xl p-3 w-full mb-3 focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all duration-300"
              type="text"
              placeholder="Recipe Title"
              value={recipeTitle}
              onChange={(e) => setRecipeTitle(e.target.value)}
            />

            <textarea
              className="border border-gray-200 rounded-xl p-3 w-full mb-3 focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all duration-300"
              placeholder="Short Description"
              rows="2"
              value={recipeDescription}
              onChange={(e) => setRecipeDescription(e.target.value)}
            />

            <textarea
              className="border border-gray-200 rounded-xl p-3 w-full mb-3 focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all duration-300"
              placeholder="Ingredients (one per line)"
              rows="4"
              value={recipeIngredients}
              onChange={(e) => setRecipeIngredients(e.target.value)}
            />

            <textarea
              className="border border-gray-200 rounded-xl p-3 w-full mb-4 focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all duration-300"
              placeholder="Recipe Steps (one per line)"
              rows="4"
              value={recipeInstructions}
              onChange={(e) => setRecipeInstructions(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                className="bg-linear-to-r from-amber-500 to-orange-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={addRecipe}
              >
                Add Recipe
              </button>
              <button
                className="bg-gray-100 text-gray-700 px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300"
                onClick={closeAddForm}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={closeViewModal}
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 bg-white/20 text-white rounded-full p-1.5 hover:bg-white/40 hover:rotate-90 transition-all duration-300"
              onClick={closeViewModal}
            >
              <CloseIcon />
            </button>

            <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-56 object-cover" />

            <div className="bg-linear-to-r from-amber-500 to-orange-600 text-white p-6">
              <h2 className="text-3xl font-bold font-heading">{selectedRecipe.title}</h2>
              <p className="text-amber-100 mt-2">{selectedRecipe.description}</p>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 font-heading mb-2">Ingredients</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-6">
                {selectedRecipe.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 font-heading mb-2">Recipe</h3>
              <ol className="list-decimal list-inside text-gray-600 space-y-1">
                {selectedRecipe.instructions.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button
                className="bg-linear-to-r from-amber-500 to-orange-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={closeViewModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {editingIndex !== null && (
        <div
          className="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={closeEditModal}
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 bg-white/20 text-white rounded-full p-1.5 hover:bg-white/40 hover:rotate-90 transition-all duration-300"
              onClick={closeEditModal}
            >
              <CloseIcon />
            </button>

            <div className="bg-linear-to-r from-amber-500 to-orange-600 text-white p-6">
              <h2 className="text-2xl font-bold font-heading">Update Recipe</h2>
            </div>

            <div className="p-6">
              {editImage && (
                <img src={editImage} alt="Preview" className="w-full h-40 object-cover rounded-xl mb-3 shadow-sm" />
              )}

              <label className="flex items-center gap-2 border border-dashed border-amber-300 bg-amber-50/60 rounded-xl p-3 w-full mb-3 text-sm text-amber-700 cursor-pointer hover:bg-amber-50 transition-colors duration-300">
                <UploadIcon />
                Change photo
                <input type="file" accept="image/*" onChange={handleEditImageUpload} className="hidden" />
              </label>

              <input
                className="border border-gray-200 rounded-xl p-3 w-full mb-3 focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all duration-300"
                type="text"
                placeholder="Recipe Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <textarea
                className="border border-gray-200 rounded-xl p-3 w-full mb-3 focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all duration-300"
                placeholder="Short Description"
                rows="2"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <textarea
                className="border border-gray-200 rounded-xl p-3 w-full mb-3 focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all duration-300"
                placeholder="Ingredients (one per line)"
                rows="4"
                value={editIngredients}
                onChange={(e) => setEditIngredients(e.target.value)}
              />

              <textarea
                className="border border-gray-200 rounded-xl p-3 w-full focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all duration-300"
                placeholder="Recipe Steps (one per line)"
                rows="4"
                value={editInstructions}
                onChange={(e) => setEditInstructions(e.target.value)}
              />
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
              <button
                className="bg-gray-100 text-gray-700 px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300"
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button
                className="bg-linear-to-r from-amber-500 to-orange-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={updateRecipe}
              >
                Update Recipe
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteIndex !== null && (
        <div
          className="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={closeDeleteModal}
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-gray-800 font-heading mb-2">Delete Recipe?</h2>
              <p className="text-gray-500">
                Are you sure you want to remove{' '}
                <span className="font-semibold text-gray-700">{recipes[deleteIndex]?.title}</span>? This action
                cannot be undone.
              </p>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
              <button
                className="bg-gray-100 text-gray-700 px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className="bg-linear-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={deleteRecipe}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
