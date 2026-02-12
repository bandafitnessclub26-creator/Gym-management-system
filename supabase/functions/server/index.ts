// import { Hono } from 'npm:hono';
// import { cors } from 'npm:hono/cors';
// import { logger } from 'npm:hono/logger';
// import * as kv from './kv_store.tsx';

// const app = new Hono();

// // Middleware
// app.use('*', cors());
// app.use('*', logger(console.log));

// // Helper functions
// const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// const parseDate = (date: any) => {
//   if (typeof date === 'string') return new Date(date);
//   if (date instanceof Date) return date;
//   return new Date();
// };

// // Initialize with seed data if empty
// const initializeData = async () => {
//   const members = await kv.getByPrefix('member:');
  
//   if (members.length === 0) {
//     console.log('Initializing with seed data...');
    
//     const addDays = (date: Date, days: number): Date => {
//       const result = new Date(date);
//       result.setDate(result.getDate() + days);
//       return result;
//     };

//     const subtractDays = (date: Date, days: number): Date => {
//       const result = new Date(date);
//       result.setDate(result.getDate() - days);
//       return result;
//     };

//     const seedMembers = [
//       {
//         id: generateId(),
//         name: 'Rahul Sharma',
//         phone: '+91 98765 43210',
//         email: 'rahul.sharma@email.com',
//         plan: 'Monthly',
//         monthlyFee: 899,
//         joinDate: subtractDays(new Date(), 45).toISOString(),
//         feeStartDate: subtractDays(new Date(), 10).toISOString(),
//         feeEndDate: addDays(new Date(), 20).toISOString(),
//         lastPaymentDate: subtractDays(new Date(), 10).toISOString(),
//         nextDueDate: addDays(new Date(), 20).toISOString(),
//         feeStatus: 'Paid',
//       },
//       {
//         id: generateId(),
//         name: 'Priya Verma',
//         phone: '+91 98765 43211',
//         email: 'priya.verma@email.com',
//         plan: 'Quarterly',
//         monthlyFee: 2499,
//         joinDate: subtractDays(new Date(), 60).toISOString(),
//         feeStartDate: subtractDays(new Date(), 25).toISOString(),
//         feeEndDate: addDays(new Date(), 5).toISOString(),
//         lastPaymentDate: subtractDays(new Date(), 25).toISOString(),
//         nextDueDate: addDays(new Date(), 5).toISOString(),
//         feeStatus: 'Paid',
//       },
//       {
//         id: generateId(),
//         name: 'Amit Kumar',
//         phone: '+91 98765 43212',
//         plan: 'Monthly',
//         monthlyFee: 899,
//         joinDate: subtractDays(new Date(), 90).toISOString(),
//         feeStartDate: subtractDays(new Date(), 35).toISOString(),
//         feeEndDate: subtractDays(new Date(), 5).toISOString(),
//         lastPaymentDate: subtractDays(new Date(), 35).toISOString(),
//         nextDueDate: subtractDays(new Date(), 5).toISOString(),
//         feeStatus: 'Overdue',
//       },
//     ];

//     for (const member of seedMembers) {
//       await kv.set(`member:${member.id}`, member);
//     }
    
//     console.log('Seed data initialized');
//   }
// };

// // Members Routes
// app.get('/make-server-fc398616/members', async (c) => {
//   try {
//     await initializeData();
//     const memberData = await kv.getByPrefix('member:');
//     // Filter out any null or invalid members
//     const members = memberData
//       .map(m => m.value)
//       .filter(m => m && m.id && m.name);
//     return c.json({ members });
//   } catch (error) {
//     console.log('Error fetching members:', error);
//     return c.json({ error: 'Failed to fetch members', members: [] }, 500);
//   }
// });

// app.get('/make-server-fc398616/members/:id', async (c) => {
//   try {
//     const id = c.req.param('id');
//     const member = await kv.get(`member:${id}`);
    
//     if (!member) {
//       return c.json({ error: 'Member not found' }, 404);
//     }
    
//     return c.json({ member });
//   } catch (error) {
//     console.log('Error fetching member:', error);
//     return c.json({ error: 'Failed to fetch member' }, 500);
//   }
// });

// app.post('/make-server-fc398616/members', async (c) => {
//   try {
//     const body = await c.req.json();
//     const now = new Date();
//     const feeEndDate = new Date(now);
//     feeEndDate.setDate(feeEndDate.getDate() + 30);

//     const member = {
//       id: generateId(),
//       name: body.name,
//       phone: body.phone,
//       email: body.email || '',
//       plan: body.plan || 'Monthly',
//       monthlyFee: Number(body.monthlyFee) || 0,
//       joinDate: body.joinDate || now.toISOString(),
//       feeStartDate: now.toISOString(),
//       feeEndDate: feeEndDate.toISOString(),
//       lastPaymentDate: now.toISOString(),
//       nextDueDate: feeEndDate.toISOString(),
//       feeStatus: 'Pending',
//     };

//     await kv.set(`member:${member.id}`, member);
//     return c.json({ member });
//   } catch (error) {
//     console.log('Error creating member:', error);
//     return c.json({ error: 'Failed to create member' }, 500);
//   }
// });

// app.put('/make-server-fc398616/members/:id', async (c) => {
//   try {
//     const id = c.req.param('id');
//     const body = await c.req.json();
//     const existing = await kv.get(`member:${id}`);

//     if (!existing) {
//       return c.json({ error: 'Member not found' }, 404);
//     }

//     const member = { ...existing, ...body };
//     await kv.set(`member:${id}`, member);
//     return c.json({ member });
//   } catch (error) {
//     console.log('Error updating member:', error);
//     return c.json({ error: 'Failed to update member' }, 500);
//   }
// });

// app.delete('/make-server-fc398616/members/:id', async (c) => {
//   try {
//     const id = c.req.param('id');
//     await kv.del(`member:${id}`);
//     return c.json({ success: true });
//   } catch (error) {
//     console.log('Error deleting member:', error);
//     return c.json({ error: 'Failed to delete member' }, 500);
//   }
// });

// // Payments Routes
// app.get('/make-server-fc398616/payments', async (c) => {
//   try {
//     const paymentData = await kv.getByPrefix('payment:');
//     const payments = paymentData.map(p => p.value);
//     return c.json({ payments });
//   } catch (error) {
//     console.log('Error fetching payments:', error);
//     return c.json({ error: 'Failed to fetch payments' }, 500);
//   }
// });

// app.get('/make-server-fc398616/payments/member/:memberId', async (c) => {
//   try {
//     const memberId = c.req.param('memberId');
//     const allPayments = await kv.getByPrefix('payment:');
//     const payments = allPayments
//       .map(p => p.value)
//       .filter(p => p.memberId === memberId);
//     return c.json({ payments });
//   } catch (error) {
//     console.log('Error fetching member payments:', error);
//     return c.json({ error: 'Failed to fetch payments' }, 500);
//   }
// });

// app.post('/make-server-fc398616/payments', async (c) => {
//   try {
//     const body = await c.req.json();
//     const now = new Date();
    
