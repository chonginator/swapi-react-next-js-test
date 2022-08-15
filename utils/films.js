import { baseURL } from "../constants";

async function getFilmsData() {
    const res = await fetch(baseURL);
    const data = await res.json();

    return data.result;
}

export async function getFilmData(uid) {
    const res = await fetch(`${baseURL}/${uid}`);
    const data = await res.json();

    return data.result;
}

export async function getSortedFilmsData() {
    const filmsData = await getFilmsData();
    return filmsData.sort((filmA, filmB) => {
        return filmA.properties.episode_id - filmB.properties.episode_id;
    });
}

export async function getAllFilmIds() {
    const filmsData = await getFilmsData();
    return filmsData.map(film => {
        return {
            params: {
                uid: film.uid.toString(),
            },
        }
    });
}