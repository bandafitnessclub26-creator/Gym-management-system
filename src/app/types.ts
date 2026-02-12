export interface Member {
  id: string;
  name: string;
  phone: string;
  email?: string;
  plan: 'Monthly' | 'Quarterly' | 'Yearly';
  monthlyFee: number;
  joinDate: Date;
  feeStartDate: Date;
  feeEndDate: Date;
  lastPaymentDate: Date;
  nextDueDate: Date;
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  avatar?: string;
  profilePicture?: string;
}

export interface Payment {
  id: string;
  memberId: string;
  amount: number;
  month: string;
  paymentMethod: 'UPI' | 'Cash';
  transactionId?: string;
  date: Date;
  status: 'Paid' | 'Pending';
}

export interface DashboardStats {
  totalMembers: number;
  paidMembers: number;
  pendingFees: number;
  monthlyCollection: number;
}