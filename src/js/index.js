import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global State 
- Search Object
- Current Recipe Object
- Shopping List Object
- Liked Recipes
*/

const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();

    if (query) {
        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes)

        try {
            await state.search.getResults();

            clearLoader();

            searchView.renderResults(state.search.result)
        } catch (error) {
            console.log(error)
            clearLoader();
        }

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
})

const controlRecipe = async () => {
    // Get id from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data
            await state.recipe.getRecipe();

            // Calc servings and time 
            // POSSIBLY REMOVE THIS
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            console.log(state.recipe)
        } catch (error) {
            console.log(error)
        }


    }

}


['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));