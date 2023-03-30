import React, {useEffect, useState} from 'react'


const AllEmployerData = () => {
    const [empRatings, setEmpRatings] = useState({});

    useEffect(() => {
        axios.post(`/api/allRatings`).then(response => {
            setEmpRatings(response?.data)
        }).catch(error => {
            
        });

    }, [])

    let tr = "";

    // if(empRatings){
    //     for(i = 0; i < empRatings?.length; i++){
    //         <tr>

    //         </tr>
    //     }
    // }
    

  return (
    <div>
        <table className='table'>
            <thead>
                <tr>
                    <th>Employer Name</th>
                    <th>Total Points</th>
                    <th>Stars</th>
                </tr>
            </thead>
            <tbody>
            {
                Object.entries(empRatings)?.map((emp) => {
                   return (
                    <tr>
                        <td>{emp[1]?.employer?.employer_name}</td>
                        <td>{emp[1]?.total_points}</td>
                        <td>{emp[1]?.stars}</td>
                    </tr>
                   )
                })
            }
            </tbody>
        </table>
    </div>
  )
}

export default AllEmployerData