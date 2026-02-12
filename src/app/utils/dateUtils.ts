// import { Member } from '../types';

// export const calculateFeeProgress = (member: Member) => {
//   const now = new Date();
//   const start = new Date(member.feeStartDate);
//   const end = new Date(member.feeEndDate);
  
//   // Calculate total days in the cycle (typically 30)
//   const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  
//   // Calculate days passed
//   const daysPassed = Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  
//   // Calculate days remaining
//   const daysRemaining = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
//   // Calculate progress percentage
//   const progressPercentage = Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);
  
//   // Determine color based on status
//   let color = 'green';
//   if (member.feeStatus === 'Overdue') {
//     color = 'red';
//   } else if (daysRemaining <= 5 && daysRemaining > 0) {
//     color = 'yellow';
//   } else if (member.feeStatus === 'Paid') {
//     color = 'green';
//   }
  
//   return {
//     daysPassed: Math.max(daysPassed, 0),
//     daysRemaining,
//     totalDays,
//     progressPercentage,
//     color,
//     isOverdue: daysRemaining < 0,
//   };
// };

// export const formatDate = (date: Date): string => {
//   return new Intl.DateTimeFormat('en-IN', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//   }).format(new Date(date));
// };

// export const formatDateLong = (date: Date): string => {
//   return new Intl.DateTimeFormat('en-IN', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   }).format(new Date(date));
// };

// export const getDaysText = (daysRemaining: number): string => {
//   if (daysRemaining < 0) {
//     return `Overdue by ${Math.abs(daysRemaining)} days`;
//   } else if (daysRemaining === 0) {
//     return 'Due today';
//   } else {
//     return `Due in ${daysRemaining} days`;
//   }
// };



// import { Member } from '../types';

// export const calculateFeeProgress = (member: Member) => {
//   const now = new Date();

//   // 🔥 Support both camelCase & snake_case
//   const startRaw =
//     (member as any).feeStartDate ||
//     (member as any).fee_start_date;

//   const endRaw =
//     (member as any).feeEndDate ||
//     (member as any).fee_end_date;

//   const status =
//     (member as any).feeStatus ||
//     (member as any).fee_status;

//   if (!startRaw || !endRaw) {
//     return {
//       daysPassed: 0,
//       daysRemaining: 0,
//       totalDays: 0,
//       progressPercentage: 0,
//       color: 'green',
//       isOverdue: false,
//     };
//   }

//   const start = new Date(startRaw);
//   const end = new Date(endRaw);

//   const totalDays = Math.max(
//     Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
//     1
//   );

//   const daysPassed = Math.max(
//     Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
//     0
//   );

//   const daysRemaining = Math.ceil(
//     (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
//   );

//   const progressPercentage = Math.min(
//     Math.max((daysPassed / totalDays) * 100, 0),
//     100
//   );

//   let color = 'green';

//   if (status === 'Overdue' || daysRemaining < 0) {
//     color = 'red';
//   } else if (daysRemaining <= 5) {
//     color = 'yellow';
//   }

//   return {
//     daysPassed,
//     daysRemaining,
//     totalDays,
//     progressPercentage,
//     color,
//     isOverdue: daysRemaining < 0,
//   };
// };

// export const formatDate = (date: Date): string => {
//   return new Intl.DateTimeFormat('en-IN', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//   }).format(new Date(date));
// };

// export const formatDateLong = (date: Date): string => {
//   return new Intl.DateTimeFormat('en-IN', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   }).format(new Date(date));
// };

// export const getDaysText = (daysRemaining: number): string => {
//   if (daysRemaining < 0) {
//     return `Overdue by ${Math.abs(daysRemaining)} days`;
//   } else if (daysRemaining === 0) {
//     return 'Due today';
//   } else {
//     return `Due in ${daysRemaining} days`;
//   }
// };

// import { Member } from '../types';

// function stripTime(date: Date) {
//   return new Date(date.getFullYear(), date.getMonth(), date.getDate());
// }

// export const calculateFeeProgress = (member: Member) => {
//   const now = stripTime(new Date());

//   const startRaw =
//     (member as any).feeStartDate ??
//     (member as any).fee_start_date ??
//     null;

//   const endRaw =
//     (member as any).feeEndDate ??
//     (member as any).fee_end_date ??
//     null;

//   const status =
//     (member as any).feeStatus ??
//     (member as any).fee_status ??
//     'Pending';

