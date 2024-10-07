import React, { useContext, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserContext } from '../contexts/UserContext'

const LoginPage: React.FC = () => {
    const userContext = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    if (!userContext) {
        return <div>Error: UserContext not found</div>;
    }

    const { login } = userContext;

    const onFinish = (values: { username: string }) => {
        setLoading(true);
        // Simulate a login API call
        setTimeout(() => {
            login(values.username);
            message.success('Login successful');
            setLoading(false);
        }, 1000);
    };

    return (
        <div style={{ maxWidth: 300, margin: 'auto', padding: '50px 0' }}>
            <h2>Login</h2>
            <Form
                name="login_form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Username" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;