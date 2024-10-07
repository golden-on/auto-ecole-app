import React, { useState, useContext, useEffect } from 'react';
import { Steps, Button, message, DatePicker, Card, InputNumber, Modal } from 'antd';
import 'antd/dist/antd';
import 'tailwindcss/tailwind.css';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import { BasketContext } from '../contexts/BasketContext';
import { UserContext } from '../contexts/UserContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { format, parseISO, isBefore, isAfter, addHours, isEqual } from 'date-fns';
import LoginPage from './LoginPage'; // Import the LoginPage component
import LoginForm from '../components/LoginForm';

const { Step } = Steps;
const { Meta } = Card;

type Vehicle = {
    id: number;
    type: string;
    name: string;
    brand: string;
    img: string;
    description: string;
};

type Booking = {
    vehicleId: number;
    dateTime: string; // Store as ISO string
    duration: number;
};

const getVehicleTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case 'voiture manuelle':
        case 'voiture auto':
            return <DirectionsCarIcon />;
        case 'camion':
            return <LocalShippingIcon />;
        case 'moto':
            return <SportsMotorsportsIcon />;
        case 'quad':
            return <SportsMotorsportsIcon />;
        case 'voiture electrique':
            return <ElectricCarIcon />;
        case 'scooter':
            return <TwoWheelerIcon />;
        default:
            return <DirectionsCarIcon />;
    }
};

const VehicleDetails: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => (
    <div className="vehicle-details flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">{vehicle.name}</h2>
        <img src={vehicle.img} alt={vehicle.name} className="w-60 h-40 object-cover mb-4" />
        <p className="text-lg font-semibold">Brand: <span className="font-normal">{vehicle.brand}</span></p>
        <p className="text-lg font-semibold flex items-center">
            {getVehicleTypeIcon(vehicle.type)} <span className="font-normal ml-2">{vehicle.type}</span>
        </p>
    </div>
);

