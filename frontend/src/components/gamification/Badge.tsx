import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface BadgeProps {
  icon: string;
  name: string;
  description: string;
  isEarned: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Badge = ({ icon, name, description, isEarned, size = 'md' }: BadgeProps) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center gap-2 group"
    >
      <div
        className={`${sizeClasses[size]} rounded-xl flex items-center justify-center relative transition-all duration-300 overflow-hidden ${isEarned
            ? 'bg-gradient-to-br from-cq-gold to-orange-500 glow-gold badge-glow shadow-lg'
            : 'bg-muted border border-border/50'
          }`}
      >
        {/* Shine effect for earned badges */}
        {isEarned && (
          <motion.div
            className="absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              repeatDelay: 3,
              ease: "linear",
            }}
          />
        )}

        {/* Icon */}
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10 }}
          className={`z-20 ${!isEarned && 'opacity-30 grayscale blur-[1px]'}`}
        >
          {icon}
        </motion.span>

        {/* Lock overlay for locked badges */}
        {!isEarned && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <Lock className="w-1/3 h-1/3 text-muted-foreground/80 drop-shadow-md" />
          </div>
        )}
      </div>

      <div className="text-center">
        <p className={`text-sm font-medium ${isEarned ? 'text-foreground' : 'text-muted-foreground'}`}>
          {name}
        </p>
        <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity max-w-[100px]">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default Badge;
