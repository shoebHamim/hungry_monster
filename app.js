
const submit_button = document.getElementById('submit_button');
submit_button.addEventListener('click', findItem);

function findItem() {
    const search_input = document.getElementById('search_input').value;
    display_items(search_input);

}

function display_items(search_input) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search_input}`)
        .then(res => res.json())
        .then(data => {
            const meals = data.meals;
            for (let i = 0; i < meals.length; i++) {
                const name = meals[i].strMeal;
                const pic_link = meals[i].strMealThumb;
                const div = document.createElement('div')
                div.innerHTML = `<img src=${pic_link} width="350" height="420">
                <h4>${name}</h4>`
                document.getElementById('container').append(div);
            }
        })

}
// fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`)
// .then(res => res.json())
// .then(data => {
//     const meals=data.meals;
//    console.log(meals[0]);
//    const pic_link=meals[0].strMealThumb;
//    console.log(pic_link);
//    const div=document.createElement('div')
//    div.innerHTML=`<img src=${pic_link} alt="Girl in a jacket" width="500" height="600">`

//    document.body.append(div)

// })
