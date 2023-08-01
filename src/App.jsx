import { useState } from "react"
import { evaluate, round } from "mathjs"

function App() {
  const [displayed, setDisplayed] = useState("0")
  const [colorScheme, setColorScheme] = useState(0)
  const [displayedIsResult, setDisplayedIsResult] = useState(false)

  const lastCharIsNumber = string => {
    const lastChar = string[string.length - 1]
    return !isNaN(Number(lastChar))
  }

  const pressNumber = num => {
    if (displayedIsResult) {
      setDisplayedIsResult(false)
      setDisplayed(`${num}`)
    } else {
      setDisplayed(displayed === "0" ? `${num}` : `${displayed}${num}`)
    }
  }

  const pressOperator = num => {
    if (displayed) {
      const charIsNumber = lastCharIsNumber(displayed)

      if (charIsNumber) {
        if (displayedIsResult) {
          setDisplayedIsResult(false)
          setDisplayed(displayed === "0" ? `0${num}` : `${displayed}${num}`)
        } else {
          setDisplayed(displayed === "0" ? `${num}` : `${displayed}${num}`)
        }
      }
    }
  }

  const pressDot = () => {
    if (displayedIsResult) {
      setDisplayedIsResult(false)
      setDisplayed("0.")
    } else {
      let lastChar = displayed[displayed.length - 1]
      if (lastChar !== ".") setDisplayed(`${displayed}.`)
    }
  }

  const toggleColorScheme = () => {
    setColorScheme(colorScheme < 3 ? colorScheme + 1 : 0)
  }

  const pressReset = () => {
    if (displayedIsResult) setDisplayedIsResult(false)
    setDisplayed("0")
  }

  const pressDel = () => {
    if (displayedIsResult) {
      setDisplayedIsResult(false)
      setDisplayed("0")
    } else if (displayed.length === 1) {
      setDisplayed("0")
    } else if (displayed.length > 0) {
      const current = displayed
      const sliced = current.slice(0, -1)

      setDisplayed(sliced)
    }
  }

  const flashBorder = () => {
    console.log("flash border")
    const elem = document.getElementById("calc-display")
    if (elem) {
      elem.classList.add("error_border")
      setTimeout(() => {
        elem.classList.remove("error_border")
      }, 300)
    }
  }

  const pressEqual = () => {
    try {
      if (displayed && displayed.replaceAll) {
        const replaced = displayed.replaceAll("x", "*")
        const result = evaluate(replaced)
        const rounded = round(result, 5)

        if (displayed !== `${rounded}`) {
          setDisplayedIsResult(true)
          setDisplayed(rounded ? `${rounded}` : "0")
        }
      }
    } catch (err) {
      flashBorder()
    }
  }

  return (
    <div className="w-full main_bg theme_1 select-none min-h-screen flex items-center justify-center base_text_color text-[2rem] p-5">
      <div className="flex flex-col w-full max-w-md min-h-[30rem] py-7">
        <div className="flex justify-between items-end">
          <div className="text-2xl flex-grow">calc</div>
          <div className="flex flex-col items-end text-xs font-semibold">
            <div className="flex pb-0.5 px-0.5">
              <div className="w-5 text-center">1</div>
              <div className="w-5 text-center">2</div>
              <div className="w-5 text-center">3</div>
              <div className="w-5 text-center">4</div>
            </div>
            <div className="flex items-center">
              <h2 className=" mr-6 tracking-widest text-[11px]">THEME</h2>
              <div
                className="screen_bg h-6 w-[5.25rem] p-1 rounded-full cursor-pointer"
                onClick={toggleColorScheme}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-red-500 transition-all ${
                    colorScheme === 1
                      ? "ml-5"
                      : colorScheme === 2
                      ? "ml-10"
                      : colorScheme === 3
                      ? "ml-[3.75rem]"
                      : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          id="calc-display"
          className="screen_bg box_radius  mt-5 p-7 border-2 border-transparent transition-colors"
        >
          <div className="justify-end flex overflow-hidden w-full">
            <div className="whitespace-nowrap text-5xl">{displayed}</div>
          </div>
        </div>

        <div className="bg-slate-800 box_radius mt-5 p-7">
          <div className="grid grid-cols-4 gap-5">
            <button
              type="button"
              className="small_button"
              onClick={() => {
                pressNumber(7)
              }}
            >
              7
            </button>
            <button
              type="button"
              className="small_button"
              onClick={() => {
                pressNumber(8)
              }}
            >
              8
            </button>
            <button
              type="button"
              className="small_button"
              onClick={() => {
                pressNumber(9)
              }}
            >
              9
            </button>
            <button
              type="button"
              className="del_button"
              onClick={() => {
                pressDel()
              }}
            >
              DEL
            </button>
            <button
              type="button"
              className="small_button"
              onClick={() => {
                pressNumber(4)
              }}
            >
              4
            </button>
            <button
              type="button"
              className="small_button"
              onClick={() => {
                pressNumber(5)
              }}
            >
              5
            </button>
            <button
              type="button"
              className="small_button"
              onClick={() => {
                pressNumber(6)
              }}
            >
              6
            </button>
            <button
              type="button"
              className="small_button"
              onClick={() => {
                pressOperator("+")
              }}
            >
              +
            </button>
            <button
              type="button"
              className="small_button"
              onClick={() => {
                pressNumber(1)
              }}
            >
              1
            </button>
            <button
              type="button"
              className="small_button"
              onClick={() => {
                pressNumber(2)
              }}
            >
              2
            </button>
            <button
              type="button"
              className="small_button"
              onClick={() => {
                pressNumber(3)
              }}
            >
              3
            </button>
            <button
              type="button"
              className="small_button"
              onClick={() => {
                pressOperator("-")
              }}
            >
              -
            </button>
            <button
              type="button"
              className="small_button"
              onClick={() => {
                pressDot()
              }}
            >
              .
            </button>
            <button
              type="button"
              className="small_button"
              onClick={() => {
                pressNumber(0)
              }}
            >
              0
            </button>
            <button
              type="button"
              className="small_button"
              onClick={() => {
                pressOperator("/")
              }}
            >
              /
            </button>
            <button
              type="button"
              className="small_button"
              onClick={() => {
                pressOperator("x")
              }}
            >
              x
            </button>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-5">
            <button type="button" className="reset_button" onClick={pressReset}>
              RESET
            </button>
            <button type="button" className="equal_button" onClick={pressEqual}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
