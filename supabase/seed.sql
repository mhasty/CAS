insert into organizations (id, name, kind) values ('00000000-0000-0000-0000-000000000001','Caarps Demo','appraisal_firm') on conflict do nothing;
insert into orders (id, organization_id, client, borrower, property_address, amc, status, priority, due_date, fee_amount, tech_fee_amount, progress, warning) values
('CA-10482','00000000-0000-0000-0000-000000000001','Northstar Lending','Sarah Donnelly','1248 Haines Ave, Charlotte, NC','ClearView AMC','review_hold','Rush','Today',625,9.99,72,'UAD XML: GLA differs from PDF sketch by 46 sq ft'),
('CA-10481','00000000-0000-0000-0000-000000000001','Blue Ridge Bank','Marcus Reid','812 Fairview Dr, Raleigh, NC','MetroValuations','portal_ready','Normal','Tomorrow',525,7.99,46,'AMC portal not submitted')
on conflict do nothing;
