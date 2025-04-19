import { useState } from 'react';

const Cart = () => {
    // Dummy data for demonstration
    const [cartItems] = useState([
        {
            id: 1,
            model: "Mountain Bike Pro",
            price: 999.99,
            image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3",
            quantity: 1
        }
    ]);

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-xl text-gray-600">Your cart is empty</p>
                </div>
            ) : (
                <>
                    <div className="bg-base-100 shadow-xl rounded-lg overflow-hidden">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center p-6 border-b">
                                <img
                                    src={item.image}
                                    alt={item.model}
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                                <div className="flex-grow ml-6">
                                    <h3 className="text-xl font-semibold">{item.model}</h3>
                                    <p className="text-lg text-gray-600">${item.price}</p>
                                    <div className="flex items-center mt-2">
                                        <label className="mr-2">Quantity:</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            className="input input-bordered w-20"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <button className="btn btn-ghost text-red-500">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 bg-base-100 shadow-xl rounded-lg p-6">
                        <div className="flex justify-between items-center text-xl font-semibold">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="btn btn-primary w-full mt-4">
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
