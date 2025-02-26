import React, { useState } from 'react';
import Select from 'react-select';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';    
import { Code2, Wand2, Terminal, Sparkles, Copy, Check } from 'lucide-react';      
import { Language, ConversionResult, CodeSolution } from './types';  
import { factorialExamples } from './codeExamples';   
   
const languages: Language[] = [   
  { value: 'java', label: 'Java' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },  
  { value: 'javascript', label: 'JavaScript' }
];

function App() {
  const [sourceCode, setSourceCode] = useState('');
  const [targetLanguage, setTargetLanguage] = useState<Language | null>(null);
  const [convertedCode, setConvertedCode] = useState<CodeSolution[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleConvert = () => {
    setIsConverting(true);
    // Simulate API call delay
    setTimeout(() => {
      if (targetLanguage) {
        setConvertedCode(factorialExamples[targetLanguage.value as keyof typeof factorialExamples]);
      }
      setIsConverting(false);
    }, 1000);
  };

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Code2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Code Converter</h1>
              <p className="text-gray-400">Transform your code into multiple languages</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-5 w-5 text-indigo-400" />
                  <h2 className="text-xl font-semibold">Source Code</h2>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>
              <textarea
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                className="w-full h-64 p-4 bg-gray-900/50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-300 placeholder-gray-600"
                placeholder="Paste your Python code here..."
              />
            </div>

            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                <h2 className="text-xl font-semibold">Target Language</h2>
              </div>
              <Select
                options={languages}
                value={targetLanguage}
                onChange={(selected) => setTargetLanguage(selected as Language)}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: 'rgba(17, 24, 39, 0.5)',
                    borderColor: '#374151',
                    '&:hover': {
                      borderColor: '#4F46E5'
                    }
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: '#1F2937'
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#374151' : 'transparent',
                    '&:hover': {
                      backgroundColor: '#374151'
                    }
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: '#E5E7EB'
                  }),
                  input: (base) => ({
                    ...base,
                    color: '#E5E7EB'
                  })
                }}
                placeholder="Select target language..."
              />
              <button
                onClick={handleConvert}
                disabled={!sourceCode || !targetLanguage || isConverting}
                className={`mt-4 w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-white transition-all duration-200 ${
                  !sourceCode || !targetLanguage || isConverting
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 transform hover:-translate-y-1'
                }`}
              >
                <Wand2 className="h-5 w-5" />
                <span>{isConverting ? 'Converting...' : 'Convert Code'}</span>
              </button>
            </div>
          </div>

          {/* Right Column - Output */}
          <div className="space-y-6">
            {convertedCode.map((solution, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-indigo-400">{solution.title}</h3>
                    <button
                      onClick={() => handleCopy(solution.code, index)}
                      className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedIndex === index ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="text-sm">{copiedIndex === index ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-gray-400 mb-4">{solution.description}</p>
                  <div className="rounded-lg overflow-hidden">
                    <SyntaxHighlighter
                      language={targetLanguage?.value}
                      style={atomOneDark}
                      customStyle={{
                        margin: 0,
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgba(17, 24, 39, 0.5)',
                      }}
                    >
                      {solution.code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            ))}

            {/* Decorative Images */}
            {!convertedCode.length && (
              <div className="space-y-6">
                <div className="relative group">
                  <img
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80"
                    alt="Coding"
                    className="w-full h-48 object-cover rounded-xl shadow-lg transform transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-xl" />
                  <p className="absolute bottom-4 left-4 text-white font-semibold">Modern Development Environment</p>
                </div>
                <div className="relative group">
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80"
                    alt="Programming"
                    className="w-full h-48 object-cover rounded-xl shadow-lg transform transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-xl" />
                  <p className="absolute bottom-4 left-4 text-white font-semibold">Code Transformation Magic</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
