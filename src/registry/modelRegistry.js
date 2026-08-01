export const modelRegistry = {
  // ==========================================
  // MATHEMATICS - GRADE 6
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
  "math-6-3": {
    geometryType: "cylinder",
    primaryColor: 0x0284c7,
    secondaryColor: 0x38bdf8,
    wireframeColor: 0x7dd3fc,
    initialScale: 1.2,
    autoRotateSpeed: 0.4,
    title: "3D Fraction Discs Set",
    hotspots: [
      { id: "h1", label: "Half Sector (1/2 = 50%)", position: [0, 0.9, 0.5] },
      { id: "h2", label: "Quarter Sector (1/4 = 25%)", position: [0.5, 0.9, 0] },
    ],
  },
  "math-6-4": {
    geometryType: "box",
    primaryColor: 0x0d9488,
    secondaryColor: 0x2dd4bf,
    wireframeColor: 0x5eead4,
    initialScale: 1.2,
    autoRotateSpeed: 0.3,
    title: "3D Integer Number Slider",
    hotspots: [
      { id: "h1", label: "Positive Direction (+X)", position: [1.2, 0, 0] },
      { id: "h2", label: "Negative Direction (-X)", position: [-1.2, 0, 0] },
    ],
  },

  // ==========================================
  // MATHEMATICS - GRADE 7
  // ==========================================
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
  "math-7-2": {
    geometryType: "box",
    primaryColor: 0x9333ea,
    secondaryColor: 0xc084fc,
    wireframeColor: 0xe9d5ff,
    initialScale: 1.2,
    autoRotateSpeed: 0.4,
    title: "3D Algebra Tiles Expansion",
    hotspots: [
      { id: "h1", label: "Square Tile (x²)", position: [0, 0, 0.85] },
      { id: "h2", label: "Unit Tile (1)", position: [0.85, 0.85, 0.85] },
    ],
  },
  "math-7-3": {
    geometryType: "octahedron",
    primaryColor: 0x6366f1,
    secondaryColor: 0x818cf8,
    wireframeColor: 0xc7d2fe,
    initialScale: 1.2,
    autoRotateSpeed: 0.5,
    title: "Triangle Angle Sum 180° Proof",
    hotspots: [
      { id: "h1", label: "Vertex Angle A", position: [0, 1.2, 0] },
      { id: "h2", label: "Base Angle B + C", position: [1.2, -0.6, 0] },
    ],
  },
  "math-7-4": {
    geometryType: "box",
    primaryColor: 0x4f46e5,
    secondaryColor: 0xa5b4fc,
    wireframeColor: 0xc7d2fe,
    initialScale: 1.1,
    autoRotateSpeed: 0.4,
    title: "3D Congruent Triangles Overlay",
    hotspots: [
      { id: "h1", label: "Hypotenuse Side (c)", position: [0.85, 0.85, 0] },
      { id: "h2", label: "Congruent Base (b)", position: [0, -0.85, 0] },
    ],
  },

  // ==========================================
  // MATHEMATICS - GRADE 8
  // ==========================================
  "math-8-1": {
    geometryType: "box",
    primaryColor: 0x2563eb,
    secondaryColor: 0x60a5fa,
    wireframeColor: 0x93c5fd,
    initialScale: 1.2,
    autoRotateSpeed: 0.5,
    title: "3D Pythagorean Theorem Proof",
    hotspots: [
      { id: "h1", label: "Hypotenuse Square (c²)", position: [0.85, 0.85, 0.85] },
      { id: "h2", label: "Base Square (a²)", position: [-0.85, -0.85, 0] },
    ],
  },
  "math-8-2": {
    geometryType: "cylinder",
    primaryColor: 0x1d4ed8,
    secondaryColor: 0x3b82f6,
    wireframeColor: 0x93c5fd,
    initialScale: 1.1,
    autoRotateSpeed: 0.4,
    title: "Volume of Cylinder vs Cone",
    hotspots: [
      { id: "h1", label: "Cylinder Volume (V = πr²h)", position: [0, 0, 0.85] },
      { id: "h2", label: "Cone Volume (V = 1/3πr²h)", position: [0, 1.1, 0] },
    ],
  },
  "math-8-3": {
    geometryType: "octahedron",
    primaryColor: 0x4338ca,
    secondaryColor: 0x6366f1,
    wireframeColor: 0xa5b4fc,
    initialScale: 1.3,
    autoRotateSpeed: 0.5,
    title: "Euler's Polyhedra Relation (V - E + F = 2)",
    hotspots: [
      { id: "h1", label: "6 Vertices (V)", position: [0, 1.3, 0] },
      { id: "h2", label: "12 Edges (E)", position: [0.8, 0.8, 0] },
      { id: "h3", label: "8 Faces (F)", position: [0.4, 0.4, 0.4] },
    ],
  },
  "math-8-4": {
    geometryType: "box",
    primaryColor: 0x3730a3,
    secondaryColor: 0x818cf8,
    wireframeColor: 0xc7d2fe,
    initialScale: 1.1,
    autoRotateSpeed: 0.3,
    title: "3D Algebraic Pan Balance Scale",
    hotspots: [
      { id: "h1", label: "Left Pan (x + 3)", position: [-1.1, 0, 0] },
      { id: "h2", label: "Right Pan (7 Units)", position: [1.1, 0, 0] },
    ],
  },

  // ==========================================
  // MATHEMATICS - GRADE 9 & 10
  // ==========================================
  "math-9-1": {
    geometryType: "octahedron",
    primaryColor: 0x0284c7,
    secondaryColor: 0x38bdf8,
    wireframeColor: 0x7dd3fc,
    initialScale: 1.2,
    autoRotateSpeed: 0.5,
    title: "3D Trigonometric Right Triangle",
    hotspots: [
      { id: "h1", label: "Sin θ = Opposite / Hypotenuse", position: [0, 1.2, 0] },
      { id: "h2", label: "Cos θ = Adjacent / Hypotenuse", position: [1.2, 0, 0] },
    ],
  },
  "math-10-1": {
    geometryType: "cylinder",
    primaryColor: 0x0369a1,
    secondaryColor: 0x0284c7,
    wireframeColor: 0x38bdf8,
    initialScale: 1.2,
    autoRotateSpeed: 0.5,
    title: "3D Conic Section Cutting Plane",
    hotspots: [
      { id: "h1", label: "Circular Cut (Horizontal)", position: [0, 0.8, 0] },
      { id: "h2", label: "Elliptic / Parabolic Cut", position: [0.8, 0.2, 0] },
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
    geometryType: "box",
    primaryColor: 0x15803d,
    secondaryColor: 0x4ade80,
    wireframeColor: 0x86efac,
    initialScale: 1.2,
    autoRotateSpeed: 0.4,
    title: "3D Plant Cell Structure",
    hotspots: [
      { id: "h1", label: "Rigid Cell Wall", position: [0, 0, 0.85] },
      { id: "h2", label: "Green Chloroplasts", position: [0.6, 0.6, 0] },
      { id: "h3", label: "Central Vacuole", position: [0, 0, 0] },
    ],
  },
  "sci-7-1": {
    geometryType: "icosahedron",
    primaryColor: 0xd97706,
    secondaryColor: 0xf59e0b,
    wireframeColor: 0xfde047,
    initialScale: 1.2,
    autoRotateSpeed: 0.5,
    title: "3D Human Heart Circulation",
    hotspots: [
      { id: "h1", label: "Left Atrium & Ventricle", position: [0.6, 0.6, 0] },
      { id: "h2", label: "Aorta Oxygenated Flow", position: [0, 1.2, 0] },
    ],
  },
  "sci-8-1": {
    geometryType: "atomic",
    primaryColor: 0x059669,
    secondaryColor: 0x34d399,
    wireframeColor: 0xa7f3d0,
    initialScale: 1.1,
    autoRotateSpeed: 0.9,
    title: "3D Covalent Chemical Bond (CH₄)",
    hotspots: [
      { id: "h1", label: "Central Carbon Atom (C)", position: [0, 0, 0] },
      { id: "h2", label: "Hydrogen Sub-Shell (H)", position: [1.6, 0, 0] },
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
    geometryType: "octahedron",
    primaryColor: 0x0d9488,
    secondaryColor: 0x2dd4bf,
    wireframeColor: 0x99f6e4,
    initialScale: 1.3,
    autoRotateSpeed: 0.5,
    title: "3D Optical Prism Refraction",
    hotspots: [
      { id: "h1", label: "Incident White Light Ray", position: [-1.3, 0, 0] },
      { id: "h2", label: "Dispersed Rainbow Spectrum", position: [1.3, 0, 0] },
    ],
  },
  "sci-10-3": {
    geometryType: "cylinder",
    primaryColor: 0x7c3aed,
    secondaryColor: 0xa855f7,
    wireframeColor: 0xe9d5ff,
    initialScale: 1.2,
    autoRotateSpeed: 0.5,
    title: "3D Solenoid Magnetic Field Lines",
    hotspots: [
      { id: "h1", label: "North Magnetic Pole (N)", position: [0, 1.2, 0] },
      { id: "h2", label: "Current Copper Coil", position: [0.85, 0, 0] },
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
