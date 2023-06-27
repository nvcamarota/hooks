export const UseFetch = async (reqURL, method = 'get', data, token = "") => {

    const url = reqURL;
    let response;

    try {
        if (method === 'get') {
            response = await fetch(url)
        }
        if (method === 'post' || method === 'patch') {
            response = await fetch(url, {
                method: method,
                body: data,
                headers: {
                    Authorization: token
                }
            })
        }
        if (method === 'delete') {
            response = await fetch(url, {
                method,
                headers: {
                    Authorization: token
                }
            })
        }
        let result = await response.json();
        return result;

    } catch (error) {

    }
}
