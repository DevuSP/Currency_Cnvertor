import { useState } from "react"
import InputBox from "./Components/input"
import useCurrencyInfo from "./Hooks/useCurrencyInfo"


function App() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");

  const currencyInfo = useCurrencyInfo(from);
  const option = Object.keys(currencyInfo); //gives all keys inside of object.
  
  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  }
  
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  }

  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url("Currency_Converter.jpeg")`
        }}
      >
        <div
          className="w-full"
        >
          <div
            className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdropblur-sm bg-white/30"
          >
            <form onSubmit={(e) => {
              e.preventDefault(); // prevents from to go any address & refresh.
              convert();
            }}>
              <div
                className="w-full mb-1"
              >
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOption={option}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}
                />
              </div>
              <div
                className="relative w-full h-0.5"
              >
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                  onClick={swap}
                >
                  swap
                </button>
              </div>
              <div
                className="w-full mt-1 mb-4"
              >
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOption={option}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />
              </div>
              <button
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
                type="submit">
                Convert {from.toUpperCase()} to {to.toUpperCase()}.
              </button>
            </form>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
