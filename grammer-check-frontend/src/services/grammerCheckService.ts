export const handleGrammerCheck = async (message: string) => {
    const response = await fetch('http://localhost:4000/check-grammer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: message,
        }),
    });

    if (!response.ok) {
        console.log('Something went wrong!');
    }

    const data = await response.json();
    console.log(data.message);
    return data.message;
};
