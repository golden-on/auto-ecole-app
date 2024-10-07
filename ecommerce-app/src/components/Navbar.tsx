import React, { useContext } from 'react';
import { Menu, Dropdown, Button, Badge } from 'antd';
import { HomeOutlined, ShopOutlined, UserOutlined, ShoppingCartOutlined, ProfileOutlined, CarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { BasketContext } from '../contexts/BasketContext';
import { UserContext } from '../contexts/UserContext';

const Navbar: React.FC = () => {
    const basketContext = useContext(BasketContext);
    const userContext = useContext(UserContext);

    if (!userContext) {
        return <div>Error: UserContext not found</div>;
    }

    const { state, logout } = userContext;
    const basketItems = basketContext?.basketItems || [];

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
            {state.isAuthenticated ? (
                <>
                    <Menu.Item key="profile" icon={<ProfileOutlined />}>
                        <Link to="/profile">View Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="signout">
                        <Button type="link" onClick={logout} className="text-red-500">Log Out</Button>
                    </Menu.Item>
                </>
            ) : (
                <>
                    <Menu.Item key="signin">
                        <Link to="/signin">Sign In</Link>
                    </Menu.Item>
                    <Menu.Item key="login">
                        <Link to="/logIn">Log In</Link>
                    </Menu.Item>
                </>
            )}
        </Menu>
    );

    return (
        <div className="bg-gray-800 fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="text-white text-xl font-bold">
                    <Link to="/">
                        <CarOutlined />
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-white flex items-center space-x-2">
                        <HomeOutlined />
                        <span>Home</span>
                    </Link>
                    <Link to="/cart" className="text-white flex items-center space-x-2">
                        <ShopOutlined />
                        <span>Shop</span>
                    </Link>
                    <Dropdown overlay={profileMenu} trigger={['click']}>
                        <span className="text-white cursor-pointer flex items-center space-x-2">
                            {state.isAuthenticated ? state.user : <UserOutlined />}
                        </span>
                    </Dropdown>
                    <Dropdown overlay={basketMenu} trigger={['click']}>
                        <Badge count={basketItems.length} offset={[10, 0]}>
                            <ShoppingCartOutlined className="text-white text-2xl cursor-pointer" />
                        </Badge>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
