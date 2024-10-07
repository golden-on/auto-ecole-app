import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const LoginPage: React.FC = () => {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    if (!userContext) {
        return <div>Error: UserContext not found</div>;
    }

    const { login } = userContext;

    const handleLoginSuccess = (username: string) => {
        login(username);
        navigate('/'); // Redirect to home page
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
            <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
    );
};

export default LoginPage;