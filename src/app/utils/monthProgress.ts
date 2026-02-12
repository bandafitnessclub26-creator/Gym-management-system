export const MONTHS = [
  { name: 'January', days: 31 },
  { name: 'February', days: 28 }, // Simplified, not handling leap years
  { name: 'March', days: 31 },
  { name: 'April', days: 30 },
  { name: 'May', days: 31 },
  { name: 'June', days: 30 },
  { name: 'July', days: 31 },
  { name: 'August', days: 31 },
  { name: 'September', days: 30 },
  { name: 'October', days: 31 },
  { name: 'November', days: 30 },
  { name: 'December', days: 31 },
];

export function getCurrentMonth() {
  const date = new Date();
  return MONTHS[date.getMonth()].name;
}

export function getDaysInMonth(monthName: string): number {
  const month = MONTHS.find(m => m.name === monthName);
  return month ? month.days : 30;
}

export function getCurrentDayOfMonth(): number {
  return new Date().getDate();
}

export function calculateMonthProgress(monthName: string): {
  daysPassed: number;
  totalDays: number;
  progressPercentage: number;
} {
  const totalDays = getDaysInMonth(monthName);
  const currentMonth = getCurrentMonth();
  
  // Only show progress for current month
  const daysPassed = monthName === currentMonth ? getCurrentDayOfMonth() : 0;
  const progressPercentage = (daysPassed / totalDays) * 100;

  return {
    daysPassed,
    totalDays,
    progressPercentage,
  };
}
