import React from 'react';
import { Card, Descriptions, Button } from 'antd';

interface ProductDetailsProps {
    product: {
        name: string;
        description: string;
        price: number;
        category: string;
        availability: string;
    };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    return (
        <Card title={product.name} bordered={false} style={{ width: 300 }}>
            <Descriptions column={1}>
                <Descriptions.Item label="Description">{product.description}</Descriptions.Item>
                <Descriptions.Item label="Price">${product.price}</Descriptions.Item>
                <Descriptions.Item label="Category">{product.category}</Descriptions.Item>
                <Descriptions.Item label="Availability">{product.availability}</Descriptions.Item>
            </Descriptions>
            <Button type="primary" style={{ marginTop: '16px' }}>
                Buy Now
            </Button>
        </Card>
    );
};

export default ProductDetails;