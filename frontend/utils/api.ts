interface UserData {
    email: string;
    ci: string;
    name: string;
    // lastname: string;
    phone: string;
    province: string;
    city: string;
    address: string;
    password: string;
    role: string;
}

export const registerUser = async (userData: UserData) => {
    const apiUrl = 'https://reciclas-app-backend-dev-sptb.3.us-1.fl0.io/api/v1/auth/register-user';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error en la solicitud:\nStatus: ${response.status}\n${errorText}`);
        }

        const responseData = await response.json();
        console.log('Registro exitoso:', responseData);
        return responseData;

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error;
    }
};
