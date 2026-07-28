export const modelRegistry = {
  // Math Grade 6 - 3D Geometric Shapes & Nets
  "math-6-1": {
    geometryType: "box",
    primaryColor: 0x1565c0,
    secondaryColor: 0x38bdf8,
    wireframeColor: 0x60a5fa,
    initialScale: 1.2,
    autoRotateSpeed: 0.5,
    title: "3D Rectangular Prism & Net",
    hotspots: [
      { id: "h1", label: "Face A (Front Area)", position: [0, 0, 0.85] },
      { id: "h2", label: "Vertex (Corner Node)", position: [0.85, 0.85, 0.85] },
      { id: "h3", label: "Edge (Segment Boundary)", position: [0, 0.85, 0.85] },
    ],
  },

  // Math Grade 6 - Perimeter & Surface Area
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

  // Math Grade 7 - 3D Coordinate Geometry
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

  // Science Grade 6 - Solar System AR
  "sci-6-1": {
    geometryType: "solar-system",
    primaryColor: 0x0284c7,
    secondaryColor: 0x38bdf8,
    wireframeColor: 0x7dd3fc,
    initialScale: 1.0,
    autoRotateSpeed: 0.8,
    title: "3D Planetary System & Orbit",
    hotspots: [
      { id: "h1", label: "Planetary Core (Atmosphere)", position: [0, 0, 0] },
      { id: "h2", label: "Saturn Ring System", position: [1.6, 0, 0] },
      { id: "h3", label: "Lunar Satellite Orbit", position: [2.2, 0, 0] },
    ],
  },

  // Science Grade 9 - Bohr Atomic Model
  "sci-9-1": {
    geometryType: "atomic",
    primaryColor: 0xef4444,
    secondaryColor: 0x38bdf8,
    wireframeColor: 0x4ade80,
    initialScale: 1.1,
    autoRotateSpeed: 1.2,
    title: "3D Bohr Atomic Structure",
    hotspots: [
      { id: "h1", label: "Proton & Neutron Nucleus", position: [0, 0, 0] },
      { id: "h2", label: "K-Shell Valence Electron", position: [1.6, 0, 0] },
      { id: "h3", label: "L-Shell Energy Level", position: [2.0, 0, 0] },
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
