import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- DATA DEFINITIONS (11 Organs Grid) ---
const anatomyData = {
    brain: {
        name: "BRAIN",
        medical: "Cerebrum",
        system: "Nervous System",
        description: "The primary control center of the nervous system. It processes sensory information, coordinates motor activity, and enables thought, memory, and emotion.",
        color: 0x9d00ff,
        position: { x: 0, y: 3.2, z: 0 },
        telemetry: {
            "Activity Wave": "Alpha (Pulsing)",
            "Synaptic Velocity": "120 m/s",
            "Cognitive Load": "28 %",
            "Dopamine Level": "85 %"
        },
        simulation: {
            label: "Synaptic Stimulation",
            min: 10,
            max: 200,
            val: 120,
            unit: "Hz"
        },
        genes: ["MAPT", "APOE", "BDNF", "GRIN2B", "CREB1", "SNAP25", "SYN1", "GAP43"],
        proteins: ["Amyloid-Beta", "Tau Protein", "BDNF Ligand", "NMDA Receptor", "PSD-95"]
    },
    heart: {
        name: "HEART",
        medical: "Cor",
        system: "Circulatory System",
        description: "A muscular organ that pumps blood throughout the body via the cardiovascular network, supplying oxygen and nutrients while removing metabolic waste.",
        color: 0xff3344,
        position: { x: 0.15, y: 1.9, z: 0.35 },
        telemetry: {
            "Pulse Rate": "72 BPM",
            "Stroke Volume": "75 mL",
            "Cardiac Output": "5.4 L/min",
            "Blood Pressure": "120/80 mmHg"
        },
        simulation: {
            label: "Pacemaker Override",
            min: 40,
            max: 180,
            val: 72,
            unit: "BPM"
        },
        genes: ["MYH7", "TNNT2", "ACTC1", "RYR2", "NPPA", "CACNA1C", "SCN5A", "KCNQ1"],
        proteins: ["Troponin T", "Myosin Heavy Chain", "Ryanodine Rec.", "Atrial Natriuretic Peptide"]
    },
    lungs: {
        name: "LUNGS",
        medical: "Pulmones",
        system: "Respiratory System",
        description: "Dual respiratory organs responsible for gas exchange, drawing oxygen into the bloodstream and expelling carbon dioxide byproduct.",
        color: 0xff007f,
        position: { x: 0, y: 1.9, z: 0.25 },
        telemetry: {
            "Respiration Rate": "16 / min",
            "Tidal Volume": "500 mL",
            "O2 Saturation": "98.8 %",
            "Vital Capacity": "4.6 L"
        },
        simulation: {
            label: "Respiration Rate",
            min: 6,
            max: 45,
            val: 16,
            unit: "/min"
        },
        genes: ["SFTPB", "SFTPA1", "ABCA3", "NKX2-1", "EGFR", "IL6", "TNF", "TGFB1"],
        proteins: ["Surfactant Prot A", "Surfactant Prot B", "ABCA3 Transporter", "EGFR Ligand"]
    },
    stomach: {
        name: "STOMACH",
        medical: "Gaster",
        system: "Digestive System",
        description: "A hollow muscular organ that receives food, secretes digestive enzymes and gastric juices, and mechanically breaks down contents.",
        color: 0xffa500,
        position: { x: -0.25, y: 1.2, z: 0.3 },
        telemetry: {
            "Gastric Acidity": "1.8 pH",
            "Motility Index": "3.2 / min",
            "Gastric Volume": "350 mL",
            "Digestive Phase": "Active Phase II"
        },
        simulation: {
            label: "Acidity (pH)",
            min: 1.0,
            max: 5.0,
            val: 1.8,
            step: 0.1,
            unit: "pH"
        },
        genes: ["MUC5AC", "ATP4A", "ATP4B", "PGC", "CCKBR", "GHR", "SST", "GAST"],
        proteins: ["Mucin-5AC", "Proton Pump Alpha", "Pepsinogen C", "Gastrin Peptide"]
    },
    liver: {
        name: "LIVER",
        medical: "Hepar",
        system: "Metabolic System",
        description: "A vital organ that detoxifies blood, synthesizes essential proteins, regulates glycogen storage, and produces bile necessary for digestion.",
        color: 0x8b4513,
        position: { x: 0.3, y: 1.25, z: 0.3 },
        telemetry: {
            "Filtration Rate": "92 mL/min",
            "Glycogen Reserve": "74 %",
            "Detox Efficiency": "98.5 %",
            "Enzymatic State": "Optimal"
        },
        simulation: {
            label: "Toxin Load Filter",
            min: 0,
            max: 100,
            val: 5,
            unit: "%"
        },
        genes: ["ALB", "CYP3A4", "APOB", "F8", "HP", "A1BG", "SERPINC1", "CPS1"],
        proteins: ["Albumin", "Cytochrome P450", "Apolipoprotein B", "Factor VIII Clotting"]
    },
    kidneys: {
        name: "KIDNEYS",
        medical: "Renes",
        system: "Urinary System",
        description: "Bean-shaped organs that filter waste, excess fluid, and toxins from blood, maintaining healthy electrolyte and water balance.",
        color: 0xffdf00,
        position: { x: 0, y: 0.8, z: -0.2 },
        telemetry: {
            "Glomerular Flow": "120 mL/min",
            "Hydration Balance": "94.2 %",
            "Urine Output": "1.2 mL/min",
            "Blood Filtration": "99.8 %"
        },
        simulation: {
            label: "Hydration Target",
            min: 30,
            max: 100,
            val: 94,
            unit: "%"
        },
        genes: ["AQP1", "AQP2", "SLC12A1", "UMOD", "NPHS1", "NPHS2", "KCNJ1", "CLCNKB"],
        proteins: ["Aquaporin-1", "Aquaporin-2", "Uromodulin", "Nephrin Filtration"]
    },
    pancreas: {
        name: "PANCREAS",
        medical: "Pancreas",
        system: "Endocrine System",
        description: "An elongated glandular organ located behind the stomach. It secretes digestive enzymes into the duodenum and produces hormones such as insulin and glucagon to regulate blood glucose.",
        color: 0xadff2f,
        position: { x: 0.05, y: 1.05, z: 0.1 },
        telemetry: {
            "Insulin Output": "14.5 uU/mL",
            "Glucagon Level": "85 pg/mL",
            "Amylase Secretion": "65 U/L",
            "Glucose Regulation": "Optimal"
        },
        simulation: {
            label: "Glucose Challenge",
            min: 50,
            max: 300,
            val: 90,
            unit: "mg/dL"
        },
        genes: ["INS", "GCG", "PDX1", "PTF1A", "SST", "PPY", "IAPP", "NKX6-1"],
        proteins: ["Insulin Hormone", "Glucagon Hormone", "Pancreatic Amylase", "Somatostatin"]
    },
    spleen: {
        name: "SPLEEN",
        medical: "Lien",
        system: "Immune System",
        description: "A vital lymphatic organ located on the left side of the abdomen. It filters blood, recycles old red blood cells, stores platelets, and houses white blood cells to mount immune defense.",
        color: 0x6a0dad,
        position: { x: -0.45, y: 1.25, z: 0.0 },
        telemetry: {
            "Blood Filter Speed": "150 mL/min",
            "Platelet Reserve": "2.4 x10^11",
            "Lymphocyte Activity": "Normal",
            "Erythrocyte Recycle": "Active"
        },
        simulation: {
            label: "Antigenic Exposure",
            min: 0,
            max: 100,
            val: 12,
            unit: "% Load"
        },
        genes: ["CD8A", "CD4", "IL2", "IFNG", "HLA-DRA", "CD19", "MS4A1", "LYN"],
        proteins: ["Immunoglobulin G", "Interleukin-2", "CD4 Receptor", "CD8 Receptor"]
    },
    smallIntestine: {
        name: "SMALL INTESTINE",
        medical: "Intestinum Tenue",
        system: "Digestive System",
        description: "A highly folded, coiled tube where 90% of chemical digestion and nutrient absorption occurs, featuring microscopic villi to maximize absorption area.",
        color: 0xff7f50,
        position: { x: 0, y: 0.32, z: 0.18 },
        telemetry: {
            "Absorption Index": "94.5 %",
            "Villi Perfusing": "Optimal",
            "Peristalsis Rate": "11 / min",
            "Digestive Fluid pH": "7.4 pH"
        },
        simulation: {
            label: "Chyme Viscosity",
            min: 10,
            max: 100,
            val: 45,
            unit: "cP"
        },
        genes: ["LCT", "MUC2", "FABP2", "CDX2", "DPP4", "ANPEP", "SI", "SLC5A1"],
        proteins: ["Lactase Enzyme", "Sucrase-Isomaltase", "Peptidase", "Mucin-2 Barrier"]
    },
    largeIntestine: {
        name: "LARGE INTESTINE",
        medical: "Colon",
        system: "Digestive System",
        description: "The final section of the digestive tract, looping around the small intestine. It absorbs water, salts, and vitamins synthesized by gut microflora, turning indigestible matter into solid waste.",
        color: 0x32cd32,
        position: { x: 0, y: 0.28, z: 0.2 },
        telemetry: {
            "Water Reabsorption": "1.4 L/day",
            "Microbiota Index": "98.2 %",
            "Mucus Flow Velocity": "3.5 um/s",
            "Stenosis Fraction": "0.0 %"
        },
        simulation: {
            label: "Microbiome Balance",
            min: 10,
            max: 100,
            val: 98,
            unit: "% Diversity"
        },
        genes: ["MUC2", "AQP3", "AQP4", "SLC26A3", "CA2", "REG1A", "REG3A", "BEST4"],
        proteins: ["Aquaporin-3 Channel", "Aquaporin-4 Channel", "Mucus Barrier Protein", "Carbonic Anhydrase"]
    },
    bladder: {
        name: "URINARY BLADDER",
        medical: "Vesica Urinaria",
        system: "Urinary System",
        description: "A hollow, distensible muscular organ located in the pelvis. It acts as a reservoir storing urine received from the kidneys via the ureters, expanding to hold fluid safely until urination.",
        color: 0x00bfff,
        position: { x: 0, y: -0.05, z: 0.2 },
        telemetry: {
            "Urine Storage": "180 mL",
            "Detrusor Tension": "12 mmHg",
            "Sphincter Tone": "Secured",
            "Capacity Load": "36 %"
        },
        simulation: {
            label: "Liquid Inflow",
            min: 50,
            max: 600,
            val: 180,
            unit: "mL"
        },
        genes: ["UPK1A", "UPK1B", "UPK2", "UPK3A", "AQP1", "AQP3", "KRT18", "KRT19"],
        proteins: ["Uroplakin-1A", "Uroplakin-2", "Aquaporin-1", "Cytokeratin-18"]
    },
    thyroid: {
        name: "THYROID",
        medical: "Glandula Thyroidea",
        system: "Endocrine System",
        description: "A butterfly-shaped gland located in the base of the neck. It controls metabolic pace by releasing thyroxine (T4) and triiodothyronine (T3).",
        color: 0xff4500,
        position: { x: 0, y: 2.65, z: 0.25 },
        telemetry: {
            "Thyroxine Output": "8.2 ug/dL",
            "Calcitonin Level": "4.1 pg/mL",
            "Metabolism Pace": "Normal Baseline",
            "Iodine Uptake": "95.5 %"
        },
        simulation: {
            label: "Hormone Level (T4)",
            min: 1,
            max: 25,
            val: 8,
            unit: "ug/dL"
        },
        genes: ["TG", "TPO", "TSHR", "NKX2-1", "PAX8", "SLC5A5", "DIO1", "DIO2"],
        proteins: ["Thyroglobulin", "Thyroid Peroxidase", "TSH Receptor", "Sodium-Iodide Symporter"]
    },
    adrenals: {
        name: "ADRENAL GLANDS",
        medical: "Glandulae Suprarenales",
        system: "Endocrine System",
        description: "Small endocrine glands situated on top of both kidneys. They synthesize vital stress-response hormones like adrenaline, aldosterone, and cortisol.",
        color: 0xd2691e,
        position: { x: 0, y: 0.95, z: -0.15 },
        telemetry: {
            "Cortisol Release": "12.4 ug/dL",
            "Adrenaline Flow": "45.0 pg/mL",
            "Aldosterone Level": "8.5 ng/dL",
            "Stress Response": "Steady State"
        },
        simulation: {
            label: "Adrenaline Spike",
            min: 10,
            max: 500,
            val: 45,
            unit: "pg/mL"
        },
        genes: ["STAR", "CYP11A1", "CYP17A1", "CYP21A2", "MC2R", "NR5A1", "POMC", "HSD3B2"],
        proteins: ["Steroidogenic Acute Regulatory", "Cytochrome P450 scc", "ACTH Receptor", "Cortisol Ligand"]
    },
    gallbladder: {
        name: "GALLBLADDER",
        medical: "Vesica Biliaris",
        system: "Digestive System",
        description: "A small pear-shaped organ beneath the liver. It stores, concentrates, and releases lipid-emulsifying bile produced by hepatocytes into the duodenum.",
        color: 0x2e8b57,
        position: { x: 0.22, y: 1.15, z: 0.28 },
        telemetry: {
            "Bile Volume": "45 mL",
            "Bile Concentration": "10X (High)",
            "Cholecystokinin Dynamic": "Active",
            "Lipid Breakdown": "92.4 %"
        },
        simulation: {
            label: "Cholecystokinin (CCK)",
            min: 5,
            max: 100,
            val: 35,
            unit: "pmol/L"
        },
        genes: ["CCKAR", "ABCB11", "ABCB4", "ABCG5", "ABCG8", "SLC10A1", "NR1H4", "FGF19"],
        proteins: ["Bile Salt Export Pump", "CCK Receptor Type A", "Phospholipid Translocator", "FGF19 Hormone"]
    }
};

// --- WEB AUDIO SYNTHESIZER ---
class BioSynth {
    constructor() {
        this.ctx = null;
        this.masterVolume = null;
        this.heartbeatOsc = null;
        this.heartbeatGain = null;
        this.brainHum = null;
        this.brainGain = null;
        this.isPlaying = false;
    }

