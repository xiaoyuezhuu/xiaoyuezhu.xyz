'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NeuralDecisionBackground from './NeuralDecisionBackground'
import { AboutContent, EducationContent, DataScienceContent, ProjectCard } from './DecisionNode'

interface DecisionTreeState {
    activeNodeId: number | null
    visitedNodes: Set<number>
    showContent: { [key: number]: boolean }
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
        showContent: {}
    })

    const [activeNode, setActiveNode] = useState<any>(null)
    const [rootNodePosition, setRootNodePosition] = useState<{ x: number; y: number } | null>(null)

    // Handle clicks on canvas nodes
    const handleNodeClick = useCallback((node: any) => {
        if (node.type === 'root') {
            // Dispatch custom event for root node click
            window.dispatchEvent(new CustomEvent('rootNodeClicked', {
                detail: { nodeType: 'root', node }
            }))
        } else if (node.level === 1 && node.id === 1) {
            // First node on second layer (education)
            window.dispatchEvent(new CustomEvent('educationNodeClicked', {
                detail: { nodeType: 'education', node }
            }))
        } else if (node.level === 1 && node.id === 2) {
            // Second node on second layer (data science)
            window.dispatchEvent(new CustomEvent('dataScienceNodeClicked', {
                detail: { nodeType: 'data-science', node }
            }))
        } else if (node.level === 2 && node.id === 3) {
            // First node on third layer (project)
            window.dispatchEvent(new CustomEvent('projectNodeClicked', {
                detail: { nodeType: 'project', node }
            }))
        } else if (node.level === 2 && node.id === 4) {
            // Second node on third layer (project Y)
            window.dispatchEvent(new CustomEvent('projectYNodeClicked', {
                detail: { nodeType: 'projectY', node }
            }))
        } else if (node.level === 2 && node.id === 5) {
            // Third node on third layer (project Z)
            window.dispatchEvent(new CustomEvent('projectZNodeClicked', {
                detail: { nodeType: 'projectZ', node }
            }))
        } else if (node.level === 2 && node.id === 6) {
            // Fourth node on third layer (project A)
            window.dispatchEvent(new CustomEvent('projectANodeClicked', {
                detail: { nodeType: 'projectA', node }
            }))
        } else if (node.level === 2 && node.id === 7) {
            // Fifth node on third layer (project B)
            window.dispatchEvent(new CustomEvent('projectBNodeClicked', {
                detail: { nodeType: 'projectB', node }
            }))
        } else if (node.level === 2 && node.id === 8) {
            // Sixth node on third layer (project C)
            window.dispatchEvent(new CustomEvent('projectCNodeClicked', {
                detail: { nodeType: 'projectC', node }
            }))
        } else {
            // For other nodes, show the modal as before
            setTreeState(prev => ({
                ...prev,
                activeNodeId: node.id,
                visitedNodes: new Set(Array.from(prev.visitedNodes).concat(node.id)),
                showContent: {
                    ...prev.showContent,
                    [node.id]: !prev.showContent[node.id]
                }
            }))
            setActiveNode(node)
        }
    }, [])

    // Get root node position on component mount
    useEffect(() => {
        // Calculate where the root node appears in the VIEWPORT, not canvas coordinates
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        // Root node appears at center horizontally, and 1/6 down the viewport
        const rootX = viewportWidth / 2
        const rootY = viewportHeight / 6  // This is viewport position, not canvas position

        setRootNodePosition({ x: rootX, y: rootY })
    }, [])

    return (
        <div className="relative w-full h-full overflow-visible">
            {/* Clickable Neural Network Background */}
            <NeuralDecisionBackground
                mousePosition={mousePosition}
                onNodeClick={handleNodeClick}
            />

            {/* Content Display */}
            <AnimatePresence>
                {activeNode && treeState.showContent[activeNode.id] && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="fixed z-50 pointer-events-auto bg-deep-slate/95 backdrop-blur-md border border-decision-green/20 rounded-lg p-6 shadow-2xl"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '400px',
                            maxWidth: '90vw'
                        }}
                    >
                        {activeNode.type === 'root' && <AboutContent />}
                        {activeNode.type === 'education' && <EducationContent />}
                        {activeNode.type === 'datascience' && <DataScienceContent />}
                        {activeNode.type === 'project' && (
                            <ProjectCard
                                data={{
                                    title: activeNode.title,
                                    subtitle: 'Interactive research project',
                                    tags: ['Research', 'AI', 'Decision Making'],
                                    description: 'This is a sample project description.',
                                    technologies: ['Python', 'React', 'TypeScript']
                                }}
                                isExpanded={false}
                                onToggle={() => { }}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
} 