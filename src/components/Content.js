import { useState } from "react"
import uniqid from "uniqid";


const Content = () => {
    
    

    const [ingredients, setIngredients] = useState ([
        {name: 'apple', id:uniqid()},
        {name: 'orange', id:uniqid()},
        {name: 'chicken', id:uniqid()}
    ]);

    return (
        <div id="content-container">
            <input type='text' placeholder='Search for ingredient' id='ingredient-searchbar'></input>
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
    )
}

export default Content

{/* <div id="cardContainer">
        {cards.map((card) => {
            return (<div key={card.id} 
                    className='cardDiv' 
                    onClick={() => {shuffleCards(cards); keepScore(card.id);}}>
                        <img className ='cardImg'src={card.imgsrc}></img>
                        <div className='card-title'>{card.title}</div>
                   </div>
            )
        })}
    </div> */}