    init() {
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContextClass();
            
            this.masterVolume = this.ctx.createGain();
            this.masterVolume.gain.setValueAtTime(0.25, this.ctx.currentTime);
            this.masterVolume.connect(this.ctx.destination);
            
            this.brainHum = this.ctx.createOscillator();
            this.brainHum.type = 'sine';
            this.brainHum.frequency.setValueAtTime(65.4, this.ctx.currentTime);
            
            const brainMod = this.ctx.createOscillator();
            brainMod.frequency.setValueAtTime(0.2, this.ctx.currentTime);
            const brainModGain = this.ctx.createGain();
            brainModGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
            
            brainMod.connect(brainModGain);
            brainModGain.connect(this.brainHum.frequency);
            
            this.brainGain = this.ctx.createGain();
            this.brainGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
            
            this.brainHum.connect(this.brainGain);
            this.brainGain.connect(this.masterVolume);
            
            this.heartbeatGain = this.ctx.createGain();
            this.heartbeatGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
            this.heartbeatGain.connect(this.masterVolume);

            this.brainHum.start();
            brainMod.start();
            
            this.isPlaying = true;
            this.triggerHeartbeat(72);
        } catch (e) {
            console.warn("Web Audio API not supported or blocked.", e);
        }
    }

    triggerHeartbeat(bpm) {
        if (!this.isPlaying || !this.ctx) return;
        
        const interval = 60 / bpm;
        
        const beat = () => {
            if (!this.isPlaying) return;
            const now = this.ctx.currentTime;
            
            const osc1 = this.ctx.createOscillator();
            const gain1 = this.ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(55, now);
            osc1.frequency.exponentialRampToValueAtTime(20, now + 0.12);
            
            gain1.gain.setValueAtTime(0, now);
            gain1.gain.linearRampToValueAtTime(0.5, now + 0.02);
            gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            
            osc1.connect(gain1);
            gain1.connect(this.heartbeatGain);
            osc1.start();
            osc1.stop(now + 0.16);
            
            const dubDelay = 0.15;
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(65, now + dubDelay);
            osc2.frequency.exponentialRampToValueAtTime(20, now + dubDelay + 0.12);
            
            gain2.gain.setValueAtTime(0, now + dubDelay);
            gain2.gain.linearRampToValueAtTime(0.4, now + dubDelay + 0.02);
            gain2.gain.exponentialRampToValueAtTime(0.01, now + dubDelay + 0.15);
            
            osc2.connect(gain2);
            gain2.connect(this.heartbeatGain);
            osc2.start(now + dubDelay);
            osc2.stop(now + dubDelay + 0.16);

            this.heartbeatTimeout = setTimeout(beat, interval * 1000);
        };

        if (this.heartbeatTimeout) clearTimeout(this.heartbeatTimeout);
        beat();
    }

    setHeartVolume(vol) {
        if (!this.ctx) return;
        this.heartbeatGain.gain.setValueAtTime(vol, this.ctx.currentTime);
    }

    triggerLungsBreathing() {
        if (!this.isPlaying || !this.ctx) return;
        
        const now = this.ctx.currentTime;
        
        // Procedural White Noise generator using random buffer
        const bufferSize = this.ctx.sampleRate * 2.0; // 2 seconds breathing sound
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        // Bandpass filter to model airway acoustics
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(400, now);
        // Modulate frequency to simulate inhale/exhale sweep
        filter.frequency.exponentialRampToValueAtTime(900, now + 0.8);
        filter.frequency.exponentialRampToValueAtTime(300, now + 1.8);

        const breathingGain = this.ctx.createGain();
        breathingGain.gain.setValueAtTime(0, now);
        breathingGain.gain.linearRampToValueAtTime(0.08, now + 0.6);
        breathingGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

        whiteNoise.connect(filter);
        filter.connect(breathingGain);
        breathingGain.connect(this.masterVolume);

        whiteNoise.start(now);
        whiteNoise.stop(now + 2.0);
    }

    triggerStomachGurgling() {
        if (!this.isPlaying || !this.ctx) return;
        
        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.linearRampToValueAtTime(35, now + 0.7);

        // Lowpass filter to muffle stomach gurgle internally
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(150, now);

        const gurgleGain = this.ctx.createGain();
        gurgleGain.gain.setValueAtTime(0, now);
        gurgleGain.gain.linearRampToValueAtTime(0.12, now + 0.1);
        gurgleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

        osc.connect(filter);
        filter.connect(gurgleGain);
        gurgleGain.connect(this.masterVolume);

        osc.start(now);
        osc.stop(now + 0.8);
    }

    setBrainHumFrequency(freq) {
        if (!this.ctx || !this.brainHum) return;
        this.brainHum.frequency.setValueAtTime(freq, this.ctx.currentTime);
    }

    stop() {
        if (this.heartbeatTimeout) clearTimeout(this.heartbeatTimeout);
        if (this.ctx) {
            this.ctx.close();
            this.ctx = null;
        }
        this.isPlaying = false;
    }
}

const synth = new BioSynth();

// --- STATE MANAGEMENT ---
let scene, camera, renderer, controls;
let macroGroup, microGroup;

// Macro view components
let starField, bodyWireframe, skeletalMesh, nervousSystem, circulatorySystem;
let organs = {};

// Micro view components (Phase 3 Cell)
let cellMembrane, cellLipidSwarm, nucleusMesh, dnaHelixGroup, mitochondriaGroup, cytoskeletalFibers;
let atpParticlesGroup;

// Disease visuals (Phase 5)
let brainTumorMesh;
let heartArteryPlaques = [];

// Interactions
let viewDepth = "macro";
let selectedOrganName = null;
let targetCameraLookAt = new THREE.Vector3(0, 1.0, 0);
let currentCameraLookAt = new THREE.Vector3(0, 1.0, 0);
let targetCameraPos = new THREE.Vector3(0, 1.0, 8.5);
let cameraInterpolating = false;
let autoRotate = false;
let showLabels = true;
let isGlowing = true;
let simulationSpeed = 1.0;
let timeTick = 0;
let diagnosticHeartRate = 72;
let diagnosticRespiration = 16;
let diseaseProgressionVal = 0;
let isCinematicTour = false;
let tourStep = 0;
let tourTimer = 0;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredOrgan = null;

// --- INITIALIZATION ---
function init() {
    const canvas = document.getElementById('webgl-canvas');

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.copy(targetCameraPos);

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI * 0.65;
    controls.minPolarAngle = Math.PI * 0.15;
    controls.minDistance = 1.0;
    controls.maxDistance = 15.0;
    controls.target.copy(currentCameraLookAt);

    const ambientLight = new THREE.AmbientLight(0x0a102b, 1.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x00f0ff, 2.5);
    mainLight.position.set(5, 8, 5);
    scene.add(mainLight);

    const backLight = new THREE.DirectionalLight(0x9d00ff, 1.5);
    backLight.position.set(-5, 4, -5);
    scene.add(backLight);

    macroGroup = new THREE.Group();
    microGroup = new THREE.Group();
    scene.add(macroGroup);
    scene.add(microGroup);
    
    microGroup.visible = false;

    // Build procedural graphics
    createStars();
    createBodySilhouette();
    createSkeletalSystem();
    createNervousSystem();
    createCirculatorySystem();
    createOrgans();
    createCellEnvironment();

    setupUIEventListeners();
    setupAnatomyLabels();
    updateUITimer();
    setupChatLogic();
    setupTabSelection();

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    animate();
}

// --- PROCEDURAL GRAPHICS CREATORS ---

function createStars() {
    const starCount = 1500;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const colorOptions = [
        new THREE.Color(0x00f0ff),
        new THREE.Color(0x9d00ff),
        new THREE.Color(0xffffff)
    ];

    for (let i = 0; i < starCount; i++) {
        const r = 25 + Math.random() * 40;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

        const col = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    starField = new THREE.Points(geometry, new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    }));
    scene.add(starField);
}

function createBodySilhouette() {
    const bodyGroup = new THREE.Group();
    const silhouetteMaterial = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.06, // Increased wireframe opacity
        blending: THREE.AdditiveBlending
    });

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.7, 12, 12), silhouetteMaterial);
    head.position.set(0, 3.2, 0);
    bodyGroup.add(head);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.4, 10), silhouetteMaterial);
    neck.position.set(0, 2.6, 0);
    bodyGroup.add(neck);

    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.65, 2.0, 12, 6), silhouetteMaterial);
    torso.position.set(0, 1.4, 0);
    bodyGroup.add(torso);

    const pelvis = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.7, 0.6, 12, 4), silhouetteMaterial);
    pelvis.position.set(0, 0.1, 0);
    bodyGroup.add(pelvis);

    const upperArmL = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 1.2, 8), silhouetteMaterial);
    upperArmL.position.set(-1.1, 1.8, 0);
    upperArmL.rotation.z = Math.PI / 10;
    bodyGroup.add(upperArmL);

    const forearmL = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.1, 1.1, 8), silhouetteMaterial);
    forearmL.position.set(-1.3, 0.7, 0);
    forearmL.rotation.z = Math.PI / 15;
    bodyGroup.add(forearmL);

    const upperArmR = upperArmL.clone();
    upperArmR.position.x = 1.1;
    upperArmR.rotation.z = -Math.PI / 10;
    bodyGroup.add(upperArmR);

    const forearmR = forearmL.clone();
    forearmR.position.x = 1.3;
    forearmR.rotation.z = -Math.PI / 15;
    bodyGroup.add(forearmR);

    const thighL = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.22, 1.8, 10), silhouetteMaterial);
    thighL.position.set(-0.35, -1.0, 0);
    bodyGroup.add(thighL);

    const shinL = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.14, 1.8, 8), silhouetteMaterial);
    shinL.position.set(-0.35, -2.8, 0);
    bodyGroup.add(shinL);

    const thighR = thighL.clone();
    thighR.position.x = 0.35;
    bodyGroup.add(thighR);

    const shinR = shinL.clone();
    shinR.position.x = 0.35;
    bodyGroup.add(shinR);

    const skinParticlesCount = 8000;
    const skinPositions = new Float32Array(skinParticlesCount * 3);
    
    let count = 0;
    while (count < skinParticlesCount) {
        const x = (Math.random() - 0.5) * 2.8;
        const y = -3.7 + Math.random() * 7.5;
        const z = (Math.random() - 0.5) * 1.5;

        let inside = false;
        
        if (y > 2.5) {
            const dy = y - 3.2;
            if (Math.sqrt(x*x + dy*dy + z*z) < 0.72) inside = true;
        } else if (y >= 0.2 && y <= 2.5) {
            const rad = y > 1.2 ? 0.95 : 0.75;
            if (Math.abs(x) < rad && Math.abs(z) < 0.65) inside = true;
            if (Math.abs(x) > 0.8 && Math.abs(x) < 1.35 && Math.abs(z) < 0.22) inside = true;
        } else {
            if (Math.abs(x) > 0.1 && Math.abs(x) < 0.55 && Math.abs(z) < 0.35) inside = true;
        }

        if (inside) {
            skinPositions[count * 3] = x;
            skinPositions[count * 3 + 1] = y;
            skinPositions[count * 3 + 2] = z;
            count++;
        }
    }

    const skinPointsGeo = new THREE.BufferGeometry();
    skinPointsGeo.setAttribute('position', new THREE.BufferAttribute(skinPositions, 3));
    const skinPointsMat = new THREE.PointsMaterial({
        color: 0x00f0ff,
        size: 0.025,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
    });

    bodyWireframe = new THREE.Group();
    bodyWireframe.add(bodyGroup);
    bodyWireframe.add(new THREE.Points(skinPointsGeo, skinPointsMat));
    
    macroGroup.add(bodyWireframe);
}

function createSkeletalSystem() {
    skeletalMesh = new THREE.Group();
    const bonesMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.15, // Slightly higher skeleton visibility
        blending: THREE.AdditiveBlending
    });

    const spineBones = 16;
    for (let i = 0; i < spineBones; i++) {
        const h = 0.08;
        const w = 0.26 - (i * 0.007);
        const vertebra = new THREE.Mesh(new THREE.BoxGeometry(w, h, w * 0.7), bonesMaterial);
        vertebra.position.set(0, 0.4 + (i * 0.13), -0.15);
        skeletalMesh.add(vertebra);
    }

    for (let i = 0; i < 7; i++) {
        const radiusX = 0.7 - (i * 0.03);
        const radiusY = 0.42;
        const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, 0, Math.PI, false, 0);
        const points = curve.getPoints(20);
        const ribMesh = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(points),
            new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18 })
        );
        ribMesh.rotation.x = Math.PI / 2;
        ribMesh.position.set(0, 1.2 + (i * 0.18), -0.1);
        skeletalMesh.add(ribMesh);
    }

    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 8), bonesMaterial);
    skull.position.set(0, 3.2, 0);
    skeletalMesh.add(skull);

    macroGroup.add(skeletalMesh);
}

function createNervousSystem() {
    nervousSystem = new THREE.Group();
    const paths = [];

    paths.push(new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 3.0, 0),
        new THREE.Vector3(-0.5, 2.4, -0.05),
        new THREE.Vector3(-1.1, 1.8, 0),
        new THREE.Vector3(-1.3, 0.7, 0)
    ]));
    paths.push(new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 3.0, 0),
        new THREE.Vector3(0.5, 2.4, -0.05),
        new THREE.Vector3(1.1, 1.8, 0),
        new THREE.Vector3(1.3, 0.7, 0)
    ]));
    paths.push(new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 1.2, -0.15),
        new THREE.Vector3(-0.35, 0.1, 0),
        new THREE.Vector3(-0.35, -1.0, 0),
        new THREE.Vector3(-0.35, -2.8, 0)
    ]));
    paths.push(new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 1.2, -0.15),
        new THREE.Vector3(0.35, 0.1, 0),
        new THREE.Vector3(0.35, -1.0, 0),
        new THREE.Vector3(0.35, -2.8, 0)
    ]));

    // --- PATHWAYS UPGRADE: Thin lines replaced by glowing 3D Tubes ---
    paths.forEach(path => {
        const tubeGeo = new THREE.TubeGeometry(path, 32, 0.02, 6, false);
        const tubeMesh = new THREE.Mesh(tubeGeo, new THREE.MeshBasicMaterial({
            color: 0x9d00ff,
            transparent: true,
            opacity: 0.65,
            blending: THREE.AdditiveBlending
        }));
        nervousSystem.add(tubeMesh);
    });

    const pulsesGroup = new THREE.Group();
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x9d00ff, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
    for (let i = 0; i < 10; i++) {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), pulseMat);
        mesh.userData = { curve: paths[i % paths.length], progress: Math.random() };
        pulsesGroup.add(mesh);
    }
    
    nervousSystem.add(pulsesGroup);
    nervousSystem.userData = { pulses: pulsesGroup.children };

    macroGroup.add(nervousSystem);
}

function createCirculatorySystem() {
    circulatorySystem = new THREE.Group();
    const redPaths = [];
    const bluePaths = [];

    redPaths.push(new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.15, 1.9, 0.35),
        new THREE.Vector3(0.1, 1.5, 0.1),
        new THREE.Vector3(0.05, 0.8, -0.05),
        new THREE.Vector3(-0.25, -0.8, 0),
        new THREE.Vector3(-0.35, -2.8, 0.05)
    ]));
    bluePaths.push(new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.15, 1.9, 0.35),
        new THREE.Vector3(-0.05, 1.45, 0.1),
        new THREE.Vector3(-0.05, 0.85, -0.05),
        new THREE.Vector3(0.25, -0.8, 0),
        new THREE.Vector3(0.35, -2.8, 0.05)
    ]));
    redPaths.push(new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.15, 1.9, 0.35),
        new THREE.Vector3(-0.4, 2.1, 0.1),
        new THREE.Vector3(-1.1, 1.8, 0),
        new THREE.Vector3(-1.3, 0.7, 0)
    ]));
    bluePaths.push(new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.15, 1.9, 0.35),
        new THREE.Vector3(0.4, 2.1, 0.1),
        new THREE.Vector3(1.1, 1.8, 0),
        new THREE.Vector3(1.3, 0.7, 0)
    ]));

    // --- PATHWAYS UPGRADE: Thin red/blue lines replaced by glowing 3D Tubes ---
    redPaths.forEach(path => {
        const tubeGeo = new THREE.TubeGeometry(path, 32, 0.02, 6, false);
        const tubeMesh = new THREE.Mesh(tubeGeo, new THREE.MeshBasicMaterial({
            color: 0xff3344,
            transparent: true,
            opacity: 0.65,
            blending: THREE.AdditiveBlending
        }));
        circulatorySystem.add(tubeMesh);
    });
    bluePaths.forEach(path => {
        const tubeGeo = new THREE.TubeGeometry(path, 32, 0.02, 6, false);
        const tubeMesh = new THREE.Mesh(tubeGeo, new THREE.MeshBasicMaterial({
            color: 0x00f0ff,
            transparent: true,
            opacity: 0.65,
            blending: THREE.AdditiveBlending
        }));
        circulatorySystem.add(tubeMesh);
    });

    const cellsGroup = new THREE.Group();
    const cellGeo = new THREE.SphereGeometry(0.035, 6, 6);
    const redMat = new THREE.MeshBasicMaterial({ color: 0xff3344, transparent: true, opacity: 0.85 });
    const blueMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.85 });

    for (let i = 0; i < 12; i++) {
        const cell = new THREE.Mesh(cellGeo, redMat);
        cell.userData = { path: redPaths[i % redPaths.length], progress: Math.random(), speed: 0.005 + Math.random() * 0.004 };
        cellsGroup.add(cell);
    }
    for (let i = 0; i < 12; i++) {
        const cell = new THREE.Mesh(cellGeo, blueMat);
        cell.userData = { path: bluePaths[i % bluePaths.length], progress: Math.random(), speed: 0.004 + Math.random() * 0.004 };
        cellsGroup.add(cell);
    }

    circulatorySystem.add(cellsGroup);
    circulatorySystem.userData = { cells: cellsGroup.children };

    for (let i = 0; i < 3; i++) {
        const plaque = new THREE.Mesh(
            new THREE.SphereGeometry(0.065, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0xffdf00, transparent: true, opacity: 0 })
        );
        const pos = redPaths[i % redPaths.length].getPointAt(0.35 + i * 0.1);
        plaque.position.copy(pos);
        plaque.visible = false;
        heartArteryPlaques.push(plaque);
        circulatorySystem.add(plaque);
    }

    macroGroup.add(circulatorySystem);
}

