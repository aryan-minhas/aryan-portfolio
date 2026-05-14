// ─── Project Types ──────────────────────────────────────────────────────────

export type ProjectCategory = 'systems' | 'ai-ml' | 'games' | 'web' | 'low-level';

export type ProjectAccent = 'cyan' | 'amber' | 'violet';

export interface ProjectSection {
  title: string;
  body: string;
}

export interface Project {
  slug:        string;
  title:       string;
  tagline:     string;
  semester:    string;
  course:      string;
  accentColor: ProjectAccent;
  category:    ProjectCategory[];
  tech:        string[];
  overview:    string;
  highlights:  string[];
  sections:    ProjectSection[];
  featured:    boolean;
}

// ─── Skills Types ────────────────────────────────────────────────────────────

export interface Language {
  name:  string;
  level: number;
  icon:  string;
}

export interface Skills {
  languages:      Language[];
  frameworks:     string[];
  infrastructure: string[];
  concepts:       string[];
}

// ─── Education Types ─────────────────────────────────────────────────────────

export type CourseCategory = 'core' | 'math';

export interface Course {
  name:     string;
  semester: number;
  category: CourseCategory;
}

export interface Education {
  institution: string;
  degree:      string;
  period:      string;
  cgpa:        string;
  currentYear: string;
  coursework:  Course[];
}

// ─── Personal Types ──────────────────────────────────────────────────────────

export interface Personal {
  name:     string;
  title:    string;
  tagline:  string;
  location: string;
  email:    string;
  phone:    string;
  github:   string;
  linkedin: string;
  bio:      string;
}

// ─── Cursor / Store Types ────────────────────────────────────────────────────

export type CursorVariant = 'default' | 'hover' | 'text' | 'drag';
