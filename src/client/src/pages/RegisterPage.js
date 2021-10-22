import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import routes from "../helpers/routes";
import { signup } from '../actions/auth';


export default function RegisterPage() {
    const [formData, setformData] = useState({})

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(signup(formData));
    };

    return (
        <>
            <section className="vh-100" >
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" >
                            <div className="row justify-content-center">
                                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                    <h1 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</h1>
                                    <form className="mx-1 mx-md-4">
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                            <div className="form-outline flex-fill mb-0" >
                                                <label className="form-label" >Name</label>
                                                <input type="text" placeholder="Type your name" autoComplete="new-name" className="form-control"
                                                    onChange={(e) => setformData({ ...formData, name: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label" >Email</label>
                                                <input type="email" placeholder="Type your email" autoComplete="new-email" className="form-control"
                                                    onChange={(e) => setformData({ ...formData, email: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label" >Password</label>
                                                <input type="password" placeholder="Type password" className="form-control"
                                                    onChange={(e) => setformData({ ...formData, password: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label">Confirm Password</label>
                                                <input type="password" placeholder="Repeat password" className="form-control"
                                                    onChange={(e) => setformData({ ...formData, confirmPassword: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button type="button" className="btn btn-primary btn-lg"
                                                as={Link} onClick={handleSubmit}>Register</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                    <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png" className="img-fluid" alt="register" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
