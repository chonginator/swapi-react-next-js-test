export async function getResources(URLs) {
    const requests = URLs.map(url => fetch(url));
    const resourcesRes = await Promise.allSettled(requests);
    const resourcesJSON = await Promise.all(
        resourcesRes
            .filter(outcome => outcome.status === 'fulfilled')
            .map(outcome => {
                try {
                    return outcome.value.json()
                } catch(e) {
                    console.error(e)
                }
            })
    );
    // const resourcesJSON = await Promise.all(
    //     resourcesRes.map(res => res.json())
    // );
    // console.info(resourcesRes);
    console.info(resourcesJSON);
    const resourcesData = await Promise.all(
        resourcesJSON.map(json => json.result)
    );

    return resourcesData;
}