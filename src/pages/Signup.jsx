import React from 'react';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form"


const Signup = () => {
    const navigate = useNavigate()
    const { register,
        handleSubmit,
        watch,
        formState: { errors } } = useForm()

        const handleForm = async (data) => {
            if(data.password === data.confirmPassword){
                console.log('send http request to backend')
                const dataFromServer = await fetch('/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password
                    })
                })
                const dataFromServerJson = await dataFromServer.json()
                if(dataFromServer.status === 200){
                    console.log(dataFromServerJson)
                    navigate('/signin')
                }else{
                    console.log('display alert', dataFromServerJson.message)
                }
            }
        }
    return (
        <div className='h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit(handleForm)} className="flex max-w-md flex-col gap-4 w-screen">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email2" value="Your email" />
                    </div>
                    <TextInput {...register("email")} id="email2" type="email" placeholder="name@flowbite.com" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password2" value="Your password" />
                    </div>
                    <TextInput {...register("password", {minLength: 8})} id="password2" type="password" required shadow />
                    {errors.password && <span>Password too short</span>}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="repeat-password" value="Repeat password" />
                    </div>
                    <TextInput {...register("confirmPassword")} id="repeat-password" type="password" required shadow />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="agree" />
                    <Label htmlFor="agree" className="flex">
                        I agree with the&nbsp;
                        <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                            terms and conditions
                        </Link>
                    </Label>
                </div>
                <Button type="submit">Register new account</Button>
                <Link to='/signin'>Déjà inscrit ?</Link>
            </form>
        </div>
    );
};

export default Signup;