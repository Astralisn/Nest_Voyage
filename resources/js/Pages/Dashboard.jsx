import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';  

const locations = [
    { id: 1, name: "Москва", coordinates: [55.7558, 37.6173] },
    { id: 2, name: "Санкт-Петербург", coordinates: [59.9343, 30.3351] },
    { id: 3, name: "Казань", coordinates: [55.8304, 49.0661] },
];

export default function Dashboard({ auth }) {
    const [selectedLocation, setSelectedLocation] = useState(locations[0]); 
    const [reviews, setReviews] = useState([]); 
    const [newReview, setNewReview] = useState(''); 

    const handleAddReview = (e) => {
        e.preventDefault();
        if (newReview.trim()) {
            setReviews([...reviews, newReview.trim()]);
            setNewReview(''); 
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Туристический сайт</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="p-6 bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                            <h3 className="mb-4 text-lg font-semibold">Выберите местность</h3>
                            <div className="space-y-2">
                                {locations.map((location) => (
                                    <button
                                        key={location.id}
                                        className={`w-full text-left py-2 px-4 rounded-md ${selectedLocation.id === location.id ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                        onClick={() => setSelectedLocation(location)}
                                    >
                                        {location.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-2 bg-white rounded-lg shadow-sm dark:bg-gray-800 h-[500px]">
                            <MapContainer center={selectedLocation.coordinates} zoom={10} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={selectedLocation.coordinates}>
                                    <Popup>{selectedLocation.name}</Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>

                    <div className="p-6 mt-8 bg-white rounded-lg shadow-sm dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold">Отзывы</h3>

                        <form onSubmit={handleAddReview} className="mb-4">
                            <textarea
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                                placeholder="Оставьте свой отзыв..."
                                className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none"
                                rows="4"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            >
                                Добавить отзыв
                            </button>
                        </form>

                        {reviews.length > 0 ? (
                            <ul className="space-y-2">
                                {reviews.map((review, index) => (
                                    <li key={index} className="p-3 bg-gray-100 rounded-md dark:bg-gray-700">
                                        {review}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Отзывов еще нет. Будьте первым!</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
