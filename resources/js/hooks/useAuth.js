import React, {useContext, useEffect} from "react";
import {Cookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

import AuthContext from "../context/authContext";

export const useAuth = () => {
    let navigate = useNavigate();

    const [userData, setUserdata] = React.useState({signedIn: false, user: null, isEmployer: false});

    const {setAuthData} = useContext(AuthContext);

    useEffect(() => {
        setAuthData(userData);
    }, [userData.signedIn]);

    function getAuthCookieExpiration()
    {
        let date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));  // 7 days
        return date;
    }

    function setAsLogged(user) {

        const cookie = new Cookies();

        cookie.set('is_auth', true, {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});

        if(user.user_type === "employer"){
            setUserdata({signedIn: true, user, isEmployer: true});
        }else{
            setUserdata({signedIn: true, user, isEmployer: false});
        }
        

        navigate('/');
    }

    function setLogout() {
        const cookie = new Cookies();

        cookie.remove('is_auth', {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});

        setUserdata({signedIn: false, user: null, isEmployer: false});

        navigate('/login');
    }

    function loginUserOnStartup()
    {
        const cookie = new Cookies();
        if(cookie.get('is_auth')) {

            axios.post('/api/me').then(response => {
                
                if(response.data.user.user_type === "employer"){
                    setUserdata({signedIn: true, user: response.data.user, isEmployer: true});
                }else{
                    setUserdata({signedIn: true, user: response.data.user, isEmployer: false});
                }

                navigate('/');
            }).catch(error => {
                setUserdata({signedIn: false, user: null, isEmployer: false});
                setLogout();
            });

        } else {
            setUserdata({signedIn: false, user: null, isEmployer: false});
            navigate('/login');
        }
    }

    return {
        userData,
        setAsLogged,
        setLogout,
        loginUserOnStartup
    }

};