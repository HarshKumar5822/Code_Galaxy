// Mock data for CodeQuest challenges and user progress

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  isLocked: boolean;
  isCompleted: boolean;
  category: string;
  steps: ChallengeStep[];
}

export interface ChallengeStep {
  id: number;
  instruction: string;
  hint: string;
  expectedCode: string[];
  visualizationType: 'node-create' | 'node-link' | 'node-traverse' | 'complete' | 'console';
}

export interface UserProgress {
  level: number;
  currentXP: number;
  totalXP: number;
  xpToNextLevel: number;
  completedChallenges: string[];
  badges: Badge[];
  streak: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: Date;
  isEarned: boolean;
}

const generateBadges = (): Badge[] => {
  const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum'];
  const actions = ['Solver', 'Streak', 'Helper', 'Reviewer', 'Bug Hunter'];

  const generated: Badge[] = [
    { id: 'first-step', name: 'First Steps', description: 'Complete your first challenge', icon: '🎯', isEarned: true, earnedAt: new Date() },
    { id: 'linked-master', name: 'Linked Master', description: 'Master linked list operations', icon: '🔗', isEarned: true, earnedAt: new Date() },
    { id: 'speed-demon', name: 'Speed Demon', description: 'Complete 5 challenges in one day', icon: '⚡', isEarned: false },
    { id: 'perfectionist', name: 'Perfectionist', description: 'Complete 10 challenges without hints', icon: '💎', isEarned: false },
    { id: 'tree-hugger', name: 'Tree Hugger', description: 'Master binary tree operations', icon: '🌳', isEarned: false },
    { id: 'algo-wizard', name: 'Algorithm Wizard', description: 'Complete all sorting challenges', icon: '🧙', isEarned: false },
  ];

  let idCounter = 1;
  for (const action of actions) {
    for (const tier of tiers) {
      generated.push({
        id: `badge-${action.toLowerCase()}-${tier.toLowerCase()}`,
        name: `${tier} ${action}`,
        description: `Achieve ${tier} level in ${action} activities`,
        icon: tier === 'Bronze' ? '🥉' : tier === 'Silver' ? '🥈' : tier === 'Gold' ? '🥇' : '🏆',
        isEarned: Math.random() > 0.7, // 30% chance to have earned it
        earnedAt: Math.random() > 0.7 ? new Date() : undefined,
      });
    }
  }

  // Fill up to ~70 with generic milestones
  for (let i = generated.length; i < 70; i++) {
    generated.push({
      id: `milestone-${i}`,
      name: `Milestone ${i}`,
      description: `Unlock milestone ${i} by completing tasks`,
      icon: '🎖️',
      isEarned: Math.random() > 0.9,
    });
  }

  return generated;
};

export const mockUser: UserProgress = {
  level: 5,
  currentXP: 2450,
  totalXP: 12450,
  xpToNextLevel: 3000,
  completedChallenges: ['challenge-1', 'challenge-2', 'challenge-3'],
  badges: generateBadges(),
  streak: 7,
};

export const linkedListChallenge: Challenge = {
  id: 'linked-list-intro',
  title: 'Introduction to Linked Lists',
  description: 'Learn how to create and connect nodes in a singly linked list',
  difficulty: 'beginner',
  xpReward: 150,
  isLocked: false,
  isCompleted: false,
  category: 'Data Structures',
  steps: [
    {
      id: 1,
      instruction: 'Create a new node structure with data and next pointer',
      hint: 'A node needs to store both its value and a reference to the next node. In Python, use `__init__` to initialize `self.data` and `self.next`.',
      expectedCode: ['struct Node', 'class Node', 'data', 'next'],
      visualizationType: 'node-create',
    },
    {
      id: 2,
      instruction: 'Assign a value to your node\'s data field',
      hint: 'Set the data property to store a value like 42. `node = Node(42)`',
      expectedCode: ['data =', 'data:', 'value'],
      visualizationType: 'node-create',
    },
    {
      id: 3,
      instruction: 'Create a second node and link it to the first',
      hint: 'Create a new node (e.g., with value 10) and set `first_node.next = second_node`. This creates the chain.',
      expectedCode: ['next =', 'next:', '->next', '.next'],
      visualizationType: 'node-link',
    },
    {
      id: 4,
      instruction: 'Traverse the linked list to print all values',
      hint: 'Use a while loop: `current = head`. While `current` is not None, print `current.data` and move to `current.next`.',
      expectedCode: ['while', 'current', 'null', 'None', 'nullptr'],
      visualizationType: 'node-traverse',
    },
    {
      id: 5,
      instruction: 'Insert a node at the beginning (Head)',
      hint: 'Create a new node. Set its next pointer to the current head. Update head to be the new node.',
      expectedCode: ['head', 'next'],
      visualizationType: 'node-link',
    },
    {
      id: 6,
      instruction: 'Delete the last node',
      hint: 'Traverse to the second-to-last node (where `current.next.next` is None). Set `current.next` to None.',
      expectedCode: ['next', 'None', 'null'],
      visualizationType: 'node-traverse',
    }
  ],

};

