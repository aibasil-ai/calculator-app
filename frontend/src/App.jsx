import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('') // 顯示用的運算式
  const [tokens, setTokens] = useState([]) // 儲存運算式的 token 陣列 [數字, 運算符, 數字, ...]
  const [currentNumber, setCurrentNumber] = useState('0') // 目前輸入的數字
  const [lastResult, setLastResult] = useState(null) // 是否剛計算完結果

  // 取得運算符號顯示文字
  const getOperatorSymbol = (op) => {
    switch (op) {
      case 'add': return '+'
      case 'subtract': return '−'
      case 'multiply': return '×'
      case 'divide': return '÷'
      default: return ''
    }
  }

  // 運算符優先級
  const getPrecedence = (op) => {
    if (op === 'multiply' || op === 'divide') return 2
    if (op === 'add' || op === 'subtract') return 1
    return 0
  }

  // 執行單一運算
  const performOperation = (a, b, op) => {
    const numA = parseFloat(a)
    const numB = parseFloat(b)

    switch (op) {
      case 'add': return numA + numB
      case 'subtract': return numA - numB
      case 'multiply': return numA * numB
      case 'divide':
        if (numB === 0) throw new Error('除以零錯誤')
        return numA / numB
      default: throw new Error(`未知運算符: ${op}`)
    }
  }

  // 使用正確的運算順序計算表達式
  // 演算法：先處理乘除，再處理加減
  const evaluateExpression = (tokenArray) => {
    if (tokenArray.length === 0) return 0
    if (tokenArray.length === 1) return parseFloat(tokenArray[0])

    try {
      // 複製陣列避免修改原始資料
      let workingTokens = [...tokenArray]

      // 第一階段：處理乘法和除法（優先級較高）
      let i = 1
      while (i < workingTokens.length) {
        const op = workingTokens[i]
        if (op === 'multiply' || op === 'divide') {
          const left = parseFloat(workingTokens[i - 1])
          const right = parseFloat(workingTokens[i + 1])
          const result = performOperation(left, right, op)
          // 將 left, op, right 替換為 result
          workingTokens.splice(i - 1, 3, result)
          // 不增加 i，因為陣列長度變短了
        } else {
          i += 2 // 跳到下一個運算符
        }
      }

      // 第二階段：處理加法和減法（從左到右）
      i = 1
      while (i < workingTokens.length) {
        const op = workingTokens[i]
        if (op === 'add' || op === 'subtract') {
          const left = parseFloat(workingTokens[i - 1])
          const right = parseFloat(workingTokens[i + 1])
          const result = performOperation(left, right, op)
          workingTokens.splice(i - 1, 3, result)
        } else {
          i += 2
        }
      }

      return workingTokens[0]
    } catch (error) {
      alert(`計算錯誤: ${error.message}`)
      return 0
    }
  }

  // 處理數字鍵輸入
  const handleNumberClick = (num) => {
    // 如果剛算完結果，開始新的運算
    if (lastResult !== null) {
      setCurrentNumber(String(num))
      setDisplay(String(num))
      setTokens([])
      setExpression('')
      setLastResult(null)
      return
    }

    const newNumber = currentNumber === '0' ? String(num) : currentNumber + num
    setCurrentNumber(newNumber)
    setDisplay(newNumber)
  }

  // 處理運算符號輸入
  const handleOperationClick = (op) => {
    // 如果剛算完結果，用結果繼續計算
    if (lastResult !== null) {
      setTokens([lastResult])
      setExpression(String(lastResult) + ' ' + getOperatorSymbol(op))
      setCurrentNumber('0')
      setDisplay(String(lastResult))
      setLastResult(null)
      setTokens([String(lastResult), op])
      return
    }

    const num = currentNumber

    if (tokens.length === 0) {
      // 第一個數字
      setTokens([num, op])
      setExpression(num + ' ' + getOperatorSymbol(op))
    } else {
      // 檢查最後一個是否是運算符（連續輸入運算符的情況）
      if (typeof tokens[tokens.length - 1] === 'string' &&
        ['add', 'subtract', 'multiply', 'divide'].includes(tokens[tokens.length - 1])) {
        // 替換最後一個運算符
        const newTokens = [...tokens]
        newTokens[newTokens.length - 1] = op
        setTokens(newTokens)
        // 更新表達式顯示
        setExpression(prev => {
          const parts = prev.split(' ')
          parts[parts.length - 1] = getOperatorSymbol(op)
          return parts.join(' ')
        })
      } else {
        // 正常情況：添加數字和運算符
        setTokens([...tokens, num, op])
        setExpression(prev => prev + ' ' + num + ' ' + getOperatorSymbol(op))
      }
    }

    setCurrentNumber('0')
  }

  // 處理小數點輸入
  const handleDecimalClick = () => {
    if (lastResult !== null) {
      setCurrentNumber('0.')
      setDisplay('0.')
      setTokens([])
      setExpression('')
      setLastResult(null)
      return
    }

    if (!currentNumber.includes('.')) {
      setCurrentNumber(currentNumber + '.')
      setDisplay(currentNumber + '.')
    }
  }

  // 處理等號
  const handleEquals = () => {
    if (tokens.length === 0) return

    // 檢查最後是否有待處理的運算符
    const lastToken = tokens[tokens.length - 1]
    let finalTokens = [...tokens]

    if (['add', 'subtract', 'multiply', 'divide'].includes(lastToken)) {
      // 最後是運算符，加入目前的數字
      finalTokens.push(currentNumber)
    } else if (tokens.length === 1) {
      // 只有一個數字
      const result = parseFloat(tokens[0])
      setDisplay(String(result))
      setExpression(tokens[0] + ' = ' + result)
      setLastResult(result)
      return
    }

    // 計算結果（使用正確的運算優先順序）
    const result = evaluateExpression(finalTokens)

    // 建立完整的表達式字串
    let fullExpression = ''
    for (let i = 0; i < finalTokens.length; i++) {
      if (i % 2 === 0) {
        // 數字
        fullExpression += finalTokens[i]
      } else {
        // 運算符
        fullExpression += ' ' + getOperatorSymbol(finalTokens[i]) + ' '
      }
    }
    fullExpression += ' = ' + result

    setDisplay(String(result))
    setExpression(fullExpression)
    setTokens([])
    setCurrentNumber(String(result))
    setLastResult(result)
  }

  // 清除
  const handleClear = () => {
    setDisplay('0')
    setCurrentNumber('0')
    setTokens([])
    setExpression('')
    setLastResult(null)
  }

  // 退格
  const handleBackspace = () => {
    if (lastResult !== null) {
      // 剛計算完，退格就清除
      handleClear()
      return
    }

    if (currentNumber.length > 1) {
      const newNumber = currentNumber.slice(0, -1)
      setCurrentNumber(newNumber)
      setDisplay(newNumber)
    } else if (currentNumber !== '0') {
      setCurrentNumber('0')
      setDisplay('0')
    }
  }

  // 鍵盤事件處理
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key

      // 防止預設行為
      if (/^[0-9+\-*/=.]$/.test(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
        event.preventDefault()
      }

      // 數字鍵
      if (/^[0-9]$/.test(key)) {
        handleNumberClick(parseInt(key))
      }
      // 小數點
      else if (key === '.') {
        handleDecimalClick()
      }
      // 加法
      else if (key === '+') {
        handleOperationClick('add')
      }
      // 減法
      else if (key === '-') {
        handleOperationClick('subtract')
      }
      // 乘法
      else if (key === '*') {
        handleOperationClick('multiply')
      }
      // 除法
      else if (key === '/') {
        handleOperationClick('divide')
      }
      // 等號
      else if (key === 'Enter' || key === '=') {
        handleEquals()
      }
      // 清除
      else if (key === 'Escape' || key === 'c' || key === 'C') {
        handleClear()
      }
      // 退格
      else if (key === 'Backspace') {
        handleBackspace()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentNumber, tokens, lastResult])

  return (
    <div className="calculator-container">
      <h1>Calculator</h1>
      <p className="keyboard-hint">💡 可使用鍵盤數字鍵、運算符號 (+, -, *, /)、Enter (=)、Esc (清除)、Backspace</p>
      <p className="operator-hint">✨ 支援四則運算優先順序：先乘除，後加減</p>
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
          <button onClick={handleEquals} className="btn btn-equals" style={{ gridRow: 'span 2' }}>=</button>

          <button onClick={() => handleNumberClick(0)} className="btn" style={{ gridColumn: 'span 2' }}>0</button>
          <button onClick={handleDecimalClick} className="btn">.</button>
        </div>
      </div>
      {expression && (
        <div className="expression-history">
          <p className="expression-label">計算過程</p>
          <p className="expression-text">{expression}</p>
        </div>
      )}
    </div>
  )
}

export default App
