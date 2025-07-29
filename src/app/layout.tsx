import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
})

export const metadata: Metadata = {
    title: 'Xiaoyue Zhu - Decision Scientist & AI Innovation Founder',
    description: 'Bridging neuroscience research with AI-assisted decision-making. PhD candidate exploring the science of choice and building the future of human-AI decision collaboration.',
    keywords: ['decision science', 'neuroscience', 'AI', 'machine learning', 'decision making', 'PhD research', 'startup founder'],
    authors: [{ name: 'Xiaoyue Zhu' }],
    creator: 'Xiaoyue Zhu',
    openGraph: {
        title: 'Xiaoyue Zhu - Decision Scientist & AI Innovation Founder',
        description: 'Bridging neuroscience research with AI-assisted decision-making',
        url: 'https://xiaoyuezhu.xyz',
        siteName: 'Xiaoyue Zhu',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Xiaoyue Zhu - Decision Scientist',
        description: 'Bridging neuroscience research with AI-assisted decision-making',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="min-h-screen bg-decision-gradient">
                <Navigation />
                <main className="relative">
                    {children}
                </main>
            </body>
        </html>
    )
} 