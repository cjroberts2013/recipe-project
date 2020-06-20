import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = ''
}

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = []
    if (title.length > limit) {
        title.split(' ').reduce((a, c) => {
            if (a + c.length <= limit) {
                newTitle.push(c);
            }
            return a + c.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }
    return title
}


const renderRecipe = recipe => {
    const markup = `
    <li class="card results__link my-2 shadow" style="width: 90%;">
        <img class="card-img-top" src="${recipe.image_url}" alt="${recipe.title}">
        <div class="card-body">
            <h5 class="card-title text-center">${recipe.title}</h5>
            <a href="#${recipe.recipe_id}" class="btn btn-outline-dark btn-block">Check Recipe</a>
        </div>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

const createButton = (page, type) => `
    <button class="btn btn-dark results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;

    if (page === 1 && pages > 1) {
        //Button to go to next page
        button = createButton(page, 'next')
    } else if (page < pages) {
        //Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
            `
    } else if (page === pages && pages > 1) {
        //Only button to go to previos page
        button = createButton(page, 'prev')
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, page = 1, resPerPage = 4) => {
    //render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    //render pagination buttons
    renderButtons(page, recipes.length, resPerPage)


    recipes.slice(start, end).forEach(renderRecipe);
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