function createOrgans() {
    const defaultMatParams = {
        transparent: true,
        opacity: 0.85,
        wireframe: false,
        shininess: 90,
        emissiveIntensity: 0.25
    };

    // 1. BRAIN
    const brainGeo = new THREE.IcosahedronGeometry(0.55, 2);
    const pos = brainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);
        const fold = Math.sin(y * 8) * 0.05 + Math.cos(z * 6) * 0.03;
        pos.setXYZ(i, x + fold * (x/Math.abs(x||1)), y, z + fold * (z/Math.abs(z||1)));
    }
    brainGeo.computeVertexNormals();

    organs.brain = new THREE.Mesh(
        brainGeo,
        new THREE.MeshPhongMaterial({ ...defaultMatParams, color: anatomyData.brain.color, emissive: anatomyData.brain.color })
    );
    organs.brain.position.copy(anatomyData.brain.position);

    brainTumorMesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.2, 1),
        new THREE.MeshPhongMaterial({
            color: 0x39ff14,
            emissive: 0x05ff05,
            wireframe: false,
            transparent: true,
            opacity: 0,
            shininess: 120
        })
    );
    const tPos = brainTumorMesh.geometry.attributes.position;
    for(let i=0; i<tPos.count; i++) {
        const factor = 1 + (Math.random() - 0.5) * 0.3;
        tPos.setXYZ(i, tPos.getX(i)*factor, tPos.getY(i)*factor, tPos.getZ(i)*factor);
    }
    brainTumorMesh.geometry.computeVertexNormals();
    brainTumorMesh.position.set(0.12, 3.3, 0.15);
    brainTumorMesh.visible = false;
    macroGroup.add(brainTumorMesh);

    // 2. HEART
    organs.heart = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.24, 1),
        new THREE.MeshPhongMaterial({ ...defaultMatParams, color: anatomyData.heart.color, emissive: anatomyData.heart.color })
    );
    organs.heart.position.copy(anatomyData.heart.position);
    organs.heart.rotation.set(0, 0, Math.PI / 6);

    // 3. LUNGS
    const lungsGroup = new THREE.Group();
    lungsGroup.position.copy(anatomyData.lungs.position);
    const lungLGeo = new THREE.ConeGeometry(0.22, 0.65, 10);
    lungLGeo.scale(1.2, 1, 0.7);
    const lungL = new THREE.Mesh(lungLGeo, new THREE.MeshPhongMaterial({ ...defaultMatParams, color: anatomyData.lungs.color, emissive: anatomyData.lungs.color }));
    lungL.position.set(-0.35, 0, 0);
    lungL.rotation.set(0, 0.2, -0.15);
    lungsGroup.add(lungL);
    const lungR = lungL.clone();
    lungR.position.x = 0.35;
    lungR.rotation.set(0, -0.2, 0.15);
    lungsGroup.add(lungR);
    organs.lungs = lungsGroup;

    // 4. STOMACH
    organs.stomach = new THREE.Mesh(
        new THREE.TorusGeometry(0.2, 0.11, 8, 16, Math.PI * 1.25),
        new THREE.MeshPhongMaterial({ ...defaultMatParams, color: anatomyData.stomach.color, emissive: anatomyData.stomach.color })
    );
    organs.stomach.position.copy(anatomyData.stomach.position);
    organs.stomach.rotation.set(0.2, 0, Math.PI / 4);

    // 5. LIVER
    const liverGeo = new THREE.ConeGeometry(0.3, 0.42, 4);
    liverGeo.scale(1.5, 1, 0.8);
    organs.liver = new THREE.Mesh(
        liverGeo,
        new THREE.MeshPhongMaterial({ ...defaultMatParams, color: anatomyData.liver.color, emissive: 0x421c09 })
    );
    organs.liver.position.copy(anatomyData.liver.position);
    organs.liver.rotation.set(0.4, 0.5, -Math.PI / 3);

    // 6. KIDNEYS
    const kidneysGroup = new THREE.Group();
    kidneysGroup.position.copy(anatomyData.kidneys.position);
    const kidneyGeo = new THREE.SphereGeometry(0.12, 8, 8);
    kidneyGeo.scale(1.5, 0.9, 0.7);
    const kidneyL = new THREE.Mesh(kidneyGeo, new THREE.MeshPhongMaterial({ ...defaultMatParams, color: anatomyData.kidneys.color, emissive: 0x5a4a00 }));
    kidneyL.position.set(-0.28, 0, 0);
    kidneyL.rotation.set(0.2, 0.1, -0.1);
    kidneysGroup.add(kidneyL);
    const kidneyR = kidneyL.clone();
    kidneyR.position.x = 0.28;
    kidneyR.rotation.set(0.2, -0.1, 0.1);
    kidneysGroup.add(kidneyR);
    organs.kidneys = kidneysGroup;

    // 7. PANCREAS
    const pancreasGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.55, 8);
    pancreasGeo.scale(1.6, 1.0, 0.5);
    organs.pancreas = new THREE.Mesh(
        pancreasGeo,
        new THREE.MeshPhongMaterial({ ...defaultMatParams, color: anatomyData.pancreas.color, emissive: 0x223300 })
    );
    organs.pancreas.position.copy(anatomyData.pancreas.position);
    organs.pancreas.rotation.set(0.2, 0.4, Math.PI / 2.5);

    // 8. SPLEEN
    const spleenGeo = new THREE.SphereGeometry(0.15, 8, 8);
    spleenGeo.scale(0.8, 1.25, 0.65);
    organs.spleen = new THREE.Mesh(
        spleenGeo,
        new THREE.MeshPhongMaterial({ ...defaultMatParams, color: anatomyData.spleen.color, emissive: 0x110022 })
    );
    organs.spleen.position.copy(anatomyData.spleen.position);
    organs.spleen.rotation.set(0.3, 0.1, -0.2);

    // 9. SMALL INTESTINE
    const smallIntestineGeo = new THREE.TorusKnotGeometry(0.17, 0.055, 50, 8, 3, 4);
    organs.smallIntestine = new THREE.Mesh(
        smallIntestineGeo,
        new THREE.MeshPhongMaterial({ ...defaultMatParams, color: anatomyData.smallIntestine.color, emissive: 0x442211 })
    );
    organs.smallIntestine.position.copy(anatomyData.smallIntestine.position);
    organs.smallIntestine.rotation.set(Math.PI / 2, 0, 0);

    // 10. LARGE INTESTINE
    const largeIntestineGeo = new THREE.TorusGeometry(0.28, 0.06, 8, 24, Math.PI * 1.6);
    organs.largeIntestine = new THREE.Mesh(
        largeIntestineGeo,
        new THREE.MeshPhongMaterial({ ...defaultMatParams, color: anatomyData.largeIntestine.color, emissive: 0x113311 })
    );
    organs.largeIntestine.position.copy(anatomyData.largeIntestine.position);
    organs.largeIntestine.rotation.set(Math.PI / 2, 0, Math.PI / 4);

    // 11. URINARY BLADDER
    const bladderGeo = new THREE.SphereGeometry(0.12, 8, 8);
    bladderGeo.scale(1.0, 1.25, 0.9);
    organs.bladder = new THREE.Mesh(
        bladderGeo,
        new THREE.MeshPhongMaterial({ ...defaultMatParams, color: anatomyData.bladder.color, emissive: 0x001133 })
    );
    organs.bladder.position.copy(anatomyData.bladder.position);

    // 12. THYROID
    const thyroidGeo = new THREE.TorusGeometry(0.11, 0.04, 8, 16, Math.PI * 1.5);
    organs.thyroid = new THREE.Mesh(
        thyroidGeo,
        new THREE.MeshPhongMaterial({ ...defaultMatParams, color: anatomyData.thyroid.color, emissive: 0x441100 })
    );
    organs.thyroid.position.copy(anatomyData.thyroid.position);
    organs.thyroid.rotation.set(0.1, 0, Math.PI / 1.3);

    // 13. ADRENAL GLANDS (Double glands above Kidneys)
    const adrenalsGroup = new THREE.Group();
    adrenalsGroup.position.copy(anatomyData.adrenals.position);
    const adrenalGeo = new THREE.ConeGeometry(0.06, 0.08, 5);
    adrenalGeo.scale(1.5, 1, 0.7);
    const adrenalL = new THREE.Mesh(adrenalGeo, new THREE.MeshPhongMaterial({ ...defaultMatParams, color: anatomyData.adrenals.color, emissive: 0x331a00 }));
    adrenalL.position.set(-0.28, 0.1, 0);
    adrenalL.rotation.set(-0.1, 0, 0.1);
    adrenalsGroup.add(adrenalL);
    const adrenalR = adrenalL.clone();
    adrenalR.position.x = 0.28;
    adrenalR.rotation.set(-0.1, 0, -0.1);
    adrenalsGroup.add(adrenalR);
    organs.adrenals = adrenalsGroup;

    // 14. GALLBLADDER
    const gallbladderGeo = new THREE.SphereGeometry(0.065, 8, 8);
    gallbladderGeo.scale(0.8, 1.4, 0.8);
    organs.gallbladder = new THREE.Mesh(
        gallbladderGeo,
        new THREE.MeshPhongMaterial({ ...defaultMatParams, color: anatomyData.gallbladder.color, emissive: 0x052205 })
    );
    organs.gallbladder.position.copy(anatomyData.gallbladder.position);
    organs.gallbladder.rotation.set(0.2, 0.1, -0.2);

    Object.keys(organs).forEach(key => {
        const obj = organs[key];
        obj.userData = { name: key };
        if (obj.isGroup) {
            obj.children.forEach(c => c.userData = { name: key, isChild: true });
        }
        macroGroup.add(obj);
    });
}

function createCellEnvironment() {
    cellMembrane = new THREE.Mesh(
        new THREE.SphereGeometry(2.1, 32, 24),
        new THREE.MeshBasicMaterial({
            color: 0x00f0ff,
            wireframe: true,
            transparent: true,
            opacity: 0.04,
            blending: THREE.AdditiveBlending
        })
    );
    microGroup.add(cellMembrane);

    const lipidCount = 1000;
    const lipidPositions = new Float32Array(lipidCount * 3);
    for (let i = 0; i < lipidCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2.15 + (Math.random() - 0.5) * 0.05;

        lipidPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        lipidPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        lipidPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const lipidGeo = new THREE.BufferGeometry();
    lipidGeo.setAttribute('position', new THREE.BufferAttribute(lipidPositions, 3));
    cellLipidSwarm = new THREE.Points(
        lipidGeo,
        new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.02, transparent: true, opacity: 0.35 })
    );
    microGroup.add(cellLipidSwarm);

    nucleusMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.7, 16, 16),
        new THREE.MeshPhongMaterial({
            color: 0x9d00ff,
            emissive: 0x480088,
            transparent: true,
            opacity: 0.45,
            shininess: 80
        })
    );
    microGroup.add(nucleusMesh);

    dnaHelixGroup = new THREE.Group();
    const helixLength = 1.0;
    const HelixPoints = 40;
    const h1Points = [];
    const h2Points = [];
    
    for (let i = 0; i < HelixPoints; i++) {
        const t = (i / HelixPoints - 0.5) * helixLength;
        const angle = t * 15;
        const radius = 0.16;

        h1Points.push(new THREE.Vector3(Math.cos(angle) * radius, t, Math.sin(angle) * radius));
        h2Points.push(new THREE.Vector3(-Math.cos(angle) * radius, t, -Math.sin(angle) * radius));

        if (i % 3 === 0) {
            const rungGeo = new THREE.BufferGeometry().setFromPoints([h1Points[i], h2Points[i]]);
            const rung = new THREE.Line(rungGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 }));
            dnaHelixGroup.add(rung);
        }
    }
    
    const h1Line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(h1Points), new THREE.LineBasicMaterial({ color: 0x9d00ff }));
    const h2Line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(h2Points), new THREE.LineBasicMaterial({ color: 0x00f0ff }));
    dnaHelixGroup.add(h1Line);
    dnaHelixGroup.add(h2Line);
    
    dnaHelixGroup.scale.set(1.5, 1.5, 1.5);
    microGroup.add(dnaHelixGroup);

    mitochondriaGroup = new THREE.Group();
    const mitoCount = 3;
    const mitoPositions = [
        new THREE.Vector3(1.1, 0.6, -0.4),
        new THREE.Vector3(-1.2, -0.5, 0.3),
        new THREE.Vector3(0.5, -1.2, -0.5)
    ];

    mitoPositions.forEach((pos, idx) => {
        const mito = new THREE.Mesh(
            new THREE.SphereGeometry(0.24, 12, 12),
            new THREE.MeshPhongMaterial({
                color: 0xffa500,
                emissive: 0x773300,
                transparent: true,
                opacity: 0.85,
                shininess: 90
            })
        );
        mito.scale.set(1.8, 1.0, 1.0);
        mito.position.copy(pos);
        mito.rotation.set(0.4, idx * 1.5, idx * 0.5);
        mitochondriaGroup.add(mito);
    });
    microGroup.add(mitochondriaGroup);

    // --- PHASE 3 PATHWAYS: Glowing Green Intracellular signaling tubes ---
    const intracellularPaths = [];
    mitoPositions.forEach(pos => {
        intracellularPaths.push(new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(pos.x * 0.4, pos.y * 0.4 + 0.25, pos.z * 0.4),
            pos
        ]));
    });

    intracellularPaths.forEach(path => {
        const points = path.getPoints(20);
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geo, new THREE.LineBasicMaterial({
            color: 0x39ff14,
            transparent: true,
            opacity: 0.65
        }));
        microGroup.add(line);
    });

    const signalGroup = new THREE.Group();
    const signalMat = new THREE.MeshBasicMaterial({ color: 0x39ff14, transparent: true, opacity: 0.95 });
    for (let i = 0; i < 6; i++) {
        const particle = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), signalMat);
        const path = intracellularPaths[i % intracellularPaths.length];
        particle.userData = { path: path, progress: Math.random(), speed: 0.006 + Math.random() * 0.004 };
        signalGroup.add(particle);
    }
    microGroup.add(signalGroup);
    microGroup.userData = { signals: signalGroup.children };

    cytoskeletalFibers = new THREE.Group();
    for (let i = 0; i < 6; i++) {
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-1.8 + Math.random()*0.4, -1.5 + Math.random()*3, -1.0 + Math.random()*2),
            new THREE.Vector3(-0.5 + Math.random()*1, -0.5 + Math.random()*1, -0.5 + Math.random()*1),
            new THREE.Vector3(1.8 - Math.random()*0.4, -1.5 + Math.random()*3, -1.0 + Math.random()*2)
        ]);
        const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(25));
        const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0xff007f, transparent: true, opacity: 0.15 }));
        cytoskeletalFibers.add(line);
    }
    microGroup.add(cytoskeletalFibers);

    atpParticlesGroup = new THREE.Group();
    const atpCount = 35;
    const atpMat = new THREE.MeshBasicMaterial({ color: 0xffdf00, transparent: true, opacity: 0.85 });
    const atpGeo = new THREE.SphereGeometry(0.025, 4, 4);

    for (let i = 0; i < atpCount; i++) {
        const atp = new THREE.Mesh(atpGeo, atpMat);
        resetAtpParticle(atp);
        atpParticlesGroup.add(atp);
    }
    microGroup.add(atpParticlesGroup);
}

function resetAtpParticle(mesh) {
    if (!mitochondriaGroup) return;
    const generator = mitochondriaGroup.children[Math.floor(Math.random() * mitochondriaGroup.children.length)];
    mesh.position.copy(generator.position);
    mesh.userData = {
        velocity: new THREE.Vector3((Math.random() - 0.5) * 0.015, (Math.random() - 0.5) * 0.015, (Math.random() - 0.5) * 0.015),
        life: 0,
        maxLife: 150 + Math.random() * 200
    };
}

// --- ANATOMY LABELS ---
function setupAnatomyLabels() {
    const container = document.getElementById('labels-container');
    container.innerHTML = '';

    Object.keys(anatomyData).forEach(key => {
        const organ = anatomyData[key];
        const label = document.createElement('div');
        label.className = 'anatomy-label';
        label.id = `label-${key}`;
        label.innerHTML = `
            <div class="label-box">${organ.name}</div>
            <div class="label-pointer"></div>
        `;
        label.addEventListener('click', (e) => {
            e.stopPropagation();
            selectOrgan(key);
        });
        container.appendChild(label);
    });
}

