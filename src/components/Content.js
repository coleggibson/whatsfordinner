import { useState } from "react"
import uniqid from "uniqid";
import '../index.css'
import '../styles/Content.css'


const Content = () => {
    
    
    const [ingredients, setIngredients] = useState ([
        {name: 'apple', id:uniqid()},
        {name: 'orange', id:uniqid()},
        {name: 'chicken', id:uniqid()}
    ]);

    



    function combineIngredients (ingredients) {
        let urlIngredientArray = '';
        for (let i =0; i < ingredients.length; i++) {
            urlIngredientArray += ingredients[i].name + ',+'
        }

        let newUrl = 'https:api.spoonacular.com/recipes/findByIngredients?apiKey=5a9eaad9b6f54ec5adca1041255d83f2&ingredients=' + urlIngredientArray + '&number=10' ; 
        
        // fetch(newUrl) 
    
        // .then(function(response) {
        //     return response.json();
        // })
        
        // .then(function(response) {
        //     console.log(response);
        // });
        
        console.log(urlIngredientArray)
        console.log(newUrl)
    }

    const addIngredient = (ingredient) => {
        let ingredientObject = {}

        
        ingredientObject.name = ingredient
        ingredientObject.id = uniqid()
        ingredients.push(ingredientObject)
        setIngredients([...ingredients])
        document.getElementById('name').value = ''
        console.log(ingredients)
    }

    combineIngredients(ingredients)
    return (
        <div id="content-container">
            <div id='search-content'>
                <input id='name' type='text' defaultValue='' placeholder='Add ingredient'/>
                <br/>
                <input id='submit-button' type='button' value='Submit' onClick={() => addIngredient(document.getElementById('name').value)}/>
                <div id='ingredient-list'>
                    {ingredients.map((ingredient) => {
                        return (<div key={ingredient.id} 
                                className='ingredient-container'>
                                <div className='ingredient-name'>{ingredient.name}</div>
                        </div>
                        )
                    })}
                </div>
            </div>
            <div id='recipe-results'>!recipe results</div>
        </div>
    )
}

export default Content
