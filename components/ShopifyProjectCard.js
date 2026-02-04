
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ShopifyProjectCard = ({ project, index }) => {
    const [isHovering, setIsHovering] = useState(false);
    const cardRef = useRef(null);

    const [thumbnailSrc, setThumbnailSrc] = useState(() => {
        if (project.youtubeId) return `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`;
        return null;
    });

    React.useEffect(() => {
        if (project.youtubeId) {
            setThumbnailSrc(`https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`);
        }
    }, [project.youtubeId]);

    React.useEffect(() => {
        // Use viewport width to safely detect mobile context for auto-play
        // helping ensure it doesn't trigger on desktop but triggers reliably on mobile
        const isMobile = window.innerWidth < 768;

        if (isMobile && cardRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setIsHovering(true);
                        } else {
                            setIsHovering(false);
                        }
                    });
                },
                {
                    threshold: 0.5 // Slightly more sensitive (50% visibility)
                }
            );

            observer.observe(cardRef.current);

            return () => {
                if (cardRef.current) observer.unobserve(cardRef.current);
            };
        }
    }, []);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative cursor-pointer"
            onMouseEnter={() => !window.matchMedia('(hover: none)').matches && setIsHovering(true)}
            onMouseLeave={() => !window.matchMedia('(hover: none)').matches && setIsHovering(false)}
        >
            <a href={project.link} target="_blank" rel="noreferrer" className="block outline-none">
                <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-sm group-hover:shadow-xl transition-all duration-500">
                    {/* Browser Header */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gray-200 dark:bg-gray-700 z-30 flex items-center px-3 gap-2 border-b border-gray-300 dark:border-gray-600">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>

                    <div className="relative aspect-video mt-8">
                        {/* Static Image / Thumbnail */}
                        <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${isHovering && project.youtubeId ? 'opacity-0' : 'opacity-100'}`}>
                            {thumbnailSrc ? (
                                <Image
                                    src={thumbnailSrc}
                                    alt={project.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                                    onError={() => {
                                        if (project.youtubeId && thumbnailSrc.includes('maxresdefault')) {
                                            setThumbnailSrc(`https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`);
                                        }
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                                    <span className="text-4xl text-gray-200 dark:text-gray-700 font-bold uppercase tracking-widest">
                                        {project.title.substring(0, 2)}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Video on Hover */}
                        {project.youtubeId && (
                            <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                                {isHovering && (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.youtubeId}`}
                                        title={project.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        className="w-full h-full object-cover pointer-events-none"
                                    />
                                )}
                            </div>
                        )}

                        {/* Overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                    </div>
                </div>

                <div className="mt-5 px-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand transition-colors duration-300">
                                {project.title}
                            </h3>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                                {project.type || 'Shopify Store'}
                            </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </a>
        </motion.div>
    );
};

export default ShopifyProjectCard;
