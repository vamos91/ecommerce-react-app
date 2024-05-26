import React, {useState} from 'react';

const Burger = ({ burgerName, handleParentClick }) => {
    const [counter, setCounter] = useState(0)
    const [check, setCheck] = useState(false)
    const handleClick = () => {
        setCounter(counter + 1)
        setCheck(!check)
        console.log(counter)
    }

    const orderBurger = () => {
        handleParentClick(burgerName)
    }

    return (
        <div>
            <img width={300} src="https://www.biofournil.com/wp-content/uploads/2021/02/BRIOCHE-BIOFOURNIL_web.jpg" alt="" />
            <div className="title">{burgerName}</div>
            <p>Lorem ipsum dolor sit amet.</p>
            <div className="price">10</div>
            <button onClick={() => handleClick()}>Like {counter}</button>
            <button onClick={() => orderBurger()}>Commander</button>
        </div>
    );
};

export default Burger;