//   if (!startRaw || !endRaw) {
//     return {
//       daysPassed: 0,
//       daysRemaining: 0,
//       totalDays: 0,
//       progressPercentage: 0,
//       color: 'green',
//       isOverdue: false,
//     };
//   }

//   const start = stripTime(new Date(startRaw));
//   const end = stripTime(new Date(endRaw));

//   if (isNaN(start.getTime()) || isNaN(end.getTime())) {
//     return {
//       daysPassed: 0,
//       daysRemaining: 0,
//       totalDays: 0,
//       progressPercentage: 0,
//       color: 'green',
//       isOverdue: false,
//     };
//   }

//   const msPerDay = 1000 * 60 * 60 * 24;

//   const totalDays = Math.max(
//     Math.floor((end.getTime() - start.getTime()) / msPerDay),
//     1
//   );

//   const daysPassed = Math.max(
//     Math.floor((now.getTime() - start.getTime()) / msPerDay),
//     0
//   );

//   const daysRemaining = Math.floor(
//     (end.getTime() - now.getTime()) / msPerDay
//   );

//   const progressPercentage = Math.min(
//     Math.max((daysPassed / totalDays) * 100, 0),
//     100
//   );

//   let color = 'green';

//   if (status === 'Overdue' || daysRemaining < 0) {
//     color = 'red';
//   } else if (daysRemaining <= 5) {
//     color = 'yellow';
//   }

//   return {
//     daysPassed,
//     daysRemaining,
//     totalDays,
//     progressPercentage,
//     color,
//     isOverdue: daysRemaining < 0,
//   };
// };

// export const formatDate = (date: Date | string): string => {
//   return new Intl.DateTimeFormat('en-IN', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//   }).format(new Date(date));
// };

// export const formatDateLong = (date: Date | string): string => {
//   return new Intl.DateTimeFormat('en-IN', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   }).format(new Date(date));
// };

// export const getDaysText = (daysRemaining: number): string => {
//   if (daysRemaining < 0) {
//     return `Overdue by ${Math.abs(daysRemaining)} days`;
//   } else if (daysRemaining === 0) {
//     return 'Due today';
//   } else {
//     return `Due in ${daysRemaining} days`;
//   }
// };



// import { Member } from '../types';

// export const calculateFeeProgress = (member: Member) => {
//   const now = new Date();

//   // ✅ Support both camelCase & snake_case
//   const startRaw =
//     (member as any).feeStartDate ??
//     (member as any).fee_start_date;

//   const endRaw =
//     (member as any).feeEndDate ??
//     (member as any).fee_end_date;

//   const status =
//     (member as any).feeStatus ??
//     (member as any).fee_status;

//   // ❌ If no dates → return safe empty state
//   if (!startRaw || !endRaw) {
//     return {
//       daysPassed: 0,
//       daysRemaining: 0,
//       totalDays: 1,
//       progressPercentage: 0,
//       color: 'green',
//       isOverdue: false,
//     };
//   }

//   const start = new Date(startRaw);
//   const end = new Date(endRaw);

//   // 🔥 Remove time part completely
//   start.setHours(0, 0, 0, 0);
//   end.setHours(0, 0, 0, 0);
//   now.setHours(0, 0, 0, 0);

//   // ✅ TOTAL DAYS (correct calculation)
//   const totalDays = Math.max(
//     Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
//     1
//   );

//   // ✅ DAYS PASSED
//   let daysPassed = Math.round(
//     (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
//   );

//   if (daysPassed < 0) daysPassed = 0;
//   if (daysPassed > totalDays) daysPassed = totalDays;

//   // ✅ DAYS REMAINING
//   const daysRemaining = totalDays - daysPassed;

//   // ✅ PROGRESS %
//   const progressPercentage =
//     totalDays > 0 ? (daysPassed / totalDays) * 100 : 0;

//   // ✅ COLOR LOGIC
//   let color: 'green' | 'yellow' | 'red' = 'green';

//   if (status === 'Overdue' || daysRemaining <= 0) {
//     color = 'red';
//   } else if (daysRemaining <= 5) {
//     color = 'yellow';
//   }

//   return {
//     daysPassed,
//     daysRemaining,
//     totalDays,
//     progressPercentage,
//     color,
//     isOverdue: daysRemaining <= 0,
//   };
// };

