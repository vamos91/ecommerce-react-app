import React, { createContext, useEffect, useState } from 'react';
export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || '')
    const [productsSelected, setProductsSelected] = useState(JSON.parse(localStorage.getItem('productsSelected')) || [])

    useEffect(() => {
        localStorage.setItem('productsSelected', JSON.stringify(productsSelected))
    }, [productsSelected])

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData))
    }, [userData])

    const storeIntoCart = (product) => {
        setProductsSelected([...productsSelected, product])
    }

    const deleteProduct = (product) => {
        setProductsSelected(productsSelected => productsSelected.filter((e) => e != product))
        localStorage.setItem('productsSelected', JSON.stringify(productsSelected))
    }

    const deleteAllProductInCart = () => {
        setProductsSelected([])
        localStorage.removeItem('productsSelected');
    }

    const storeUserData = (email) => {
        setUserData(email)
        localStorage.removeItem('userData')
    }

    return (
        <UserContext.Provider value={{ userData, storeUserData, productsSelected, storeIntoCart, deleteProduct, deleteAllProductInCart }}>
            {children}
        </UserContext.Provider>
    );
};

