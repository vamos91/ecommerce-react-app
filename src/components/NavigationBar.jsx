import React, {useContext} from 'react';
import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import { FaTrashAlt } from "react-icons/fa";
import {Link} from "react-router-dom";
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';

const Navigationbar = () => {
    const navigate = useNavigate()
    const { userData, storeUserData, productsSelected, deleteProduct, deleteAllProductInCart } = useContext(UserContext)
    
    const logout = async () => {
        const responseFromServer = await fetch('/auth/logout', {
            withCredentials: true,
            credentials: "include"
        })
        if(responseFromServer.status === 200){
            storeUserData(null)
            navigate('/signin')
        }
    }

    return (
        <Navbar fluid rounded flex justify-between>
            <Navbar.Brand href="https://flowbite-react.com">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar href="#" active>
                    <Link to='/'><Button color="light">Home</Button></Link>
                </Navbar>
            </Navbar.Collapse>
            {
                userData ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">Articles au panier({productsSelected.length})</span>
                    </Dropdown.Header>
                    {
                            productsSelected.length > 0 && productsSelected.map((e, i) => (
                            <Dropdown.Item key={i} onClick={() => deleteProduct(e)}>{e.title} <FaTrashAlt /></Dropdown.Item>
                        ))
                    }
                    <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                        <Dropdown.Item onClick={() => deleteAllProductInCart()}>Reset Cart</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Navbar.Collapse>
                        <Navbar href="#" active>
                            <Link to='/signin'><Button color="blue">Signin</Button></Link>
                        </Navbar>
                    </Navbar.Collapse>
                )
                
            }
            
        </Navbar>
    );
};

export default Navigationbar;