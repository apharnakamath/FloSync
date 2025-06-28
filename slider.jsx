import React, { useState, useEffect } from 'react';

const Slider = ({ min = 0, max = 100, step = 1, value, onChange }) => {
  const [sliderValue, setSliderValue] = useState(value || min);

  // Effect to update internal state if `value` prop changes
  useEffect(() => {
    if (value !== undefined && value !== sliderValue) {
      setSliderValue(value);
    }
  }, [value]);

  const handleSliderChange = (event) => {
    const newValue = Number(event.target.value);  // Ensure it's a number
    setSliderValue(newValue);
    if (onChange) {
      onChange(newValue);  // Propagate the change to the parent component
    }
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={handleSliderChange}
        className="slider"
      />
      <span className="slider-value">{sliderValue}</span>
    </div>
  );
};

export default Slider;

