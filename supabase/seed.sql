insert into organizations (id, name, kind) values ('00000000-0000-0000-0000-000000000001','Caarps Demo','appraisal_firm') on conflict do nothing;

insert into orders (id, organization_id, client, client_user, borrower, property_address, city, state, zip, county, product, loan_type, intended_use, occupancy, sale_price, amc, status, current_status, priority, due_date, date_needed, inspection_scheduled_at, fee_amount, appraiser_fee, tech_fee_amount, progress, warning, contact_name, contact_phone, contact_email, notes) values
('CA-10482','00000000-0000-0000-0000-000000000001','Northstar Lending','Adam Coston','Sarah Donnelly','1248 Haines Ave','Charlotte','NC','28205','Mecklenburg','1004 (UAD) - URAR','FHA','Purchase','Primary Residence',410000,'ClearView AMC','review_hold','Client asked us to pause work on this assignment.','Rush','Today','6/2/2026','5/28/2026 10:30 AM - 12:00 PM',625,292.50,9.99,72,'UAD XML: GLA differs from PDF sketch by 46 sq ft','Trish Hollon','(864)590-6337','thollon@example.com','AAPP No. Matt must inspect. Coordinate inspection with Matt.'),
('CA-10481','00000000-0000-0000-0000-000000000001','Blue Ridge Bank','Loan Desk','Marcus Reid','812 Fairview Dr','Raleigh','NC','27601','Wake','APPRAISAL FLEX 1004','VA','Purchase','Primary Residence',985000,'MetroValuations','portal_ready','Inspection scheduled and client notified.','Normal','Tomorrow','6/2/2026','5/28/2026 10:30 AM - 12:00 PM',525,300.00,7.99,46,'AMC portal not submitted','Trish Hollon','(864)590-6337','thollon@example.com','Subject is 3,950 sf home on 4 acres.'),
('CA-10477','00000000-0000-0000-0000-000000000001','DHI Mortgage','Rebekah Harris','Whitney Gregory','3429 Hunters Brook Dr','Boiling Springs','SC','29316','Spartanburg','APPRAISAL FLEX 1004','Conventional','Purchase','Primary Residence',425000,'Keystone AMC','assigned','Accepted by vendor.','Normal','5/28/2026','6/2/2026','',650,325.00,8.99,35,null,'Borrower Contact','(864)555-0101','borrower@example.com',''),
('CA-10476','00000000-0000-0000-0000-000000000001','DHI Mortgage','Rebekah Harris','Ryan Taylor','4113 Arden Springhire Ln','Boiling Springs','SC','29316','Spartanburg','APPRAISAL FLEX 1004','Conventional','Purchase','Primary Residence',399000,'Class Valuation','inspection_scheduled','Inspection scheduled.','Normal','5/29/2026','6/1/2026','5/29/2026 9:00 AM',650,325.00,8.99,55,null,'Borrower Contact','(864)555-0102','borrower2@example.com','')
on conflict (id) do update set client = excluded.client;

insert into order_status_history (order_id, organization_id, status, message, created_at) values
('CA-10482','00000000-0000-0000-0000-000000000001','review_hold','Client asked us to pause working on this assignment.', now() - interval '1 hour'),
('CA-10482','00000000-0000-0000-0000-000000000001','inspection_scheduled','Inspection scheduled on 5/28/2026 from 10:30 AM to 12:00 PM.', now() - interval '2 days'),
('CA-10482','00000000-0000-0000-0000-000000000001','assigned','Emailed appraiser and saved purchase contract to work file.', now() - interval '5 days')
on conflict do nothing;

insert into order_notes (order_id, organization_id, body, visibility) values
('CA-10482','00000000-0000-0000-0000-000000000001','AAPP No. Matt must inspect. Coordinate the inspection with Matt. Subject is 3,950 sf home on 4 acres.','internal'),
('CA-10482','00000000-0000-0000-0000-000000000001','In 2024 we completed a nearby appraisal for 502 Foster Place Dr.','internal')
on conflict do nothing;
