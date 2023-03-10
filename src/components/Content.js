import { useState } from "react"
import uniqid from "uniqid";
import '../index.css'
import '../styles/Content.css'

//add count to ingredients
//add random recipe
const Content = () => {
    
    let orderNum = 2
    const [ingredients, setIngredients] = useState ([
        {name: 'Apple', id:uniqid()},
        {name: 'Orange', id:uniqid()},
        {name: 'Chicken', id:uniqid()}
    ]);

    const [recipes, setRecipes] = useState([
        {title: 'Cornmeal mix for a big family', link:'www.cornmeal.com', id:123},
        {title: 'Carrot soufle for the big fam on board',link:'www.carrot.com', id:125},
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
        ingredientObject.orderNum = orderNum + 1
        ingredients.push(ingredientObject)
        setIngredients([...ingredients])
        combineIngredients(ingredients)
        value = ''
        
        }
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
            setRecipes([...result])
        });

        
        console.log(recipes)
    }
    
    const getRecipeUrl = (recipe) => {
        let recipeId = recipe.id
        let recipeUrl = 'https:api.spoonacular.com/recipes/' + recipeId + '/information?apiKey=5a9eaad9b6f54ec5adca1041255d83f2'; 
        
        fetch(recipeUrl) 
    
        .then(function(result) {
            return result.json();
        })
        
        .then(function(result) {
            recipe.link = result.sourceUrl
            setRecipes([...recipes])
        });
    }

    const deleteIngredient = (ingredient) => {
        
        let index = ingredients.indexOf(orderNum)

        let x = ingredients.splice(index, orderNum)

        setIngredients([...ingredients])
    }

    return (
        <div id="content-container">
            <div id='search-content'>
                <input id='name' type='text' defaultValue='' placeholder='Add ingredient'/>
                <br/>
                <input id='submit-button' type='button' value='Submit' onClick={() => addIngredient(document.getElementById('name').value)}/>
                <div id='ingredient-list'>
                    {ingredients.map((ingredient) => {
                        return (<div key={ingredient.id} 
                                className='ingredient-container'
                                onClick={() => deleteIngredient(ingredient)}>
                                <div className='ingredient-name'>{ingredient.name}</div>
                        </div>
                        )
                    })}
                </div>
                
            </div>
            
            <div id='recipe-results'>
            <div id='results-title'>Results</div>
                    {recipes.map((recipe) => {
                        return (<div key={recipe.id} 
                                className='recipe-container'>
                                <div className='recipe-image'>img</div>
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
