import type { Skills, Education } from '@/types';

export const skills: Skills = {
  languages: [
    { name: 'C++',        level: 95, icon: 'cpp'    },
    { name: 'Java',       level: 90, icon: 'java'   },
    { name: 'Python',     level: 85, icon: 'python' },
    { name: 'x86 Asm',   level: 72, icon: 'asm'    },
    { name: 'HTML / CSS', level: 80, icon: 'html'   },
    { name: 'SQL',        level: 78, icon: 'sql'    },
    { name: 'JavaScript', level: 68, icon: 'js'     },
  ],
  frameworks: [
    'SFML', 'JavaFX', 'Flask', 'SocketIO', 'PixiJS',
    'LangChain4j', 'Apache POI', 'Apache PDFBox', 'scikit-learn',
  ],
  infrastructure: [
    'Docker', 'Docker Compose', 'PostgreSQL', 'pgvector',
    'Ollama', 'Linux / POSIX', 'Git', 'GitHub',
  ],
  concepts: [
    'Operating Systems', 'Concurrency & IPC', 'Design Patterns (GoF / GRASP)',
    'Data Structures & Algorithms', 'AI / ML Algorithms', 'Computer Architecture',
    'Object-Oriented Design', 'System Design', 'Game Engine Architecture',
  ],
};

export const education: Education = {
  institution: 'FAST National University of Computer & Emerging Sciences',
  degree:      'Bachelor of Science in Computer Science',
  period:      'Sep 2024 – May 2028',
  cgpa:        '3.03',
  currentYear: 'Year 2 (Semester 4)',
  coursework: [
    { name: 'Programming Fundamentals',               semester: 1, category: 'core' },
    { name: 'Introduction to ICT',                    semester: 1, category: 'core' },
    { name: 'Calculus',                               semester: 1, category: 'math' },
    { name: 'Object-Oriented Programming',            semester: 2, category: 'core' },
    { name: 'Discrete Structures',                    semester: 2, category: 'math' },
    { name: 'Linear Algebra',                         semester: 2, category: 'math' },
    { name: 'Data Structures',                        semester: 3, category: 'core' },
    { name: 'Computer Organization & Assembly',       semester: 3, category: 'core' },
    { name: 'Probability & Statistics',               semester: 3, category: 'math' },
    { name: 'Operating Systems',                      semester: 4, category: 'core' },
    { name: 'Artificial Intelligence',                semester: 4, category: 'core' },
    { name: 'Software Design & Architecture',         semester: 4, category: 'core' },
    { name: 'Design & Analysis of Algorithms',        semester: 4, category: 'core' },
    { name: 'Differential Equations',                 semester: 4, category: 'math' },
  ],
};
