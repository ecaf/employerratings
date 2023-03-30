import React, {useEffect, useState} from 'react'


const EmployerData = () => {
    const [empData, setEmpData] = useState({});

    useEffect(() => {
        axios.post(`/api/test?employer_id=1`).then(response => {
            setEmpData(response?.data)
        }).catch(error => {
            
        });

    }, [])

  return (
    <div>
        <ul>
            <li>Employer ID: {empData?.employer_id}</li>
            <li>Employer Name: {empData?.employer_name}</li>
            <li>Total Points: {empData?.total_points}</li>
            <li>Stars: {empData?.stars}</li>
        </ul>
    </div>
  )
}

export default EmployerData