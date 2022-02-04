
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

                console.log('not found');
                return;
            }
            for (let i = 0; i < meals.length; i++) {
                const name = meals[i].strMeal;
                const pic_link = meals[i].strMealThumb;
                const div = document.createElement('div')
                div.innerHTML = `<img src=${pic_link} width="310" height="226">
                <h4>${name}</h4>`;


                document.getElementById('container').append(div);
            }

        })

}


