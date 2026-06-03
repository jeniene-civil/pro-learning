"use client";

import { useLocale } from "next-intl";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-500">Have a question? We'd love to hear from you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {[
              { icon: Mail, title: "Email", desc: "support@prolearning.com" },
              { icon: MessageSquare, title: "Live Chat", desc: "Available Mon-Fri 9am-6pm" },
              { icon: MapPin, title: "Office", desc: "Engineering Hub, Innovation City" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm" />
              <input type="text" placeholder="Last Name" className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm" />
            </div>
            <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm" />
            <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm bg-white">
              <option>General Inquiry</option>
              <option>Technical Support</option>
              <option>Enterprise Sales</option>
              <option>Become an Instructor</option>
            </select>
            <textarea rows={4} placeholder="Your Message" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm resize-none" />
            <button type="submit" className="w-full py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors inline-flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
