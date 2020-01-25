import axios from "axios";

function findAll() {
    return  axios.get(
        "http://127.0.0.1:8000/api/trainees")
        .then(response => response.data['hydra:member']);
}

function deleteTrainee(id){
    return  axios.delete(
        "http://127.0.0.1:8000/api/trainees/" + id);

}

export default {
    findAll,
    delete : deleteTrainee
};