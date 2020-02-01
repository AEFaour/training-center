import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import moment from "moment";
import {Link} from "react-router-dom";
import invoicesAPI from "../services/invoicesAPI";
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Card, Fab} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import CardContent from "@material-ui/core/CardContent";


const STATUS_LABELS = {

    PAID : 'Payée',
    SENT : 'Envoyée',
    CANCELLED : 'Annulée',
}

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: 'red',
        color: theme.palette.common.white,
        align: 'center',
    },
    body: {
        fontSize: 14,
        align: 'center',
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    link: {
        color: 'white',
    },
    card: {
        display: 'flex',
        align: 'center',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '5 0 auto',
    },
});

const InvoicesPage = (props) => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    const fetchInvoices = async () => {
        try {
            const data = await invoicesAPI.findAll();
            setInvoices(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);
    const handlePageChange = page => setCurrentPage(page);

    const handleDelete = async id => {
        const orginalInvoices = [...invoices];

        setInvoices(invoices.filter(invoice => invoice.id !== id))
        try {
            await invoicesAPI.delete(id);
            
        } catch (error) {
            console.log(error.response);
            setInvoices(orginalInvoices);
        }
    }

    const itemsPerPage = 40;

    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }


    const filteredInvoices = invoices.filter(
        i =>
            i.trainee.firstName.toLowerCase().includes(search.toLowerCase()) ||
            i.trainee.lastName.toLowerCase().includes(search.toLowerCase()) ||
            i.amount.toString().startsWith(search.toLowerCase()) ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    );

    const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage);

    const formatDate = (strart) => moment(strart).format('DD/MM/YYYY');
    const classes = useStyles();
    return (
        <>
            <Card className={classes.card}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="h3" align="center" color="error">Liste des factures</Typography>
                    </CardContent>
                </div>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Link to="/invoices/new">
                            <Button className={classes.root} variant="contained" color="secondary" >
                                Créer une Facture
                            </Button>

                        </Link>
                    </CardContent>
                </div>

            </Card>

            <FormControl>
                <InputLabel htmlFor="my-input">Rechercher</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" onChange={handleSearch}
                       value={search} />
            </FormControl>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow color="error">
                            <StyledTableCell>Code</StyledTableCell>
                            <StyledTableCell align="right">
                                <Link to="/trainees/id" className={classes.link}>Stagiaire</Link>
                            </StyledTableCell>
                            <StyledTableCell align="right">Date d'envoi</StyledTableCell>
                            <StyledTableCell align="right">Statut</StyledTableCell>
                            <StyledTableCell align="right">Montant</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedInvoices.map(invoice => (
                            <StyledTableRow key={invoice.id}>
                                <StyledTableCell component="th">
                                    {invoice.chrono}
                                </StyledTableCell>
                                <StyledTableCell align="right">{invoice.trainee.firstName} {invoice.trainee.lastName}</StyledTableCell>
                                <StyledTableCell align="right">{formatDate(invoice.sentAt)}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Fab color="primary" variant="extended">
                                        {STATUS_LABELS[invoice.status]}
                                    </Fab>
                                </StyledTableCell>
                                <StyledTableCell align="right">{invoice.amount.toLocaleString()}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Link to={"/invoices/" + invoice.id}>
                                        <Button className={classes.root} variant="contained" color="primary">
                                            Editer
                                        </Button>
                                    </Link>
                                    <Button className={classes.root} variant="contained" color="secondary" onClick={() => handleDelete(invoice.id)}>
                                        Supprimer
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredInvoices.length}
                onPageChanged={handlePageChange}
            />
        </>
    );
};

export default InvoicesPage;