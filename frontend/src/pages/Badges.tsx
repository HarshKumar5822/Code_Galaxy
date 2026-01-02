import { motion } from 'framer-motion';
import { Award, Lock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { mockUser } from '@/data/mockData';
import Badge from '@/components/gamification/Badge';

const Badges = () => {
    const earnedBadges = mockUser.badges.filter(b => b.isEarned);
    const lockedBadges = mockUser.badges.filter(b => !b.isEarned);

    return (
        <div className="min-h-screen bg-background">
            <Navbar isLoggedIn />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-cq-gold/10">
                                <Award className="h-6 w-6 text-cq-gold" />
                            </div>
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                                Badges Gallery
                            </h1>
                        </div>
                        <p className="text-muted-foreground">
                            Track your achievements and unlock new milestones
                        </p>
                    </motion.div>

                    {/* Earned Badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-12"
                    >
                        <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                            <span className="text-cq-gold">Earned</span>
                            <span className="text-sm font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                                {earnedBadges.length}
                            </span>
                        </h2>
                        <div className="flex flex-wrap gap-6">
                            {earnedBadges.map((badge) => (
                                <Badge
                                    key={badge.id}
                                    icon={badge.icon}
                                    name={badge.name}
                                    description={badge.description}
                                    isEarned={true}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Locked Badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                            <Lock className="h-5 w-5 text-muted-foreground" />
                            <span>Locked</span>
                            <span className="text-sm font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                                {lockedBadges.length}
                            </span>
                        </h2>
                        <div className="flex flex-wrap gap-6 opacity-60">
                            {lockedBadges.map((badge) => (
                                <Badge
                                    key={badge.id}
                                    icon={badge.icon}
                                    name={badge.name}
                                    description={badge.description}
                                    isEarned={false}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Badges;
