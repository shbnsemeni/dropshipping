"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Mail, MessageSquare, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
      <p className="text-gray-600 mb-10">
        Have a question or concern? We&apos;d love to hear from you. Send us a message and we&apos;ll respond promptly.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <Input label="Your Name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
            <Input label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm resize-none"
                placeholder="How can we help you?"
              />
            </div>
            <Button type="submit" loading={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          {[
            { icon: Mail, title: "Email", desc: "support@jsitemuang.xyz" },
            { icon: MessageSquare, title: "Live Chat", desc: "Available 24/7" },
            { icon: Clock, title: "Response Time", desc: "Within 24 hours" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <item.icon className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
