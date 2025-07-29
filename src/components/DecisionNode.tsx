'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface NodeData {
    id: string
    type: 'root' | 'education' | 'datascience' | 'project'
    title: string
    description?: string
    position: { x: number; y: number }
    content?: React.ReactNode
    projectData?: {
        title: string
        subtitle: string
        tags: string[]
        description: string
        technologies: string[]
        metrics?: string[]
        links?: { label: string; url: string }[]
        media?: string[]
    }
}

interface DecisionNodeProps {
    node: NodeData
    isActive: boolean
    isVisited: boolean
    onNodeClick: (nodeId: string) => void
    onNodeHover: (nodeId: string | null) => void
    scale?: number
    showContent?: boolean
}

export default function DecisionNode({
    node,
    isActive,
    isVisited,
    onNodeClick,
    onNodeHover,
    scale = 1,
    showContent = false
}: DecisionNodeProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const nodeRef = useRef<HTMLDivElement>(null)

    const handleClick = () => {
        onNodeClick(node.id)
        if (node.type === 'project') {
            setIsExpanded(!isExpanded)
        }
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
        onNodeHover(node.id)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        onNodeHover(null)
    }

    // Dynamic sizing based on node type
    const getNodeSize = () => {
        switch (node.type) {
            case 'root': return 16 * scale
            case 'education':
            case 'datascience': return 12 * scale
            case 'project': return 8 * scale
            default: return 8 * scale
        }
    }

    // Dynamic colors based on node type and state
    const getNodeColors = () => {
        const baseColors = {
            root: { main: '#00f5ff', glow: '#00f5ff' },
            education: { main: '#6c5ce7', glow: '#6c5ce7' },
            datascience: { main: '#ff6b35', glow: '#ff6b35' },
            project: { main: '#00f5ff', glow: '#00f5ff' }
        }

        const colors = baseColors[node.type]
        const alpha = isActive ? 0.9 : isVisited ? 0.7 : isHovered ? 0.8 : 0.6

        return {
            main: `${colors.main}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`,
            glow: `${colors.glow}${Math.floor(alpha * 0.4 * 255).toString(16).padStart(2, '0')}`
        }
    }

    const nodeSize = getNodeSize()
    const colors = getNodeColors()

    return (
        <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{
                left: `${node.position.x}px`,
                top: `${node.position.y}px`
            }}
        >
            {/* Main Node */}
            <motion.div
                ref={nodeRef}
                className="relative cursor-pointer z-20"
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    scale: isActive ? 1.2 : 1,
                    rotateZ: isHovered ? 180 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >
                {/* Node Glow Effect */}
                <motion.div
                    className="absolute inset-0 rounded-full blur-md pointer-events-none"
                    style={{
                        backgroundColor: colors.glow,
                        width: nodeSize * 2,
                        height: nodeSize * 2,
                        left: -nodeSize / 2,
                        top: -nodeSize / 2
                    }}
                    animate={{
                        scale: isHovered ? 1.5 : 1,
                        opacity: isHovered ? 0.8 : 0.4
                    }}
                />

                {/* Main Node Circle */}
                <motion.div
                    className="relative rounded-full border-2 border-white/20 backdrop-blur-sm z-20"
                    style={{
                        backgroundColor: colors.main,
                        width: nodeSize,
                        height: nodeSize,
                        boxShadow: `0 0 ${nodeSize / 2}px ${colors.glow}`
                    }}
                    animate={{
                        borderColor: isActive ? '#ffffff' : 'rgba(255,255,255,0.2)'
                    }}
                >
                    {/* Node Icon/Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {node.type === 'root' && (
                            <motion.div
                                className="w-4 h-4 bg-white rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        )}
                        {(node.type === 'education' || node.type === 'datascience') && (
                            <div className="w-3 h-3 bg-white rounded-full opacity-90" />
                        )}
                        {node.type === 'project' && (
                            <motion.div
                                className="w-2 h-2 bg-white rounded-full"
                                animate={{
                                    scale: isVisited ? [1, 1.1, 1] : 1,
                                    opacity: isVisited ? 1 : 0.7
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        )}
                    </div>
                </motion.div>

                {/* Hover Title Preview */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 
                         bg-deep-slate/95 backdrop-blur-md border border-decision-green/20 
                         rounded-lg px-3 py-2 text-sm text-white whitespace-nowrap z-40"
                        >
                            <div className="font-medium text-decision-green">{node.title}</div>
                            {node.description && (
                                <div className="text-xs text-warm-gray mt-1">{node.description}</div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Content Area - Positioned relative to node */}
            <AnimatePresence>
                {showContent && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="absolute z-50 pointer-events-auto bg-red-500/90 border-4 border-yellow-400 rounded-lg p-6 shadow-2xl"
                        style={{
                            top: '60px',
                            left: '-150px',
                            width: '300px',
                            maxWidth: '90vw'
                        }}
                    >
                        {node.type === 'root' && <AboutContent />}
                        {node.type === 'education' && <EducationContent />}
                        {node.type === 'datascience' && <DataScienceContent />}
                        {node.type === 'project' && node.projectData && (
                            <ProjectCard
                                data={node.projectData}
                                isExpanded={isExpanded}
                                onToggle={() => setIsExpanded(!isExpanded)}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// Content Components
export function AboutContent() {
    return (
        <motion.div
            className="bg-deep-slate/95 backdrop-blur-md border border-decision-green/20 rounded-xl p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h2 className="text-2xl font-bold text-decision-green mb-4">The Decision Architect</h2>
            <p className="text-warm-gray mb-3">
                I bridge the $3 trillion gap between how humans make decisions and how AI can make them better.
            </p>
            <p className="text-warm-gray">
                The only researcher building the future of human-AI decision collaboration,
                where neuroscience research meets practical decision technology.
            </p>
        </motion.div>
    )
}

export function EducationContent() {
    return (
        <motion.div
            className="bg-neural-purple/10 backdrop-blur-md border border-neural-purple/30 rounded-xl p-5 text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
        >
            <h3 className="text-xl font-bold text-neural-purple mb-3">PhD in Decision Science</h3>
            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neural-purple rounded-full"></div>
                    <span>Neural pathways of choice</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neural-purple rounded-full"></div>
                    <span>Decision architecture research</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neural-purple rounded-full"></div>
                    <span>Cognitive bias mechanisms</span>
                </div>
            </div>
        </motion.div>
    )
}

export function DataScienceContent() {
    return (
        <motion.div
            className="bg-choice-orange/10 backdrop-blur-md border border-choice-orange/30 rounded-xl p-5 text-white"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
        >
            <h3 className="text-xl font-bold text-choice-orange mb-3">AI Decision Systems</h3>
            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-choice-orange rounded-full"></div>
                    <span>Decision optimization algorithms</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-choice-orange rounded-full"></div>
                    <span>Reinforcement learning</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-choice-orange rounded-full"></div>
                    <span>Choice prediction models</span>
                </div>
            </div>
        </motion.div>
    )
}

export function ProjectCard({
    data,
    isExpanded,
    onToggle
}: {
    data: NodeData['projectData']
    isExpanded: boolean
    onToggle: () => void
}) {
    if (!data) return null

    return (
        <motion.div
            className="bg-white/5 backdrop-blur-md border border-decision-green/20 rounded-xl overflow-hidden"
            animate={{
                width: isExpanded ? '500px' : '300px',
                height: isExpanded ? 'auto' : '120px'
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-decision-green">{data.title}</h4>
                    <motion.button
                        onClick={onToggle}
                        className="text-warm-gray hover:text-white transition-colors"
                        whileHover={{ rotate: 180 }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </motion.button>
                </div>

                <p className="text-sm text-warm-gray mb-3">{data.subtitle}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                    {data.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-decision-green/20 text-decision-green text-xs rounded">
                            {tag}
                        </span>
                    ))}
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-white/10 pt-3 mt-3"
                        >
                            <p className="text-sm text-white mb-4">{data.description}</p>

                            {data.technologies && (
                                <div className="mb-4">
                                    <h5 className="text-xs font-semibold text-decision-green mb-2">Technologies</h5>
                                    <div className="flex flex-wrap gap-1">
                                        {data.technologies.map((tech, index) => (
                                            <span key={index} className="px-2 py-1 bg-white/10 text-white text-xs rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {data.links && (
                                <div className="flex gap-2">
                                    {data.links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            className="px-3 py-1 bg-choice-orange/20 text-choice-orange text-xs rounded hover:bg-choice-orange/30 transition-colors"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
} 