//     const payment = {
//       id: generateId(),
//       memberId: body.memberId,
//       amount: Number(body.amount),
//       month: body.month,
//       paymentMethod: body.paymentMethod || 'Cash',
//       transactionId: body.transactionId || '',
//       date: body.date || now.toISOString(),
//       status: body.status || 'Paid',
//     };

//     await kv.set(`payment:${payment.id}`, payment);

//     // Update member's payment status
//     if (body.memberId) {
//       const member = await kv.get(`member:${body.memberId}`);
//       if (member) {
//         const feeEndDate = new Date(now);
//         feeEndDate.setDate(feeEndDate.getDate() + 30);
        
//         member.feeStartDate = now.toISOString();
//         member.feeEndDate = feeEndDate.toISOString();
//         member.lastPaymentDate = now.toISOString();
//         member.nextDueDate = feeEndDate.toISOString();
//         member.feeStatus = 'Paid';
        
//         await kv.set(`member:${body.memberId}`, member);
//       }
//     }

//     return c.json({ payment });
//   } catch (error) {
//     console.log('Error creating payment:', error);
//     return c.json({ error: 'Failed to create payment' }, 500);
//   }
// });

// // Dashboard Stats
// app.get('/make-server-fc398616/dashboard/stats', async (c) => {
//   try {
//     await initializeData();
//     const memberData = await kv.getByPrefix('member:');
//     // Filter out null or invalid members
//     const members = memberData
//       .map(m => m.value)
//       .filter(m => m && m.id && m.name && typeof m.monthlyFee === 'number');

//     const totalMembers = members.length;
//     const paidMembers = members.filter(m => m.feeStatus === 'Paid').length;
//     const pendingFees = members
//       .filter(m => m.feeStatus !== 'Paid')
//       .reduce((sum, m) => sum + (m.monthlyFee || 0), 0);
//     const monthlyCollection = members
//       .filter(m => m.feeStatus === 'Paid')
//       .reduce((sum, m) => sum + (m.monthlyFee || 0), 0);

//     const stats = {
//       totalMembers,
//       paidMembers,
//       pendingFees,
//       monthlyCollection,
//     };

//     return c.json({ stats });
//   } catch (error) {
//     console.log('Error calculating stats:', error);
//     return c.json({ 
//       error: 'Failed to calculate stats',
//       stats: {
//         totalMembers: 0,
//         paidMembers: 0,
//         pendingFees: 0,
//         monthlyCollection: 0,
//       }
//     }, 500);
//   }
// });

// // Health check
// app.get('/make-server-fc398616/health', (c) => {
//   return c.json({ status: 'ok', timestamp: new Date().toISOString() });
// });

// Deno.serve(app.fetch);


// Minimal working Supabase Edge Function

// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
// };

// Deno.serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   // ✅ Supabase auto provides these
//   const supabase = createClient(
//     Deno.env.get("SUPABASE_URL")!,
//     Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
//   );

//   const url = new URL(req.url);
//   const path = url.pathname;

