import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Radin",
  lastName: "Moayyedian",
  name: "Radin Moayyedian",
  role: "Digital Media Developer",
  avatar: "/images/avatar.jpg",
  email: "radinmoayyedian@gmail.com",
  location: "America/Toronto",
  displayLocation: "Toronto, Canada",
  languages: ["English", "Farsi"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
  description: <>Updates on projects, design, and development.</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Radinmn",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/radin-mydn/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.png",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing the work of ${person.name}, a ${person.role}.`,
  headline: <>Building immersive digital experiences</>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured Projects</strong>
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Selected work
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      <strong>Radin Moayyedian</strong> — Digital Media Developer based in Toronto, creating
      interactive work across web, games, and emerging media.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, a ${person.role} based in Toronto.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Radin Moayyedian is a Digital Media Developer focused on building interactive applications,
        immersive media, and user-focused digital experiences. His work spans web development,
        Unity, XR, and creative technology, with an emphasis on usability, performance, and strong
        visual presentation. He enjoys combining design, code, and interactivity to create digital
        products that feel engaging, polished, and memorable.
      </>
    ),
  },
  work: {
    display: true,
    title: "Experience",
    experiences: [
      {
        company: "Personal Project",
        timeframe: "Mar 2025 – Present",
        role: "Unity Developer — Duck Hunt VR",
        link: "",
        achievements: [
          "Developed a VR game in Unity and C#, implementing physics-based shooting mechanics and real-time interactions for immersive gameplay.",
          "Integrated motion controller input and spatial audio to create responsive and engaging player feedback.",
          "Designed dynamic environments with animation and particle effects while optimizing scene transitions and overall performance.",
        ],
        images: [
          {
            src: "/images/projects/dh1.png",
            alt: "Duck Hunt VR screenshot",
            width: 320,
            height: 180,
          },
        ],
      },

      {
        company: "Tweed & Bottlecap Media",
        timeframe: "Oct 2022 – Feb 2023",
        role: "Game Developer — Tweed Grow To Win",
        link: "https://roozbehmd.github.io/Tweed2/",
        achievements: [
          "Developed a promotional web-based game in Unity and C#, building task-based gameplay, interactive environments, and player progression systems.",
          "Implemented core gameplay mechanics including objectives, task flow, and score tracking to support user engagement and repeat play.",
          "Built a score tracking system using AWS to securely store user data and support weekly performance-based rewards.",
          "Collaborated with design and marketing teams to align gameplay, visuals, and reward systems with campaign goals while optimizing performance across web and mobile.",
        ],
        images: [
          {
            src: "/images/projects/tw1.png",
            alt: "Tweed Grow To Win screenshot",
            width: 320,
            height: 180,
          },
        ],
      },
      {
        company: "York University",
        timeframe: "Jan 2025 – Apr 2025",
        role: "Interactive Web Developer — HarmonicHue",
        link: "https://editor.p5js.org/Radinm/full/glotI8Lcx",
        achievements: [
          "Built an interactive web application using JavaScript, HTML, CSS, and p5.js to generate personalized music-based experiences.",
          "Designed a multi-step interface with animation, real-time feedback, and dynamic content to improve engagement and usability.",
          "Tested the experience with 50+ users and analyzed feedback in Excel to refine interaction flow and completion rates.",
        ],
        images: [
          {
            src: "/images/projects/hh1.png",
            alt: "HarmonicHue screenshot",
            width: 320,
            height: 180,
          },
        ],
      },
      {
        company: "York University",
        timeframe: "Sep 2025 – Mar 2026",
        role: "Interactive Systems Developer — Mutate",
        link: "",
        achievements: [
          "Developed a hybrid board game that combined physical gameplay with digital system responses using Arduino, sensors, and embedded components.",
          "Integrated hall-effect sensors, servo motors, and LEDs to create responsive, real-time interactions between players and the game board.",
          "Designed and modelled physical game components in Blender for 3D printing and collaborated with a multidisciplinary team to connect hardware, software, and gameplay systems.",
        ],
        images: [
          {
            src: "/images/projects/mt4.jpg",
            alt: "Mutate screenshot",
            width: 320,
            height: 180,
          },
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "York University",
        description: <>Honours B.A. in Digital Media – Development Stream.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Programming",
        description: (
          <>
            Comfortable building interactive applications and digital experiences with a strong
            foundation in object-oriented programming, scripting, and front-end logic.
          </>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "C#", icon: "csharp" },
          { name: "JavaScript", icon: "javascript" },
          { name: "TypeScript", icon: "typescript" },
          { name: "Java", icon: "java" },
          { name: "C++", icon: "cplusplus" },
          { name: "Bash", icon: "terminal" },
        ],
        images: [],
      },
      {
        title: "Game Engines & Creative Tools",
        description: (
          <>
            Experienced with building games, immersive media, and digital prototypes across 3D, XR,
            hardware, and fabrication workflows.
          </>
        ),
        tags: [
          { name: "Unity", icon: "unity" },
          { name: "Unity XR Toolkit", icon: "unity" },
          { name: "Oculus SDK", icon: "vr" },
          { name: "Arduino", icon: "cpu" },
          { name: "Blender", icon: "blender" },
          { name: "Bambu Studio", icon: "tool" },
          { name: "Excel", icon: "table" },
        ],
        images: [],
      },
      {
        title: "Web Development",
        description: (
          <>
            Builds responsive and interactive web experiences with a focus on structure, usability,
            performance, and clean visual presentation.
          </>
        ),
        tags: [
          { name: "HTML", icon: "html" },
          { name: "CSS", icon: "css" },
          { name: "React", icon: "react" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Node.js", icon: "nodejs" },
          { name: "p5.js", icon: "sparkle" },
        ],
        images: [],
      },
      {
        title: "Workflow & Collaboration",
        description: (
          <>
            Comfortable working across development and design pipelines using version control, rapid
            prototyping tools, and collaborative production workflows.
          </>
        ),
        tags: [
          { name: "Git", icon: "git" },
          { name: "GitHub", icon: "github" },
          { name: "UI/UX", icon: "sparkle" },
          { name: "Bilingual", icon: "globe" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing and reflections",
  description: `Thoughts, experiments, and updates from ${person.name}.`,
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: `Selected digital media, interactive, and development projects by ${person.name}.`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery – ${person.name}`,
  description: `A visual collection by ${person.name}.`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