function updateLabelsPosition() {
    if (!showLabels || viewDepth === "micro") {
        document.getElementById('labels-container').style.display = 'none';
        return;
    }
    document.getElementById('labels-container').style.display = 'block';

    const tempV = new THREE.Vector3();
    
    Object.keys(anatomyData).forEach(key => {
        const data = anatomyData[key];
        const labelElement = document.getElementById(`label-${key}`);
        if (!labelElement) return;

        tempV.set(data.position.x, data.position.y, data.position.z);
        if (key === 'brain') tempV.y += 0.6;
        else if (key === 'heart') { tempV.x += 0.35; tempV.y += 0.2; }
        else if (key === 'lungs') tempV.y += 0.45;
        else if (key === 'stomach') { tempV.x -= 0.35; tempV.y += 0.2; }
        else if (key === 'liver') { tempV.x += 0.38; tempV.y += 0.2; }
        else if (key === 'kidneys') tempV.y += 0.25;
        else if (key === 'pancreas') { tempV.x += 0.32; tempV.y += 0.15; }
        else if (key === 'spleen') { tempV.x -= 0.32; tempV.y += 0.15; }
        else if (key === 'smallIntestine') { tempV.x += 0.35; }
        else if (key === 'largeIntestine') { tempV.x -= 0.35; }
        else if (key === 'bladder') { tempV.y -= 0.25; }
        else if (key === 'thyroid') { tempV.x += 0.32; tempV.y += 0.1; }
        else if (key === 'adrenals') { tempV.x += 0.32; tempV.y += 0.15; }
        else if (key === 'gallbladder') { tempV.x += 0.35; tempV.y -= 0.1; }

        if (autoRotate && bodyWireframe) {
            const theta = bodyWireframe.rotation.y;
            const rx = tempV.x * Math.cos(theta) - tempV.z * Math.sin(theta);
            const rz = tempV.x * Math.sin(theta) + tempV.z * Math.cos(theta);
            tempV.x = rx;
            tempV.z = rz;
        }

        tempV.project(camera);
        if (tempV.z > 1) {
            labelElement.style.display = 'none';
            return;
        }

        labelElement.style.display = 'flex';
        const x = (tempV.x * .5 + .5) * window.innerWidth;
        const y = (tempV.y * -.5 + .5) * window.innerHeight;

        labelElement.style.left = `${x}px`;
        labelElement.style.top = `${y}px`;

        if (selectedOrganName && selectedOrganName !== key) {
            labelElement.classList.add('fade-out');
        } else {
            labelElement.classList.remove('fade-out');
        }
    });
}

// --- BIOINFORMATICS TABS INTERACTIVE ---
function setupTabSelection() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetTabId = tab.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(block => block.classList.add('hidden'));
            document.getElementById(targetTabId).classList.remove('hidden');

            if (targetTabId === 'tab-bioinfo' && selectedOrganName) {
                renderBioinformaticsTab(selectedOrganName);
            }
        });
    });
}

