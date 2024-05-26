import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

const ProductPage = () => {
    const [product, setProduct] = useState({})
    const {id} = useParams()
    
    useEffect(() => {
        const getData = async () => {
           const data = await fetch(`https://fakestoreapi.com/products/${id}`)
           const dataJson = await data.json()
           setProduct(dataJson)
        }
        getData()
    })
    return (
        <div>
            <Link to="/">
                <Button color="success">Go back</Button>
            </Link>
            <Card
                className="max-w-sm"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={product.image}
            >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {product.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </p>
                <p>{product.price} €</p>
            </Card>
        </div>
    );
};

export default ProductPage;