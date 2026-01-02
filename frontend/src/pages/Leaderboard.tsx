import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, Star, Flame } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

interface LeaderboardEntry {
  rank: number;
  username: string;
  level: number;
  xp: number;
  streak: number;
  badges: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: 'AlgoMaster', level: 42, xp: 125000, streak: 45, badges: 28 },
  { rank: 2, username: 'CodeNinja', level: 38, xp: 98500, streak: 32, badges: 24 },
  { rank: 3, username: 'ByteWarrior', level: 35, xp: 87200, streak: 28, badges: 22 },
  { rank: 4, username: 'DataDragon', level: 32, xp: 76800, streak: 21, badges: 19 },
  { rank: 5, username: 'StackSorcerer', level: 29, xp: 65400, streak: 18, badges: 17 },
  { rank: 6, username: 'RecursiveRider', level: 27, xp: 58900, streak: 15, badges: 15 },
  { rank: 7, username: 'BinaryBoss', level: 25, xp: 52100, streak: 12, badges: 14 },
  { rank: 8, username: 'HeapHero', level: 23, xp: 46500, streak: 10, badges: 12 },
  { rank: 9, username: 'QueueQueen', level: 21, xp: 41200, streak: 8, badges: 11 },
  { rank: 10, username: 'TreeTitan', level: 19, xp: 36800, streak: 7, badges: 10 },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-cq-gold" />;
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Award className="h-6 w-6 text-amber-600" />;
    default:
      return <span className="font-display font-bold text-muted-foreground">#{rank}</span>;
  }
};

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-cq-gold/20 to-orange-500/20 border-cq-gold/50';
    case 2:
      return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50';
    case 3:
      return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/50';
    default:
      return 'bg-card border-border/50';
  }
};

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-cq-gold/20 to-orange-500/20 mb-4">
              <TrendingUp className="h-8 w-8 text-cq-gold" />
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              Leaderboard
            </h1>
            <p className="text-muted-foreground">
              Top coders conquering challenges and earning glory
            </p>
          </motion.div>

          {/* Top 3 Podium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-end justify-center gap-4 mb-12"
          >
            {/* 2nd place */}
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-3xl font-bold text-cq-dark">
                2
              </div>
              <p className="font-semibold text-foreground">{mockLeaderboard[1].username}</p>
              <p className="text-sm text-muted-foreground">{mockLeaderboard[1].xp.toLocaleString()} XP</p>
            </div>

            {/* 1st place */}
            <div className="text-center -mt-8">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-32 h-32 mx-auto mb-3 rounded-full bg-gradient-to-br from-cq-gold to-orange-500 flex items-center justify-center relative"
              >
                <span className="text-4xl font-bold text-cq-dark">1</span>
                <div className="absolute -top-2 -right-2">
                  <Star className="h-8 w-8 text-cq-gold fill-cq-gold" />
                </div>
              </motion.div>
              <p className="font-display font-bold text-xl text-foreground">{mockLeaderboard[0].username}</p>
              <p className="text-cq-gold font-semibold">{mockLeaderboard[0].xp.toLocaleString()} XP</p>
            </div>

            {/* 3rd place */}
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-3xl font-bold text-cq-dark">
                3
              </div>
              <p className="font-semibold text-foreground">{mockLeaderboard[2].username}</p>
              <p className="text-sm text-muted-foreground">{mockLeaderboard[2].xp.toLocaleString()} XP</p>
            </div>
          </motion.div>

          {/* Full Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border/50 bg-card overflow-hidden"
          >
            {/* Header */}
            <div className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-border/50 bg-muted/30 text-sm font-medium text-muted-foreground">
              <div>Rank</div>
              <div className="col-span-2">Player</div>
              <div className="text-center">Level</div>
              <div className="text-center">XP</div>
              <div className="text-center">Streak</div>
            </div>

            {/* Entries */}
            {mockLeaderboard.map((entry, index) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`grid grid-cols-6 gap-4 px-6 py-4 border-b border-border/30 last:border-b-0 ${getRankStyle(entry.rank)}`}
              >
                <div className="flex items-center">
                  {getRankIcon(entry.rank)}
                </div>
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cq-cyan to-cq-purple flex items-center justify-center text-cq-dark font-bold">
                    {entry.username[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{entry.username}</p>
                    <p className="text-xs text-muted-foreground">{entry.badges} badges</p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <span className="level-badge px-3 py-1 rounded-full text-sm">
                    {entry.level}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="font-mono font-semibold text-foreground">
                    {entry.xp.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="font-semibold text-orange-500">{entry.streak}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Your Position */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-6 rounded-xl border border-primary/50 bg-primary/5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-display text-2xl font-bold text-primary">#127</span>
                <div>
                  <p className="font-semibold text-foreground">Your Position</p>
                  <p className="text-sm text-muted-foreground">Keep going to climb the ranks!</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display text-xl font-bold text-foreground">12,450 XP</p>
                <p className="text-sm text-muted-foreground">24,350 XP to #100</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
