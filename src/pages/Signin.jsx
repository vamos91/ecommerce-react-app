import React, {useContext} from 'react';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form"
import { UserContext } from '../context/UserProvider';

const Signin = () => {
    const { storeUserData } = useContext(UserContext)
    const navigate = useNavigate()
    const { register,
        handleSubmit,
        watch,
        formState: { errors } } = useForm()
    
        const login = async (data) => {
            const responseFromServer = await fetch('/auth/signin', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            })
            const responseFromServerJson = await responseFromServer.json()
            if(responseFromServer.status === 200){
                fetch('/auth/current-user')
                .then((response) => response.json())
                .then((data) => {
                    storeUserData(data.email)
                    navigate('/profile')
                })
                
            }else{
                console.log(responseFromServerJson.message)
            }

        }

    return (
        <div className='h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit(login)} className="flex max-w-md flex-col gap-4 w-screen">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput {...register("email")} id="email1" type="email" value="hulk@marvel.fr" placeholder="name@flowbite.com" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Your password" />
                    </div>
                    <TextInput {...register("password")} value="12345678" id="password1" type="password" required />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button type="submit">Login</Button>
                <Link to='/signup'>Pas encore inscrit ?</Link>
            </form>
            
        </div>
        
    );
};

export default Signin;