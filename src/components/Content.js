import { useState } from "react"
import uniqid from "uniqid";
import '../index.css'
import '../styles/Content.css'


const Content = () => {
    
    let orderNum = 3
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

        let newUrl = 'https:api.spoonacular.com/recipes/findByIngredients?apiKey=5a9eaad9b6f54ec5adca1041255d83f2&ingredients=' + urlIngredientArray.toLowerCase() + '&number=10' ; 
        
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

    const capitalize = (string) => {
        let lowercaseResult = string.toLowerCase();
        let capitalizedResult = lowercaseResult.charAt(0).toUpperCase() + lowercaseResult.slice(1);
        return capitalizedResult
    }

    const addIngredient = (ingredient) => {
        let ingredientObject = {}
        
        
        ingredientObject.name = capitalize(ingredient)
        ingredientObject.id = uniqid()
        ingredientObject.orderNum = orderNum + 1
        ingredients.push(ingredientObject)
        setIngredients([...ingredients])
        document.getElementById('name').value = ''
        console.log(ingredients)
    }


    const deleteIngredient = (ingredient) => {
        
        let index = ingredients.indexOf(orderNum)

        let x = ingredients.splice(index, orderNum)

        setIngredients([...ingredients])
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
                                className='ingredient-container'
                                onClick={() => deleteIngredient(ingredient)}>
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
