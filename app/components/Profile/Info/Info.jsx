import React, { useEffect, useState } from 'react'
import './info.scss'

const Info = ({ user }) => {
    const [disableInput, setDisableInput] = useState(true)
    const [name, setName] = useState("")
    useEffect(() => {
        if (user) {
            setName(user.Username);
        }
    }, [user])

    console.log(user)
    const myfn = () => {

    }

    return (
        <div className="container">
            <img src="/user1.png" alt="" />
            <h2>Personal information</h2>
            <div className="info">
                <div className='details'>
                    <label>First Name<button>*Change</button></label>
                    <input type="text" value={name.split(" ")[0] || ""} disabled={disableInput} onChange={myfn} />

                </div>
                <div className='details'>
                    <label>Last Name<button>*Change</button></label>
                    <input type="text" value={name.split(" ")[1] || ""} disabled={disableInput} onChange={myfn} />

                </div>
                <div className='details'>
                    <label>Email<button>*Change</button></label>
                    <input type="text" value={user.Email || ""} disabled={disableInput}
                        onChange={myfn}
                    />
                </div>

                <div className='details'>
                    <label>Contact<button>*Change</button></label>
                    <span>
                        <input className='countrycode' type="text" value="+91" disabled onChange={myfn} />
                        <input type="text" value={user.Phone || ""} disabled={disableInput} onChange={myfn} />
                    </span>
                </div>
                <div className='details'>
                    <label>Password<button>*Change</button></label>
                    <input type="password" value="123456789" disabled={disableInput} />
                </div>
            </div>
            <div className='button'>
                <p>Your data will handled care</p>
                <button disabled>Update</button>
            </div>
        </div>

    )
}

export default Info