export const modelRegistry = {
  // ==========================================
  // MATHEMATICS - GRADE 6 to 10
  // ==========================================
  "math-6-1": {
    geometryType: "box",
    primaryColor: 0x1565c0,
    secondaryColor: 0x38bdf8,
    wireframeColor: 0x60a5fa,
    initialScale: 1.2,
    autoRotateSpeed: 0.5,
    title: "3D Rectangular Prism & Unfolded Net",
    hotspots: [
      { id: "h1", label: "Face A (Front Area)", position: [0, 0, 0.85] },
      { id: "h2", label: "Vertex (Corner Node)", position: [0.85, 0.85, 0.85] },
      { id: "h3", label: "Edge (Segment Boundary)", position: [0, 0.85, 0.85] },
    ],
  },
  "math-6-2": {
    geometryType: "cylinder",
    primaryColor: 0x2563eb,
    secondaryColor: 0x93c5fd,
    wireframeColor: 0xbfdbfe,
    initialScale: 1.1,
    autoRotateSpeed: 0.4,
    title: "3D Cylinder Surface Area",
    hotspots: [
      { id: "h1", label: "Circular Base Area (πr²)", position: [0, 1.2, 0] },
      { id: "h2", label: "Curved Surface Area (2πrh)", position: [0.85, 0, 0] },
    ],
  },
  "math-7-1": {
    geometryType: "octahedron",
    primaryColor: 0x7c3aed,
    secondaryColor: 0xc4b5fd,
    wireframeColor: 0xddd6fe,
    initialScale: 1.3,
    autoRotateSpeed: 0.6,
    title: "3D Octahedron Coordinate Lattice",
    hotspots: [
      { id: "h1", label: "Origin (0,0,0)", position: [0, 0, 0] },
      { id: "h2", label: "Z-Axis Peak Point (0,0,1)", position: [0, 1.3, 0] },
    ],
  },
  "math-8-1": {
    geometryType: "pythagoras",
    primaryColor: 0x2563eb,
    secondaryColor: 0xf59e0b,
    wireframeColor: 0x10b981,
    initialScale: 1.1,
    autoRotateSpeed: 0.4,
    title: "3D Pythagorean Theorem Volume Proof",
    hotspots: [
      { id: "h1", label: "Hypotenuse Volume Block (c²)", position: [0, 1.1, 0] },
      { id: "h2", label: "Base Leg Block (a²)", position: [-1.2, -0.6, 0] },
      { id: "h3", label: "Vertical Leg Block (b²)", position: [1.2, -0.6, 0] },
    ],
  },
  "math-8-4": {
    geometryType: "balance-scale",
    primaryColor: 0x3730a3,
    secondaryColor: 0xf59e0b,
    wireframeColor: 0x818cf8,
    initialScale: 1.1,
    autoRotateSpeed: 0.3,
    title: "3D Equal-Arm Algebraic Pan Balance",
    hotspots: [
      { id: "h1", label: "Fulcrum Pivot Stand", position: [0, -0.8, 0] },
      { id: "h2", label: "Left Pan (Variable x + 3)", position: [-1.4, -0.4, 0] },
      { id: "h3", label: "Right Pan (7 Unit Weights)", position: [1.4, -0.4, 0] },
    ],
  },
  "math-10-1": {
    geometryType: "conic-sections",
    primaryColor: 0x0369a1,
    secondaryColor: 0xf59e0b,
    wireframeColor: 0x38bdf8,
    initialScale: 1.1,
    autoRotateSpeed: 0.4,
    title: "3D Conic Section Slicing Plane",
    hotspots: [
      { id: "h1", label: "Upper Cone Nappe", position: [0, 0.9, 0] },
      { id: "h2", label: "Translucent Cutting Plane", position: [0, 0, 0] },
      { id: "h3", label: "Conic Curve Cross-Section", position: [0.6, 0.3, 0] },
    ],
  },

  // ==========================================
  // SCIENCE - GRADE 6 to 10
  // ==========================================
  "sci-6-1": {
    geometryType: "solar-system",
    primaryColor: 0x0284c7,
    secondaryColor: 0x38bdf8,
    wireframeColor: 0x7dd3fc,
    initialScale: 1.0,
    autoRotateSpeed: 0.8,
    title: "3D Solar System & Orbits",
    hotspots: [
      { id: "h1", label: "Sun Core (Solar Light)", position: [0, 0, 0] },
      { id: "h2", label: "Saturn Planetary Ring", position: [1.6, 0, 0] },
      { id: "h3", label: "Lunar Satellite Orbit", position: [2.2, 0, 0] },
    ],
  },
  "sci-6-2": {
    geometryType: "plant-cell",
    primaryColor: 0x15803d,
    secondaryColor: 0x4ade80,
    wireframeColor: 0x86efac,
    initialScale: 1.1,
    autoRotateSpeed: 0.4,
    title: "3D Plant Cell Organelles",
    hotspots: [
      { id: "h1", label: "Hexagonal Cell Wall", position: [0, 0, 0.9] },
      { id: "h2", label: "Nucleus (DNA Core)", position: [0, 0, 0] },
      { id: "h3", label: "Green Chloroplast Discs", position: [0.7, 0.5, 0] },
    ],
  },
  "sci-7-1": {
    geometryType: "heart-circulation",
    primaryColor: 0xd97706,
    secondaryColor: 0xef4444,
    wireframeColor: 0x38bdf8,
    initialScale: 1.1,
    autoRotateSpeed: 0.3,
    title: "3D Pulsating Human Heart",
    hotspots: [
      { id: "h1", label: "Pulsating Ventricle Chamber", position: [0, 0, 0] },
      { id: "h2", label: "Aorta Oxygenated Vessel", position: [0, 1.2, 0] },
      { id: "h3", label: "Vena Cava Blood Flow", position: [-0.6, -0.6, 0] },
    ],
  },
  "sci-8-1": {
    geometryType: "hydrocarbon",
    primaryColor: 0x059669,
    secondaryColor: 0x34d399,
    wireframeColor: 0xa7f3d0,
    initialScale: 1.1,
    autoRotateSpeed: 0.6,
    title: "3D Tetrahedral Covalent Bond (CH₄)",
    hotspots: [
      { id: "h1", label: "Central Carbon Atom (sp³)", position: [0, 0, 0] },
      { id: "h2", label: "Tetrahedral Hydrogen Atom", position: [1.2, 1.2, 1.2] },
      { id: "h3", label: "Covalent Shared Pair Bond", position: [0.6, 0.6, 0.6] },
    ],
  },
  "sci-9-1": {
    geometryType: "atomic",
    primaryColor: 0xef4444,
    secondaryColor: 0x38bdf8,
    wireframeColor: 0x4ade80,
    initialScale: 1.1,
    autoRotateSpeed: 1.2,
    title: "3D Bohr Atomic Orbits",
    hotspots: [
      { id: "h1", label: "Proton & Neutron Nucleus", position: [0, 0, 0] },
      { id: "h2", label: "K-Shell Valence Electron", position: [1.6, 0, 0] },
      { id: "h3", label: "L-Shell Energy Level", position: [2.0, 0, 0] },
    ],
  },
  "sci-10-1": {
    geometryType: "prism-refraction",
    primaryColor: 0x0d9488,
    secondaryColor: 0x38bdf8,
    wireframeColor: 0xf59e0b,
    initialScale: 1.2,
    autoRotateSpeed: 0.4,
    title: "3D Glass Prism Light Refraction",
    hotspots: [
      { id: "h1", label: "Triangular Glass Prism", position: [0, 0, 0] },
      { id: "h2", label: "Incident White Light Laser", position: [-1.6, 0, 0] },
      { id: "h3", label: "Dispersed Rainbow Spectrum", position: [1.6, 0, 0] },
    ],
  },
  "sci-10-3": {
    geometryType: "solenoid-magnetic",
    primaryColor: 0x7c3aed,
    secondaryColor: 0xa855f7,
    wireframeColor: 0x38bdf8,
    initialScale: 1.1,
    autoRotateSpeed: 0.5,
    title: "3D Solenoid Copper Coil & Magnetic Field",
    hotspots: [
      { id: "h1", label: "Helical Copper Solenoid Coil", position: [0, 0, 0] },
      { id: "h2", label: "North Magnetic Pole (N)", position: [0, 1.3, 0] },
      { id: "h3", label: "3D Magnetic Flux Loop Lines", position: [1.2, 0, 0] },
    ],
  },

  // Fallback Preset
  default: {
    geometryType: "icosahedron",
    primaryColor: 0x10b981,
    secondaryColor: 0x34d399,
    wireframeColor: 0xa7f3d0,
    initialScale: 1.2,
    autoRotateSpeed: 0.5,
    title: "3D Interactive WebGL Mesh",
    hotspots: [
      { id: "h1", label: "Primary Node (Hotspot A)", position: [0, 1.2, 0] },
      { id: "h2", label: "Secondary Boundary (Node B)", position: [1.2, 0, 0] },
    ],
  },
};

export function getModelConfigForActivity(activityId) {
  if (!activityId) return modelRegistry.default;
  return modelRegistry[activityId] || modelRegistry.default;
}
