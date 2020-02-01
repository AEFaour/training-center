import React, {useContext} from 'react';
import authAPI from "../services/authAPI";
import {NavLink} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import {toast} from "react-toastify";

const Navbar = ({history}) => {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const handleLogout =() => {
        authAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes déconnecté dès maintenant");
        history.push("/login");
    }
    return (<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <NavLink className="navbar-brand" to="/">Centre de Formations</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/trainees">Stagiaires</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                {(!isAuthenticated && (
                    <>
                        <li className="nav-item">
                            <NavLink to="/register" className="nav-link">Inscription</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-link btn btn-danger">Connexion ! </NavLink>
                        </li>
                    </>
                )) ||
                (
                    <li className="nav-item">
                        <button onClick={handleLogout} className="nav-link btn btn-danger">Déconnexion ! </button>
                    </li>
                )}
            </ul>
        </div>
    </nav>);
}

export default Navbar;