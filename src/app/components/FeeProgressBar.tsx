// import { Progress } from '../components/ui/progress';
// import { Member } from '../types';
// import { calculateFeeProgress, getDaysText, formatDate } from '../utils/dateUtils';
// import { Calendar, Clock } from 'lucide-react';

// interface FeeProgressBarProps {
//   member: Member;
//   size?: 'small' | 'large';
//   showDetails?: boolean;
// }

// export function FeeProgressBar({ member, size = 'small', showDetails = false }: FeeProgressBarProps) {
//   const progress = calculateFeeProgress(member);
  
//   const getProgressColor = () => {
//     switch (progress.color) {
//       case 'green':
//         return 'bg-[#39FF14]';
//       case 'yellow':
//         return 'bg-[#FFD700]';
//       case 'red':
//         return 'bg-[#FF3B3B]';
//       default:
//         return 'bg-[#39FF14]';
//     }
//   };

//   return (
//     <div className="space-y-2">
//       {/* Progress Bar */}
//       <div className="relative">
//         <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
//           <div
//             className={`h-full ${getProgressColor()} transition-all duration-500 ease-out rounded-full`}
//             style={{ width: `${progress.progressPercentage}%` }}
//           />
//         </div>
//       </div>

//       {/* Progress Info */}
//       <div className="flex items-center justify-between text-xs">
//         <span className="text-zinc-400">
//           Day {Math.min(progress.daysPassed, progress.totalDays)} of {progress.totalDays}
//         </span>
//         <span className={`
//           ${progress.color === 'green' ? 'text-[#39FF14]' : ''}
//           ${progress.color === 'yellow' ? 'text-[#FFD700]' : ''}
//           ${progress.color === 'red' ? 'text-[#FF3B3B]' : ''}
//         `}>
//           {getDaysText(progress.daysRemaining)}
//         </span>
//       </div>

//       {/* Detailed Info (for profile page) */}
//       {showDetails && (
//         <div className="mt-4 space-y-3">
//           <div className="flex items-center gap-2 text-sm text-zinc-300">
//             <Calendar className="w-4 h-4 text-[#39FF14]" />
//             <span className="text-zinc-500">Fee Cycle:</span>
//             <span>{formatDate(member.feeStartDate)} – {formatDate(member.feeEndDate)}</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm">
//             <Clock className="w-4 h-4 text-[#39FF14]" />
//             <span className="text-zinc-500">Status:</span>
//             <span className={`
//               ${member.feeStatus === 'Paid' ? 'text-[#39FF14]' : ''}
//               ${member.feeStatus === 'Pending' ? 'text-[#FFD700]' : ''}
//               ${member.feeStatus === 'Overdue' ? 'text-[#FF3B3B]' : ''}
//             `}>
//               {member.feeStatus}
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// import { Member } from '../types';
// import { calculateFeeProgress, getDaysText, formatDate } from '../utils/dateUtils';
// import { Calendar, Clock } from 'lucide-react';

// interface FeeProgressBarProps {
//   member: Member;
//   size?: 'small' | 'large';
//   showDetails?: boolean;
// }

// export function FeeProgressBar({
//   member,
//   size = 'small',
//   showDetails = false,
// }: FeeProgressBarProps) {

//   const progress = calculateFeeProgress(member);

//   // ✅ Support both snake_case & camelCase safely
//   const feeStart =
//     (member as any).feeStartDate ||
//     (member as any).fee_start_date;

//   const feeEnd =
//     (member as any).feeEndDate ||
//     (member as any).fee_end_date;

//   const feeStatus =
//     (member as any).feeStatus ||
//     (member as any).fee_status;

//   const getProgressColor = () => {
//     switch (progress.color) {
//       case 'green':
//         return 'bg-[#39FF14]';
//       case 'yellow':
//         return 'bg-[#FFD700]';
//       case 'red':
//         return 'bg-[#FF3B3B]';
//       default:
//         return 'bg-[#39FF14]';
//     }
//   };




//   return (
//     <div className="space-y-2">

//       {/* Progress Bar */}
//       <div className="relative">
//         <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
//           <div
//             className={`h-full ${getProgressColor()} transition-all duration-500 ease-out rounded-full`}
//             style={{ width: `${progress.progressPercentage}%` }}
//           />
//         </div>
//       </div>

