import React, {useEffect, useContext} from "react";
import AuthContext from "../../context/authContext";
import {useNavigate} from "react-router-dom";
import EmployerData from "./EmployerData";
import AllEmployerData from "./AllEmployerData";

//http://127.0.0.1:8000/api/test?employer_id=1

export const Home = () => {
    const {authData} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if(!authData.signedIn) {
            navigate('/login');
        }
    }, [authData]);

    return (
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Employer Rating</div>
                        <div className="card-body">
                            {
                                authData.signedIn && authData.user && (
                                    <>
                                        {
                                            authData?.isEmployer === true && (
                                                <>
                                                    <EmployerData />
                                                </>
                                            )
                                        }

                                        <AllEmployerData />
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
    );
};