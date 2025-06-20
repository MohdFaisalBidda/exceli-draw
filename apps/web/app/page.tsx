"use client";

import React, { useState, useEffect } from "react";
import {
  PenTool,
  Users,
  Zap,
  Share2,
  Download,
  Play,
  Check,
  ArrowRight,
  Menu,
  X,
  MousePointer,
  Cloud,
  Globe,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { appName } from "@/utils";
import Header from "./_components/Header";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: PenTool,
      title: "Natural Drawing",
      description:
        "Create fluid, hand-drawn strokes that feel authentic and organic for natural diagram creation",
    },
    {
      icon: Users,
      title: "Real-time Collaboration",
      description:
        "Work together seamlessly with live cursors and instant updates across all team members",
    },
    {
      icon: Zap,
      title: "Instant Sync",
      description:
        "Zero-latency synchronization ensures everyone stays in sync across all devices",
    },
    {
      icon: Layers,
      title: "Smart Organization",
      description:
        "Organize complex diagrams with intelligent layering and grouping capabilities",
    },
    {
      icon: Globe,
      title: "Cloud Native",
      description:
        "Access your work from anywhere with reliable cloud-based architecture",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description:
        "Bank-grade encryption and security measures keep your ideas protected",
    },
  ];

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: "#202025" }}
    >
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <Header />
      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-gray-300">
                Now with AI-powered suggestions
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Collaborative Whiteboard
              <br />
              <span className="text-purple-400">for Visual Teams</span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Create beautiful hand-drawn diagrams with your team in real-time.
              The most intuitive whiteboard tool for visual collaboration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link href="/drw">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2">
                  <span>Try now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
                <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
                  <Play className="w-4 h-4 ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="flex items-center justify-center space-x-8 pt-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="relative z-10 py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8">
            <div className="aspect-video bg-[#1a1a1f] rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mx-auto">
                  <MousePointer className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-400">Interactive demo workspace</p>
              </div>

              {/* Demo elements */}
              <div className="absolute top-6 left-6 w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-lg"></div>
              <div className="absolute bottom-6 right-6 w-8 h-8 bg-purple-400/20 border border-purple-400/30 rounded-full"></div>
              <div className="absolute top-1/2 right-12 w-6 h-6 bg-purple-300/20 border border-purple-300/30 rounded"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Everything you need for
              <span className="text-purple-400"> visual collaboration</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Powerful features designed for teams who think visually
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors duration-200"
              >
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Active Users" },
              { number: "1M+", label: "Diagrams Created" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-purple-400">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to start collaborating?
            </h2>

            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of teams creating amazing diagrams with
              SketchBoard. Start your free trial today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Start Free Trial
              </button>

              <button className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/5 transition-colors duration-200">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <PenTool className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-white">
                  SketchBoard
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The collaborative whiteboard for visual thinkers and creative
                teams.
              </p>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3">Product</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Templates
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  API
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3">Company</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  About
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Blog
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Careers
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Press
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3">Support</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Help Center
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Status
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Security
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 SketchBoard. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
