import { useState, useRef, useEffect } from 'react'
import ChatSidebar from '../components/ChatSidebar'
import BattleResults from '../components/BattleResults'
import './App.css'

// Mock data as shown in the task
const MOCK_DATA = {
  problem: "Write an code for Factorial function in js",
  solution_1: `Here's a simple JavaScript function to calculate the factorial of a number using both iterative and recursive approaches:

### 1. **Iterative Approach (using a loop)**
\`\`\`javascript
function factorialIterative(n) {
    if (n < 0) return NaN; // Factorial of negative numbers is undefined
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Example usage:
console.log(factorialIterative(5)); // Output: 120 (5! = 5 x 4 x 3 x 2 x 1 = 120)
console.log(factorialIterative(0)); // Output: 1 (0! is defined as 1)
\`\`\`

### 2. **Recursive Approach**
\`\`\`javascript
function factorialRecursive(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1; // Base case
    return n * factorialRecursive(n - 1);
}

// Example usage:
console.log(factorialRecursive(5)); // Output: 120
console.log(factorialRecursive(0)); // Output: 1
\`\`\`

### 3. **One-Liner (using ES6 reduce)**
\`\`\`javascript
const factorialOneLiner = (n) =>
    n < 0 ? NaN : Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a * b, 1);

// Example usage:
console.log(factorialOneLiner(5)); // Output: 120
\`\`\`

### Key Notes:
- Factorial of 0 is 1 by definition.
- Factorial of negative numbers is NaN (not a number).
- The iterative approach is generally more efficient for large n.
- The recursive approach is elegant but may hit stack limits for very large n.`,
  solution_2: `Certainly! Below is a simple implementation of a factorial function in JavaScript.

\`\`\`javascript
function factorial(n) {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Example usage:
console.log(factorial(5)); // Output: 120
console.log(factorial(0)); // Output: 1
console.log(factorial(1)); // Output: 1
\`\`\`

### Explanation:
- **Input Validation**: The function first checks if the input n is negative and throws an error.
- **Base Case**: If n is 0 or 1, the function returns 1.
- **Iterative Calculation**: For n > 1, multiplies result by each integer from 2 to n.

### Recursive Version:

\`\`\`javascript
function factorialRecursive(n) {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorialRecursive(n - 1);
}

// Example usage:
console.log(factorialRecursive(5)); // Output: 120
\`\`\`

Both versions are correct and can be used depending on your preference or specific requirements.`,
  judge: {
    solution_1_score: 10,
    solution_2_score: 9,
    solution_1_reasoning: "Solution 1 provides three excellent implementations: iterative, recursive, and a modern ES6 one-liner using Array.from and reduce. The iterative implementation is clean and avoids redundant conditions, as the loop naturally handles 0 and 1 correctly. Returning NaN for negative inputs is standard practice in mathematical JS operations.",
    solution_2_reasoning: "Solution 2 provides good iterative and recursive implementations, and handles negative inputs robustly by throwing an Error. However, the iterative implementation contains redundant code: the check if (n === 0 || n === 1) return 1; is unnecessary because the loop starting at i = 2 would not execute anyway, and the function would correctly return the initialized result = 1."
  }
}

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      content: 'Welcome, Commander. Submit a coding challenge to initiate an AI model duel. Watch as two AI fighters battle for supremacy!'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [battleData, setBattleData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    const trimmed = inputValue.trim()
    if (!trimmed || isLoading) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: trimmed
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    setBattleData(null)

    // Simulate API call delay
    setTimeout(() => {
      const responseData = { ...MOCK_DATA, problem: trimmed }
      setBattleData(responseData)

      const systemMessage = {
        id: Date.now() + 1,
        type: 'system',
        content: "Battle complete! Two solutions generated. The judge has delivered the verdict — Solution 1 wins with a score of " + responseData.judge.solution_1_score + "/10!"
      }
      setMessages(prev => [...prev, systemMessage])
      setIsLoading(false)
    }, 2000)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-brand">
          <span className="nav-icon">⚔️</span>
          <span className="nav-title">AI Battle Arena</span>
          <span className="nav-badge">LIVE</span>
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link active">Arena</a>
          <a href="#" className="nav-link">Spectate</a>
          <a href="#" className="nav-link">Rankings</a>
        </div>
        <div className="nav-actions">
          <button className="btn-pro">Go Pro</button>
          <span className="nav-avatar">👤</span>
        </div>
      </nav>

      <main className="main-content">
        {/* Left Panel */}
        <ChatSidebar
          messages={messages}
          inputValue={inputValue}
          isLoading={isLoading}
          onInputChange={setInputValue}
          onSend={handleSend}
          onKeyDown={handleKeyDown}
          messagesEndRef={messagesEndRef}
        />

        {/* Right Panel */}
        <BattleResults
          battleData={battleData}
          isLoading={isLoading}
        />
      </main>
    </div>
  )
}

export default App
