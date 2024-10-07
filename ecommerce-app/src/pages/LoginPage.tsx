import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

const LoginPage: React.FC = () => {
    const userContext = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    if (!userContext) {
        return <div>Error: UserContext not found</div>;
    }

    const { login } = userContext;
    const auth = getAuth();

    const onFinish = async (values: { username: string, password: string }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:3001/login', values);
            console.log('Login successful:', response.data);
            login(values.username);
            notification.success({
                message: 'Login Successful',
                description: 'You have successfully logged in.',
            });
            navigate('/'); // Redirect to home page
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            login(result.user.email || '');
            notification.success({
                message: 'Login Successful',
                description: 'You have successfully logged in with Google.',
            });
            navigate('/'); // Redirect to home page
        } catch (err) {
            setError('Google login failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleFacebookLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const provider = new FacebookAuthProvider();
            const result = await signInWithPopup(auth, provider);
            login(result.user.email || '');
            notification.success({
                message: 'Login Successful',
                description: 'You have successfully logged in with Facebook.',
            });
            navigate('/'); // Redirect to home page
        } catch (err) {
            setError('Facebook login failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                {error && <div className="text-red-500 text-center">{error}</div>}
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onFinish({ username: (e.target as any).username.value, password: (e.target as any).password.value }); }}>
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Log in'}
                        </button>
                    </div>
                </form>
                <div className="flex justify-between">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Log in with Google'}
                    </button>
                    <button
                        onClick={handleFacebookLogin}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Log in with Facebook'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;