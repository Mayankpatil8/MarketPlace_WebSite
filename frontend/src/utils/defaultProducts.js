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
    supplier: { name: "ABB", company: "ABB India" },
    images: ["/images/motor.jpg"],
    description: "High-performance industrial motor drive for manufacturing and automation systems.",
    specifications: {
      Power: "0.75-250 kW",
      Voltage: "380-480V",
      Control: "DTC / Scalar"
    },
    tags: ["Motor", "Drive", "Industrial"]
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
    supplier: { name: "Tata Power Solar", company: "Tata Power" },
    images: ["/images/solar.jpg"],
    description: "High efficiency mono PERC solar panel for industrial and commercial installations.",
    specifications: {
      Power: "550W",
      Type: "Mono PERC",
      Efficiency: "21.3%"
    },
    tags: ["Solar", "Energy", "Renewable"]
  },

  {
    _id: "default-3",
    name: "Havells Heavy Duty Industrial Fan",
    price: 9500,
    unit: "unit",
    category: "mechanical",
    stock: 30,
    minOrderQty: 2,
    rating: 4.5,
    reviewCount: 76,
    views: 620,
    isRestricted: false,
    supplier: { name: "Havells", company: "Havells India" },
    images: ["/images/fan.jpg"],
    description: "High-speed heavy duty industrial fan for factories and warehouses.",
    specifications: {
      Size: "24 inch",
      Speed: "1400 RPM",
      Power: "180W"
    },
    tags: ["Fan", "Cooling", "Industrial"]
  },

  {
    _id: "default-4",
    name: "Defence Surveillance Camera System",
    price: 7265,
    unit: "set",
    category: "defence",
    stock: 5,
    minOrderQty: 1,
    rating: 4.7,
    reviewCount: 34,
    views: 410,
    isRestricted: true,
    supplier: { name: "Bharat Electronics", company: "BEL" },
    images: ["/images/camera.jpg"],
    description: "High security surveillance camera system for defence and critical infrastructure.",
    specifications: {
      Resolution: "4K",
      NightVision: "Yes",
      Range: "500m"
    },
    tags: ["Defence", "Security", "Surveillance"]
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
    supplier: { name: "Siemens", company: "Siemens India" },
    images: ["/images/contoler.jpg"],
    description: "Compact PLC controller for industrial automation and control systems.",
    specifications: {
      CPU: "1214C",
      IO: "14 DI / 10 DO",
      Communication: "PROFINET"
    },
    tags: ["PLC", "Automation", "Control"]
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
    supplier: { name: "Schneider Electric", company: "Schneider" },
    images: ["/images/contactor.jpg"],
    description: "Heavy duty industrial power contactor for motor and power control applications.",
    specifications: {
      Current: "32A",
      CoilVoltage: "230V AC",
      Poles: "3 Pole"
    },
    tags: ["Electrical", "Contactor", "Power"]
  }
];