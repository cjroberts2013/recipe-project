import { elements } from './base';
// import { Fraction } from 'fractional';

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
};
// const formatCount = count => {
//     if (count) {
//         // count = 2.5 --> 5/2 --> 2 1/2
//         // count = 0.5 --> 1/2
//         const newCount = Math.round(count * 10000) / 10000;
//         const [int, dec] = newCount.toString().split('.').map(el => parseInt(el, 10));

//         if (!dec) return newCount;

//         if (int === 0) {
//             const fr = new Fraction(newCount);
//             return `${fr.numerator}/${fr.denominator}`;
//         } else {
//             const fr = new Fraction(newCount - int);
//             return `${int} ${fr.numerator}/${fr.denominator}`;
//         }
//     }
//     return '?';
// };

const createIngredient = ingredient => `
    <li class="recipe__item">
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
`;

export const renderRecipe = (recipe, isLiked) => {
    const markup = `
        <figure class="recipe__fig">
            <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title text-center">
                <span>${recipe.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
            </div>
        </div>
        <div class="recipe__ingredients">
            <h2 class='text-center'>List of Ingredients</h2>
            <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(el => createIngredient(el)).join(' ')}
            </ul>
            
        </div>
        <div class="recipe__directions">
            <h2 class="heading-2 text-center">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                <button class='cookingDir btn btn-outline-dark btn-block'>Cooking Directions</button>
            </a>
        </div>
    `;
    elements.recipe.insertAdjacentHTML('afterbegin', markup);
};

// export const updateServingsIngredients = recipe => {
//     // Update servings
//     document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

//     // Update ingredeints
//     const countElements = Array.from(document.querySelectorAll('.recipe__count'));
//     countElements.forEach((el, i) => {
//         el.textContent = formatCount(recipe.ingredients[i].count);
//     });
// };