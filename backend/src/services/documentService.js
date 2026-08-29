/**
 * Document service — placeholder for document CRUD operations.
 *
 * Will connect to Supabase for persistent storage once configured.
 * For now, returns mock data for the frontend to consume.
 */

// In-memory placeholder store
const mockDocuments = [
  {
    id: '1',
    filename: 'syllabus-cs101.pdf',
    originalName: 'CS 101 Syllabus.pdf',
    size: 245760,
    mimeType: 'application/pdf',
    status: 'indexed',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    filename: 'lecture-notes-week1.pdf',
    originalName: 'Lecture Notes — Week 1.pdf',
    size: 512000,
    mimeType: 'application/pdf',
    status: 'indexed',
    createdAt: new Date().toISOString(),
  },
];

export async function listDocuments() {
  // TODO: query Supabase `documents` table
  return mockDocuments;
}

export async function deleteDocument(id) {
  // TODO: delete from Supabase
  return { id, deleted: true };
}

export async function saveDocument(file) {
  // TODO: persist metadata to Supabase
  return {
    id: `doc-${Date.now()}`,
    filename: file.filename,
    originalName: file.originalname,
    size: file.size,
    mimeType: file.mimetype,
    path: file.path,
    status: 'uploaded',
    createdAt: new Date().toISOString(),
  };
}
