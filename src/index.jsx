import React from 'react';
import reactDOM from 'react-dom';

const Main = (state)=>(
    <div>
        Whoa there!
    </div>
);

reactDOM.render(<Main />, document.querySelector("#Container"))

console.info("Webpack ready to ROCK");