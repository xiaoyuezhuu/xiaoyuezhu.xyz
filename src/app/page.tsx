'use client'

import { useState, useEffect } from 'react'
import HeroSection from '@/components/HeroSection'

function EducationOverlay() {
    const [position, setPosition] = useState({ top: 200, left: 500 })
    const [isVisible, setIsVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const updatePosition = () => {
            // Calculate where the education node appears in the canvas
            const canvasHeight = window.innerHeight * 4 // Canvas is 4x viewport height
            const educationNodeY = (canvasHeight / 6) * 1.6 // Education node at 2/6 down the canvas (second layer)

            // Convert to viewport position based on scroll
            const scrollY = window.scrollY
            const viewportEducationY = educationNodeY - scrollY

            // Show text when education node is in viewport (with some margin)
            const isEducationVisible = viewportEducationY > -100 && viewportEducationY < window.innerHeight + 100
            setIsVisible(isEducationVisible)

            if (isEducationVisible) {
                setPosition({
                    top: Math.max(30, Math.min(window.innerHeight - 100, viewportEducationY)),
                    left: window.innerWidth / 2 - 150 // Left side of center
                })
            }
        }

        // Listen for education node clicks
        const handleEducationClick = (event: Event) => {
            const customEvent = event as CustomEvent
            if (customEvent.detail?.nodeType === 'education') {
                setIsExpanded(true)
            }
        }

        updatePosition()
        window.addEventListener('scroll', updatePosition)
        window.addEventListener('resize', updatePosition)
        window.addEventListener('educationNodeClicked', handleEducationClick)

        return () => {
            window.removeEventListener('scroll', updatePosition)
            window.removeEventListener('resize', updatePosition)
            window.removeEventListener('educationNodeClicked', handleEducationClick)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div
            style={{
                position: 'fixed',
                top: `${position.top}px`,
                left: `${position.left}px`,
                zIndex: 50,
                pointerEvents: isExpanded ? 'auto' : 'none',
                transition: 'all 0.3s ease-in-out'
            }}
        >
            {!isExpanded ? (
                // Collapsed state - just the title
                <div style={{
                    color: '#00f5ff',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    whiteSpace: 'nowrap'
                }}>
                    Education
                    <div style={{
                        fontSize: '14px',
                        color: '#a8a8a8',
                        marginTop: '4px',
                        opacity: 0.8
                    }}>
                        Click node to explore
                    </div>
                </div>
            ) : (
                // Expanded state - full card
                <div style={{
                    backgroundColor: 'rgba(26, 26, 46, 0.1)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(0, 245, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '24px',
                    maxWidth: '400px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}>
                    <h2 style={{
                        color: '#00f5ff',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        marginBottom: '16px'
                    }}>
                        Education Journey
                    </h2>
                    <p style={{
                        color: 'white',
                        fontSize: '16px',
                        lineHeight: '1.6',
                        marginBottom: '12px'
                    }}>
                        PhD in Decision Neuroscience from Stanford, researching how the human brain makes complex decisions under uncertainty.
                    </p>
                    <p style={{
                        color: 'white',
                        fontSize: '14px',
                        lineHeight: '1.5'
                    }}>
                        Published 15+ papers on decision-making algorithms, neural networks, and human-AI collaboration in top-tier journals.
                    </p>
                    <button
                        onClick={() => setIsExpanded(false)}
                        style={{
                            marginTop: '16px',
                            padding: '8px 16px',
                            backgroundColor: 'rgba(0, 245, 255, 0.1)',
                            border: '1px solid rgba(0, 245, 255, 0.3)',
                            borderRadius: '8px',
                            color: '#00f5ff',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    )
}

function DataScienceOverlay() {
    const [position, setPosition] = useState({ top: 200, left: 500 })
    const [isVisible, setIsVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const updatePosition = () => {
            // Calculate where the data science node appears in the canvas
            const canvasHeight = window.innerHeight * 4 // Canvas is 4x viewport height
            const dataScienceNodeY = (canvasHeight / 6) * 1.6 // Data science node at same level as education (second layer)

            // Convert to viewport position based on scroll
            const scrollY = window.scrollY
            const viewportDataScienceY = dataScienceNodeY - scrollY

            // Show text when data science node is in viewport (with some margin)
            const isDataScienceVisible = viewportDataScienceY > -100 && viewportDataScienceY < window.innerHeight + 100
            setIsVisible(isDataScienceVisible)

            if (isDataScienceVisible) {
                setPosition({
                    top: Math.max(30, Math.min(window.innerHeight - 100, viewportDataScienceY)),
                    left: window.innerWidth / 2 + 150 // Right side of center
                })
            }
        }

        // Listen for data science node clicks
        const handleDataScienceClick = (event: Event) => {
            const customEvent = event as CustomEvent
            if (customEvent.detail?.nodeType === 'data-science') {
                setIsExpanded(true)
            }
        }

        updatePosition()
        window.addEventListener('scroll', updatePosition)
        window.addEventListener('resize', updatePosition)
        window.addEventListener('dataScienceNodeClicked', handleDataScienceClick)

        return () => {
            window.removeEventListener('scroll', updatePosition)
            window.removeEventListener('resize', updatePosition)
            window.removeEventListener('dataScienceNodeClicked', handleDataScienceClick)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div
            style={{
                position: 'fixed',
                top: `${position.top}px`,
                left: `${position.left}px`,
                zIndex: 50,
                pointerEvents: isExpanded ? 'auto' : 'none',
                transition: 'all 0.3s ease-in-out'
            }}
        >
            {!isExpanded ? (
                // Collapsed state - just the title
                <div style={{
                    color: '#00f5ff',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    whiteSpace: 'nowrap'
                }}>
                    Data Science
                    <div style={{
                        fontSize: '14px',
                        color: '#a8a8a8',
                        marginTop: '4px',
                        opacity: 0.8
                    }}>
                        Click node to explore
                    </div>
                </div>
            ) : (
                // Expanded state - full card
                <div style={{
                    backgroundColor: 'rgba(26, 26, 46, 0.1)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(0, 245, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '24px',
                    maxWidth: '400px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}>
                    <h2 style={{
                        color: '#00f5ff',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        marginBottom: '16px'
                    }}>
                        AI & Data Science
                    </h2>
                    <p style={{
                        color: 'white',
                        fontSize: '16px',
                        lineHeight: '1.6',
                        marginBottom: '12px'
                    }}>
                        Expert in machine learning, neural networks, and AI systems. Building the next generation of decision-making algorithms.
                    </p>
                    <p style={{
                        color: 'white',
                        fontSize: '14px',
                        lineHeight: '1.5'
                    }}>
                        Specializing in reinforcement learning, natural language processing, and human-computer interaction for decision support systems.
                    </p>
                    <button
                        onClick={() => setIsExpanded(false)}
                        style={{
                            marginTop: '16px',
                            padding: '8px 16px',
                            backgroundColor: 'rgba(0, 245, 255, 0.1)',
                            border: '1px solid rgba(0, 245, 255, 0.3)',
                            borderRadius: '8px',
                            color: '#00f5ff',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    )
}

function ProjectOverlay() {
    const [position, setPosition] = useState({ top: 200, left: 500 })
    const [isVisible, setIsVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const updatePosition = () => {
            // Calculate where the project node appears in the canvas
            const canvasHeight = window.innerHeight * 4 // Canvas is 4x viewport height
            const projectNodeY = (canvasHeight / 6) * 2.4 // Project node at 3/6 down the canvas (third layer)

            // Convert to viewport position based on scroll
            const scrollY = window.scrollY
            const viewportProjectY = projectNodeY - scrollY

            // Show text when project node is in viewport (with some margin)
            const isProjectVisible = viewportProjectY > -100 && viewportProjectY < window.innerHeight + 100
            setIsVisible(isProjectVisible)

            if (isProjectVisible) {
                setPosition({
                    top: Math.max(30, Math.min(window.innerHeight - 100, viewportProjectY)),
                    left: window.innerWidth / 4 + 50
                })
            }
        }

        // Listen for project node clicks
        const handleProjectClick = (event: Event) => {
            const customEvent = event as CustomEvent
            if (customEvent.detail?.nodeType === 'project') {
                setIsExpanded(true)
            }
        }

        updatePosition()
        window.addEventListener('scroll', updatePosition)
        window.addEventListener('resize', updatePosition)
        window.addEventListener('projectNodeClicked', handleProjectClick)

        return () => {
            window.removeEventListener('scroll', updatePosition)
            window.removeEventListener('resize', updatePosition)
            window.removeEventListener('projectNodeClicked', handleProjectClick)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div
            style={{
                position: 'fixed',
                top: `${position.top}px`,
                left: `${position.left}px`,
                zIndex: 50,
                pointerEvents: isExpanded ? 'auto' : 'none',
                transition: 'all 0.3s ease-in-out'
            }}
        >
            {!isExpanded ? (
                // Collapsed state - just the title
                <div style={{
                    color: '#00f5ff',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    whiteSpace: 'nowrap'
                }}>
                    Project X
                    <div style={{
                        fontSize: '14px',
                        color: '#a8a8a8',
                        marginTop: '4px',
                        opacity: 0.8
                    }}>
                        Click node to explore
                    </div>
                </div>
            ) : (
                // Expanded state - full card
                <div style={{
                    backgroundColor: 'rgba(26, 26, 46, 0.1)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(0, 245, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '24px',
                    maxWidth: '400px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}>
                    <h2 style={{
                        color: '#00f5ff',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        marginBottom: '16px'
                    }}>
                        Neural Decision Platform
                    </h2>
                    <p style={{
                        color: 'white',
                        fontSize: '16px',
                        lineHeight: '1.6',
                        marginBottom: '12px'
                    }}>
                        Revolutionary AI platform that bridges human intuition with machine learning for complex decision scenarios.
                    </p>
                    <p style={{
                        color: 'white',
                        fontSize: '14px',
                        lineHeight: '1.5'
                    }}>
                        Deployed across Fortune 500 companies, improving decision accuracy by 40% while reducing cognitive load on human operators.
                    </p>
                    <button
                        onClick={() => setIsExpanded(false)}
                        style={{
                            marginTop: '16px',
                            padding: '8px 16px',
                            backgroundColor: 'rgba(0, 245, 255, 0.1)',
                            border: '1px solid rgba(0, 245, 255, 0.3)',
                            borderRadius: '8px',
                            color: '#00f5ff',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    )
}

function ProjectYOverlay() {
    const [position, setPosition] = useState({ top: 200, left: 500 })
    const [isVisible, setIsVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const updatePosition = () => {
            const canvasHeight = window.innerHeight * 4
            const projectNodeY = (canvasHeight / 6) * 2.4
            const scrollY = window.scrollY
            const viewportProjectY = projectNodeY - scrollY
            const isProjectVisible = viewportProjectY > -100 && viewportProjectY < window.innerHeight + 100
            setIsVisible(isProjectVisible)

            if (isProjectVisible) {
                setPosition({
                    top: Math.max(30, Math.min(window.innerHeight - 100, viewportProjectY)),
                    left: window.innerWidth / 4 + 250
                })
            }
        }

        const handleProjectClick = (event: Event) => {
            const customEvent = event as CustomEvent
            if (customEvent.detail?.nodeType === 'projectY') {
                setIsExpanded(true)
            }
        }

        updatePosition()
        window.addEventListener('scroll', updatePosition)
        window.addEventListener('resize', updatePosition)
        window.addEventListener('projectYNodeClicked', handleProjectClick)

        return () => {
            window.removeEventListener('scroll', updatePosition)
            window.removeEventListener('resize', updatePosition)
            window.removeEventListener('projectYNodeClicked', handleProjectClick)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div style={{ position: 'fixed', top: `${position.top}px`, left: `${position.left}px`, zIndex: 50, pointerEvents: isExpanded ? 'auto' : 'none', transition: 'all 0.3s ease-in-out' }}>
            {!isExpanded ? (
                <div style={{ color: '#00f5ff', fontSize: '28px', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', whiteSpace: 'nowrap' }}>
                    Project Y
                    <div style={{ fontSize: '14px', color: '#a8a8a8', marginTop: '4px', opacity: 0.8 }}>Click node to explore</div>
                </div>
            ) : (
                <div style={{ backgroundColor: 'rgba(26, 26, 46, 0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: '12px', padding: '24px', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}>
                    <h2 style={{ color: '#00f5ff', fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>AI Ethics Framework</h2>
                    <p style={{ color: 'white', fontSize: '16px', lineHeight: '1.6', marginBottom: '12px' }}>Comprehensive framework for ethical AI decision-making in healthcare and finance sectors.</p>
                    <p style={{ color: 'white', fontSize: '14px', lineHeight: '1.5' }}>Adopted by 50+ institutions, ensuring responsible AI deployment while maintaining decision accuracy.</p>
                    <button onClick={() => setIsExpanded(false)} style={{ marginTop: '16px', padding: '8px 16px', backgroundColor: 'rgba(0, 245, 255, 0.1)', border: '1px solid rgba(0, 245, 255, 0.3)', borderRadius: '8px', color: '#00f5ff', fontSize: '12px', cursor: 'pointer' }}>Close</button>
                </div>
            )}
        </div>
    )
}

function ProjectZOverlay() {
    const [position, setPosition] = useState({ top: 200, left: 500 })
    const [isVisible, setIsVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const updatePosition = () => {
            const canvasHeight = window.innerHeight * 4
            const projectNodeY = (canvasHeight / 6) * 2.4
            const scrollY = window.scrollY
            const viewportProjectY = projectNodeY - scrollY
            const isProjectVisible = viewportProjectY > -100 && viewportProjectY < window.innerHeight + 100
            setIsVisible(isProjectVisible)

            if (isProjectVisible) {
                setPosition({
                    top: Math.max(30, Math.min(window.innerHeight - 100, viewportProjectY)),
                    left: window.innerWidth / 4 + 500
                })
            }
        }

        const handleProjectClick = (event: Event) => {
            const customEvent = event as CustomEvent
            if (customEvent.detail?.nodeType === 'projectZ') {
                setIsExpanded(true)
            }
        }

        updatePosition()
        window.addEventListener('scroll', updatePosition)
        window.addEventListener('resize', updatePosition)
        window.addEventListener('projectZNodeClicked', handleProjectClick)

        return () => {
            window.removeEventListener('scroll', updatePosition)
            window.removeEventListener('resize', updatePosition)
            window.removeEventListener('projectZNodeClicked', handleProjectClick)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div style={{ position: 'fixed', top: `${position.top}px`, left: `${position.left}px`, zIndex: 50, pointerEvents: isExpanded ? 'auto' : 'none', transition: 'all 0.3s ease-in-out' }}>
            {!isExpanded ? (
                <div style={{ color: '#00f5ff', fontSize: '28px', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', whiteSpace: 'nowrap' }}>
                    Project Z
                    <div style={{ fontSize: '14px', color: '#a8a8a8', marginTop: '4px', opacity: 0.8 }}>Click node to explore</div>
                </div>
            ) : (
                <div style={{ backgroundColor: 'rgba(26, 26, 46, 0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: '12px', padding: '24px', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}>
                    <h2 style={{ color: '#00f5ff', fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>Quantum Decision Optimizer</h2>
                    <p style={{ color: 'white', fontSize: '16px', lineHeight: '1.6', marginBottom: '12px' }}>Next-generation quantum computing approach to solve complex multi-variable decision problems.</p>
                    <p style={{ color: 'white', fontSize: '14px', lineHeight: '1.5' }}>Processing 1000x faster than classical algorithms, enabling real-time optimization for global supply chains.</p>
                    <button onClick={() => setIsExpanded(false)} style={{ marginTop: '16px', padding: '8px 16px', backgroundColor: 'rgba(0, 245, 255, 0.1)', border: '1px solid rgba(0, 245, 255, 0.3)', borderRadius: '8px', color: '#00f5ff', fontSize: '12px', cursor: 'pointer' }}>Close</button>
                </div>
            )}
        </div>
    )
}

function ProjectAOverlay() {
    const [position, setPosition] = useState({ top: 200, left: 500 })
    const [isVisible, setIsVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const updatePosition = () => {
            const canvasHeight = window.innerHeight * 4
            const projectNodeY = (canvasHeight / 6) * 2.4
            const scrollY = window.scrollY
            const viewportProjectY = projectNodeY - scrollY
            const isProjectVisible = viewportProjectY > -100 && viewportProjectY < window.innerHeight + 100
            setIsVisible(isProjectVisible)

            if (isProjectVisible) {
                setPosition({
                    top: Math.max(30, Math.min(window.innerHeight - 100, viewportProjectY)),
                    left: window.innerWidth / 2 + 25
                })
            }
        }

        const handleProjectClick = (event: Event) => {
            const customEvent = event as CustomEvent
            if (customEvent.detail?.nodeType === 'projectA') {
                setIsExpanded(true)
            }
        }

        updatePosition()
        window.addEventListener('scroll', updatePosition)
        window.addEventListener('resize', updatePosition)
        window.addEventListener('projectANodeClicked', handleProjectClick)

        return () => {
            window.removeEventListener('scroll', updatePosition)
            window.removeEventListener('resize', updatePosition)
            window.removeEventListener('projectANodeClicked', handleProjectClick)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div style={{ position: 'fixed', top: `${position.top}px`, left: `${position.left}px`, zIndex: 50, pointerEvents: isExpanded ? 'auto' : 'none', transition: 'all 0.3s ease-in-out' }}>
            {!isExpanded ? (
                <div style={{ color: '#00f5ff', fontSize: '28px', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', whiteSpace: 'nowrap' }}>
                    Project A
                    <div style={{ fontSize: '14px', color: '#a8a8a8', marginTop: '4px', opacity: 0.8 }}>Click node to explore</div>
                </div>
            ) : (
                <div style={{ backgroundColor: 'rgba(26, 26, 46, 0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: '12px', padding: '24px', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}>
                    <h2 style={{ color: '#00f5ff', fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>Behavioral Prediction Engine</h2>
                    <p style={{ color: 'white', fontSize: '16px', lineHeight: '1.6', marginBottom: '12px' }}>Advanced behavioral modeling system predicting human decision patterns with 95% accuracy.</p>
                    <p style={{ color: 'white', fontSize: '14px', lineHeight: '1.5' }}>Used by leading e-commerce platforms to personalize user experiences and optimize conversion rates.</p>
                    <button onClick={() => setIsExpanded(false)} style={{ marginTop: '16px', padding: '8px 16px', backgroundColor: 'rgba(0, 245, 255, 0.1)', border: '1px solid rgba(0, 245, 255, 0.3)', borderRadius: '8px', color: '#00f5ff', fontSize: '12px', cursor: 'pointer' }}>Close</button>
                </div>
            )}
        </div>
    )
}

function ProjectBOverlay() {
    const [position, setPosition] = useState({ top: 200, left: 500 })
    const [isVisible, setIsVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const updatePosition = () => {
            const canvasHeight = window.innerHeight * 4
            const projectNodeY = (canvasHeight / 6) * 2.4
            const scrollY = window.scrollY
            const viewportProjectY = projectNodeY - scrollY
            const isProjectVisible = viewportProjectY > -100 && viewportProjectY < window.innerHeight + 100
            setIsVisible(isProjectVisible)

            if (isProjectVisible) {
                setPosition({
                    top: Math.max(30, Math.min(window.innerHeight - 100, viewportProjectY)),
                    left: window.innerWidth / 1.5 - 165
                })
            }
        }

        const handleProjectClick = (event: Event) => {
            const customEvent = event as CustomEvent
            if (customEvent.detail?.nodeType === 'projectB') {
                setIsExpanded(true)
            }
        }

        updatePosition()
        window.addEventListener('scroll', updatePosition)
        window.addEventListener('resize', updatePosition)
        window.addEventListener('projectBNodeClicked', handleProjectClick)

        return () => {
            window.removeEventListener('scroll', updatePosition)
            window.removeEventListener('resize', updatePosition)
            window.removeEventListener('projectBNodeClicked', handleProjectClick)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div style={{ position: 'fixed', top: `${position.top}px`, left: `${position.left}px`, zIndex: 50, pointerEvents: isExpanded ? 'auto' : 'none', transition: 'all 0.3s ease-in-out' }}>
            {!isExpanded ? (
                <div style={{ color: '#00f5ff', fontSize: '28px', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', whiteSpace: 'nowrap' }}>
                    Project B
                    <div style={{ fontSize: '14px', color: '#a8a8a8', marginTop: '4px', opacity: 0.8 }}>Click node to explore</div>
                </div>
            ) : (
                <div style={{ backgroundColor: 'rgba(26, 26, 46, 0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: '12px', padding: '24px', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}>
                    <h2 style={{ color: '#00f5ff', fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>Autonomous Decision System</h2>
                    <p style={{ color: 'white', fontSize: '16px', lineHeight: '1.6', marginBottom: '12px' }}>Self-learning autonomous system for critical infrastructure decision-making in smart cities.</p>
                    <p style={{ color: 'white', fontSize: '14px', lineHeight: '1.5' }}>Managing traffic flow, energy distribution, and emergency response across 12 major metropolitan areas.</p>
                    <button onClick={() => setIsExpanded(false)} style={{ marginTop: '16px', padding: '8px 16px', backgroundColor: 'rgba(0, 245, 255, 0.1)', border: '1px solid rgba(0, 245, 255, 0.3)', borderRadius: '8px', color: '#00f5ff', fontSize: '12px', cursor: 'pointer' }}>Close</button>
                </div>
            )}
        </div>
    )
}

function ProjectCOverlay() {
    const [position, setPosition] = useState({ top: 200, left: 500 })
    const [isVisible, setIsVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const updatePosition = () => {
            const canvasHeight = window.innerHeight * 4
            const projectNodeY = (canvasHeight / 6) * 2.4
            const scrollY = window.scrollY
            const viewportProjectY = projectNodeY - scrollY
            const isProjectVisible = viewportProjectY > -100 && viewportProjectY < window.innerHeight + 100
            setIsVisible(isProjectVisible)

            if (isProjectVisible) {
                setPosition({
                    top: Math.max(30, Math.min(window.innerHeight - 100, viewportProjectY)),
                    left: window.innerWidth / 1.5
                })
            }
        }

        const handleProjectClick = (event: Event) => {
            const customEvent = event as CustomEvent
            if (customEvent.detail?.nodeType === 'projectC') {
                setIsExpanded(true)
            }
        }

        updatePosition()
        window.addEventListener('scroll', updatePosition)
        window.addEventListener('resize', updatePosition)
        window.addEventListener('projectCNodeClicked', handleProjectClick)

        return () => {
            window.removeEventListener('scroll', updatePosition)
            window.removeEventListener('resize', updatePosition)
            window.removeEventListener('projectCNodeClicked', handleProjectClick)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div style={{ position: 'fixed', top: `${position.top}px`, left: `${position.left}px`, zIndex: 50, pointerEvents: isExpanded ? 'auto' : 'none', transition: 'all 0.3s ease-in-out' }}>
            {!isExpanded ? (
                <div style={{ color: '#00f5ff', fontSize: '28px', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', whiteSpace: 'nowrap' }}>
                    Project C
                    <div style={{ fontSize: '14px', color: '#a8a8a8', marginTop: '4px', opacity: 0.8 }}>Click node to explore</div>
                </div>
            ) : (
                <div style={{ backgroundColor: 'rgba(26, 26, 46, 0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: '12px', padding: '24px', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}>
                    <h2 style={{ color: '#00f5ff', fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>Collective Intelligence Hub</h2>
                    <p style={{ color: 'white', fontSize: '16px', lineHeight: '1.6', marginBottom: '12px' }}>Revolutionary platform combining crowd wisdom with AI to solve global challenges through distributed decision-making.</p>
                    <p style={{ color: 'white', fontSize: '14px', lineHeight: '1.5' }}>Coordinating 100,000+ experts worldwide for climate policy, pandemic response, and economic strategy decisions.</p>
                    <button onClick={() => setIsExpanded(false)} style={{ marginTop: '16px', padding: '8px 16px', backgroundColor: 'rgba(0, 245, 255, 0.1)', border: '1px solid rgba(0, 245, 255, 0.3)', borderRadius: '8px', color: '#00f5ff', fontSize: '12px', cursor: 'pointer' }}>Close</button>
                </div>
            )}
        </div>
    )
}

function DecisionArchitectOverlay() {
    const [position, setPosition] = useState({ top: 200, left: 500 })
    const [isVisible, setIsVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

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
                    top: Math.max(30, Math.min(window.innerHeight - 100, viewportRootY - 120)),
                    left: window.innerWidth / 2 + 50
                })
            }
        }

        // Listen for root node clicks
        const handleRootClick = (event: Event) => {
            const customEvent = event as CustomEvent
            if (customEvent.detail?.nodeType === 'root') {
                setIsExpanded(true)
            }
        }

        updatePosition()
        window.addEventListener('scroll', updatePosition)
        window.addEventListener('resize', updatePosition)
        window.addEventListener('rootNodeClicked', handleRootClick)

        return () => {
            window.removeEventListener('scroll', updatePosition)
            window.removeEventListener('resize', updatePosition)
            window.removeEventListener('rootNodeClicked', handleRootClick)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div
            style={{
                position: 'fixed',
                top: `${position.top}px`,
                left: `${position.left}px`,
                zIndex: 50,
                pointerEvents: isExpanded ? 'auto' : 'none',
                transition: 'all 0.3s ease-in-out'
            }}
        >
            {!isExpanded ? (
                // Collapsed state - just the title
                <div style={{
                    color: '#00f5ff',
                    fontSize: '32px',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    whiteSpace: 'nowrap'
                }}>
                    Decision Architect
                    <div style={{
                        fontSize: '14px',
                        color: '#a8a8a8',
                        marginTop: '4px',
                        opacity: 0.8
                    }}>
                        Click node to explore
                    </div>
                </div>
            ) : (
                // Expanded state - full card
                <div style={{
                    backgroundColor: 'rgba(26, 26, 46, 0.1)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(0, 245, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '24px',
                    maxWidth: '400px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}>
                    <h2 style={{
                        color: '#00f5ff',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        marginBottom: '16px'
                    }}>
                        The Decision Architect
                    </h2>
                    <p style={{
                        color: 'white',
                        fontSize: '16px',
                        lineHeight: '1.6',
                        marginBottom: '12px'
                    }}>
                        I bridge the $3 trillion gap between how humans make decisions and how AI can make them better.
                    </p>
                    <p style={{
                        color: 'white',
                        fontSize: '14px',
                        lineHeight: '1.5'
                    }}>
                        The only researcher building the future of human-AI decision collaboration, where neuroscience research meets practical decision technology.
                    </p>
                    <button
                        onClick={() => setIsExpanded(false)}
                        style={{
                            marginTop: '16px',
                            padding: '8px 16px',
                            backgroundColor: 'rgba(0, 245, 255, 0.1)',
                            border: '1px solid rgba(0, 245, 255, 0.3)',
                            borderRadius: '8px',
                            color: '#00f5ff',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    )
}

export default function Home() {
    return (
        <div className="min-h-screen bg-decision-gradient">
            <HeroSection />

            <DecisionArchitectOverlay />
            <EducationOverlay />
            <DataScienceOverlay />
            <ProjectOverlay />
            <ProjectYOverlay />
            <ProjectZOverlay />
            <ProjectAOverlay />
            <ProjectBOverlay />
            <ProjectCOverlay />

            {/* Footer with additional navigation - positioned below the decision tree */}
            <footer className="bg-slate-900 text-white py-8">
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