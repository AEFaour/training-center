import axios from "axios";

function add(invoice) {
    return axios.post(
        "http://127.0.0.1:8000/api/invoices",
        {...invoice, trainee: `/api/trainees/${invoice.trainee}`
        });
}

function edit(id, invoice) {

    return axios.put(
        "http://127.0.0.1:8000/api/invoices/" + id,
        {...invoice, trainee: `/api/trainees/${invoice.trainee}`
        });
}

function findAll() {
    return  axios.get(
        "http://127.0.0.1:8000/api/invoices")
        .then(response => response.data['hydra:member']
        );
}

function findOne(id) {

    return axios.get(
        "http://127.0.0.1:8000/api/invoices/" + id
    )
        .then(response => response.data);
}

function deleteInvoice(id){
    return  axios.delete(
        "http://127.0.0.1:8000/api/invoices/" + id);
}

export default {
    add,
    edit,
    findAll,
    findOne,
    delete : deleteInvoice
};