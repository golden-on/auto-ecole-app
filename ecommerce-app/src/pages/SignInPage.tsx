import React, { useContext } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { auth, googleProvider, facebookProvider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import 'antd/dist/antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { notification } from 'antd';

const SignInPage: React.FC = () => {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    if (!userContext) {
        return <div>Error: UserContext not found</div>;
    }

    const { login } = userContext;

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        try {
            const response = await axios.post('http://localhost:3001/save-user', values);
            console.log('User data saved:', response.data);
            login(values.username);
            notification.success({
                message: 'Sign In Successful',
                description: 'You have successfully signed in.',
            });
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log('Google Sign-In Success:', result.user);
            login(result.user.email || '');
            notification.success({
                message: 'Sign In Successful',
                description: 'You have successfully signed in with Google.',
            });
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }
    };

    const handleFacebookSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            console.log('Facebook Sign-In Success:', result.user);
            login(result.user.email || '');
            notification.success({
                message: 'Sign In Successful',
                description: 'You have successfully signed in with Facebook.',
            });
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Facebook Sign-In Error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="space-y-6"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input className="w-full px-4 py-2 border rounded-md" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password className="w-full px-4 py-2 border rounded-md" />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input className="w-full px-4 py-2 border rounded-md" />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
                <Button onClick={handleGoogleSignIn} className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Sign In with Google
                </Button>
                <Button onClick={handleFacebookSignIn} className="mt-4 w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
                    Sign In with Facebook
                </Button>
            </div>
        </div>
    );
};

export default SignInPage;