
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
                return;
            }
            for (let i = 0; i < meals.length; i++) {
                const name = meals[i].strMeal;
                const pic_link = meals[i].strMealThumb;
                const div = document.createElement('div');
                div.innerHTML = `<img src=${pic_link} width="310" height="226">
                <h4>${name}</h4>`;
                document.getElementById('container').append(div);
                div.addEventListener('click',() => {
                    showDetail(meals[i].idMeal);
                });
            }

        })
        

}
function showDetail(meal_id){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal_id}`)
    .then(res=>res.json())
    .then(data=>{
        // document.getElementById('container').innerHTML = '';
        document.getElementById('description').innerHTML='';
        const meals=data.meals[0];
        // console.log(meal_id);
        console.log(meals);
        const pic_link=meals.strMealThumb;
        const name=meals.strMeal;
        const description_section=document.getElementById('description');
        const img_div=document.createElement('div');
        img_div.setAttribute('id','single_item_img');
        img_div.innerHTML=`<img src=${pic_link} width="588" height="322" >`
        description_section.appendChild(img_div);
        const detail=document.createElement('div');
        detail.setAttribute('id','single_item_description');
        detail.innerHTML=`<h2>${name}</h2> <h4>Ingredients</h4>`;
        description_section.appendChild(detail);
        const procedure=document.createElement('div');
        procedure.setAttribute('id','single_item_procedure');
        for (let i = 1; `${meals[`strIngredient${i}`]}`; i++) {
            const ingredient = document.createElement('p');
            ingredient.innerHTML = `✅ ${meals[`strMeasure${i}`]} ${meals[`strIngredient${i}`]}`;
            const test_output = `✓ ${meals[`strMeasure${i}`]} ${meals[`strIngredient${i}`]}`;
            console.log(test_output);
            procedure.appendChild(ingredient)
            
        }
        description_section.append(procedure);



        description_section.appendChild(procedure);
        scrollToTop();
        // console.log(pic_link);
        // console.log(name);
    })
    
}

function scrollToTop() {
    window.scrollTo({
      top: 150,
      behavior: 'smooth'
    });
  }


