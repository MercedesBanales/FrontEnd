class Fetch {
    public static async get(url: string): Promise<any> {
        const response = await fetch(url);
        return response.json();
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

    public static async put(url: string, data: any): Promise<any> {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }

    public static async delete(url: string): Promise<any> {
        const response = await fetch(url, {
            method: 'DELETE'
        });
        return response.json();
    }
}

export default Fetch;