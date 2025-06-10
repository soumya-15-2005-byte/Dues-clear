export const getDepartmentDue = async (host, token, filters) => {
    console.log(filters);
    const queryParams = new URLSearchParams(filters);
    // console.log(queryParams);
    const url = `${host}/department/dues?${queryParams}`;
    // console.log(url);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch department due');
        }

        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
