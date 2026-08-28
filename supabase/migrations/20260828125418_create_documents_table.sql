-- Documents table for the CampusAI RAG knowledge base
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  size BIGINT NOT NULL DEFAULT 0,
  mime_type TEXT,
  path TEXT,
  status TEXT NOT NULL DEFAULT 'indexed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Public read access for the anon key (no-auth app for now)
CREATE POLICY "read_documents" ON public.documents
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "insert_documents" ON public.documents
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "update_documents" ON public.documents
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_documents" ON public.documents
  FOR DELETE TO anon, authenticated USING (true);
