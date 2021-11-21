import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const login = async () => {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)
        try {
            const res = await axios.post('https://aquastore.stokoza.co.za/public/api/login', formData)
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
                                            <span className='text-center text-danger'>{errors.msg}</span>
                                            <div className="form-group">
                                                <input className="form-control" onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" />
                                                {errors?.email ? <span className="text-danger">{errors.email}</span> : null}
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                                                {errors?.password ? <span className="text-danger">{errors.password}</span> : null}
                                            </div>
                                            <div className="form-group row login-tools">
                                                <div className="col-6 login-remember">
                                                    <div className="custom-control custom-checkbox">
                                                        <input className="custom-control-input" type="checkbox" id="check1" />
                                                        <label className="custom-control-label" htmlFor="check1">Remember Me</label>
                                                    </div>
                                                </div>
                                                <div className="col-6 login-forgot-password"><a href="pages-forgot-password.html">Forgot Password?</a></div>
                                            </div>
                                            <div className="form-group row login-submit">
                                                <div className="col-6"><Link className="btn btn-secondary btn-xl" to="/register" type="submit">Register</Link></div>
                                                <div className="col-6"><button type="button" id='btn' className="btn btn-primary btn-xl" onClick={login}><span className='btn_cnts'>Sign in</span></button></div>
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

export default Login
