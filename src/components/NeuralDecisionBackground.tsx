'use client'

import { useRef, useEffect, useCallback, useState } from 'react'

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
    type: 'root' | 'education' | 'datascience' | 'project'
    title: string
    description?: string
}

interface Connection {
    from: number
    to: number
    strength: number
    pulsePosition: number
    active: boolean
}

export default function NeuralDecisionBackground({
    mousePosition,
    onNodeClick
}: {
    mousePosition: { x: number; y: number }
    onNodeClick?: (node: NeuralNode) => void
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationFrameRef = useRef<number>()
    const nodesRef = useRef<NeuralNode[]>([])
    const connectionsRef = useRef<Connection[]>([])
    const startTimeRef = useRef<number>(Date.now())
    const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null)

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
            // Spread nodes out more across the longer canvas
            const yPos = (height / 6) + (level * height / 4) // Start lower, more spacing

            // Create nodes for this level
            for (let i = 0; i < nodesInLevel; i++) {
                let xPos: number
                let nodeType: NeuralNode['type']
                let title: string

                if (nodesInLevel === 1) {
                    // Single node centered
                    xPos = width / 2
                    nodeType = 'root'
                    title = 'The Decision Architect'
                } else if (nodesInLevel === 2) {
                    // Multiple nodes spread evenly
                    const xSpread = Math.min(width * 0.7, 400)
                    xPos = width / 2 + (i - (nodesInLevel - 1) / 2) * (xSpread / Math.max(1, nodesInLevel - 1))
                    nodeType = i === 0 ? 'education' : 'datascience'
                    title = i === 0 ? 'PhD in Decision Science' : 'AI Decision Systems'
                } else {
                    // Project nodes - spread them further apart
                    const xSpread = Math.min(width, 1000) // Increased from 0.7 and 400 to 0.9 and 800
                    xPos = width / 2 + (i - (nodesInLevel - 1) / 2) * (xSpread / Math.max(1, nodesInLevel - 1))
                    nodeType = 'project'
                    title = `Research Project ${i + 1}`
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
                    size: 4 + Math.random() * 3,
                    type: nodeType,
                    title: title
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

        // Render nodes (decision points) with hover effects
        nodes.forEach(node => {
            const isHovered = hoveredNodeId === node.id
            const hoverScale = isHovered ? 2.5 : 1
            const finalSize = node.size * (0.9 + node.intensity * 0.2) * hoverScale

            // Enhanced node glow effect when hovered
            const glowMultiplier = isHovered ? 3 : 2.5
            const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, finalSize * glowMultiplier)
            const hue = 180 + node.level * 10 + node.intensity * 25
            const glowOpacity = isHovered ? node.intensity * 0.8 : node.intensity * 0.4

            gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, ${glowOpacity})`)
            gradient.addColorStop(0.5, `hsla(${hue}, 60%, 50%, ${glowOpacity * 0.5})`)
            gradient.addColorStop(1, `hsla(${hue}, 50%, 40%, 0)`)

            ctx.beginPath()
            ctx.arc(node.x, node.y, finalSize * glowMultiplier, 0, Math.PI * 2)
            ctx.fillStyle = gradient
            ctx.fill()

            // Main node with enhanced visibility when hovered
            const nodeOpacity = isHovered ? 0.9 + node.intensity * 0.1 : 0.7 + node.intensity * 0.15
            ctx.beginPath()
            ctx.arc(node.x, node.y, finalSize, 0, Math.PI * 2)
            ctx.fillStyle = `hsla(${hue}, 60%, 60%, ${nodeOpacity})`
            ctx.fill()

            // Enhanced inner core when hovered
            const coreSize = finalSize * (isHovered ? 0.4 : 0.3)
            const coreOpacity = isHovered ? node.intensity * 0.9 : node.intensity * 0.6
            ctx.beginPath()
            ctx.arc(node.x, node.y, coreSize, 0, Math.PI * 2)
            ctx.fillStyle = `hsla(${hue}, 80%, 75%, ${coreOpacity})`
            ctx.fill()

            // Add pulsing ring for hovered nodes
            if (isHovered) {
                const pulseSize = finalSize * (1.2 + Math.sin(currentTime * 3) * 0.2)
                ctx.beginPath()
                ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2)
                ctx.strokeStyle = `hsla(${hue}, 80%, 70%, 0.5)`
                ctx.lineWidth = 2
                ctx.stroke()
            }
        })

        animationFrameRef.current = requestAnimationFrame(animate)
    }, [mousePosition, hoveredNodeId])

    // Handle canvas setup and resize
    const setupCanvas = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        // Use viewport width but make height much longer for scrolling
        const width = window.innerWidth
        const height = window.innerHeight * 2
        const dpr = window.devicePixelRatio || 1

        // Set canvas size 
        canvas.width = width * dpr
        canvas.height = height * dpr

        const ctx = canvas.getContext('2d')
        if (ctx) {
            ctx.scale(dpr, dpr)
            ctx.imageSmoothingEnabled = true
        }

        // Set CSS size - height much longer than viewport
        canvas.style.width = width + 'px'
        canvas.style.height = height + 'px'

        generateNeuralNetwork(width, height)
    }, [generateNeuralNetwork])

    // Handle canvas mouse move for hover effects
    const handleCanvasMouseMove = useCallback((event: MouseEvent) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height

        const mouseX = (event.clientX - rect.left) * scaleX
        const mouseY = (event.clientY - rect.top) * scaleY

        // Check if mouse is hovering over any node
        const nodes = nodesRef.current
        let foundHoveredNode = null

        for (const node of nodes) {
            const distance = Math.sqrt(
                Math.pow(mouseX - node.x, 2) +
                Math.pow(mouseY - node.y, 2)
            )

            // Hover detection radius (larger than click radius)
            if (distance <= (node.size * 4 + 30)) {
                foundHoveredNode = node.id
                break
            }
        }

        setHoveredNodeId(foundHoveredNode)
    }, [])

    // Handle canvas clicks
    const handleCanvasClick = useCallback((event: MouseEvent) => {
        const canvas = canvasRef.current
        if (!canvas || !onNodeClick) return

        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height

        const clickX = (event.clientX - rect.left) * scaleX
        const clickY = (event.clientY - rect.top) * scaleY

        // Check if click is near any node
        const nodes = nodesRef.current
        for (const node of nodes) {
            const distance = Math.sqrt(
                Math.pow(clickX - node.x, 2) +
                Math.pow(clickY - node.y, 2)
            )

            // Click within node radius (larger for easier clicking)
            if (distance <= (node.size * 3 + 20)) {
                onNodeClick(node)
                break
            }
        }
    }, [onNodeClick])

    useEffect(() => {
        setupCanvas()
        animate()

        const handleResize = () => {
            setupCanvas()
        }

        // Only listen to window resize, not scroll
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [setupCanvas, animate])

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            canvas.addEventListener('click', handleCanvasClick)
            canvas.addEventListener('mousemove', handleCanvasMouseMove)
            return () => {
                canvas.removeEventListener('click', handleCanvasClick)
                canvas.removeEventListener('mousemove', handleCanvasMouseMove)
            }
        }
    }, [handleCanvasClick, handleCanvasMouseMove])

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-10">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                style={{
                    mixBlendMode: 'screen',
                    width: '100%',
                    height: '100%'
                }}
            />
        </div>
    )
} 