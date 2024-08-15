class Fetch {
    public static async get(url: string, head: Headers): Promise<any> {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: head
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            return data;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    public static async post(url: string, head: Headers,  params: any): Promise<any> {
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: params,
                headers: head
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            return data;
        } catch (error: any) {
            throw new Error(error.message);  
        }
        
    }

    public static async put(url: string, head: Headers, params: any): Promise<any> {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: params,
                headers: head
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            return data;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}

export default Fetch;