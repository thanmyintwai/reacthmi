import { useState } from 'preact/hooks';

function Keypad() {
  const [input, setInput] = useState('');

  // Handle number and operator buttons
  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  // Clear the input
  const handleClear = () => {
    setInput('');
  };

  // Delete the last character
  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  // Set the calculation result
  const handleSet = () => {
    try {
      // Evaluate the input as a simple expression
      setInput(eval(input).toString());
    } catch {
      setInput('Error');
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <div className="w-full max-w-xs mb-4">
        <input
          type="text"
          className="w-full text-right border border-gray-300 rounded-lg p-3 mb-4 text-gray-700"
          value={input}
          readOnly
          placeholder="0"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-xs">
        {/* Number Buttons */}
        {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'].map((num) => (
          <button
            key={num}
            className="bg-gray-200 p-4 rounded-lg text-xl font-bold hover:bg-gray-300"
            onClick={() => handleButtonClick(num)}
          >
            {num}
          </button>
        ))}

        {/* Calculation Buttons */}
        <button
          className="bg-blue-500 p-4 rounded-lg text-xl font-bold text-white hover:bg-blue-600"
          onClick={() => handleButtonClick('+')}
        >
          +
        </button>
        
        <button
          className="bg-red-500 p-4 rounded-lg text-xl font-bold text-white hover:bg-red-600"
          onClick={handleClear}
        >
          C
        </button>
        
        <button
          className="bg-yellow-500 p-4 rounded-lg text-xl font-bold text-white hover:bg-yellow-600"
          onClick={handleDelete}
        >
          ⌫
        </button>

        <button
          className="col-span-3 bg-green-500 p-4 rounded-lg text-xl font-bold text-white hover:bg-green-600"
          onClick={handleSet}
        >
          Set
        </button>
      </div>
    </div>
  );
}

export default Keypad;
