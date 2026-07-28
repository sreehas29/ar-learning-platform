export const activitiesData = [
  // Mathematics Grade 6
  {
    id: "math-6-1",
    subject: "math",
    grade: 6,
    title: "3D Geometric Shapes & Nets",
    description: "Explore cubes, rectangular prisms, and pyramids in 3D AR space.",
    duration: "15 mins",
    difficulty: "Easy",
    topics: ["Geometry", "3D Nets", "Volume"],
    arType: "3D Model Inspection",
  },
  {
    id: "math-6-2",
    subject: "math",
    grade: 6,
    title: "Perimeter & Surface Area Visualizer",
    description: "Measure virtual 3D structures using interactive AR units.",
    duration: "20 mins",
    difficulty: "Medium",
    topics: ["Measurement", "Surface Area"],
    arType: "Interactive Measurement",
  },

  // Mathematics Grade 7 & 8
  {
    id: "math-7-1",
    subject: "math",
    grade: 7,
    title: "3D Coordinate Geometry",
    description: "Plot and manipulate points in 3-dimensional Cartesian space.",
    duration: "20 mins",
    difficulty: "Medium",
    topics: ["Algebra", "Coordinates"],
    arType: "3D Plotter",
  },
  {
    id: "math-8-1",
    subject: "math",
    grade: 8,
    title: "Pythagorean Theorem 3D Proof",
    description: "Visualize right-angled triangles and 3D square volumes in AR.",
    duration: "25 mins",
    difficulty: "Hard",
    topics: ["Pythagoras", "Geometry"],
    arType: "3D Proof Visualizer",
  },

  // Mathematics Grade 9 & 10
  {
    id: "math-9-1",
    subject: "math",
    grade: 9,
    title: "Trigonometric 3D Triangle Solver",
    description: "Manipulate angles and sides of 3D triangles in real-time AR.",
    duration: "25 mins",
    difficulty: "Medium",
    topics: ["Trigonometry", "Angles"],
    arType: "Dynamic Geometry",
  },
  {
    id: "math-10-1",
    subject: "math",
    grade: 10,
    title: "3D Conic Sections Visualizer",
    description: "Slice cones to generate circles, ellipses, parabolas, and hyperbolas.",
    duration: "30 mins",
    difficulty: "Hard",
    topics: ["Conics", "Calculus Prep"],
    arType: "Interactive Slicer",
  },

  // Science Grade 6
  {
    id: "sci-6-1",
    subject: "science",
    grade: 6,
    title: "Interactive Solar System AR",
    description: "Explore 3D planet orbits, size scales, and axial rotations in your room.",
    duration: "20 mins",
    difficulty: "Easy",
    topics: ["Astronomy", "Planets", "Orbits"],
    arType: "3D Solar System",
  },
  {
    id: "sci-6-2",
    subject: "science",
    grade: 6,
    title: "Plant Cell Structure Explorer",
    description: "Dissect a microscopic plant cell to inspect chloroplasts and cell walls.",
    duration: "15 mins",
    difficulty: "Easy",
    topics: ["Biology", "Cells"],
    arType: "3D Cell Anatomy",
  },

  // Science Grade 7 & 8
  {
    id: "sci-7-1",
    subject: "science",
    grade: 7,
    title: "Human Heart 3D Circulation",
    description: "Observe blood pumping through 3D chambers with real-time audio sync.",
    duration: "25 mins",
    difficulty: "Medium",
    topics: ["Anatomy", "Circulatory System"],
    arType: "Animated Anatomy",
  },
  {
    id: "sci-8-1",
    subject: "science",
    grade: 8,
    title: "Chemical Bonding 3D Visualizer",
    description: "Construct covalent and ionic molecular structures in AR.",
    duration: "25 mins",
    difficulty: "Hard",
    topics: ["Chemistry", "Molecules"],
    arType: "Molecular Builder",
  },

  // Science Grade 9 & 10
  {
    id: "sci-9-1",
    subject: "science",
    grade: 9,
    title: "Bohr Atomic Structure AR",
    description: "Inspect electron shells, protons, and neutrons in 3D atomic orbits.",
    duration: "25 mins",
    difficulty: "Medium",
    topics: ["Physics", "Atomic Structure"],
    arType: "3D Orbit Simulation",
  },
  {
    id: "sci-10-1",
    subject: "science",
    grade: 10,
    title: "Optics & Light Refraction Prism",
    description: "Pass light beams through 3D lenses and prisms to analyze refraction.",
    duration: "30 mins",
    difficulty: "Hard",
    topics: ["Physics", "Optics", "Refraction"],
    arType: "Light Beam Simulation",
  },
];

export function getActivitiesBySubjectAndGrade(subject, grade) {
  if (!subject) return [];
  return activitiesData.filter((item) => {
    const matchSubject = item.subject === subject;
    const matchGrade = grade ? item.grade === Number(grade) : true;
    return matchSubject && matchGrade;
  });
}
