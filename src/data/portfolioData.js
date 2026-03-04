import farmlandMatchingImg from "../assets/farmland-matching.png";
import gineRoadSpeedImg from "../assets/gine-road-speed.png";
import gitEffectsGif from "../assets/git-effects.gif";
import graphMindImg from "../assets/GraphMind.png";
import trafficNoiseImg from "../assets/TrafficNoise.png";
import codeGraphImg from "../assets/CodeGraph.png";
export const navigation = [
  { name: "Home", href: "#" },
  { name: "Expertise", href: "#expertise" },
  { name: "Stack", href: "#stack" },
  { name: "Work", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const heroInfo = {
  status: "Open to Work",
  titleLines: ["Building Interactive", "Frontend Products"],
  description:
    "I build pixel-perfect UI and scalable component architectures with a focus on interaction design. Turning complex requirements into polished, product-focused implementations.",
  primaryAction: {
    text: "View Selected Work",
    href: "#projects",
    icon: "arrow_forward",
  },
  secondaryAction: {
    text: "GitHub",
    href: "https://github.com/ppsssj",
    icon: "code",
  },
};

export const coreFocus = [
  {
    backgroundIcon: "touch_app",
    icon: "gesture",
    title: "Interactive Implementation",
    description:
      "사용자 Input과 State 변화가 명확하게 느껴지는 UI를 구현합니다.",
    colorScheme: "blue",
  },
  {
    backgroundIcon: "architecture",
    icon: "dns",
    title: "Component-Driven Systems",
    description: "재사용성과 유지보수를 고려한 Component 구조를 설계합니다.",
    colorScheme: "violet",
  },
  {
    backgroundIcon: "rocket_launch",
    icon: "model_training",
    title: "Product-Focused Execution",
    description:
      "아이디어를 빠르게 MVP로 전환하고 실제 사용 흐름 중심으로 다듬습니다.",
    colorScheme: "pink",
  },
];

export const techStack = [
  {
    category: "Core Stack",
    items: [
      { name: "React", icon: "code_blocks", highlight: true },
      { name: "TypeScript", icon: "data_object", highlight: true },
      { name: "Next.js", icon: "rocket", highlight: false },
      { name: "Tailwind CSS", icon: "brush", highlight: true },
    ],
  },
  {
    category: "Visual & Motion",
    items: [
      { name: "Three.js", icon: "view_in_ar", highlight: true },
      { name: "Framer Motion", icon: "animation", highlight: true },
      { name: "D3.js", icon: "bar_chart", highlight: false },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Figma", icon: "design_services", highlight: false },
      { name: "Git / GitHub", icon: "webhook", highlight: false },
      { name: "Vercel", icon: "terminal", highlight: false },
    ],
  },
];

export const projects = [
  {
    badge: "VS Code Extension",
    badgeColor: "blue",
    title: "Git-Effects",
    description:
      "Git 작업(Commit, Push, Pull 등) 시 Editor 내에서 시각적 Effect와 Character Animation을 Rendering하는 Interactive Extension입니다.",
    image: gitEffectsGif,
    role: "Solo Developer",
    challenge: "VS Code Webview Integration",
    outcome: "VS Code Extension MVP 배포",
    deepDive: {
      problem:
        "VS Code의 Webview와 Extension Host 간의 비동기 Message Passing 구조 설계.",
      approach:
        "Message Queue를 도입하고 Effect Rendering 성능을 위해 CSS Animation과 RequestAnimationFrame을 최적화하여 60FPS 환경 구성.",
    },
    links: { live: "#", code: "https://github.com/ppsssj/git-effects" },
    hoverColor: "primary",
  },
  {
    badge: "VS Code Extension",
    badgeColor: "blue",
    title: "CodeGraph",
    description:
      "TS/JS 코드의 함수, 클래스, 메서드, 타입 관계를 분석해 Node/Edge 그래프로 시각화하는 VS Code Extension입니다.",
    image: codeGraphImg,
    role: "Solo Developer",
    challenge: "Static Analysis + Graph Visualization",
    outcome: "코드 구조 탐색을 위한 Interactive Graph Inspector 구현",
    deepDive: {
      problem:
        "복잡한 코드베이스에서 함수 호출 흐름과 타입 관계를 빠르게 파악하기 어려웠습니다.",
      approach:
        "TypeScript AST 기반 분석으로 함수/클래스/메서드 및 type relation을 추출하고, Webview 기반 Graph UI와 Inspector 패널을 구성했습니다.",
    },
    links: { live: "#", code: "https://github.com/ppsssj/CodeGraph" },
    hoverColor: "violet-accent",
  },
  {
    badge: "Data Visualization",
    badgeColor: "violet",
    title: "GraphMind",
    description:
      "복잡한 Node 기반의 Data를 직관적으로 탐색하고 시각화할 수 있는 Mindmap/Graph Viewer Application입니다.",
    image: graphMindImg,
    role: "Solo Developer",
    challenge: "Large Scale Node Rendering",
    outcome: "WebGL 기반 Interactive Visualization 구현",
    deepDive: {
      problem:
        "수천 개의 Node를 Browser에서 Rendering할 때 발생하는 심각한 성능 저하 문제.",
      approach:
        "Three.js / WebGL Instancing 기법을 적용하여 Draw Call을 최소화하고 시야 밖 Node는 Culling 처리.",
    },
    links: { live: "#", code: "https://github.com/ppsssj/GraphMind-monorepo" },
    hoverColor: "violet-accent",
  },
  {
    badge: "Hackathon / Prototypes",
    badgeColor: "pink",
    title: "Farmland Matching",
    description:
      "신뢰 기반 농지 Matching Platform (2025 LikeLion Hackathon). Rapid Prototyping & UI/UX Iteration을 거쳐 개발되었습니다.",
    image: farmlandMatchingImg,
    role: "PM, Designer, Frontend Developer",
    challenge: "Rapid Prototyping",
    outcome: "React 기반 API Integration 및 Deploy",
    deepDive: {
      problem:
        "제한된 Hackathon 시간 내에 사용자 친화적 UI 구성 및 Data Binding Logic 구현.",
      approach:
        "Component 단위의 빠른 개발과 Tailwind CSS를 이용한 Styling으로 MVP 단축.",
    },
    links: {
      live: "#",
      code: "https://github.com/ppsssj/farmland-matching.git",
    },
    hoverColor: "pink-500",
  },
  {
    badge: "Academic / Data",
    badgeColor: "blue",
    title: "Traffic Noise Prediction System",
    description:
      "CatBoost 기반 도시 교통 소음 예측 System. Map Interface에서 위치·환경 정보를 입력하면 24시간 소음 Profile과 영향 요인을 실시간 Visualization합니다.",
    image: trafficNoiseImg,
    role: "Data Engineer / Developer",
    challenge: "Multi-source Feature Engineering",
    outcome:
      "2025 한국 데이터 사이언스 학회 최우수 논문상 / BLEP 공전 데이터 활용 경진대회 장려상",
    deepDive: {
      problem:
        "복잡한 교통량 Data와 소음의 상관관계를 Machine Learning Model을 통해 예측하고 Visualization할 필요가 있었습니다.",
      approach:
        "Python, CatBoost를 이용해 Regression Model을 구축하고 Feature Engineering 및 API 형태로 Visualization App을 구현했습니다.",
    },
    links: {
      live: "#",
      code: "https://github.com/ppsssj/Traffic-Noise-Prediction-System.git",
    },
    hoverColor: "primary",
  },
  {
    badge: "Graph Neural Network",
    badgeColor: "violet",
    title: "Traffic Flow Prediction (GINE + NSGA-II)",
    description:
      "GINE 기반 도로 Graph 학습. 시간대 속도 Regression Multi-task Pipeline과 다목적 Optimization을 통한 Traffic 예측 Model.",
    image: gineRoadSpeedImg,
    role: "AI / Data Engineer",
    challenge: "Graph Node Prediction",
    outcome: "GNN 기반 교차로/도로망 Traffic 정밀도 향상 구현",
    deepDive: {
      problem:
        "단순한 시계열을 넘어 기하학적 도로망(Graph) 특성을 반영한 Traffic Visualization 및 예측.",
      approach:
        "PyTorch Geometric과 GINE Model 구조를 활용하여 Node 간 관계를 학습하고 NSGA-II Algorithm으로 Parameter를 최적화했습니다.",
    },
    links: {
      live: "#",
      code: "https://github.com/ppsssj/gine-road-speed-quantile.git",
    },
    hoverColor: "violet-accent",
  },
];

export const careerObjective = {
  badge: "Career Objective",
  title: "Available for Frontend & Interaction Engineer roles",
  description:
    "I am ready to bring my skills in polished user-facing products, interactive web experiences, and frontend implementation with product thinking to a collaborative team.",
  primaryAction: {
    text: "Contact Me",
    icon: "mail",
    href: "mailto:ppssjj020222@gmail.com",
  },
  secondaryAction: { text: "View Resume", icon: "description", href: "#" },
};

export const footerInfo = {
  copyright: "© 2025. Designed & Built by ppsssj.",
  links: [
    { name: "GitHub", href: "https://github.com/ppsssj" },
    { name: "LinkedIn", href: "#" },
  ],
};
