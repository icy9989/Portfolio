import { loadEnvConfig } from "@next/env";
import { ProjectCategory } from "../lib/generated/prisma/client";

loadEnvConfig(process.cwd());

const projects = [

  {
    id: "16",
  slug: "ghost-ai",
  title: "Ghost AI",

  shortDescription:
    "A collaborative AI workspace that transforms natural-language system requirements into editable architecture diagrams and technical specifications.",

  description:
    "Ghost AI is a real-time collaborative system design workspace for creating, exploring, and documenting software architectures. Users describe a system in plain language, and an AI workflow generates a structured architecture on a shared canvas using nodes and relationships. The canvas supports real-time collaboration, live cursors, presence indicators, starter architecture templates, and direct editing through React Flow. Once the design is complete, Ghost AI converts the canvas graph into a technical Markdown specification that can be reviewed and downloaded. The application combines authenticated project management, shared real-time state, durable background workflows, structured AI output, and persistent artifact storage into one end-to-end architecture design tool.",

  category: ProjectCategory.AI_ML,

  technologies: [
    "TypeScript",
    "Next.js",
    "React",
    "Clerk",
    "Liveblocks",
    "React Flow",
    "Prisma",
    "PostgreSQL",
    "Trigger.dev",
    "Vercel Blob",
    "AI",
  ],

  features: [
    "Natural-language system architecture generation",
    "Collaborative real-time architecture canvas",
    "Live cursors and collaborator presence",
    "Node and edge editing with React Flow",
    "Authenticated project creation and ownership",
    "Collaborator access by verified email address",
    "Starter system design templates",
    "Microservices, monolith, event-driven, and serverless templates",
    "Durable background AI workflows",
    "Structured AI-generated canvas nodes and relationships",
    "Markdown technical specification generation",
    "Persistent canvas snapshots stored in Vercel Blob",
    "Project metadata stored with Prisma and PostgreSQL",
    "Owner-only project rename and deletion",
    "Membership-checked editor routes",
  ],

  lessonsLearned: [
    "AI-generated architecture should be represented as validated structured data before it is written into a shared canvas.",
    "Real-time collaboration requires a clear separation between durable project metadata and ephemeral shared canvas state.",
    "Authentication and authorization must be enforced independently at the page, API, and collaboration boundaries.",
    "Durable background workflows are better suited to long-running AI generation than request handlers.",
    "Large canvas artifacts should be stored outside the relational database while keeping only stable references in Prisma.",
    "Explicit project ownership and collaborator checks prevent shared workspace features from becoming accidental access-control boundaries.",
    "Starter templates provide a predictable fallback when users need to begin with a proven architecture pattern.",
  ],

  challenge:
    "Designing a collaborative architecture workspace requires coordinating several difficult boundaries at once: authenticated project access, real-time shared state, editable graph data, AI-generated structures, durable background execution, and persistent artifacts. AI output can be incomplete or structurally invalid, while canvas data must remain consistent for every collaborator. The system also needs to distinguish project ownership, collaborator access, and private persisted data without slowing down the editing experience.",

  solution:
    "Ghost AI separates each responsibility into a dedicated layer. Clerk handles identity, Prisma and PostgreSQL store project metadata and relationships, Liveblocks manages real-time collaboration, React Flow renders the architecture graph, and Vercel Blob stores canvas snapshots and generated specifications. AI generation runs through durable Trigger.dev workflows and returns structured architecture data that can be written into the shared room. Route-level authorization, owner checks, verified-email collaboration, input validation, and explicit storage boundaries keep the workspace predictable while allowing multiple users to design together.",

  thumbnail: "/ghost-ai-preview.png",

  images: [],

  videoUrl: null,

  githubUrl: "https://github.com/icy9989/Ghost-AI.git",

  liveUrl: null,

  uptime: null,
  loadTime: null,
  performanceScore: null,
  deploymentStatus: null,

  featured: true,
  published: true,
},

  {
    id: "15",
    slug: "mini-orchestrator",
    title: "Mini Orchestrator",

    shortDescription:
      "A custom AI agent orchestration system that analyzes uploaded datasets with local language models while deterministically verifying every factual claim against computed statistics.",

    description:
      "Mini Orchestrator is a hand-built AI agent orchestration system designed to explore CSV and Excel datasets using a local, open-weight language model without relying on an agent SDK. The system coordinates specialized agents through a router-driven workflow, where an analyst computes dataset statistics, a selector identifies meaningful columns, and a narrator generates a structured report. Rather than trusting model-generated conclusions directly, every factual claim is validated against deterministic ground-truth statistics before it reaches the dashboard. The orchestration layer also enforces iteration limits, completion gates, structured data flow, and failure handling to prevent unreliable model behavior from silently producing incorrect results. The project demonstrates how deterministic software engineering can be combined with local LLMs to build more reliable, traceable, and verifiable AI systems.",

    category: ProjectCategory.AI_ML,

    technologies: [
      "Python",
      "LLM",
      "LM Studio",
      "gpt-oss-20b",
      "Data Analysis",
      "Agent Orchestration",
    ],

    features: [
      "Custom agent orchestration without an agent SDK",
      "Router-based specialist coordination",
      "CSV and Excel dataset analysis",
      "Analyst, selector, and narrator agent workflow",
      "Deterministic factual claim verification",
      "Ground-truth statistics computed outside the language model",
      "Automatic detection and flagging of invalid statistical citations",
      "Iteration limits and deterministic completion gates",
      "Structured context transfer between specialist agents",
      "Local open-weight LLM integration through LM Studio",
      "Chart generation and analytical reporting",
      "Traceable agent execution dashboard",
    ],

    lessonsLearned: [
      "LLM output should not be treated as ground truth when factual results can be verified deterministically.",
      "Agent state and specialist outputs should be passed explicitly rather than relying on the model to preserve context.",
      "Structured model output can still be malformed or subtly corrupted and requires validation.",
      "Large non-text payloads should be separated from model context to avoid unnecessary context-window usage.",
      "Deterministic stopping conditions make agent loops safer and more predictable.",
      "Smaller local models require stronger orchestration, validation, and failure-handling mechanisms.",
    ],

    challenge:
      "Small local language models can produce plausible but unreliable behavior, including malformed tool calls, corrupted structured output, invalid citation paths, lost context between specialists, and premature completion claims. Large payloads such as chart image data can also consume the model's limited context window and interfere with the orchestration process.",

    solution:
      "The system separates model reasoning from deterministic control. Ground-truth statistics come directly from computation rather than model-generated copies, specialist outputs are explicitly injected into subsequent steps, and unnecessary binary data is removed before reaching the model. A deterministic verifier resolves each reported claim against the real statistics and flags claims whose references cannot be validated. Iteration caps and completion gates independently control when the orchestration loop is allowed to finish.",

    thumbnail: "/mini-orchestrator-preview.png",

    videoUrl: "https://h8enu23e0g.ufs.sh/f/MG5w6DTX3B8a0jPOTjMHQuIcr5LwtZsfAnKbe861MFpjUT9l",

    githubUrl:
      "https://github.com/icy9989/mini-orchestrator.git",

    liveUrl: null,

    uptime: null,
    loadTime: null,
    performanceScore: null,
    deploymentStatus: null,

    featured: true,
    published: true,

  },

  

  // =========================================================
  // 10. GOODS PROFIT
  // =========================================================
  {
    id: "10",
    slug: "goods-profit",
    title: "Goods Profit",

    shortDescription:
      "A freelance inventory and profit management application designed to streamline raw material tracking, pricing, expenses, and profitability analysis.",

    description:
      "Goods Profit is a freelance full-stack application developed for Moe Wai Kyaw to simplify raw food material and business profit management. The system tracks inventory, calculates recommended selling prices, manages expenses across different categories, and provides detailed reports on best-selling items and monthly profits. By centralizing inventory, pricing, expenses, and financial insights, the application supports more efficient day-to-day operations and informed business decisions.",

    category: ProjectCategory.MOBILE,

    technologies: [
      "Flutter",
      "JavaScript",
      "Node.js",
      "Express.js",
      "SQLite",
    ],

    features: [
      "Raw material inventory management",
      "Selling price calculation",
      "Expense tracking by category",
      "Best-selling item reports",
      "Monthly profit reporting",
    ],

    lessonsLearned: [],
    challenge: null,
    solution: null,

    thumbnail: "/mwk-profit-preview.png",

    images: [
      "https://utfs.io/f/329d50f8-7224-4379-9ab0-7b205afb7c0c-hjt2ml.jpg",
            "https://utfs.io/f/629f5327-c88e-4733-91b6-d10529208d52-hjt2mk.jpg",
            "https://utfs.io/f/7380522d-7b26-4aa0-8a9c-0a1960da0bd7-hjt2mj.jpg",
            "https://utfs.io/f/8bd28f3a-3cdf-422d-8fd3-56e23eb79e5d-hjt2mi.jpg",
            "https://utfs.io/f/8db85726-8bc9-4dfb-bd72-528edf0eaa2e-hjt2mh.jpg",
            "https://utfs.io/f/4cbc3264-d2c9-4c79-93a8-b3878ce11179-hjt2mg.jpg",
            "https://utfs.io/f/807ad6af-cca6-4d1c-b76f-0123a45b35ff-hjt2mf.jpg",
            "https://utfs.io/f/20c4c89e-41d1-4165-9df9-b69e4c6d4027-hjt2me.jpg",
            "https://utfs.io/f/3e42b72f-9be3-4090-9429-9c0dbca77fdd-hjt2md.jpg",
            "https://utfs.io/f/2d851787-73df-4eed-96f1-a9b0b57f7327-o6v6e5.jpg",
            "https://utfs.io/f/0859d2ad-fafb-4b12-8446-0cac7032615a-o6v6e6.jpg"
    ],

    videoUrl: null,

    githubUrl: "https://github.com/icy9989/mwk-goods-profit.git",
    liveUrl: null,

    uptime: null,
    loadTime: null,
    performanceScore: null,
    deploymentStatus: null,

    featured: true,
    published: true,
  },

  // =========================================================
  // 9. MAY MYANMAR
  // =========================================================
  {
    id: "9",
    slug: "may-myanmar",
    title: "May Myanmar",

    shortDescription:
      "A freelance business management platform built for a local food business to manage operations and monitor financial performance.",

    description:
      "May Myanmar is a freelance full-stack business management platform developed for a local food business to centralize and simplify its daily operations. The system provides a dashboard for monitoring daily, monthly, and yearly income, expenses, and profits, along with tools for managing customers, products, and orders. By consolidating operational and financial information into one platform, the application makes it easier to monitor business performance and manage day-to-day activities.",

    category: ProjectCategory.WEB,

    technologies: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "TypeScript",
      "Next.js",
      "MongoDB",
    ],

    features: [
      "Business performance dashboard",
      "Daily, monthly, and yearly financial tracking",
      "Income and expense management",
      "Customer management",
      "Product management",
      "Order management",
      "Profit tracking",
    ],

    lessonsLearned: [],
    challenge: null,
    solution: null,

    thumbnail: "/mm-preview.png",

    images: [
      "https://utfs.io/f/63cd9feb-198f-4923-966a-80b2c4c5b929-1zvic.png",
            "https://utfs.io/f/fc13ee77-d95f-40ca-9b6a-c74e7349a9b9-1pw4ts.png",
            "https://utfs.io/f/f92c9d38-becc-4d21-ac27-ccba51a0a42f-1pw4tt.png",
            "https://utfs.io/f/9dd5528a-6e83-46df-a2ac-6b6a94b424f3-1zvie.png",
            "https://utfs.io/f/3fdd6688-a13a-4afc-a1c4-8b4cf9a2ea02-1zvif.png",
            "https://utfs.io/f/a8364c7b-ebc9-4ca2-8d31-66a7e7eb928d-1zvig.png",
            "https://utfs.io/f/f091226b-fc54-43b4-9a22-68a9542b7932-1zvih.png",
            "https://utfs.io/f/0e0be79e-6b72-4bb9-9221-0c0b3f1ee29d-1zvii.png",
            "https://utfs.io/f/90e6f367-7fac-4e12-bcbf-12225ebacf98-1zvij.png",
            "https://utfs.io/f/6e2a27d2-a431-4629-8113-5fedee4bc036-1zvik.png",
            "https://utfs.io/f/d1a0d181-0b76-4219-8f0e-41e46806858e-1pw4to.png",
            "https://utfs.io/f/69010a6c-a9ef-4a0a-8d89-0358687cc022-1pw4tu.png",
            "https://utfs.io/f/4987570d-8d2a-46ee-9d28-ab51aad7a195-1pw4tv.png",
            "https://utfs.io/f/90aa7308-8b90-4276-b98f-766e80c38437-1pw4tw.png",
            "https://utfs.io/f/b0f9395f-ee6f-4c1e-82f1-b9e792ff8957-1pw4tx.png",
            "https://utfs.io/f/7eb347c3-bd6d-4d13-8230-b34b65afe242-1pw4uj.png",
            "https://utfs.io/f/2ea748fe-cffc-4ab6-9ecd-8ecfbb79add7-1pw4uk.png",
            "https://utfs.io/f/6d3865e7-bdb6-474c-ace0-35319cbea993-1pw4tp.png",
            "https://utfs.io/f/c8bcd76c-a3b5-4520-900c-1da707a2a1fd-1pw4tq.png",
            "https://utfs.io/f/190ad36a-2ef9-4dfb-a895-d1c417bdd48a-1pw4tr.png"
    ],

    videoUrl: null,
    githubUrl: null,
    liveUrl: null,

    uptime: null,
    loadTime: null,
    performanceScore: null,
    deploymentStatus: null,

    featured: true,
    published: true,
  },

  // =========================================================
  // 8. DOVER
  // =========================================================
  {
    id: "8",
    slug: "dover-water-management",
    title: "Dover",

    shortDescription:
      "A water factory management platform for tracking sales, bottle distribution, customers, income, and operational expenses.",

    description:
      "Dover is a freelance water management system developed for a local water factory to streamline sales and distribution operations. The platform tracks daily sales across the factory and its agents, manages water bottle inventory and distribution, records income and expenses, and monitors bottles distributed to individual customers. The system centralizes key operational information to provide better visibility into daily business activities.",

    category: ProjectCategory.WEB,

    technologies: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "TypeScript",
      "Next.js",
      "MongoDB",
    ],

    features: [
      "Daily sales tracking",
      "Agent sales management",
      "Water bottle management",
      "Customer distribution tracking",
      "Income management",
      "Expense tracking",
    ],

    lessonsLearned: [],
    challenge: null,
    solution: null,

    thumbnail: "/dover-preview.png",

    images: [
      "https://utfs.io/f/b5089bb4-7216-4721-9140-d4975c912257-uj1vx8.png",
            "https://utfs.io/f/a75315cf-7672-4011-b93c-5c0bd4274edc-uj1vx9.png",
            "https://utfs.io/f/228cdfb1-7aa9-45be-9d07-94e1d23d3088-uj1vxa.png",
            "https://utfs.io/f/ad46fbe9-79b8-4c56-bd7a-7cf761bd12ac-uj1vxb.png",
            "https://utfs.io/f/10f0ea94-95ab-4f0a-8f02-4a41f0e38c2f-uj1vxc.png",
            "https://utfs.io/f/95eb4f71-4408-48fc-ba1f-988e28e50d44-uj1vxd.png",
            "https://utfs.io/f/ed2cf78e-d792-4dd5-8c46-357da0bb0b50-uj1vxe.png",
            "https://utfs.io/f/3a5efc5f-c10e-4de7-adea-b954268819f5-uj1vxf.png",
            "https://utfs.io/f/13ab2c1c-dee0-428e-bd07-f9106afc7e96-uj1vxg.png"
        
    ],

    videoUrl: null,
    githubUrl: null,
    liveUrl: "https://host-dover.web.app",

    uptime: null,
    loadTime: null,
    performanceScore: null,
    deploymentStatus: null,

    featured: true,
    published: true,
  },

  // =========================================================
  // 7. DELIVERY ADMIN PANEL
  // =========================================================
  {
    id: "7",
    slug: "delivery-admin-panel",
    title: "Delivery Admin Panel",

    shortDescription:
      "A comprehensive administration platform for managing delivery operations, orders, shipments, employees, customers, and logistics.",

    description:
      "Delivery Admin Panel is a full-stack management platform designed to support the day-to-day operations of delivery service organizations. The system provides tools for managing employees, customers, and orders, with support for both manual and scanner-based product selection. It also includes bus route and gate management, shipment tracking, customer notifications, and role-based permissions for delivery service employees.",

    category: ProjectCategory.WEB,

    technologies: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Express.js",
      "MySQL",
      "SQLite",
    ],

    features: [
      "Employee management",
      "Customer management",
      "Order management",
      "Manual and scanner-based product selection",
      "Bus route management",
      "Gate management",
      "Shipment tracking",
      "Customer notifications",
      "Role and permission management",
    ],

    lessonsLearned: [],
    challenge: null,
    solution: null,

    thumbnail: "/deli-admin-preview.png",
    images: [],
    videoUrl: null,

    githubUrl: null,
    liveUrl: null,

    uptime: null,
    loadTime: null,
    performanceScore: null,
    deploymentStatus: null,

    featured: true,
    published: true,
  },

  // =========================================================
  // 6. DELIVERY SUPERADMIN PANEL
  // =========================================================
  {
    id: "6",
    slug: "delivery-superadmin-panel",
    title: "Delivery Superadmin Panel",

    shortDescription:
      "A centralized administration platform for managing delivery organizations, administrators, roles, permissions, and operational gates.",

    description:
      "Delivery Superadmin Panel is a centralized management platform developed for Trailblazers to oversee multiple delivery service organizations. The system supports organization management, administrator account management, role and permission assignment, and gate management. It provides super administrators with a structured interface for controlling access and managing core administrative operations across delivery services.",

    category: ProjectCategory.WEB,

    technologies: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Express.js",
      "MySQL",
      "SQLite",
    ],

    features: [
      "Delivery organization management",
      "Administrator management",
      "Role management",
      "Permission management",
      "Gate management",
    ],

    lessonsLearned: [],
    challenge: null,
    solution: null,

    thumbnail: "/deli-superadmin-preview.png",
    images: [],
    videoUrl: null,

    githubUrl: null,
    liveUrl: null,

    uptime: null,
    loadTime: null,
    performanceScore: null,
    deploymentStatus: null,

    featured: false,
    published: true,
  },

  // =========================================================
  // 5. DELIVERY EMPLOYEE
  // =========================================================
  {
    id: "5",
    slug: "delivery-employee",
    title: "Delivery Employee",

    shortDescription:
      "A mobile application that helps delivery employees create orders, process shipments, track deliveries, and manage customer information.",

    description:
      "Delivery Employee is a mobile application designed to support employees throughout the delivery workflow. The application provides order and customer management, manual and scanner-based product selection, bus route management, shipment tracking, and customer notification features. It gives delivery employees a centralized mobile interface for processing orders and managing shipments throughout their lifecycle.",

    category: ProjectCategory.MOBILE,

    technologies: [
      "Flutter",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MySQL",
      "SQLite",
    ],

    features: [
      "Order management",
      "Customer management",
      "Manual product selection",
      "Scanner-based product selection",
      "Bus route management",
      "Shipment tracking",
      "Customer notifications",
    ],

    lessonsLearned: [],
    challenge: null,
    solution: null,

    thumbnail: "/deli-employee-preview.png",

    images: [
      "https://utfs.io/f/cd34cd67-1ce2-4351-85d3-59221968f661-1ku7el.png",
            "https://utfs.io/f/6e3cda2e-27f9-4729-8454-93e385464e80-1ku7em.png",
            "https://utfs.io/f/282a23a2-e878-41fb-943d-aeb487591db8-1ku7en.png",
            "https://utfs.io/f/694166d2-f5c7-4867-9dc2-a398b10a6bc1-1ku7eo.png",
            "https://utfs.io/f/43fc4403-c67b-4fce-81e9-06b18f0b01cd-1ku7ep.png",
            "https://utfs.io/f/347a57af-1318-487c-9007-9f5adcfc2bd6-1ku7eq.png",
            "https://utfs.io/f/53b90d64-1df7-4793-88ab-b9e75294fb7e-1ku7er.png",
            "https://utfs.io/f/e2b1088c-01eb-43d6-9d72-773436870ce8-1ku7es.png",
            "https://utfs.io/f/1cc859e3-963e-4813-83f2-f91b2890cd40-1ku7et.png",
            "https://utfs.io/f/6d5ea0df-8fab-4a7b-afcb-20abc65cbcad-m33odp.png",
            "https://utfs.io/f/6f6bb546-06aa-430c-a52b-e064f533a09d-m33odo.png",
            "https://utfs.io/f/b4c1481f-41b1-4d71-b30a-d4b8a8ba9a39-m33odn.png",
            "https://utfs.io/f/6e12b10e-2acb-4113-877e-f5c723e3c610-m33odm.png",
            "https://utfs.io/f/af18e518-4512-4e5f-80ef-4a9327999749-m33odl.png",
            "https://utfs.io/f/71040950-6833-45d3-8592-3b7b3fca7a02-m33odk.png",
            "https://utfs.io/f/c4a7f574-4995-48b8-98d6-81229a1dbc3b-m33odj.png",
            "https://utfs.io/f/d18cecee-733c-4cb8-8760-1b95d91b4207-m33odi.png",
            "https://utfs.io/f/3807ad19-e5fa-4163-9094-67777888928f-m33odh.png",
            "https://utfs.io/f/46dda483-564c-4323-9c5e-9ae5918bd38a-m33odg.png",
            "https://utfs.io/f/7dc7c91c-a765-4749-ae42-9d8f6bbafc3e-m33ocu.png",
            "https://utfs.io/f/fc693f89-d224-46b5-a9a2-6d30f594c5ee-m33oct.png",
            "https://utfs.io/f/f31337fb-4352-4097-b032-cac2ec37afbd-m33ocs.png",
            "https://utfs.io/f/92227f20-eb7f-4db6-b99e-d620bc9ec94e-m33ocr.png",
            "https://utfs.io/f/777197fd-1940-4850-933d-fb8d34db1258-m33ocq.png",
            "https://utfs.io/f/cb7849af-b70e-4e8f-bb5e-ac18ad545b65-m33ocp.png",
            "https://utfs.io/f/6af70798-a47e-4e54-8977-857b5144fd68-m33oco.png",
            "https://utfs.io/f/62227d7d-889d-48c4-8c7c-54c41dfdd932-m33ocn.png",
            "https://utfs.io/f/ead03584-8a2d-470a-8d10-a20f33aa3910-m33ocm.png",
            "https://utfs.io/f/c8fc5f5b-e4df-4a05-9d4c-b5febcf4cfaa-m33ocl.png"
    ],

    videoUrl: null,
    githubUrl: null,
    liveUrl: null,

    uptime: null,
    loadTime: null,
    performanceScore: null,
    deploymentStatus: null,

    featured: true,
    published: true,
  },

  // =========================================================
  // 4. DELIVERY CUSTOMER
  // =========================================================
  {
    id: "4",
    slug: "delivery-customer",
    title: "Delivery Customer",

    shortDescription:
      "A customer-facing mobile application for tracking orders, connecting with delivery services, and receiving shipment updates.",

    description:
      "Delivery Customer is a mobile application designed to give customers greater visibility into the delivery process. Users can track their orders, connect with different delivery service providers, and receive updates and notifications as shipments progress. The application provides customers with a convenient interface for staying informed throughout the delivery lifecycle.",

    category: ProjectCategory.MOBILE,

    technologies: [
      "Flutter",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MySQL",
      "SQLite",
    ],

    features: [
      "Order tracking",
      "Delivery service connections",
      "Shipment status updates",
      "Customer notifications",
    ],

    lessonsLearned: [],
    challenge: null,
    solution: null,

    thumbnail: "/deli-customer-preview.png",

    images: [
        "https://utfs.io/f/338a67b7-a100-46cf-ac41-1482626d1ddc-m33obz.png",
        "https://utfs.io/f/5f071910-2232-4918-9b94-b66fbc19dd35-m33oby.png",
        "https://utfs.io/f/75203560-5213-4a9a-ab6f-da056c3f8ebe-m33obx.png",
        "https://utfs.io/f/bf58ca66-6ed3-42ca-9344-7859d1fb93c6-m33obw.png",
        "https://utfs.io/f/c07b7cbc-efeb-43c8-bf56-02a4a5dcc322-m33obv.jpg",
        "https://utfs.io/f/1558a69b-f455-4d60-b751-3a7dd15dd15b-m33obu.jpg",
        "https://utfs.io/f/940013bf-78f7-4f6d-a91c-8767a3495597-m33obt.jpg",
        "https://utfs.io/f/2076d614-5b58-4e58-9c78-59304fc7621b-m33obs.jpg",
        "https://utfs.io/f/7bf3a7da-1e86-40d1-bb41-65a410ff1af3-m33obr.jpg",
        "https://utfs.io/f/93821f6f-5e4a-4e0d-abfb-2337309cb1bf-m33obq.jpg"
    ],

    videoUrl: null,
    githubUrl: null,
    liveUrl: null,

    uptime: null,
    loadTime: null,
    performanceScore: null,
    deploymentStatus: null,

    featured: false,
    published: true,
  },

  // =========================================================
  // 3. TRAILBLAZERS WEBSITE
  // =========================================================
  {
    id: "3",
    slug: "trailblazers-website",
    title: "Trailblazers Website",

    shortDescription:
      "A responsive corporate website developed to showcase Trailblazers' products, services, clients, and company information.",

    description:
      "Trailblazers Website is a responsive company website designed to establish a clear and professional online presence for the business. The website organizes key company information into dedicated sections for products, services, clients, and contact information, making it easy for visitors to explore the organization and its offerings.",

    category: ProjectCategory.WEB,

    technologies: [
      "HTML",
      "CSS",
      "Bootstrap",
      "JavaScript",
      "React",
      "Firebase",
    ],

    features: [
      "Responsive company website",
      "Product showcase",
      "Services presentation",
      "Client showcase",
      "Contact section",
    ],

    lessonsLearned: [],
    challenge: null,
    solution: null,

    thumbnail: "/tbz-preview.png",
    images: [],

    videoUrl:
      "https://utfs.io/f/a02065e8-34a0-45a1-910c-ba9ae1599ef7-ejt5f5.mp4",

    githubUrl: null,
    liveUrl: null,

    uptime: null,
    loadTime: null,
    performanceScore: null,
    deploymentStatus: null,

    featured: false,
    published: true,
  },

  // =========================================================
  // 2. COCO ECOMMERCE
  // =========================================================
  {
    id: "2",
    slug: "coco-ecommerce",
    title: "Coco Ecommerce",

    shortDescription:
      "A full-stack e-commerce application that enables customers to browse products, place orders, and track shipments online.",

    description:
      "Coco Ecommerce is a full-stack online shopping application designed to provide customers with a straightforward digital purchasing experience. Users can browse available products, place orders, and monitor the shipping process from the application. The project combines a responsive web interface with Django-powered application logic to support the core e-commerce workflow.",

    category: ProjectCategory.WEB,

    technologies: [
      "HTML",
      "CSS",
      "Bootstrap",
      "JavaScript",
      "jQuery",
      "Python",
      "Django",
    ],

    features: [
      "Product browsing",
      "Online ordering",
      "Order management",
      "Shipment tracking",
      "Responsive shopping interface",
    ],

    lessonsLearned: [],
    challenge: null,
    solution: null,

    thumbnail: "/coco-preview.png",

    images: [
        "https://utfs.io/f/48419625-c69b-44ad-a24f-b4b91bd6d612-mesryc.png",
        "https://utfs.io/f/7d848e6e-9744-4b5d-86a8-02469add2131-mesryb.png",
        "https://utfs.io/f/75b9293e-7fd4-4868-84e1-c49e4795c495-mesrya.png",
        "https://utfs.io/f/62a022fb-7525-48aa-ba40-9db8a0231510-mesry9.png",
        "https://utfs.io/f/5194ae0d-9a77-4f42-8f3b-130aa54f1fe0-mesry8.png",
        "https://utfs.io/f/86526ba5-0316-4743-9a47-a58f2d9442a0-mesry7.png",
        "https://utfs.io/f/481ef4ad-512b-4a9f-a4cc-35367607ca7e-mesry6.png"    
    ],

    videoUrl: null,

    githubUrl: "https://github.com/icy9989/django_e-commerce",
    liveUrl: "https://icy9989.pythonanywhere.com",

    uptime: null,
    loadTime: null,
    performanceScore: null,
    deploymentStatus: null,

    featured: false,
    published: true,
  },

  // =========================================================
  // 1. ONLINE QUIZ SYSTEM
  // =========================================================
  {
    id: "1",
    slug: "online-quiz-system",
    title: "Online Quiz System",

    shortDescription:
      "A role-based online examination platform with timed quizzes, automatic scoring, and dedicated access for administrators, teachers, and students.",

    description:
      "Online Quiz System is a web-based examination platform designed to simplify the process of conducting and managing online quizzes. The system supports administrators, teachers, and students with separate roles and permissions. Students can complete timed examinations and receive automatically generated scores, while the role-based structure provides appropriate functionality and access for each type of user.",

    category: ProjectCategory.WEB,

    technologies: [
      "HTML",
      "CSS",
      "Bootstrap",
      "JavaScript",
      "jQuery",
      "Java",
    ],

    features: [
      "Timed online examinations",
      "Automatic score generation",
      "Administrator role",
      "Teacher role",
      "Student role",
      "Role-based permissions",
    ],

    lessonsLearned: [],
    challenge: null,
    solution: null,

    thumbnail: "/oqs-preview.png",

    images: [
      "https://utfs.io/f/e7bd9d7a-94dd-4816-b201-c869f7a6056d-1r3prp.jpg",
            "https://utfs.io/f/47128152-8c55-42d1-909c-2a749416425e-1r3prq.jpg",
            "https://utfs.io/f/169cf950-7001-4cb5-9662-3fd65565df9f-1r3prr.jpg",
            "https://utfs.io/f/2f992b10-f297-4e0a-a71b-688abbf9b35c-1r3prs.jpg",
            "https://utfs.io/f/207ad2c8-f866-4ce1-8d67-43a8ce263a0f-1r3prt.jpg",
            "https://utfs.io/f/1d601a38-4fbe-4247-8256-45e2e58f2af1-1r3pru.jpg",
            "https://utfs.io/f/aa821df3-18f7-46df-9d15-b6f25ae7fedc-1r3prv.jpg",
            "https://utfs.io/f/73211722-3101-4341-8bee-75882b814f5d-1r3prw.jpg",
            "https://utfs.io/f/f6abb066-b97e-430a-b7f2-4146f8f905fb-1r3prx.jpg",
            "https://utfs.io/f/0d65eccf-4cff-4caf-8813-cc6da3b33707-gowv39.jpg",
            "https://utfs.io/f/b688b436-c64a-44f3-9f87-4204a35983d0-gowv38.jpg",
            "https://utfs.io/f/1f1d62b6-57e4-42a5-9708-206d80c59934-gowv37.jpg",
            "https://utfs.io/f/dff571df-998b-4aad-a59e-2981112a8f59-gowv36.jpg",
            "https://utfs.io/f/8fd742be-c220-40d4-9715-a8faa45f6223-gowv35.jpg",
            "https://utfs.io/f/78401245-908d-47fe-8f25-ca8333b47d32-gowv34.jpg",
            "https://utfs.io/f/c97a0a2e-8731-47e5-a03c-c4ab41b4eaa1-gowv33.jpg",
            "https://utfs.io/f/6eca91a3-2ee2-47ab-beff-75a1970eb611-gowv32.jpg",
            "https://utfs.io/f/fc28777b-6282-4d4e-b7fb-a2e97040aaf5-gowv31.jpg",
            "https://utfs.io/f/c2dfe9fd-9cac-438b-a987-eef642d3a6a0-gowv30.gif",
            "https://utfs.io/f/b5b72c5e-b4a1-43bf-a9a4-0b38d6a62f06-gowv2e.jpg",
            "https://utfs.io/f/2b287137-d717-4f20-8ae4-24ff076167e9-gowv2d.jpg",
            "https://utfs.io/f/af5b0cc5-5f9d-4255-9735-454e0231d8e4-gowv2c.jpg"
    ],

    videoUrl: null,

    githubUrl: "https://github.com/icy9989/j2ee_online-quiz",
    liveUrl: null,

    uptime: null,
    loadTime: null,
    performanceScore: null,
    deploymentStatus: null,

    featured: false,
    published: true,
  },
];

// =========================================================
// SEED
// =========================================================

async function main() {
  const { prisma } = await import("../lib/prisma");
  try {
    console.log("Starting project seed...");

    for (const project of projects) {
      await prisma.project.upsert({
        where: {
          slug: project.slug,
        },
        update: project,
        create: project,
      });

      console.log(`✓ Seeded: ${project.title}`);
    }

    console.log(`Successfully seeded ${projects.length} projects.`);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    const code = typeof error === "object" && error !== null && "code" in error ? String(error.code) : "unknown";
    console.error(`Seed failed (code: ${code}). Check database connectivity and project IDs/slugs.`);
    process.exitCode = 1;
  });
