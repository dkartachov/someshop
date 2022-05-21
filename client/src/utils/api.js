export const all = async (endpoint) => {
    const res = await fetch(`/api/${endpoint}`, {
        method: 'GET',
    });

    const data = res.json();

    return data;
}

export const create = async (endpoint, body) => {
    const res = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    
    if (res.status !== 200) throw Error(`Error creating ${endpoint.slice(0, -1)}`);
}

export const deleteOne = async (endpoint, id) => {
    const res = await fetch(`/api/${endpoint}/${id}`, {
        method: 'DELETE',
    });

    if (res.status !== 200) throw Error(`Error deleting ${endpoint.slice(0, -1)}`);
}