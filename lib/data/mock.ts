export const mockOrders = [
  { id: "CA-10482", client: "Northstar Lending", borrower: "Sarah Donnelly", property_address: "1248 Haines Ave, Charlotte, NC", amc: "ClearView AMC", status: "review_hold", priority: "Rush", due_date: "Today", fee_amount: 625, progress: 72, warning: "UAD XML: GLA differs from PDF sketch by 46 sq ft" },
  { id: "CA-10481", client: "Blue Ridge Bank", borrower: "Marcus Reid", property_address: "812 Fairview Dr, Raleigh, NC", amc: "MetroValuations", status: "portal_ready", priority: "Normal", due_date: "Tomorrow", fee_amount: 525, progress: 46, warning: "AMC portal not submitted" },
  { id: "CA-10477", client: "Pinnacle Mortgage", borrower: "Emily Chen", property_address: "44 Waterline Ct, Wilmington, NC", amc: "Keystone AMC", status: "revision_requested", priority: "High", due_date: "2 days", fee_amount: 700, progress: 84, warning: null },
  { id: "CA-10475", client: "Summit Capital", borrower: "Daniel Brooks", property_address: "907 Maple Forge Rd, Durham, NC", amc: "Legacy VMS Import", status: "completed", priority: "Normal", due_date: "Closed", fee_amount: 500, progress: 100, warning: null }
];
export const features = [
  "Appraisal order tracking", "AMC portal autofill", "Legacy URAR XML", "UAD 3.6 XML", "Review engine", "Accounting and payouts", "Vendor portal", "Lender delivery", "Role permissions", "SLA intelligence"
];
