
import React from "react";
import { NextSeo } from 'next-seo';
import Link from "next/link";
import { motion } from "framer-motion";
import { shopifyProjects, shopifyVideos } from "../utils/constants";
import ShopifyProjectCard from "../components/ShopifyProjectCard";
import { useTheme } from "next-themes";

export default function ShopifyPortfolio() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="min-h-screen bg-white dark:bg-[#121212] transition-colors duration-300 font-sans selection:bg-brand selection:text-white">
            <NextSeo
                title="Atul Bhatt | Shopify Developer"
                description="Specialized Shopify development portfolio of Atul Bhatt. Building high-converting storefronts."
                canonical="https://atoolsera.com/shopify"
            />

            {/* Navigation - Minimal */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/">
                        <span className="text-xl font-bold tracking-tight cursor-pointer dark:text-white">
                            Atul Bhatt
                            <span className="text-brand">.</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <a
                            href="mailto:mratulbhatt97.com"
                            className="hidden md:block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand transition-colors"
                        >
                            Contact
                        </a>
                        <a
                            href="https://wa.me/919259598769"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-brand text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brandAlt transition-colors shadow-lg shadow-brand/20"
                        >
                            Let's Talk
                        </a>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-20">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center md:text-left max-w-4xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-WHITE mb-6 leading-[1.1]">
                            Crafting Premium <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brandAlt">
                                Commerce Experiences
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                            Specialized in building high-converting Shopify storefronts that merge
                            technical precision with brand storytelling.
                        </p>
                    </motion.div>
                </section>

                {/* Projects Grid */}
                <section className="max-w-7xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-12 border-b border-gray-200 dark:border-gray-800 pb-4">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Selected Works</h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{shopifyProjects.length} Projects</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                        {shopifyProjects.map((project, index) => (
                            <ShopifyProjectCard key={index} project={project} index={index} />
                        ))}
                    </div>
                </section>

                {/* YouTube Playlist Section as Grid */}
                <section className="max-w-7xl mx-auto px-6 mt-32">
                    <div className="flex items-end justify-between mb-12 border-b border-gray-200 dark:border-gray-800 pb-4">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Shopify Tutorials</h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{shopifyVideos.length} Videos</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {shopifyVideos.map((video, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${video.id}`}
                                        title={video.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        loading="lazy"
                                    ></iframe>
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white leading-snug group-hover:text-brand transition-colors line-clamp-2">
                                    {video.title}
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            {/* WhatsApp Floating Button Removed (Now Global) */}

            {/* Footer Minimal */}
            <footer className="py-12 text-center text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Atul Bhatt. All rights reserved.</p>
            </footer>
        </div>
    );
}