export const pythonIntroChallenge: Challenge = {
  id: 'python-basics-1',
  title: 'Python: Variables & Printing',
  description: 'Learn the basics of Python: defining variables and printing to the console.',
  difficulty: 'beginner',
  xpReward: 100,
  isLocked: false,
  isCompleted: false,
  category: 'Python',
  steps: [
    {
      id: 1,
      instruction: 'Create a variable named `greeting` and assign it the string "Hello CodeQuest"',
      hint: 'In Python, you define a variable just by naming it: `variable_name = "value"`',
      expectedCode: ['greeting =', '"Hello CodeQuest"', "'Hello CodeQuest'"],
      visualizationType: 'console',
    },
    {
      id: 2,
      instruction: 'Print the value of `greeting` to the console',
      hint: 'Use the `print()` function.',
      expectedCode: ['print(greeting)'],
      visualizationType: 'console',
    },
    {
      id: 3,
      instruction: 'Create a variable `age` with value 25 and print it',
      hint: '`age = 25` then `print(age)`',
      expectedCode: ['age = 25', 'print(age)'],
      visualizationType: 'console',
    }
  ],
};

export const jsFunctionChallenge: Challenge = {
  id: 'js-functions-1',
  title: 'JavaScript: Functions',
  description: 'Master the power of reusable code with functions in JavaScript.',
  difficulty: 'beginner',
  xpReward: 125,
  isLocked: false,
  isCompleted: false,
  category: 'JavaScript',
  steps: [
    {
      id: 1,
      instruction: 'Define a function named `sayHello` that prints "Hello!"',
      hint: 'Use `function sayHello() { ... }` or `const sayHello = () => { ... }`',
      expectedCode: ['function sayHello', 'console.log("Hello!")', "console.log('Hello!')"],
      visualizationType: 'console',
    },
    {
      id: 2,
      instruction: 'Call the `sayHello` function',
      hint: 'Just write the function name followed by parentheses: `sayHello()`',
      expectedCode: ['sayHello()'],
      visualizationType: 'console',
    }
  ],
};

const generateChallenges = (): Challenge[] => {
  const categories = ['Data Structures', 'Algorithms', 'Frontend', 'Database', 'Backend', 'DevOps'];
  const difficulties: ('beginner' | 'intermediate' | 'advanced')[] = ['beginner', 'intermediate', 'advanced'];

  const generated: Challenge[] = [];

  // Add hardcoded specific challenges first
  generated.push(linkedListChallenge);
  generated.push(pythonIntroChallenge);
  generated.push(jsFunctionChallenge);
  generated.push({
    id: 'linked-list-insert',
    title: 'Inserting Nodes',
    description: 'Learn to insert nodes at different positions in a linked list',
    difficulty: 'beginner',
    xpReward: 200,
    isLocked: false,
    isCompleted: true,
    category: 'Data Structures',
    steps: [],
  });
  generated.push({
    id: 'linked-list-delete',
    title: 'Deleting Nodes',
    description: 'Master the art of safely removing nodes from a linked list',
    difficulty: 'intermediate',
    xpReward: 250,
    isLocked: false,
    isCompleted: true,
    category: 'Data Structures',
    steps: [],
  });
  generated.push({
    id: 'linked-list-reverse',
    title: 'Reversing a Linked List',
    description: 'Reverse the order of nodes in a linked list',
    difficulty: 'intermediate',
    xpReward: 300,
    isLocked: false,
    isCompleted: false,
    category: 'Data Structures',
    steps: [],
  });

  // Generate remaining challenges
  for (let i = 5; i <= 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const xpReward = difficulty === 'beginner' ? 100 : difficulty === 'intermediate' ? 250 : 500;

    generated.push({
      id: `challenge-${i}`,
      title: `${category} Challenge ${i}`,
      description: `Master the concepts of ${category} in this ${difficulty} level challenge.`,
      difficulty,
      xpReward,
      isLocked: Math.random() > 0.3, // 70% chance to be locked
      isCompleted: Math.random() > 0.8, // 20% chance to be completed
      category,
      steps: [],
    });
  }

  return generated;
};

export const mockChallenges: Challenge[] = generateChallenges();

export const codeTemplates: Record<string, string> = {
  python: `# Python - Linked List Node
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Create your first node here
`,
  javascript: `// JavaScript - Linked List Node
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Create your first node here
`,
  java: `// Java - Linked List Node
class Node {
    int data;
    Node next;
    
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

// Create your first node here
`,
  cpp: `// C++ - Linked List Node
struct Node {
    int data;
    Node* next;
    
    Node(int val) : data(val), next(nullptr) {}
};

// Create your first node here
`,
  c: `// C - Linked List Node
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

// Create your first node here
`,
};

// API placeholder functions
export const api = {
  login: async (email: string, password: string): Promise<{ success: boolean; user?: any }> => {
    // Placeholder - would connect to backend
    console.log('API: Login attempt', { email });
    return { success: true, user: mockUser };
  },

  signup: async (email: string, password: string, username: string): Promise<{ success: boolean }> => {
    console.log('API: Signup attempt', { email, username });
    return { success: true };
  },

  getChallenges: async (): Promise<Challenge[]> => {
    return mockChallenges;
  },

  getChallenge: async (id: string): Promise<Challenge | undefined> => {
    return mockChallenges.find(c => c.id === id);
  },

  getUserProgress: async (): Promise<UserProgress> => {
    return mockUser;
  },

  submitCode: async (challengeId: string, code: string, language: string): Promise<{ success: boolean; message: string }> => {
    console.log('API: Code submitted', { challengeId, language });
    // Mock validation
    return { success: true, message: 'Code executed successfully!' };
  },

  completeStep: async (challengeId: string, stepId: number): Promise<{ success: boolean; xpEarned: number }> => {
    return { success: true, xpEarned: 25 };
  },
};
