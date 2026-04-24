import { useState } from 'react';

export default function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
            setEmail('');
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    return (
        <section className="w-full bg-[#f8f8f8] rounded-2xl sm:rounded-3xl py-12 sm:py-16 md:py-20 px-5 sm:px-8 mt-12 sm:mt-16 md:mt-24">
            <div className="max-w-lg mx-auto text-center flex flex-col items-center gap-4 sm:gap-5">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-black leading-tight">
                    Stay ahead of the curve.
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-md px-2">
                    Receive exclusive access to new launches, editorial features, and curated tech insights.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 mt-3 sm:mt-4 w-full max-w-sm">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full sm:flex-1 h-12 px-5 sm:px-7 rounded-full border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#e60000]/20 focus:border-[#e60000] transition-all placeholder:text-gray-400"
                    />
                    <button
                        type="submit"
                        className="w-full sm:w-auto h-12 px-7 rounded-full bg-black text-white text-sm font-bold tracking-wide hover:bg-gray-800 active:scale-95 transition-all duration-200 shadow-lg shadow-gray-200/50"
                    >
                        {submitted ? '✓ Sent!' : 'Subscribe'}
                    </button>
                </form>
            </div>
        </section>
    );
}
