import type { Project } from '@/types';

export const projects: Project[] = [
  // ── 1. AVAL Systems ──────────────────────────────────────────────────────
  {
    slug:        'aval-systems',
    title:       'AVAL Systems',
    tagline:     'Hybrid AI financial reconciliation engine automating enterprise auditing.',
    semester:    'Semester 4',
    course:      'Software Design & Architecture',
    accentColor: 'cyan',
    category:    ['systems', 'ai-ml'],
    featured:    true,
    tech:        ['Java', 'JavaFX', 'PostgreSQL', 'pgvector', 'LangChain4j', 'Ollama', 'Docker', 'Apache POI', 'Apache PDFBox'],
    overview:
      'A hybrid matching engine automating enterprise financial auditing by combining deterministic logic with semantic AI vectorization. Bridges structured accounting rules with unstructured transaction narratives to deliver near-zero manual reconciliation overhead.',
    highlights: [
      'Embedded 768-dim transaction vectors via local Ollama LLM matched with pgvector cosine similarity',
      '12-use-case pipeline: Excel ingestion → PDF parsing → schema standardization → human-in-the-loop approval',
      'GoF patterns (Strategy, Template Method, Repository/DAO, Adapter) across fully Dockerized infrastructure',
    ],
    sections: [
      {
        title: 'Semantic AI Integration',
        body:  'Embedded transaction narratives as 768-dimensional vectors via a locally-run Ollama LLM (nomic-embed-text) and matched them using Cosine Similarity search in PostgreSQL via pgvector. This allowed semantic matching of transactions that share intent but differ in wording, a problem deterministic rule engines fundamentally cannot solve.',
      },
      {
        title: 'Data Pipeline Architecture',
        body:  'Architected a 12-use-case pipeline covering Excel ledger ingestion (Apache POI), PDF bank statement parsing (Apache PDFBox), schema standardization, probabilistic match hypothesis generation, and a human-in-the-loop approval workflow. Each stage was isolated behind interfaces to allow independent testing and substitution.',
      },
      {
        title: 'System Design & Deployment',
        body:  'Applied GRASP and GoF design patterns — Strategy, Template Method, Repository/DAO, Adapter — across a strict multi-layer architecture. Containerized the full infrastructure, including PostgreSQL and the Ollama inference server, using Docker Compose for reproducible one-command deployment.',
      },
    ],
  },

  // ── 2. ChronoRift ────────────────────────────────────────────────────────
  {
    slug:        'chronorift',
    title:       'ChronoRift',
    tagline:     'Multi-process OS game engine demonstrating bare-metal concurrency and IPC.',
    semester:    'Semester 4',
    course:      'Operating Systems',
    accentColor: 'violet',
    category:    ['systems', 'games'],
    featured:    true,
    tech:        ['C++', 'POSIX', 'pthreads', 'Docker', 'Linux Syscalls', 'SIGUSR1', 'shm_open'],
    overview:
      'A multi-process turn-based RPG engineered to demonstrate complex operating system principles, concurrency, and bare-metal resource management. Every game mechanic maps directly to an OS concept — thread scheduling, IPC, signal handling, and deadlock detection.',
    highlights: [
      '3 isolated Linux processes communicating exclusively via POSIX shared memory and unnamed semaphores',
      'Custom stamina-based temporal scheduler with SIGUSR1 signal-based stun and full state recovery',
      'Background deadlock detector using wait-for graph over shared artifact resources',
    ],
    sections: [
      {
        title: 'Multi-Process IPC Architecture',
        body:  'Architected the game across 3 isolated Linux processes: a Game Arbiter, a Human Interfacing Process, and an Automated Strategic Process. All inter-process communication was performed exclusively via POSIX Shared Memory (shm_open) and unnamed semaphores. Pipe-based IPC was explicitly forbidden in the spec, requiring a deeper system-level solution.',
      },
      {
        title: 'Concurrency & Scheduling',
        body:  'Implemented a thread-per-NPC concurrency model utilizing a custom stamina-based temporal scheduler to enforce serial action execution across concurrently accumulating entity threads. Engineered a POSIX signal-based stun mechanic (SIGUSR1) for asynchronous thread suspension with full state recovery on resume.',
      },
      {
        title: 'Resource Management',
        body:  'Developed a background deadlock detector using a wait-for graph algorithm over shared artifact resources, continuously monitoring lock acquisition order to detect circular waits. Built a contiguous memory allocator for a 20-slot inventory system handling fragmentation and swap-in/swap-out to long-term storage.',
      },
    ],
  },

  // ── 3. CityMind ──────────────────────────────────────────────────────────
  {
    slug:        'citymind',
    title:       'CityMind',
    tagline:     'Grid-based urban AI simulation solving planning and routing via ML algorithms.',
    semester:    'Semester 4',
    course:      'Artificial Intelligence',
    accentColor: 'amber',
    category:    ['ai-ml', 'systems'],
    featured:    true,
    tech:        ['Python', 'Flask', 'SocketIO', 'scikit-learn', 'PixiJS', 'AC-3', 'D* Lite', 'K-Means'],
    overview:
      'A grid-based AI simulation solving distinct urban planning and routing challenges through advanced heuristic frameworks and machine learning algorithms. Five independent AI challenge modules were integrated into a real-time full-stack visualization.',
    highlights: [
      'CSP layout planning with AC-3 arc consistency + MRV/LCV heuristics',
      'D* Lite + Genetic Algorithms for dynamic real-time routing; Parallel Tempering for ambulance placement',
      'All graph algorithms hand-implemented; Flask/SocketIO backend with PixiJS real-time visualization',
    ],
    sections: [
      {
        title: 'Advanced AI Algorithms',
        body:  'Designed solutions for 5 challenges: CSP layout planning (AC-3 arc consistency, MRV/LCV heuristics), MST + Max-Flow road optimization, Parallel Tempering (Simulated Annealing variant) for minimax ambulance placement, D* Lite + Genetic Algorithms for dynamic routing under changing constraints, and K-Means clustering + Decision Trees for crime prediction.',
      },
      {
        title: 'Full-Stack Integration',
        body:  'Manually implemented all graph algorithms and data structures from scratch without external algorithm libraries. Integrated a Flask/SocketIO backend serving real-time simulation state with a PixiJS frontend providing animated grid visualization. Each AI step was streamed as discrete events to the client.',
      },
    ],
  },

  // ── 4. Smart City Management System ─────────────────────────────────────
  {
    slug:        'smart-city',
    title:       'Smart City',
    tagline:     'No-STL C++ simulation of transport, medical, and housing infrastructure.',
    semester:    'Semester 3',
    course:      'Data Structures',
    accentColor: 'cyan',
    category:    ['systems'],
    featured:    false,
    tech:        ['C++', 'Custom DSA', 'Dijkstra', 'Hash Tables', 'N-ary Trees', 'Priority Queues'],
    overview:
      'A comprehensive ecosystem simulating transport, medical, and housing infrastructure built entirely from scratch without the C++ STL. Every data structure — graphs, trees, queues, hash maps — was designed and implemented to spec.',
    highlights: [
      'Dijkstra shortest-path routing over Adjacency List graphs for transport queries',
      'N-ary Trees for Sector→House administrative hierarchy; School/Family Trees for demographics',
      'Hashing with Separate Chaining for O(1) citizen record retrieval',
    ],
    sections: [
      {
        title: 'Spatial & Network Mapping',
        body:  'Engineered a high-performance routing network using Adjacency List Graphs and implemented Dijkstra\u2019s Algorithm to compute shortest-path transport queries across the simulated city grid. Route queries ran in O((V + E) log V) time using a custom min-heap priority queue.',
      },
      {
        title: 'Hierarchical Data Management',
        body:  'Designed complex, multi-tiered architectures including N-ary Trees for administrative hierarchies (Sector-to-House) and specialized School/Family Trees to track demographic relationships across city units.',
      },
      {
        title: 'High-Efficiency Memory Retrieval',
        body:  'Built a robust indexing system utilizing Hashing with Separate Chaining for near O(1) retrieval of citizen records, alongside Priority Queues and Circular Queues for dynamic task scheduling across medical and emergency response systems.',
      },
    ],
  },

  // ── 5. Sonic Ultimate Heroes ─────────────────────────────────────────────
  {
    slug:        'sonic-ultimate-heroes',
    title:       'Sonic Ultimate Heroes',
    tagline:     '2D OOP platformer engine with custom physics and sprite animation system.',
    semester:    'Semester 2',
    course:      'Object-Oriented Programming',
    accentColor: 'amber',
    category:    ['games'],
    featured:    false,
    tech:        ['C++', 'SFML', 'OOP', 'File I/O', 'Sprite Animation'],
    overview:
      'A fast-paced 2D platformer showcasing a strong command of object-oriented design principles, custom physics implementation, and third-party graphics integration. Built on a scalable inheritance hierarchy with runtime polymorphism throughout.',
    highlights: [
      'Scalable inheritance hierarchy branching Hero/Enemy parent classes into typed implementations',
      'Custom physics: gravity, acceleration, hitbox collision resolution for terrain and hazards',
      'Serialization system for save/load of game states + persistent leaderboard; custom sprite-sheet animation class',
    ],
    sections: [
      {
        title: 'Advanced OOP Architecture',
        body:  'Designed a highly scalable system using Inheritance and Polymorphism, branching core parent classes (Hero, Enemy) into specific implementations with unique behaviors. Runtime dispatch through virtual methods enabled adding new character types without modifying existing logic.',
      },
      {
        title: 'Custom Physics Engine',
        body:  'Implemented a physics system handling gravity, acceleration, and precise hitbox collision resolution for terrain and hazards. Collision layers distinguished between lethal and non-lethal contact, and velocities were resolved independently on X/Y axes to prevent tunneling.',
      },
      {
        title: 'Game State Management',
        body:  'Coded dynamic mid-game character switching mechanics and developed a comprehensive serialization system (File I/O) to save and load complex game states, maintaining a persistent leaderboard across sessions. Created a custom Animation class to parse and render sprite sheets with configurable frame timing.',
      },
    ],
  },

  // ── 6. Buzz Bombers ──────────────────────────────────────────────────────
  {
    slug:        'buzz-bombers',
    title:       'Buzz Bombers',
    tagline:     '1983 arcade recreation demonstrating complex entity state machines in C++.',
    semester:    'Semester 1',
    course:      'Programming Fundamentals',
    accentColor: 'violet',
    category:    ['games'],
    featured:    false,
    tech:        ['C++', 'Grid-Based Logic', 'File I/O', 'State Machines'],
    overview:
      'A recreation of the classic 1983 arcade game demonstrating the ability to handle complex system states and dynamic entity interactions in C++. Built in the first semester, this project established core skills in game loops, collision, and persistence.',
    highlights: [
      'Infant Bee maturation system with dynamic entity spawning and state transformations',
      'Grid-based collision detection, level scaling, and Boss Level difficulty modifiers',
      'Persistent high-score file I/O + camera viewport rendering grids larger than the visible screen',
    ],
    sections: [
      {
        title: 'Advanced Entity Logic',
        body:  'Engineered dynamic spawning mechanics featuring an Infant Bee maturation system where entities evolve based on environmental constraints and time thresholds. State transformations triggered cascading changes in behavior, movement patterns, and threat level.',
      },
      {
        title: 'Core Mechanics & Persistence',
        body:  'Implemented grid-based movement, collision detection, and level scaling through increasing difficulty algorithms and temporary Boss Level modifiers. Built a persistent High-Score tracking system using file I/O and developed a dynamic camera viewport system rendering a grid twice the visible screen size.',
      },
    ],
  },

  // ── 7. Community Hub ─────────────────────────────────────────────────────
  {
    slug:        'community-hub',
    title:       'Community Hub',
    tagline:     'Responsive multi-page civic platform built with pure HTML5, CSS3, and no frameworks.',
    semester:    'Semester 1',
    course:      'Introduction to ICT',
    accentColor: 'amber',
    category:    ['web'],
    featured:    false,
    tech:        ['HTML5', 'CSS3', 'CSS Variables', 'Media Queries', 'Adobe Spark'],
    overview:
      'A responsive, multi-page civic platform designed without relying on templates, CMS, or external frontend frameworks. Six interconnected pages demonstrate mastery of web standards and a disciplined approach to pure CSS architecture.',
    highlights: [
      '6 interconnected pages using pure HTML5/CSS3 — no frameworks, no templates',
      'Dynamic Light/Dark mode toggle relying purely on CSS variable reassignment',
      'CSS Media Queries for fluid layouts; custom CSS-only form validation; Adobe Spark branding',
    ],
    sections: [
      {
        title: 'Strict Vanilla Architecture',
        body:  'Developed 6 interconnected pages using pure HTML5 and CSS3, demonstrating foundational mastery of web standards. No external libraries or frameworks were used at any layer of the project — layout, styling, interaction, and state were all handled via native browser capabilities.',
      },
      {
        title: 'Advanced Theming & Responsive Design',
        body:  'Engineered a dynamic Light/Dark mode toggle relying purely on CSS variables to ensure high accessibility and smooth transitions without JavaScript. Utilized CSS Media Queries for fluid layouts and implemented custom features including CSS-only form validation and embedded iframes. Designed the custom branding and logo using Adobe Spark.',
      },
    ],
  },

  // ── 8. Super Mario Bros Clone (x86 Assembly) ─────────────────────────────
  {
    slug:        'super-mario-assembly',
    title:       'Super Mario (x86)',
    tagline:     'Fully playable Mario clone engineered entirely in x86 Assembly — register by register.',
    semester:    'Semester 3',
    course:      'Computer Organization & Assembly Language (COAL)',
    accentColor: 'cyan',
    category:    ['low-level', 'games'],
    featured:    true,
    tech:        ['x86 Assembly', 'Irvine32', 'Windows Multimedia API', 'winmm.lib', 'BIOS Interrupts'],
    overview:
      'A fully playable, console-based recreation of Super Mario Bros engineered entirely from scratch in x86 Assembly. Features platforming physics, dynamic enemies, asynchronous sound, custom power-ups, and persistent file I/O — all implemented at the register level.',
    highlights: [
      'Manual CPU register management (EAX/EBX/ECX stack) for game loop, physics, and state transitions',
      'Custom Assembly macros (mGotoxy, mSetColor, mWriteStr) for direct console buffer manipulation',
      'WinMM async sound (SND_ASYNC) without blocking the main thread; precise keyboard interrupt handling',
    ],
    sections: [
      {
        title: 'Low-Level Architecture & Register Management',
        body:  'Programmed strictly in x86 Assembly utilizing the Irvine32 library. Manually managed CPU registers (EAX, EBX, ECX, etc.), stack pointers, and memory offsets to control the game loop, physics calculations, and state transitions such as ShowGameOverScreen and BossWinSequence. Every frame update required explicit register save/restore sequences.',
      },
      {
        title: 'Direct Console Graphics & Custom Macros',
        body:  'Bypassed high-level graphics engines by writing custom Assembly macros — mGotoxy, mSetColor, mWriteStr — to directly manipulate console output buffers. This allowed real-time, flicker-free rendering of levels, UI elements, and character sprites using ASCII/ANSI text manipulation at the hardware output layer.',
      },
      {
        title: 'Hardware-Level Audio & I/O',
        body:  'Integrated the Windows Multimedia API (winmm.lib) via external procedure calls to implement asynchronous, non-blocking sound effects (SND_ASYNC). Engineered precise keyboard interrupt handling for responsive player jumping and movement. Wrote low-level disk access subroutines (SaveDataToFile) for persistent game state and score tracking.',
      },
      {
        title: 'Custom Game Logic',
        body:  'Engineered specialized memory states to implement a custom rule set: initialized the player base state with 5 lives and coded logic for a unique Golden Mushroom entity. Implemented timing loops and point arithmetic to grant 1000 bonus points and a precise 5-second invincibility window upon item collision.',
      },
    ],
  },
];