const CartPage: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [vehicleType, setVehicleType] = useState<Vehicle | null>(null);
    const [dateTime, setDateTime] = useState<Date | null>(null);
    const [duration, setDuration] = useState<number>(2); // Default duration is 2 hours
    const [bookings, setBookings] = useState<Booking[]>([]); // List of all bookings
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const basketContext = useContext(BasketContext);
    const userContext = useContext(UserContext);

    if (!basketContext) {
        throw new Error('BasketContext must be used within a BasketProvider');
    }

    if (!userContext) {
        throw new Error('UserContext must be used within a UserProvider');
    }

    const { addToBasket } = basketContext;
    const { user, login } = userContext;

    useEffect(() => {
        // Fetch bookings from backend or context
        // Example: setBookings(fetchedBookings);
        console.log('Bookings:', bookings, dateTime);
    }, [dateTime, bookings]);

    const isAvailable = (vehicleId: number, dateTime: Date, duration: number) => {
        console.log('Checking availability for vehicleId:', vehicleId);
        console.log('Selected dateTime:', format(dateTime, 'yyyy-MM-dd HH:mm:ss'));
        return !bookings.some(booking => {
            const bookingStartTime = parseISO(booking.dateTime);
            const bookingEndTime = addHours(bookingStartTime, booking.duration);
            const newEndTime = addHours(dateTime, duration);

            console.log('Booking startTime:', format(bookingStartTime, 'yyyy-MM-dd HH:mm:ss'));
            console.log('Booking endTime:', format(bookingEndTime, 'yyyy-MM-dd HH:mm:ss'));
            console.log('New endTime:', format(newEndTime, 'yyyy-MM-dd HH:mm:ss'));

            const isOverlapping = (isBefore(dateTime, bookingEndTime) || isEqual(dateTime, bookingEndTime)) &&
                                  (isAfter(newEndTime, bookingStartTime) || isEqual(newEndTime, bookingStartTime));
            console.log('Is overlapping:', isOverlapping);

            return booking.vehicleId === vehicleId && isOverlapping;
        });
    };

    const next = () => {
        if (current === 0 && !vehicleType) {
            message.error('Please select a vehicle type');
            return;
        }
        if (current === 1 && (!dateTime || !duration)) {
            message.error('Please select a date, time, and duration');
            return;
        }
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const handleVehicleChange = (value: Vehicle) => {
        setVehicleType(value);
    };

    const handleDateChange = (value: any) => {
        console.log('Selected date and time:', value);
        setDateTime(value.toDate());
    };

    const handleDurationChange = (value: number | null) => {
        if (value !== null) {
            setDuration(value);
        }
    };

    const addToCart = () => {
        if (!user) {
            setIsLoginModalVisible(true);
            return;
        }

        if (vehicleType && dateTime && duration) {
            if (!isAvailable(vehicleType.id, dateTime, duration)) {
                message.error('The selected vehicle is not available at the chosen time');
                return;
            }
            const item = {
                ...vehicleType,
                duration,
                price: duration * 50, // Assuming $50 per hour
            };
            addToBasket(item);
            setBookings([...bookings, { vehicleId: vehicleType.id, dateTime: dateTime.toISOString(), duration }]);
            message.success('Product added to cart');
        }
    };

    const resetSteps = () => {
        setCurrent(0);
        setVehicleType(null);
        setDateTime(null);
        setDuration(2);
    };

    const vehicles: Vehicle[] = [
        {
            type: 'voiture manuelle',
            name: 'BMW 3 Series',
            brand: 'BMW',
            img: 'https://static.vecteezy.com/system/resources/previews/023/192/562/non_2x/sport-car-running-on-the-road-in-future-city-created-with-generative-ai-free-photo.jpg',
            description: 'Description for Voiture Manuelle',
            id: 0
        },
        {
            type: 'voiture auto',
            name: 'Ford Mustang',
            brand: 'Ford',
            img: 'https://static.vecteezy.com/system/resources/previews/023/192/562/non_2x/sport-car-running-on-the-road-in-future-city-created-with-generative-ai-free-photo.jpg',
            description: 'Description for Voiture Auto',
            id: 1
        },
        {
            type: 'camion',
            name: 'Mercedes Actros',
            brand: 'Mercedes',
            img: 'https://static.vecteezy.com/system/resources/previews/023/192/562/non_2x/sport-car-running-on-the-road-in-future-city-created-with-generative-ai-free-photo.jpg',
            description: 'Description for Camion',
            id: 2
        },
        {
            type: 'moto',
            name: 'Yamaha YZF-R1',
            brand: 'Yamaha',
            img: 'https://static.vecteezy.com/system/resources/previews/023/192/562/non_2x/sport-car-running-on-the-road-in-future-city-created-with-generative-ai-free-photo.jpg',
            description: 'Description for Moto',
            id: 3
        },
        {
            type: 'quad',
            name: 'Polaris Sportsman',
            brand: 'Polaris',
            img: 'https://static.vecteezy.com/system/resources/previews/023/192/562/non_2x/sport-car-running-on-the-road-in-future-city-created-with-generative-ai-free-photo.jpg',
            description: 'Description for Quad',
            id: 4
        },
        {
            type: 'voiture electrique',
            name: 'Renault Zoe',
            brand: 'Renault',
            img: 'https://static.vecteezy.com/system/resources/previews/023/192/562/non_2x/sport-car-running-on-the-road-in-future-city-created-with-generative-ai-free-photo.jpg',
            description: 'Description for Voiture Electrique',
            id: 5
        },
        {
            type: 'scooter',
            name: 'Peugeot Django',
            brand: 'Peugeot',
            img: 'https://static.vecteezy.com/system/resources/previews/023/192/562/non_2x/sport-car-running-on-the-road-in-future-city-created-with-generative-ai-free-photo.jpg',
            description: 'Description for Scooter',
            id: 6
        },
    ];

    const steps = [
        {
            title: 'Select Vehicle',
            content: (
                <div className="flex flex-wrap gap-4">
                    {vehicles.map((vehicle) => (
                        <Card
                            key={vehicle.id}
                            hoverable
                            className="w-60"
                            cover={<img alt={vehicle.name} src={vehicle.img} />}
                            onClick={() => handleVehicleChange(vehicle)}
                        >
                            <Meta title={vehicle.name} description={vehicle.description} />
                        </Card>
                    ))}
                </div>
            ),
        },
        {
            title: 'Select Date and Time',
            content: (
                <div className="flex flex-col items-center">
                    <DatePicker showTime onChange={handleDateChange} className="w-1/2 mt-60 mb-4" />
                    <InputNumber min={1} max={24} defaultValue={2} onChange={(value) => handleDurationChange(value as number)} className="w-1/2" />
                </div>
            ),
        },
        {
            title: 'Review & Ajouter au Panier',
            content: (
                <div className="mt-20 mb-20 p-6 border rounded-lg shadow-md bg-white w-full max-w-md mx-auto">
                    {vehicleType && <VehicleDetails vehicle={vehicleType} />}
                    <div className="mt-4">
                        <p className="text-lg font-semibold flex items-center">
                            <EventIcon className="mr-2" />
                            Date and Time: <span className="font-normal ml-2">{dateTime ? format(dateTime, 'yyyy-MM-dd HH:mm:ss') : ''}</span>
                        </p>
                        <p className="text-lg font-semibold flex items-center">
                            <ScheduleIcon className="mr-2" />
                            For how long: <span className="font-normal ml-2">{duration} hours</span>
                        </p>
                        <p className="text-lg font-semibold flex items-center">
                            <AttachMoneyIcon className="mr-2" />
                            Total Price: <span className="font-normal ml-2">${duration * 50}</span> {/* Assuming $50 per hour */}
                        </p>
                    </div>
                    <div className="mt-6 flex justify-center space-x-2">
                        <Button type="primary" size="large" icon={<ShoppingCartIcon />} onClick={addToCart}>
                            Confirm Order
                        </Button>
                        <Button type="default" size="large" onClick={resetSteps}>
                            Choose Another Car
                        </Button>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-[90%] pt-90">
                <Steps current={current} className="w-[90%]">
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content mt-5">
                    {steps[current].content}
                </div>
                <div className="steps-action mt-5 flex justify-center space-x-2">
                    {current > 0 && (
                        <Button type="default" size="large" icon={<ArrowBackIcon />} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" size="large" icon={<ArrowForwardIcon />} onClick={() => next()}>
                            Next
                        </Button>
                    )}
                </div>
            </div>
            <Modal
                title="Login"
                visible={isLoginModalVisible}
                onCancel={() => setIsLoginModalVisible(false)}
                footer={null}
            >
                <LoginForm onLoginSuccess={(username: string) => {
                    login(username);
                    setIsLoginModalVisible(false);
                }} />
            </Modal>
        </div>
    );
};

export default CartPage;