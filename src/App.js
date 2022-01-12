import { useState, useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'
const cardImages = [
  { src: "/img/red.png", matched: false },
  { src: "/img/yellow.png", matched: false },
  { src: "/img/orange.png", matched: false },
  { src: "/img/blue.png", matched: false },
  { src: "/img/pink.png", matched: false },
  { src: "/img/green.png", matched: false }
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]  // to duplicate the cards. so we have 12 cards as in 1 copy extra of each image
      .sort(() => Math.random() - 0.5) // to shuffle the cards. since we are assigning random number so randomly the cards will be placed. Subtracting it with 0.5 since we can randomize it better 
      .map((card) => ({ ...card, id: Math.random() })) // assigning a unique id to each card by using random function

    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card) // if choice1 is null then it updates choice 1 and if choice1 has some value then it updates choice2
    console.log(choiceOne)
    console.log(choiceTwo)

  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {

        choiceOne.matched = true;
        choiceTwo.matched = true;
        resetTurn();
      }
      else {
        setTimeout(() => resetTurn(), 1000);
      }
      
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>Memory Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />

        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App