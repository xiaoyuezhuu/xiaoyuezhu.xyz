'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import DecisionNode, { NodeData } from './DecisionNode'
import NeuralDecisionBackground from './NeuralDecisionBackground'

interface DecisionTreeState {
    activeNodeId: string | null
    visitedNodes: Set<string>
    hoveredNodeId: string | null
    showContent: { [key: string]: boolean }
}

interface DecisionTreeContainerProps {
    mousePosition: { x: number; y: number }
    containerWidth: number
    containerHeight: number
}

export default function DecisionTreeContainer({
    mousePosition,
    containerWidth,
    containerHeight
}: DecisionTreeContainerProps) {
    const [treeState, setTreeState] = useState<DecisionTreeState>({
        activeNodeId: null,
        visitedNodes: new Set(),
        hoveredNodeId: null,
        showContent: {}
    })

    // Generate node positions based on container size
    const nodePositions = useMemo(() => {
        const centerX = containerWidth / 2
        const layerHeight = containerHeight / 4

        return {
            // Layer 1: Root node
            root: { x: centerX, y: layerHeight },

            // Layer 2: Education & Data Science nodes
            education: { x: centerX - 150, y: layerHeight * 2 },
            datascience: { x: centerX + 150, y: layerHeight * 2 },

            // Layer 3: Project nodes (6 nodes)
            project1: { x: centerX - 300, y: layerHeight * 3 },
            project2: { x: centerX - 180, y: layerHeight * 3 },
            project3: { x: centerX - 60, y: layerHeight * 3 },
            project4: { x: centerX + 60, y: layerHeight * 3 },
            project5: { x: centerX + 180, y: layerHeight * 3 },
            project6: { x: centerX + 300, y: layerHeight * 3 }
        }
    }, [containerWidth, containerHeight])

    // Define all decision tree nodes
    const nodes: NodeData[] = useMemo(() => [
        // Root Node
        {
            id: 'root',
            type: 'root',
            title: 'The Decision Architect',
            description: 'Core identity and vision',
            position: nodePositions.root
        },

        // Second Layer - Foundation Nodes
        {
            id: 'education',
            type: 'education',
            title: 'PhD in Decision Science',
            description: 'Academic journey & research',
            position: nodePositions.education
        },
        {
            id: 'datascience',
            type: 'datascience',
            title: 'AI Decision Systems',
            description: 'Technical expertise & tools',
            position: nodePositions.datascience
        },

        // Third Layer - Project Showcase Nodes
        {
            id: 'project1',
            type: 'project',
            title: 'Neural Decision Pathways',
            description: 'Core PhD research',
            position: nodePositions.project1,
            projectData: {
                title: 'Neural Decision Pathways Research',
                subtitle: 'Core PhD work on brain choice mechanisms',
                tags: ['Neuroscience', 'fMRI', 'Decision Theory'],
                description: 'Investigating how neural pathways in the brain process complex decisions and the role of cognitive biases in choice architecture. This research forms the foundation of my AI decision-making approach.',
                technologies: ['Python', 'MATLAB', 'fMRI Analysis', 'Statistical Modeling'],
                links: [
                    { label: 'Research Paper', url: '#' },
                    { label: 'Dataset', url: '#' }
                ]
            }
        },
        {
            id: 'project2',
            type: 'project',
            title: 'AI Decision Optimizer',
            description: 'Algorithm for better choices',
            position: nodePositions.project2,
            projectData: {
                title: 'AI Decision Optimization Algorithm',
                subtitle: 'Algorithm that improves business decision outcomes',
                tags: ['Machine Learning', 'Optimization', 'Decision Trees'],
                description: 'A sophisticated AI system that analyzes decision patterns and suggests optimal choices based on historical data, cognitive bias reduction, and outcome prediction.',
                technologies: ['TensorFlow', 'scikit-learn', 'React', 'FastAPI'],
                links: [
                    { label: 'GitHub', url: '#' },
                    { label: 'Demo', url: '#' }
                ]
            }
        },
        {
            id: 'project3',
            type: 'project',
            title: 'Decision-Making Platform',
            description: 'AI-assisted choice startup',
            position: nodePositions.project3,
            projectData: {
                title: 'AI-Assisted Decision Platform',
                subtitle: 'Startup concept for AI-assisted choices',
                tags: ['Startup', 'Product Design', 'Market Research'],
                description: 'A comprehensive platform that combines neuroscience insights with AI technology to help individuals and organizations make better decisions in complex scenarios.',
                technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Vercel'],
                links: [
                    { label: 'Business Plan', url: '#' },
                    { label: 'Prototype', url: '#' }
                ]
            }
        },
        {
            id: 'project4',
            type: 'project',
            title: 'Choice Architecture Papers',
            description: 'Published research',
            position: nodePositions.project4,
            projectData: {
                title: 'Choice Architecture Research Papers',
                subtitle: 'Published research on decision frameworks',
                tags: ['Publications', 'Peer Review', 'Academia'],
                description: 'Collection of peer-reviewed publications exploring the intersection of cognitive science, behavioral economics, and practical decision-making applications.',
                technologies: ['LaTeX', 'R', 'SPSS', 'Meta-Analysis'],
                links: [
                    { label: 'Google Scholar', url: '#' },
                    { label: 'ResearchGate', url: '#' }
                ]
            }
        },
        {
            id: 'project5',
            type: 'project',
            title: 'Interactive Decision Demos',
            description: 'Live decision tools',
            position: nodePositions.project5,
            projectData: {
                title: 'Interactive Decision Experiments',
                subtitle: 'Live tools visitors can experiment with',
                tags: ['Interactive', 'Visualization', 'User Experience'],
                description: 'A collection of interactive web applications that demonstrate decision-making concepts and allow users to experience cognitive biases and choice architecture principles firsthand.',
                technologies: ['D3.js', 'React', 'WebGL', 'Node.js'],
                links: [
                    { label: 'Try Demo', url: '#' },
                    { label: 'Source Code', url: '#' }
                ]
            }
        },
        {
            id: 'project6',
            type: 'project',
            title: 'Future Vision & Market',
            description: 'Roadmap for AI decisions',
            position: nodePositions.project6,
            projectData: {
                title: 'Future of Human-AI Decision Collaboration',
                subtitle: 'Roadmap for human-AI decision collaboration',
                tags: ['Vision', 'Market Analysis', 'Future Tech'],
                description: 'Comprehensive analysis of the decision-making technology market, future trends, and the roadmap for building AI systems that enhance rather than replace human judgment.',
                technologies: ['Market Research', 'Trend Analysis', 'Strategic Planning'],
                links: [
                    { label: 'White Paper', url: '#' },
                    { label: 'Market Report', url: '#' }
                ]
            }
        }
    ], [nodePositions])

    // Handle node interactions
    const handleNodeClick = useCallback((nodeId: string) => {
        setTreeState(prev => ({
            ...prev,
            activeNodeId: prev.activeNodeId === nodeId ? null : nodeId,
            visitedNodes: new Set(Array.from(prev.visitedNodes).concat(nodeId)),
            showContent: {
                ...prev.showContent,
                [nodeId]: !prev.showContent[nodeId]
            }
        }))
    }, [])

    const handleNodeHover = useCallback((nodeId: string | null) => {
        setTreeState(prev => ({
            ...prev,
            hoveredNodeId: nodeId
        }))
    }, [])

    // Auto-reveal content for root node after initial load
    useEffect(() => {
        const timer = setTimeout(() => {
            setTreeState(prev => ({
                ...prev,
                showContent: { ...prev.showContent, root: true },
                visitedNodes: new Set(Array.from(prev.visitedNodes).concat('root'))
            }))
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="relative w-full h-full overflow-visible">
            {/* Neural Network Background */}
            <NeuralDecisionBackground mousePosition={mousePosition} />

            {/* Decision Tree Nodes */}
            <div className="absolute inset-0 z-10">
                {nodes.map(node => (
                    <DecisionNode
                        key={node.id}
                        node={node}
                        isActive={treeState.activeNodeId === node.id}
                        isVisited={treeState.visitedNodes.has(node.id)}
                        onNodeClick={handleNodeClick}
                        onNodeHover={handleNodeHover}
                        showContent={treeState.showContent[node.id] || false}
                    />
                ))}
            </div>

            {/* Tree Navigation Helper */}
            <TreeNavigationOverlay
                treeState={treeState}
                nodes={nodes}
                onNodeClick={handleNodeClick}
            />
        </div>
    )
}

// Navigation overlay component
function TreeNavigationOverlay({
    treeState,
    nodes,
    onNodeClick
}: {
    treeState: DecisionTreeState
    nodes: NodeData[]
    onNodeClick: (nodeId: string) => void
}) {
    const exploredCount = treeState.visitedNodes.size
    const totalNodes = nodes.length

    return (
        <motion.div
            className="absolute top-4 right-4 bg-deep-slate/90 backdrop-blur-md border border-decision-green/20 rounded-lg p-4 text-white z-40"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
        >
            <h3 className="text-sm font-bold text-decision-green mb-3">Decision Tree Explorer</h3>

            <div className="text-xs text-warm-gray mb-3">
                Progress: {exploredCount}/{totalNodes} nodes explored
            </div>

            <div className="space-y-2">
                {nodes.map(node => (
                    <button
                        key={node.id}
                        onClick={() => onNodeClick(node.id)}
                        className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${treeState.visitedNodes.has(node.id)
                            ? 'bg-decision-green/20 text-decision-green'
                            : 'bg-white/5 text-warm-gray hover:bg-white/10'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${treeState.visitedNodes.has(node.id) ? 'bg-decision-green' : 'bg-warm-gray'
                                }`} />
                            <span>{node.title}</span>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10">
                <div className="text-xs text-warm-gray">
                    Click nodes to explore content
                </div>
            </div>
        </motion.div>
    )
} 