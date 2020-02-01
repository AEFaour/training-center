import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import TraineeAPI from "../services/traineesAPI";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";


const TraineesPage = props => {

    const [trainees, setTrainees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchTrainees = async () => {
        try {
            const data = await TraineeAPI.findAll();
            setTrainees(data);
            setLoading(false);
        } catch (error) {
            toast.error("impossible de charger les stagiaires");
        }
    }
    useEffect(() => {
        fetchTrainees()
    }, []);

    const handleDelete = async id => {
        const originalTrainees = [...trainees];

        setTrainees(trainees.filter(trainee => trainee.id !== id))

        try {
            await TraineeAPI.delete(id);
            toast.success("Le stagiaire est bien supprimé");
        } catch (error) {
            setTrainees(originalTrainees);
            toast.error("impossible de supprimer le stagiaire");
            console.log(error.response)
        }
    };

    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    const handlePageChange = page => setCurrentPage(page);

    const itemsPerPage = 20;

    const filteredTrainees = trainees.filter(
        t =>
            t.firstName.toLowerCase().includes(search.toLowerCase()) ||
            t.lastName.toLowerCase().includes(search.toLowerCase()) ||
            t.email.toLowerCase().includes(search.toLowerCase()) ||
            (t.company && t.company.toLowerCase().includes(search.toLowerCase()))
    );

    const paginatedTrainees = Pagination.getData(filteredTrainees, currentPage, itemsPerPage);

    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1 className="text-center text-danger">Liste des Stagiaires</h1>
                <Link to="/trainees/new" className="btn btn-danger">Créer un stagiaire</Link>
            </div>

            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher ..."
                    onChange={handleSearch}
                    value={search}
                />
            </div>
            <table className="table table-hover text-center">
                <thead>
                <tr>
                    <th>Id.</th>
                    <th>Stagiaire</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th>Factures</th>
                    <th>Montant total</th>
                    <th/>
                </tr>
                </thead>
                {!loading && <tbody>
                {paginatedTrainees.map(trainee =>
                    (<tr key={trainee.id}>
                        <td>{trainee.id}</td>
                        <td>
                            <Link to={"/trainees/" + trainee.id}>{trainee.firstName} {trainee.lastName}</Link>
                        </td>
                        <td>{trainee.email}</td>
                        <td>{trainee.company}</td>
                        <td>
                        <span className="badge badge-danger">
                            {trainee.invoices.length}
                        </span></td>
                        <td>{trainee.totalAmount.toLocaleString()}</td>
                        <td>
                            <button
                                onClick={() => handleDelete(trainee.id)}
                                disabled={trainee.invoices.length > 0}
                                className="btn btn-sm btn-danger">
                                Supprimer
                            </button>
                        </td>
                    </tr>))}
                </tbody>}
            </table>

            {loading && <TableLoader/>}

            {itemsPerPage < filteredTrainees.length && <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredTrainees.length}
                onPageChanged={handlePageChange}
            />}
        </>
    );
}

export default TraineesPage;