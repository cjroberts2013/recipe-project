import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = ''
}

export const clearResults = () => {
    elements.searchResList.innerHTML = ''
}


const renderRecipe = recipe => {
    const markup = `
    <li class="card results__link my-2 shadow" style="width: 90%;">
        <img class="card-img-top" src="${recipe.image_url}" alt="${recipe.title}">
        <div class="card-body">
            <h5 class="card-title text-center">${recipe.title}</h5>
            <a href="#" class="btn btn-outline-dark btn-block">Check Recipe</a>
        </div>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
}

        // <li>
        //     <a class="results__link" href="#${recipe.recipe_id}">
        //         <figure class='results__fig'>
        //             <img src="${recipe.image_url}" alt="${recipe.title}">
        //         </figure>
        //         <div class="results__data">
        //             <h4 class="results__name">${recipe.title}</h4>
        //             <p class="results__source">${recipe.source_url}</p>
        //         </div>
        //     </a>
        // </li>