//   // ===== GET MEMBERS =====
//   if (req.method === "GET" && path.endsWith("/members")) {
//     const { data, error } = await supabase
//       .from("members")
//       .select("*")
//       .order("join_date", { ascending: false });

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify({ members: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // ===== CREATE MEMBER =====
//   if (req.method === "POST" && path.endsWith("/members")) {
//     const body = await req.json();

//     const { data, error } = await supabase
//       .from("members")
//       .insert({
//         name: body.name,
//         phone: body.phone,
//         email: body.email,
//         plan: body.plan,
//         monthly_fee: body.monthlyFee,
//         profile_url: body.profileUrl || null,
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify({ member: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   return new Response(JSON.stringify({ error: "Not Found" }), {
//     status: 404,
//     headers: { ...corsHeaders, "Content-Type": "application/json" },
//   });
// });


// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
// };

// Deno.serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   const supabase = createClient(
//     Deno.env.get("SUPABASE_URL")!,
//     Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
//   );

//   const url = new URL(req.url);
//   const path = url.pathname;

//   // ======================
//   // GET MEMBERS
//   // ======================
//   if (req.method === "GET" && path.endsWith("/members")) {
//     const { data, error } = await supabase
//       .from("members")
//       .select("*")
//       .order("join_date", { ascending: false });

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify({ members: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // ======================
//   // CREATE MEMBER
//   // ======================
//   if (req.method === "POST" && path.endsWith("/members")) {
//     const body = await req.json();

//     const { data, error } = await supabase
//       .from("members")
//       .insert({
//         name: body.name,
//         phone: body.phone,
//         email: body.email,
//         plan: body.plan,
//         monthly_fee: body.monthlyFee,
//         profile_url: body.profileUrl || null,
//         join_date: new Date(),
//         fee_status: "Pending", // default
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify({ member: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // ======================
//   // CREATE PAYMENT
//   // ======================
//   if (req.method === "POST" && path.endsWith("/payments")) {
//     const body = await req.json();

//     const { data, error } = await supabase
//       .from("payments")
//       .insert({
//         member_id: body.memberId,
//         amount: body.amount,
//         month: body.month,
//         payment_method: body.paymentMethod,
//         transaction_id: body.transactionId,
//         status: body.status,
//         date: new Date(),
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     // ✅ IMPORTANT FIX: UPDATE MEMBER STATUS TO PAID
//     await supabase
//       .from("members")
//       .update({ fee_status: "Paid" })
//       .eq("id", body.memberId);

//     return new Response(JSON.stringify({ payment: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   return new Response(JSON.stringify({ error: "Not Found" }), {
//     status: 404,
//     headers: { ...corsHeaders, "Content-Type": "application/json" },
//   });
// });




// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
// };

// Deno.serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   const supabase = createClient(
//     Deno.env.get("SUPABASE_URL")!,
//     Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
//   );

//   const url = new URL(req.url);
//   const path = url.pathname;

//   // ======================
//   // GET MEMBERS
//   // ======================
//   if (req.method === "GET" && path.endsWith("/members")) {
//     const { data } = await supabase
//       .from("members")
//       .select("*")
//       .order("join_date", { ascending: false });

//     return new Response(JSON.stringify({ members: data || [] }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // ======================
//   // GET DASHBOARD STATS
//   // ======================
//   if (req.method === "GET" && path.endsWith("/dashboard")) {

//     const { data: members } = await supabase
//       .from("members")
//       .select("*");

//     const totalMembers = members?.length || 0;

//     const paidMembers = members?.filter(
//       (m) => m.fee_status === "Paid"
//     ).length || 0;

//     const pendingMembers = members?.filter(
//       (m) => m.fee_status !== "Paid"
//     ) || [];

//     const pendingFees = pendingMembers.reduce(
//       (sum, m) => sum + (m.monthly_fee || 0),
//       0
//     );

//     const monthlyCollection = members
//       ?.filter((m) => m.fee_status === "Paid")
//       .reduce((sum, m) => sum + (m.monthly_fee || 0), 0) || 0;

//     return new Response(
//       JSON.stringify({
//         stats: {
//           totalMembers,
//           paidMembers,
//           pendingFees,
//           monthlyCollection,
//         },
//       }),
//       {
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       }
//     );
//   }

//   // ======================
//   // CREATE MEMBER
//   // ======================
//   if (req.method === "POST" && path.endsWith("/members")) {
//     const body = await req.json();

//     const { data, error } = await supabase
//       .from("members")
//       .insert({
//         name: body.name,
//         phone: body.phone,
//         email: body.email,
//         plan: body.plan,
//         monthly_fee: body.monthlyFee,
//         profile_url: body.profileUrl || null,
//         join_date: new Date(),
//         fee_status: "Pending",
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify({ member: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // ======================
//   // CREATE PAYMENT
//   // ======================
//   if (req.method === "POST" && path.endsWith("/payments")) {
//     const body = await req.json();

//     const { data } = await supabase
//       .from("payments")
//       .insert({
//         member_id: body.memberId,
//         amount: body.amount,
//         month: body.month,
//         payment_method: body.paymentMethod,
//         transaction_id: body.transactionId,
//         status: body.status,
//         date: new Date(),
//       })
//       .select()
//       .single();

//     await supabase
//       .from("members")
//       .update({ fee_status: "Paid" })
//       .eq("id", body.memberId);

//     return new Response(JSON.stringify({ payment: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   return new Response(JSON.stringify({ error: "Not Found" }), {
//     status: 404,
//     headers: { ...corsHeaders, "Content-Type": "application/json" },
//   });
// });



// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
// };

// Deno.serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   const supabase = createClient(
//     Deno.env.get("SUPABASE_URL")!,
//     Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
//   );

//   const url = new URL(req.url);
//   const path = url.pathname;

//   // =====================================================
//   // GET MEMBERS
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/members")) {
//     const { data } = await supabase
//       .from("members")
//       .select("*")
//       .order("join_date", { ascending: false });

//     return new Response(JSON.stringify({ members: data || [] }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // CREATE MEMBER
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/members")) {
//     const body = await req.json();

//     const today = new Date();
//     const feeEnd = new Date();
//     feeEnd.setDate(today.getDate() + 30);

//     const { data, error } = await supabase
//       .from("members")
//       .insert({
//         name: body.name,
//         phone: body.phone,
//         email: body.email,
//         plan: body.plan,
//         monthly_fee: body.monthlyFee,
//         profile_url: body.profileUrl || null,
//         join_date: today,
//         fee_start_date: today,
//         fee_end_date: feeEnd,
//         fee_status: "Pending",
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify({ member: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // CREATE PAYMENT
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/payments")) {
//     const body = await req.json();

//     const today = new Date();
//     const feeEnd = new Date();
//     feeEnd.setDate(today.getDate() + 30);

//     const { data, error } = await supabase
//       .from("payments")
//       .insert({
//         member_id: body.memberId,
//         amount: body.amount,
//         month: body.month,
//         payment_method: body.paymentMethod,
//         transaction_id: body.transactionId,
//         status: body.status,
//         date: today,
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     // Update member after payment
//     await supabase
//       .from("members")
//       .update({
//         fee_status: "Paid",
//         fee_start_date: today,
//         fee_end_date: feeEnd,
//       })
//       .eq("id", body.memberId);

//     return new Response(JSON.stringify({ payment: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // GET DASHBOARD STATS
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/dashboard")) {
//     const { data: members } = await supabase
//       .from("members")
//       .select("*");

//     const totalMembers = members?.length || 0;

//     const paidMembers =
//       members?.filter((m) => m.fee_status === "Paid").length || 0;

//     const pendingMembers =
//       members?.filter((m) => m.fee_status !== "Paid") || [];

//     const pendingFees = pendingMembers.reduce(
//       (sum, m) => sum + (m.monthly_fee || 0),
//       0
//     );

//     const monthlyCollection =
//       members
//         ?.filter((m) => m.fee_status === "Paid")
//         .reduce((sum, m) => sum + (m.monthly_fee || 0), 0) || 0;

//     return new Response(
//       JSON.stringify({
//         stats: {
//           totalMembers,
//           paidMembers,
//           pendingFees,
//           monthlyCollection,
//         },
//       }),
//       {
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       }
//     );
//   }

//   return new Response(JSON.stringify({ error: "Not Found" }), {
//     status: 404,
//     headers: { ...corsHeaders, "Content-Type": "application/json" },
//   });
// });





// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
// };

// Deno.serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   const supabase = createClient(
//     Deno.env.get("SUPABASE_URL")!,
//     Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
//   );

//   const url = new URL(req.url);
//   const path = url.pathname;

//   // =====================================================
//   // GET MEMBERS
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/members")) {
//     const { data } = await supabase
//       .from("members")
//       .select("*")
//       .order("join_date", { ascending: false });

//     return new Response(JSON.stringify({ members: data || [] }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // CREATE MEMBER
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/members")) {
//     const body = await req.json();

//     const today = new Date();
//     const feeEnd = new Date();
//     feeEnd.setDate(today.getDate() + 30);

//     const { data, error } = await supabase
//       .from("members")
//       .insert({
//         name: body.name,
//         phone: body.phone,
//         email: body.email,
//         plan: body.plan,
//         monthly_fee: body.monthlyFee,
//         profile_url: body.profileUrl || null,
//         join_date: today,
//         fee_start_date: today,
//         fee_end_date: feeEnd,
//         fee_status: "Pending",
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify({ member: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // DELETE MEMBER
//   // =====================================================
//   if (req.method === "DELETE" && path.includes("/members/")) {
//     const memberId = path.split("/members/")[1];

//     if (!memberId) {
//       return new Response(JSON.stringify({ error: "Invalid ID" }), {
//         status: 400,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     // Delete payments first
//     await supabase
//       .from("payments")
//       .delete()
//       .eq("member_id", memberId);

//     const { error } = await supabase
//       .from("members")
//       .delete()
//       .eq("id", memberId);

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify({ success: true }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // CREATE PAYMENT
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/payments")) {
//     const body = await req.json();

//     const today = new Date();
//     const feeEnd = new Date();
//     feeEnd.setDate(today.getDate() + 30);

//     const { data, error } = await supabase
//       .from("payments")
//       .insert({
//         member_id: body.memberId,
//         amount: body.amount,
//         month: body.month,
//         payment_method: body.paymentMethod,
//         transaction_id: body.transactionId,
//         status: body.status,
//         date: today,
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     await supabase
//       .from("members")
//       .update({
//         fee_status: "Paid",
//         fee_start_date: today,
//         fee_end_date: feeEnd,
//       })
//       .eq("id", body.memberId);

//     return new Response(JSON.stringify({ payment: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // GET DASHBOARD STATS
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/dashboard")) {
//     const { data: members } = await supabase
//       .from("members")
//       .select("*");

//     const totalMembers = members?.length || 0;

//     const paidMembers =
//       members?.filter((m) => m.fee_status === "Paid").length || 0;

//     const pendingMembers =
//       members?.filter((m) => m.fee_status !== "Paid") || [];

//     const pendingFees = pendingMembers.reduce(
//       (sum, m) => sum + (m.monthly_fee || 0),
//       0
//     );

//     const monthlyCollection =
//       members
//         ?.filter((m) => m.fee_status === "Paid")
//         .reduce((sum, m) => sum + (m.monthly_fee || 0), 0) || 0;

//     return new Response(
//       JSON.stringify({
//         stats: {
//           totalMembers,
//           paidMembers,
//           pendingFees,
//           monthlyCollection,
//         },
//       }),
//       {
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       }
//     );
//   }

//   return new Response(JSON.stringify({ error: "Not Found" }), {
//     status: 404,
//     headers: { ...corsHeaders, "Content-Type": "application/json" },
//   });
// });


// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
//   "Content-Type": "application/json",
// };

// Deno.serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   const supabase = createClient(
//     Deno.env.get("SUPABASE_URL")!,
//     Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
//   );

//   const url = new URL(req.url);
//   const path = url.pathname;

//   // =====================================================
//   // GET MEMBERS
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/members")) {
//     const { data } = await supabase
//       .from("members")
//       .select("*")
//       .order("join_date", { ascending: false });

//     return new Response(JSON.stringify({ members: data || [] }), {
//       headers: corsHeaders,
//     });
//   }

//   // =====================================================
//   // CREATE MEMBER
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/members")) {
//     const body = await req.json();

//     const today = new Date();
//     const feeEnd = new Date();
//     feeEnd.setDate(today.getDate() + 30);

//     const { data, error } = await supabase
//       .from("members")
//       .insert({
//         name: body.name,
//         phone: body.phone,
//         email: body.email,
//         plan: body.plan,
//         monthly_fee: body.monthlyFee,
//         profile_url: body.profileUrl || null,
//         join_date: today,
//         fee_start_date: today,
//         fee_end_date: feeEnd,
//         fee_status: "Pending",
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: corsHeaders,
//       });
//     }

//     return new Response(JSON.stringify({ member: data }), {
//       headers: corsHeaders,
//     });
//   }

//   // =====================================================
//   // DELETE MEMBER
//   // =====================================================
//   if (req.method === "DELETE" && path.includes("/members/")) {
//     const memberId = path.split("/members/")[1];

//     if (!memberId) {
//       return new Response(JSON.stringify({ error: "Invalid ID" }), {
//         status: 400,
//         headers: corsHeaders,
//       });
//     }

//     // Delete payments first
//     await supabase
//       .from("payments")
//       .delete()
//       .eq("member_id", memberId);

//     const { error } = await supabase
//       .from("members")
//       .delete()
//       .eq("id", memberId);

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: corsHeaders,
//       });
//     }

//     return new Response(JSON.stringify({ success: true }), {
//       headers: corsHeaders,
//     });
//   }

//   // =====================================================
//   // CREATE PAYMENT
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/payments")) {
//     const body = await req.json();

//     const today = new Date();
//     const feeEnd = new Date();
//     feeEnd.setDate(today.getDate() + 30);

//     const { data, error } = await supabase
//       .from("payments")
//       .insert({
//         member_id: body.memberId,
//         amount: body.amount,
//         month: body.month,
//         payment_method: body.paymentMethod,
//         transaction_id: body.transactionId,
//         status: body.status,
//         date: today,
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: corsHeaders,
//       });
//     }

//     await supabase
//       .from("members")
//       .update({
//         fee_status: "Paid",
//         fee_start_date: today,
//         fee_end_date: feeEnd,
//       })
//       .eq("id", body.memberId);

//     return new Response(JSON.stringify({ payment: data }), {
//       headers: corsHeaders,
//     });
//   }

//   // =====================================================
//   // DASHBOARD
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/dashboard")) {
//     const { data: members } = await supabase
//       .from("members")
//       .select("*");

//     const totalMembers = members?.length || 0;

//     const paidMembers =
//       members?.filter((m) => m.fee_status === "Paid").length || 0;

//     const pendingMembers =
//       members?.filter((m) => m.fee_status !== "Paid") || [];

//     const pendingFees = pendingMembers.reduce(
//       (sum, m) => sum + (m.monthly_fee || 0),
//       0
//     );

//     const monthlyCollection =
//       members
//         ?.filter((m) => m.fee_status === "Paid")
//         .reduce((sum, m) => sum + (m.monthly_fee || 0), 0) || 0;

//     return new Response(
//       JSON.stringify({
//         stats: {
//           totalMembers,
//           paidMembers,
//           pendingFees,
//           monthlyCollection,
//         },
//       }),
//       { headers: corsHeaders }
//     );
//   }

//   return new Response(JSON.stringify({ error: "Not Found" }), {
//     status: 404,
//     headers: corsHeaders,
//   });
// });



// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
// };

// function getPlanMonths(plan: string) {
//   switch (plan) {
//     case "Monthly":
//       return 1;
//     case "Quarterly":
//       return 3;
//     case "Half Yearly":
//       return 6;
//     case "Yearly":
//       return 12;
//     default:
//       return 1;
//   }
// }

// // ✅ Exact same-date month calculation
// function calculateFeeEndDate(startDate: Date, plan: string) {
//   const monthsToAdd = getPlanMonths(plan);

//   const year = startDate.getFullYear();
//   const month = startDate.getMonth();
//   const day = startDate.getDate();

//   return new Date(year, month + monthsToAdd, day);
// }

// Deno.serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   const supabase = createClient(
//     Deno.env.get("SUPABASE_URL")!,
//     Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
//   );

//   const url = new URL(req.url);
//   const path = url.pathname;

//   // =====================================================
//   // GET MEMBERS (Auto Overdue Check)
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/members")) {
//     const { data: members } = await supabase
//       .from("members")
//       .select("*")
//       .order("join_date", { ascending: false });

//     const today = new Date();

//     for (const member of members || []) {
//       if (
//         member.fee_end_date &&
//         new Date(member.fee_end_date) < today &&
//         member.fee_status === "Paid"
//       ) {
//         await supabase
//           .from("members")
//           .update({ fee_status: "Overdue" })
//           .eq("id", member.id);

//         member.fee_status = "Overdue";
//       }
//     }

//     return new Response(JSON.stringify({ members: members || [] }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // CREATE MEMBER
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/members")) {
//     const body = await req.json();

//     const today = new Date();
//     const feeEnd = calculateFeeEndDate(today, body.plan);

//     const { data, error } = await supabase
//       .from("members")
//       .insert({
//         name: body.name,
//         phone: body.phone,
//         email: body.email,
//         plan: body.plan,
//         monthly_fee: body.monthlyFee,
//         profile_url: body.profileUrl || null,
//         join_date: today,
//         fee_start_date: today,
//         fee_end_date: feeEnd,
//         fee_status: "Pending",
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify({ member: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // DELETE MEMBER
//   // =====================================================
//   if (req.method === "DELETE" && path.includes("/members/")) {
//     const id = path.split("/members/")[1];

//     await supabase.from("payments").delete().eq("member_id", id);
//     await supabase.from("members").delete().eq("id", id);

//     return new Response(JSON.stringify({ success: true }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // CREATE PAYMENT
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/payments")) {
//     const body = await req.json();
//     const today = new Date();

//     const { data: member } = await supabase
//       .from("members")
//       .select("plan")
//       .eq("id", body.memberId)
//       .single();

//     const feeEnd = calculateFeeEndDate(today, member.plan);

//     const { data, error } = await supabase
//       .from("payments")
//       .insert({
//         member_id: body.memberId,
//         amount: body.amount,
//         month: body.month,
//         payment_method: body.paymentMethod,
//         transaction_id: body.transactionId,
//         status: body.status,
//         date: today,
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     await supabase
//       .from("members")
//       .update({
//         fee_status: "Paid",
//         fee_start_date: today,
//         fee_end_date: feeEnd,
//       })
//       .eq("id", body.memberId);

//     return new Response(JSON.stringify({ payment: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // DASHBOARD
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/dashboard")) {
//     const { data: members } = await supabase
//       .from("members")
//       .select("*");

//     const totalMembers = members?.length || 0;

//     const paidMembers =
//       members?.filter((m) => m.fee_status === "Paid").length || 0;

//     const pendingMembers =
//       members?.filter((m) => m.fee_status !== "Paid") || [];

//     const pendingFees = pendingMembers.reduce(
//       (sum, m) => sum + (m.monthly_fee || 0),
//       0
//     );

//     const monthlyCollection =
//       members
//         ?.filter((m) => m.fee_status === "Paid")
//         .reduce((sum, m) => sum + (m.monthly_fee || 0), 0) || 0;

//     return new Response(
//       JSON.stringify({
//         stats: {
//           totalMembers,
//           paidMembers,
//           pendingFees,
//           monthlyCollection,
//         },
//       }),
//       {
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       }
//     );
//   }

//   return new Response(JSON.stringify({ error: "Not Found" }), {
//     status: 404,
//     headers: { ...corsHeaders, "Content-Type": "application/json" },
//   });
// });


// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
// };

// // ===============================
// // PLAN MONTH HELPER
// // ===============================
// function getPlanMonths(plan: string) {
//   switch (plan) {
//     case "Monthly":
//       return 1;
//     case "Quarterly":
//       return 3;
//     case "Half Yearly":
//       return 6;
//     case "Yearly":
//       return 12;
//     default:
//       return 1;
//   }
// }

// // ✅ SAFE month calculation (NO BUG)
// function calculateFeeEndDate(startDate: Date, plan: string) {
//   const monthsToAdd = getPlanMonths(plan);
//   const end = new Date(startDate);
//   end.setMonth(end.getMonth() + monthsToAdd);
//   return end;
// }

// Deno.serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   const supabase = createClient(
//     Deno.env.get("SUPABASE_URL")!,
//     Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
//   );

//   const url = new URL(req.url);
//   const path = url.pathname;

//   // =====================================================
//   // GET MEMBERS (AUTO OVERDUE CHECK)
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/members")) {
//     const { data: members } = await supabase
//       .from("members")
//       .select("*")
//       .order("join_date", { ascending: false });

//     const today = new Date();

//     for (const member of members || []) {
//       if (
//         member.fee_end_date &&
//         new Date(member.fee_end_date) < today &&
//         member.fee_status === "Paid"
//       ) {
//         await supabase
//           .from("members")
//           .update({ fee_status: "Overdue" })
//           .eq("id", member.id);

//         member.fee_status = "Overdue";
//       }
//     }

//     return new Response(JSON.stringify({ members: members || [] }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // CREATE MEMBER
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/members")) {
//     const body = await req.json();

//     const today = new Date();
//     const feeEnd = calculateFeeEndDate(today, body.plan);

//     const { data, error } = await supabase
//       .from("members")
//       .insert({
//         name: body.name,
//         phone: body.phone,
//         email: body.email,
//         plan: body.plan,
//         monthly_fee: body.monthlyFee,
//         profile_url: body.profileUrl || null,
//         join_date: today,
//         fee_start_date: today,
//         fee_end_date: feeEnd,
//         fee_status: "Pending",
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify({ member: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // DELETE MEMBER
//   // =====================================================
//   if (req.method === "DELETE" && path.includes("/members/")) {
//     const id = path.split("/members/")[1];

//     await supabase.from("payments").delete().eq("member_id", id);
//     await supabase.from("members").delete().eq("id", id);

//     return new Response(JSON.stringify({ success: true }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // CREATE PAYMENT
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/payments")) {
//     const body = await req.json();
//     const today = new Date();

//     const { data: member } = await supabase
//       .from("members")
//       .select("plan")
//       .eq("id", body.memberId)
//       .single();

//     const feeEnd = calculateFeeEndDate(today, member.plan);

//     const { data, error } = await supabase
//       .from("payments")
//       .insert({
//         member_id: body.memberId,
//         amount: body.amount,
//         month: body.month,
//         payment_method: body.paymentMethod,
//         transaction_id: body.transactionId,
//         status: body.status,
//         date: today,
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     await supabase
//       .from("members")
//       .update({
//         fee_status: "Paid",
//         fee_start_date: today,
//         fee_end_date: feeEnd,
//       })
//       .eq("id", body.memberId);

//     return new Response(JSON.stringify({ payment: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // DASHBOARD
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/dashboard")) {
//     const { data: members } = await supabase
//       .from("members")
//       .select("*");

//     const totalMembers = members?.length || 0;

//     const paidMembers =
//       members?.filter((m) => m.fee_status === "Paid").length || 0;

//     const pendingMembers =
//       members?.filter((m) => m.fee_status !== "Paid") || [];

//     const pendingFees = pendingMembers.reduce(
//       (sum, m) => sum + (m.monthly_fee || 0),
//       0
//     );

//     const monthlyCollection =
//       members
//         ?.filter((m) => m.fee_status === "Paid")
//         .reduce((sum, m) => sum + (m.monthly_fee || 0), 0) || 0;

//     return new Response(
//       JSON.stringify({
//         stats: {
//           totalMembers,
//           paidMembers,
//           pendingFees,
//           monthlyCollection,
//         },
//       }),
//       {
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       }
//     );
//   }

//   return new Response(JSON.stringify({ error: "Not Found" }), {
//     status: 404,
//     headers: { ...corsHeaders, "Content-Type": "application/json" },
//   });
// });


// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
// };

// // ===============================
// // PLAN MONTH CALCULATOR
// // ===============================
// function getPlanMonths(plan: string) {
//   switch (plan) {
//     case "Monthly":
//       return 1;
//     case "Quarterly":
//       return 3;
//     case "Half Year":
//     case "Half Yearly":
//       return 6;
//     case "Yearly":
//       return 12;
//     default:
//       return 1;
//   }
// }

// // ===============================
// // EXACT SAME DATE MONTH ADD FIX
// // ===============================
// function calculateFeeEndDate(startDate: Date, plan: string) {
//   const monthsToAdd = getPlanMonths(plan);

//   const newDate = new Date(startDate);
//   newDate.setMonth(newDate.getMonth() + monthsToAdd);

//   return newDate;
// }

// Deno.serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   const supabase = createClient(
//     Deno.env.get("SUPABASE_URL")!,
//     Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
//   );

//   const url = new URL(req.url);
//   const path = url.pathname;

//   // =====================================================
//   // GET MEMBERS
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/members")) {
//     const { data } = await supabase
//       .from("members")
//       .select("*")
//       .order("join_date", { ascending: false });

//     return new Response(JSON.stringify({ members: data || [] }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // CREATE MEMBER
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/members")) {
//     const body = await req.json();

//     // 🔥 IMPORTANT FIX: Handle date correctly
//     const startDate = new Date(body.joinDate);

//     // remove time to avoid timezone bug
//     startDate.setHours(0, 0, 0, 0);

//     const feeEnd = calculateFeeEndDate(startDate, body.plan);
//     feeEnd.setHours(0, 0, 0, 0);

//     const { data, error } = await supabase
//       .from("members")
//       .insert({
//         name: body.name,
//         phone: body.phone,
//         email: body.email,
//         plan: body.plan,
//         monthly_fee: body.monthlyFee,
//         profile_url: body.profileUrl || null,
//         join_date: startDate,
//         fee_start_date: startDate,
//         fee_end_date: feeEnd,
//         fee_status: "Pending",
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify({ member: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // DELETE MEMBER
//   // =====================================================
//   if (req.method === "DELETE" && path.includes("/members/")) {
//     const id = path.split("/members/")[1];

//     await supabase.from("payments").delete().eq("member_id", id);
//     await supabase.from("members").delete().eq("id", id);

//     return new Response(JSON.stringify({ success: true }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // CREATE PAYMENT
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/payments")) {
//     const body = await req.json();

//     const paymentDate = new Date();
//     paymentDate.setHours(0, 0, 0, 0);

//     const { data: member } = await supabase
//       .from("members")
//       .select("plan")
//       .eq("id", body.memberId)
//       .single();

//     if (!member) {
//       return new Response(JSON.stringify({ error: "Member not found" }), {
//         status: 400,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     const feeEnd = calculateFeeEndDate(paymentDate, member.plan);
//     feeEnd.setHours(0, 0, 0, 0);

//     const { data, error } = await supabase
//       .from("payments")
//       .insert({
//         member_id: body.memberId,
//         amount: body.amount,
//         month: body.month,
//         payment_method: body.paymentMethod,
//         transaction_id: body.transactionId,
//         status: body.status,
//         date: paymentDate,
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     await supabase
//       .from("members")
//       .update({
//         fee_status: "Paid",
//         fee_start_date: paymentDate,
//         fee_end_date: feeEnd,
//       })
//       .eq("id", body.memberId);

//     return new Response(JSON.stringify({ payment: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   return new Response(JSON.stringify({ error: "Not Found" }), {
//     status: 404,
//     headers: { ...corsHeaders, "Content-Type": "application/json" },
//   });
// });



// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
// };

// function normalize(date: Date) {
//   const d = new Date(date);
//   d.setHours(0, 0, 0, 0);
//   return d;
// }

// Deno.serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   const supabase = createClient(
//     Deno.env.get("SUPABASE_URL")!,
//     Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
//   );

//   const url = new URL(req.url);
//   const path = url.pathname;

//   // =====================================================
//   // GET MEMBERS
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/members")) {
//     const { data: members } = await supabase
//       .from("members")
//       .select("*")
//       .order("join_date", { ascending: false });

//     const today = normalize(new Date());

//     for (const member of members || []) {
//       if (
//         member.fee_end_date &&
//         normalize(new Date(member.fee_end_date)) < today &&
//         member.fee_status === "Paid"
//       ) {
//         await supabase
//           .from("members")
//           .update({ fee_status: "Overdue" })
//           .eq("id", member.id);

//         member.fee_status = "Overdue";
//       }
//     }

//     return new Response(JSON.stringify({ members: members || [] }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // CREATE MEMBER
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/members")) {
//     const body = await req.json();

//     const joinDate = body.joinDate
//       ? normalize(new Date(body.joinDate))
//       : normalize(new Date());

//     const feeEnd = normalize(
//       new Date(
//         joinDate.getFullYear(),
//         joinDate.getMonth() + 1,
//         joinDate.getDate()
//       )
//     );

//     const { data, error } = await supabase
//       .from("members")
//       .insert({
//         name: body.name,
//         phone: body.phone,
//         email: body.email,
//         plan: body.plan,
//         monthly_fee: body.monthlyFee,
//         profile_url: body.profileUrl || null,
//         join_date: joinDate,
//         fee_start_date: joinDate,
//         fee_end_date: feeEnd,
//         fee_status: "Pending",
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify({ member: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // DELETE MEMBER
//   // =====================================================
//   if (req.method === "DELETE" && path.includes("/members/")) {
//     const id = path.split("/members/")[1];

//     await supabase.from("payments").delete().eq("member_id", id);
//     await supabase.from("members").delete().eq("id", id);

//     return new Response(JSON.stringify({ success: true }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // CREATE PAYMENT (🔥 CORRECT MONTH CALCULATION)
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/payments")) {
//     const body = await req.json();
//     const today = normalize(new Date());

//     const { data: member } = await supabase
//       .from("members")
//       .select("*")
//       .eq("id", body.memberId)
//       .single();

//     if (!member) {
//       return new Response(JSON.stringify({ error: "Member not found" }), {
//         status: 404,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     const existingEnd = member.fee_end_date
//       ? normalize(new Date(member.fee_end_date))
//       : null;

//     let startDate = today;

//     if (existingEnd && existingEnd > today) {
//       startDate = existingEnd;
//     }

//     // 🔥 CALCULATE MONTHS FROM AMOUNT
//     const monthlyFee = member.monthly_fee || 1;
//     const monthsToAdd = Math.max(
//       Math.floor(body.amount / monthlyFee),
//       1
//     );

//     const newEndDate = normalize(
//       new Date(
//         startDate.getFullYear(),
//         startDate.getMonth() + monthsToAdd,
//         startDate.getDate()
//       )
//     );

//     const { data, error } = await supabase
//       .from("payments")
//       .insert({
//         member_id: body.memberId,
//         amount: body.amount,
//         month: body.month,
//         payment_method: body.paymentMethod,
//         transaction_id: body.transactionId,
//         status: body.status,
//         date: today,
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     await supabase
//       .from("members")
//       .update({
//         fee_status: "Paid",
//         fee_start_date: startDate,
//         fee_end_date: newEndDate,
//       })
//       .eq("id", body.memberId);

//     return new Response(JSON.stringify({ payment: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   return new Response(JSON.stringify({ error: "Not Found" }), {
//     status: 404,
//     headers: { ...corsHeaders, "Content-Type": "application/json" },
//   });
// });











// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
// };

// function normalize(date: Date) {
//   const d = new Date(date);
//   d.setHours(0, 0, 0, 0);
//   return d;
// }

// Deno.serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   const supabase = createClient(
//     Deno.env.get("SUPABASE_URL")!,
//     Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
//   );

//   const url = new URL(req.url);
//   const path = url.pathname;

//   // =====================================================
//   // GET MEMBERS
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/members")) {
//     const { data: members } = await supabase
//       .from("members")
//       .select("*")
//       .order("join_date", { ascending: false });

//     const today = normalize(new Date());

//     for (const member of members || []) {
//       if (
//         member.fee_end_date &&
//         normalize(new Date(member.fee_end_date)) < today &&
//         member.fee_status === "Paid"
//       ) {
//         await supabase
//           .from("members")
//           .update({ fee_status: "Overdue" })
//           .eq("id", member.id);

//         member.fee_status = "Overdue";
//       }
//     }

//     return new Response(JSON.stringify({ members: members || [] }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // CREATE MEMBER
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/members")) {
//     const body = await req.json();

//     const joinDate = body.joinDate
//       ? normalize(new Date(body.joinDate))
//       : normalize(new Date());

//     const feeEnd = normalize(
//       new Date(
//         joinDate.getFullYear(),
//         joinDate.getMonth() + 1,
//         joinDate.getDate()
//       )
//     );

//     const { data, error } = await supabase
//       .from("members")
//       .insert({
//         name: body.name,
//         phone: body.phone,
//         email: body.email,
//         plan: body.plan,
//         monthly_fee: body.monthlyFee,
//         profile_url: body.profileUrl || null,
//         join_date: joinDate,
//         fee_start_date: joinDate,
//         fee_end_date: feeEnd,
//         fee_status: "Pending",
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify({ member: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // DELETE MEMBER
//   // =====================================================
//   if (req.method === "DELETE" && path.includes("/members/")) {
//     const id = path.split("/members/")[1];

//     await supabase.from("payments").delete().eq("member_id", id);
//     await supabase.from("members").delete().eq("id", id);

//     return new Response(JSON.stringify({ success: true }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // CREATE PAYMENT
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/payments")) {
//     const body = await req.json();
//     const today = normalize(new Date());

//     const { data: member } = await supabase
//       .from("members")
//       .select("*")
//       .eq("id", body.memberId)
//       .single();

//     if (!member) {
//       return new Response(JSON.stringify({ error: "Member not found" }), {
//         status: 404,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     const existingEnd = member.fee_end_date
//       ? normalize(new Date(member.fee_end_date))
//       : null;

//     let startDate = today;

//     if (existingEnd && existingEnd > today) {
//       startDate = existingEnd;
//     }

//     const monthlyFee = member.monthly_fee || 1;
//     const monthsToAdd = Math.max(
//       Math.floor(body.amount / monthlyFee),
//       1
//     );

//     const newEndDate = normalize(
//       new Date(
//         startDate.getFullYear(),
//         startDate.getMonth() + monthsToAdd,
//         startDate.getDate()
//       )
//     );

//     const { data, error } = await supabase
//       .from("payments")
//       .insert({
//         member_id: body.memberId,
//         amount: body.amount,
//         month: body.month,
//         payment_method: body.paymentMethod,
//         transaction_id: body.transactionId,
//         status: body.status,
//         date: today,
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     await supabase
//       .from("members")
//       .update({
//         fee_status: "Paid",
//         fee_start_date: startDate,
//         fee_end_date: newEndDate,
//       })
//       .eq("id", body.memberId);

//     return new Response(JSON.stringify({ payment: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // DASHBOARD (🔥 RESTORED)
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/dashboard")) {
//     const { data: members } = await supabase
//       .from("members")
//       .select("*");

//     const totalMembers = members?.length || 0;

//     const paidMembers =
//       members?.filter((m) => m.fee_status === "Paid").length || 0;

//     const pendingMembers =
//       members?.filter((m) => m.fee_status !== "Paid") || [];

//     const pendingFees = pendingMembers.reduce(
//       (sum, m) => sum + (m.monthly_fee || 0),
//       0
//     );

//     const monthlyCollection =
//       members
//         ?.filter((m) => m.fee_status === "Paid")
//         .reduce((sum, m) => sum + (m.monthly_fee || 0), 0) || 0;

//     return new Response(
//       JSON.stringify({
//         stats: {
//           totalMembers,
//           paidMembers,
//           pendingFees,
//           monthlyCollection,
//         },
//       }),
//       {
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       }
//     );
//   }

//   return new Response(JSON.stringify({ error: "Not Found" }), {
//     status: 404,
//     headers: { ...corsHeaders, "Content-Type": "application/json" },
//   });
// });





// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
// };

// function normalize(date: Date) {
//   const d = new Date(date);
//   d.setHours(0, 0, 0, 0);
//   return d;
// }

// function getPlanMonths(plan: string) {
//   switch (plan) {
//     case "Monthly":
//       return 1;
//     case "Quarterly":
//       return 3;
//     case "Half Year":
//       return 6;
//     case "Yearly":
//       return 12;
//     default:
//       return 1;
//   }
// }

// Deno.serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   const supabase = createClient(
//     Deno.env.get("SUPABASE_URL")!,
//     Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
//   );

//   const url = new URL(req.url);
//   const path = url.pathname;

//   // =====================================================
//   // GET MEMBERS (Auto Overdue Check)
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/members")) {
//     const { data: members } = await supabase
//       .from("members")
//       .select("*")
//       .order("join_date", { ascending: false });

//     const today = normalize(new Date());

//     for (const m of members || []) {
//       if (
//         m.fee_end_date &&
//         normalize(new Date(m.fee_end_date)) < today &&
//         m.fee_status === "Paid"
//       ) {
//         await supabase
//           .from("members")
//           .update({ fee_status: "Overdue" })
//           .eq("id", m.id);

//         m.fee_status = "Overdue";
//       }
//     }

//     return new Response(JSON.stringify({ members: members || [] }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // CREATE MEMBER
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/members")) {
//     const body = await req.json();

//     const joinDate = body.joinDate
//       ? normalize(new Date(body.joinDate))
//       : normalize(new Date());

//     const months = getPlanMonths(body.plan);

//     const feeEnd = normalize(
//       new Date(
//         joinDate.getFullYear(),
//         joinDate.getMonth() + months,
//         joinDate.getDate()
//       )
//     );

//     const { data, error } = await supabase
//       .from("members")
//       .insert({
//         name: body.name,
//         phone: body.phone,
//         email: body.email,
//         plan: body.plan,
//         monthly_fee: body.monthlyFee,
//         profile_url: body.profileUrl || null,
//         join_date: joinDate,
//         fee_start_date: joinDate,
//         fee_end_date: feeEnd,
//         fee_status: "Pending",
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify({ member: data }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // =====================================================
//   // DELETE MEMBER
//   // =====================================================
//   if (req.method === "DELETE") {
//     const match = path.match(/\/members\/(.+)/);
//     if (match) {
//       const id = match[1];

//       await supabase.from("payments").delete().eq("member_id", id);
//       await supabase.from("members").delete().eq("id", id);

//       return new Response(
//         JSON.stringify({ success: true }),
//         { headers: { ...corsHeaders, "Content-Type": "application/json" } }
//       );
//     }
//   }

//   // =====================================================
//  // =====================================================
// // =====================================================
// // CREATE PAYMENT (FINAL CORRECT VERSION)
// // =====================================================
// if (req.method === "POST" && path.endsWith("/payments")) {
//   const body = await req.json();

//   const { data: member, error: memberError } = await supabase
//     .from("members")
//     .select("*")
//     .eq("id", body.memberId)
//     .single();

//   if (memberError || !member) {
//     return new Response(JSON.stringify({ error: "Member not found" }), {
//       status: 404,
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // ✅ ALWAYS START FROM JOIN DATE
//   const startDate = normalize(new Date(member.join_date));

//   // ✅ PLAN BASED MONTHS (NOT AMOUNT BASED)
//   const monthsToAdd = getPlanMonths(member.plan);

//   const newEndDate = normalize(
//     new Date(
//       startDate.getFullYear(),
//       startDate.getMonth() + monthsToAdd,
//       startDate.getDate()
//     )
//   );

//   // Insert payment
//   const { data, error } = await supabase
//     .from("payments")
//     .insert({
//       member_id: body.memberId,
//       amount: body.amount,
//       month: body.month,
//       payment_method: body.paymentMethod,
//       transaction_id: body.transactionId,
//       status: body.status,
//       date: normalize(new Date()),
//     })
//     .select()
//     .single();

//   if (error) {
//     return new Response(JSON.stringify({ error }), {
//       status: 500,
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   await supabase
//     .from("members")
//     .update({
//       fee_status: "Paid",
//       fee_start_date: startDate,
//       fee_end_date: newEndDate,
//     })
//     .eq("id", body.memberId);

//   return new Response(JSON.stringify({ payment: data }), {
//     headers: { ...corsHeaders, "Content-Type": "application/json" },
//   });
// }


//   // =====================================================
//   // DASHBOARD
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/dashboard")) {
//     const { data: members } = await supabase
//       .from("members")
//       .select("*");

//     const totalMembers = members?.length || 0;

//     const paidMembers =
//       members?.filter((m) => m.fee_status === "Paid").length || 0;

//     const pendingMembers =
//       members?.filter((m) => m.fee_status !== "Paid") || [];

//     const pendingFees = pendingMembers.reduce(
//       (sum, m) => sum + (m.monthly_fee || 0),
//       0
//     );

//     const monthlyCollection =
//       members
//         ?.filter((m) => m.fee_status === "Paid")
//         .reduce((sum, m) => sum + (m.monthly_fee || 0), 0) || 0;

//     return new Response(
//       JSON.stringify({
//         stats: {
//           totalMembers,
//           paidMembers,
//           pendingFees,
//           monthlyCollection,
//         },
//       }),
//       {
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       }
//     );
//   }

//   return new Response(JSON.stringify({ error: "Not Found" }), {
//     status: 404,
//     headers: { ...corsHeaders, "Content-Type": "application/json" },
//   });
// });



import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

function normalize(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getPlanMonths(plan: string) {
  switch (plan) {
    case "Monthly":
      return 1;
    case "Quarterly":
      return 3;
    case "Half Year":
      return 6;
    case "Yearly":
      return 12;
    default:
      return 1;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const url = new URL(req.url);
  const path = url.pathname;

  // =====================================================
  // GET MEMBERS
  // =====================================================
  if (req.method === "GET" && path.endsWith("/members")) {
    const { data: members } = await supabase
      .from("members")
      .select("*")
      .order("join_date", { ascending: false });

    return new Response(JSON.stringify({ members: members || [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // =====================================================
  // CREATE MEMBER
  // =====================================================
  if (req.method === "POST" && path.endsWith("/members")) {
    const body = await req.json();

    const joinDate = body.joinDate
      ? normalize(new Date(body.joinDate))
      : normalize(new Date());

    const months = getPlanMonths(body.plan);

    const feeEnd = normalize(
      new Date(
        joinDate.getFullYear(),
        joinDate.getMonth() + months,
        joinDate.getDate()
      )
    );

    const { data, error } = await supabase
      .from("members")
      .insert({
        name: body.name,
        phone: body.phone,
        email: body.email,
        plan: body.plan,
        monthly_fee: body.monthlyFee,
        profile_url: body.profileUrl || null,
        join_date: joinDate,
        fee_start_date: joinDate,
        fee_end_date: feeEnd,
        fee_status: "Pending",
      })
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ member: data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // =====================================================
  // DELETE MEMBER
  // =====================================================
  if (req.method === "DELETE") {
    const match = path.match(/\/members\/(.+)/);
    if (match) {
      const id = match[1];

      await supabase.from("payments").delete().eq("member_id", id);
      await supabase.from("members").delete().eq("id", id);

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }

  // =====================================================
  // CREATE PAYMENT
  // =====================================================
  if (req.method === "POST" && path.endsWith("/payments")) {
    const body = await req.json();

    const { data: member } = await supabase
      .from("members")
      .select("*")
      .eq("id", body.memberId)
      .single();

    if (!member) {
      return new Response(JSON.stringify({ error: "Member not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const startDate = normalize(new Date(member.join_date));
    const monthsToAdd = getPlanMonths(member.plan);

    const newEndDate = normalize(
      new Date(
        startDate.getFullYear(),
        startDate.getMonth() + monthsToAdd,
        startDate.getDate()
      )
    );

    const { data, error } = await supabase
      .from("payments")
      .insert({
        member_id: body.memberId,
        amount: body.amount,
        month: body.month,
        payment_method: body.paymentMethod,
        transaction_id: body.transactionId,
        status: body.status,
        date: normalize(new Date()),
      })
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await supabase
      .from("members")
      .update({
        fee_status: "Paid",
        fee_start_date: startDate,
        fee_end_date: newEndDate,
      })
      .eq("id", body.memberId);

    return new Response(JSON.stringify({ payment: data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // =====================================================
  // DASHBOARD (MONTH-WISE VERSION)
  // =====================================================
  if (req.method === "GET" && path.endsWith("/dashboard")) {
    const selectedMonth = url.searchParams.get("month");

    const { data: members } = await supabase
      .from("members")
      .select("*");

    const { data: payments } = await supabase
      .from("payments")
      .select("*")
      .eq("month", selectedMonth);

    const totalMembers = members?.length || 0;

    const paidMemberIds = new Set(
      (payments || []).map((p) => p.member_id)
    );

    const paidMembers = paidMemberIds.size;

    const monthlyCollection =
      (payments || []).reduce((sum, p) => sum + (p.amount || 0), 0);

    const pendingMembers =
      members?.filter((m) => !paidMemberIds.has(m.id)) || [];

    const pendingFees = pendingMembers.reduce(
      (sum, m) => sum + (m.monthly_fee || 0),
      0
    );

    return new Response(
      JSON.stringify({
        stats: {
          totalMembers,
          paidMembers,
          pendingFees,
          monthlyCollection,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  return new Response(JSON.stringify({ error: "Not Found" }), {
    status: 404,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
