-- Enable RLS on core tables

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE appraisers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Organizations

CREATE POLICY "Users can view their organization"
ON organizations
FOR SELECT
USING (
  id IN (
    SELECT organization_id
    FROM profiles
    WHERE id = auth.uid()
  )
);

-- Profiles

CREATE POLICY "Users can view profiles in same organization"
ON profiles
FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id
    FROM profiles
    WHERE id = auth.uid()
  )
);

-- Orders

CREATE POLICY "Users can view orders in same organization"
ON orders
FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id
    FROM profiles
    WHERE id = auth.uid()
  )
);

CREATE POLICY "Users can insert orders in same organization"
ON orders
FOR INSERT
WITH CHECK (
  organization_id IN (
    SELECT organization_id
    FROM profiles
    WHERE id = auth.uid()
  )
);

DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'organizations') THEN
    ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
  END IF;

  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
  END IF;

  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'orders') THEN
    ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
  END IF;

  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'appraisers') THEN
    ALTER TABLE appraisers ENABLE ROW LEVEL SECURITY;
  END IF;

  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'vendors') THEN
    ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
  END IF;

  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'assignments') THEN
    ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
  END IF;

  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'invoices') THEN
    ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;
DROP POLICY IF EXISTS "Users can view their organization" ON organizations;
CREATE POLICY "Users can view their organization"
ON organizations
FOR SELECT
USING (
  id IN (
    SELECT organization_id
    FROM profiles
    WHERE id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can view profiles in same organization" ON profiles;
CREATE POLICY "Users can view profiles in same organization"
ON profiles
FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id
    FROM profiles
    WHERE id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can view orders in same organization" ON orders;
CREATE POLICY "Users can view orders in same organization"
ON orders
FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id
    FROM profiles
    WHERE id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can insert orders in same organization" ON orders;
CREATE POLICY "Users can insert orders in same organization"
ON orders
FOR INSERT
WITH CHECK (
  organization_id IN (
    SELECT organization_id
    FROM profiles
    WHERE id = auth.uid()
  )
);