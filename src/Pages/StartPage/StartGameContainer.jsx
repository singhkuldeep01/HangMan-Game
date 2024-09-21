import { useLocation } from "react-router-dom";
import { useState , useEffect } from "react";
import StartGame from "./StartGame";
function StartGameContainer(){
    const location = useLocation();
    const value = location.state.word.inputValue;
    const defination = location.state.defination.desValue;
    const [guessedLetter, setGuessedLetter] = useState('');
    const [incorrectGuessedLetter, setIncorrectGuessedLetter] = useState(0);
    const [isGameWon, setIsGameWon] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const Alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let AlphabetsSet = new Set(Alphabets);
    function  onLetterClickHandler(letter){
        setGuessedLetter(guessedLetter => {
            if (guessedLetter.includes(letter)) {
                return guessedLetter;
            }
            if(!value.toUpperCase().includes(letter) && !guessedLetter.includes(letter)){
                setIncorrectGuessedLetter(incorrectGuessedLetter => incorrectGuessedLetter + 1);
            }
            return guessedLetter + letter;
        });
    }

    useEffect(() => {
        const handleKeyPress = (e) => {
            let letter  = e.key.toUpperCase();
            if (AlphabetsSet.has(letter)) {
                onLetterClickHandler(letter);
            }
        };
        if (!isGameOver && !isGameWon) {
            window.addEventListener('keydown', handleKeyPress);
        }else{
            window.removeEventListener('keydown', handleKeyPress);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [isGameOver, isGameWon, guessedLetter]);
    
    useEffect(() => {
        const originalWordSet = new Set(value.toUpperCase());
        const guessedLetterSet = new Set(guessedLetter.toUpperCase());
        if ([...originalWordSet].every(letter => guessedLetterSet.has(letter))) {
            setIsGameWon(true);
        }
        if (incorrectGuessedLetter > 6 && !isGameWon) {
            setIsGameOver(true);
        }
    }, [guessedLetter]);

    return(
        <StartGame
            value={value}
            guessedLetter={guessedLetter}
            isGameOver={isGameOver}
            isGameWon={isGameWon}
            onLetterClickHandler={onLetterClickHandler}
            defination={defination}
            incorrectGuessedLetter={incorrectGuessedLetter}
        >
        </StartGame>
    );

}
export default StartGameContainer;