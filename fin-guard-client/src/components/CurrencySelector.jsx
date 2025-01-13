import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Currency.css";

const CurrencySelector = ({ onCurrencyChange }) => {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  useEffect(() => {
    // Fetch live exchange rates
    axios
      .get("http://localhost/fin-guard-api/currency_rates.php")
      .then((response) => {
        const rates = response.data.rates;
        const currencyList = Object.keys(rates);
        setCurrencies(currencyList);
      })
      .catch((error) => console.error("Error fetching currencies:", error));
  }, []);

  const handleCurrencyChange = (e) => {
    const currency = e.target.value;
    setSelectedCurrency(currency);
    onCurrencyChange(currency);
  };

  return (
    <div className="currency-selector">
      <label htmlFor="currency">Select Currency: </label>
      <select
        id="currency"
        value={selectedCurrency}
        onChange={handleCurrencyChange}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
