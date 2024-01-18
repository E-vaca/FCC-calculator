import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState("")
  const [expression, setExpression] = useState("")
  const et = expression.trim()

  const isOperator = (symbol: string) => {
    const operators = ["+", "-", "*", "/"]

    return operators.includes(symbol)
  }


  const buttonPress = (symbol: string) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } 
    
    else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.charAt(0) === "-" ? answer.slice(1) : "-" + answer
      )
    } 
    
    else if (symbol === "percentage") {
      if (answer === "") return;
      setAnswer(
        String(parseFloat(answer) / 100)
      )
    } 
    
    else if (isOperator(symbol)) {
        setExpression(et + " " + symbol + " ")
    } 
    
    else if (symbol === "=") {
        calculate()
        setExpression("")
    } 
    
    else if (symbol === "0") {
        if (expression.charAt(0) !== "0") {
          setExpression(expression + symbol)
        }
    } 
    
    else if (symbol === ".") {
        // split by operators and get last number //
    const lastNum = expression.split(/[-+/*]/).pop();
        // if last number already has a decimal, don't add another //
    if (lastNum?.includes(".")) return;
      setExpression(expression + symbol)
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol)
      } else {
        setExpression(expression + symbol)
      }
    }
}

  const calculate = () => {
    // if last character is an operator, do nothing //
    if (isOperator(et.charAt(et.length - 1))) return;
    // clean the expression so that 2 operators in a row uses the last operator
    // 10 *  5 * + 5 = 10
    
    const parts = et.split(" ")

    console.log(parts)

    const newParts = []
    
    for (let i = parts.length - 1 ; i >= 0; i--) {
      if (!isOperator(parts[i]) && parts[i-1] == "-") {
        newParts.unshift(parts[i-1] + parts[i])
        console.log(newParts)
      } else if (!isOperator(parts[i]) && parts[i - 1] !=='-') {
        newParts.unshift(parts[i])
        console.log(newParts)
      } else if (isOperator(parts[i]) && parts[i] == "-") {
        newParts.unshift('')
        console.log(newParts)
      } else if (isOperator(parts[i]) && parts[i] !== "-" && !isOperator(parts[i + 1])) {
        newParts.unshift(parts[i])
        console.log(newParts)
      } else if (isOperator(parts[i]) && isOperator(parts[i + 1]) && parts[i + 1] !== "-" ) {
        newParts.unshift('')
        console.log(newParts)
      } else if (isOperator(parts[i]) && isOperator(parts[i + 1]) && parts[i + 1] == "-" && !isOperator(parts[i + 2])) {
        newParts.unshift(parts[i])
        console.log(newParts)
      } else if (isOperator(parts[i]) && isOperator(parts[i + 1]) && parts[i + 1] !== "-" && isOperator(parts[i - 1])) {
        newParts.unshift('')
        console.log(newParts)
      }
    }

    const newExpression = newParts.join(" ")
    console.log(newExpression)
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string)
    } else {
      setAnswer(eval(newExpression) as string)
    }

  }


  return (
    <>
      <div className="container">
        <h1>Calculator App</h1>
        <div id="calculator">
          <div id="display" style={{textAlign: "right"}}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <button id="clear" onClick={() => buttonPress("clear")} className="light-grey">AC</button>
          <button id="negative" onClick={() => buttonPress("negative")} className="light-grey">+/-</button>
          <button id="percentage" onClick={() => buttonPress("percentage")} className="light-grey">%</button>
          <button id="divide" onClick={() => buttonPress("/")} className="yellow">/</button>
          <button id="seven" onClick={() => buttonPress("7")} className="dark-grey">7</button>
          <button id="eight" onClick={() => buttonPress("8")} className="dark-grey">8</button>
          <button id="nine" onClick={() => buttonPress("9")} className="dark-grey">9</button>
          <button id="multiply" onClick={() => buttonPress("*")} className="yellow">*</button>
          <button id="four" onClick={() => buttonPress("4")} className="dark-grey">4</button>
          <button id="five" onClick={() => buttonPress("5")} className="dark-grey">5</button>
          <button id="six" onClick={() => buttonPress("6")} className="dark-grey">6</button>
          <button id="subtract" onClick={() => buttonPress("-")} className="yellow">-</button>
          <button id="one" onClick={() => buttonPress("1")} className="dark-grey">1</button>
          <button id="two" onClick={() => buttonPress("2")} className="dark-grey">2</button>
          <button id="three" onClick={() => buttonPress("3")} className="dark-grey">3</button>
          <button id="add" onClick={() => buttonPress("+")} className="yellow">+</button>
          <button id="zero" onClick={() => buttonPress("0")} className="dark-grey">0</button>
          <button id="decimal" onClick={() => buttonPress(".")} className="dark-grey">.</button>
          <button id="equals" onClick={() => buttonPress("=")} className="yellow">=</button>
        </div>
      </div>
    </>
  )
}

export default App
