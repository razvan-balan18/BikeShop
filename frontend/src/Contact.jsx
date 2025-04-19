const Contact = () => {
    return (
        <div className="container mx-auto p-6">
            <div className="max-w-2xl mx-auto bg-base-100 shadow-xl rounded-lg p-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Our Store</h2>
                    <div className="text-gray-600">
                        <p>123 Bike Street</p>
                        <p>Cycling City, CC 12345</p>
                        <p>Phone: (555) 123-4567</p>
                        <p>Email: info@bikeshop.com</p>
                    </div>
                </div>

                <form className="space-y-4">
                    <div>
                        <label className="block text-lg mb-2">Name</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label className="block text-lg mb-2">Email</label>
                        <input
                            type="email"
                            className="input input-bordered w-full"
                            placeholder="your.email@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-lg mb-2">Subject</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="What's this about?"
                        />
                    </div>

                    <div>
                        <label className="block text-lg mb-2">Message</label>
                        <textarea
                            className="textarea textarea-bordered w-full h-32"
                            placeholder="Your message here..."
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Send Message
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t">
                    <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
                    <div className="grid grid-cols-2 gap-2 text-gray-600">
                        <p>Monday - Friday:</p>
                        <p>9:00 AM - 6:00 PM</p>
                        <p>Saturday:</p>
                        <p>10:00 AM - 4:00 PM</p>
                        <p>Sunday:</p>
                        <p>Closed</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
