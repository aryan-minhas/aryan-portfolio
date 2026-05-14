# Major Engineering Projects (The Core Portfolio)

### 1. AVAL Systems – Financial Reconciliation Engine
* **Course:** Software Design & Architecture (Semester 4)
* **Core Tech:** Java, JavaFX, PostgreSQL, pgvector, LangChain4j, Ollama, Docker
* **Project Overview:** A hybrid matching engine automating enterprise financial auditing by combining deterministic logic with semantic AI vectorization.

**Technical Implementation:**
* **Semantic AI Integration:** Embedded transaction narratives as 768-dimensional vectors via a locally-run Ollama LLM (nomic-embed-text) and matched them using Cosine Similarity search in PostgreSQL via pgvector.
* **Data Pipeline Architecture:** Architected a 12-use-case pipeline covering Excel ledger ingestion (Apache POI), PDF bank statement parsing (Apache PDFBox), schema standardization, probabilistic match hypothesis generation, and a human-in-the-loop approval workflow.
* **System Design & Deployment:** Applied GRASP and GoF design patterns (Strategy, Template Method, Repository/DAO, Adapter) across a multi-layer architecture. Containerized the full infrastructure—PostgreSQL and the Ollama inference server—using Docker Compose.

---

### 2. ChronoRift – Multi-Process OS Game Engine
* **Course:** Operating Systems (Semester 4)
* **Core Tech:** C++, POSIX, pthreads, Docker, Linux Syscalls
* **Project Overview:** A multi-process turn-based RPG engineered to demonstrate complex operating system principles, concurrency, and bare-metal resource management.

**Technical Implementation:**
* **Multi-Process IPC:** Architected the game across 3 isolated Linux processes (Game Arbiter, Human Interfacing Process, Automated Strategic Process) communicating exclusively via POSIX Shared Memory (shm_open) and unnamed semaphores (pipe-based IPC explicitly forbidden).
* **Concurrency & Scheduling:** Implemented a thread-per-NPC concurrency model utilizing a custom stamina-based temporal scheduler to enforce serial action execution across concurrently accumulating entity threads. Engineered a POSIX signal-based stun mechanic (SIGUSR1) for asynchronous thread suspension with full state recovery.
* **Resource Management:** Developed a background deadlock detector using a wait-for graph algorithm over shared artifact resources. Built a contiguous memory allocator for a 20-slot inventory system handling fragmentation and swap-in/swap-out to long-term storage.

---

### 3. CityMind – Urban AI Simulation
* **Course:** Artificial Intelligence (Semester 4)
* **Core Tech:** Python, Flask, SocketIO, scikit-learn, PixiJS
* **Project Overview:** A grid-based AI simulation solving distinct urban planning and routing challenges through advanced heuristic frameworks and machine learning algorithms.

**Technical Implementation:**
* **Advanced AI Algorithms:** Designed solutions for 5 challenges including CSP layout planning (AC-3 arc consistency, MRV/LCV heuristics), MST + Max-Flow road optimization, Parallel Tempering (Simulated Annealing) for minimax ambulance placement, D* Lite + Genetic Algorithms for dynamic routing, and K-Means clustering + Decision Trees for crime prediction.
* **Full-Stack Integration:** Manually implemented all graph algorithms and data structures without external libraries. Integrated a Flask/SocketIO backend with a real-time PixiJS frontend visualization.

---

### 4. Smart City Management System
* **Course:** Data Structures (Semester 3)
* **Core Tech:** C++, Custom Data Structures, Algorithms
* **Project Overview:** A comprehensive ecosystem simulating transport, medical, and housing infrastructure, built entirely from scratch without the C++ Standard Template Library (STL).

**Technical Implementation:**
* **Spatial & Network Mapping:** Engineered a high-performance routing network using Adjacency List Graphs and implemented Dijkstra's Algorithm to compute shortest-path transport queries.
* **Hierarchical Data Management:** Designed complex, multi-tiered architectures including N-ary Trees for administrative hierarchies (Sector-to-House) and specialized School/Family Trees to track demographic relationships.
* **High-Efficiency Memory Retrieval:** Built a robust indexing system utilizing Hashing with Separate Chaining for near O(1) retrieval of citizen records, alongside Priority and Circular Queues for dynamic task scheduling.

---

### 5. Sonic Ultimate Heroes – 2D OOP Platformer Engine
* **Course:** Object-Oriented Programming (Semester 2)
* **Core Tech:** C++, SFML Library, OOP Architecture
* **Project Overview:** A fast-paced 2D platformer showcasing a strong command of object-oriented design principles, custom physics implementation, and third-party graphics libraries.

