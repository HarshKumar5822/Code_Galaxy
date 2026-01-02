import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, ChevronDown, GripHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { codeTemplates } from '@/data/mockData';

type Language = 'python' | 'javascript' | 'java' | 'cpp' | 'c';

interface CodeEditorProps {
  onCodeChange?: (code: string) => void;
  onRun?: (code: string, language: Language) => void;
  initialCode?: string;
  language?: Language;
  output?: string | null;
  isError?: boolean;
}

const languageLabels: Record<Language, string> = {
  python: 'Python',
  javascript: 'JavaScript',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
};

const monacoLanguageMap: Record<Language, string> = {
  python: 'python',
  javascript: 'javascript',
  java: 'java',
  cpp: 'cpp',
  c: 'c',
};

const CodeEditor = ({ onCodeChange, onRun, initialCode, language: initialLanguage = 'python', output, isError }: CodeEditorProps) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [code, setCode] = useState(initialCode || codeTemplates[language]);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newHeight = containerRect.bottom - e.clientY;

      // Clamp height
      const minHeight = 100;
      const maxHeight = containerRect.height - 100; // Keep some space for editor

      if (newHeight >= minHeight && newHeight <= maxHeight) {
        setTerminalHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  useEffect(() => {
    if (!initialCode) {
      setCode(codeTemplates[language]);
    }
  }, [language, initialCode]);

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleRun = async () => {
    setIsRunning(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onRun?.(code, language);
    setIsRunning(false);
  };

  const handleReset = () => {
    const template = codeTemplates[language];
    setCode(template);
    onCodeChange?.(template);
  };

  return (
    <div ref={containerRef} className="h-full flex flex-col rounded-xl overflow-hidden border border-border/50 bg-card relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/30">
        {/* Language selector */}
        <div className="relative">
          <button
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors text-sm font-medium text-foreground"
          >
            {languageLabels[language]}
            <ChevronDown className={`h-4 w-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isLanguageOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-1 py-1 bg-card border border-border rounded-lg shadow-xl z-50 min-w-[140px]"
              >
                {(Object.keys(languageLabels) as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      const newTemplate = codeTemplates[lang];
                      setLanguage(lang);
                      setCode(newTemplate);
                      onCodeChange?.(newTemplate);
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors ${lang === language ? 'text-primary bg-primary/10' : 'text-foreground'
                      }`}
                  >
                    {languageLabels[lang]}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={handleRun}
            disabled={isRunning}
            className="gap-2"
          >
            {isRunning ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="h-4 w-4 border-2 border-cq-dark border-t-transparent rounded-full"
              />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={monacoLanguageMap[language]}
          value={code}
          onChange={handleCodeChange}
          onMount={handleEditorMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            wordWrap: 'on',
            contextmenu: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
          }}
        />
      </div>

      {/* Output Terminal */}
      <AnimatePresence>
        {output !== undefined && output !== null && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: terminalHeight, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="border-t border-border/50 bg-[#1e1e1e] flex flex-col absolute bottom-0 left-0 right-0 z-10 shadow-xl"
            style={{ height: terminalHeight }}
          >
            {/* Resize Handle */}
            <div
              className="w-full h-1.5 bg-[#252526] hover:bg-primary/20 cursor-ns-resize flex items-center justify-center transition-colors"
              onMouseDown={(e) => {
                e.preventDefault();
                setIsResizing(true);
                document.body.style.cursor = 'ns-resize';
              }}
            >
              <div className="w-16 h-1 rounded-full bg-border/20" />
            </div>

            <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-border/10">
              <span className="text-xs font-mono text-muted-foreground uppercase">Terminal</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
              </div>
            </div>
            <div className="flex-1 p-4 font-mono text-sm overflow-auto">
              <div className="flex gap-2 text-muted-foreground mb-2">
                <span className="text-green-500">➜</span>
                <span>~ node solution.js</span>
              </div>
              <pre className={`font-mono whitespace-pre-wrap ${isError ? 'text-red-400' : 'text-gray-300'}`}>
                {output}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodeEditor;
