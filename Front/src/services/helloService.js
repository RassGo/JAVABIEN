export const getHelloMessage = async () => {
    try {
        const response = await fetch('http://localhost:8080/hello', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const message = await response.text();
        return message;
    } catch (error) {
      console.error('Error fetching hello message:', error);
      throw error;
    }
};
  