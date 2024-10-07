import React from 'react';
import { Card, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface CartItemProps {
    id: number;
    name: string;
    price: number;
    quantity: number;
    onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, quantity, onRemove }) => {
    return (
        <Card
            title={name}
            extra={<Button type="primary" danger icon={<DeleteOutlined />} onClick={() => onRemove(id)}>Remove</Button>}
            style={{ width: 300, marginBottom: 16 }}
        >
            <p>Price: ${price.toFixed(2)}</p>
            <p>Quantity: {quantity}</p>
            <p>Total: ${(price * quantity).toFixed(2)}</p>
        </Card>
    );
};

export default CartItem;