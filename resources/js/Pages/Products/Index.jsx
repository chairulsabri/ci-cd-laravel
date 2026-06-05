import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function Index() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://backend-server-lime.vercel.app/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setError("Gagal memuat data produk.");
                setLoading(false);
            });
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Produk
                </h2>
            }
        >
            <Head title="Produk" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            
                            {loading ? (
                                <div className="flex justify-center items-center py-10">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                                </div>
                            ) : error ? (
                                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                    {error}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <div key={product.id} className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
                                            <div className="p-5 flex-grow">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-lg font-bold text-gray-800">
                                                        {product.name}
                                                    </h3>
                                                    <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        ${product.price}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {product.description}
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 border-t border-gray-200 p-4">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-500 font-medium">
                                                        Kategori: <span className="text-gray-800">{product.category}</span>
                                                    </span>
                                                    <span className={`font-medium ${product.stock > 50 ? 'text-green-600' : 'text-orange-600'}`}>
                                                        Stok: {product.stock}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {products.length === 0 && (
                                        <div className="col-span-full text-center py-10 text-gray-500">
                                            Tidak ada produk yang tersedia.
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
