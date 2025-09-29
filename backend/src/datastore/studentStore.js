import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, '../../data');
const dataFile = path.join(dataDir, 'students.json');

async function ensureDataFile() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, '[]', 'utf-8');
  }
}

export async function readAllStudents() {
  await ensureDataFile();
  const raw = await fs.readFile(dataFile, 'utf-8');
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

export async function writeAllStudents(students) {
  await ensureDataFile();
  await fs.writeFile(dataFile, JSON.stringify(students, null, 2), 'utf-8');
}