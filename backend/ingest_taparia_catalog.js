import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFilePath = path.join(__dirname, 'data', 'products.json');
const categoriesFilePath = path.join(__dirname, 'data', 'categories.json');

const existingProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
const existingIds = new Set(existingProducts.map(p => p.id));

// Official Taparia SKUs transcribed from the 17 catalog sheets
const tapariaCatalog = [
  // 1. Adjustable Wrenches (Sheet 1)
  {
    id: "taparia-1170-adj-wrench-chrome",
    name: "Taparia Adjustable Wrenches (Chrome Plated)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "1170 (150mm/6\"), 1171 (200mm/8\"), 1172 (250mm/10\"), 1173 (300mm/12\"), 1174 (375mm/15\")",
    material: "Drop forged high grade carbon steel, Type A Grade II",
    finish: "Bright Nickel Chrome Rust-Proof Plating",
    features: [
      "Generally conforming to IS 6149-2025 Type A Grade II",
      "Precision-machined rack and knurl for smooth effortless jaw opening",
      "Laser engraved millimeter scale on jaw for quick fastener measurement",
      "Design No. 167097"
    ],
    suitableFor: "Home plumbing, sanitary pipe fittings, bicycle and two-wheeler maintenance",
    inStock: true,
    featured: true,
    image: "/images/products/taparia-adj-spanner.jpg",
    imageSnippet: "Taparia chrome-plated adjustable wrench with laser-marked millimeter scale.",
    hsnCode: "82041210"
  },

  // 2. Side Cutting Pliers (Sheet 1)
  {
    id: "taparia-side-cutting-pliers",
    name: "Taparia Side Cutting Pliers (Insulated C.A. Sleeve)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "1104-6 (160mm), 1104-7 (180mm)",
    material: "High grade alloy steel with induction hardened cutting edges",
    finish: "Polished head with thick Cellulose Acetate (C.A.) green insulated sleeve",
    features: [
      "Generally conforming to IS 4378 (I) - 2017",
      "Induction hardened cutting edges to 55-60 HRC for clean copper and wire cuts",
      "Thick insulating C.A. sleeve provides high dielectric resistance and ergonomic grip"
    ],
    suitableFor: "Electrical wiring, component lead trimming, copper and brass wire cutting",
    inStock: true,
    featured: false,
    image: "/images/products/taparia-pliers-set.jpg",
    imageSnippet: "Taparia insulated side cutting pliers with emerald green handles.",
    hsnCode: "82032000"
  },

  // 3. Long Nose Pliers (Sheet 3)
  {
    id: "taparia-long-nose-pliers",
    name: "Taparia Long Nose Pliers (Insulated C.A. Sleeve)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "1421-6 (160mm), 1421-8 (200mm)",
    material: "High grade carbon alloy steel with serrated gripping jaws",
    finish: "Black phosphate with thick Cellulose Acetate (C.A.) green insulated sleeves",
    features: [
      "Generally conforming to IS 5658-1990",
      "Serrated gripping jaws with side cutting blades for tight enclosure access",
      "Perfect for holding small components inside electrical switchboards and appliances"
    ],
    suitableFor: "Switchboard repair, delicate electronics, radio and TV servicing, wire looping",
    inStock: true,
    featured: false,
    image: "/images/products/taparia-pliers-set.jpg",
    imageSnippet: "Taparia long nose needle pliers with serrated jaws and green insulated handles.",
    hsnCode: "82032000"
  },

  // 4. Nippers / Diagonal Cutters (Sheet 4)
  {
    id: "taparia-nippers-cutter",
    name: "Taparia Precision Diagonal Nippers (Spring Loaded)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "Model 1221 (130mm / 5\")",
    material: "Alloy steel with precision ground flush cutting jaws",
    finish: "Blue spring return cushion grip handles",
    features: [
      "Ultra-sharp flush cutting edges for tie-wraps, plastic sprues, and thin copper wires",
      "Spring-assisted return reduces hand fatigue during repetitive wire cutting",
      "Lightweight and compact for hobbyists, mechanics, and electronics technicians"
    ],
    suitableFor: "Electronic PCB assembly, zip tie trimming, jewelry making, miniature crafts",
    inStock: true,
    featured: false,
    image: "/images/products/taparia-pliers-set.jpg",
    imageSnippet: "Taparia spring-loaded blue nippers on workbench.",
    hsnCode: "82032000",
    mrp: 145
  },

  // 5. Wire Stripping Pliers (Sheet 5)
  {
    id: "taparia-wire-stripping-pliers-aws8",
    name: "Taparia Wire Stripping Pliers (AWS 8)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "AWS 8 (205mm / 8\")",
    material: "High carbon steel with precision sized wire gauge notches",
    finish: "Black oxide finish with ergonomic dual-tone green handles",
    features: [
      "Generally conforming to IS 5087-1969",
      "Precision ground stripping holes for wire sizes 0.5mm² to 6.0mm²",
      "Built-in wire cutter and looping holes prevent damaging copper strands"
    ],
    suitableFor: "Home electrical installation, lighting fixtures, inverter and panel wiring",
    inStock: true,
    featured: false,
    image: "/images/products/pye-wire-stripper.jpg",
    imageSnippet: "Taparia AWS 8 multi-notch wire stripping pliers.",
    hsnCode: "82032000",
    mrp: 399
  },

  // 6. Flat & Phillips Screwdrivers (Sheet 6)
  {
    id: "taparia-flat-phillips-screwdrivers",
    name: "Taparia Flat & Phillips Screwdrivers (Green C.A. Handle)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "Flat: 3.2x75mm, 4x100mm, 5x150mm, 6x200mm | Phillips: PH0, PH1, PH2, PH3",
    material: "High tensile silicon manganese alloy steel, magnetized tip",
    finish: "Hardened chrome blade with transparent green shatter-proof C.A. handle",
    features: [
      "Generally conforming to IS 844-1979 | Design No. 177211",
      "Unbreakable transparent cellulose acetate handle resists oil, grease, and impacts",
      "Strong magnetized tip holds screws firmly during installation"
    ],
    suitableFor: "Ceiling fans, switchboards, furniture assembly, appliance repair",
    inStock: true,
    featured: true,
    image: "/images/products/taparia-screwdrivers.jpg",
    imageSnippet: "Taparia green handle screwdrivers with magnetic tips.",
    hsnCode: "82054000"
  },

  // 7. Screwdriver Set 821 (Sheet 10)
  {
    id: "taparia-821-screwdriver-set",
    name: "Taparia 821 Multi-Blade Screwdriver Set (6 Blades)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "Set of 6 Blades (Phillips 00, 0, 1, 2, 3 and Flat 6x0.6mm)",
    material: "Hardened chrome vanadium blades with quick-locking handle",
    finish: "Durable green handle with transparent protective storage case",
    features: [
      "Design No. 180673 | HSN: 82054000",
      "6 interchangeable double-ended blades cover 95% of household and shop screws",
      "Quick-clamping collar locks blades with zero wobble",
      "Standard shop packing box protects blades from misplacement"
    ],
    suitableFor: "Comprehensive DIY household toolkits, electrical appliances, toys and hardware",
    inStock: true,
    featured: true,
    image: "/images/products/taparia-screwdrivers.jpg",
    imageSnippet: "Taparia 821 six blade screwdriver set with green handle in display carton.",
    hsnCode: "82054000",
    mrp: 281
  },

  // 8. Line Testers (Sheet 10)
  {
    id: "taparia-line-testers-814-818",
    name: "Taparia Neon Electrical Safety Line Testers (813, 814, 818)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "814 (125mm Green), 813 (130mm Yellow), 818 (200mm Heavy Yellow)",
    material: "Transparent shockproof insulating resin with brass touch point and resistor",
    finish: "Bright high-visibility glowing neon bulb with spring pocket clip",
    features: [
      "Generally conforming to IS 5579-1985 | Safe testing range: 100V – 500V AC",
      "Built-in current limiting safety resistor prevents electric shock",
      "Compact pocket clip for electricians and homeowners"
    ],
    suitableFor: "Checking phase live wire in wall sockets, inverter battery points, main MCBs",
    inStock: true,
    featured: true,
    image: "/images/products/taparia-line-testers.jpg",
    imageSnippet: "Taparia 814 and 818 neon safety testers in shop tray.",
    hsnCode: "82054000",
    mrp: 54
  },

  // 9. Two-In-One Line Tester 819 (Sheet 10)
  {
    id: "taparia-two-in-one-line-tester-819",
    name: "Taparia Two-In-One Reversible Line Tester (819)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "Blade Length 65mm | Phillips 0 & Flat 4.0 x 0.7mm tip",
    material: "Insulated transparent body with reversible magnetized blade",
    finish: "Yellow transparent handle with high-lumen neon lamp",
    features: [
      "Dual purpose: functions both as electrical line tester and tightening screwdriver",
      "Reversible blade: switch between flat head and Phillips head in seconds",
      "Safe up to 500V AC testing"
    ],
    suitableFor: "Tightening wall switch screws, tightening plug pins, testing live phase line",
    inStock: true,
    featured: false,
    image: "/images/products/taparia-line-testers.jpg",
    imageSnippet: "Taparia 819 two in one reversible tester with transparent yellow handle.",
    hsnCode: "82054000",
    mrp: 72
  },

  // 10. Digital Voltage Tester (Sheet 10)
  {
    id: "taparia-digital-voltage-tester",
    name: "Taparia Digital Voltage & Continuity Tester (LCD Display)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "Compact handheld probe (12V – 250V AC/DC)",
    material: "Impact resistant ABS plastic casing with hardened probe tip",
    finish: "Matte black with high-contrast digital LCD indicator",
    features: [
      "Direct numerical voltage reading (12V, 36V, 55V, 110V, 220V)",
      "Induction breakpoint test: detects broken wires inside concealed walls without stripping",
      "Tests both AC mains and DC vehicle battery systems"
    ],
    suitableFor: "Concealed wire tracing, inverter testing, car battery check, home appliances",
    inStock: true,
    featured: false,
    image: "/images/products/taparia-line-testers.jpg",
    imageSnippet: "Taparia digital tester with LCD reading display.",
    hsnCode: "82054000",
    mrp: 145
  },

  // 11. 1/4" Dr. Socket Set SA 46 (Sheet 14)
  {
    id: "taparia-sa46-socket-set",
    name: "Taparia 1/4\" Dr. 46 Pcs Socket & Bit Set (SA 46 in Hard Case)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "46 Pieces Complete Kit (Sockets 4mm to 14mm + Torx/Hex/Phillips Bits + Ratchet)",
    material: "Chrome Vanadium Steel (Cr-V) with hardened quick-release 72T ratchet",
    finish: "Mirror chrome finish in heavy-duty custom blow-moulded blue case",
    features: [
      "Comprehensive 46 Pcs Set: Hex Sockets 4 to 14mm, Extension Bars, Universal Joint, Flexible Extension, Sliding T-Bar",
      "Complete bit set: Hex (3-8mm), Flat (4, 5.5, 7mm), Phillips (PH1-3), Torx (T8-T40), Pozidrive (PZ1-3), Allen keys",
      "Ergonomic quick-release ratchet handle A-715 with spinner handle A-704",
      "Blow moulding case prevents loss of small sockets in workshops"
    ],
    suitableFor: "Automobile mechanics, bike engine servicing, modular kitchen fittings, home appliances",
    inStock: true,
    featured: true,
    image: "/images/products/taparia-allen-key-set.jpg",
    imageSnippet: "Taparia SA 46 blow-moulded blue case with comprehensive socket collection.",
    hsnCode: "82042000",
    mrp: 2622
  },

  // 12. 3/8" Dr. Socket Set S 3/8 H (Sheet 14)
  {
    id: "taparia-s38h-socket-set",
    name: "Taparia 3/8\" Dr. Socket Set (S 3/8 H - 20 Pcs in Steel Box)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "20 Pieces (14 Sockets 6mm to 22mm + Spark Plug Socket + 6 Accessories)",
    material: "Cold-forged Chrome Vanadium steel with flank drive profile",
    finish: "Bright chrome plated in heavy steel carrying case",
    features: [
      "14 Flank Drive Sockets: 6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 19, 21, 22mm",
      "Includes dedicated Spark Plug Socket BSP21 for two-wheelers and tractors",
      "Heavy duty reversible ratchet, extension bars, and universal joint"
    ],
    suitableFor: "Two-wheeler mechanics, generator repair, tractor maintenance in Jhansi region",
    inStock: true,
    featured: false,
    image: "/images/products/taparia-allen-key-set.jpg",
    imageSnippet: "Taparia S 3/8 H socket set in red industrial metal box.",
    hsnCode: "82042000",
    mrp: 3568
  },

  // 13. Double Ended Open Jaw Spanners DEP Series (Sheet 17)
  {
    id: "taparia-dep-spanners-chrome",
    name: "Taparia Double Ended Open Jaw Spanners (DEP Series)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "DEP 06 (6x7 to 16x17mm), DEP 08 (6x7 to 20x22mm), DEP 12 (6x7 to 30x32mm)",
    material: "Drop forged high grade chrome vanadium alloy steel",
    finish: "Mirror Nickel Chrome Plating (IS 2028-2026)",
    features: [
      "Conforming to IS 2028-2026 | HSN: 82041110",
      "Precision broached jaw profile fits hex nuts with tight non-slip tolerances",
      "Slim head profile allows working in recessed and cramped spaces",
      "Available individually or in matched sets (DEP 06, DEP 08, DEP 12)"
    ],
    suitableFor: "Vehicle maintenance, water pump fitting, pipe flanges, home furniture assembly",
    inStock: true,
    featured: true,
    image: "/images/products/taparia-adj-spanner.jpg",
    imageSnippet: "Taparia double ended open jaw chrome spanner rack.",
    hsnCode: "82041110",
    mrp: 625
  },

  // 14. Ring Spanner Sets 18 Series (Sheet 17)
  {
    id: "taparia-ring-spanners-1808",
    name: "Taparia Bi-Hexagonal Deep Ring Spanners (18 Series Sets)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "1806 (6x7 to 16x17mm), 1808 (6x7 to 20x22mm), 1812 (6x7 to 30x32mm)",
    material: "Drop forged high tensile alloy steel, 75-degree deep offset rings",
    finish: "Bright Nickel Chrome Finish (IS 2029-2026)",
    features: [
      "Generally conforming to IS 2029-2026 | HSN: 82041110",
      "75-degree deep cranked offset head clears obstructions and protects fingers",
      "12-point bi-hexagonal ring provides complete 360-degree grip on stubborn rusted nuts",
      "Supplied in sturdy vinyl roll-up pouch or hanger rack"
    ],
    suitableFor: "Heavy machinery bolts, engine head bolts, vehicle leaf springs and suspensions",
    inStock: true,
    featured: true,
    image: "/images/products/taparia-adj-spanner.jpg",
    imageSnippet: "Taparia deep offset ring spanners hanging in roll pouch.",
    hsnCode: "82041110",
    mrp: 875
  },

  // 15. Combination Spanners CS Series (Sheet 17)
  {
    id: "taparia-combination-spanners-cs",
    name: "Taparia Combination Spanners Open & Ring (CS Series)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "CSS 6 (8-17mm), CSS 8 (8-19mm), CSS 12 (6-22mm), CSS 14 (6-32mm)",
    material: "Drop forged alloy steel with hardened open and 15-degree ring ends",
    finish: "Mirror Finish Chrome Plated (IS 6389-1998)",
    features: [
      "Generally conforming to IS 6389-1998 | HSN: 82041110",
      "Open jaw on one side for fast spinning + 15° ring on other side for final high-torque tightening",
      "Smooth round-edged beam provides comfortable grip under heavy leverage"
    ],
    suitableFor: "Auto workshops, fabrication units, home DIY toolkits",
    inStock: true,
    featured: true,
    image: "/images/products/taparia-adj-spanner.jpg",
    imageSnippet: "Taparia CS series combination spanner set displayed in metal rack.",
    hsnCode: "82041110",
    mrp: 678
  },

  // 16. Octagonal & Flat Cold Chisels (Sheet 19)
  {
    id: "taparia-octagonal-cold-chisels",
    name: "Taparia Heavy Octagonal Cold Chisels (101 to 107)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "101 (125x9mm), 102 (150x16mm), 104 (200x22mm), 105 (200x25mm), 107 (300x32mm)",
    material: "Forged high carbon steel with induction hardened cutting edge",
    finish: "Durable blue epoxy powder coating with polished hardened tip",
    features: [
      "Generally conforming to IS 402-1990 | HSN: 82053000",
      "Hardened and tempered cutting edge (52-58 HRC) chips concrete and cuts metal without chipping",
      "Striking head is specially tempered to prevent mushrooming and flying metal fragments"
    ],
    suitableFor: "Chipping concrete walls for electrical conduit, cutting rusty bolts, brick chasing",
    inStock: true,
    featured: false,
    image: "/images/products/xtra-power-hammer-drill.jpg",
    imageSnippet: "Taparia octagonal blue cold chisels in assorted lengths.",
    hsnCode: "82053000",
    mrp: 151
  },

  // 17. Center & Leather Hollow Punches (Sheet 19)
  {
    id: "taparia-center-drift-punches",
    name: "Taparia Precision Center Punches & Leather Hole Punches",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "Center Punches (1884 100mm, 1885 125mm) | Leather Punches (LP 3 to LP 25, 3mm to 25mm)",
    material: "Hardened high carbon tool steel with knurled gripping body",
    finish: "Black oxide rust-resistant finish with sharp ground cutting edges",
    features: [
      "Conforming to IS 7177-1999 | HSN: 82034010",
      "Center punch makes clear indentation to prevent drill bits from wandering on metal or tiles",
      "Hollow leather punch LP series cuts clean circular holes in leather, rubber, gasket sheet, and plastic"
    ],
    suitableFor: "Marking drilling points, making custom engine gaskets, belt hole punching",
    inStock: true,
    featured: false,
    image: "/images/products/taparia-screwdrivers.jpg",
    imageSnippet: "Taparia center and leather hollow punches on counter.",
    hsnCode: "82034010",
    mrp: 53
  },

  // 18. Heavy Duty Bolt Cutters (Sheet 19)
  {
    id: "taparia-bolt-cutters-bc",
    name: "Taparia Heavy Duty Bolt Cutters (BC Series 8\" to 48\")",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "BC-8 (200mm/4mm cut), BC-12 (300mm/5mm), BC-14 (350mm/6mm), BC-24 (600mm/9mm), BC-36 (900mm/15mm)",
    material: "Drop forged high alloy chrome molybdenum steel jaws with tubular steel handles",
    finish: "Black hardened blades with industrial red casing and non-slip rubber grips",
    features: [
      "Generally conforming to IS 5200-1998 | HSN: 82034090",
      "Compound lever mechanism multiplies hand force to slice effortlessly through iron rods and chains",
      "Eccentric bolt allows quick re-alignment of cutter jaws after prolonged heavy use"
    ],
    suitableFor: "Cutting concrete reinforcement bars, padlocks, iron mesh jali, steel wire ropes",
    inStock: true,
    featured: false,
    image: "/images/products/gi-wire-mesh-jali.jpg",
    imageSnippet: "Taparia heavy bolt cutters in red finish with compound leverage arms.",
    hsnCode: "82034090",
    mrp: 984
  },

  // 19. Allen Keys Black & Brown Sets (Sheets 20-22)
  {
    id: "taparia-allen-key-sets-metric",
    name: "Taparia Hex Allen Key Sets (KM 9V Box & KHM 9V Hanger Pack)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "9 Pcs Set (1.5, 2, 2.5, 3, 4, 5, 6, 8, 10mm) | Imperial 10 Pcs Set (1/16\" to 3/8\")",
    material: "High grade alloy spring steel (IS 3082-2008)",
    finish: "Anti-corrosion Black Phosphate & Oiled Brown finishes",
    features: [
      "Conforming to IS 3082-2008 | HSN: 82041120",
      "Accurately chamfered ends slide effortlessly into socket head cap screws without rounded edges",
      "High torsional flexibility withstands maximum torque without snapping",
      "Choice of sturdy green snap-lock box (KM 9V) or wall-hanging clip holder (KHM 9V)"
    ],
    suitableFor: "Modular furniture assembly, bicycle disc brakes, machinery maintenance",
    inStock: true,
    featured: true,
    image: "/images/products/taparia-allen-key-set.jpg",
    imageSnippet: "Taparia KM 9V emerald green clip holder with 9 hex keys.",
    hsnCode: "82041120",
    mrp: 246
  },

  // 20. Ball Point Long Allen Keys (Sheet 22)
  {
    id: "taparia-ball-point-allen-keys-kbhm9l",
    name: "Taparia Ball Point Extra Long Allen Key Set (KBHM 9L)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "9 Pcs Long Ball End Set (1.5, 2, 2.5, 3, 4, 5, 6, 8, 10mm)",
    material: "Hardened and tempered high tensile spring steel",
    finish: "Bright rust-resistant satin finish in hanger pack",
    features: [
      "Ball end head allows tightening bolts at up to 25-degree angles in hard-to-reach corners",
      "Extra long shanks provide double the leverage and extended reach into deep recesses",
      "Precision broached edges resist slipping under heavy pressure"
    ],
    suitableFor: "Automotive engine bays, machine guards, concealed fasteners in electronics",
    inStock: true,
    featured: false,
    image: "/images/products/taparia-allen-key-set.jpg",
    imageSnippet: "Taparia extra long ball point hex key set in red and black holder.",
    hsnCode: "82041120",
    mrp: 653
  },

  // 21. T-Handle Hex & Torx Keys (Sheet 23)
  {
    id: "taparia-t-handle-hex-torx-keys",
    name: "Taparia Ergonomic T-Handle Hex & Torx Keys (TAK Series)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "TAK 1.5 to TAK 10 (Metric 1.5 to 10mm) | Torx T10 to T50",
    material: "Alloy steel shaft with molded ergonomic cross-handle",
    finish: "Satin chrome shaft with sky-blue comfort-grip handle",
    features: [
      "T-handle delivers maximum torque with minimal hand fatigue and zero slip",
      "Dual drive ends: long shaft for recessed bolts and short cross-end for ultimate breakaway torque",
      "Available with heavy metal stand (TAKM 9) for workshop organization"
    ],
    suitableFor: "Two-wheeler workshops, motorcycle mechanics, CNC machine setup",
    inStock: true,
    featured: false,
    image: "/images/products/taparia-allen-key-set.jpg",
    imageSnippet: "Taparia T-handle blue hex key stand on mechanic counter.",
    hsnCode: "82041120",
    mrp: 974
  },

  // 22. Folding Pocket Hex & Torx Sets (Sheet 23)
  {
    id: "taparia-folding-hex-torx-sets",
    name: "Taparia Pocket Folding Hex & Torx Key Sets (KFM 8 / KFT 8)",
    brand: "Taparia",
    category: "hand-tools",
    sizes: "KFM 8 (Hex 1.5 to 8mm) | KFT 8 (Torx T9, T10, T15, T20, T25, T27, T30, T40)",
    material: "Hardened spring alloy steel blades housed in impact-proof polymer case",
    finish: "Corrosion-resistant black finish in pocket knife style folding handle",
    features: [
      "Fold-up pocket design prevents losing individual keys on outdoor job sites",
      "Handle acts as an extended lever for high-torque tightening",
      "Essential carry kit for cyclists, motorbike riders, and site technicians"
    ],
    suitableFor: "On-the-go bicycle repairs, motorbikes, emergency toolkits",
    inStock: true,
    featured: false,
    image: "/images/products/taparia-allen-key-set.jpg",
    imageSnippet: "Taparia pocket folding hex key set.",
    hsnCode: "82041120",
    mrp: 413
  }
];

// Merge without duplicate IDs
let addedCount = 0;
for (const item of tapariaCatalog) {
  if (!existingIds.has(item.id)) {
    existingProducts.push(item);
    existingIds.add(item.id);
    addedCount++;
  } else {
    // Update existing with full HSN and specifications
    const idx = existingProducts.findIndex(p => p.id === item.id);
    existingProducts[idx] = { ...existingProducts[idx], ...item };
  }
}

fs.writeFileSync(productsFilePath, JSON.stringify(existingProducts, null, 2), 'utf8');

// Update categories
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf8'));
categories.forEach(cat => {
  if (cat.id === 'all') {
    cat.count = existingProducts.length;
  } else {
    cat.count = existingProducts.filter(p => p.category === cat.id).length;
  }
});
fs.writeFileSync(categoriesFilePath, JSON.stringify(categories, null, 2), 'utf8');

console.log(`✅ Ingested ${addedCount} new Taparia official SKUs. Total products in catalog now: ${existingProducts.length}`);

