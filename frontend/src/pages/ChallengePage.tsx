import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Sparkles, Star } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import InstructionsPanel from '@/components/challenge/InstructionsPanel';
import LinkedListVisualization from '@/components/visualizations/LinkedListVisualization';
import CodeEditor from '@/components/editor/CodeEditor';
import { Button } from '@/components/ui/button';
import { linkedListChallenge, codeTemplates, mockChallenges } from '@/data/mockData';
import { toast } from 'sonner';

interface VisualizationNode {
  data: number | string;
}

const ChallengePage = () => {
  const { id } = useParams();
  const challenge = mockChallenges.find(c => c.id === id) || linkedListChallenge; // Fallback to LL if not found

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Initial code depends on category
  const getInitialCodeStr = () => {
    if (challenge.category === 'Python') return codeTemplates.python;
    if (challenge.category === 'JavaScript') return codeTemplates.javascript;
    return codeTemplates.python;
  };

  const [code, setCode] = useState(getInitialCodeStr());
  const [nodes, setNodes] = useState<VisualizationNode[]>([]);
  const [visualStep, setVisualStep] = useState<'idle' | 'create' | 'assign' | 'link' | 'traverse'>('idle');
  const [traverseIndex, setTraverseIndex] = useState(-1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [codeOutput, setCodeOutput] = useState<string | null>(null);
  const [isOutputError, setIsOutputError] = useState(false);

  // Update code when challenge changes
  useEffect(() => {
    setCode(getInitialCodeStr());
    setCurrentStepIndex(0);
    setNodes([]);
    setVisualStep('idle');
    setTraverseIndex(-1);
    setShowSuccess(false);
    setEarnedXP(0);
    setCodeOutput(null);
    setIsOutputError(false);
  }, [challenge.id]);

  // Simulate code validation
  const validateCode = (userCode: string, step: number) => {
    const currentStep = challenge.steps[step];
    if (!currentStep) return false;

    return currentStep.expectedCode.some(keyword =>
      userCode.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRunCode = (runCode: string, language: string) => {
    // Reset output
    setCodeOutput(null);
    setIsOutputError(false);

    // Simulate "compiling" delay
    setTimeout(() => {
      const isValid = validateCode(runCode, currentStepIndex);

      if (isValid) {
        // Trigger visualization based on step
        const currentStep = challenge.steps[currentStepIndex];

        switch (currentStep.visualizationType) {
          case 'node-create':
            const newValue = Math.floor(Math.random() * 100);
            setNodes(prev => [...prev, { data: newValue }]);
            setVisualStep('create');
            break;
          case 'node-link':
            setVisualStep('link');
            break;
          case 'node-traverse':
            setVisualStep('traverse');
            animateTraversal();
            break;
        }

        setCodeOutput(`> Running tests...\n> Test Case 1: Passed ✅\n> Test Case 2: Passed ✅\n\nExecution successful! Output:\nNode { data: ${nodes.length > 0 ? nodes[nodes.length - 1].data : 42}, next: null }`);
        setIsOutputError(false);

        toast.success('Code validated successfully!', {
          description: 'Great job! Check the visualization.',
        });
      } else {
        setCodeOutput(`> Running tests...\n> Test Case 1: Failed ❌\n\nError: AssertionError: Expected 'Node' to be defined.\n    at validate (solution.js:12:5)`);
        setIsOutputError(true);

        toast.error('Code validation failed', {
          description: 'Review your code and try again.',
        });
      }
    }, 800);
  };

  const animateTraversal = () => {
    let index = 0;
    const interval = setInterval(() => {
      setTraverseIndex(index);
      index++;
      if (index >= nodes.length) {
        clearInterval(interval);
        setTimeout(() => setTraverseIndex(-1), 1000);
      }
    }, 800);
  };

  const handleStepComplete = (stepId: number) => {
    const xpGained = Math.floor(challenge.xpReward / challenge.steps.length);
    setEarnedXP(prev => prev + xpGained);

    if (currentStepIndex < challenge.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setShowHint(false);

      toast.success(`Step ${stepId} completed!`, {
        description: `+${xpGained} XP earned`,
      });
    } else {
      // Challenge complete!
      setShowSuccess(true);
    }
  };

  // Initialize with some nodes for demo
  useEffect(() => {
    if (nodes.length === 0 && challenge.category === 'Data Structures') {
      setNodes([{ data: 42 }]);
    }
  }, [challenge.category]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isLoggedIn />

      {/* Challenge Header */}
      <div className="pt-20 px-4 border-b border-border/50 bg-card/50">
        <div className="max-w-7xl mx-auto py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/challenges">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <p className="text-sm text-muted-foreground">{challenge.category}</p>
                <h1 className="font-display text-xl font-bold text-foreground">
                  {challenge.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-cq-gold">
                <Star className="h-5 w-5" />
                <span className="font-display font-bold">{earnedXP} / {challenge.xpReward} XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Three-Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Instructions */}
        <div className="w-80 min-w-[320px] border-r border-border/50 overflow-hidden flex flex-col">
          <InstructionsPanel
            title={challenge.title}
            description={challenge.description}
            steps={challenge.steps}
            currentStepIndex={currentStepIndex}
            onStepComplete={handleStepComplete}
            showHint={showHint}
            onHintToggle={() => setShowHint(!showHint)}
          />
        </div>

        {/* Center Panel - Visualization */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 p-4 overflow-hidden">
            <div className="h-full rounded-xl border border-border/50 bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border/50 bg-muted/30">
                <h3 className="font-display font-semibold text-foreground">
                  {challenge.category === 'Data Structures' ? 'Linked List Visualization' : 'Output Console'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {challenge.category === 'Data Structures' ? 'Watch your code come to life' : 'Check your code output'}
                </p>
              </div>
              <div className="h-[calc(100%-60px)] overflow-auto">
                {challenge.category === 'Data Structures' ? (
                  <LinkedListVisualization
                    nodes={nodes}
                    currentStep={visualStep}
                    traverseIndex={traverseIndex}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center">
                    <Sparkles className="h-16 w-16 mb-4 text-primary/20" />
                    <h3 className="text-xl font-medium mb-2">Console Challenge</h3>
                    <p>Write your code and check the output in the terminal below!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-[450px] min-w-[400px] border-l border-border/50 overflow-hidden">
          <CodeEditor
            onCodeChange={handleCodeChange}
            onRun={handleRunCode}
            initialCode={code}
            language={challenge.category === 'JavaScript' ? 'javascript' : 'python'}
            output={codeOutput}
            isError={isOutputError}
          />
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-cq-dark/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="text-center p-8 rounded-2xl border border-border/50 bg-card shadow-2xl max-w-md">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cq-gold to-orange-500 flex items-center justify-center"
                >
                  <Trophy className="h-10 w-10 text-cq-dark" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    Challenge Complete!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    You've mastered the basics of linked lists.
                  </p>

                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Sparkles className="h-5 w-5 text-cq-gold" />
                    <span className="font-display text-xl font-bold text-cq-gold">
                      +{challenge.xpReward} XP
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Link to="/dashboard" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Back to Dashboard
                      </Button>
                    </Link>
                    <Link to="/challenges" className="flex-1">
                      <Button variant="hero" className="w-full">
                        Next Challenge
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChallengePage;
