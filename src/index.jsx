import React from 'react';
import reactDOM from 'react-dom';
import classnames from 'classnames';
import { sample } from 'lodash';

import levels from '../config/levels.yaml';

// console.log("Levels?", levels);
import './main.css';

// let state = {

//     secretWord: "ELEPHANTS",
//     secretWordCategory:"NATURE",
//     selectedLetters: ["E","M","P"],
//     errorCount: 1,
//     maxErrors: 7,
//     success: false,
//     failure: false,
//     score: 0

// };

let state = {

    secretWord: null,
    secretWordCategory:null,
    selectedLetters: [],
    errorCount: 0,
    maxErrors: null,
    success: false,
    failure: false,
    score: 0

};

function start() {

    const secretWordCategory = sample(Object.keys(levels));
    const secretWord = sample(levels[secretWordCategory]);
    state = {
        ... state,
        secretWord,
        secretWordCategory,
        selectedLetters: [],
        errorCount: 0,
        maxErrors: 5 + ~~(secretWord.length / 3),
        success: false,
        failure: false,
    }

    // console.log("Made a state", state);

    render();

}   

function handleSelectLetter({letter}) {

    let correct = state.secretWord.includes(letter); 
    let selectedLetters = [...state.selectedLetters, letter];
    let errorCount = state.errorCount + (correct ? 0 : 1) 
    let success = state.secretWord.split("").every(letter => selectedLetters.includes(letter));
    let failure = errorCount >= state.maxErrors;

    state = {

        ...state,
        selectedLetters,
        errorCount,
        success,
        failure

    }

    render();

};


const Main = ({secretWordCategory, secretWord, selectedLetters, failure, success})=>{

    const errorsUsedPercent = state.errorCount / state.maxErrors * 100
    return (
    <div>
        <h2>{secretWordCategory}</h2>
        <div className={classnames("secret-word-container", {success: state.success}, {failure: state.failure})}>   
            <h3>
                {secretWord.split('').map((letter, index) => {
                    if (failure || selectedLetters.includes(letter.toUpperCase())) {

                        return <span key={index}>{letter} </span>

                    } else {

                        return <span key={index}>_ </span>
                    }
                })}
            </h3>
        </div>
        <div className="game-revealed-image-container">

            <div className="game-revealed-image">
                <img src="img.jpeg"/>
            </div>
            
            <div className="game-revealed-image-cover" style={{height: `${100 - errorsUsedPercent}%`}}>
            </div>
        </div>
        <div className="selected-letter-container">

            <span>USED:</span>

            {selectedLetters.map((letter, index) => (
                <span key={index}>{letter}</span>
            ))}
        </div>
        <div>
            {[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(letterOption => {

                const disabled = selectedLetters.includes(letterOption) || failure || success;

                return <button key={letterOption} disabled={disabled} onClick={()=>{handleSelectLetter({letter:letterOption})}}>{letterOption}</button>

            })}
        </div>
        <div>
            <button onClick={start}>Start Again</button>
        </div>
        
    </div>
)};

function render() {

    console.info(state);    
    reactDOM.render(<Main {...state}/>, document.querySelector("#Container"))

};


console.info("Webpack ready to ROCK");
// render();
start();