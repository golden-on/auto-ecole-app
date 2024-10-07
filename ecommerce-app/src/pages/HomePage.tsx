import React from 'react';
import { Carousel, Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd';

const { Meta } = Card;

const carImages = [
    'https://static.vecteezy.com/system/resources/previews/023/192/562/non_2x/sport-car-running-on-the-road-in-future-city-created-with-generative-ai-free-photo.jpg',
    'https://static.vecteezy.com/system/resources/previews/023/192/562/non_2x/sport-car-running-on-the-road-in-future-city-created-with-generative-ai-free-photo.jpg',
    'https://static.vecteezy.com/system/resources/previews/023/192/562/non_2x/sport-car-running-on-the-road-in-future-city-created-with-generative-ai-free-photo.jpg',
    'https://static.vecteezy.com/system/resources/previews/023/192/562/non_2x/sport-car-running-on-the-road-in-future-city-created-with-generative-ai-free-photo.jpg',
];

const ServiceOverview: React.FC = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/cart');
    };

    return (
        <div>
            <Carousel autoplay>
                {carImages.map((imgUrl, index) => (
                    <div key={index}>
                        <img src={imgUrl} alt={`Car ${index + 1}`} className="w-full h-[700px] object-cover" />
                    </div>
                ))}
            </Carousel>
            <div className="absolute top-40 left-0 p-4 pl-36 pr-36 text-white">
                <h2 className="text-4xl font-bold mb-4">Welcome to Our Driving School</h2>
                <p className="mb-4 font-bold text-2xl">We offer a variety of driving services to suit your needs. Whether you want to learn to drive a manual car, an automatic car, a truck, a motorcycle, or a quad, we have the right service for you.</p>
                <Button type="primary" className="mt-20 text-lg py-4 px-8" onClick={handleButtonClick}>
                    View Our Products
                </Button>
            </div>
        </div>
    );
};

export default ServiceOverview;