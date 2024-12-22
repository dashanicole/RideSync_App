const hostname = window.location.hostname;
console.log("hostname",hostname)

export const BASEURL = `http://${hostname}:8000/api/users`;
export const BASEURLDrivers = `http://${hostname}:8000/api/drivers`;
export const SocketUrl = `http://${hostname}:8000` // your backend url 

// export const BASEURL = `https://05f9-131-226-110-74.ngrok-free.app/api/users`;
// export const BASEURLDrivers = `https://05f9-131-226-110-74.ngrok-free.app/api/drivers`;
//https://ridesync-backend.onrender.com/

// export const BASEURL = `https://ridesync-backend.onrender.com/api/users`;
// export const BASEURLDrivers = `https://ridesync-backend.onrender.com/api/drivers`;

export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body
    })

    console.log(body);


    const data = await response.json();

    if (!response.ok) {
        let message;

        if (data?.message) message = data.message
        else message = data


        return {
            error: true,
            message
        }
    }
    return data

}


export const updateRequest = async (url, body) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body
    })
    console.log(body);
    const data = await response.json();

    if (!response.ok) {
        let message;

        if (data?.message) message = data.message
        else message = data


        return {
            error: true,
            message
        }
    }
    return data

}

export const getRequest = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body
    })

    console.log(body);


    const data = await response.json();

    if (!response.ok) {
        let message;

        if (data?.message) message = data.message
        else message = data


        return {
            error: true,
            message
        }
    }
    return data

}