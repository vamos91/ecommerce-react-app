import { useState, useEffect, useContext } from "react";
import Product from "../components/Product";
import '../App.css'
import Navigationbar from "../components/NavigationBar";
import { TextInput, Button, Select, Label } from "flowbite-react";
import { UserContext } from "../context/UserProvider";

const Home = () => {
    const { storeIntoCart, productsSelected } = useContext(UserContext)
    const [productsData, setProductsData] = useState([])
    const [dataSaved, setDataSaved] = useState([])
    const [productsLiked, setProductsLiked] = useState([])
    const [search, setSearch] = useState('')
    const [categories, setCategories] = useState([])
    const [isClose, setIsClose] = useState(true)

    useEffect(() => {
        const getProducts = async () => {
            const products = await fetch('https://fakestoreapi.com/products')
            const getProductsJson = await products.json()
            setProductsData(getProductsJson)
            setDataSaved(getProductsJson)
        }
        getProducts()
    }, [])

    const getDataFromChild = (product) => {
        if (productsLiked.find((e) => e.title === product.title) === undefined) {
            //setProductsLiked([...productsLiked, product])
            storeIntoCart(product)
        }
    }

    const deleteProduct = (product) => {
        setProductsLiked(productsLiked.filter((e) => e != product))
    }

    useEffect(() => {
        const getAllCategories = async () => {
            const categories = await fetch('https://fakestoreapi.com/products/categories')
            const categoriesJson = await categories.json()
            setCategories(categoriesJson)

        }
        getAllCategories()
    }, [])

    const handleKey = (e) => {
        setIsClose(!isClose)
        setProductsData(dataSaved)
        setSearch(e.target.value)
        setProductsData(productsData => productsData.filter((product) => product.title.includes(search)))
    }

    const handleCategorie = (e) => {
        setProductsData(dataSaved)
        if(e.target.value !== 'all'){
            setProductsData(productsData => productsData.filter((product) => product.category === e.target.value))
        }else{
            setProductsData(dataSaved)
        }
    }

    return (
        <div className="app">
            {/* <Navigationbar products={productsLiked} handleParentDeleteProduct={deleteProduct} /> */}
            <div className="w-96 m-auto mb-5">
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="countries" value="Select your category" />
                    </div>
                    <Select id="category" onChange={(e) => handleCategorie(e)} required>
                        <option value="all">All</option>
                        {
                            categories.map((categorie, i) => (
                                <option key={i} value={categorie}>{categorie}</option>
                            ))
                        }
                    </Select>
                </div>
            </div>
            <div className="search-bar w-96 m-auto mb-20">
                <TextInput
                    onChange={(e) => handleKey(e)}
                    value={search}
                    type="text"
                    placeholder="Ex: Jeans"
                />
                <div id="dropdown" hidden={isClose} className="z-10 w-96 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        {
                            productsData.map((product, i) => (
                                <li key={i} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{product.title}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="flex flex-wrap gap-10 justify-center">
                {
                    productsData.length > 0 && (
                        productsData.map((e, i) => {
                            const result = productsSelected.find((product) => product.title == e.title)
                            let like;
                            if (result !== undefined) {
                                like = true
                            } else {
                                like = false
                            }
                            return <Product key={i} id={e.id} title={e.title} liked={like} image={e.image} description={e.description} price={e.price} handleParentClick={getDataFromChild} />
                        })
                    )
                }
            </div>
        </div>
    )
};

export default Home;