import React, { useState } from 'react';
import Footer from './Footer';

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-black font-sans">
      
      {/* Main Content (Nav removed as requested) */}
      <main className="max-w-6xl mx-auto py-20 px-12 grid grid-cols-1 md:grid-cols-2 gap-24">
        <section>
          <h1 className="text-5xl font-bold mb-6">Create Account</h1>
          <p className="text-gray-600 mb-10 text-lg">Join the circle of high-end technology enthusiasts.<br/>Experience curated excellence.</p>
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">PRIORITY MEMBER BENEFITS <span className="text-red-500">✓</span></h3>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li>• Early access to limited drops</li>
              <li>• Concierge technical support</li>
              <li>• Exclusive editorial insights</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>1</div>
            <div className="w-12 h-[1px] bg-gray-300"></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-black text-white' : 'bg-gray-200'}`}>2</div>
          </div>

          <div className="space-y-4">
            {step === 1 ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <input name="firstName" placeholder="First Name" className="p-4 bg-gray-100 rounded-lg outline-none" onChange={handleChange} />
                  <input name="lastName" placeholder="Last Name" className="p-4 bg-gray-100 rounded-lg outline-none" onChange={handleChange} />
                </div>
                <input name="email" placeholder="Email Address" className="w-full p-4 bg-gray-100 rounded-lg outline-none" onChange={handleChange} />
                <input name="phone" placeholder="Phone Number (optional)" className="w-full p-4 bg-gray-100 rounded-lg outline-none" onChange={handleChange} />
                <button onClick={() => setStep(2)} className="w-full bg-black text-white py-4 rounded-lg font-bold">NEXT →</button>
              </>
            ) : (
              <>
                <input name="password" type="password" placeholder="Password" className="w-full p-4 bg-gray-100 rounded-lg outline-none" onChange={handleChange} />
                <input name="confirmPassword" type="password" placeholder="Confirm Password" className="w-full p-4 bg-gray-100 rounded-lg outline-none" onChange={handleChange} />
                <button className="w-full bg-black text-white py-4 rounded-lg font-bold">CREATE ACCOUNT</button>
                <button onClick={() => setStep(1)} className="w-full text-sm underline text-gray-500">← Back</button>
              </>
            )}
            <p className="text-center text-sm mt-4">Already have an account? <span className="font-bold underline cursor-pointer">Login</span></p>
          </div>
        </section>
      </main>

      {/* Footer added below main content */}
      <Footer />
    </div>
  );
}