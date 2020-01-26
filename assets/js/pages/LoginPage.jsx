import React, {useContext, useState} from "react";
import authAPI from "../services/authAPI";
import {withStyles, makeStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";
import {FormControl} from '@material-ui/core';
import {Input} from '@material-ui/core';
import {InputLabel} from '@material-ui/core';
import {Button} from '@material-ui/core';
import {Grid} from '@material-ui/core';
import AuthContext from "../contexts/AuthContext";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        align: 'center',
    },
    btn: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
const LoginPage = ({history}) => {
    const {setIsAuthenticated} = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = ({currentTarget}) => {
        const {value, name} =  currentTarget;
        setCredentials({...credentials, [name]: value});
    };

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(credentials);
        try {
           await authAPI.authenticate(credentials);
           setError("");
            setIsAuthenticated(true);
           history.replace("/trainees");
        } catch (error) {
            setError("Aucun compte possède cette email ou les informations ne correspondent pas !");
        }
    }

    const classes = useStyles();

    return (
        <>
            <Typography variant="h3" align="center" color="error">Connexion à l'application</Typography>
            <form className={classes.root} onSubmit={handleSubmit}>
                <Grid item xs={12}>
                    <FormControl fullWidth={true} margin="dense">
                        <InputLabel htmlFor="username">Email</InputLabel>
                        <Input
                            type="email"
                            name="username"
                            id="username"
                            aria-describedby="my-helper-text"
                            value={credentials.username}
                            onChange={handleChange}
                            className={(error && "is-invalid")}
                        />
                        {error && <p className="invalid-feedback">{error}</p>}
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth={true} margin="dense">
                        <InputLabel htmlFor="password">Mot de Passe</InputLabel>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            aria-describedby="my-helper-text"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth={true} margin="dense">
                        <Button type="submit" className={classes.btn} variant="contained" color="secondary">
                            Se connecter
                        </Button>
                    </FormControl>
                </Grid>
            </form>
        </>
    );
};

export default LoginPage;