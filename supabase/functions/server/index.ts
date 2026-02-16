



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
//     case "Monthly": return 1;
//     case "Quarterly": return 3;
//     case "Half Year": return 6;
//     case "Yearly": return 12;
//     default: return 1;
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
//   // GET MEMBERS (AUTO EXPIRE)
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/members")) {

//     const { data: members } = await supabase
//       .from("members")
//       .select("*")
//       .order("join_date", { ascending: false });

//     const today = normalize(new Date());

//     const updatedMembers = (members || []).map(member => {

//       if (!member.fee_end_date) {
//         return { ...member, fee_status: "Pending" };
//       }

//       const endDate = normalize(new Date(member.fee_end_date));

//       return {
//         ...member,
//         fee_status: today > endDate ? "Pending" : "Paid"
//       };
//     });

//     return new Response(
//       JSON.stringify({ members: updatedMembers }),
//       { headers: { ...corsHeaders, "Content-Type": "application/json" } }
//     );
//   }

//   // =====================================================
//   // DELETE MEMBER
//   // =====================================================
//   if (req.method === "DELETE" && path.includes("/members/")) {

//     const id = path.split("/members/")[1];

//     await supabase.from("payments").delete().eq("member_id", id);

//     await supabase.from("members").delete().eq("id", id);

//     return new Response(
//       JSON.stringify({ success: true }),
//       { headers: { ...corsHeaders, "Content-Type": "application/json" } }
//     );
//   }

//   // =====================================================
//   // CREATE MEMBER
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/members")) {

//     const body = await req.json();

//     const joinDate = body.joinDate
//       ? normalize(new Date(body.joinDate))
//       : normalize(new Date());

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
//         fee_start_date: null,
//         fee_end_date: null,
//         fee_status: "Pending"
//       })
//       .select()
//       .single();

//     if (error) {
//       return new Response(JSON.stringify({ error }), {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     return new Response(
//       JSON.stringify({ member: data }),
//       { headers: { ...corsHeaders, "Content-Type": "application/json" } }
//     );
//   }

//   // =====================================================
//   // CREATE PAYMENT (ALWAYS EXTEND)
//   // =====================================================
//   if (req.method === "POST" && path.endsWith("/payments")) {

//     const body = await req.json();

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

//     const months = getPlanMonths(member.plan);

//     let startDate;

//     if (member.fee_end_date) {
//       startDate = normalize(new Date(member.fee_end_date));
//     } else {
//       startDate = normalize(new Date(member.join_date));
//     }

//     const newEndDate = normalize(
//       new Date(
//         startDate.getFullYear(),
//         startDate.getMonth() + months,
//         startDate.getDate()
//       )
//     );

//     await supabase.from("payments").insert({
//       member_id: body.memberId,
//       amount: body.amount,
//       payment_method: body.paymentMethod,
//       transaction_id: body.transactionId,
//       date: normalize(new Date(body.date || new Date())),
//       status: "Paid"
//     });

//     await supabase
//       .from("members")
//       .update({
//         fee_start_date: startDate,
//         fee_end_date: newEndDate,
//         fee_status: "Paid"
//       })
//       .eq("id", body.memberId);

//     return new Response(
//       JSON.stringify({ success: true }),
//       { headers: { ...corsHeaders, "Content-Type": "application/json" } }
//     );
//   }

//   // =====================================================
//   // DASHBOARD (MONTH-WISE)
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/dashboard")) {

//     const selectedMonth = url.searchParams.get("month");

//     if (!selectedMonth) {
//       return new Response(JSON.stringify({ error: "Month required" }), {
//         status: 400,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     const year = new Date().getFullYear();
//     const monthIndex = new Date(`${selectedMonth} 1, ${year}`).getMonth();

//     const startDate = new Date(year, monthIndex, 1);
//     const endDate = new Date(year, monthIndex + 1, 1);

//     const { data: members } = await supabase.from("members").select("*");

//     const { data: payments } = await supabase
//       .from("payments")
//       .select("*")
//       .gte("date", startDate.toISOString())
//       .lt("date", endDate.toISOString());

//     const paidMemberIds = new Set(
//       (payments || []).map(p => p.member_id)
//     );

//     const totalMembers = members?.length || 0;
//     const paidMembers = paidMemberIds.size;

//     const monthlyCollection =
//       (payments || []).reduce((sum, p) => sum + (p.amount || 0), 0);

