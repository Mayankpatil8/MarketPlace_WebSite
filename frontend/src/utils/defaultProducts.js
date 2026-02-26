// src/utils/defaultProducts.js

export const defaultProducts = [
  {
  _id: "default-1",
  isDemo: true,
  name: "ABB ACS580 Industrial Motor Drive",
  price: 3000,
  unit: "unit",
  category: "motors",
  stock: 12,
  minOrderQty: 1,
  rating: 4.8,
  reviewCount: 142,
  views: 1200,
  isRestricted: false,
  supplier: { 
    name: "ABB", 
    company: "ABB (Switzerland / EU)" 
  },
  images: ["/images/motor1.jpg"],
  description: "High-performance industrial motor drive manufactured in Europe for industrial automation and heavy-duty applications.",
  specifications: {
    Power: "0.75–250 kW",
    Voltage: "380–480V",
    Control: "DTC / Scalar"
  },
  tags: ["Motor", "Drive", "Industrial", "European", "EU Certified"]
},

{
  _id: "default-2",
  name: "Solar Panel 550W Mono PERC",
  price: 2800,
  unit: "panel",
  category: "electronics",
  stock: 50,
  minOrderQty: 5,
  rating: 4.6,
  reviewCount: 98,
  views: 850,
  isRestricted: false,
  supplier: { name: "Siemens Energy", company: "Siemens Energy (Germany / EU)" },
  images: ["/images/solar1.jpg"],
  description: "High-efficiency European-manufactured mono PERC solar panel for industrial and commercial installations.",
  specifications: {
    Power: "550W",
    Type: "Mono PERC",
    Efficiency: "21.3%"
  },
  tags: ["Solar", "Energy", "Renewable", "European", "EU Certified"]
},

{
  _id: "default-3",
  name: "Bosch Rexroth Heavy Duty Industrial Fan",
  price: 9500,
  unit: "unit",
  category: "mechanical",
  stock: 30,
  minOrderQty: 2,
  rating: 4.5,
  reviewCount: 76,
  views: 620,
  isRestricted: false,
  supplier: { name: "Bosch Rexroth", company: "Bosch Rexroth (Germany / EU)" },
  images: ["/images/fan2.jpg"],
  description: "High-performance European heavy-duty industrial fan for factories and warehouses.",
  specifications: {
    Size: "24 inch",
    Speed: "1400 RPM",
    Power: "180W"
  },
  tags: ["Fan", "Cooling", "Industrial", "European", "EU Certified"]
},

{
  _id: "default-4",
  name: "Thales Defence Surveillance Camera System",
  price: 7265,
  unit: "set",
  category: "defence",
  stock: 5,
  minOrderQty: 1,
  rating: 4.7,
  reviewCount: 34,
  views: 410,
  isRestricted: true,
  supplier: { name: "Thales Group", company: "Thales (France / EU)" },
  images: ["/images/camera.jpg"],
  description: "High-security European defence-grade surveillance camera system for critical infrastructure and military use.",
  specifications: {
    Resolution: "4K",
    NightVision: "Yes",
    Range: "500m"
  },
  tags: ["Defence", "Security", "Surveillance", "European", "EU Certified"]
},

{
  _id: "default-5",
  name: "Siemens S7-1200 PLC Controller",
  price: 4622,
  unit: "unit",
  category: "electronics",
  stock: 15,
  minOrderQty: 1,
  rating: 4.9,
  reviewCount: 120,
  views: 990,
  isRestricted: false,
  supplier: { name: "Siemens", company: "Siemens (Germany / EU)" },
  images: ["/images/contoler1.jpg"],
  description: "Compact European PLC controller for industrial automation and control systems.",
  specifications: {
    CPU: "1214C",
    IO: "14 DI / 10 DO",
    Communication: "PROFINET"
  },
  tags: ["PLC", "Automation", "Control", "European", "EU Certified"]
},

{
  _id: "default-6",
  name: "Schneider Electric Industrial Power Contactor",
  price: 959,
  unit: "piece",
  category: "electronics",
  stock: 100,
  minOrderQty: 10,
  rating: 4.4,
  reviewCount: 65,
  views: 540,
  isRestricted: false,
  supplier: { name: "Schneider Electric", company: "Schneider Electric (France / EU)" },
  images: ["/images/contactor2.jpg"],
  description: "European-manufactured heavy-duty industrial power contactor for motor and power control applications.",
  specifications: {
    Current: "32A",
    CoilVoltage: "230V AC",
    Poles: "3 Pole"
  },
  tags: ["Electrical", "Contactor", "Power", "European", "EU Certified"]
}
]