import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { signin } from '../actions/auth';
import userAuth from '../auth/userAuth';
import routes from '../helpers/routes';

const userCredentials = { email: '', password: '' };

export default function LoginPage() {
    const [formData, setformData] = useState(userCredentials);

    const dispatch = useDispatch();

    const location = useLocation();

    const { login } = userAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(signin(formData));
        login(formData, location?.pathname);
    };

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png"
                            className="img-fluid" alt="Sample"></img>
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            <div className="form-outline mb-4">
                                <label className="form-label" >Email address</label>
                                <input type="email" name="email" className="form-control form-control-lg"
                                    placeholder="Enter a valid email address" onChange={(e) => setformData({ ...formData, email: e.target.value })} />
                            </div>
                            <div className="form-outline mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" name="password" className="form-control form-control-lg"
                                    placeholder="Enter password" onChange={(e) => setformData({ ...formData, password: e.target.value })} />
                            </div>
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>Login</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link
                                    className="link-danger" as={Link} to={routes.register}>Register</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
