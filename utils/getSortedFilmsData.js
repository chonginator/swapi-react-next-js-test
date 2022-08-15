import { baseURL } from "../constants";

export async function getSortedFilmsData() {
    const res = await fetch(baseURL);
    const data = await res.json();

    const sortedData = await data.result.sort((filmA, filmB) => {
        console.log(`film A: ${filmA}, film B: ${filmB}`);
        return filmA.properties.episode_id - filmB.properties.episode_id;
    });

    return sortedData;
}