// // ✅ FORMAT DATE
// export const formatDate = (date: Date | string): string => {
//   return new Intl.DateTimeFormat('en-IN', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//   }).format(new Date(date));
// };

// // ✅ TEXT BELOW PROGRESS
// export const getDaysText = (daysRemaining: number): string => {
//   if (daysRemaining <= 0) return 'Expired';
//   return `${daysRemaining} days left`;
// };


// import { Member } from '../types';

// export const calculateFeeProgress = (member: Member) => {

//   const now = new Date();
//   now.setHours(0, 0, 0, 0);

//   // Support both camelCase & snake_case
//   const startRaw =
//     (member as any)?.feeStartDate ??
//     (member as any)?.fee_start_date;

//   const endRaw =
//     (member as any)?.feeEndDate ??
//     (member as any)?.fee_end_date;

//   const status =
//     (member as any)?.feeStatus ??
//     (member as any)?.fee_status;

//   if (!startRaw || !endRaw) {
//     return {
//       daysPassed: 0,
//       daysRemaining: 0,
//       totalDays: 1,
//       progressPercentage: 0,
//       color: 'green',
//       isOverdue: false,
//     };
//   }

//   const start = new Date(startRaw);
//   const end = new Date(endRaw);

//   start.setHours(0, 0, 0, 0);
//   end.setHours(0, 0, 0, 0);

//   const totalDays = Math.max(
//     Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
//     1
//   );

//   const daysPassed = Math.min(
//     Math.max(
//       Math.round((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
//       0
//     ),
//     totalDays
//   );

//   const daysRemaining = totalDays - daysPassed;

//   const progressPercentage = Math.min(
//     Math.max((daysPassed / totalDays) * 100, 0),
//     100
//   );

//   let color = 'green';

//   if (status === 'Overdue' || daysRemaining <= 0) {
//     color = 'red';
//   } else if (daysRemaining <= 5) {
//     color = 'yellow';
//   }

//   return {
//     daysPassed,
//     daysRemaining,
//     totalDays,
//     progressPercentage,
//     color,
//     isOverdue: daysRemaining <= 0,
//   };
// };

// export const formatDate = (date: Date): string => {
//   return new Intl.DateTimeFormat('en-IN', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//   }).format(new Date(date));
// };

// export const formatDateLong = (date: Date): string => {
//   return new Intl.DateTimeFormat('en-IN', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   }).format(new Date(date));
// };

// export const getDaysText = (daysRemaining: number): string => {
//   if (daysRemaining <= 0) return 'Expired';
//   return `${daysRemaining} days left`;
// };



import { Member } from '../types';

export const calculateFeeProgress = (member: Member) => {

  // Support camelCase (frontend mapped fields)
  const startRaw = member.feeStartDate;
  const endRaw = member.feeEndDate;
  const status = member.feeStatus;

  if (!startRaw || !endRaw) {
    return {
      daysPassed: 0,
      daysRemaining: 0,
      totalDays: 1,
      progressPercentage: 0,
      color: 'green',
      isOverdue: false,
    };
  }

  // 🔥 IMPORTANT: Create clean local date without timezone shift
  const start = new Date(
    startRaw.getFullYear(),
    startRaw.getMonth(),
    startRaw.getDate()
  );

  const end = new Date(
    endRaw.getFullYear(),
    endRaw.getMonth(),
    endRaw.getDate()
  );

  const todayRaw = new Date();
  const today = new Date(
    todayRaw.getFullYear(),
    todayRaw.getMonth(),
    todayRaw.getDate()
  );

  const totalDays = Math.max(
    Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
    1
  );

  const daysPassed = Math.min(
    Math.max(
      Math.round((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
      0
    ),
    totalDays
  );

  const daysRemaining = totalDays - daysPassed;

  const progressPercentage = Math.min(
    Math.max((daysPassed / totalDays) * 100, 0),
    100
  );

  let color = 'green';

  if (status === 'Overdue' || daysRemaining <= 0) {
    color = 'red';
  } else if (daysRemaining <= 5) {
    color = 'yellow';
  }

  return {
    daysPassed,
    daysRemaining,
    totalDays,
    progressPercentage,
    color,
    isOverdue: daysRemaining <= 0,
  };
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

export const formatDateLong = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const getDaysText = (daysRemaining: number): string => {
  if (daysRemaining <= 0) return 'Expired';
  return `${daysRemaining} days left`;
};
