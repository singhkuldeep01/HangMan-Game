import { useLocation } from "react-router-dom";
import { useState , useEffect, useContext } from "react";
import StartGame from "./StartGame";
import { WordContext } from "../../Context/WordContext";
function StartGameContainer(){
    const location = useLocation();
    const [wordList , setWorldList] = useContext(WordContext);
    const [value, setValue] = useState(location.state.word.inputValue);
    const [defination, setDefination] = useState(location.state.defination.desValue);
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
            return guessedLetter + letter;
        });
        if(!value.toUpperCase().includes(letter) && !guessedLetter.includes(letter)){
            console.log('Incorrect Guess');
            setIncorrectGuessedLetter(incorrectGuessedLetter => incorrectGuessedLetter + 1);
        }
    }

    function onCloseHandler(){
        setIsGameOver(false);
        setIsGameWon(false);
        setGuessedLetter('');
        setIncorrectGuessedLetter(0);
        let data = wordList[Math.floor(Math.random()*wordList.length)];
        setValue(data.wordValue);
        setDefination(data.wordHint);
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
            onCloseHandler={onCloseHandler}
        >
        </StartGame>
    );

}
export default StartGameContainer;