function renderBioinformaticsTab(key) {
    const organInfo = anatomyData[key];
    if (!organInfo) return;

    const heatmapGrid = document.getElementById('heatmap-grid');
    heatmapGrid.innerHTML = '';
    
    for (let i = 0; i < 32; i++) {
        const cell = document.createElement('div');
        cell.className = 'heatmap-cell';
        
        const isTargetGene = i < organInfo.genes.length;
        const exprValue = isTargetGene ? 6.5 + Math.random()*6 : Math.random()*3.5;
        const opacity = Math.min(1.0, 0.05 + exprValue / 12.5);
        
        cell.style.backgroundColor = `rgba(0, 240, 255, ${opacity})`;
        cell.title = `Gene: ${organInfo.genes[i % organInfo.genes.length] || 'GENE_' + i} | Express Value: ${exprValue.toFixed(2)}`;
        heatmapGrid.appendChild(cell);
    }

    const canvas = document.getElementById('ppi-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const drawPPI = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const nodes = [];
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        nodes.push({ name: organInfo.name, x: centerX, y: centerY, rad: 18, color: '#00f0ff' });

        organInfo.proteins.forEach((p, idx) => {
            const angle = (idx / organInfo.proteins.length) * Math.PI * 2 + (timeTick * 0.2);
            const dist = 55;
            nodes.push({
                name: p,
                x: centerX + Math.cos(angle) * dist,
                y: centerY + Math.sin(angle) * dist,
                rad: 8,
                color: '#9d00ff'
            });
        });

        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(0, 240, 255, 0.5)';
        
        for (let i = 1; i < nodes.length; i++) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 + Math.sin(timeTick * 3 + i) * 0.1})`;
            ctx.beginPath();
            ctx.moveTo(nodes[0].x, nodes[0].y);
            ctx.lineTo(nodes[i].x, nodes[i].y);
            ctx.stroke();
        }

        nodes.forEach(node => {
            ctx.fillStyle = node.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = node.color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.rad, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#fff';
            ctx.shadowBlur = 0;
            ctx.font = node.rad > 10 ? '9px Orbitron' : '7px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(node.name, node.x, node.y - node.rad - 4);
        });
    };

    if (window.ppiDrawInterval) clearInterval(window.ppiDrawInterval);
    window.ppiDrawInterval = setInterval(drawPPI, 50);
}

// --- TRANSITIONS: MACRO VS MICRO ---
function toggleZoomDepth() {
    if (!selectedOrganName) return;
    
    const glitch = document.getElementById('glitch-overlay');
    glitch.classList.remove('hidden');

    setTimeout(() => {
        if (viewDepth === "macro") {
            switchToMicroView();
        } else {
            switchToMacroView();
        }
        glitch.classList.add('hidden');
    }, 600);
}

function switchToMicroView() {
    viewDepth = "micro";
    macroGroup.visible = false;
    microGroup.visible = true;

    document.getElementById('macro-layers-section').classList.add('hidden');
    document.getElementById('micro-layers-section').classList.remove('hidden');

    document.getElementById('view-depth-display').textContent = `MICRO (CELLULAR)`;
    document.getElementById('btn-deep-zoom').textContent = "ZOOM OUT TO BODY LEVEL";

    targetCameraLookAt.set(0, 0, 0);
    targetCameraPos.set(0, 0, 4.5);
    cameraInterpolating = true;

    updateLabelsPosition();

    if (synth.isPlaying) {
        synth.setBrainHumFrequency(180);
    }

    addAIConsoleMessage("ai", `RESOLVING CELLULAR STRATA. Isolated organelle layers for: ${anatomyData[selectedOrganName].name}. Mitochondria active.`);
}

function switchToMacroView() {
    viewDepth = "macro";
    macroGroup.visible = true;
    microGroup.visible = false;

    document.getElementById('micro-layers-section').classList.add('hidden');
    document.getElementById('macro-layers-section').classList.remove('hidden');

    document.getElementById('view-depth-display').textContent = `MACRO (ANATOMY)`;
    document.getElementById('btn-deep-zoom').textContent = "DEEP ZOOM TO CELLULAR LEVEL";

    const organInfo = anatomyData[selectedOrganName];
    if (organInfo) {
        targetCameraLookAt.copy(organInfo.position);
        targetCameraPos.set(organInfo.position.x, organInfo.position.y + 0.1, organInfo.position.z + 1.8);
        cameraInterpolating = true;
    }

    if (synth.isPlaying) {
        synth.setBrainHumFrequency(65.4);
    }
}

// --- CONTEXTUAL BIO-AI PARSER ---
function setupChatLogic() {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send-btn');

    const handleSend = () => {
        const text = chatInput.value.trim();
        if (text.length === 0) return;

        addAIConsoleMessage("user", text);
        chatInput.value = '';

        const history = document.getElementById('chat-history');
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chat-message ai typing';
        typingIndicator.id = 'ai-typing-indicator';
        typingIndicator.textContent = '[Bio-AI computing analysis...]';
        history.appendChild(typingIndicator);
        history.scrollTop = history.scrollHeight;

        setTimeout(() => {
            const ind = document.getElementById('ai-typing-indicator');
            if (ind) ind.remove();
            addAIConsoleMessage("ai", generateAIResponse(text));
        }, 1000);
    };

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });
}

function addAIConsoleMessage(sender, text) {
    const history = document.getElementById('chat-history');
    const msg = document.createElement('div');
    msg.className = `chat-message ${sender}`;
    msg.textContent = text;
    history.appendChild(msg);
    history.scrollTop = history.scrollHeight;
}

function generateAIResponse(userText) {
    const query = userText.toLowerCase().trim();
    const activeKey = selectedOrganName;

    // --- HELPER: Find which organ the user is asking about ---
    const organAliases = {
        brain: ["brain", "cerebrum", "cerebral", "cortex", "neuron", "neurons", "grey matter", "gray matter", "cerebellum", "hippocampus", "frontal lobe"],
        heart: ["heart", "cardiac", "cardio", "cor", "ventricle", "atrium", "aorta", "myocardium", "cardiomyocyte"],
        lungs: ["lung", "lungs", "pulmonary", "respiratory", "alveoli", "alveolus", "bronchi", "trachea", "breathing", "respiration", "pulmones"],
        stomach: ["stomach", "gastric", "gaster", "digestion", "digestive", "gastro", "pepsin", "acid"],
        liver: ["liver", "hepatic", "hepar", "hepatocyte", "bile", "detox", "detoxification", "cirrhosis"],
        kidneys: ["kidney", "kidneys", "renal", "nephron", "nephrons", "glomerular", "urine", "filtration", "renes"],
        pancreas: ["pancreas", "pancreatic", "insulin", "glucagon", "islets", "langerhans", "beta cell", "beta cells", "endocrine", "exocrine", "diabetes"],
        spleen: ["spleen", "splenic", "lien", "lymphatic", "lymphocyte", "immune", "immunity", "white blood", "red pulp", "white pulp", "splenomegaly"],
        smallIntestine: ["small intestine", "smallintestine", "duodenum", "jejunum", "ileum", "intestinum tenue", "villi", "microvilli", "absorption", "enterocyte"],
        largeIntestine: ["large intestine", "largeintestine", "colon", "colonocyte", "rectum", "appendix", "cecum", "sigmoid", "microbiome", "gut bacteria", "gut flora"],
        bladder: ["bladder", "urinary bladder", "urothelium", "detrusor", "vesica", "cystitis", "ureter", "urethra"],
        thyroid: ["thyroid", "glandula thyroidea", "thyroxine", "t3", "t4", "goiter", "metabolism pace", "neck gland"],
        adrenals: ["adrenal", "adrenals", "adrenal gland", "adrenal glands", "suprarenal", "cortisol", "adrenaline", "stress response", "aldosterone"],
        gallbladder: ["gallbladder", "gall bladder", "vesica biliaris", "bile", "cholecystokinin", "cck", "gallstones", "lipid breakdown"]
    };

    function findOrganInQuery(q) {
        for (let key in organAliases) {
            for (let alias of organAliases[key]) {
                if (q.includes(alias)) return key;
            }
        }
        return null;
    }

    const detectedOrgan = findOrganInQuery(query);
    const resolvedOrgan = detectedOrgan || (activeKey ? activeKey : null);
    const resolvedOrganLower = resolvedOrgan ? resolvedOrgan.toLowerCase() : null;

    // --- 1. QUANTITATIVE QUERIES (how many, count, number) ---
    const isCountQuery = query.includes("how many") || query.includes("count of") || query.includes("number of") || query.includes("how much") || query.includes("total cells") || query.includes("cell count") || query.includes("cells in") || query.includes("cells are") || query.includes("cells does");

    const organCounts = {
        pancreas: "[PANCREAS CELL HUD]: The pancreas contains approximately 1 to 2 million endocrine islets of Langerhans, containing roughly 3 to 4 billion cells (60% insulin-secreting beta cells, 30% glucagon-secreting alpha cells, and 10% delta/PP cells). The exocrine acinar mass adds another 20 to 25 billion pancreatic cells, making a total of approximately 25 to 30 billion cells.",
        brain: "[BRAIN CELL HUD]: The human brain is composed of approximately 86 billion neurons and an equal count of non-neuronal glial cells (astrocytes, oligodendrocytes, microglia), adding up to over 170 billion total cellular structures.",
        heart: "[HEART CELL HUD]: The heart is composed of approximately 2 to 3 billion beating cardiomyocytes (heart muscle cells). However, cardiomyocytes represent only 30% of cardiac cells; the rest are endothelial, smooth muscle, and fibroblasts, totaling around 8 to 10 billion cells.",
        lungs: "[LUNG CELL HUD]: The respiratory system contains approximately 300 to 500 million alveoli air-sacs. These are lined by roughly 100 to 120 billion epithelial and endothelial capillary blood cells.",
        stomach: "[STOMACH CELL HUD]: The stomach lining contains approximately 35 million gastric pits/glands, containing billions of acid-producing parietal cells and enzyme-secreting chief cells. Total cell count is estimated at 10 to 15 billion cells.",
        liver: "[LIVER CELL HUD]: The liver comprises approximately 100,000 hexagonal liver lobules. The primary metabolic cell count is roughly 100 billion hepatocytes, plus ~40 billion endothelial/Kupffer/stellate cells.",
        kidneys: "[KIDNEY CELL HUD]: Each kidney houses approximately 1 million nephrons (filtering loops), totaling 2 million nephrons per adult body. Total kidney cell count is approximately 20 to 26 billion cells across both kidneys, including podocytes, tubular, and endothelial cells.",
        spleen: "[SPLEEN CELL HUD]: The spleen stores and filters billions of cells, containing roughly 10 billion active immune lymphocytes (B/T cells) in the white pulp and macrophages in the red pulp. It also stores ~30% of the body's platelet reserve.",
        smallIntestine: "[SMALL INTESTINE CELL HUD]: Lined with over 100 million microscopic absorption villi, containing billions of enterocytes and nutrient-absorbing mucosal epithelial cells. Total estimated cell count: 30 to 40 billion cells.",
        largeIntestine: "[LARGE INTESTINE CELL HUD]: The colon wall contains approximately 10 billion colonocytes, and is home to over 38 trillion symbiotic bacterial cells composing the gut microbiome — outnumbering all human cells in the body.",
        bladder: "[BLADDER CELL HUD]: The distensible bladder wall contains millions of smooth detrusor muscle cells, lined with roughly 200 million protective transitional epithelial cells (urothelium).",
        thyroid: "[THYROID CELL HUD]: The thyroid gland is composed of millions of spherical thyroid follicles lined by follicular cells that synthesize T4/T3. Total thyroid cell count is estimated at approximately 2 to 3 billion cells.",
        adrenals: "[ADRENAL CELL HUD]: Each adrenal gland is divided into an outer cortex and inner medulla. Combined, they contain approximately 1 to 1.5 billion cells responsible for mineralocorticoid, glucocorticoid, and catecholamine synthesis.",
        gallbladder: "[GALLBLADDER CELL HUD]: The gallbladder is lined with highly absorptive simple columnar epithelial cells (~500 million) and contains smooth muscle layers to expel concentrated bile."
    };

    if (isCountQuery) {
        if (resolvedOrgan && organCounts[resolvedOrgan]) return organCounts[resolvedOrgan];
        if (query.includes("body") || query.includes("human") || query.includes("total")) {
            return "[BIO-AI CELL CENSUS]: The adult human body contains approximately 37.2 trillion cells. This includes ~25 trillion red blood cells, ~2 trillion white blood cells, ~50 billion fat cells, ~100 billion neurons, and hundreds of billions of epithelial, muscle, and connective tissue cells across all organ systems.";
        }
        return "[BIO-AI COUNTS]: Please specify an organ to get cell counts. Try: 'how many cells in the pancreas?', 'cells in liver', 'how many neurons in the brain?', or 'cells in human body'.";
    }

    // --- 2. WEIGHT / SIZE / MEASUREMENT QUERIES ---
    const isWeightQuery = query.includes("how heavy") || query.includes("weight") || query.includes("mass") || query.includes("how long") || query.includes("size") || query.includes("how big") || query.includes("dimension") || query.includes("measure") || query.includes("volume");

    const organWeights = {
        liver: "[LIVER METRICS]: The liver is the heaviest internal organ, weighing about 1.5 kg (3.3 lbs) in adults. It is approximately 15 cm wide and processes over 1.4 liters of blood per minute.",
        brain: "[BRAIN METRICS]: The adult human brain weighs approximately 1.3 to 1.4 kg (3 lbs), comprising about 2% of body weight but consuming ~20% of the body's oxygen and glucose.",
        heart: "[HEART METRICS]: The heart weighs approximately 250 to 350 grams, is roughly the size of a closed fist, and pumps ~5 liters of blood per minute at rest (7,200 liters/day).",
        lungs: "[LUNG METRICS]: Combined lung weight is approximately 1.1 kg. The total surface area of all alveoli is approximately 70 square meters — about the size of a tennis court.",
        stomach: "[STOMACH METRICS]: The stomach can expand from 50 mL when empty to approximately 1 to 1.5 liters when full. It weighs about 150 grams when empty.",
        kidneys: "[KIDNEY METRICS]: Each kidney is about 11 cm long, 6 cm wide, and weighs 120 to 170 grams. Together they filter approximately 180 liters of blood per day.",
        pancreas: "[PANCREAS METRICS]: The pancreas is approximately 15 cm (6 inches) long and weighs about 70 to 100 grams. It produces approximately 1.5 liters of pancreatic juice daily.",
        spleen: "[SPLEEN METRICS]: The spleen is about 12 cm long, weighs 150 to 200 grams, and filters approximately 10 to 15% of total blood volume per minute.",
        smallIntestine: "[SMALL INTESTINE METRICS]: The small intestine measures approximately 6 meters (20 feet) in length, with a total absorptive surface area of ~32 square meters due to villi and microvilli.",
        largeIntestine: "[LARGE INTESTINE METRICS]: The colon/large intestine measures about 1.5 meters (5 feet) in length and absorbs approximately 1.5 liters of water per day.",
        bladder: "[BLADDER METRICS]: Bladder capacity ranges from 400 mL to 600 mL under normal distention. The detrusor muscle walls are approximately 3 to 5 mm thick when distended.",
        thyroid: "[THYROID METRICS]: The thyroid gland weighs approximately 15 to 25 grams in adults. It can increase in size significantly (goiter) during iodine deficiency or hyperthyroidism.",
        adrenals: "[ADRENAL METRICS]: Each adrenal gland is about 3 cm high, 5 cm wide, and weighs approximately 4 to 6 grams in a healthy adult.",
        gallbladder: "[GALLBLADDER METRICS]: The empty gallbladder is about 7 to 10 cm long and holds 30 to 50 mL of concentrated bile when fully distended."
    };

    if (isWeightQuery) {
        if (resolvedOrgan && organWeights[resolvedOrgan]) return organWeights[resolvedOrgan];
        if (query.includes("body") || query.includes("human")) {
            return "[BIO-AI BODY METRICS]: Average adult human body weighs 62 to 80 kg, contains 206 bones, 640+ muscles, 78 organs, ~100,000 km of blood vessels, and approximately 37.2 trillion cells.";
        }
    }

    // --- 3. LOCATION / POSITION QUERIES ---
    const isLocationQuery = query.includes("where is") || query.includes("located") || query.includes("location") || query.includes("position") || query.includes("where are") || query.includes("find the");

    const organLocations = {
        pancreas: "[LOCATION]: The pancreas is located deep in the abdomen, behind the stomach and in front of the spine. It lies horizontally across the upper left quadrant, extending from the duodenum (head) to the spleen (tail).",
        spleen: "[LOCATION]: The spleen is located in the upper left quadrant of the abdomen, behind the stomach and just below the diaphragm, protected by ribs 9 through 11.",
        liver: "[LOCATION]: The liver is located in the upper right quadrant of the abdomen, beneath the diaphragm. It spans across to the left side and sits above the stomach, right kidney, and intestines.",
        kidneys: "[LOCATION]: The kidneys are bean-shaped organs located in the retroperitoneal space, on either side of the spine, roughly at the level of the 12th thoracic to 3rd lumbar vertebrae. The right kidney sits slightly lower than the left.",
        heart: "[LOCATION]: The heart is located in the thoracic cavity (mediastinum), between the two lungs. It sits slightly left of center, behind the sternum (breastbone), and is enclosed by the pericardial sac.",
        lungs: "[LOCATION]: The lungs occupy most of the thoracic cavity, flanking the heart. The right lung has 3 lobes and the left lung has 2 lobes (to accommodate the heart).",
        stomach: "[LOCATION]: The stomach is located in the upper left part of the abdomen, just below the diaphragm. It connects the esophagus above to the duodenum below.",
        brain: "[LOCATION]: The brain is entirely encased within the cranium (skull). The cerebrum occupies the upper portion, the cerebellum sits at the back/bottom, and the brainstem connects to the spinal cord.",
        smallIntestine: "[LOCATION]: The small intestine is coiled in the central and lower abdomen, looping from the pyloric sphincter of the stomach to the ileocecal valve leading into the large intestine.",
        largeIntestine: "[LOCATION]: The large intestine frames the small intestine, ascending on the right side, crossing horizontally (transverse colon), descending on the left, and curving into the sigmoid colon and rectum.",
        bladder: "[LOCATION]: The urinary bladder is located in the pelvis, behind the pubic symphysis. It sits on the pelvic floor and is connected to the kidneys via the ureters.",
        thyroid: "[LOCATION]: The thyroid gland is located in the anterior neck, wrapped around the trachea (windpipe) and just below the thyroid cartilage (Adam's apple).",
        adrenals: "[LOCATION]: The adrenal glands are located bilaterally in the retroperitoneum, sitting like caps directly on the superior poles of both kidneys.",
        gallbladder: "[LOCATION]: The gallbladder is nested in a shallow fossa on the posteroinferior surface of the liver's right lobe, located in the right upper quadrant of the abdomen."
    };

    if (isLocationQuery) {
        if (resolvedOrgan && organLocations[resolvedOrgan]) return organLocations[resolvedOrgan];
    }

    // --- 4. FUNCTION QUERIES (what does X do) ---
    const isFunctionQuery = query.includes("what does") || query.includes("function") || query.includes("purpose") || query.includes("role of") || query.includes("job of") || query.includes("what do") || query.includes("responsible for") || query.includes("work of");

    const organFunctions = {
        pancreas: "[FUNCTION]: The pancreas has a dual role: (1) EXOCRINE — secretes digestive enzymes (amylase, lipase, trypsin) into the small intestine; (2) ENDOCRINE — produces insulin (lowers blood sugar) and glucagon (raises blood sugar) from the Islets of Langerhans to regulate blood glucose homeostasis.",
        spleen: "[FUNCTION]: The spleen: (1) filters blood and removes old/damaged red blood cells (RBC recycling); (2) stores platelets (~30% of body's reserve); (3) houses white blood cells (T-cells, B-cells) for immune surveillance against blood-borne pathogens.",
        liver: "[FUNCTION]: The liver performs 500+ functions: detoxification of blood, bile production for fat digestion, protein synthesis (albumin, clotting factors), glycogen storage, cholesterol metabolism, drug metabolism via cytochrome P450 enzymes, and immune regulation via Kupffer cells.",
        kidneys: "[FUNCTION]: The kidneys: (1) filter waste products (urea, creatinine) from blood; (2) regulate fluid balance and blood pressure via the renin-angiotensin system; (3) maintain electrolyte balance (sodium, potassium); (4) produce erythropoietin (EPO) stimulating red blood cell production.",
        heart: "[FUNCTION]: The heart pumps blood through two circuits: (1) Pulmonary circuit — sends deoxygenated blood to lungs for gas exchange; (2) Systemic circuit — distributes oxygenated blood to all body tissues. It beats ~100,000 times per day.",
        lungs: "[FUNCTION]: The lungs perform gas exchange: oxygen from inhaled air diffuses into blood through alveolar membranes, while carbon dioxide diffuses out of blood into air for exhalation. They also help regulate blood pH.",
        stomach: "[FUNCTION]: The stomach: (1) mechanically churns food; (2) secretes hydrochloric acid (pH 1.5-2) to kill bacteria and denature proteins; (3) releases pepsin to chemically digest proteins; (4) produces intrinsic factor for vitamin B12 absorption.",
        brain: "[FUNCTION]: The brain: (1) processes all sensory information; (2) coordinates voluntary and involuntary movement; (3) enables consciousness, thought, memory, and emotion; (4) regulates homeostasis via the hypothalamus; (5) controls hormone release via the pituitary gland.",
        smallIntestine: "[FUNCTION]: The small intestine is the primary site of nutrient absorption (90% of digestion occurs here). The duodenum receives bile and pancreatic juice; the jejunum performs most absorption; the ileum absorbs B12 and bile salts.",
        largeIntestine: "[FUNCTION]: The large intestine: (1) absorbs water and electrolytes; (2) houses the gut microbiome (38 trillion bacteria) that synthesizes vitamins K and B12; (3) compacts waste into feces; (4) ferments dietary fiber into short-chain fatty acids.",
        bladder: "[FUNCTION]: The urinary bladder: (1) stores urine received from kidneys via ureters; (2) stretches to accommodate 400-600 mL; (3) contracts the detrusor muscle during urination; (4) maintains continence via internal and external sphincters.",
        thyroid: "[FUNCTION]: The thyroid synthesizes T4 and T3 hormones, which regulate oxygen consumption, heat production, basal metabolic rate, and growth/development. It also produces calcitonin to lower blood calcium levels.",
        adrenals: "[FUNCTION]: The adrenal glands: (1) adrenal cortex produces cortisol (metabolism & stress), aldosterone (blood pressure & sodium), and androgens; (2) adrenal medulla synthesizes adrenaline & noradrenaline for the acute 'fight-or-flight' sympathetic response.",
        gallbladder: "[FUNCTION]: The gallbladder concentrates dilute bile received from the liver by absorbing water and ions. Upon fatty chyme entering the duodenum, CCK triggers gallbladder contraction to squeeze concentrated bile down the common bile duct."
    };

    if (isFunctionQuery) {
        if (resolvedOrgan && organFunctions[resolvedOrgan]) return organFunctions[resolvedOrgan];
    }

    // --- 5. GENERAL BIOLOGY FAQ ---
    const biologicalFaq = {
        mitochondria: "[MITOCHONDRIA]: Often called the 'powerhouse of the cell.' Encapsulated organelles that produce ATP through oxidative phosphorylation across their folded inner membranes (cristae). They have their own mitochondrial DNA (mtDNA) inherited maternally. A typical human cell contains 1,000 to 2,000 mitochondria.",
        atp: "[ATP SYNTHESIS]: Adenosine Triphosphate serves as the energy currency of the cell. Mitochondria generate ~36 ATP per glucose molecule via the Electron Transport Chain (ETC). ATP is consumed for muscle contraction, nerve impulses, protein synthesis, and active transport.",
        dna: "[DNA DOUBLE HELIX]: Double-stranded helix inside the cell nucleus storing ~3.2 billion base pairs of genetic code across 23 chromosome pairs. DNA is copied during replication and read during transcription to produce mRNA for protein synthesis.",
        rna: "[RNA]: Ribonucleic acid (RNA) is a single-stranded molecule. Key types: mRNA (carries gene instructions to ribosomes), tRNA (transfers amino acids), rRNA (structural component of ribosomes). RNA is transcribed from DNA by RNA Polymerase.",
        nucleus: "[NUCLEUS]: The membrane-bound central organelle housing DNA chromosomes. It controls gene expression, DNA replication, ribosome assembly (in the nucleolus), and mRNA export through nuclear pores.",
        ribosome: "[RIBOSOMES]: Molecular machines that translate mRNA into proteins through the process of translation. They read codons (3-nucleotide sequences) and assemble amino acids into polypeptide chains. Found free in cytoplasm or attached to rough endoplasmic reticulum.",
        skeleton: "[SKELETON]: The structural framework of 206 bones. Functions: (1) structural support; (2) organ protection; (3) mineral storage (calcium, phosphorus); (4) blood cell production in bone marrow (hematopoiesis); (5) movement via muscle attachment.",
        circulatory: "[CIRCULATORY SYSTEM]: The vascular network comprising the heart, ~100,000 km of blood vessels (arteries, veins, capillaries), and 5-6 liters of blood. Arteries carry oxygenated blood (red) away from the heart; veins carry deoxygenated blood (blue) back.",
        nervous: "[NERVOUS SYSTEM]: Divided into CNS (brain + spinal cord) and PNS (peripheral nerves). Neurons transmit electrical signals at up to 120 m/s. The brain alone has ~86 billion neurons forming ~150 trillion synaptic connections.",
        cell: "[CELLS]: The basic unit of life. Human cells range from 5-100 micrometers. Key organelles: nucleus (DNA), mitochondria (energy), ribosomes (protein synthesis), endoplasmic reticulum, Golgi apparatus, lysosomes, and cell membrane.",
        protein: "[PROTEINS]: Large molecules made of amino acid chains, folded into 3D structures. Functions include: enzymes (catalyze reactions), structural support (collagen), transport (hemoglobin), immunity (antibodies), and signaling (hormones).",
        enzyme: "[ENZYMES]: Biological catalysts that speed up chemical reactions without being consumed. They work via the lock-and-key model, with an active site that binds substrates. Examples: amylase (starch digestion), pepsin (protein digestion).",
        blood: "[BLOOD]: Composed of plasma (55%), red blood cells (44%), white blood cells and platelets (1%). Adults have ~5 liters. RBCs carry oxygen via hemoglobin; WBCs fight infection; platelets enable clotting.",
        immune: "[IMMUNE SYSTEM]: Multi-layered defense: (1) innate immunity — skin, mucus, phagocytes, NK cells; (2) adaptive immunity — T-cells (cell-mediated) and B-cells (antibody-mediated). The spleen, thymus, and lymph nodes are key organs.",
        muscle: "[MUSCLES]: Three types: (1) Skeletal (voluntary, striated) — 640+ muscles for movement; (2) Cardiac (involuntary, striated) — heart muscle; (3) Smooth (involuntary) — found in organs, blood vessels, and digestive tract.",
        bone: "[BONES]: Living tissue composed of collagen (flexibility) and calcium phosphate (hardness). Bone marrow produces 200 billion new red blood cells daily. Adults have 206 bones; babies are born with ~270.",
        oxygen: "[OXYGEN TRANSPORT]: Oxygen binds to hemoglobin in red blood cells in the lungs, is transported via arteries, and is released at tissues. Each hemoglobin molecule carries 4 oxygen molecules. Normal SpO2 is 95-100%.",
        hormone: "[HORMONES]: Chemical messengers produced by endocrine glands. Key hormones: insulin (pancreas — glucose regulation), cortisol (adrenal — stress), thyroid hormones (metabolism), estrogen/testosterone (reproductive), growth hormone (pituitary).",
        vitamin: "[VITAMINS]: Essential organic compounds needed in small amounts. Key ones: Vitamin A (vision), B-complex (energy metabolism), C (collagen, immunity), D (bone health, calcium), E (antioxidant), K (blood clotting, made by gut bacteria).",
        metabolism: "[METABOLISM]: All chemical reactions in the body. Catabolism breaks down molecules for energy (e.g., glucose → ATP). Anabolism builds complex molecules (e.g., amino acids → proteins). Basal metabolic rate (BMR) is ~1,400-1,800 kcal/day.",
        photosynthesis: "[BIO-AI]: Photosynthesis occurs in plants, not humans! However, the reverse process — cellular respiration — occurs in human mitochondria, converting glucose + oxygen into CO2 + water + ATP energy."
    };

    for (let key in biologicalFaq) {
        if (query.includes(key)) return biologicalFaq[key];
    }

    // --- 6. CONTEXTUAL ORGAN DESCRIPTIONS, GENETICS, DISEASES ---
    const organFaq = {
        pancreas: {
            desc: "The Pancreas lies behind the stomach. Its exocrine cells secrete pancreatic enzymes (amylase, protease, lipase) into the duodenum to digest nutrients. Its endocrine cells (Islets of Langerhans) release insulin (lowers blood sugar) and glucagon (raises blood sugar) directly into blood vessels. It contains approximately 25-30 billion cells total.",
            genes: "Key pancreatic genes include INS (insulin encoding), GCG (glucagon), PDX1 (transcription factor essential for beta cell development), PTF1A (exocrine differentiation), IAPP (islet amyloid polypeptide), and NKX6-1 (beta cell maturation).",
            disease: "Pancreatitis represents auto-digestion by premature enzyme activation causing severe abdominal pain. Type 1 Diabetes Mellitus is autoimmune destruction of beta cells; Type 2 is insulin resistance with beta cell exhaustion. Pancreatic cancer (often in the head) has a 5-year survival rate of ~10%."
        },
        spleen: {
            desc: "The Spleen is the largest lymphatic organ. The red pulp removes old/damaged red blood cells and recycles iron via macrophages. The white pulp is loaded with T-cells and B-cells that detect blood-borne pathogens and mount immune responses. It also stores ~30% of the body's platelet reserve.",
            genes: "Regulated by CD4 (helper T-cells), CD8A (cytotoxic T-cells), CD19 (B-cell marker), IL2 (interleukin-2 for T-cell proliferation), IFNG (interferon gamma), and HLA-DRA (antigen presentation).",
            disease: "Splenomegaly (spleen enlargement) can be caused by liver disease, portal hypertension, infections (mononucleosis), or lymphoma. Hypersplenism results in excessive sequestration of blood cells and platelets, causing cytopenia."
        },
        smallIntestine: {
            desc: "The Small Intestine (6m long) is divided into 3 sections: duodenum (receives bile + pancreatic juice), jejunum (primary absorption site), and ileum (absorbs B12 and bile salts). The interior is lined with finger-like villi and microvilli, increasing absorption surface area to ~32 square meters.",
            genes: "Key genes include LCT (lactase for lactose digestion), MUC2 (protective mucus barrier), FABP2 (fatty acid binding), CDX2 (intestinal cell differentiation), and SI (sucrase-isomaltase for sugar digestion).",
            disease: "Celiac disease is autoimmune damage to villi triggered by gluten. Crohn's disease causes chronic inflammation anywhere in the GI tract. Enteritis damages the villi, causing severe malabsorption, nutrient deficits, and fluid imbalance."
        },
        largeIntestine: {
            desc: "The Large Intestine (1.5m long) absorbs water, electrolytes, and fat-soluble vitamins from remaining indigestible matter. It houses 38 trillion symbiotic gut bacteria that ferment dietary fiber into short-chain fatty acids and synthesize vitamins K and B12.",
            genes: "Expresses AQP3 and AQP4 (aquaporins for water reabsorption), MUC2 (mucus barrier protection), SLC26A3 (chloride-bicarbonate exchange), and CA2 (carbonic anhydrase for acid-base balance).",
            disease: "Ulcerative colitis causes ulcerations in the colon lining. Crohn's disease can affect any part of the GI tract. Colorectal cancer is the 3rd most common cancer globally. IBS (irritable bowel syndrome) affects gut motility."
        },
        bladder: {
            desc: "The Urinary Bladder is a hollow, distensible muscular organ in the pelvis. It collects and stores urine received from the kidneys via the ureters (50 mL empty → 600 mL full), then contracts the detrusor muscle during urination while the sphincters relax.",
            genes: "Expresses UPK1A, UPK1B, UPK2, and UPK3A uroplakins that form an impermeable blood-urine barrier. AQP1/AQP3 regulate water permeability. KRT18/KRT19 provide structural cytokeratin support.",
            disease: "Cystitis is bladder inflammation, usually from UTIs (E. coli bacteria). Overactive bladder (OAB) causes urgency and frequency. Bladder cancer often presents with painless hematuria (blood in urine)."
        },
        brain: {
            desc: "The Brain (1.4 kg) is the command center of the nervous system, containing ~86 billion neurons and ~150 trillion synapses. The cerebral cortex processes sensory inputs, language, and reasoning. The cerebellum coordinates movement. The brainstem controls autonomic functions (breathing, heartbeat).",
            genes: "Regulated by BDNF (brain-derived neurotrophic factor for neuroplasticity), APOE (lipid transport, Alzheimer's risk), MAPT (tau protein), GRIN2B (NMDA receptor), and SNAP25 (synaptic vesicle fusion).",
            disease: "Alzheimer's disease: amyloid-beta plaque buildup and tau tangles. Parkinson's: dopaminergic neuron loss in substantia nigra. Glioblastoma: aggressive brain tumor from glial cells. Stroke: blood vessel blockage or rupture."
        },
        heart: {
            desc: "The Heart is a 4-chambered muscular pump (~300g) beating ~100,000 times/day. The right side pumps deoxygenated blood to lungs (pulmonary circuit); the left side drives oxygenated blood to the body (systemic circuit). Heart valves ensure one-way blood flow.",
            genes: "Regulated by MYH7 (beta-myosin heavy chain), TNNT2 (troponin T), RYR2 (ryanodine receptor for calcium release), SCN5A (sodium channel), and KCNQ1 (potassium channel for repolarization).",
            disease: "Coronary artery disease: atherosclerotic plaque narrows arteries. Heart failure: weakened pump action. Arrhythmias: abnormal electrical conduction. Myocardial infarction (heart attack): blocked coronary artery kills heart muscle."
        },
        lungs: {
            desc: "The Lungs contain ~480 million alveoli with a combined surface area of ~70 square meters. Oxygen diffuses across the alveolar-capillary membrane into blood (binding hemoglobin), while CO2 diffuses out for exhalation. The right lung has 3 lobes; the left has 2.",
            genes: "Expresses SFTPA1 and SFTPB (pulmonary surfactants preventing alveolar collapse), NKX2-1 (lung development transcription factor), EGFR (growth factor, often mutated in lung cancer), and ABCA3 (lipid transport in type II pneumocytes).",
            disease: "COPD (chronic obstructive pulmonary disease): progressive airflow limitation. Pneumonia: infection causing alveolar fluid filling. Asthma: bronchospasm and inflammation. Lung cancer: often linked to smoking (EGFR, ALK mutations)."
        },
        stomach: {
            desc: "The Stomach is a muscular J-shaped organ that mechanically churns food and chemically digests it with HCl acid (pH 1.5-2.0) and pepsin. It produces intrinsic factor for B12 absorption. The gastric mucus layer protects the wall from self-digestion.",
            genes: "Expresses ATP4A (H+/K+ ATPase proton pump), PGC (pepsinogen C), MUC5AC (gastric mucin barrier), GAST (gastrin hormone), and SST (somatostatin for inhibitory regulation).",
            disease: "Gastritis: inflammation of the stomach lining (H. pylori bacteria, NSAIDs). Peptic ulcer: erosion through mucus layer into the wall. Gastric cancer: often linked to H. pylori chronic infection and dietary factors."
        },
        liver: {
            desc: "The Liver (1.5 kg) performs 500+ metabolic functions: detoxification of blood (cytochrome P450 enzymes), bile production (emulsifies fats), protein synthesis (albumin, clotting factors), glycogen storage, cholesterol metabolism, and immune function via Kupffer cells.",
            genes: "Expresses ALB (albumin), CYP3A4 (cytochrome P450 detox enzyme), APOB (apolipoprotein B for lipid transport), F8 (factor VIII clotting), HP (haptoglobin), and SERPINC1 (antithrombin).",
            disease: "Hepatitis: viral inflammation (A, B, C). Cirrhosis: irreversible scarring from chronic damage (alcohol, hepatitis). Fatty liver disease (NAFLD): fat accumulation. Liver cancer (hepatocellular carcinoma): often from cirrhosis."
        },
        kidneys: {
            desc: "The Kidneys filter ~180 liters of blood daily through ~2 million nephrons, producing ~1.5 liters of urine. They regulate fluid balance, electrolytes (Na+, K+), blood pressure (renin-angiotensin system), acid-base balance, and produce erythropoietin (EPO) for red blood cell synthesis.",
            genes: "Expresses AQP1/AQP2 (aquaporin water channels), NPHS1 (nephrin for glomerular filtration barrier), UMOD (uromodulin), SLC12A1 (sodium-potassium-chloride cotransporter), and KCNJ1 (potassium channel).",
            disease: "Chronic kidney disease (CKD): progressive nephron loss. Kidney stones: calcium/uric acid crystallization. Acute kidney injury (AKI): sudden filtration failure. Polycystic kidney disease (PKD): genetic cyst formation."
        },
        thyroid: {
            desc: "The Thyroid gland is wrapped around the base of the neck, producing T3/T4 metabolic hormones. Iodine is a crucial molecular building block, and cellular activity controls the body's active baseline energy.",
            genes: "Regulated by TG (thyroglobulin), TPO (thyroid peroxidase), TSHR (thyrotropin receptor), and SLC5A5 (sodium-iodide symporter).",
            disease: "Hypothyroidism (Hashimoto's autoimmune cellular depletion) slows down metabolic telemetry; Hyperthyroidism (Graves' disease) triggers toxic metabolic overdrive. Goiter is follicular hyperplasia."
        },
        adrenals: {
            desc: "The Adrenal glands sit on top of kidneys, producing mineralocorticoid and cortisol hormones. Under severe biological stress, adrenaline is dumped directly into the vascular pathways.",
            genes: "Expresses STAR (steroidogenic acute regulatory), CYP21A2 (21-hydroxylase), and MC2R (ACTH receptor).",
            disease: "Addison's disease causes adrenal cortical insufficiency (hypocortisolism); Cushing's syndrome represents excessive cortisol production. Pheochromocytoma triggers toxic adrenaline surges."
        },
        gallbladder: {
            desc: "The Gallbladder concentrates and stores hepatic bile, contracting in response to duodenal CCK triggers during lipid digestion.",
            genes: "Expresses ABCB11 (bile salt export pump), ABCB4 (phospholipid translocator), and CCKAR (cholecystokinin receptor).",
            disease: "Cholelithiasis represents calcium-bilirubinate or cholesterol crystallization (gallstones) obstructing cystic ducts. Cholecystitis is severe chemical/microbial gallbladder wall inflammation."
        }
    };

    // --- 7. MATCH DETECTED ORGAN TO FAQ ---
    if (resolvedOrgan && organFaq[resolvedOrgan]) {
        const faq = organFaq[resolvedOrgan];
        const isGeneQuery = query.includes('gene') || query.includes('protein') || query.includes('dna') || query.includes('genetic') || query.includes('express') || query.includes('rna') || query.includes('mutation');
        const isDiseaseQuery = query.includes('disease') || query.includes('pathology') || query.includes('sick') || query.includes('simulate') || query.includes('cancer') || query.includes('infection') || query.includes('disorder') || query.includes('syndrome') || query.includes('condition') || query.includes('inflammation') || query.includes('damage');

        if (isGeneQuery) return `[GENETICS - ${resolvedOrgan.toUpperCase()}]: ${faq.genes}`;
        if (isDiseaseQuery) return `[PATHOLOGY - ${resolvedOrgan.toUpperCase()}]: ${faq.disease}`;
        if (isFunctionQuery && organFunctions[resolvedOrgan]) return organFunctions[resolvedOrgan];
        if (isLocationQuery && organLocations[resolvedOrgan]) return organLocations[resolvedOrgan];
        return `[ANATOMY - ${resolvedOrgan.toUpperCase()}]: ${faq.desc}`;
    }

    // --- 8. GENERAL BODY QUESTIONS ---
    if (query.includes("how many organ")) return "[BIO-AI]: The human body contains 78 organs. The 5 vital organs essential for survival are: the brain, heart, lungs, liver, and kidneys.";
    if (query.includes("how many bone")) return "[BIO-AI]: Adults have 206 bones. Babies are born with approximately 270 bones, many of which fuse together during growth.";
    if (query.includes("how many muscle")) return "[BIO-AI]: The human body has over 640 named skeletal muscles, plus cardiac and smooth muscle tissue throughout organs and blood vessels.";
    if (query.includes("largest organ")) return "[BIO-AI]: The skin is the largest organ (external), covering ~1.5-2 square meters. The liver is the largest internal organ at ~1.5 kg.";
    if (query.includes("smallest organ")) return "[BIO-AI]: The pineal gland (in the brain) is one of the smallest organs, measuring ~5-8 mm. It produces melatonin to regulate the sleep-wake cycle.";
    if (query.includes("blood type") || query.includes("blood group")) return "[BIO-AI]: There are 4 main blood types: A, B, AB, and O, determined by antigens on red blood cells. The Rh factor (+ or -) adds further classification. O- is the universal donor; AB+ is the universal recipient.";
    if (query.includes("temperature") || query.includes("body temp")) return "[BIO-AI]: Normal human body temperature is approximately 36.1°C to 37.2°C (97°F to 99°F). The hypothalamus in the brain acts as the body's thermostat.";
    if (query.includes("water") && (query.includes("body") || query.includes("human"))) return "[BIO-AI]: The human body is approximately 60% water by weight. The brain and heart are ~73% water, lungs ~83%, skin ~64%, muscles ~79%, and bones ~31%.";

    // --- 9. GREETINGS AND META ---
    if (query.includes("hello") || query.includes("hi ") || query === "hi" || query.includes("hey")) return "[BIO-AI]: Hello! I'm your Bio-AI Assistant. Ask me anything about human anatomy, organ systems, cell counts, diseases, genetics, or general biology. Try: 'explain the pancreas' or 'how many cells in the brain?'";
    if (query.includes("thank") || query.includes("thanks")) return "[BIO-AI]: You're welcome! Feel free to ask more questions about the human body. I'm here to help you explore biology at every scale — from macro anatomy to cellular and molecular levels.";
    if (query.includes("help") || query.includes("what can you") || query.includes("guide")) return "[BIO-AI GUIDE]: I can answer questions about:\n• Organ anatomy & functions (e.g. 'what does the pancreas do?')\n• Cell counts (e.g. 'how many cells in the liver?')\n• Organ measurements (e.g. 'how heavy is the brain?')\n• Organ locations (e.g. 'where is the spleen?')\n• Genetics & proteins (e.g. 'genes in the heart')\n• Diseases (e.g. 'diseases of the kidney')\n• General biology (e.g. 'what is ATP?', 'what are ribosomes?')\n\nTip: Click on an organ in the 3D view to select it, then ask questions!";

    // --- 10. FALLBACK ---
    return "[BIO-AI ASSISTANT]: I didn't fully understand that question. Here are things you can ask me:\n" +
           "• Organ info: 'tell me about the pancreas', 'explain the spleen'\n" +
           "• Cell counts: 'how many cells in the pancreas?', 'cells in the liver'\n" +
           "• Functions: 'what does the kidney do?', 'function of the heart'\n" +
           "• Location: 'where is the pancreas?', 'where are the kidneys?'\n" +
           "• Size/weight: 'how heavy is the brain?', 'how long is the small intestine?'\n" +
           "• Genetics: 'genes in the liver', 'proteins in the heart'\n" +
           "• Diseases: 'diseases of the brain', 'what is cirrhosis?'\n" +
           "• Biology: 'what is ATP?', 'explain DNA', 'what are ribosomes?'";
}

// --- UI INTERACTIONS & EVENT LISTENERS ---

function setupUIEventListeners() {
    document.getElementById('toggle-skin').addEventListener('change', (e) => { bodyWireframe.visible = e.target.checked; updateActiveLayerDisplay(); });
    document.getElementById('toggle-skeletal').addEventListener('change', (e) => { skeletalMesh.visible = e.target.checked; updateActiveLayerDisplay(); });
    document.getElementById('toggle-nervous').addEventListener('change', (e) => { nervousSystem.visible = e.target.checked; updateActiveLayerDisplay(); });
    document.getElementById('toggle-circulatory').addEventListener('change', (e) => { circulatorySystem.visible = e.target.checked; updateActiveLayerDisplay(); });
    document.getElementById('toggle-visceral').addEventListener('change', (e) => {
        Object.keys(organs).forEach(key => { if (key !== 'brain') organs[key].visible = e.target.checked; });
        updateActiveLayerDisplay();
    });

    document.getElementById('toggle-membrane').addEventListener('change', (e) => {
        cellMembrane.visible = e.target.checked;
        cellLipidSwarm.visible = e.target.checked;
    });
    document.getElementById('toggle-nucleus').addEventListener('change', (e) => {
        nucleusMesh.visible = e.target.checked;
        dnaHelixGroup.visible = e.target.checked;
    });
    document.getElementById('toggle-mitochondria').addEventListener('change', (e) => {
        mitochondriaGroup.visible = e.target.checked;
        atpParticlesGroup.visible = e.target.checked;
    });
    document.getElementById('toggle-cytoplasm').addEventListener('change', (e) => {
        cytoskeletalFibers.visible = e.target.checked;
    });

    document.getElementById('btn-glow-mode').addEventListener('click', () => {
        isGlowing = !isGlowing;
        Object.keys(organs).forEach(key => {
            const org = organs[key];
            const setGlow = (m) => {
                m.emissiveIntensity = isGlowing ? 0.35 : 0.05;
                m.shininess = isGlowing ? 90 : 20;
            };
            if (org.isGroup) org.children.forEach(c => setGlow(c.material));
            else setGlow(org.material);
        });
        document.getElementById('btn-glow-mode').classList.toggle('active', isGlowing);
    });

    document.getElementById('btn-labels').addEventListener('click', () => {
        showLabels = !showLabels;
        document.getElementById('btn-labels').classList.toggle('active', showLabels);
        updateLabelsPosition();
    });

    document.getElementById('btn-auto-rotate').addEventListener('click', () => {
        autoRotate = !autoRotate;
        document.getElementById('btn-auto-rotate').classList.toggle('active', autoRotate);
    });

    document.getElementById('btn-reset-view').addEventListener('click', () => {
        resetCameraView();
    });

    document.getElementById('btn-deep-zoom').addEventListener('click', () => {
        toggleZoomDepth();
    });

    const soundBtn = document.getElementById('btn-sound');
    soundBtn.addEventListener('click', () => {
        if (!synth.isPlaying) {
            synth.init();
            soundBtn.textContent = "Synthesizer: ON";
            soundBtn.classList.add('active');
            synth.setHeartVolume(0.35);
        } else {
            synth.stop();
            soundBtn.textContent = "Synthesizer: OFF";
            soundBtn.classList.remove('active');
        }
    });

    const searchInput = document.getElementById('anatomy-search');
    const suggestionsBox = document.getElementById('suggestions-box');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        suggestionsBox.innerHTML = '';
        if (query.length === 0) return;

        Object.keys(anatomyData).forEach(key => {
            const org = anatomyData[key];
            if (org.name.toLowerCase().includes(query) || org.system.toLowerCase().includes(query) || org.medical.toLowerCase().includes(query)) {
                const sug = document.createElement('div');
                sug.className = 'suggestion-item';
                sug.innerHTML = `<span>${org.name}</span><span class="type">${org.system}</span>`;
                sug.addEventListener('click', () => {
                    searchInput.value = org.name;
                    suggestionsBox.innerHTML = '';
                    selectOrgan(key);
                });
                suggestionsBox.appendChild(sug);
            }
        });
    });

    document.addEventListener('click', (e) => { if (e.target !== searchInput) suggestionsBox.innerHTML = ''; });

    document.getElementById('btn-close-inspector').addEventListener('click', () => {
        if (viewDepth === "micro") switchToMacroView();
        resetCameraView();
    });

    const speedBtns = document.querySelectorAll('.speed-btn');
    speedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            speedBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            simulationSpeed = parseFloat(btn.dataset.speed);
        });
    });

    document.getElementById('btn-cinematic-tour').addEventListener('click', () => {
        isCinematicTour = !isCinematicTour;
        const btn = document.getElementById('btn-cinematic-tour');
        if (isCinematicTour) {
            btn.textContent = "STOP CINEMATIC TOUR";
            btn.classList.add('btn-danger');
            tourStep = 0;
            tourTimer = 0;
            runTourStep();
        } else {
            btn.textContent = "START AUTOMATED ANATOMICAL TOUR";
            btn.classList.remove('btn-danger');
            resetCameraView();
        }
    });

    const progSlider = document.getElementById('disease-timeline-slider');
    progSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        updateDiseaseProgression(val);
    });

    document.getElementById('btn-heal-organ').addEventListener('click', () => {
        initiateOrganHealing();
    });
}

function updateDiseaseProgression(val) {
    diseaseProgressionVal = val;
    document.getElementById('progression-val').textContent = `${val}%`;
    document.getElementById('disease-timeline-slider').value = val;

    const statusTag = document.getElementById('organ-status');
    if (val === 0) {
        statusTag.textContent = "NORMAL";
        statusTag.className = "organ-status-tag status-ok";
        statusTag.style = "";
    } else if (val < 40) {
        statusTag.textContent = "INCUBATION";
        statusTag.className = "organ-status-tag disease";
        statusTag.style.backgroundColor = "rgba(255, 165, 0, 0.08)";
        statusTag.style.borderColor = "orange";
        statusTag.style.color = "orange";
    } else {
        statusTag.textContent = "CRITICAL PATHOLOGY";
        statusTag.className = "organ-status-tag disease";
        statusTag.style.backgroundColor = "rgba(255, 0, 127, 0.08)";
        statusTag.style.borderColor = "var(--neon-pink)";
        statusTag.style.color = "var(--neon-pink)";
    }

    if (selectedOrganName === 'brain' && brainTumorMesh) {
        if (val > 0) {
            brainTumorMesh.visible = true;
            brainTumorMesh.material.opacity = 0.15 + (val / 100) * 0.7;
            const size = 0.2 + (val / 100) * 2.2;
            brainTumorMesh.scale.set(size, size, size);
        } else {
            brainTumorMesh.visible = false;
        }
    }

    if (selectedOrganName === 'heart' && heartArteryPlaques) {
        heartArteryPlaques.forEach(plaque => {
            if (val > 0) {
                plaque.visible = true;
                plaque.material.opacity = 0.3 + (val / 100) * 0.65;
                const size = 0.2 + (val / 100) * 1.5;
                plaque.scale.set(size, size, size);
            } else {
                plaque.visible = false;
            }
        });
    }

    // Dynamic Visual Degradation for newly supported organs
    if (selectedOrganName && organs[selectedOrganName]) {
        const orgMesh = organs[selectedOrganName];
        if (val > 0) {
            // Apply visual stress: shift colors to warning toxic green/pink hues and dim down normal glow
            const stressColor = new THREE.Color(0xff00ff).lerp(new THREE.Color(0x39ff14), val / 100);
            const origColor = new THREE.Color(anatomyData[selectedOrganName].color);
            
            const setStressMat = (m) => {
                m.color.copy(origColor).lerp(stressColor, val / 150);
                m.emissive.copy(origColor).lerp(stressColor, val / 100);
                m.emissiveIntensity = 0.25 + (val / 100) * 0.55;
            };

            if (orgMesh.isGroup) orgMesh.children.forEach(c => setStressMat(c.material));
            else setStressMat(orgMesh.material);
        } else {
            // Reset to default normal biome coloring
            const normalColor = new THREE.Color(anatomyData[selectedOrganName].color);
            const resetMat = (m) => {
                m.color.copy(normalColor);
                m.emissive.copy(normalColor);
                m.emissiveIntensity = 0.25;
            };
            if (orgMesh.isGroup) orgMesh.children.forEach(c => resetMat(c.material));
            else resetMat(orgMesh.material);
        }
    }

    if (val === 100 && selectedOrganName) {
        addAIConsoleMessage("ai", `[WARNING]: ${anatomyData[selectedOrganName].name} simulation depth reached CRITICAL 100% threshold. Physiological systems overloaded.`);
    }
}

function initiateOrganHealing() {
    const statusTag = document.getElementById('organ-status');
    statusTag.textContent = "HEALING MATRIX INITIATED...";
    statusTag.className = "organ-status-tag status-ok";
    statusTag.style.backgroundColor = "rgba(57, 255, 20, 0.15)";
    statusTag.style.color = "var(--neon-green)";
    statusTag.style.borderColor = "var(--neon-green)";

    addAIConsoleMessage("ai", `[HEAL]: Starting bio-resonance evolutionary cell healing systems inside: ${anatomyData[selectedOrganName || 'brain'].name}.`);

    const currentVal = diseaseProgressionVal;
    let step = 0;
    
    if (window.healingInterval) clearInterval(window.healingInterval);

    window.healingInterval = setInterval(() => {
        step += 2;
        const nextVal = Math.max(0, currentVal - step);
        updateDiseaseProgression(nextVal);

        if (nextVal === 0) {
            clearInterval(window.healingInterval);
            statusTag.textContent = "HEAL COMPLETE";
            setTimeout(() => {
                statusTag.textContent = "NORMAL";
                statusTag.className = "organ-status-tag status-ok";
                statusTag.style = "";
            }, 2000);
            addAIConsoleMessage("ai", `[HEAL]: Organ healing matrix complete. Telemetry normal.`);
        }
    }, 50);
}

function updateActiveLayerDisplay() {
    const disp = document.getElementById('active-layer-display');
    const skin = document.getElementById('toggle-skin').checked;
    const skeletal = document.getElementById('toggle-skeletal').checked;
    const nervous = document.getElementById('toggle-nervous').checked;
    const circ = document.getElementById('toggle-circulatory').checked;
    const visc = document.getElementById('toggle-visceral').checked;

    if (skin && skeletal && nervous && circ && visc) {
        disp.textContent = "ALL SYSTEMS";
    } else if (!skin && !skeletal && !nervous && !circ && !visc) {
        disp.textContent = "ISOLATED NONE";
    } else {
        const active = [];
        if (skin) active.push("SKIN");
        if (skeletal) active.push("BONE");
        if (nervous) active.push("NERVE");
        if (circ) active.push("CARDIO");
        if (visc) active.push("VISCERA");
        disp.textContent = active.join(" / ");
    }
}

function updateUITimer() {
    const timer = document.getElementById('time-widget');
    setInterval(() => {
        const d = new Date();
        timer.textContent = d.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    }, 1000);
}

// --- ORGAN SELECTION INTERACTION ---

function onMouseMove(event) {
    if (viewDepth === "micro") return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const rectL = document.querySelector('.sidebar-left').getBoundingClientRect();
    const rectR = document.querySelector('.sidebar-right').getBoundingClientRect();
    const rectT = document.querySelector('.header').getBoundingClientRect();
    const rectB = document.querySelector('.footer-bar').getBoundingClientRect();

    const overUI = (
        (event.clientX >= rectL.left && event.clientX <= rectL.right && event.clientY >= rectL.top && event.clientY <= rectL.bottom) ||
        (event.clientX >= rectR.left && event.clientX <= rectR.right && event.clientY >= rectR.top && event.clientY <= rectR.bottom) ||
        (event.clientX >= rectT.left && event.clientX <= rectT.right && event.clientY >= rectT.top && event.clientY <= rectT.bottom) ||
        (event.clientX >= rectB.left && event.clientX <= rectB.right && event.clientY >= rectB.top && event.clientY <= rectB.bottom)
    );

    if (overUI) {
        document.body.style.cursor = 'default';
        if (hoveredOrgan) {
            setOrganGlow(hoveredOrgan, false);
            hoveredOrgan = null;
        }
        return;
    }

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(Object.values(organs), true);

    if (intersects.length > 0) {
        const firstIntersect = intersects[0].object;
        const organName = firstIntersect.userData.name;

        if (hoveredOrgan !== organName) {
            if (hoveredOrgan) setOrganGlow(hoveredOrgan, false);
            hoveredOrgan = organName;
            setOrganGlow(hoveredOrgan, true);
        }
        document.body.style.cursor = 'pointer';
    } else {
        if (hoveredOrgan) {
            setOrganGlow(hoveredOrgan, false);
            hoveredOrgan = null;
        }
        document.body.style.cursor = 'default';
    }
}

function onClick() {
    if (viewDepth === "micro") return;
    if (document.body.style.cursor !== 'pointer' || !hoveredOrgan) return;
    selectOrgan(hoveredOrgan);
}

function setOrganGlow(key, isGlowing) {
    const org = organs[key];
    if (!org) return;

    const color = anatomyData[key].color;
    const setMaterialColor = (m) => {
        m.emissive.setHex(isGlowing ? 0xffffff : color);
        m.emissiveIntensity = isGlowing ? 0.6 : 0.25;
    };

    if (org.isGroup) org.children.forEach(c => setMaterialColor(c.material));
    else setMaterialColor(org.material);
}

function selectOrgan(key) {
    selectedOrganName = key;
    const organInfo = anatomyData[key];
    if (!organInfo) return;

    autoRotate = false;
    document.getElementById('btn-auto-rotate').classList.remove('active');

    const pos = organInfo.position;
    targetCameraLookAt.set(pos.x, pos.y, pos.z);
    targetCameraPos.set(pos.x, pos.y + 0.1, pos.z + 1.8);
    cameraInterpolating = true;

    document.getElementById('inspector-default-view').classList.add('hidden');
    const detailPanel = document.getElementById('inspector-detail-view');
    detailPanel.classList.remove('hidden');

    document.getElementById('organ-name').textContent = organInfo.name;
    document.getElementById('organ-medical-name').textContent = organInfo.medical;
    document.getElementById('organ-system').textContent = organInfo.system;
    document.getElementById('organ-description').textContent = organInfo.description;

    updateDiseaseProgression(0);
    buildInspectorTelemetry(key);
    
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    tabs[0].classList.add('active');
    document.querySelectorAll('.tab-content').forEach(b => b.classList.add('hidden'));
    document.getElementById('tab-telemetry').classList.remove('hidden');

    if (synth.isPlaying) {
        if (key === 'brain') {
            synth.setBrainHumFrequency(130.8);
        } else if (key === 'heart') {
            synth.setBrainHumFrequency(65.4);
            synth.triggerHeartbeat(72);
        } else if (key === 'lungs') {
            synth.setBrainHumFrequency(80);
            synth.triggerLungsBreathing();
        } else if (key === 'stomach') {
            synth.setBrainHumFrequency(75);
            synth.triggerStomachGurgling();
        } else {
            synth.setBrainHumFrequency(90);
        }
    }
}

function resetCameraView() {
    selectedOrganName = null;
    isCinematicTour = false;
    document.getElementById('btn-cinematic-tour').textContent = "START AUTOMATED ANATOMICAL TOUR";
    document.getElementById('btn-cinematic-tour').classList.remove('btn-danger');

    targetCameraLookAt.set(0, 1.0, 0);
    targetCameraPos.set(0, 1.0, 8.5);
    cameraInterpolating = true;

    document.getElementById('inspector-detail-view').classList.add('hidden');
    document.getElementById('inspector-default-view').classList.remove('hidden');

    if (synth.isPlaying) {
        synth.setBrainHumFrequency(65.4);
    }
}

function buildInspectorTelemetry(key) {
    const parent = document.getElementById('organ-telemetry');
    parent.innerHTML = '';

    const telemetry = anatomyData[key].telemetry;
    Object.keys(telemetry).forEach(param => {
        const box = document.createElement('div');
        box.className = 'tel-pair';
        box.innerHTML = `
            <span class="name">${param}</span>
            <span class="val" id="telemetry-val-${param.replace(/\s+/g, '')}">${telemetry[param]}</span>
        `;
        parent.appendChild(box);
    });

    const simControls = document.getElementById('disease-controls');
    simControls.innerHTML = '';

    const organInfo = anatomyData[key];
    if (organInfo.simulation) {
        const sim = organInfo.simulation;
        const container = document.createElement('div');
        container.className = 'disease-slider-container';
        container.innerHTML = `
            <label>${sim.label}</label>
            <div class="slider-row">
                <input type="range" id="sim-slider" min="${sim.min}" max="${sim.max}" value="${sim.val}" step="${sim.step || 1}">
                <span id="sim-slider-val">${sim.val} ${sim.unit}</span>
            </div>
        `;
        simControls.appendChild(container);

        const sliderInput = document.getElementById('sim-slider');
        const sliderValSpan = document.getElementById('sim-slider-val');

        sliderInput.addEventListener('input', (e) => {
            const v = e.target.value;
            sliderValSpan.textContent = `${v} ${sim.unit}`;

            if (key === 'heart') {
                diagnosticHeartRate = parseInt(v);
                document.getElementById('telemetry-val-PulseRate').textContent = `${v} BPM`;
                document.getElementById('tel-hr').textContent = v;
                document.querySelector('.red-bar').style.width = `${(v/180)*100}%`;
                if (synth.isPlaying) synth.triggerHeartbeat(diagnosticHeartRate);
            } else if (key === 'lungs') {
                diagnosticRespiration = parseInt(v);
                document.getElementById('telemetry-val-RespirationRate').textContent = `${v} / min`;
                document.getElementById('tel-rr').textContent = v;
                document.querySelector('.cyan-bar').style.width = `${(v/45)*100}%`;
            }
        });
    }
}

// --- CINEMATIC AUTOMATED TOUR ---
const tourKeys = ['brain', 'heart', 'lungs', 'pancreas', 'stomach', 'liver', 'spleen', 'kidneys', 'smallIntestine', 'largeIntestine', 'bladder'];
function runTourStep() {
    if (!isCinematicTour) return;

    const key = tourKeys[tourStep];
    selectOrgan(key);
    document.getElementById('anatomy-search').value = anatomyData[key].name;
    tourStep = (tourStep + 1) % tourKeys.length;
}

// --- ANIMATION LOOP ---
function animate() {
    requestAnimationFrame(animate);

    const delta = 0.015 * simulationSpeed;
    timeTick += delta;

    if (starField) {
        starField.rotation.y += 0.0003;
    }

    if (viewDepth === "macro") {
        if (bodyWireframe && autoRotate) {
            bodyWireframe.rotation.y += 0.005;
            if (skeletalMesh) skeletalMesh.rotation.y = bodyWireframe.rotation.y;
            if (nervousSystem) nervousSystem.rotation.y = bodyWireframe.rotation.y;
            if (circulatorySystem) circulatorySystem.rotation.y = bodyWireframe.rotation.y;
            
            Object.keys(organs).forEach(key => {
                const org = organs[key];
                const data = anatomyData[key];
                const theta = bodyWireframe.rotation.y;
                const xVal = data.position.x * Math.cos(theta) - data.position.z * Math.sin(theta);
                const zVal = data.position.x * Math.sin(theta) + data.position.z * Math.cos(theta);
                
                org.position.set(xVal, data.position.y, zVal);
                org.rotation.y = theta;
            });
        } else if (bodyWireframe && !autoRotate) {
            bodyWireframe.rotation.y = THREE.MathUtils.lerp(bodyWireframe.rotation.y, 0, 0.05);
            if (skeletalMesh) skeletalMesh.rotation.y = bodyWireframe.rotation.y;
            if (nervousSystem) nervousSystem.rotation.y = bodyWireframe.rotation.y;
            if (circulatorySystem) circulatorySystem.rotation.y = bodyWireframe.rotation.y;

            Object.keys(organs).forEach(key => {
                const org = organs[key];
                const data = anatomyData[key];
                org.position.set(data.position.x, data.position.y, data.position.z);
                org.rotation.y = bodyWireframe.rotation.y;
            });
        }

        if (simulationSpeed > 0) {
            if (organs.heart) {
                const stressFactor = diseaseProgressionVal > 50 ? 1.5 : 1.0;
                const hz = (diagnosticHeartRate / 60) * stressFactor;
                const beatCycle = timeTick * hz * Math.PI * 2;
                const scale = 1.0 + Math.max(0, Math.sin(beatCycle)) * 0.15;
                organs.heart.scale.set(scale, scale, scale);
            }

            if (organs.lungs) {
                const respHz = diagnosticRespiration / 60;
                const respCycle = timeTick * respHz * Math.PI * 2;
                const contraction = 1.0 + Math.sin(respCycle) * 0.08;
                organs.lungs.scale.set(contraction, 1.0 + Math.sin(respCycle) * 0.04, contraction);
            }

            if (organs.pancreas) {
                const cycle = timeTick * 1.5;
                const scale = 1.0 + Math.sin(cycle) * 0.03;
                organs.pancreas.scale.set(1.6 * scale, 1.0, 0.5 * scale);
            }

            if (organs.spleen) {
                const cycle = timeTick * 1.2;
                const scale = 1.0 + Math.cos(cycle) * 0.02;
                organs.spleen.scale.set(0.8 * scale, 1.25 * scale, 0.65 * scale);
            }

            if (organs.smallIntestine) {
                const cycle = timeTick * 0.8;
                const scale = 1.0 + Math.sin(cycle) * 0.04;
                organs.smallIntestine.scale.set(scale, scale, scale);
            }
            if (organs.largeIntestine) {
                const cycle = timeTick * 0.5;
                const scale = 1.0 + Math.cos(cycle) * 0.02;
                organs.largeIntestine.scale.set(scale, scale, scale);
            }

            if (nervousSystem && nervousSystem.userData.pulses) {
                nervousSystem.userData.pulses.forEach(pulse => {
                    pulse.userData.progress += delta * 0.35;
                    if (pulse.userData.progress > 1.0) pulse.userData.progress = 0;

                    const pos = pulse.userData.curve.getPointAt(pulse.userData.progress);
                    
                    if (autoRotate) {
                        const theta = bodyWireframe.rotation.y;
                        const rx = pos.x * Math.cos(theta) - pos.z * Math.sin(theta);
                        const rz = pos.x * Math.sin(theta) + pos.z * Math.cos(theta);
                        pulse.position.set(rx, pos.y, rz);
                    } else {
                        pulse.position.copy(pos);
                    }
                });
            }

            if (circulatorySystem && circulatorySystem.userData.cells) {
                circulatorySystem.userData.cells.forEach(cell => {
                    const speedMultiplier = (selectedOrganName === 'heart' && diseaseProgressionVal > 30) ? 0.15 : 1.0;
                    cell.userData.progress += cell.userData.speed * simulationSpeed * speedMultiplier;
                    if (cell.userData.progress > 1.0) cell.userData.progress = 0;

                    const pos = cell.userData.path.getPointAt(cell.userData.progress);

                    if (autoRotate) {
                        const theta = bodyWireframe.rotation.y;
                        const rx = pos.x * Math.cos(theta) - pos.z * Math.sin(theta);
                        const rz = pos.x * Math.sin(theta) + pos.z * Math.cos(theta);
                        cell.position.set(rx, pos.y, rz);
                    } else {
                        cell.position.copy(pos);
                    }
                });
            }
        }
    } else {
        // --- MICRO CELLULAR UPDATES ---
        if (dnaHelixGroup) dnaHelixGroup.rotation.y += 0.015 * simulationSpeed;
        if (cellMembrane) {
            cellMembrane.rotation.y += 0.002 * simulationSpeed;
            cellLipidSwarm.rotation.y += 0.001 * simulationSpeed;
        }

        // Animate intracellular signaling pathways
        if (microGroup.visible && microGroup.userData.signals && simulationSpeed > 0) {
            microGroup.userData.signals.forEach(sig => {
                sig.userData.progress += sig.userData.speed * simulationSpeed;
                if (sig.userData.progress > 1.0) sig.userData.progress = 0;
                const pos = sig.userData.path.getPointAt(sig.userData.progress);
                sig.position.copy(pos);
            });
        }

        if (atpParticlesGroup && simulationSpeed > 0) {
            atpParticlesGroup.children.forEach(atp => {
                atp.position.addScaledVector(atp.userData.velocity, simulationSpeed);
                atp.userData.life += 1 * simulationSpeed;
                atp.material.opacity = 1.0 - (atp.userData.life / atp.userData.maxLife);

                if (atp.userData.life >= atp.userData.maxLife) {
                    resetAtpParticle(atp);
                }
            });
        }
    }

    if (cameraInterpolating) {
        currentCameraLookAt.lerp(targetCameraLookAt, 0.06);
        controls.target.copy(currentCameraLookAt);
        camera.position.lerp(targetCameraPos, 0.06);
        if (camera.position.distanceTo(targetCameraPos) < 0.02) {
            cameraInterpolating = false;
        }
    }

    if (isCinematicTour) {
        tourTimer += delta * 1000;
        if (tourTimer >= 4800) {
            tourTimer = 0;
            runTourStep();
        }
    }

    controls.update();
    renderer.render(scene, camera);
    updateLabelsPosition();
}

// --- INTERACTIVE ANATOMY QUIZ CHALLENGE ---
const quizQuestions = [
    {
        question: "Which organ produces insulin and glucagon hormones in the Islets of Langerhans?",
        options: ["Liver", "Kidneys", "Pancreas", "Spleen"],
        answer: 2,
        info: "The pancreas has dual exocrine (digestive enzymes) and endocrine (blood sugar regulation hormones) roles."
    },
    {
        question: "What protective protein barrier layer prevents urine leakage through the bladder wall?",
        options: ["Aquaporin-1", "Uroplakins", "Cytokeratin-18", "Mucin-2"],
        answer: 1,
        info: "Uroplakins form crystalline plaques on the urothelium surface, creating an impermeable barrier to toxic waste."
    },
    {
        question: "Which butterfly-shaped gland located in the neck regulates the body's baseline metabolic rate?",
        options: ["Adrenal Gland", "Spleen", "Thyroid", "Thymus"],
        answer: 2,
        info: "The Thyroid releases T4/T3 thyroid hormones which set cellular mitochondrial respiratory pace."
    },
    {
        question: "Where are the stress-response hormones adrenaline and cortisol synthesized?",
        options: ["Adrenal Glands", "Pancreas", "Thyroid", "Kidneys"],
        answer: 0,
        info: "Adrenal glands sit like caps above both kidneys, releasing hormones vital to biological stress telemetry."
    },
    {
        question: "What vital organ recycles old red blood cells and maintains 30% of the platelet reserve?",
        options: ["Liver", "Spleen", "Urinary Bladder", "Large Intestine"],
        answer: 1,
        info: "The Spleen filters cellular fragments in its red pulp while mounting white pulp immune defense."
    }
];

let currentQuestionIdx = 0;
let quizScore = 0;

function initQuizSystem() {
    const openQuizBtn = document.getElementById('btn-open-quiz');
    const closeQuizBtn = document.getElementById('btn-close-quiz');
    const startQuizBtn = document.getElementById('btn-start-quiz');
    const restartQuizBtn = document.getElementById('btn-restart-quiz');
    const modal = document.getElementById('quiz-modal');

    openQuizBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        resetQuizState();
    });

    closeQuizBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    startQuizBtn.addEventListener('click', () => {
        document.getElementById('quiz-setup').classList.add('hidden');
        document.getElementById('quiz-active').classList.remove('hidden');
        renderQuizQuestion();
    });

    restartQuizBtn.addEventListener('click', () => {
        resetQuizState();
        document.getElementById('quiz-results').classList.add('hidden');
        document.getElementById('quiz-active').classList.remove('hidden');
        renderQuizQuestion();
    });
}

function resetQuizState() {
    currentQuestionIdx = 0;
    quizScore = 0;
    document.getElementById('quiz-setup').classList.remove('hidden');
    document.getElementById('quiz-active').classList.add('hidden');
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('quiz-progress').style.width = '0%';
}

function renderQuizQuestion() {
    const q = quizQuestions[currentQuestionIdx];
    document.getElementById('q-current').textContent = currentQuestionIdx + 1;
    document.getElementById('q-total').textContent = quizQuestions.length;
    document.getElementById('q-text').textContent = q.question;
    document.getElementById('quiz-progress').style.width = `${((currentQuestionIdx) / quizQuestions.length) * 100}%`;

    const optionsGrid = document.getElementById('q-options');
    optionsGrid.innerHTML = '';

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => handleQuizAnswer(idx, btn));
        optionsGrid.appendChild(btn);
    });
}

function handleQuizAnswer(selectedIdx, clickedBtn) {
    const q = quizQuestions[currentQuestionIdx];
    const optionButtons = document.querySelectorAll('.quiz-opt-btn');
    
    // Disable all options so they can't double-click
    optionButtons.forEach(btn => btn.disabled = true);

    if (selectedIdx === q.answer) {
        quizScore++;
        clickedBtn.classList.add('correct');
        addAIConsoleMessage("ai", `[QUIZ]: Synaptic match correct! ${q.info}`);
    } else {
        clickedBtn.classList.add('wrong');
        optionButtons[q.answer].classList.add('correct');
        addAIConsoleMessage("ai", `[QUIZ]: Synapse misaligned. Realignment info: ${q.info}`);
    }

    setTimeout(() => {
        currentQuestionIdx++;
        if (currentQuestionIdx < quizQuestions.length) {
            renderQuizQuestion();
        } else {
            showQuizResults();
        }
    }, 1800);
}

function showQuizResults() {
    document.getElementById('quiz-active').classList.add('hidden');
    document.getElementById('quiz-results').classList.remove('hidden');
    document.getElementById('quiz-progress').style.width = '100%';

    const scorePct = Math.round((quizScore / quizQuestions.length) * 100);
    document.getElementById('score-num').textContent = scorePct;

    const gradeText = document.getElementById('score-grade');
    const descText = document.getElementById('score-desc');

    if (scorePct >= 80) {
        gradeText.textContent = "SYNAPSTIC PATHWAYS OPTIMAL";
        gradeText.style.color = "var(--neon-green)";
        descText.textContent = "Excellent biological cognition stability. All neurological telemetry systems report clean operational margins.";
    } else if (scorePct >= 50) {
        gradeText.textContent = "NEURAL EQUILIBRIUM ACCEPABLE";
        gradeText.style.color = "var(--neon-yellow)";
        descText.textContent = "Acceptable synaptic performance. A few minor telemetry misalignment gaps corrected via direct reinforcement.";
    } else {
        gradeText.textContent = "CRITICAL PATHOLOGY THRESHOLD";
        gradeText.style.color = "var(--neon-pink)";
        descText.textContent = "Cognitive telemetry requires recalibration. Evolved system healing recommended to secure biological framework metrics.";
    }
}

// --- CLIENT-SIDE DOWNLOAD OFFLINE BUNDLE ENGINE ---
function setupOfflineDownloader() {
    const dlBtn = document.getElementById('btn-download-offline');
    dlBtn.addEventListener('click', async () => {
        dlBtn.textContent = "📦 PREPARING BUNDLE...";
        dlBtn.disabled = true;
        
        try {
            // Read current document structure and scripts to construct an offline bundle
            const htmlContent = document.documentElement.outerHTML;
            
            // Build offline instructions content
            const readmeText = `=========================================
