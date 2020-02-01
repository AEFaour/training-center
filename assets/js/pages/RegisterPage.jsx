import React, {useState} from "react";
import {Link} from "react-router-dom";
import Field from "../components/forms/Field";
import usersAPI from "../services/usersAPI";
import {Button, FormControl, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


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
    link: {
        color: 'white',
    }
}));

const RegisterPage = ({ history }) => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const [errors, seErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value})
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const apiErrors = {};

        if(user.password !== user.passwordConfirm){
            apiErrors.passwordConfirm = "Veuillez intégrer le même mot de passe orginale";
            seErrors(apiErrors);
            return ;
        }
        try {
            await usersAPI.register(user);
            seErrors({});
            history.replace("/login");
        } catch (error) {
            const {violations} = error.response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                seErrors(apiErrors);
            }
        }

    };

    const classes = useStyles();

    return (
        <>
            <Typography variant="h3" align="center" color="error">Inscription</Typography>
            <form onSubmit={handleSubmit}>
                <Field name="firstName" label="Prénom" error={errors.firstName} value={user.firstName}
                       onChange={handleChange}/>
                <Field name="lastName" label="Nom" error={errors.lastName} value={user.lastName}
                       onChange={handleChange}/>
                <Field name="email" label="Email" error={errors.email} type="email" value={user.email}
                       onChange={handleChange}/>
                <Field name="password" label="Mot de Passe" error={errors.password} type="password"
                       value={user.password} onChange={handleChange}/>
                <Field name="passwordConfirm" label="Confirmation de Mot de Passe" error={errors.passwordConfirm}
                       type="password" value={user.passwordConfirm} onChange={handleChange}/>
                <Grid item xs={12}>
                    <FormControl fullWidth={true} margin="dense">
                        <Button type="submit" className={classes.btn} variant="contained" color="secondary">
                            S'inscrire
                        </Button>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth={true} margin="dense">
                        <Button type="submit" className={classes.btn} variant="contained" color="secondary">
                            <Link to="/login" className={classes.link}>
                                Retour à la Page de Connexion
                            </Link>
                        </Button>
                    </FormControl>
                </Grid>
            </form>
        </>
    )
};

export default RegisterPage;