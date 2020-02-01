import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import traineesAPI from "../services/traineesAPI";
import Field from "../components/forms/Field";
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

const TraineePage = ({match, history}) => {

    const {id = "new"} = match.params;

    if (id !== "new") {
        console.log(+id);
    }

    const [trainee, setTrainee] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const [editing, setEditing] = useState(false);

    const fetchTrainee = async id => {
        try {
            const {firstName, lastName, email, company} = await traineesAPI.findOne(id);

            setTrainee({firstName, lastName, email, company});
        } catch (error) {
            console.log(error.response);
            history.replace("/trainees");
        }
    }

    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchTrainee(id);
        }
    }, [id]);

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setTrainee({...trainee, [name]: value})
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            if (editing) {
                await traineesAPI.edit(id, trainee);
            } else {
                await traineesAPI.add(trainee);


                history.replace("/trainees");
            }
            setErrors({});
        } catch ({response}) {
            const { violations } = response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
        }

    };

    const classes = useStyles();
    return (<>
            {!editing && <Typography variant="h3" align="center" color="error">Création d'un stagiaire</Typography> ||
            <Typography variant="h3" align="center" color="error">Modification d'un stagiaire</Typography>}
            <form className={classes.root} onSubmit={handleSubmit}>
                <Field name="lastName" label="Nom du Stagiaire" value={trainee.lastName} onChange={handleChange}
                       error={errors.lastName}/>
                <Field name="firstName" label="Prénom du Stagiaire" value={trainee.firstName} onChange={handleChange}
                       error={errors.firstName}/>
                <Field name="email" label="Email du Stagiaire" type="email" value={trainee.email}
                       onChange={handleChange} error={errors.email}/>
                <Field name="company" label="Entreprise du Stagiaire" value={trainee.company} onChange={handleChange}
                       error={errors.company}/>

                <Grid item xs={12}>
                    <FormControl fullWidth={true} margin="dense">
                        <Button type="submit" className={classes.btn} variant="contained" color="secondary">
                            Enregistrer
                        </Button>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth={true} margin="dense">
                        <Button type="submit" className={classes.btn} variant="contained" color="secondary">
                            <Link to="/trainees" className={classes.link}>
                                Retour à la liste des stagiaires
                            </Link>
                        </Button>
                    </FormControl>
                </Grid>
            </form>
        </>
    )
};

export default TraineePage;