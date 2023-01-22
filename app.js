

const mealModal = document.querySelector('.modal-wrapp')
const closeModal = document.querySelectorAll('.closemodal')
const searchBtn = document.querySelector('.sebtn')
const searchInput = document.querySelector('.search')
const mealList = document.querySelector('.meals')






searchBtn.addEventListener('click', findMeals)
mealList.addEventListener('click', getRecipe)





function findMeals(){
     let searchIng = searchInput.value.trim()
     
     fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchIng}`)
     .then(response => response.json())
     .then(data => {
         let inHtml = ``;
         if(data.meals){
             data.meals.forEach(meal =>{
                 inHtml += `<div class="meal" data-id = "${meal.idMeal}">
                            <img src="${meal.strMealThumb}" alt="">
                            <h2>${meal.strMeal}</h2>
                            <button class="recipeHere" id="seerecipe">See recipe</button>
                        </div>`
             })
         } else{
             inHtml = "Sorry we didn't find any meal!"
         }

         mealList.innerHTML = inHtml;


     })

}



function getRecipe(e){
    
    if(e.target.classList.contains('recipeHere')){
        let mealItem = e.target.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => recipeModal(data.meals))
    }
}



function recipeModal(meal){
    console.log(meal)
    meal = meal[0]
    let html = `
            <div class="modal">
            <img class="closemodal" src="Close.svg" alt="" srcset="">
            <h1>${meal.strMeal}</h1>
            <p>${meal.strInstructions}</p>
            <img class="innerImg" src="${meal.strMealThumb}" alt="" srcset="">
            <a href="${meal.strYoutube}" target = "_blank" >Watch video</a>
        </div>
    `
    mealModal.innerHTML = html
    mealModal.style.display = 'flex'

    mealModal.querySelector('.closemodal').addEventListener('click', () => {
        mealModal.style.display = 'none'
    })

}


