**Technical Implementation:**
* **Advanced OOP Architecture:** Designed a highly scalable system using Inheritance and Polymorphism, branching core parent classes (Hero, Enemy) into specific implementations with unique behaviors.
* **Custom Physics Engine:** Implemented a physics system handling gravity, acceleration, and precise hitbox collision resolution for terrain and hazards.
* **Game State Management:** Coded dynamic mid-game character switching mechanics and developed a comprehensive serialization system (File I/O) to save/load complex game states and maintain a persistent Leaderboard. Created a custom Animation class to parse and render sprite sheets.

---

### 6. Buzz Bombers – 2D Arcade Survival Game
* **Course:** Programming Fundamentals (Semester 1)
* **Core Tech:** C++, Grid-Based Logic, File I/O
* **Project Overview:** A recreation of the classic 1983 arcade game demonstrating the ability to handle complex system states and dynamic entity interactions in C++.

**Technical Implementation:**
* **Advanced Entity Logic:** Engineered dynamic spawning mechanics (Infant Bee maturation system) and state transformations based on environmental constraints.
* **Core Mechanics:** Implemented grid-based movement, collision detection, and level scaling (increasing difficulty algorithms and temporary Boss Level modifiers).
* **UI & Persistence:** Built a persistent High-Score tracking system reading/writing to local files, and developed a dynamic camera viewport system rendering a grid twice the size of the visible screen.

---

### 7. Community Hub – Multi-Page Web Platform
* **Course:** Introduction to ICT (Semester 1)
* **Core Tech:** HTML5, CSS3, Vanilla UI/UX Design
* **Project Overview:** A responsive, multi-page civic platform designed without relying on templates, CMS, or external frontend frameworks.

**Technical Implementation:**
* **Strict Vanilla Architecture:** Developed 6 interconnected pages using pure HTML5 and CSS3, demonstrating a foundational mastery of web standards.
* **Advanced Theming:** Engineered a dynamic Light/Dark mode toggle relying purely on CSS variables to ensure high accessibility.
* **Responsive Component Design:** Utilized CSS Media Queries for fluid layouts, and implemented custom features like CSS-only form validation and embedded iframes. Designed the custom branding/logo using Adobe Spark.

---

### 8. Super Mario Bros Clone: x86 Assembly Engine
* **Course:** Computer Organization & Assembly Language (COAL) (Semester 3)
* **Core Tech:** x86 Assembly, Irvine32 Library, Windows Multimedia API (winmm.lib)
* **Verdict for Portfolio:** Highly Recommended. Building a real-time game in low-level Assembly is a rare and highly impressive feat for a student. It proves an intimate understanding of computer architecture, memory management, and hardware-level I/O.
* **Project Overview:** A fully playable, console-based recreation of the classic "Super Mario Bros," engineered entirely from scratch in x86 Assembly Language. The game features platforming physics, dynamic enemies, asynchronous sound, and custom power-ups.

**Technical Implementation:**
* **Low-Level Architecture & Register Management:** Programmed strictly in x86 Assembly utilizing the Irvine32 library. Manually managed CPU registers (EAX, EBX, ECX, etc.), stack pointers, and memory offsets to control the game loop, physics calculations, and state transitions (e.g., ShowGameOverScreen, BossWinSequence).
* **Direct Console Graphics & Custom Macros:** Bypassed high-level graphics engines by writing custom Assembly macros (mGotoxy, mSetColor, mWriteStr) to directly manipulate console output buffers. This allowed for real-time, flicker-free rendering of levels, UI elements, and character sprites using ASCII/ANSI text manipulation.
* **Hardware-Level Audio & I/O:** Integrated the Windows Multimedia API (winmm.lib) via external procedure calls to implement asynchronous, multi-threaded sound effects (SND_ASYNC) without halting the main execution thread. Engineered precise keyboard interrupt handling for responsive player jumping and movement.
* **Custom Game Logic (Super Power Mario):** Engineered specialized memory states to implement a custom rule set: initialized the player base state with 5 lives and coded the logic for a unique "Golden Mushroom" entity. Implemented the timing loops and point arithmetic required to grant 1000 bonus points and a precise 5-second invincibility window upon item collision.
* **Assembly File I/O:** Wrote low-level disk access subroutines (SaveDataToFile) to ensure game states, scores, and player progress persisted across sessions.