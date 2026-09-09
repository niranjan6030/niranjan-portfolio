export const profile = {
  name: "Niranjan S",
  role: "Data Analyst",
  location: "Bengaluru, Karnataka",
  email: "niranjan6030@gmail.com",
  phone: "+91 8050730642",
  linkedin: "https://linkedin.com/in/niranjan-s-8b9283306",
  github: "https://github.com/niranjan6030",
  resume: "/Niranjan_S_Resume.pdf",
  lede:
    "I work in SQL and Python on operational data — demand forecasts, wait-time models, an auditable stock ledger, and a causal study of state EV subsidies. Five projects, all shipped.",
};

export const stats = [
  { k: "Works in", v: "SQL · Python · Power BI" },
  { k: "Shipped", v: "5 projects" },
  { k: "Model", v: "EWMA, walk-forward validated" },
  { k: "Available", v: "Internships & graduate roles" },
];

export const projects = [
  {
    id: "ev-policy-impact",
    name: "EV Policy Impact",
    tagline: "Causal study of India's state EV subsidies",
    period: "Sep 2026 — Present",
    role: "Solo build",
    stack: ["Python", "pandas", "NumPy", "Causal inference"],
    repo: "https://github.com/niranjan6030/ev-policy-impact",
    accent: "indigo",
    problem:
      "Every Indian state rolled out its own EV policy at a different time, which makes a natural experiment. The registrations are public — but behind a dashboard with no API, and the answer turns entirely on getting the treatment dates right.",
    points: [
      {
        h: "Extraction with a guardrail",
        d: "Vahan is a JSF application, not an API: a rotating ViewState token, cascading filters and a paginated grid. Sending the fuel filter to the wrong button returns unfiltered totals that look plausible and are thirteen times too large, so the extractor refuses to run unless filtering demonstrably changes the numbers.",
      },
      {
        h: "Staggered difference-in-differences",
        d: "Callaway–Sant'Anna across 19 states and 15 treatment cohorts on a 2015–2025 monthly panel, using not-yet-treated controls and a bootstrap that resamples whole states. Two-way fixed effects is avoided deliberately: under staggered adoption it uses already-treated units as controls.",
      },
      {
        h: "Treatment dates verified against gazettes",
        d: "The policy dates drive the entire estimate, so each was checked against its notification rather than a secondary summary. OCR of two scanned gazettes corrected dates that every secondary source had wrong — by five months and by seven.",
      },
      {
        h: "One estimate defended, two rejected",
        d: "Cars: +0.19pp on a 0.07% baseline at 24 months, flat pre-trend, most of it surviving a pre-trend adjustment. Two-wheelers: swamped by a national subsidy that moved the share 2.5x in a single month. Three-wheelers: the naive estimate is significant and backwards, because they electrified before the policies existed.",
      },
    ],
  },
  {
    id: "smart-cafeteria",
    name: "Smart Cafeteria",
    tagline: "Campus ordering platform with kitchen analytics",
    period: "Feb 2026 — Aug 2026",
    role: "Data & analytics owner, three-person final-year team",
    stack: ["SQL", "JavaScript", "React", "Firebase Firestore"],
    repo: "https://github.com/niranjan6030/smart-cafeteria",
    accent: "teal",
    problem:
      "A canteen in its first months has sparse, noisy order data. The kitchen needed to know what to prep and students needed an honest wait time — from data too thin for an off-the-shelf model.",
    points: [
      {
        h: "Demand forecasting",
        d: "Orders bucketed by weekday/weekend and hour of day, smoothed with EWMA at α = 0.35, then adjusted by a 14-day linear trend clamped between 0.5x and 2x so one abnormal week could not run away with the forecast.",
      },
      {
        h: "Walk-forward validation",
        d: "Two predictors compete for every bucket on strictly time-ordered data — no shuffling, no future leakage. MAE accumulates at each step, and if smoothing does not beat the plain baseline, the baseline is what ships.",
      },
      {
        h: "Wait times from queueing theory",
        d: "Arrival rate from order timestamps, service rate from real prep durations. Little's Law drives the student-facing estimate; Erlang-C utilisation goes to the staff dashboard, because they answer different questions.",
      },
      {
        h: "Honest cold starts",
        d: "Under three days of history, forecasts are suppressed entirely and the panel says so, rather than showing a confident-looking number built on nothing.",
      },
    ],
  },
  {
    id: "grezzo",
    name: "Grezzo",
    tagline: "Inventory ledger and sales reporting dashboard",
    period: "Aug 2026 — Present",
    role: "Solo build",
    stack: ["SQL", "PostgreSQL", "Python", "Next.js"],
    repo: "https://github.com/niranjan6030/grezzo",
    accent: "amber",
    problem:
      "Stock kept as a single running total is a number you have to trust. When it drifts, there is nothing to audit — you cannot ask why it is wrong, only accept that it is.",
    points: [
      {
        h: "Append-only movement ledger",
        d: "Stock tracked per product, colour, size and warehouse as immutable movements rather than a mutable count. Every balance is derivable by replaying its own transaction history, so reconciliation is a query, not an argument.",
      },
      {
        h: "Sales reporting in SQL",
        d: "Revenue by day, average order value, abandoned checkout rate, best sellers and low-stock alerts — all read directly off the order and movement tables.",
      },
      {
        h: "Reservations over decrements",
        d: "Checkout takes a 15-minute reservation instead of decrementing immediately, so an abandoned payment never costs a sale. Commit and release are idempotent, because webhooks retry.",
      },
      {
        h: "Sequence-model recommendations",
        d: "An LSTM over browsing sequences, with a statistical hybrid as the fallback — and the storefront reports which engine actually answered.",
      },
    ],
  },
  {
    id: "macro",
    name: "Macro",
    tagline: "Nutrition data pipeline and reporting app",
    period: "Aug 2026 — Present",
    role: "Solo build · web, iOS and Android",
    stack: ["SQL", "PostgreSQL", "Python", "Next.js"],
    repo: "https://github.com/niranjan6030/macro",
    accent: "violet",
    problem:
      "Ask a vision model how many calories are on a plate and it answers fluently and wrongly. The fix is not a better prompt — it is refusing to let the model near the measurement at all.",
    points: [
      {
        h: "Identification separated from measurement",
        d: "The model only names the food and estimates the portion. Open Food Facts, USDA or a built-in Indian composition table supply every nutrition figure, so no number is ever recalled from training data.",
      },
      {
        h: "Three sources, one schema",
        d: "Extracted, normalised and reconciled three external nutrition databases into a single model, with search results ranked by how reliable each source is.",
      },
      {
        h: "Provenance on every record",
        d: "Each entry is tagged lab measured, from the packet, or estimate. Nothing is reported without a source you can trace.",
      },
    ],
  },
  {
    id: "gods-view",
    name: "God's View",
    tagline: "Data verification and UI for a WebXR education platform",
    period: "Jan 2026 — Aug 2026",
    role: "Four-person team project at CHRIST",
    stack: ["JavaScript", "Three.js", "Supabase"],
    repo: "https://github.com/niranjan6030/gods-view",
    accent: "slate",
    problem:
      "An app that teaches astronomy to students is only as good as the figures it presents. Approximately-right numbers, taught confidently, are worse than none.",
    points: [
      {
        h: "Source verification",
        d: "Validated the scientific dataset the application presents, checking every figure against a primary source so the published content holds up to scrutiny.",
      },
      {
        h: "Data presentation",
        d: "Refined how the desktop data panels read — layout, spacing and information hierarchy — and produced the project's promotional film.",
      },
    ],
  },
];

