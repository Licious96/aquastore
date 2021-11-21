import React from 'react'
import { useState } from 'react'
import { Link, useNavigate,Navigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

    const navigate = useNavigate();
    const [f_name, setF_name] = useState('')
    const [l_name, setL_name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')
    const [errors, setErrors] = useState([])

    const register = async () => {

        const formData = new FormData()
        formData.append('f_name', f_name)
        formData.append('l_name', l_name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('password_confirmation', password_confirmation)

        try {
            const res = await axios.post('https://aquastore.stokoza.co.za/public/api/register', formData)
            console.log(res.data.id)
            sessionStorage.setItem('user_id', res.data.id)
            navigate('/home')
        } catch (error) {
            setErrors(error.response.data)
        }
        
    }

    if (sessionStorage.getItem('user_id')) {
        return <Navigate to='/home' />
    }
    
    return (
        <div className="be-splash-screen">
            <div className="be-wrapper be-login">
                <div className="be-content">
                    <div className="main-content container-fluid">
                        <div className="splash-container">
                            <div className="card card-border-color card-border-color-primary">
                                <div className="card-header"><div className="be-navbar-header"><h1 className="page-title">AquaStore</h1></div><span className="splash-description">Please enter your user information.</span></div>
                                <div className="card-body">
                                    <form>
                                        <div className="login-form">
                                            <div className="form-group row signup-password">
                                                <div className="col-6">
                                                    <input className="form-control" onChange={e => setF_name(e.target.value)} type="text" required="" placeholder="First Name" />
                                                    {errors?.f_name ? <span className="text-danger">{errors.f_name}</span> : null}
                                                </div>
                                                <div className="col-6">
                                                    <input className="form-control" onChange={e => setL_name(e.target.value)} type="text" placeholder="Last Name" />
                                                    {errors?.l_name ? <span className="text-danger">{errors.l_name}</span> : null}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" onChange={e => setEmail(e.target.value)} type="email" placeholder="Email Address" />
                                                {errors?.email ? <span className="text-danger">{errors.email}</span> : null}
                                            </div>
                                            <div className="form-group row signup-password">
                                                <div className="col-6">
                                                    <input className="form-control" onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                                                    {errors?.password ? <span className="text-danger">{errors.password}</span> : null}
                                                </div>
                                                <div className="col-6">
                                                    <input className="form-control" onChange={e => setPassword_confirmation(e.target.value)} type="password" placeholder="Confirm" />
                                                    {errors?.password ? <span className="text-danger">{errors.password}</span> : null}
                                                </div>
                                            </div>
                                            <div className="form-group row login-submit">
                                                <div className="col-6"><Link className="btn btn-secondary btn-xl" to="/" type="submit">Sign in</Link></div>
                                                <div className="col-6"><button type="button" className="btn btn-primary btn-xl" onClick={register} data-dismiss="modal">Register</button></div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
