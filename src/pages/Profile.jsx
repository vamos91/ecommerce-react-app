import React, { useContext, useEffect} from 'react';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { userData } = useContext(UserContext)
    const navigate = useNavigate()

    // useEffect(() => {
    //     if(!userData){
    //        navigate('/signin')
    //     }
    // }, [userData])
    return (
        <div>
            Profile page {userData}
        </div>
    );
};

export default Profile;