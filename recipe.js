let Box=document.querySelector(".searchBox");
let Btn=document.querySelector(".searchButton");
let container=document.querySelector(".container");
let recipeContent=document.querySelector(".recipeContent");
let recipeDt=document.querySelector(".recipeDt");
let recipeClose=document.querySelector(".recipeClose");


const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`;

async function fetchRecipe(name){

    try{
        const response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        const recipe=await response.json();

        // Container of recipes
        container.innerHTML="";

        recipe.meals.forEach(meal => {
            const recipeDiv=document.createElement('div');
            recipeDiv.classList.add('recipe');

            recipeDiv.innerHTML=`
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strArea}</p>
            <p>${meal.strCategory}</p>`;
            container.appendChild(recipeDiv);

            // view recipe button
            const button=document.createElement('button');
            button.textContent="View Recipe";
            recipeDiv.appendChild(button);

        // Adding event listener to the view recipe button
            button.addEventListener('click',()=>{
                openRecipe(meal);
                console.log(meal);
            });
        
        });
    }

    catch(err){
        container.innerHTML=`<h1>Error fetching recipes</h1>`
    }

}


function fetchIngredients(meal){
    let ingredientList="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientList+=`<li>${measure}: ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientList;
}

function openRecipe(meal){
    recipeDt.style.display="block";
    recipeContent.innerHTML=`
    <h2>${meal.strMeal}</h2>
    <h3><b>Ingredients:<b></h3>
    <ul>${fetchIngredients(meal)}<ul>
    <h3>Recipe:</h3>
    <p>${meal.strInstructions}</p>`
    ;


    // recipeContent.parentElement.style.display="";
}

recipeClose.addEventListener('click',()=>{
    recipeDt.style.display="none";
});

Btn.addEventListener("click",(e)=>{
    e.preventDefault();
    
    const recipe=Box.value.trim();
    if(!recipe){
        container.innerHTML=`<h2>Type something to search</h2>`;
    }
    else{
        fetchRecipe(recipe);    
    }
    
    
});

