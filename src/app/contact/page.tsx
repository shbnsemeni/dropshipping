"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Mail, MessageSquare, Clock, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-rose-500 font-medium">Get in Touch</span>
        <h1 className="text-3xl md:text-5xl font-bold text-stone-900 mt-2">Contact Us</h1>
        <p className="text-lg text-stone-500 mt-4 max-w-xl mx-auto">
          Have a question or concern? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Your Name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
              <Input label="Email Address" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full px-3 py-2.5 border border-stone-300 rounded-xl shadow-sm focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none text-sm resize-none"
                placeholder="How can we help you?"
              />
            </div>
            <Button onClick={handleSubmit} loading={loading}>
              <Send className="w-4 h-4 mr-2" />
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          {[
            { icon: Mail, title: "Email", desc: "support@jsitemuang.xyz" },
            { icon: MessageSquare, title: "Live Chat", desc: "Available 24/7" },
            { icon: Clock, title: "Response Time", desc: "Within 24 hours" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 bg-stone-50 rounded-2xl p-5">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                <item.icon className="w-5 h-5 text-stone-700" />
              </div>
              <div>
                <h3 className="font-medium text-stone-900">{item.title}</h3>
                <p className="text-sm text-stone-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
