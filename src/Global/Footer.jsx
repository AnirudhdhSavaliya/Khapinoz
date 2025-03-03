import React from 'react';
import Pizza from '../assets/pizza.png';

function Footer() {
    return (
        <>
            <style>
                {`
                    @keyframes spin {
                        from {
                            transform: rotate(0deg);
                        }
                        to {
                            transform: rotate(360deg);
                        }
                    }
                `}
            </style>
            <footer className="bg-dark-green text-white py-8 px-4 md:px-8">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">🍕 Fresh Pizzas</h3>
                        <p className="text-sm">
                            Craving pizza? We got you! Hot, fresh, and delivered straight to your door. Let’s get cheesy! 🧀
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">🚀 Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-yellow-400">Home</a></li>
                            <li><a href="/menu" className="hover:text-yellow-400">Menu</a></li>
                            <li><a href="/offers" className="hover:text-yellow-400">Special Deals</a></li>
                            <li><a href="/locations" className="hover:text-yellow-400">Find Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">📞 Get in Touch</h3>
                        <ul className="space-y-2 text-sm">
                            <li>Email: hello@freshpizzas.com</li>
                            <li>Phone: +1-800-YUM-PIZZA</li>
                            <li>Address: 123 Pizza Lane, Food City</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">📲 Stay Connected</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" className="hover:text-yellow-400 hover:scale-125 hover:animate-bounce transition-transform">Facebook</a>
                            <a href="https://twitter.com" className="hover:text-yellow-400 hover:scale-125 hover:animate-bounce transition-transform">Twitter</a>
                            <a href="https://instagram.com" className="hover:text-yellow-400 hover:scale-125 hover:animate-bounce transition-transform">Instagram</a>
                        </div>
                    </div>
                </div>

                <div className="flex mt-8 justify-center items-center text-sm border-t border-gray-300 pt-4 gap-4">
                    <p>© 2025 Fresh Pizzas. Made with ❤️ and extra cheese.</p>
                    <img
                        src={Pizza}
                        alt="Rotating Pizza"
                        className="w-10 h-10"
                        style={{ animation: 'spin 6s linear infinite' }}
                    />
                </div>
            </footer>
        </>
    );
}

export default Footer;