//     const pendingFees =
//       (members || [])
//         .filter(m => !paidMemberIds.has(m.id))
//         .reduce((sum, m) => sum + (m.monthly_fee || 0), 0);

//     return new Response(
//       JSON.stringify({
//         stats: {
//           totalMembers,
//           paidMembers,
//           pendingFees,
//           monthlyCollection,
//         }
//       }),
//       { headers: { ...corsHeaders, "Content-Type": "application/json" } }
//     );
//   }

//   return new Response(
//     JSON.stringify({ error: "Not Found" }),
//     { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
//   );
// });






// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
// };

// // ✅ GLOBAL CLIENT (IMPORTANT FIX)
// const supabase = createClient(
//   Deno.env.get("SUPABASE_URL")!,
//   Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
// );

// function normalize(date: Date) {
//   const d = new Date(date);
//   d.setHours(0, 0, 0, 0);
//   return d;
// }

// function getPlanMonths(plan: string) {
//   switch (plan) {
//     case "Monthly": return 1;
//     case "Quarterly": return 3;
//     case "Half Year": return 6;
//     case "Yearly": return 12;
//     default: return 1;
//   }
// }

// Deno.serve(async (req) => {

//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   const url = new URL(req.url);
//   const path = url.pathname;

//   // =====================================================
//   // GET MEMBERS (FAST SELECT)
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/members")) {

//     const { data: members } = await supabase
//       .from("members")
//       .select("id, name, phone, email, plan, monthly_fee, profile_url, join_date, fee_start_date, fee_end_date, fee_status")
//       .order("join_date", { ascending: false });

//     return new Response(
//       JSON.stringify({ members }),
//       { headers: { ...corsHeaders, "Content-Type": "application/json" } }
//     );
//   }

//   // =====================================================
// // CREATE MEMBER
// // =====================================================
// if (req.method === "POST" && path.endsWith("/members")) {

//   const body = await req.json();

//   const joinDate = body.joinDate
//     ? new Date(body.joinDate)
//     : new Date();

//   const { data, error } = await supabase
//     .from("members")
//     .insert({
//       name: body.name,
//       phone: body.phone,
//       email: body.email,
//       plan: body.plan,
//       monthly_fee: body.monthlyFee,
//       profile_url: body.profileUrl || null,
//       join_date: joinDate,
//       fee_start_date: null,
//       fee_end_date: null,
//       fee_status: "Pending"
//     })
//     .select()
//     .single();

//   if (error) {
//     return new Response(JSON.stringify({ error }), {
//       status: 500,
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   return new Response(
//     JSON.stringify({ member: data }),
//     { headers: { ...corsHeaders, "Content-Type": "application/json" } }
//   );
// }


//   // =====================================================
//   // DASHBOARD
//   // =====================================================
//   if (req.method === "GET" && path.endsWith("/dashboard")) {

//     const selectedMonth = url.searchParams.get("month");

//     if (!selectedMonth) {
//       return new Response(JSON.stringify({ error: "Month required" }), {
//         status: 400,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     const year = new Date().getFullYear();
//     const monthIndex = new Date(`${selectedMonth} 1, ${year}`).getMonth();

//     const startDate = new Date(year, monthIndex, 1);
//     const endDate = new Date(year, monthIndex + 1, 1);

//     const { data: members } = await supabase
//       .from("members")
//       .select("id, monthly_fee");

//     const { data: payments } = await supabase
//       .from("payments")
//       .select("member_id, amount")
//       .gte("date", startDate.toISOString())
//       .lt("date", endDate.toISOString());

//     const paidMemberIds = new Set(
//       (payments || []).map(p => p.member_id)
//     );

//     const totalMembers = members?.length || 0;
//     const paidMembers = paidMemberIds.size;

//     const monthlyCollection =
//       (payments || []).reduce((sum, p) => sum + (p.amount || 0), 0);

//     const pendingFees =
//       (members || [])
//         .filter(m => !paidMemberIds.has(m.id))
//         .reduce((sum, m) => sum + (m.monthly_fee || 0), 0);

//     return new Response(
//       JSON.stringify({
//         stats: {
//           totalMembers,
//           paidMembers,
//           pendingFees,
//           monthlyCollection,
//         }
//       }),
//       { headers: { ...corsHeaders, "Content-Type": "application/json" } }
//     );
//   }

//   // =====================================================
// // CREATE PAYMENT
// // =====================================================
// if (req.method === "POST" && path.endsWith("/payments")) {

//   const body = await req.json();

//   const { data: member } = await supabase
//     .from("members")
//     .select("id, plan, join_date, fee_end_date")
//     .eq("id", body.memberId)
//     .single();

//   if (!member) {
//     return new Response(JSON.stringify({ error: "Member not found" }), {
//       status: 404,
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });
//   }

