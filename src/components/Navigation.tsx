'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navigationItems = [
        { name: 'About', href: '#root', description: 'Core identity' },
        { name: 'Education', href: '#education', description: 'PhD journey' },
        { name: 'AI Systems', href: '#datascience', description: 'Technical expertise' },
        { name: 'Projects', href: '#projects', description: 'Portfolio showcase' },
    ]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false)

        if (href === '#root') {
            // Scroll to top and focus on root node
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else if (href === '#projects') {
            // Scroll to decision tree area
            const heroHeight = window.innerHeight * 0.6
            window.scrollTo({ top: heroHeight, behavior: 'smooth' })
        } else {
            // Scroll to decision tree for other nodes
            const heroHeight = window.innerHeight * 0.4
            window.scrollTo({ top: heroHeight, behavior: 'smooth' })
        }
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-deep-slate/95 backdrop-blur-md border-b border-decision-green/20'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Name */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center"
                    >
                        <button
                            onClick={() => handleNavClick('#root')}
                            className="text-xl font-bold text-decision-green hover:text-choice-orange transition-colors"
                        >
                            Xiaoyue Zhu
                        </button>
                        <span className="ml-3 text-xs text-warm-gray hidden sm:block">
                            🌟 World's First Decision Tree Portfolio
                        </span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navigationItems.map((item) => (
                                <motion.button
                                    key={item.name}
                                    onClick={() => handleNavClick(item.href)}
                                    className="relative text-warm-gray hover:text-white px-3 py-2 text-sm font-medium decision-branch group"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ y: 0 }}
                                >
                                    <div className="flex flex-col items-center">
                                        <span>{item.name}</span>
                                        <span className="text-xs text-warm-gray/70 group-hover:text-decision-green transition-colors">
                                            {item.description}
                                        </span>
                                    </div>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-decision-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-warm-gray hover:text-decision-green focus:outline-none focus:text-decision-green"
                            aria-label="Toggle mobile menu"
                        >
                            <motion.div
                                animate={isMobileMenuOpen ? { rotate: 45 } : { rotate: 0 }}
                                className="w-6 h-6 relative"
                            >
                                <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                                    }`} />
                                <span className={`absolute block h-0.5 w-6 bg-current transition duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                                    }`} />
                                <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                                    }`} />
                            </motion.div>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-decision-green/20"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1 bg-deep-slate/90 backdrop-blur-md">
                                <div className="text-xs text-decision-green font-semibold px-3 py-2 border-b border-white/10 mb-2">
                                    Decision Tree Navigation
                                </div>
                                {navigationItems.map((item, index) => (
                                    <motion.button
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleNavClick(item.href)}
                                        className="block text-warm-gray hover:text-decision-green px-3 py-2 text-base font-medium w-full text-left decision-branch"
                                    >
                                        <div>
                                            <div className="font-medium">{item.name}</div>
                                            <div className="text-xs text-warm-gray/70">{item.description}</div>
                                        </div>
                                    </motion.button>
                                ))}

                                <div className="px-3 py-2 mt-4 border-t border-white/10">
                                    <div className="text-xs text-warm-gray">
                                        💡 Tip: Explore decision nodes by clicking on them
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
}

export default Navigation 