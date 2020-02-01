import axios from "axios";

function add(trainee) {
    return axios.post(
        "http://127.0.0.1:8000/api/trainees", trainee);
}

function edit(id, trainee) {
    return axios.put(
        "http://127.0.0.1:8000/api/trainees/" + id, trainee);
}


function findAll() {
    return axios.get(
        "http://127.0.0.1:8000/api/trainees")
        .then(response => response.data['hydra:member']);
}

function findOne(id) {
    return axios.get(
        "http://127.0.0.1:8000/api/trainees/" + id)
        .then(response => response.data);
}

function deleteTrainee(id) {
    return axios.delete(
        "http://127.0.0.1:8000/api/trainees/" + id);

}

export default {
    add,
    edit,
    findAll,
    findOne,
    delete: deleteTrainee
};