//   // Insert payment
//   await supabase.from("payments").insert({
//     member_id: body.memberId,
//     amount: body.amount,
//     payment_method: body.paymentMethod,
//     transaction_id: body.transactionId,
//     date: new Date(),
//     status: "Paid",
//   });

//   return new Response(
//     JSON.stringify({ success: true }),
//     { headers: { ...corsHeaders, "Content-Type": "application/json" } }
//   );
// }


//   return new Response(
//     JSON.stringify({ error: "Not Found" }),
//     { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
//   );
// });



import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

// ✅ GLOBAL CLIENT (IMPORTANT)
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

Deno.serve(async (req) => {

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname;

  // ============================
  // GET MEMBERS
  // ============================
  if (req.method === "GET" && path.endsWith("/members")) {

    const { data } = await supabase
      .from("members")
      .select("*")
      .order("join_date", { ascending: false });

    return new Response(
      JSON.stringify({ members: data }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // ============================
  // CREATE MEMBER
  // ============================
  if (req.method === "POST" && path.endsWith("/members")) {

    const body = await req.json();

    const { data, error } = await supabase
      .from("members")
      .insert({
        name: body.name,
        phone: body.phone,
        email: body.email,
        plan: body.plan,
        monthly_fee: body.monthlyFee,
        profile_url: body.profileUrl || null,
        join_date: body.joinDate,
        fee_start_date: null,
        fee_end_date: null,
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

    return new Response(
      JSON.stringify({ member: data }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // ============================
  // DELETE MEMBER
  // ============================
  if (req.method === "DELETE" && path.includes("/members/")) {

    const id = path.split("/members/")[1];

    await supabase.from("payments").delete().eq("member_id", id);
    await supabase.from("members").delete().eq("id", id);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // ============================
 // ============================
// ============================
// CREATE PAYMENT (PLAN BASED ON JOIN DATE)
// ============================
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

  const getPlanMonths = (plan: string) => {
    switch (plan) {
      case "Monthly": return 1;
      case "Quarterly": return 3;
      case "Half Year": return 6;
      case "Yearly": return 12;
      default: return 1;
    }
  };

  const months = getPlanMonths(member.plan);

  // 🔥 START DATE = JOIN DATE (your requirement)
  const startDate = new Date(member.join_date);
  startDate.setHours(0,0,0,0);

  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + months);

  // Insert payment
  await supabase.from("payments").insert({
    member_id: body.memberId,
    amount: body.amount,
    payment_method: body.paymentMethod,
    transaction_id: body.transactionId,
    date: new Date(),
    status: "Paid",
  });

  // Update member validity
  await supabase
    .from("members")
    .update({
      fee_start_date: startDate,
      fee_end_date: endDate,
      fee_status: "Paid",
    })
    .eq("id", body.memberId);

  return new Response(
    JSON.stringify({ success: true }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

// DASHBOARD
  // ============================
  if (req.method === "GET" && path.endsWith("/dashboard")) {

    const { data: members } = await supabase
      .from("members")
      .select("id, monthly_fee");

    const { data: payments } = await supabase
      .from("payments")
      .select("member_id, amount");

    const paidMemberIds = new Set(
      (payments || []).map(p => p.member_id)
    );

    const totalMembers = members?.length || 0;
    const paidMembers = paidMemberIds.size;

    const monthlyCollection =
      (payments || []).reduce((sum, p) => sum + (p.amount || 0), 0);

    const pendingFees =
      (members || [])
        .filter(m => !paidMemberIds.has(m.id))
        .reduce((sum, m) => sum + (m.monthly_fee || 0), 0);

    return new Response(
      JSON.stringify({
        stats: {
          totalMembers,
          paidMembers,
          pendingFees,
          monthlyCollection,
        }
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }


  return new Response(
    JSON.stringify({ error: "Not Found" }),
    { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
