import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from 'src/components/ui/card';
import Button from 'src/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './styles.css';

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [periodDates, setPeriodDates] = useState([]); // Store multiple periods (each an array of 5 days)

  // Calculate days in the current month and first day of the month
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  // Navigate to the previous month
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  // Navigate to the next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

 const addPeriod = async (startDay) => {
  const periodArray = [];
  let currentDateCopy = new Date(currentDate);
  currentDateCopy.setDate(startDay);

  for (let i = 0; i < 5; i++) {
    periodArray.push(new Date(currentDateCopy));
    currentDateCopy.setDate(currentDateCopy.getDate() + 1);
  }

  // Set the periodDates in the frontend state
  setPeriodDates([...periodDates, ...periodArray]);

  // Send the period data to the backend API
  try {
    const response = await fetch('http://localhost:5000/api/save-period', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'user123',  // Replace with actual user ID if available
        periodDates: periodArray,
        month: currentDate.getMonth() + 1,  // Month is 0-indexed
        year: currentDate.getFullYear(),
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Period saved successfully:', data);
    } else {
      console.error('Error saving period:', data);
    }
  } catch (error) {
    console.error('Error making request:', error);
  }
};

  // Function to check if a day is part of the period
  const isPeriodDay = (day) => {
    return periodDates.some(periodDate => (
      periodDate.getDate() === day &&
      periodDate.getMonth() === currentDate.getMonth() &&
      periodDate.getFullYear() === currentDate.getFullYear()
    ));
  };

  // Function to render the calendar days
  const renderCalendarDays = () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const days = weekdays.map((day) => (
      <div key={`header-${day}`} className="calendar-day-header">
        {day}
      </div>
    ));

    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => (
      <div key={`empty-${i}`} className="empty-day"></div>
    ));

    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const isPeriod = isPeriodDay(day);
      const isSelected = selectedDate === day;

      return (
        <div
          key={day}
          onClick={() => {
            setSelectedDate(day);
            addPeriod(day); // Automatically add the 5-day period when a day is clicked
          }}
          className={`calendar-day
            ${isPeriod ? 'period-day' : ''}
            ${isSelected ? 'selected-day' : ''}
            hover-day`}
        >
          {day}
        </div>
      );
    });

    return [...days, ...emptyDays, ...calendarDays];
  };

  return (
    <div className="calendar-container">
      <Card>
        <CardHeader>
          <div className="calendar-header">
            <Button variant="outline" onClick={previousMonth} aria-label="Previous Month" title="Previous Month">
              <ChevronLeft className="calendar-arrow" />
            </Button>
            <h2 className="calendar-title">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <Button variant="outline" onClick={nextMonth} aria-label="Next Month" title="Next Month">
              <ChevronRight className="calendar-arrow" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="calendar-grid">{renderCalendarDays()}</div>

          <div className="legend">
            <div className="legend-item">
              <div className="legend-period"></div>
              <span className="legend-text">Period Days</span>
            </div>
            <div className="legend-item">
              <div className="legend-selected"></div>
              <span className="legend-text">Selected Day</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

