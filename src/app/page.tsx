'use client'

import { useState, useEffect } from 'react'
import HeroSection from '@/components/HeroSection'

function DecisionArchitectOverlay() {
    const [position, setPosition] = useState({ top: 200, left: 500 })
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const updatePosition = () => {
            // Calculate where the root node appears in the canvas
            const canvasHeight = window.innerHeight * 4 // Canvas is 4x viewport height
            const rootNodeY = canvasHeight / 6 // Root node at 1/6 down the canvas

            // Convert to viewport position based on scroll
            const scrollY = window.scrollY
            const viewportRootY = rootNodeY - scrollY

            // Show text when root node is in viewport (with some margin)
            const isRootVisible = viewportRootY > -100 && viewportRootY < window.innerHeight + 100
            setIsVisible(isRootVisible)

            if (isRootVisible) {
                setPosition({
                    top: Math.max(50, Math.min(window.innerHeight - 100, viewportRootY)),
                    left: window.innerWidth / 2 + 80
                })
            }
        }

        updatePosition()
        window.addEventListener('scroll', updatePosition)
        window.addEventListener('resize', updatePosition)

        return () => {
            window.removeEventListener('scroll', updatePosition)
            window.removeEventListener('resize', updatePosition)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div
            style={{
                position: 'fixed',
                top: `${position.top}px`,
                left: `${position.left}px`,
                color: '#00f5ff',
                fontSize: '32px',
                fontWeight: 'bold',
                zIndex: 50,
                pointerEvents: 'none',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                whiteSpace: 'nowrap',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
            }}
        >
            Decision Architect
            <div style={{
                fontSize: '14px',
                color: '#a8a8a8',
                marginTop: '4px',
                opacity: 0.8
            }}>
                Click to explore →
            </div>
        </div>
    )
}

export default function Home() {
    return (
        <div className="min-h-screen bg-decision-gradient">
            <HeroSection />

            {/* Decision Architect Text Overlay */}
            <DecisionArchitectOverlay />

            {/* Footer with additional navigation - positioned below the decision tree */}
            <footer className="relative bg-deep-slate/95 border-t border-decision-green/20 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-lg font-bold text-decision-green mb-4">
                        Ready to explore decision-making innovation?
                    </h3>
                    <p className="text-warm-gray mb-6">
                        This portfolio represents the first-ever decision tree-integrated content experience.
                        Every interaction demonstrates the principles of choice architecture and decision optimization.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="mailto:hello@xiaoyuezhu.xyz"
                            className="px-6 py-3 bg-choice-orange/20 text-choice-orange rounded-lg hover:bg-choice-orange/30 transition-colors"
                        >
                            Let's Connect
                        </a>
                        <a
                            href="#"
                            className="px-6 py-3 bg-decision-green/20 text-decision-green rounded-lg hover:bg-decision-green/30 transition-colors"
                        >
                            Download CV
                        </a>
                        <a
                            href="#"
                            className="px-6 py-3 bg-neural-purple/20 text-neural-purple rounded-lg hover:bg-neural-purple/30 transition-colors"
                        >
                            Research Papers
                        </a>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 text-xs text-warm-gray">
                        <p>© 2024 Xiaoyue Zhu • Decision Scientist • AI Innovation Pioneer</p>
                        <p className="mt-2">
                            🌟 <span className="text-decision-green">World's first decision tree-integrated portfolio</span> •
                            Built with Next.js, TypeScript, and revolutionary UX thinking
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
} 