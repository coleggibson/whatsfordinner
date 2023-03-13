import { useEffect, useState } from "react"
import uniqid from "uniqid";
import '../index.css'
import '../styles/Content.css'

//add count to ingredients
//add random recipe
const Content = () => {
    
    let orderNum
    const [ingredients, setIngredients] = useState ([
    ]);

    const [recipes, setRecipes] = useState([
        {title: 'Cornmeal mix for a big family', link:'www.cornmeal.com', id:123},
        {title: 'Carrot soufle for the big fam on board',link:'www.carrot.com', id:125},
    ]);

    const [shownRecipes, setShownRecipes] = useState([

    ]);

    const capitalize = (string) => {
        let lowercaseResult = string.toLowerCase();
        let capitalizedResult = lowercaseResult.charAt(0).toUpperCase() + lowercaseResult.slice(1);
        return capitalizedResult
    }

    const addIngredient = (ingredient) => {
        let value = document.getElementById('name').value
        let ingredientObject = {}
        ingredientObject.name = capitalize(ingredient)
        
        if ( value.trim() !== ''){
        ingredientObject.id = uniqid()
        ingredients.push(ingredientObject)
        setIngredients([...ingredients])
        combineIngredients(ingredients)
        document.getElementById('name').value = ''
        
        }
         
        console.log(ingredients)
    }

    const combineIngredients = (ingredients) => {
        let urlIngredientArray = '';
        for (let i =0; i < ingredients.length; i++) {
            urlIngredientArray += ingredients[i].name + ',+'
        }

        let newUrl = 'https:api.spoonacular.com/recipes/findByIngredients?apiKey=5a9eaad9b6f54ec5adca1041255d83f2&ingredients=' + urlIngredientArray.toLowerCase() + '&number=3' ; 
        
        fetch(newUrl) 
    
        .then(function(result) {
            return result.json();
        })
        

        .then(function(result) {
            getRecipeUrl(result)
            setRecipes([...result])
            
            console.log(result)
        });
        
    }

    
    const getRecipeUrl = (array) => {
        for (let i = 0; i < array.length; i++){
        
        let recipeId = array[i].id
        let recipeUrl = 'https:api.spoonacular.com/recipes/' + recipeId + '/information?apiKey=5a9eaad9b6f54ec5adca1041255d83f2'; 
        
        fetch(recipeUrl) 
    
        .then(function(response) {
            return response.json();
        })
        
        .then(function(response) {
            array[i].link = response.sourceUrl
            // setRecipes({...response})
        });
        
    }
    }

    const deleteIngredient = (ingredient) => {
        let divId = document.getElementById(ingredient.id).id

        let indexOfIngredient = ingredients.findIndex(ingredient => {
            return ingredient.id === divId
        })

        ingredients.splice(indexOfIngredient, 1)
        
        setIngredients([...ingredients])
        setShownRecipes([...recipes])
    }

    const deleteAllIngredients = (ingredients) => {
        setIngredients([])
        setRecipes([])
        setShownRecipes([])
    }

    const searchRecipes = (recipes) => {
        setShownRecipes([...recipes])
        console.log(recipes)
    }

    const pullMissingIngredients = () => {

    }

    return (
        <div id="content-container">
            <div id='search-content'>
                <div id='search-items'>
                    <input id='name' type='text' defaultValue='' placeholder='Type your ingredient'/>
                    <div id='button-container'>
                        <input id='ingredient-button' type='button' value='Add' onClick={() => addIngredient(document.getElementById('name').value)}/>
                        <input id='ingredient-button' type='button' value='Delete All' onClick={() => deleteAllIngredients(ingredients)}/>
                    </div>
                </div>
                <input id='submit-button' type='button' value='Search Recipes' onClick={() => searchRecipes(recipes)}/>
                <div id='ingredient-list'>
                    {ingredients.map((ingredient) => {
                        return (<div key={ingredient.id} 
                                id={ingredient.id}
                                className='ingredient-container'
                                onClick={() => deleteIngredient(ingredient)}>
                                <div className='ingredient-name'>{ingredient.name}</div>
                        </div>
                        )
                    })}
                </div>
            </div>
            <div id='results-title'>Top 10 Results</div>
            <div id='recipe-results'>
                    {shownRecipes.map((recipe) => {
                        return (<div key={recipe.id} 
                                className='recipe-container'>
                                <img className='recipe-image' src={recipe.image}></img>
                                <div className='recipe-content-container'>
                                    <div className='recipe-name'>{recipe.title}</div>
                                    <div className ='recipe-url'>Link to recipe: {recipe.link}</div>
                                </div>
                        </div>
                        )
                    })}
                
            </div>
        </div>
    )
}

export default Content
