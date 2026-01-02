import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Flame,
  Award,
  ChevronRight,
  Zap,
  BookOpen,
  Clock,
  Code,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import XPBar from '@/components/gamification/XPBar';
import Badge from '@/components/gamification/Badge';
import StreakCounter from '@/components/gamification/StreakCounter';
import ChallengeCard from '@/components/challenge/ChallengeCard';
import { Button } from '@/components/ui/button';
import { mockUser, mockChallenges } from '@/data/mockData';

const Dashboard = () => {
  const [language, setLanguage] = useState("javascript");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const recentChallenges = mockChallenges.slice(0, 4);
  const recommendedChallenge = mockChallenges.find(c => !c.isCompleted && !c.isLocked);

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn onLogout={handleLogout} />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Welcome back, <span className="text-primary">{JSON.parse(localStorage.getItem('userInfo') || '{}').name || JSON.parse(localStorage.getItem('userInfo') || '{}').username || 'Adventurer'}</span>! 👋
              </h1>
              <p className="text-muted-foreground">
                Continue your quest and conquer new challenges today.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-card p-2 rounded-lg border border-border/50">
              <Code className="h-5 w-5 text-muted-foreground" />
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px] bg-background/50 border-border/50 text-foreground">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="c">C</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                  <SelectItem value="ruby">Ruby</SelectItem>
                  <SelectItem value="php">PHP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* XP Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="col-span-1 md:col-span-2 p-6 rounded-2xl border border-border/50 bg-card"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Your Progress</h3>
                    <p className="text-sm text-muted-foreground">Keep pushing forward!</p>
                  </div>
                </div>
                <StreakCounter streak={mockUser.streak} />
              </div>

              <XPBar
                currentXP={mockUser.currentXP}
                maxXP={mockUser.xpToNextLevel}
                level={mockUser.level}
                size="lg"
              />

              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="font-display text-2xl font-bold text-foreground">
                    {mockUser.totalXP.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Total XP</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="font-display text-2xl font-bold text-foreground">
                    {mockUser.completedChallenges.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="font-display text-2xl font-bold text-cq-gold">
                    {mockUser.badges.filter(b => b.isEarned).length}
                  </p>
                  <p className="text-xs text-muted-foreground">Badges</p>
                </div>
              </div>
            </motion.div>

            {/* Quick Action Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl border border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/10"
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Continue Learning</h3>
              </div>

              {recommendedChallenge && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Recommended for you:</p>
                  <p className="font-display font-semibold text-foreground">
                    {recommendedChallenge.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-cq-gold">+{recommendedChallenge.xpReward} XP</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground capitalize">
                      {recommendedChallenge.difficulty}
                    </span>
                  </div>
                </div>
              )}

              <Link to={recommendedChallenge ? `/challenge/${recommendedChallenge.id}` : '/challenges'}>
                <Button variant="hero" className="w-full gap-2">
                  <BookOpen className="h-4 w-4" />
                  Start Challenge
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Badges Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 p-6 rounded-2xl border border-border/50 bg-card"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cq-gold/10">
                  <Award className="h-5 w-5 text-cq-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Your Badges</h3>
                  <p className="text-sm text-muted-foreground">
                    {mockUser.badges.filter(b => b.isEarned).length} of {mockUser.badges.length} earned
                  </p>
                </div>
              </div>
              <Link to="/badges">
                <Button variant="default" size="sm" className="gap-1 bg-primary/20 text-primary hover:bg-primary/30 border border-primary/20">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6">
              {mockUser.badges.filter(b => b.isEarned).slice(0, 6).map((badge) => (
                <Badge
                  key={badge.id}
                  icon={badge.icon}
                  name={badge.name}
                  description={badge.description}
                  isEarned={badge.isEarned}
                />
              ))}
            </div>
          </motion.div>

          {/* Recent Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Available Challenges</h3>
                  <p className="text-sm text-muted-foreground">Pick up where you left off</p>
                </div>
              </div>
              <Link to="/challenges">
                <Button variant="default" size="sm" className="gap-1 bg-primary/20 text-primary hover:bg-primary/30 border border-primary/20">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {recentChallenges.map((challenge, index) => (
                <ChallengeCard key={challenge.id} challenge={challenge} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
