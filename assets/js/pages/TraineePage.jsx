import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import TraineeAPI from "../services/traineesAPI";


const TraineePage = props => {

    const [trainees, setTrainees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    const fetchTrainees = async () => {
        try {
            const data = await TraineeAPI.findAll();
            setTrainees(data);
        } catch (error) {
            console.log(error.response);
        }
    }
    useEffect( () => {fetchTrainees()}, []);

    const handleDelete = async id => {
        const originalTrainees = [...trainees];

        setTrainees(trainees.filter(trainee => trainee.id !== id))

        try {
            await TraineeAPI.delete(id)
        } catch (error) {
            setTrainees(originalTrainees);
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
            <h1 className="text-center text-danger">Liste des Stagiaires</h1>
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
                <tbody>
                {paginatedTrainees.map(trainee =>
                    <tr key={trainee.id}>
                        <td>{trainee.id}</td>
                        <td>
                            <a href="#">{trainee.firstName} {trainee.lastName}</a>
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
                    </tr>)}
                </tbody>
            </table>
            {itemsPerPage < filteredTrainees.length && <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredTrainees.length}
                onPageChanged={handlePageChange}
            />}
        </>
    );
}

export default TraineePage;