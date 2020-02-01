import React, {useEffect, useState} from "react";
import axios from "axios";
import traineesAPI from "../services/traineesAPI";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import {Button, Grid, InputLabel, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import {Link} from "react-router-dom";
import invoicesAPI from "../services/invoicesAPI";
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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const InvoicePage = ({history, match}) => {

    const { id = "new"} = match.params;

    const [invoice, setInvoice] = useState({
        amount: "",
        trainee: "",
        status: "SENT",
    });

    const [trainees, setTrainees] = useState([]);

    const [errors, setErrors] = useState({
        amount: "",
        trainee: "",
        status: "",
    });

    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchTrainees = async () => {
        try {
            const data = await traineesAPI.findAll();
            setTrainees(data);
            setLoading(false);

            if(!invoice.trainee) setInvoice({...invoice, trainee: data[0].id});
        } catch (error) {
            toast.error("impossible de charger les stagiaires");
            history.replace("/invoices");
        }
    };

    const fetchInvoice = async id => {
        try{
            const { amount, status, trainee} = await invoicesAPI.findOne(id);

            setInvoice({amount, status, trainee: trainee.id});
            setLoading(false);
        } catch (error) {
            toast.error("impossible de charger la facture");
            history.replace("/invoices");
        }
    }

    useEffect(() => {
        fetchTrainees();
    }, []);

    useEffect(() => {
        if(id !== "new") {
            setEditing(true);
            fetchInvoice(id);
        }
    }, [id]);

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setInvoice({...invoice, [name]: value});
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try {

            if(editing){
                await invoicesAPI.edit(id, invoice);
                toast.success("La facture est bien mise à jour");
                history.replace("/invoices");

            } else {
                await invoicesAPI.add(invoice);
                toast.success("La facture est bien ajouté");
                history.replace("/invoices");
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
            {!editing && <Typography variant="h3" align="center" color="error">Création d'une Facture</Typography> ||
            <Typography variant="h3" align="center" color="error">Modification d'une Facture</Typography>}
            {loading && <FormLoader/>}
            {!loading && <form onSubmit={handleSubmit}>
                <Field name="amount" type="number" label="Montant de la Facture" onChange={handleChange}
                       value={invoice.amount} error={errors.amount}/>

                <Select name="trainee" label="Stagiaire" value={invoice.trainee} error={errors.trainee}
                        onChange={handleChange}>

                    {trainees.map(trainee => <option key={trainee.id}
                                                     value={trainee.id}>{trainee.firstName} {trainee.lastName}</option>)}

                </Select>

                <Select name="status" label="Status" value={invoice.status} error={errors.status}
                        onChange={handleChange}>
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>

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
                            <Link to="/invoices" className={classes.link}>
                                Retour à la liste des Factures
                            </Link>
                        </Button>
                    </FormControl>
                </Grid>
            </form>}
        </>
    );
};

export default InvoicePage;