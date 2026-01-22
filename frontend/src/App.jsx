import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [firstOperand, setFirstOperand] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)
  const [result, setResult] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  const handleNumberClick = (num) => {
    if (waitingForSecondOperand) {
      setDisplay(String(num))
      setWaitingForSecondOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const handleDecimalClick = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.')
      setWaitingForSecondOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const handleOperationClick = async (op) => {
    const inputValue = parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operation) {
      const result = await calculate(firstOperand, inputValue, operation)
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperation(op)
  }

  const calculate = async (a, b, op) => {
    try {
      const response = await fetch(`${API_URL}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operation: op,
          a: a,
          b: b,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
        return data.result
      } else {
        alert(`Error: ${data.error}`)
        return a
      }
    } catch (error) {
      alert(`Network error: ${error.message}`)
      return a
    }
  }

  const handleEquals = async () => {
    const inputValue = parseFloat(display)

    if (firstOperand !== null && operation) {
      const result = await calculate(firstOperand, inputValue, operation)
      setDisplay(String(result))
      setFirstOperand(null)
      setOperation(null)
      setWaitingForSecondOperand(false)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setFirstOperand(null)
    setOperation(null)
    setWaitingForSecondOperand(false)
    setResult(null)
  }

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key

      // Prevent default behavior for calculator keys
      if (/^[0-9+\-*/=.]$/.test(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
        event.preventDefault()
      }

      // Number keys (0-9) - both main keyboard and numpad
      if (/^[0-9]$/.test(key)) {
        handleNumberClick(parseInt(key))
      }
      // Decimal point
      else if (key === '.' || key === 'Decimal') {
        handleDecimalClick()
      }
      // Addition
      else if (key === '+') {
        handleOperationClick('add')
      }
      // Subtraction
      else if (key === '-') {
        handleOperationClick('subtract')
      }
      // Multiplication
      else if (key === '*') {
        handleOperationClick('multiply')
      }
      // Division
      else if (key === '/') {
        handleOperationClick('divide')
      }
      // Equals
      else if (key === 'Enter' || key === '=') {
        handleEquals()
      }
      // Clear
      else if (key === 'Escape' || key === 'c' || key === 'C') {
        handleClear()
      }
      // Backspace
      else if (key === 'Backspace') {
        handleBackspace()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [display, firstOperand, operation, waitingForSecondOperand])

  return (
    <div className="calculator-container">
      <h1>Calculator</h1>
      <p className="keyboard-hint">💡 可使用鍵盤數字鍵、運算符號 (+, -, *, /)、Enter (=)、Esc (清除)、Backspace</p>
      <div className="calculator">
        <div className="display">{display}</div>
        <div className="buttons">
          <button onClick={handleClear} className="btn btn-clear">C</button>
          <button onClick={handleBackspace} className="btn btn-operation">←</button>
          <button onClick={() => handleOperationClick('divide')} className="btn btn-operation">÷</button>
          <button onClick={() => handleOperationClick('multiply')} className="btn btn-operation">×</button>

          <button onClick={() => handleNumberClick(7)} className="btn">7</button>
          <button onClick={() => handleNumberClick(8)} className="btn">8</button>
          <button onClick={() => handleNumberClick(9)} className="btn">9</button>
          <button onClick={() => handleOperationClick('subtract')} className="btn btn-operation">−</button>

          <button onClick={() => handleNumberClick(4)} className="btn">4</button>
          <button onClick={() => handleNumberClick(5)} className="btn">5</button>
          <button onClick={() => handleNumberClick(6)} className="btn">6</button>
          <button onClick={() => handleOperationClick('add')} className="btn btn-operation">+</button>

          <button onClick={() => handleNumberClick(1)} className="btn">1</button>
          <button onClick={() => handleNumberClick(2)} className="btn">2</button>
          <button onClick={() => handleNumberClick(3)} className="btn">3</button>
          <button onClick={handleEquals} className="btn btn-equals" style={{gridRow: 'span 2'}}>=</button>

          <button onClick={() => handleNumberClick(0)} className="btn" style={{gridColumn: 'span 2'}}>0</button>
          <button onClick={handleDecimalClick} className="btn">.</button>
        </div>
      </div>
      {result && (
        <div className="result-info">
          <p>Last calculation: {result.a} {result.operation} {result.b} = {result.result}</p>
        </div>
      )}
    </div>
  )
}

export default App