export const skills = [
  {
    group: "SQL & Databases",
    items: [
      "SQL", "PL/SQL", "PostgreSQL", "Supabase", "Firebase Firestore",
      "Window functions", "CTEs", "Subqueries", "Aggregation", "Stored procedures",
      "Data modelling", "ER diagrams", "Normalisation", "Query optimisation",
    ],
  },
  {
    group: "Analytics & BI",
    items: [
      "Power BI", "Tableau", "Microsoft Excel", "KPI dashboards", "Data visualization",
      "Business intelligence reporting", "Data cleaning", "Data validation",
      "Exploratory data analysis", "Descriptive statistics",
    ],
  },
  {
    group: "Forecasting & Modelling",
    items: [
      "Time-series forecasting", "Exponential smoothing (EWMA)", "Trend analysis",
      "Walk-forward validation", "Error benchmarking (MAE)", "Distribution analysis",
      "Queueing theory (M/M/c)", "Demand analysis", "Recommender systems",
      "Causal inference", "Difference-in-differences", "Synthetic control",
      "Event study design", "Panel data", "Bootstrap inference", "Parallel-trends diagnostics",
    ],
  },
  {
    group: "Programming & Tools",
    items: ["Python", "pandas", "NumPy", "PyTorch", "JavaScript", "Java", "C++",
      "ETL pipelines", "Web scraping", "OCR", "Git", "GitHub", "Vercel"],
  },
];

export const timeline = [
  {
    kind: "Education",
    org: "CHRIST (Deemed to be University)",
    title: "Bachelor of Computer Applications (BCA), Computer Science",
    period: "2024 — 2027",
    place: "Bengaluru, Karnataka",
    detail:
      "Coursework in Database Management Systems, Data Structures and Algorithms, Statistics, Operating Systems, Computer Networks and the Software Development Life Cycle.",
  },
  {
    kind: "Experience",
    org: "Interactive Avenues",
    title: "Visual Artist, Internship",
    period: "Apr 2025 — May 2025",
    place: "Bengaluru, Karnataka",
    detail:
      "Produced visual and video assets for client marketing campaigns, turning written briefs into finished deliverables on fixed deadlines, and reorganised the project file and naming structure to improve asset reuse.",
  },
  {
    kind: "Leadership",
    org: "SDG Cell, CHRIST (Deemed to be University)",
    title: "Department Head of Media",
    period: "2025 — Present",
    place: "Bengaluru, Karnataka",
    detail:
      "Lead media coverage, branding and asset delivery for four to five department events a year, coordinating a team of student volunteers. Also serve as Choir Media Member with the Student Welfare Office.",
  },
];

export const certifications = [
  { name: "PL/SQL 101", issuer: "Infosys Springboard" },
  { name: "Artificial Intelligence Ethics", issuer: "Udemy", year: "2026" },
  { name: "AI Fundamentals", issuer: "Udemy", year: "2026" },
  { name: "Data Structures in C++", issuer: "Scaler Topics" },
];

export const languages = ["English", "Tamil", "Kannada", "Hindi"];
