import { Member, Payment, DashboardStats } from '../types';

// Helper function to calculate dates
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const subtractDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

// Mock members data
export const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.sharma@email.com',
    plan: 'Monthly',
    monthlyFee: 899,
    joinDate: subtractDays(new Date(), 45),
    feeStartDate: subtractDays(new Date(), 10),
    feeEndDate: addDays(new Date(), 20),
    lastPaymentDate: subtractDays(new Date(), 10),
    nextDueDate: addDays(new Date(), 20),
    feeStatus: 'Paid',
  },
  {
    id: '2',
    name: 'Priya Verma',
    phone: '+91 98765 43211',
    email: 'priya.verma@email.com',
    plan: 'Quarterly',
    monthlyFee: 2499,
    joinDate: subtractDays(new Date(), 60),
    feeStartDate: subtractDays(new Date(), 25),
    feeEndDate: addDays(new Date(), 5),
    lastPaymentDate: subtractDays(new Date(), 25),
    nextDueDate: addDays(new Date(), 5),
    feeStatus: 'Paid',
  },
  {
    id: '3',
    name: 'Amit Kumar',
    phone: '+91 98765 43212',
    plan: 'Monthly',
    monthlyFee: 899,
    joinDate: subtractDays(new Date(), 90),
    feeStartDate: subtractDays(new Date(), 35),
    feeEndDate: subtractDays(new Date(), 5),
    lastPaymentDate: subtractDays(new Date(), 35),
    nextDueDate: subtractDays(new Date(), 5),
    feeStatus: 'Overdue',
  },
  {
    id: '4',
    name: 'Sneha Patel',
    phone: '+91 98765 43213',
    email: 'sneha.patel@email.com',
    plan: 'Yearly',
    monthlyFee: 8499,
    joinDate: subtractDays(new Date(), 30),
    feeStartDate: subtractDays(new Date(), 27),
    feeEndDate: addDays(new Date(), 3),
    lastPaymentDate: subtractDays(new Date(), 27),
    nextDueDate: addDays(new Date(), 3),
    feeStatus: 'Paid',
  },
  {
    id: '5',
    name: 'Vikram Singh',
    phone: '+91 98765 43214',
    plan: 'Monthly',
    monthlyFee: 899,
    joinDate: subtractDays(new Date(), 15),
    feeStartDate: subtractDays(new Date(), 32),
    feeEndDate: subtractDays(new Date(), 2),
    lastPaymentDate: subtractDays(new Date(), 32),
    nextDueDate: subtractDays(new Date(), 2),
    feeStatus: 'Overdue',
  },
  {
    id: '6',
    name: 'Anjali Reddy',
    phone: '+91 98765 43215',
    email: 'anjali.reddy@email.com',
    plan: 'Quarterly',
    monthlyFee: 2499,
    joinDate: subtractDays(new Date(), 120),
    feeStartDate: subtractDays(new Date(), 5),
    feeEndDate: addDays(new Date(), 25),
    lastPaymentDate: subtractDays(new Date(), 5),
    nextDueDate: addDays(new Date(), 25),
    feeStatus: 'Paid',
  },
];

// Mock payments data
export const mockPayments: Payment[] = [
  {
    id: 'p1',
    memberId: '1',
    amount: 899,
    month: 'January 2026',
    paymentMethod: 'UPI',
    transactionId: 'UPI123456789',
    date: subtractDays(new Date(), 10),
    status: 'Paid',
  },
  {
    id: 'p2',
    memberId: '2',
    amount: 2499,
    month: 'January 2026',
    paymentMethod: 'Cash',
    date: subtractDays(new Date(), 25),
    status: 'Paid',
  },
];

// Dashboard stats calculation
export const calculateDashboardStats = (members: Member[]): DashboardStats => {
  const totalMembers = members.length;
  const paidMembers = members.filter(m => m.feeStatus === 'Paid').length;
  const pendingFees = members
    .filter(m => m.feeStatus !== 'Paid')
    .reduce((sum, m) => sum + m.monthlyFee, 0);
  const monthlyCollection = members
    .filter(m => m.feeStatus === 'Paid')
    .reduce((sum, m) => sum + m.monthlyFee, 0);

  return {
    totalMembers,
    paidMembers,
    pendingFees,
    monthlyCollection,
  };
};