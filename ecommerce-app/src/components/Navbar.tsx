import React, { useContext, useState } from 'react';
import { Layout, Menu, Dropdown, Button, Badge } from 'antd';
import { HomeOutlined, ShopOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { BasketContext } from '../contexts/BasketContext';

const { Header } = Layout;

const Navbar: React.FC = () => {
    const context = useContext(BasketContext);
    const basketItems = context?.basketItems || [];
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with actual authentication logic

    const basketMenu = (
        <Menu>
            {basketItems.map(item => (
                <Menu.Item key={item.id}>
                    {item.name} - {item.brand} - {item.type} x {item.duration}
                </Menu.Item>
            ))}
            <Menu.Divider />
            <Menu.Item>
                Total Price: ${basketItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <Button type="primary" block>
                    <Link to="/checkout">Go to Checkout</Link>
                </Button>
            </Menu.Item>
        </Menu>
    );

    const profileMenu = (
        <Menu>
            {isAuthenticated ? (
                <>
                    <Menu.Item key="profile">
                        <Link to="/profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="signout">
                        <Button type="link" onClick={() => setIsAuthenticated(false)}>Sign Out</Button>
                    </Menu.Item>
                </>
            ) : (
                <>
                    <Menu.Item key="signin">
                        <Link to="/signin">Sign In</Link>
                    </Menu.Item>
                    <Menu.Item key="signup">
                        <Link to="/signup">Sign Up</Link>
                    </Menu.Item>
                </>
            )}
        </Menu>
    );

    return (
        <Layout>
            <Header className="fixed top-0 left-0 w-full z-50">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<ShopOutlined />}>
                        <Link to="/cart">Shop</Link>
                    </Menu.Item>
                    <Menu.Item key="3" style={{ marginLeft: 'auto' }}>
                        <Dropdown overlay={profileMenu} trigger={['click']}>
                            <UserOutlined style={{ fontSize: '20px', color: '#fff' }} />
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Dropdown overlay={basketMenu} trigger={['click']}>
                            <Badge count={basketItems.length} offset={[10, 0]}>
                                <ShoppingCartOutlined style={{ fontSize: '20px', color: '#fff' }} />
                            </Badge>
                        </Dropdown>
                    </Menu.Item>
                </Menu>
            </Header>
        </Layout>
    );
};

export default Navbar;