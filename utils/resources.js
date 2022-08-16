export async function getResources(URLs) {
    const requests = URLs.map(url => fetch(url));
    const resourcesRes = await Promise.all(requests);
    const resourcesJSON = await Promise.all(
        resourcesRes.map(res => res.json())
    );
    const resourcesData = await Promise.all(
        resourcesJSON.map(json => json.result)
    );

    return resourcesData;
}