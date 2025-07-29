'use client'

import { useRef, useEffect, useCallback } from 'react'

interface NeuralNode {
    id: number
    x: number
    y: number
    level: number
    connections: number[]
    intensity: number
    targetIntensity: number
    pulsePhase: number
    size: number
}

interface Connection {
    from: number
    to: number
    strength: number
    pulsePosition: number
    active: boolean
}

export default function NeuralDecisionBackground({
    mousePosition
}: {
    mousePosition: { x: number; y: number }
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationFrameRef = useRef<number>()
    const nodesRef = useRef<NeuralNode[]>([])
    const connectionsRef = useRef<Connection[]>([])
    const startTimeRef = useRef<number>(Date.now())

    // Generate neural network structure
    const generateNeuralNetwork = useCallback((width: number, height: number) => {
        const nodes: NeuralNode[] = []
        const connections: Connection[] = []
        let nodeId = 0

        // Simple 3-layer decision tree: 1 → 2 → 6 nodes
        const layerStructure = [1, 2, 6]
        const levels = layerStructure.length
        const levelHeight = height / (levels + 1)

        layerStructure.forEach((nodesInLevel, level) => {
            const yPos = levelHeight * (level + 1)

            // Create nodes for this level
            for (let i = 0; i < nodesInLevel; i++) {
                let xPos: number

                if (nodesInLevel === 1) {
                    // Single node centered
                    xPos = width / 2
                } else {
                    // Multiple nodes spread evenly
                    const xSpread = Math.min(width * 0.7, 400)
                    xPos = width / 2 + (i - (nodesInLevel - 1) / 2) * (xSpread / Math.max(1, nodesInLevel - 1))
                }

                nodes.push({
                    id: nodeId++,
                    x: xPos,
                    y: yPos,
                    level,
                    connections: [],
                    intensity: 0.4 + Math.random() * 0.3,
                    targetIntensity: 0.5,
                    pulsePhase: Math.random() * Math.PI * 2,
                    size: 4 + Math.random() * 3
                })
            }
        })

        // Create structured connections for decision tree
        nodes.forEach(node => {
            if (node.level < levels - 1) {
                const nextLevelNodes = nodes.filter(n => n.level === node.level + 1)

                // Decision tree branching logic
                if (node.level === 0) {
                    // Root node connects to both level 1 nodes
                    nextLevelNodes.forEach(targetNode => {
                        node.connections.push(targetNode.id)
                        connections.push({
                            from: node.id,
                            to: targetNode.id,
                            strength: 0.8 + Math.random() * 0.2,
                            pulsePosition: Math.random(),
                            active: true
                        })
                    })
                } else if (node.level === 1) {
                    // Each level 1 node connects to 3 level 2 nodes
                    const startIndex = nodes.findIndex(n => n.id === node.id) - 1 // Offset for level 1
                    const targetIndices = startIndex === 0 ? [0, 1, 2] : [3, 4, 5] // First node connects to 0,1,2; second to 3,4,5

                    targetIndices.forEach(index => {
                        if (nextLevelNodes[index]) {
                            node.connections.push(nextLevelNodes[index].id)
                            connections.push({
                                from: node.id,
                                to: nextLevelNodes[index].id,
                                strength: 0.6 + Math.random() * 0.4,
                                pulsePosition: Math.random(),
                                active: Math.random() > 0.1
                            })
                        }
                    })
                }
            }
        })

        nodesRef.current = nodes
        connectionsRef.current = connections
    }, [])

    // Animation loop
    const animate = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const currentTime = (Date.now() - startTimeRef.current) / 1000
        const nodes = nodesRef.current
        const connections = connectionsRef.current

        // Clear canvas with subtle trail effect
        ctx.fillStyle = 'rgba(26, 26, 46, 0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Update node intensities based on mouse position and time
        nodes.forEach(node => {
            const mouseDistance = Math.sqrt(
                Math.pow(mousePosition.x * canvas.width - node.x, 2) +
                Math.pow(mousePosition.y * canvas.height - node.y, 2)
            )
            // Much more subtle mouse influence with greater distance threshold
            const mouseInfluence = Math.max(0.8, 1 - mouseDistance / 800) * 0.3 + 0.7

            // More subtle and slower pulsing patterns
            const timePulse = Math.sin(currentTime * 0.8 + node.pulsePhase) * 0.15
            const levelPulse = Math.sin(currentTime * 0.6 + node.level * 0.8) * 0.1
            node.targetIntensity = (0.5 + timePulse + levelPulse) * mouseInfluence

            // Much slower and smoother intensity transitions
            node.intensity += (node.targetIntensity - node.intensity) * 0.03
        })

        // Update and render connections (neural pathways)
        connections.forEach((connection, index) => {
            const fromNode = nodes.find(n => n.id === connection.from)
            const toNode = nodes.find(n => n.id === connection.to)

            if (!fromNode || !toNode) return

            // Slower pulse movement
            connection.pulsePosition += 0.008 + connection.strength * 0.004
            if (connection.pulsePosition > 1) {
                connection.pulsePosition = 0
                connection.active = Math.random() > 0.1 // More connections stay active
            }

            // Draw connection line
            const intensity = (fromNode.intensity + toNode.intensity) / 2
            const alpha = intensity * connection.strength * 0.4 // Reduced overall alpha

            if (connection.active && alpha > 0.05) {
                ctx.beginPath()
                ctx.moveTo(fromNode.x, fromNode.y)

                // More subtle curved connections
                const midX = (fromNode.x + toNode.x) / 2 + Math.sin(currentTime * 0.3 + index) * 15
                const midY = (fromNode.y + toNode.y) / 2
                ctx.quadraticCurveTo(midX, midY, toNode.x, toNode.y)

                // More subtle color variations
                const hue = 180 + Math.sin(currentTime * 0.2 + index * 0.05) * 20
                ctx.strokeStyle = `hsla(${hue}, 60%, 55%, ${alpha})`
                ctx.lineWidth = 0.8 + connection.strength * 1.2
                ctx.stroke()

                // More subtle pulse along connection
                if (connection.pulsePosition > 0 && connection.pulsePosition < 1) {
                    const pulseX = fromNode.x + (toNode.x - fromNode.x) * connection.pulsePosition
                    const pulseY = fromNode.y + (toNode.y - fromNode.y) * connection.pulsePosition

                    const gradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 6)
                    gradient.addColorStop(0, `hsla(${hue}, 70%, 65%, 0.5)`)
                    gradient.addColorStop(1, `hsla(${hue}, 70%, 65%, 0)`)

                    ctx.beginPath()
                    ctx.arc(pulseX, pulseY, 4, 0, Math.PI * 2)
                    ctx.fillStyle = gradient
                    ctx.fill()
                }
            }
        })

        // Render nodes (decision points) with more subtle effects
        nodes.forEach(node => {
            const finalSize = node.size * (0.9 + node.intensity * 0.2) // Less size variation

            // More subtle node glow effect
            const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, finalSize * 2.5)
            const hue = 180 + node.level * 10 + node.intensity * 25 // Less dramatic color shifts
            gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, ${node.intensity * 0.4})`)
            gradient.addColorStop(0.5, `hsla(${hue}, 60%, 50%, ${node.intensity * 0.2})`)
            gradient.addColorStop(1, `hsla(${hue}, 50%, 40%, 0)`)

            ctx.beginPath()
            ctx.arc(node.x, node.y, finalSize * 2.5, 0, Math.PI * 2)
            ctx.fillStyle = gradient
            ctx.fill()

            // Main node with more subtle intensity
            ctx.beginPath()
            ctx.arc(node.x, node.y, finalSize, 0, Math.PI * 2)
            ctx.fillStyle = `hsla(${hue}, 60%, 60%, ${0.7 + node.intensity * 0.15})`
            ctx.fill()

            // Smaller, more subtle inner core
            ctx.beginPath()
            ctx.arc(node.x, node.y, finalSize * 0.3, 0, Math.PI * 2)
            ctx.fillStyle = `hsla(${hue}, 80%, 75%, ${node.intensity * 0.6})`
            ctx.fill()
        })

        animationFrameRef.current = requestAnimationFrame(animate)
    }, [mousePosition])

    // Handle canvas setup and resize
    const setupCanvas = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        // Get the parent container dimensions instead of just the canvas rect
        const container = canvas.parentElement
        if (!container) return

        const rect = container.getBoundingClientRect()
        const dpr = window.devicePixelRatio || 1

        // Set canvas size to fill the container
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr

        const ctx = canvas.getContext('2d')
        if (ctx) {
            ctx.scale(dpr, dpr)
            ctx.imageSmoothingEnabled = true
        }

        // Set CSS size to match container
        canvas.style.width = rect.width + 'px'
        canvas.style.height = rect.height + 'px'

        generateNeuralNetwork(rect.width, rect.height)
    }, [generateNeuralNetwork])

    useEffect(() => {
        setupCanvas()
        animate()

        const handleResize = () => {
            setupCanvas()
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [setupCanvas, animate])

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    mixBlendMode: 'screen',
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none'
                }}
            />
        </div>
    )
} 