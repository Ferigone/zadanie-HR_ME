import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useFirebaseAuth } from "../firebase/FirebaseAuth";
import { firestore } from "../firebase/firebaseConfig";

const Calculator = () => {
  const { user } = useFirebaseAuth();
  const [values, setValues] = useState({
    value1: null,
    value2: null,
  });
  const [result, setResult] = useState(0);
  const [errors, setErrors] = useState({
    value1: "",
    value2: "",
  });

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (!isNaN(parseFloat(value)) || value === "") {
      setValues({
        ...values,
        [name]: parseFloat(value),
      });
    }
  };

  const validateInputs = () => {
    let errors = {
      value1: "",
      value2: "",
    };

    if (!values.value1 || isNaN(values.value1)) {
      errors.value1 = "Value 1 is invalid";
    }

    if (!values.value2 || isNaN(values.value2)) {
      errors.value2 = "Value 2 is invalid";
    }

    setErrors(errors);

    return Object.values(errors).every((x) => x === "");
  };

  const performCalculation = (operator: string) => {
    if (!validateInputs()) {
      return;
    }

    let num1 = parseFloat(values.value1 || "");
    let num2 = parseFloat(values.value2 || "");
    let calculatedResult;

    switch (operator) {
      case "add":
        calculatedResult = num1 + num2;
        break;
      case "subtract":
        calculatedResult = num1 - num2;
        break;
      case "multiply":
        calculatedResult = num1 * num2;
        break;
      case "divide":
        calculatedResult = num1 / num2;
        break;
      default:
        calculatedResult = 0;
    }

    setResult(calculatedResult);
    saveCalculation(operator, calculatedResult.toString());
    setValues({
      value1: null,
      value2: null,
    });
  };

  const saveCalculation = async (operator: string, result: string) => {
    if (user) {
      const userDocRef = collection(
        firestore,
        "users",
        user.uid,
        "calculations"
      );
      try {
        addDoc(userDocRef, {
          name: user.displayName,
          value1: parseFloat(values.value1 || ""),
          value2: parseFloat(values.value2 || ""),
          operator: operator,
          result: result,
          date: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error while saving the calculation:", error);
      }
    } else {
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-16">
      <h1 className="text-4xl font-bold mb-4">Calculator</h1>
      <div className="flex gap-4 mb-4">
        <div>
          <input
            className={`px-4 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-500 ${
              errors.value1 && "border-red-500"
            }`}
            type="number"
            name="value1"
            value={values.value1 || ""}
            onChange={handleValueChange}
            placeholder="Enter value 1"
          />
          {errors.value1 && (
            <p className="mx-2 text-red-500">{errors.value1}</p>
          )}
        </div>
        <div>
          <input
            className={`px-4 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-500 ${
              errors.value2 && "border-red-500"
            }`}
            type="number"
            name="value2"
            value={values.value2 || ""}
            onChange={handleValueChange}
            placeholder="Enter value 2"
          />
          {errors.value2 && (
            <p className="mx-2 text-red-500">{errors.value2}</p>
          )}
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => performCalculation("add")}
        >
          Dodaj
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => performCalculation("subtract")}
        >
          Odejmij
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => performCalculation("multiply")}
        >
          Pomnóż
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => performCalculation("divide")}
        >
          Podziel
        </button>
      </div>
      <div>
        <p className="text-2xl font-bold">Wynik: {result}</p>
      </div>
    </div>
  );
};

export default Calculator;
