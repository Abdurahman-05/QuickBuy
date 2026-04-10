import React from 'react';
import { ShoppingBag } from 'lucide-react'; // Make sure you have lucide-react installed

export default function Footer() {
  return (
    <footer className="bg-black text-white p-16 rounded-[2rem] max-w-6xl mx-auto mt-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Newsletter Section */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-bold mb-4">
            Recieve an exclusive <span className="text-red-500">20%</span> discount code when you signup.
          </h2>
          <div className="border-b border-gray-600 flex justify-between pb-2">
            <input type="email" placeholder="enter your email" className="bg-transparent outline-none text-sm" />
            <button className="text-sm font-bold">Subscribe</button>
          </div>
        </div>

        {/* Links Sections */}
        {[
          { title: "company", links: ["About us", "carriers", "locations", "blog"] },
          { title: "customer care", links: ["size guide", "Help and FAQs", "return a order", "refer a friend"] },
          { title: "Follow us on", links: ["Instagram", "Facebook", "tiktok", "twitter"] }
        ].map((section) => (
          <div key={section.title}>
            <h4 className="font-bold mb-4 uppercase text-sm">{section.title}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {section.links.map(link => <li key={link} className="cursor-pointer hover:text-white">{link}</li>)}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-16 flex justify-between items-center text-gray-500 text-sm">
        <div className="flex items-center gap-2 font-bold text-white"><ShoppingBag size={20}/>QuickBuy</div>
        <div>© 2025. All rights reserved</div>
      </div>
    </footer>
  );
}