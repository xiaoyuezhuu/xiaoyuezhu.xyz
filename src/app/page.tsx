import HeroSection from '@/components/HeroSection'

export default function Home() {
    return (
        <div className="min-h-screen bg-decision-gradient">
            <HeroSection />

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