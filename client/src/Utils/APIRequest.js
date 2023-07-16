import axios from "axios";

export const baseURL = "http://localhost:5000";


export const postRequest = async (url, body) => {
    try {
        const res = await axios(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: body,
        });

        if (!res.data) {
            return { error: true, message: "No Data" };
        }

        return res.data;
    } catch (err) {
        let message;

        if (err.response.data?.message) {
            message = err.response.data.message;
        } else {
            message = err.message;
        }

        return { error: true, message, status: err.response?.status };
    }
};

export const getRequest = async (url, params, token) => {
    try {
            const res = await axios(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                params: params,
            });
        
            if (!res || !res.data) {
                return { error: true, message: "An error occurred..." };
            }

            return res.data;
        } catch (err) {
            let message;

            if (err.response.data?.message) {
                message = err.response.data.message;
            } else {
                message = err.message;
            }

            return { error: true, message, status: err.response?.status };
        }
};

export const deleteRequest = async (url, body) => {
    try {
        const res = await axios.delete(url, {
            headers: {
                "Content-Type": "application/json",
            },
            data: body,
        });

        if (!res.data) {
            return { error: true, message: "Error..." };
        }

        return res.data;
    } catch (err) {
        let message;

        if (err.response.data?.message) {
            message = err.response.data.message;
        } else {
            message = err.message;
        }

        return { error: true, message, status: err.response?.status };
    }
};


export const putRequest = async (url, data) => {
    try {
        const res = await axios(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            data
        });

        if (!res.data) {
            return { error: true, message: "Error..." };
        }

        return res.data;
    } catch (err) {
        let message;

        if (err.response.data?.message) {
            message = err.response.data.message;
        } else {
            message = err.message;
        }

        return { error: true, message, status: err.response?.status };
    }
};
