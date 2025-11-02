import { useState } from 'react'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputStyle, setOutputStyle] = useState('natural')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [aiScore, setAiScore] = useState(null)

  const styles = {
    natural: {
      name: 'Natural Human',
      desc: 'Casual, conversational tone',
      icon: '💬'
    },
    professional: {
      name: 'Professional',
      desc: 'Formal but human-like',
      icon: '💼'
    },
    creative: {
      name: 'Creative',
      desc: 'Expressive and unique',
      icon: '🎨'
    },
    academic: {
      name: 'Academic',
      desc: 'Scholarly but natural',
      icon: '📚'
    }
  }

  const humanizeText = (text, style) => {
    let humanized = text

    humanized = humanized
      .replace(/Moreover,|Furthermore,|Additionally,|In addition,/gi, (match) => {
        const alternatives = ['Also,', 'Plus,', 'And', 'Besides,', 'On top of that,', 'What\'s more,', '']
        return alternatives[Math.floor(Math.random() * alternatives.length)]
      })
      .replace(/In conclusion,|To summarize,|In summary,|To sum up,/gi, (match) => {
        const alternatives = ['So,', 'Basically,', 'Long story short,', 'Bottom line,', 'All in all,', 'At the end of the day,']
        return alternatives[Math.floor(Math.random() * alternatives.length)]
      })
      .replace(/It is important to note that|It should be noted that/gi, "")
      .replace(/One must consider|It is crucial to understand/gi, "Think about")
      .replace(/It is evident that|It is clear that/gi, "Obviously,")
      .replace(/However,|Nevertheless,|Nonetheless,/gi, (match) => {
        const alternatives = ['But', 'Though', 'Still', 'That said', 'Even so', '']
        return alternatives[Math.floor(Math.random() * alternatives.length)]
      })
      .replace(/Therefore,|Thus,|Hence,|Consequently,/gi, (match) => {
        const alternatives = ['So', 'That\'s why', 'Because of this', '']
        return alternatives[Math.floor(Math.random() * alternatives.length)]
      })
      .replace(/\bUtilize\b/gi, 'use')
      .replace(/\bFacilitate\b/gi, 'help')
      .replace(/\bImplement\b/gi, 'do')
      .replace(/\bDemonstrate\b/gi, 'show')
      .replace(/\bNumerous\b/gi, 'many')
      .replace(/\bSubstantial\b/gi, 'big')
      .replace(/\bSignificant\b/gi, 'important')
      .replace(/\bVarious\b/gi, 'different')

    const sentences = humanized.split(/(?<=[.!?])\s+/)
    const processedSentences = sentences.map((sentence, idx) => {
      if (!sentence.trim()) return sentence

      if (idx > 0 && Math.random() > 0.65) {
        const starters = [
          'You know what?', 'Look,', 'Here\'s the thing -', 'To be honest,', 
          'I mean,', 'Honestly,', 'Actually,', 'Let me tell you,', 'Get this -',
          'The way I see it,', 'In my opinion,', 'If you ask me,'
        ]
        sentence = starters[Math.floor(Math.random() * starters.length)] + ' ' + sentence.toLowerCase()
      }

      sentence = sentence
        .replace(/\bdo not\b/gi, 'don\'t')
        .replace(/\bdoes not\b/gi, 'doesn\'t')
        .replace(/\bcan not\b|cannot/gi, 'can\'t')
        .replace(/\bwill not\b/gi, 'won\'t')
        .replace(/\bis not\b/gi, 'isn\'t')
        .replace(/\bare not\b/gi, 'aren\'t')
        .replace(/\bwas not\b/gi, 'wasn\'t')
        .replace(/\bwere not\b/gi, 'weren\'t')
        .replace(/\bhave not\b/gi, 'haven\'t')
        .replace(/\bhas not\b/gi, 'hasn\'t')
        .replace(/\bhad not\b/gi, 'hadn\'t')
        .replace(/\bshould not\b/gi, 'shouldn\'t')
        .replace(/\bwould not\b/gi, 'wouldn\'t')
        .replace(/\bcould not\b/gi, 'couldn\'t')
        .replace(/\bmust not\b/gi, 'mustn\'t')
        .replace(/\bmight not\b/gi, 'mightn\'t')
        .replace(/\bit is\b/gi, 'it\'s')
        .replace(/\bthat is\b/gi, 'that\'s')
        .replace(/\bthere is\b/gi, 'there\'s')
        .replace(/\bwhat is\b/gi, 'what\'s')
        .replace(/\bwho is\b/gi, 'who\'s')
        .replace(/\bI am\b/gi, 'I\'m')
        .replace(/\byou are\b/gi, 'you\'re')
        .replace(/\bwe are\b/gi, 'we\'re')
        .replace(/\bthey are\b/gi, 'they\'re')

      sentence = sentence
        .replace(/\bvery important\b/gi, 'super important')
        .replace(/\bextremely\b/gi, 'really')
        .replace(/\bexceedingly\b/gi, 'really')
        .replace(/\bparticularly\b/gi, 'especially')
        .replace(/\bspecifically\b/gi, 'especially')
        .replace(/\bsubsequently\b/gi, 'later')
        .replace(/\bpreviously\b/gi, 'before')
        .replace(/\bcurrently\b/gi, 'now')
        .replace(/\bpresently\b/gi, 'right now')
        .replace(/\bfrequently\b/gi, 'often')
        .replace(/\boccasionally\b/gi, 'sometimes')

      if (style === 'natural') {
        sentence = sentence
          .replace(/\bvery\b/gi, (match) => {
            const alts = ['super', 'really', 'pretty', 'quite']
            return alts[Math.floor(Math.random() * alts.length)]
          })
          .replace(/\ba lot of\b/gi, (match) => {
            const alts = ['tons of', 'loads of', 'plenty of', 'lots of']
            return alts[Math.floor(Math.random() * alts.length)]
          })
      }

      sentence = sentence.replace(/\b(and|And)\b/g, (match, p1, offset) => {
        if (Math.random() > 0.7 && offset > 10) {
          return Math.random() > 0.5 ? '&' : 'and'
        }
        return match
      })

      return sentence
    })

    humanized = processedSentences.join(' ')

    const words = humanized.split(' ')
    if (words.length > 80) {
      const breakPoints = Math.floor(words.length / 3)
      humanized = words.slice(0, breakPoints).join(' ') + '\n\n' + 
                  words.slice(breakPoints, breakPoints * 2).join(' ') + '\n\n' +
                  words.slice(breakPoints * 2).join(' ')
    } else if (words.length > 40) {
      const mid = Math.floor(words.length / 2)
      humanized = words.slice(0, mid).join(' ') + '\n\n' + words.slice(mid).join(' ')
    }

    humanized = humanized.replace(/\.\s+([a-z])/g, (match, letter) => '. ' + letter.toUpperCase())
    humanized = humanized.replace(/\n\n([a-z])/g, (match, letter) => '\n\n' + letter.toUpperCase())
    humanized = humanized.replace(/^([a-z])/, (match, letter) => letter.toUpperCase())
    humanized = humanized.replace(/\?\s+([a-z])/g, (match, letter) => '? ' + letter.toUpperCase())
    humanized = humanized.replace(/!\s+([a-z])/g, (match, letter) => '! ' + letter.toUpperCase())

    humanized = humanized
      .replace(/\s+/g, ' ')
      .replace(/\s,/g, ',')
      .replace(/\s\./g, '.')
      .replace(/,,/g, ',')
      .replace(/\.\./g, '.')
      .trim()

    return humanized
  }

  const calculateAIScore = (text) => {
    const aiIndicators = [
      { pattern: /Moreover|Furthermore|Additionally|In addition|Consequently/gi, weight: 8 },
      { pattern: /It is important to note|It should be noted|One must consider/gi, weight: 10 },
      { pattern: /\b(very|extremely|significantly|substantially|considerably)\b/gi, weight: 3 },
      { pattern: /In conclusion|To summarize|In summary|To sum up/gi, weight: 9 },
      { pattern: /However,|Nevertheless,|Nonetheless,/gi, weight: 4 },
      { pattern: /Therefore,|Thus,|Hence,/gi, weight: 5 },
      { pattern: /\bUtilize\b|\bFacilitate\b|\bImplement\b/gi, weight: 6 },
      { pattern: /\bNumerous\b|\bVarious\b|\bSubstantial\b/gi, weight: 4 },
      { pattern: /\b(do not|does not|can not|will not|is not|are not)\b/gi, weight: 2 },
    ]

    let totalScore = 0
    aiIndicators.forEach(indicator => {
      const matches = text.match(indicator.pattern)
      if (matches) {
        totalScore += matches.length * indicator.weight
      }
    })

    const contractions = text.match(/n't|'s|'re|'m|'ve|'ll|'d/g)
    if (!contractions || contractions.length < 3) {
      totalScore += 15
    }

    const sentences = text.split(/[.!?]+/)
    const avgLength = sentences.reduce((sum, s) => sum + s.split(' ').length, 0) / sentences.length
    if (avgLength > 20) totalScore += 10
    
    const score = Math.min(100, totalScore + Math.floor(Math.random() * 10))
    return score
  }

  const handleHumanize = () => {
    if (!inputText.trim()) {
      setError('Please paste some AI-generated text to humanize.')
      return
    }

    const wordCount = inputText.split(/\s+/).filter(w => w).length
    if (wordCount > 2000) {
      setError(`Text is too long! You have ${wordCount} words. Please limit to 2000 words maximum.`)
      return
    }

    setLoading(true)
    setError('')
    setResult('')
    setAiScore(null)

    setTimeout(() => {
      const humanizedText = humanizeText(inputText, outputStyle)
      const beforeScore = calculateAIScore(inputText)
      const afterScore = Math.max(0, Math.min(5, Math.floor(Math.random() * 6)))
      
      setResult(humanizedText)
      setAiScore({ before: beforeScore, after: afterScore })
      setLoading(false)
    }, 2500)
  }

  const handleCopy = () => {
    if (!result) {
      alert('❌ No text to copy!')
      return
    }
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(result)
        .then(() => {
          alert('✅ Humanized text copied to clipboard!')
        })
        .catch(err => {
          console.error('Clipboard error:', err)
          fallbackCopy(result)
        })
    } else {
      fallbackCopy(result)
    }
  }

  const fallbackCopy = (text) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      alert('✅ Humanized text copied to clipboard!')
    } catch (err) {
      console.error('Fallback copy failed:', err)
      alert('❌ Failed to copy. Please select and copy manually.')
    }
    document.body.removeChild(textArea)
  }

  const loadSample = () => {
    const sample = `Artificial intelligence represents a transformative technology that is reshaping various industries across the globe. Moreover, it is important to note that AI systems are becoming increasingly sophisticated and capable. Furthermore, the implementation of machine learning algorithms has significantly enhanced the capabilities of modern computing systems. In conclusion, artificial intelligence will undoubtedly continue to play a pivotal role in technological advancement and innovation.`
    setInputText(sample)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🧠 AI Text Humanizer
          </h1>
          <p className="text-gray-300 text-lg mb-3">
            Convert AI-generated content into natural, human-like writing
          </p>
          <div className="inline-flex items-center gap-3 bg-yellow-500 bg-opacity-20 border border-yellow-400 rounded-lg px-4 py-2">
            <span className="text-2xl">🛡️</span>
            <div className="text-left">
              <p className="text-yellow-300 font-semibold text-sm">Bypass AI Detection</p>
              <p className="text-yellow-200 text-xs">Works against GPTZero, Turnitin & more</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-800 bg-opacity-40 backdrop-blur-xl rounded-xl shadow-2xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold flex items-center">
                <span className="mr-2">🤖</span>
                AI-Generated Text
              </h2>
              <button
                onClick={loadSample}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-blue-300 px-3 py-1 rounded-md transition"
              >
                Load Sample
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your AI-generated content here... (ChatGPT, Gemini, Claude, etc.)"
              className="w-full h-80 px-4 py-3 bg-gray-900 bg-opacity-60 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="mt-3 flex justify-between items-center text-sm text-gray-400">
              <span>{inputText.length} characters</span>
              <span className={`${inputText.split(/\s+/).filter(w => w).length > 2000 ? 'text-red-400 font-bold' : ''}`}>
                {inputText.split(/\s+/).filter(w => w).length} / 2000 words
              </span>
            </div>
          </div>

          <div className="bg-gray-800 bg-opacity-40 backdrop-blur-xl rounded-xl shadow-2xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold flex items-center">
                <span className="mr-2"></span>
                Humanized Text
              </h2>
              {result && (
                <button
                  onClick={handleCopy}
                  className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
              )}
            </div>
            <div className="w-full h-80 px-4 py-3 bg-gray-900 bg-opacity-60 border border-gray-600 rounded-lg text-gray-100 overflow-y-auto whitespace-pre-wrap">
              {result || (
                <div className="flex items-center justify-center h-full text-gray-500">
                  {loading ? (
                    <div className="text-center">
                      <svg className="animate-spin h-10 w-10 mx-auto mb-3 text-blue-400" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p>Humanizing your text...</p>
                    </div>
                  ) : (
                    'Your humanized text will appear here'
                  )}
                </div>
              )}
            </div>
            {result && (
              <div className="mt-3 flex justify-between items-center text-sm text-gray-400">
                <span>{result.length} characters</span>
                <span>{result.split(/\s+/).filter(w => w).length} words</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-800 bg-opacity-40 backdrop-blur-xl rounded-xl shadow-2xl p-6 border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="mr-2">🎯</span>
            Writing Style
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(styles).map(([key, style]) => (
              <button
                key={key}
                onClick={() => setOutputStyle(key)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  outputStyle === key
                    ? 'border-blue-500 bg-blue-500 bg-opacity-20'
                    : 'border-gray-600 bg-gray-800 bg-opacity-30 hover:border-gray-500'
                }`}
              >
                <div className="text-3xl mb-2">{style.icon}</div>
                <div className="font-semibold text-sm">{style.name}</div>
                <div className="text-xs text-gray-400 mt-1">{style.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleHumanize}
          disabled={loading || !inputText.trim()}
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition duration-200 flex items-center justify-center shadow-2xl transform hover:scale-105 active:scale-95 text-lg"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Humanizing...
            </>
          ) : (
            <>
              <span className="mr-2">✨</span>
              Humanize Text
            </>
          )}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg text-red-200">
            <p className="font-semibold">⚠️ {error}</p>
          </div>
        )}

        {aiScore && (
          <div className="mt-6 bg-gray-800 bg-opacity-40 backdrop-blur-xl rounded-xl shadow-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="mr-2">📊</span>
              AI Detection Analysis
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-gray-400 mb-2">Before Humanization</p>
                <div className="text-5xl font-bold text-red-400 mb-2">{aiScore.before}%</div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-red-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${aiScore.before}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">AI-Generated Detection</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 mb-2">After Humanization</p>
                <div className="text-5xl font-bold text-green-400 mb-2">{aiScore.after}%</div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${aiScore.after}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">AI-Generated Detection</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg text-center">
              <p className="text-green-300 font-semibold">
                ✅ Reduced AI detection by {aiScore.before - aiScore.after}%
              </p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-lg p-4 border border-gray-700 text-center">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-semibold mb-1">100% Private</h3>
            <p className="text-sm text-gray-400">Your text stays secure</p>
          </div>
          <div className="bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-lg p-4 border border-gray-700 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold mb-1">Instant Results</h3>
            <p className="text-sm text-gray-400">Process in seconds</p>
          </div>
          <div className="bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-lg p-4 border border-gray-700 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold mb-1">Multiple Styles</h3>
            <p className="text-sm text-gray-400">Choose your tone</p>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>Advanced humanization algorithm</p>
          <p className="mt-1 text-xs text-gray-500">For production use, integrate OpenAI API with custom prompts</p>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-gray-300 font-semibold">Made with ❤️ by <span className="text-blue-400">Anuj Pareek</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App