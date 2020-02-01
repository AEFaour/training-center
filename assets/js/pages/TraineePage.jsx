import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import traineesAPI from "../services/traineesAPI";
import Field from "../components/forms/Field";
import {Button, FormControl, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {toast} from "react-toastify";
import FormLoader from "../components/loaders/FormLoader";


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
    const [loading, setLoading] = useState(false);

    const fetchTrainee = async id => {
        try {
            const {firstName, lastName, email, company} = await traineesAPI.findOne(id);

            setTrainee({firstName, lastName, email, company});
            setLoading(false);
        } catch (error) {
            toast.error("impossible de charger le stagiaire");
            console.log(error.response);
            history.replace("/trainees");
        }
    }

    useEffect(() => {
        if (id !== "new") {
            setLoading(true);
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
            setErrors({});
            if (editing) {
                await traineesAPI.edit(id, trainee);
                toast.success("Le stagiaire est bien mise à jour");
            } else {
                await traineesAPI.add(trainee);
                toast.success("La stagiaire est bien ajouté");

                history.replace("/trainees");
            }

        } catch ({response}) {
            const { violations } = response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                toast.error("il y a des erreurs dans votre formulaire!");
            }
        }

    };

    const classes = useStyles();
    return (<>
            {!editing && <Typography variant="h3" align="center" color="error">Création d'un stagiaire</Typography> ||
            <Typography variant="h3" align="center" color="error">Modification d'un stagiaire</Typography>}
            {loading && <FormLoader/>}
            {!loading && <form className={classes.root} onSubmit={handleSubmit}>
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
            </form>}
        </>
    )
};

export default TraineePage;