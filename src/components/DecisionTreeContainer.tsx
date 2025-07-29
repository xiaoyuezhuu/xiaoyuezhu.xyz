'use client'

import { useState, useCallback } from 'react'
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

    // Handle clicks on canvas nodes
    const handleNodeClick = useCallback((node: any) => {
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