//       {/* Progress Info */}
//       <div className="flex items-center justify-between text-xs">
//         <span className="text-zinc-400">
//           Day {progress.daysPassed} of {progress.totalDays}
//         </span>

//         <span
//           className={`
//             ${progress.color === 'green' ? 'text-[#39FF14]' : ''}
//             ${progress.color === 'yellow' ? 'text-[#FFD700]' : ''}
//             ${progress.color === 'red' ? 'text-[#FF3B3B]' : ''}
//           `}
//         >
//           {getDaysText(progress.daysRemaining)}
//         </span>
//       </div>

//       {/* Detailed Info */}
//       {showDetails && feeStart && feeEnd && (
//         <div className="mt-4 space-y-3">
//           <div className="flex items-center gap-2 text-sm text-zinc-300">
//             <Calendar className="w-4 h-4 text-[#39FF14]" />
//             <span className="text-zinc-500">Fee Cycle:</span>
//             <span>
//               {formatDate(new Date(feeStart))} – {formatDate(new Date(feeEnd))}
//             </span>
//           </div>

//           <div className="flex items-center gap-2 text-sm">
//             <Clock className="w-4 h-4 text-[#39FF14]" />
//             <span className="text-zinc-500">Status:</span>
//             <span
//               className={`
//                 ${feeStatus === 'Paid' ? 'text-[#39FF14]' : ''}
//                 ${feeStatus === 'Pending' ? 'text-[#FFD700]' : ''}
//                 ${feeStatus === 'Overdue' ? 'text-[#FF3B3B]' : ''}
//               `}
//             >
//               {feeStatus}
//             </span>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }


import { Member } from '../types';
import { calculateFeeProgress, getDaysText, formatDate } from '../utils/dateUtils';
import { Calendar, Clock } from 'lucide-react';

interface FeeProgressBarProps {
  member: Member;
  size?: 'small' | 'large';
  showDetails?: boolean;
}

export function FeeProgressBar({
  member,
  size = 'small',
  showDetails = false,
}: FeeProgressBarProps) {



  const progress = calculateFeeProgress(member);

  const feeStart =
    (member as any)?.feeStartDate ??
    (member as any)?.fee_start_date ??
    null;

  const feeEnd =
    (member as any)?.feeEndDate ??
    (member as any)?.fee_end_date ??
    null;

  const feeStatus =
    (member as any)?.feeStatus ??
    (member as any)?.fee_status ??
    'Pending';

  const getProgressColor = () => {
    switch (progress.color) {
      case 'green':
        return 'bg-[#39FF14]';
      case 'yellow':
        return 'bg-[#FFD700]';
      case 'red':
        return 'bg-[#FF3B3B]';
      default:
        return 'bg-[#39FF14]';
    }
  };

  return (
    <div className="space-y-2">

      <div className="relative">
        <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${getProgressColor()} transition-all duration-500 rounded-full`}
            style={{ width: `${progress.progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-400">
          Day {progress.daysPassed} of {progress.totalDays}
        </span>

        <span
          className={`
            ${progress.color === 'green' ? 'text-[#39FF14]' : ''}
            ${progress.color === 'yellow' ? 'text-[#FFD700]' : ''}
            ${progress.color === 'red' ? 'text-[#FF3B3B]' : ''}
          `}
        >
          {getDaysText(progress.daysRemaining)}
        </span>
      </div>

      {showDetails && feeStart && feeEnd && (
        <div className="mt-4 space-y-3">

          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <Calendar className="w-4 h-4 text-[#39FF14]" />
            <span className="text-zinc-500">Fee Cycle:</span>
            <span>
              {formatDate(feeStart)} – {formatDate(new Date(feeEnd))}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-[#39FF14]" />
            <span className="text-zinc-500">Status:</span>
            <span
              className={`
                ${feeStatus === 'Paid' ? 'text-[#39FF14]' : ''}
                ${feeStatus === 'Pending' ? 'text-[#FFD700]' : ''}
                ${feeStatus === 'Overdue' ? 'text-[#FF3B3B]' : ''}
              `}
            >
              {feeStatus}
            </span>
          </div>

        </div>
      )}

    </div>
  );
}

