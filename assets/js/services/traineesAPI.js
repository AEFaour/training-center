import axios from "axios";
import Cache from "./cache";
import { TRAINEES_API } from "../config";

function add(trainee) {
    return axios.post(TRAINEES_API, trainee).then(
        async res => {
            const cachedTrainees = await Cache.get("trainees");

            if(cachedTrainees){
                Cache.set("trainees", [...trainee, res.data]);
            }
            return res;
        }
    );
}

function edit(id, trainee) {
    return axios.put(TRAINEES_API + "/" + id, trainee).then(
        async res => {
            const cachedTrainees = await Cache.get("trainees");
            const cachedTrainee = await Cache.get("trainee.s" + id);

            const newCachedTrainee = res.data;

            if(cachedTrainee){

                Cache.set("trainees." +id, res.data );
            }

            if(cachedTrainees){
                const index = cachedTrainees.findIndex(t => t.id === +id);

                cachedTrainees[index] = newCachedTrainee;

                Cache.set("trainees", cachedTrainees);
            }
            return res;
        }
    );
}

async function findAll() {

    const cachedTrainees = await Cache.get("trainees");

    if(cachedTrainees) return cachedTrainees;

    return axios.get(TRAINEES_API)
        .then(response => {
            const trainees = response.data['hydra:member'];
            Cache.set("trainees", trainees);
            return trainees;
        });
}

async function findOne(id) {
    const cachedTrainees = await Cache.get("trainees." + id);

    if(cachedTrainees) return cachedTrainees;

    return axios.get(TRAINEES_API + "/" + id)
        .then(res=> {
            Cache.set("trainees." + id, res.data);

            return res.data;
        });
}

function deleteTrainee(id) {
    return axios.delete(TRAINEES_API + "/" + id)
        .then(async response => {
            const cachedTrainees = await Cache.get("trainees");

            if(cachedTrainees){
                Cache.set("trainees", cachedTrainees.filter(t => t.id !== id));
            }
            return response;
        });

}

export default {
    add,
    edit,
    findAll,
    findOne,
    delete: deleteTrainee
};