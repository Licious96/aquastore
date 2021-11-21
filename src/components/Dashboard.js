import React from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'

const Dashboard = () => {

    const navigate = new useNavigate()
    const user_id = sessionStorage.getItem('user_id')
    const [user, setUser] = useState([])
    const [species, setSpecies] = useState('')
    const [fins, setFins] = useState('')
    const [errors1, setErrors1] = useState([])
    const [errors2, setErrors2] = useState([])
    const [aquarium1, setAquarium1] = useState([])
    const [aquarium2, setAquarium2] = useState([])
    const [aquarium3, setAquarium3] = useState([])
    const [updateFishId, setUpdateFishId] = useState('')
    const [updateSpecies, setUpdateSpecies] = useState('')
    const [updateFins, setUpdateFins] = useState('')
    const [updateErrors1, setUpdateErrors1] = useState([])
    const [updateErrors2, setUpdateErrors2] = useState([])

    useEffect(() => {
        axios.get(`https://aquastore.stokoza.co.za/public/api/get_user/${user_id}`)
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data)
                }
            }).catch(err => {
                console.log(err)
            });
    }, [user_id])

    useEffect(() => {
        axios.get(`https://aquastore.stokoza.co.za/public/api/get_fish/1`)
            .then(res => {
                if (res.status === 200) {
                    setAquarium1(res.data)
                }
            }).catch(err => {
                console.log(err)
            });
    }, [])

    useEffect(() => {
        axios.get(`https://aquastore.stokoza.co.za/public/api/get_fish/2`)
            .then(res => {
                if (res.status === 200) {
                    setAquarium2(res.data)
                }
            }).catch(err => {
                console.log(err)
            });
    }, [])

    useEffect(() => {
        axios.get(`https://aquastore.stokoza.co.za/public/api/get_fish/3`)
            .then(res => {
                if (res.status === 200) {
                    setAquarium3(res.data)
                }
            }).catch(err => {
                console.log(err)
            });
    }, [])

    const logout = () => {
        sessionStorage.removeItem('user_id')
        navigate('/')
    }

    if (!sessionStorage.getItem('user_id')) {
        return <Navigate to="/" />
    }

    const add_fish = (id) => {
        document.getElementById('dmodal' + id).classList.add('modal-show')
    }

    const close_modal = (id) => {
        document.getElementById('dmodal' + id).classList.remove('modal-show')
    }

    const add = async (id) => {

        const formData = new FormData()
        formData.append('species', species)
        formData.append('fins', fins)

        try {
            const res = await axios.post(`https://aquastore.stokoza.co.za/public/api/add_fish/${id}`, formData)
            if (id === 1) {
                setAquarium1([res.data, ...aquarium1])
            }

            if (id === 2) {
                setAquarium2([res.data, ...aquarium2])
            }

            if (id === 3) {
                setAquarium3([res.data, ...aquarium3])
            }
            document.getElementById('dmodal' + id).classList.remove('modal-show')
        } catch (error) {
            setErrors1(error.response.data.errors)
            setErrors2(error.response.data)
        }
    }

    const edit = async (id, fish) => {
        setUpdateSpecies(fish.species)
        setUpdateFins(fish.fins)
        setUpdateFishId(fish.id)
        document.getElementById('aquarium'+id).classList.add('modal-show')
    }

    const remove = async(id, aq_id) => {
        try {
            await axios.delete(`https://aquastore.stokoza.co.za/public/api/remove/${id}`)
            if (aq_id === 1) {
                setAquarium1(aquarium1.filter(fish => fish.id !== id))
            }

            if (aq_id === 2) {
                setAquarium2(aquarium2.filter(fish => fish.id !== id))
            }

            if (aq_id === 3) {
                setAquarium3(aquarium3.filter(fish => fish.id !== id))
            }

        } catch (error) {
            
        }
    }

    const close_edit_modal = (id) => {
        document.getElementById('aquarium'+id).classList.remove('modal-show')
    }

    const edit_fish = async (aq_id) => {

        try {
            const formData = new FormData()
            formData.append('species', updateSpecies)
            formData.append('fins', updateFins)
            const res = await axios.post(`https://aquastore.stokoza.co.za/public/api/update_fish/${updateFishId}`, formData)
            const data = {
                id: res.data.id,
                aquarium_id: res.data.aquarium_id,
                species: res.data.species,
                fins: res.data.fins
            }
            if (aq_id === 1) {
                setAquarium1(aquarium1.map(item => item.id === updateFishId ? data: item))
            }

            if (aq_id === 2) {
                setAquarium2(aquarium2.map(item => item.id === updateFishId ? data: item))
            }

            if (aq_id === 3) {
                setAquarium3(aquarium3.map(item => item.id === updateFishId ? data: item))
            }
            document.getElementById('aquarium'+aq_id).classList.remove('modal-show')
        } catch (error) {
            setUpdateErrors1(error.response.data.errors)
            setUpdateErrors2(error.response.data)
        }
       
    }


    return (
        <div className="be-wrapper be-fixed-sidebar">
            <nav className="navbar navbar-expand fixed-top be-top-header">
                <div className="container-fluid">
                    <div className="be-navbar-header"><h1 className="page-title">AquaStore</h1></div>
                    <div className="be-right-navbar">
                        <ul className="nav navbar-nav float-right be-user-nav">
                            <li className="nav-item dropdown">
                                <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    <img src="assets/img/avatar.png" alt="Avatar" /><span className="user-name">{user.f_name} {user.l_name}</span>
                                </Link>
                                <div className="dropdown-menu" role="menu">
                                    <div className="user-info">
                                        <div className="user-name">{user.f_name} {user.l_name}</div>
                                        <div className="user-position online">Available</div>
                                    </div>
                                    <Link className="dropdown-item" to="#">
                                        <span className="icon mdi mdi-face"></span>Account
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                        <span className="icon mdi mdi-settings"></span>Settings
                                    </Link>
                                    <Link className="dropdown-item" to="#" onClick={logout}>
                                        <span className="icon mdi mdi-power"></span>Logout
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="main-content container-fluid">
                <div className="page-head">
                    <h2 className="page-head-title">Rules:</h2>
                    <nav aria-label="breadcrumb" role="navigation">
                        <ul>
                            <li>Fish with three fins or more don't go in aquariums of 75 litres or less.</li>
                            <li >Goldfish can't go in the same aquarium as guppy.</li>
                        </ul>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-lg-3 align-items-stretch">
                        <div className="card card-contrast ">
                            <div className="card-header card-header-contrast">AQUARIUM 1 (50L)
                                <span className="mdi mdi-plus-circle float-right pointer" onClick={() => { add_fish(1) }}></span>
                            </div>
                            <div className="card-body">
                                {
                                    (() => {
                                        if (aquarium1.length < 1) {
                                            return (
                                                <div className="text-center">
                                                    <div className="text-primary"><span className="modal-main-icon mdi mdi-info-outline"></span></div>
                                                    <h3>Aquarium empty</h3>
                                                    <p>Please add fish by clicking the plus icon in the header</p>
                                                </div>
                                            )

                                        } else {
                                            return (
                                                aquarium1.map(item => (
                                                    <div>
                                                        <div className="breadcrumb">
                                                            {item.species} ({item.fins} fins)
                                                            <div style={{ marginLeft: "auto" }}>
                                                                <span className="mdi mdi-edit mx-2 pointer" onClick={()=>{edit(1, item)}}></span>
                                                                <span className="mdi mdi-delete pointer" onClick={()=>{remove(item.id, 1)}}></span>
                                                            </div>
                                                        </div>
                                                        <div id="aquarium1" className="modal-container colored-header colored-header-success modal-effect-10">
                                                            <div className="modal-content">
                                                                <div className="modal-header modal-header-colored">
                                                                    <h3 className="modal-title">Edit fish: Aquarium 1</h3>
                                                                    <button className="close modal-close" type="button" onClick={() => { close_edit_modal(1) }}><span className="mdi mdi-close"></span></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <div className="form-group pt-2">
                                                                        <label htmlFor="inputEmail">Fish species</label>
                                                                        <input className="form-control" type="text" onChange={e => setUpdateSpecies(e.target.value)} defaultValue={updateSpecies} />
                                                                        {updateErrors1?.species ? <span className="text-danger">{updateErrors1.species}</span> : null}
                                                                        {updateErrors2?.msg400 ? <span className="text-danger">{updateErrors2.msg400}</span> : null}
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label for="">Number of fins</label>
                                                                        <input className="form-control" onChange={e => setUpdateFins(e.target.value)} type="number" defaultValue={updateFins} />
                                                                        {updateErrors1?.fins ? <span className="text-danger">{updateErrors1.fins}</span> : null}
                                                                        {updateErrors2?.msg401 ? <span className="text-danger">{updateErrors2.msg401}</span> : null}
                                                                    </div>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button className="btn btn-secondary modal-close" type="button" onClick={() => { close_edit_modal(1) }}>Cancel</button>
                                                                    <button className="btn btn-success modal-close" type="button" onClick={() => edit_fish(1)}>Proceed</button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))
                                            )
                                        }
                                    })()
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 align-items-stretch">
                        <div className="card card-contrast">
                            <div className="card-header card-header-contrast">AQUARIUM 2 (100L)
                                <span className="mdi mdi-plus-circle float-right pointer" onClick={() => { add_fish(2) }}></span>
                            </div>
                            <div className="card-body">
                            {
                                    (() => {
                                        if (aquarium2.length < 1) {
                                            return (
                                                <div className="text-center">
                                                    <div className="text-primary"><span className="modal-main-icon mdi mdi-info-outline"></span></div>
                                                    <h3>Aquarium empty</h3>
                                                    <p>Please add fish by clicking the plus icon in the header</p>
                                                </div>
                                            )

                                        } else {
                                            return (
                                                aquarium2.map(item => (
                                                    <div>
                                                        <div className="breadcrumb">
                                                            {item.species} ({item.fins} fins)
                                                            <div style={{ marginLeft: "auto" }}>
                                                                <span className="mdi mdi-edit mx-2 pointer" onClick={()=>{edit(2, item)}}></span>
                                                                <span className="mdi mdi-delete pointer" onClick={()=>{remove(item.id, 2)}}></span>
                                                            </div>
                                                        </div>
                                                        <div id="aquarium2" className="modal-container colored-header colored-header-success modal-effect-10">
                                                            <div className="modal-content">
                                                                <div className="modal-header modal-header-colored">
                                                                    <h3 className="modal-title">Edit fish: Aquarium 2</h3>
                                                                    <button className="close modal-close" type="button" onClick={() => { close_edit_modal(2) }}><span className="mdi mdi-close"></span></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <div className="form-group pt-2">
                                                                        <label htmlFor="inputEmail">Fish species</label>
                                                                        <input className="form-control" type="text" onChange={e => setUpdateSpecies(e.target.value)} defaultValue={updateSpecies} />
                                                                        {updateErrors1?.species ? <span className="text-danger">{updateErrors1.species}</span> : null}
                                                                        {updateErrors2?.msg400 ? <span className="text-danger">{updateErrors2.msg400}</span> : null}
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label for="">Number of fins</label>
                                                                        <input className="form-control" onChange={e => setUpdateFins(e.target.value)} type="number" defaultValue={updateFins} />
                                                                        {updateErrors1?.fins ? <span className="text-danger">{updateErrors1.fins}</span> : null}
                                                                        {updateErrors2?.msg401 ? <span className="text-danger">{updateErrors2.msg401}</span> : null}
                                                                    </div>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button className="btn btn-secondary modal-close" type="button" onClick={() => { close_edit_modal(2) }}>Cancel</button>
                                                                    <button className="btn btn-success modal-close" type="button" onClick={() => edit_fish(2)}>Proceed</button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))
                                            )
                                        }
                                    })()
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 align-items-stretch">
                        <div className="card card-contrast">
                            <div className="card-header card-header-contrast">AQUARIUM 3 (150L)
                                <span className="mdi mdi-plus-circle float-right pointer" onClick={() => { add_fish(3) }}></span>
                            </div>
                            <div className="card-body">
                            {
                                    (() => {
                                        if (aquarium3.length < 1) {
                                            return (
                                                <div className="text-center">
                                                    <div className="text-primary"><span className="modal-main-icon mdi mdi-info-outline"></span></div>
                                                    <h3>Aquarium empty</h3>
                                                    <p>Please add fish by clicking the plus icon in the header</p>
                                                </div>
                                            )

                                        } else {
                                            return (
                                                aquarium3.map(item => (
                                                    <div>
                                                        <div className="breadcrumb">
                                                            {item.species} ({item.fins} fins)
                                                            <div style={{ marginLeft: "auto" }}>
                                                                <span className="mdi mdi-edit mx-2 pointer" onClick={()=>{edit(3, item)}}></span>
                                                                <span className="mdi mdi-delete pointer" onClick={()=>{remove(item.id, 3)}}></span>
                                                            </div>
                                                        </div>
                                                        <div id="aquarium3" className="modal-container colored-header colored-header-success modal-effect-10">
                                                            <div className="modal-content">
                                                                <div className="modal-header modal-header-colored">
                                                                    <h3 className="modal-title">Edit fish: Aquarium 3</h3>
                                                                    <button className="close modal-close" type="button" onClick={() => { close_edit_modal(3) }}><span className="mdi mdi-close"></span></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <div className="form-group pt-2">
                                                                        <label htmlFor="inputEmail">Fish species</label>
                                                                        <input className="form-control" type="text" onChange={e => setUpdateSpecies(e.target.value)} defaultValue={updateSpecies} />
                                                                        {updateErrors1?.species ? <span className="text-danger">{updateErrors1.species}</span> : null}
                                                                        {updateErrors2?.msg400 ? <span className="text-danger">{updateErrors2.msg400}</span> : null}
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label for="">Number of fins</label>
                                                                        <input className="form-control" onChange={e => setUpdateFins(e.target.value)} type="number" defaultValue={updateFins} />
                                                                        {updateErrors1?.fins ? <span className="text-danger">{updateErrors1.fins}</span> : null}
                                                                        {updateErrors2?.msg401 ? <span className="text-danger">{updateErrors2.msg401}</span> : null}
                                                                    </div>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button className="btn btn-secondary modal-close" type="button" onClick={() => { close_edit_modal(3) }}>Cancel</button>
                                                                    <button className="btn btn-success modal-close" type="button" onClick={() => edit_fish(3)}>Proceed</button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))
                                            )
                                        }
                                    })()
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add fish modals */}
            <div id="dmodal1" className="modal-container colored-header colored-header-success modal-effect-10">
                <div className="modal-content">
                    <div className="modal-header modal-header-colored">
                        <h3 className="modal-title">Add fish: Aquarium 1</h3>
                        <button className="close modal-close" type="button" onClick={() => { close_modal(1) }}><span className="mdi mdi-close"></span></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group pt-2">
                            <label htmlFor="inputEmail">Fish species</label>
                            <input className="form-control" onChange={e => setSpecies(e.target.value)} type="text" placeholder="Species" />
                            {errors1?.species ? <span className="text-danger">{errors1.species}</span> : null}
                            {errors2?.msg401 ? <span className="text-danger">{errors2.msg401}</span> : null}
                        </div>
                        <div class="form-group">
                            <label for="">Number of fins</label>
                            <input className="form-control" onChange={e => setFins(e.target.value)} type="number" placeholder="Fins" />
                            {errors1?.fins ? <span className="text-danger">{errors1.fins}</span> : null}
                            {errors2?.msg400 ? <span className="text-danger">{errors2.msg400}</span> : null}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button className="btn btn-secondary modal-close" type="button" onClick={() => { close_modal(1) }}>Cancel</button>
                        <button className="btn btn-success modal-close" type="button" onClick={() => add(1)}>Proceed</button>
                    </div>
                </div>
            </div>

            <div id="dmodal2" className="modal-container colored-header colored-header-success modal-effect-10">
                <div className="modal-content">
                    <div className="modal-header modal-header-colored">
                        <h3 className="modal-title">Add fish: Aquarium 2</h3>
                        <button className="close modal-close" type="button" onClick={() => { close_modal(2) }}><span className="mdi mdi-close"></span></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group pt-2">
                            <label htmlFor="inputEmail">Fish species</label>
                            <input className="form-control" onChange={e => setSpecies(e.target.value)} type="text" placeholder="Species" />
                            {errors1?.species ? <span className="text-danger">{errors1.species}</span> : null}
                            {errors2?.msg401 ? <span className="text-danger">{errors2.msg401}</span> : null}
                        </div>
                        <div class="form-group">
                            <label for="">Number of fins</label>
                            <input className="form-control" onChange={e => setFins(e.target.value)} type="number" placeholder="Fins" />
                            {errors1?.fins ? <span className="text-danger">{errors1.fins}</span> : null}
                            {errors2?.msg400 ? <span className="text-danger">{errors2.msg400}</span> : null}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button className="btn btn-secondary modal-close" type="button" onClick={() => { close_modal(2) }}>Cancel</button>
                        <button className="btn btn-success modal-close" type="button" onClick={() => add(2)}>Proceed</button>
                    </div>
                </div>
            </div>

            <div id="dmodal3" className="modal-container colored-header colored-header-success modal-effect-10">
                <div className="modal-content">
                    <div className="modal-header modal-header-colored">
                        <h3 className="modal-title">Add fish: Aquarium 3</h3>
                        <button className="close modal-close" type="button" onClick={() => { close_modal(3) }}><span className="mdi mdi-close"></span></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group pt-2">
                            <label htmlFor="inputEmail">Fish species</label>
                            <input className="form-control" onChange={e => setSpecies(e.target.value)} type="text" placeholder="Species" />
                            {errors1?.species ? <span className="text-danger">{errors1.species}</span> : null}
                            {errors2?.msg401 ? <span className="text-danger">{errors2.msg401}</span> : null}
                        </div>
                        <div class="form-group">
                            <label for="">Number of fins</label>
                            <input className="form-control" onChange={e => setFins(e.target.value)} type="number" placeholder="Fins" />
                            {errors1?.fins ? <span className="text-danger">{errors1.fins}</span> : null}
                            {errors2?.msg400 ? <span className="text-danger">{errors2.msg400}</span> : null}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button className="btn btn-secondary modal-close" type="button" onClick={() => { close_modal(3) }}>Cancel</button>
                        <button className="btn btn-success modal-close" type="button" onClick={() => add(3)}>Proceed</button>
                    </div>
                </div>
            </div>
             {/* End of add fish modals */}

        </div>

    )
}

export default Dashboard