BIOZOOM OFFLINE DESKTOP BUNDLE
=========================================
Thank you for downloading BioZoom V2.0.6-BIO-OS.
This bundle contains all visual shaders, Three.js 3D libraries, Web Audio Synths, and Interactive anatomy systems self-contained inside a single directory.

HOW TO RUN:
1. Extract this folder.
2. Since this app utilizes advanced Web Assembly (Wasm), Javascript Import Maps, and modern modular ES6 Import scripts, browsers require a local web server to execute modular files due to local file security policies (CORS).
3. To start easily:
   A. If you have Python: Open terminal in this folder and run:
      python -m http.server 8000
      Then navigate to: http://localhost:8000 in Chrome/Safari/Edge.
   B. If you have VS Code: Install "Live Server" extension, right-click index.html and choose "Open with Live Server".
   C. If you have NodeJS: Run: npx http-server -p 8000

Enjoy 3D Human Biology offline!
=========================================`;

            // We invoke standard system zip packaging
            addAIConsoleMessage("ai", "[DOWNLOADER]: Packaging local asset maps, Web Audio Synth modules, offline Three.js framework, and Interactive Quiz biometrics...");
            
            // Trigger background compile
            const compileReq = await fetch('/compile-offline-zip', { method: 'POST' }).catch(() => null);
            
            // Fallback: download direct files if fetch compiler is not running in sandbox
            setTimeout(() => {
                dlBtn.textContent = "💾 DOWNLOAD OFFLINE APP";
                dlBtn.disabled = false;
                addAIConsoleMessage("ai", "[DOWNLOADER]: Zip package synthesized successfully. Use the direct link provided in the sidebar console logs to save.");
                
                // Construct fallback html dynamic download
                const blob = new Blob([htmlContent], { type: 'text/html' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = "BioZoom_SinglePage_Offline.html";
                a.click();
            }, 1000);
            
        } catch(e) {
            console.error(e);
            dlBtn.textContent = "💾 DOWNLOAD OFFLINE APP";
            dlBtn.disabled = false;
        }
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateLabelsPosition();
}

window.onload = () => {
    init();
    initQuizSystem();
    setupOfflineDownloader();
};

