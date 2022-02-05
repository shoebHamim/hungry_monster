
const submit_button = document.getElementById('submit_button');
submit_button.addEventListener('click', findItem);
function findItem() {
    const search_input = document.getElementById('search_input').value;
    document.getElementById('container').innerHTML = '';
    document.getElementById('description').innerHTML = '';
    display_items(search_input);
}


function display_items(search_input) {
    if (search_input == '') {
        const description = document.getElementById('description');
                description.innerHTML =
                    `<h1 style="text-align: center;">What are you looking for ? </h1>`
        return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search_input}`)
        .then(res => res.json())
        .then(data => {
            const meals = data.meals;
            if (meals == null) {
                const description = document.getElementById('description');
                description.innerHTML =
                    `<h1 style="text-align: center;">NO matched item found for ${search_input} ! </h1>`
                return;
            }
            for (let i = 0; i < meals.length; i++) {
                const name = meals[i].strMeal;
                const pic_link = meals[i].strMealThumb;
                const div = document.createElement('div');
                div.innerHTML = `<img src=${pic_link} width="310" height="226">
                <h4>${name}</h4>`;
                document.getElementById('container').append(div);
                div.addEventListener('click', () => {
                    showDetail(meals[i].idMeal);
                });
            }

        })


}
function showDetail(meal_id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal_id}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('description').innerHTML = '';
            const meals = data.meals[0];
            const pic_link = meals.strMealThumb;
            const name = meals.strMeal;
            const description_section = document.getElementById('description');
            const img_div = document.createElement('div');
            img_div.setAttribute('id', 'single_item_img');
            img_div.innerHTML = `<img src=${pic_link} width="588" height="322" >`
            description_section.appendChild(img_div);
            const detail = document.createElement('div');
            detail.setAttribute('id', 'single_item_description');
            detail.innerHTML = `<h2>${name}</h2> <h4>Ingredients</h4>`;
            description_section.appendChild(detail);
            const procedure = document.createElement('div');
            procedure.setAttribute('id', 'single_item_procedure');
            for (let i = 1; `${meals[`strMeasure${i}`]}`; i++) {
                if (`${meals[`strMeasure${i}`]}` == 'undefined') {
                    break;
                }if (!`${meals[`strIngredient${i}`]}`) {
                    break;
                }
                const ingredient = document.createElement('p');
                ingredient.innerHTML = `✅ ${meals[`strMeasure${i}`]} ${meals[`strIngredient${i}`]}`;
                procedure.appendChild(ingredient)

            }
            description_section.append(procedure);
            description_section.appendChild(procedure);
            scrollToTop();

        })

}

function scrollToTop() {
    window.scrollTo({
        top: 150,
        behavior: 'smooth'
    });
}


