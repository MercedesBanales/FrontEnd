class Fetch {
    public static async get(url: string, headers: Headers): Promise<any> {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });
            const data = await response.json();
            if (!response.ok) throw {status: response.status, message: data.message};
            return data;
        } catch (err: any) {
            throw {status: err.status || 500, message: err.message};
        }
    }

    public static async post(url: string, body: any, headers?: Headers): Promise<any> {
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: body,
                headers: headers
            });
            const data = await response.json();
            if (!response.ok) throw {status: response.status, message: data.message};
            return data;
        } catch (err: any) {
            throw {status: err.status || 500, message: err.message};
        } 
    }

    public static async put(url: string, headers: Headers, body?: any): Promise<any> {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: body,
                headers: headers
            });
            const data = await response.json();
            if (!response.ok) throw {status: response.status, message: data.message};
            return data;
        } catch (err: any) {
            throw {status: err.status || 500, message: err.message};
        }
    }
}

export default Fetch;