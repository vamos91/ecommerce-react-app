import React, { useState, useContext } from 'react';
import { Card, Button } from "flowbite-react";
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const Product = ({id, title, image, price, description, handleParentClick, liked }) => {
    const {userData} = useContext(UserContext)
    console.log('product component', userData)
    const addToCart = () => {
        const product = {
            title: title,
            image: image,
            price: price
        }
        handleParentClick(product)
    }

    const handleContent = (content) => {
        const stringToArray = content.split(' ')
        stringToArray.splice(20)
        return stringToArray.join(' ')
    }

    return (
        <Card
            className="max-w-sm"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc={image}
        >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                {handleContent(description) + '[...]' }
            </p>
            <p>{price} €</p>
            <Button disabled={userData != null ? false : true} color={liked ? "green" : "blue"} onClick={() => addToCart()}>Mettre au panier</Button>
            <Link to={`/${id}`}>
                <Button color="light" className='w-full'>
                    See product
                </Button>
            </Link>
        </Card>
    );
};

export default Product;