'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import DecisionTreeContainer from './DecisionTreeContainer'

const HeroSection = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [containerSize, setContainerSize] = useState({ width: 1200, height: 800 })
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            })
        }

        const handleResize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                setContainerSize({ width: rect.width, height: rect.height })
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('resize', handleResize)

        // Initial size setup
        handleResize()

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    }

    const scrollToExplore = () => {
        // Scroll down to better see the decision tree
        const heroHeight = window.innerHeight * 0.4
        window.scrollTo({ top: heroHeight, behavior: 'smooth' })
    }

    return (
        <section id="top" className="relative w-full min-h-screen flex flex-col overflow-hidden">
            {/* Hero Content - Upper Section */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-20 flex flex-col items-center justify-center pt-20 pb-8 px-4 sm:px-6 lg:px-8"
            >
                <motion.h1
                    variants={itemVariants}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center"
                >
                    <span className="text-white">XIAOYUE</span>{' '}
                    <span className="text-decision-green">ZHU</span>
                </motion.h1>

                <motion.div
                    variants={itemVariants}
                    className="text-lg sm:text-xl lg:text-2xl text-warm-gray mb-4 text-center"
                >
                    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
                        <span className="bg-neural-purple/20 px-3 py-1 rounded-full text-white font-medium">
                            Decision Scientist
                        </span>
                        <span className="text-decision-green">•</span>
                        <span className="bg-electric-blue/30 px-3 py-1 rounded-full text-white font-medium">
                            PhD Candidate
                        </span>
                        <span className="text-decision-green">•</span>
                        <span className="bg-choice-orange/20 px-3 py-1 rounded-full text-white font-medium">
                            AI Founder
                        </span>
                    </div>
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="text-base sm:text-lg text-warm-gray max-w-2xl mx-auto mb-8 leading-relaxed text-center"
                >
                    Bridging the gap between how the brain makes choices and how AI can enhance human decision-making.
                    <span className="text-decision-green font-medium"> Explore my journey through the decision tree below.</span>
                </motion.p>

                <motion.button
                    variants={itemVariants}
                    onClick={scrollToExplore}
                    className="group inline-flex items-center gap-2 text-decision-green hover:text-choice-orange transition-colors mb-8"
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 0 }}
                >
                    <span className="text-base font-medium">Explore the decision tree</span>
                    <motion.svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </motion.svg>
                </motion.button>
            </motion.div>

            {/* Revolutionary Decision Tree Section */}
            <div
                ref={containerRef}
                className="relative flex-1 h-[800px] w-full bg-blue-500/20 border-4 border-green-400"
            >
                <DecisionTreeContainer
                    mousePosition={mousePosition}
                    containerWidth={containerSize.width}
                    containerHeight={containerSize.height}
                />

                {/* Instructional Overlay */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3 }}
                    className="absolute bottom-4 left-4 bg-deep-slate/90 backdrop-blur-md border border-decision-green/20 rounded-lg p-4 text-white z-30 max-w-sm"
                >
                    <h3 className="text-sm font-bold text-decision-green mb-2">🌟 World's First Decision Tree Portfolio</h3>
                    <p className="text-xs text-warm-gray mb-2">
                        Click on the decision nodes to explore my journey from neuroscience research to AI innovation.
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-decision-green rounded-full animate-pulse"></div>
                        <span className="text-decision-green">Interactive nodes contain content</span>
                    </div>
                </motion.div>
            </div>

            {/* Gradient Overlay for Better Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-decision-gradient via-transparent to-deep-slate/50 pointer-events-none" />
        </section>
    )
}

export default HeroSection 