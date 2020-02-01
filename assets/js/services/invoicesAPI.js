import axios from "axios";
import {INVOICES_API} from "../config";

function add(invoice) {
    return axios.post(
        INVOICES_API,
        {...invoice, trainee: `/api/trainees/${invoice.trainee}`
        });
}

function edit(id, invoice) {

    return axios.put(
        INVOICES_API + "/" + id,
        {...invoice, trainee: `/api/trainees/${invoice.trainee}`
        });
}

function findAll() {
    return  axios.get(INVOICES_API)
        .then(response => response.data['hydra:member']
        );
}

function findOne(id) {

    return axios.get(INVOICES_API + "/" + id)
        .then(response => response.data);
}

function deleteInvoice(id){
    return  axios.delete(INVOICES_API + "/" + id);
}

export default {
    add,
    edit,
    findAll,
    findOne,
    delete : deleteInvoice
};