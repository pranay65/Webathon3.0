import React, { useState, useEffect } from 'react';
import { CheckCircle, Award, BookOpen, ExternalLink, ChevronRight, Search, Video, VideoOff, Bookmark, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillVerificationPage = () => {
  const [state, setState] = useState({
    activeTab: 'available', testMode: false, subjectSelect: true, completed: false,
    score: 0, currentQ: 0, selected: null, cameraOn: false, stream: null,
    markedReview: [], showCorrect: false, selectedSubject: null
  });

  const data = {
    subjects: ['JavaScript', 'React', 'CSS', 'HTML', 'Node.js'],
    providers: [
      { name: 'Coursera', skills: ['Data Science', 'ML', 'Web Dev'], logo: '🎓', url: 'https://coursera.org' },
      { name: 'LinkedIn', skills: ['Marketing', 'UI/UX', 'Analytics'], logo: '🔗', url: 'https://linkedin.com/learning' },
      { name: 'HackerRank', skills: ['Python', 'JS', 'Algorithms'], logo: '💻', url: 'https://hackerrank.com' },
      { name: 'Udemy', skills: ['Mobile', 'Cloud', 'PM'], logo: '🎯', url: 'https://udemy.com' }
    ],
    certs: [
      { provider: 'Coursera', name: 'Python Data Science', completed: '03/15/2025', badge: '🏆' },
      { provider: 'LinkedIn', name: 'Advanced UI Design', completed: '02/20/2025', badge: '🥇' }
    ],
    progress: [
      { provider: 'HackerRank', name: 'JS Algorithms', progress: 65 },
      { provider: 'Udemy', name: 'AWS Cloud', progress: 40 }
    ],
    questions: {
      'JavaScript': [
        { q: "Correct way to declare JS var?", opts: ["variable x;", "var x;", "x = var;", "declare x;"], ans: 1 },
        { q: "Which is not a JS framework?", opts: ["React", "Angular", "Laravel", "Vue"], ans: 2 },
        { q: "What does '===' check?", opts: ["Value only", "Type only", "Value and type", "Neither"], ans: 2 },
        { q: "What is a closure?", opts: ["Function + outer scope", "CSS property", "HTML tag", "Database term"], ans: 0 },
        { q: "Which is ES6 feature?", opts: ["let/const", "var", "alert()", "document.write()"], ans: 0 }
      ],
      'React': [
        { q: "React is mainly for?", opts: ["Database", "UI", "Backend", "Mobile only"], ans: 1 },
        { q: "Which hooks runs on mount?", opts: ["useEffect", "useState", "useMemo", "useCallback"], ans: 0 },
        { q: "JSX is?", opts: ["Template syntax", "Pure JS", "CSS preprocessor", "Database query"], ans: 0 },
        { q: "Virtual DOM helps with?", opts: ["Performance", "Security", "Storage", "Authentication"], ans: 0 },
        { q: "Props are?", opts: ["Mutable", "Immutable", "Functions", "Events"], ans: 1 }
      ]
    },
    stats: [
      { title: 'Skills', icon: <CheckCircle className="h-5 w-5 text-green-600" />, count: 8, bg: 'bg-green-100' },
      { title: 'Certs', icon: <Award className="h-5 w-5 text-blue-600" />, count: 2, bg: 'bg-blue-100' },
      { title: 'Progress', icon: <BookOpen className="h-5 w-5 text-amber-600" />, count: 2, bg: 'bg-amber-100' }
    ]
  };

  const updateState = (updates) => setState(prev => ({...prev, ...updates}));

  const startTest = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: true });
      updateState({ stream: media, cameraOn: true, testMode: true, subjectSelect: true });
      document.documentElement.requestFullscreen();
    } catch (err) {
      alert("Camera access required for test");
    }
  };

  const endTest = () => {
    state.stream?.getTracks().forEach(track => track.stop());
    document.exitFullscreen();
    updateState({ 
      testMode: false, cameraOn: false, completed: false, 
      currentQ: 0, selected: null, score: 0, markedReview: [],
      showCorrect: false, subjectSelect: false, selectedSubject: null
    });
  };

  const nextQ = () => {
    const isCorrect = state.selected === data.questions[state.selectedSubject][state.currentQ].ans;
    if (isCorrect) {
      updateState({ score: state.score + 1, showCorrect: true });
      setTimeout(() => updateState({ showCorrect: false }), 1000);
    }
    
    if (state.currentQ < data.questions[state.selectedSubject].length - 1) {
      updateState({ currentQ: state.currentQ + 1, selected: null });
    } else {
      updateState({ completed: true });
    }
  };

  const toggleMarkReview = () => {
    updateState({
      markedReview: state.markedReview.includes(state.currentQ)
        ? state.markedReview.filter(i => i !== state.currentQ)
        : [...state.markedReview, state.currentQ]
    });
  };

  useEffect(() => {
    const handleVisibility = () => {
      if (state.testMode && !state.completed && document.hidden) {
        alert("Test will be submitted if you leave!");
        endTest();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [state.testMode, state.completed]);

  const renderTabContent = () => {
    switch(state.activeTab) {
      case 'available': return (
        <>
          <div className="flex items-center mb-6">
            <div className="relative w-full max-w-md">
              <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="space-y-6">
            {data.providers.map((p,i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{p.logo}</div>
                    <div>
                      <h3 className="font-medium">{p.name}</h3>
                      <p className="text-sm text-gray-500">{p.skills.join(', ')}</p>
                    </div>
                  </div>
                  <button className="flex items-center text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors" 
                    onClick={() => window.open(p.url, '_blank')}>
                    Browse <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      );
      case 'mycerts': return (
        <div className="space-y-6">
          {data.certs.map((c,i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 bg-green-50 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{c.badge}</div>
                  <div>
                    <h3 className="font-medium">{c.name}</h3>
                    <p className="text-sm text-gray-600">{c.provider}</p>
                  </div>
                </div>
                <button className="text-blue-600 text-sm flex items-center hover:text-blue-800 transition-colors">
                  View <ExternalLink className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      );
      case 'inprogress': return (
        <div className="space-y-6">
          {data.progress.map((p,i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium">{p.name}</h3>
                  <p className="text-sm text-gray-500">{p.provider}</p>
                </div>
                <button className="text-blue-600 text-sm hover:text-blue-800 transition-colors">Continue</button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${p.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Skill Verification</h1>
          <p className="text-gray-600 mt-2">Validate your expertise</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {data.stats.map((s,i) => (
            <motion.div 
              key={i} 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-700">{s.title}</h3>
                <div className={`p-2 ${s.bg} rounded-full`}>{s.icon}</div>
              </div>
              <p className="text-3xl font-bold mt-4">{s.count}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
          <div className="flex border-b">
            {['available', 'mycerts', 'inprogress'].map(t => (
              <button key={t} className={`px-6 py-4 text-sm font-medium ${state.activeTab === t ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
                onClick={() => updateState({ activeTab: t })}>
                {t === 'available' ? 'Available' : t === 'mycerts' ? 'My Certs' : 'In Progress'}
              </button>
            ))}
          </div>
          <div className="p-6">{renderTabContent()}</div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100 hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-medium text-gray-900">Boost Profile</h3>
              <p className="text-gray-600 mt-1">Get 38% more client interest</p>
            </div>
            <motion.button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={startTest}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Take Test
            </motion.button>
          </div>
        </div>
      </main>

      {state.testMode && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="bg-gray-100 p-4 flex justify-between items-center border-b">
            <div className="flex items-center">
              <button onClick={() => updateState({ cameraOn: !state.cameraOn })} className="mr-4 flex items-center hover:text-blue-600 transition-colors">
                {state.cameraOn ? <Video className="h-5 w-5 mr-1" /> : <VideoOff className="h-5 w-5 mr-1" />}
                {state.cameraOn ? 'Camera On' : 'Camera Off'}
              </button>
              {!state.subjectSelect && (
                <span className="text-sm font-medium">
                  Question {state.currentQ + 1}/{data.questions[state.selectedSubject]?.length}
                </span>
              )}
            </div>
            <button onClick={endTest} className="text-red-600 font-medium hover:text-red-800 transition-colors">
              Submit & Exit
            </button>
          </div>
          
          <div className="flex-1 flex flex-col md:flex-row">
            <div className={`${state.cameraOn ? 'md:w-3/4' : 'w-full'} p-6 overflow-auto`}>
              {state.subjectSelect ? (
                <div className="max-w-2xl mx-auto py-12">
                  <h2 className="text-2xl font-bold mb-8 text-center">Select Your Subject</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.subjects.map((subject, i) => (
                      <motion.button
                        key={i}
                        className={`p-6 border rounded-lg text-lg font-medium text-center transition-colors ${
                          state.selectedSubject === subject 
                            ? 'bg-blue-100 border-blue-500 text-blue-700' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => updateState({ 
                          selectedSubject: subject, 
                          subjectSelect: false 
                        })}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {subject}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : !state.completed ? (
                <div className="max-w-2xl mx-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-medium">{data.questions[state.selectedSubject][state.currentQ].q}</h3>
                    <button 
                      onClick={toggleMarkReview}
                      className={`flex items-center text-sm ${state.markedReview.includes(state.currentQ) ? 'text-amber-600' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
                    >
                      <Bookmark className={`h-4 w-4 mr-1 ${state.markedReview.includes(state.currentQ) ? 'fill-amber-500' : ''}`} />
                      {state.markedReview.includes(state.currentQ) ? 'Marked' : 'Mark'}
                    </button>
                  </div>
                  <div className="space-y-3">
                    {data.questions[state.selectedSubject][state.currentQ].opts.map((o,i) => (
                      <motion.button 
                        key={i} 
                        className={`w-full text-left p-4 border rounded-lg transition-colors ${
                          state.selected === i 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => updateState({ selected: i })}
                        whileHover={{ x: 5 }}
                      >
                        {o}
                      </motion.button>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {state.markedReview.includes(state.currentQ) && 'Marked for review'}
                    </span>
                    <button 
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
                      onClick={nextQ} 
                      disabled={state.selected === null}
                    >
                      {state.currentQ < data.questions[state.selectedSubject].length - 1 ? 'Next Question' : 'Finish Test'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="max-w-md mx-auto text-center py-12">
                  <motion.div 
                    className="bg-green-100 text-green-800 p-6 rounded-full inline-flex items-center justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Award className="h-10 w-10" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Test Completed!</h3>
                  <p className="text-xl mb-6">Your score: {state.score}/{data.questions[state.selectedSubject].length}</p>
                  <button 
                    onClick={endTest}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Return to Dashboard
                  </button>
                </div>
              )}
            </div>
            
            {state.cameraOn && (
              <div className="md:w-1/4 border-l p-4 bg-gray-50">
                <div className="sticky top-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Camera View</div>
                  <video 
                    autoPlay 
                    muted 
                    className="w-full h-auto rounded-lg border border-gray-200 shadow-sm"
                    ref={v => v && (v.srcObject = state.stream)} 
                  />
                </div>
              </div>
            )}
          </div>

          <AnimatePresence>
            {state.showCorrect && (
              <motion.div 
                className="fixed inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="bg-green-100 text-green-800 p-6 rounded-full shadow-lg flex items-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <Check className="h-12 w-12 mr-2" />
                  <span className="text-xl font-bold">Correct!</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default SkillVerificationPage;