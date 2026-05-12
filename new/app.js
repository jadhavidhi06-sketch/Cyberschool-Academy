/**
 * ============================================================
 *  CYBERSCHOOL ACADEMY — app.js  v5.0.0
 *  Complete JS for index.html + styles.css
 *  Backend: localStorage (drop-in AWS guide at bottom)
 *  Author: CyberSchool Academy Dev Team
 * ============================================================
 */

'use strict';

/* ============================================================
   SECTION 1 — MASTER DATA STORE
   All seed data. When migrating to AWS, replace these with
   fetch() calls to your API Gateway / Lambda endpoints.
   ============================================================ */

const SEED = {

  courses: [
    { id:'C001', title:'Ethical Hacking Pro',       dept:'ethical',    level:'Advanced',     price:'₹24,999', duration:'6 months', seats:12, maxSeats:30, tags:['CEH','OSCP-Prep','Hands-On'],    desc:'Complete penetration testing from recon to exploitation. 50+ real-world labs, live CTF access, and OSCP-prep pathway.' },
    { id:'C002', title:'OSINT Mastery',              dept:'osint',      level:'Intermediate', price:'₹18,999', duration:'4 months', seats:8,  maxSeats:25, tags:['OSINT','Recon','Threat Intel'],   desc:'Master Maltego, Shodan, Recon-ng and advanced OSINT frameworks. Build full target intelligence profiles.' },
    { id:'C003', title:'Cyber Law & Policy',         dept:'law',        level:'Beginner',     price:'₹14,999', duration:'3 months', seats:20, maxSeats:40, tags:['IT Act','GDPR','Legal'],          desc:'Indian IT Act 2000, GDPR, cybercrime law, digital evidence handling and legal framework for cyber cases.' },
    { id:'C004', title:'Digital Forensics',          dept:'forensics',  level:'Advanced',     price:'₹22,999', duration:'5 months', seats:5,  maxSeats:20, tags:['Autopsy','Volatility','Memory'],  desc:'Disk imaging, memory forensics, network analysis, and courtroom-ready evidence presentation techniques.' },
    { id:'C005', title:'Cloud Security Architect',   dept:'cloud',      level:'Expert',       price:'₹28,999', duration:'4 months', seats:15, maxSeats:35, tags:['AWS','Azure','CSSP'],             desc:'AWS, Azure, GCP security architecture, IAM policies, cloud-native tools and incident response.' },
    { id:'C006', title:'Red Team Operations',        dept:'ethical',    level:'Expert',       price:'₹34,999', duration:'8 months', seats:3,  maxSeats:15, tags:['Red Team','C2','Evasion'],        desc:'Full red team campaign planning, C2 frameworks, AV evasion and professional adversary-simulation reporting.' },
    { id:'C007', title:'OSINT & Social Engineering', dept:'osint',      level:'Intermediate', price:'₹21,999', duration:'3 months', seats:11, maxSeats:25, tags:['Social Eng','OSINT','Phishing'], desc:'Combine OSINT with social engineering for comprehensive assessments and phishing simulations.' },
    { id:'C008', title:'Mobile App Pentesting',      dept:'ethical',    level:'Intermediate', price:'₹19,999', duration:'4 months', seats:18, maxSeats:30, tags:['Android','iOS','OWASP'],          desc:'Android/iOS security testing with Frida, Objection, Burp Suite, and mobile malware analysis.' },
    { id:'C009', title:'Cyber Law for Corporates',   dept:'law',        level:'Beginner',     price:'₹16,999', duration:'2 months', seats:25, maxSeats:50, tags:['DPDP','ISO 27001','Compliance'], desc:'Data protection, IP law, corporate liability, compliance frameworks for Indian enterprises.' },
    { id:'C010', title:'B.Sc Cybersecurity (Hons)',  dept:'university', level:'Degree',       price:'₹1,20,000/yr', duration:'3 years', seats:40, maxSeats:60, tags:['UGC Approved','Degree','NAAC'], desc:'Full 3-year undergraduate programme in partnership with our university associates. UGC approved curriculum.' },
    { id:'C011', title:'M.Tech Information Security',dept:'university', level:'Post-Grad',    price:'₹1,50,000/yr', duration:'2 years', seats:20, maxSeats:30, tags:['Research','M.Tech','Thesis'],  desc:'Advanced research-based post-graduate programme in information security. Industry mentorship included.' },
    { id:'C012', title:'Diploma – Ethical Hacking',  dept:'college',    level:'Diploma',      price:'₹35,000',      duration:'1 year',  seats:30, maxSeats:60, tags:['Diploma','CEH-Prep','Labs'],    desc:'1-year intensive diploma program for college students. Recognized by CSA and partner corporations.' },
    { id:'C013', title:'Certificate – Cyber Forensics',dept:'college',  level:'Certificate',  price:'₹12,000',      duration:'6 months',seats:25, maxSeats:50, tags:['Certificate','Forensics','Lab'], desc:'Short-term certificate program designed for final-year college students and working professionals.' },
  ],

  events: [
    { id:'E001', title:'Cyber Warfare CTF 2025',      type:'ctf',      date:'2025-08-15', time:'10:00 AM', location:'Mumbai + Online', mode:'hybrid',  seats:200, maxSeats:500, fee:'Free',   desc:'National-level CTF with ₹5L prize pool. Teams of 4. 48-hour continuous competition.', countdown:true },
    { id:'E002', title:'OSINT Masterclass Workshop',  type:'workshop', date:'2025-08-22', time:'2:00 PM',  location:'Delhi Center',   mode:'offline', seats:35,  maxSeats:50,  fee:'₹499',   desc:'Hands-on 6-hour workshop on open-source intelligence with live exercises.', countdown:true },
    { id:'E003', title:'Cyber Law Seminar 2025',      type:'seminar',  date:'2025-09-01', time:'11:00 AM', location:'Online (Zoom)',   mode:'online',  seats:120, maxSeats:300, fee:'Free',   desc:'Expert panel discussion on India\'s new DPDP Act and its implications for businesses.', countdown:false },
    { id:'E004', title:'Hacker Meetup — Bangalore',   type:'meetup',   date:'2025-09-10', time:'6:00 PM',  location:'Bangalore Center',mode:'offline', seats:60,  maxSeats:80,  fee:'Free',   desc:'Monthly community meetup. Networking, lightning talks and a mini CTF.', countdown:false },
    { id:'E005', title:'Red Team Tactics Webinar',    type:'webinar',  date:'2025-09-18', time:'7:00 PM',  location:'Online',         mode:'online',  seats:400, maxSeats:1000,fee:'Free',   desc:'Advanced red teaming strategies by former CERT-In professionals.', countdown:false },
    { id:'E006', title:'Cloud Security Bootcamp',     type:'workshop', date:'2025-10-05', time:'9:00 AM',  location:'Mumbai Center',  mode:'offline', seats:20,  maxSeats:30,  fee:'₹999',   desc:'2-day intensive bootcamp covering AWS, Azure and GCP security architecture.', countdown:false },
  ],

  pastEvents: [
    { title:'Cyber Defense Summit 2024', date:'Dec 2024', img:'🏆', attendees:850 },
    { title:'National CTF Championship', date:'Oct 2024', img:'🎯', attendees:1200 },
    { title:'Digital Forensics Workshop', date:'Sep 2024', img:'🔬', attendees:300 },
    { title:'OSINT Masterclass',          date:'Aug 2024', img:'🔍', attendees:200 },
  ],

  team: [
    { id:'CSA-TEAM-001', name:'Dr. Priya Mehta',   role:'Head — Ethical Hacking',  clearance:'ADMIN',      joined:'2022-01-01', photo:'🛡️', verified:true, linkedin:'#', bio:'15+ years in offensive security. Former CERT-In advisor.' },
    { id:'CSA-TEAM-002', name:'Rahul Verma',        role:'Senior OSINT Instructor', clearance:'INSTRUCTOR', joined:'2022-06-15', photo:'🔍', verified:true, linkedin:'#', bio:'Ex-intelligence analyst. Published researcher in OSINT methodologies.' },
    { id:'CSA-TEAM-003', name:'Adv. Sneha Rao',    role:'Cyber Law Faculty',       clearance:'INSTRUCTOR', joined:'2023-01-01', photo:'⚖️', verified:true, linkedin:'#', bio:'Advocate specializing in IT Act, GDPR, and cybercrime litigation.' },
    { id:'CSA-TEAM-004', name:'Kiran Patel',        role:'Cloud Security Architect',clearance:'INSTRUCTOR', joined:'2023-03-01', photo:'☁️', verified:true, linkedin:'#', bio:'AWS Certified Solutions Architect. Former CISO at major FinTech.' },
    { id:'CSA-TEAM-005', name:'Amara Singh',        role:'Digital Forensics Lead',  clearance:'CORE',       joined:'2023-07-01', photo:'🔬', verified:true, linkedin:'#', bio:'Certified forensic examiner. Trained 500+ investigators.' },
    { id:'CSA-TEAM-006', name:'Dev Sharma',         role:'Operations Manager',      clearance:'CORE',       joined:'2022-02-01', photo:'⚡', verified:true, linkedin:'#', bio:'Ex-Army cyber unit. Manages all 6 offline training centers.' },
  ],

  partners: [
    { id:'CSA-PART-CYB', org:'CyberShield Technologies', type:'Corporate',   tier:'Gold',   since:'2023-01-01', status:'verified', openings:12, logo:'🛡️' },
    { id:'CSA-PART-TCS', org:'TCS Cybersecurity Unit',   type:'Enterprise',  tier:'Platinum',since:'2022-06-01',status:'verified', openings:25, logo:'💻' },
    { id:'CSA-PART-DFT', org:'DataFortress Pvt Ltd',     type:'Startup',     tier:'Silver', since:'2024-01-01', status:'verified', openings:8,  logo:'🔐' },
    { id:'CSA-PART-NGP', org:'NetGuard Pro',             type:'Corporate',   tier:'Gold',   since:'2023-09-01', status:'verified', openings:5,  logo:'🌐' },
    { id:'CSA-PART-FAKE',org:'Fake Corp Ltd',            type:'Unknown',     tier:'None',   since:'N/A',        status:'not-verified', openings:0, logo:'❌' },
  ],

  uniPartners: [
    { name:'IIT Bombay',       degree:'M.Tech Cybersecurity',       intake:40, city:'Mumbai',    accredited:'NAAC A++' },
    { name:'NIT Delhi',        degree:'B.Tech Information Security', intake:60, city:'Delhi',     accredited:'NAAC A+' },
    { name:'BITS Pilani',      degree:'M.Sc Digital Forensics',     intake:30, city:'Pilani',    accredited:'NAAC A++' },
    { name:'VIT Vellore',      degree:'MBA Cyber Management',       intake:45, city:'Vellore',   accredited:'NAAC A' },
    { name:'Amity University', degree:'B.Sc Cybersecurity',         intake:80, city:'Noida',     accredited:'NAAC A' },
  ],

  jobs: [
    { id:'J001', title:'Security Analyst',        company:'CyberShield', type:'Full-time',   location:'Mumbai',    salary:'₹8–14 LPA',   skills:['SIEM','SOC','Threat Intel'], deadline:'2025-08-31' },
    { id:'J002', title:'Penetration Tester',      company:'TCS Cyber',   type:'Full-time',   location:'Bangalore', salary:'₹12–20 LPA',  skills:['Kali','Burp Suite','OSCP'],   deadline:'2025-09-15' },
    { id:'J003', title:'Cloud Security Architect',company:'DataFortress', type:'Full-time',   location:'Remote',    salary:'₹18–28 LPA',  skills:['AWS','Azure','CSSP'],         deadline:'2025-09-01' },
    { id:'J004', title:'Cyber Law Consultant',    company:'LegalShield', type:'Freelance',   location:'Delhi',     salary:'₹50K–1L/mo',  skills:['IT Act','GDPR','Litigation'], deadline:'2025-10-01' },
    { id:'J005', title:'OSINT Analyst',           company:'NetGuard',    type:'Full-time',   location:'Hyderabad', salary:'₹6–10 LPA',   skills:['Maltego','Shodan','OSINT'],   deadline:'2025-08-25' },
    { id:'J006', title:'Digital Forensics Expert',company:'Govt (CERT)', type:'Government',  location:'Various',   salary:'₹10–16 LPA',  skills:['Autopsy','Volatility','FTK'], deadline:'2025-09-30' },
  ],

  internships: [
    { id:'I001', title:'SOC Intern',             company:'CyberShield', duration:'6 months', stipend:'₹15,000/mo', location:'Mumbai' },
    { id:'I002', title:'Red Team Intern',        company:'TCS Cyber',   duration:'3 months', stipend:'₹20,000/mo', location:'Bangalore' },
    { id:'I003', title:'Legal Research Intern',  company:'LegalShield', duration:'3 months', stipend:'₹10,000/mo', location:'Delhi' },
    { id:'I004', title:'Cloud Security Intern',  company:'DataFortress', duration:'4 months', stipend:'₹18,000/mo', location:'Remote' },
  ],

  blogs: [
    { id:'B001', title:'Top 10 Vulnerabilities in Indian Banking Apps 2025',          tag:'Threat Intel', date:'2025-07-20', author:'Dr. Priya Mehta', readTime:'8 min', excerpt:'A deep-dive into critical flaws found in popular UPI and banking applications...' },
    { id:'B002', title:'India\'s DPDP Act: What Every Business Must Know Now',         tag:'Cyber Law',    date:'2025-07-18', author:'Adv. Sneha Rao',  readTime:'6 min', excerpt:'The Digital Personal Data Protection Act 2023 is now enforceable. Here\'s your compliance checklist...' },
    { id:'B003', title:'OSINT Techniques Used by State-Sponsored Hackers in 2025',    tag:'OSINT',        date:'2025-07-15', author:'Rahul Verma',     readTime:'10 min',excerpt:'Nation-state actors are leveraging public data in increasingly sophisticated ways...' },
    { id:'B004', title:'Cloud Misconfigurations That Cost Companies Millions',         tag:'Cloud Sec',    date:'2025-07-12', author:'Kiran Patel',     readTime:'7 min', excerpt:'S3 buckets, exposed APIs, and IAM misconfigurations remain the leading cause of cloud breaches...' },
    { id:'B005', title:'Building a Home Lab for Ethical Hacking in 2025',             tag:'Guide',        date:'2025-07-10', author:'Dev Sharma',      readTime:'12 min',excerpt:'Step-by-step guide to setting up a professional penetration testing lab at home...' },
    { id:'B006', title:'How AI is Changing Cybersecurity — Threat and Defense',       tag:'AI Security',  date:'2025-07-08', author:'Dr. Priya Mehta', readTime:'9 min', excerpt:'Large language models are being weaponized for phishing, malware creation, and social engineering...' },
  ],

  cyberAlerts: [
    '🔴 ALERT: New zero-day in Apache Log4j variant — patch immediately',
    '🟡 WARNING: Surge in UPI phishing campaigns targeting Indian users',
    '🔴 CRITICAL: Ransomware group targeting Indian healthcare sector',
    '🟡 ADVISORY: CERT-In issues advisory on Windows SMB vulnerability',
    '🟢 INFO: CSA Threat Intelligence Report July 2025 released',
    '🔴 ALERT: AI-powered deepfake fraud targeting corporate executives',
  ],

  testimonials: [
    { name:'Arjun Sharma',    role:'Penetration Tester @ CyberShield', rating:5, text:'CSA completely transformed my career. The hands-on labs are unlike anything I found elsewhere. Got placed within 2 months of completing the course.' },
    { name:'Fatima Noor',     role:'OSINT Analyst @ NetGuard',         rating:5, text:'The OSINT Mastery course is world-class. Rahul sir\'s teaching style makes even complex concepts crystal clear. Highly recommended!' },
    { name:'Rohit Bansal',    role:'Cloud Security Architect @ TCS',   rating:5, text:'I came in with zero cloud knowledge. After 4 months, I cleared AWS Security Specialty and got a ₹22 LPA offer. This place delivers!' },
    { name:'Priya Krishnan',  role:'Cyber Law Consultant',             rating:5, text:'The Cyber Law course gave me a strong foundation to transition from a general lawyer to a specialized cyber law practitioner.' },
  ],

  faqs: [
    { q:'Is CSA government-recognized?', a:'Yes. Our courses are recognized by NASSCOM and EC-Council. University programs are UGC-approved. Certificates are accepted by all major Indian corporations and government agencies.' },
    { q:'Do I need prior experience to enroll?', a:'No. Beginner courses require zero prior experience. We have tracks for all levels from complete beginners to advanced professionals.' },
    { q:'What is the placement guarantee?', a:'We offer a 100% placement assistance guarantee. Our placement team actively connects students with partner companies. 94% of students get placed within 6 months.' },
    { q:'Can I attend classes online?', a:'Yes. All courses are available in online, offline (physical center), and hybrid modes. Live classes are recorded for later access.' },
    { q:'How do I verify a CSA certificate?', a:'Use our Verification Engine at cyberschool.ac/verify-cert. Enter the unique certificate ID (format: CSA-YYYY-XXXXXX) to get instant authenticity status.' },
    { q:'What are the payment options?', a:'We accept UPI, Credit/Debit Card, Net Banking, and EMI (No-cost EMI up to 12 months). Corporate billing is available for company-sponsored candidates.' },
  ],

  offlineCenters: [
    { city:'Mumbai',    address:'Level 8, Cyber Tower, BKC, Mumbai 400051',           badges:['lab','cert','corp'], capacity:120, phone:'+91 22 1234 5678' },
    { city:'Delhi NCR', address:'Block-C, Cyber Hub, Gurugram, Haryana 122002',       badges:['lab','cert'],        capacity:80,  phone:'+91 11 1234 5678' },
    { city:'Bangalore', address:'4th Floor, Tech Park, Whitefield, Bangalore 560066', badges:['lab','cert','corp'], capacity:150, phone:'+91 80 1234 5678' },
    { city:'Hyderabad', address:'IT Tower 2, HITEC City, Hyderabad 500081',           badges:['lab'],               capacity:60,  phone:'+91 40 1234 5678' },
    { city:'Pune',      address:'Innovation Hub, Hinjewadi Phase 2, Pune 411057',     badges:['cert','corp'],       capacity:70,  phone:'+91 20 1234 5678' },
    { city:'Chennai',   address:'Tidel Park, Taramani, Chennai 600113',               badges:['lab','cert'],        capacity:90,  phone:'+91 44 1234 5678' },
  ],

  certDB: {
    'CSA-2024-001337':{ type:'certificate', name:'Arjun Sharma',  course:'Ethical Hacking Pro',    date:'2024-08-15', grade:'Distinction', status:'valid',   issuer:'Dr. Priya Mehta', duration:'6 months' },
    'CSA-2024-007842':{ type:'certificate', name:'Fatima Noor',   course:'OSINT Mastery',          date:'2024-10-22', grade:'Merit',       status:'valid',   issuer:'Rahul Verma',    duration:'4 months' },
    'CSA-2023-002201':{ type:'certificate', name:'Rohit Bansal',  course:'Cloud Security Architect',date:'2023-12-01', grade:'Distinction', status:'valid',   issuer:'Kiran Patel',    duration:'4 months' },
    'CSA-FAKE-88888': { type:'certificate', name:'Unknown Actor', course:'Advanced Hacking',       date:'2023-01-01', grade:'Pass',        status:'fake',    issuer:'UNKNOWN',        duration:'N/A' },
    'CSA-EXP-2022':   { type:'certificate', name:'Old Student',   course:'Basic IT Security',      date:'2022-03-01', grade:'Pass',        status:'expired', issuer:'CSA Admin',      duration:'3 months' },
  },

  neuralEvents: [
    '✓ Certificate Verified — CSA-2024-001337',
    '⟳ New Enrollment — Ethical Hacking Pro',
    '⚡ CTF Lab Solved — SQL Injection',
    '✓ Assignment Submitted — Module 7',
    '⟳ Partner Joined — DataFortress Inc',
    '⚡ CTF Solved — CryptoChallenge #42',
    '✓ Certificate Generated — OSINT Course',
    '⟳ Student Enrolled — Cloud Security',
    '⚡ Admin 2FA Verified',
    '✓ B2B Proposal Approved — NIT Delhi',
    '⟳ 3 New Students Registered',
    '⚡ Lab Opened — Buffer Overflow 101',
    '✓ Partner Verified — TCS Cyber',
    '⟳ Event Registration — CTF 2025',
  ],

};


/* ============================================================
   SECTION 2 — LOCAL STORAGE DATABASE
   Mirrors what AWS DynamoDB / RDS would store.
   ============================================================ */

const DB = {
  _get: (k) => { try { return JSON.parse(localStorage.getItem('csa_'+k)) || null; } catch(e){ return null; } },
  _set: (k,v) => localStorage.setItem('csa_'+k, JSON.stringify(v)),

  get users()       { return this._get('users')       || []; },
  get proposals()   { return this._get('proposals')   || []; },
  get logs()        { return this._get('logs')         || []; },
  get genCerts()    { return this._get('gen_certs')    || []; },
  get enrollments() { return this._get('enrollments') || []; },
  get payments()    { return this._get('payments')     || []; },
  get inquiries()   { return this._get('inquiries')   || []; },
  get evRegs()      { return this._get('ev_regs')     || []; },
  get notifications(){ return this._get('notifications') || []; },
  get assignments() { return this._get('assignments') || []; },

  saveUsers(v)         { this._set('users', v); },
  saveProposals(v)     { this._set('proposals', v); },
  saveLogs(v)          { this._set('logs', v); },
  saveGenCerts(v)      { this._set('gen_certs', v); },
  saveEnrollments(v)   { this._set('enrollments', v); },
  savePayments(v)      { this._set('payments', v); },
  saveInquiries(v)     { this._set('inquiries', v); },
  saveEvRegs(v)        { this._set('ev_regs', v); },
  saveNotifications(v) { this._set('notifications', v); },
  saveAssignments(v)   { this._set('assignments', v); },
};

/* Seed default users on first run */
(function seedUsers() {
  const u = DB.users;
  if (!u.some(x => x.email === 'admin@cyberschool.ac')) {
    u.push({ id:'USR001', email:'admin@cyberschool.ac',   password:'admin123',   name:'Admin Override', role:'admin',   phone:'+91 98765 00001', joined:new Date().toISOString(), track:'Administration',   active:true });
    u.push({ id:'USR002', email:'student@cyberschool.ac', password:'student123', name:'Alex Hacker',    role:'student', phone:'+91 98765 00002', joined:new Date().toISOString(), track:'Ethical Hacking',  active:true });
    DB.saveUsers(u);
  }
})();

/* Seed CERT_DB with generated certs from storage */
(function loadGenCerts() {
  DB.genCerts.forEach(c => { SEED.certDB[c.id] = c; });
})();


/* ============================================================
   SECTION 3 — APP STATE
   ============================================================ */

let STATE = {
  currentUser: null,
  loginAttemptUser: null,
  currentPage: 'home',
  currentEnrollCourse: null,
  currentEventReg: null,
  heroAnimId: null,
  neuralEventIdx: 0,
  introSkipped: false,
};

/* restore session */
try {
  const saved = localStorage.getItem('csa_session');
  if (saved) STATE.currentUser = JSON.parse(saved);
} catch(e) {}


/* ============================================================
   SECTION 4 — CURSOR
   ============================================================ */

(function initCursor() {
  const cur = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cur || !ring) return;
  let mx=0, my=0, rx=0, ry=0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx+'px'; cur.style.top = my+'px';
  });

  setInterval(() => {
    rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
    ring.style.left = rx+'px'; ring.style.top = ry+'px';
  }, 16);

  document.addEventListener('mousedown', () => {
    cur.style.width='6px'; cur.style.height='6px';
    ring.style.width='50px'; ring.style.height='50px';
  });
  document.addEventListener('mouseup', () => {
    cur.style.width='12px'; cur.style.height='12px';
    ring.style.width='36px'; ring.style.height='36px';
  });

  document.addEventListener('mouseover', e => {
    const t = e.target.closest('a,button,[onclick],[class*="card"],[class*="item"],[class*="tab"],[class*="link"]');
    if (t) { ring.style.borderColor='var(--blue)'; ring.style.width='44px'; ring.style.height='44px'; }
    else    { ring.style.borderColor='var(--green)'; ring.style.width='36px'; ring.style.height='36px'; }
  });
})();


/* ============================================================
   SECTION 5 — TOAST NOTIFICATIONS
   ============================================================ */

function showToast(msg, type='info', icon='') {
  const icons = { success:'✓', error:'✗', info:'ℹ', warning:'⚠' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span style="flex-shrink:0;font-size:.9rem">${icon || icons[type]}</span><span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

function addNotification(msg, type='info') {
  const notifs = DB.notifications;
  notifs.unshift({ id:'N'+Date.now(), msg, type, time: new Date().toLocaleString(), read: false });
  if (notifs.length > 50) notifs.pop();
  DB.saveNotifications(notifs);
}


/* ============================================================
   SECTION 6 — ACTIVITY LOG
   ============================================================ */

function addLog(msg) {
  const logs = DB.logs;
  logs.unshift({ msg, time: new Date().toLocaleTimeString(), date: new Date().toLocaleDateString() });
  if (logs.length > 300) logs.pop();
  DB.saveLogs(logs);
}


/* ============================================================
   SECTION 7 — CINEMATIC INTRO
   ============================================================ */

function runIntro() {
  const canvas = document.getElementById('intro-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  /* Matrix rain */
  const cols = Math.floor(canvas.width / 14);
  const drops = Array.from({length:cols}, () => Math.random() * 50);
  const chars = 'アイウエオカキクケコ0123456789ABCDEF<>{}[]|/\\*&%$#@!?';

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0,0,0,0.055)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '12px JetBrains Mono';
    drops.forEach((y, i) => {
      const c = chars[Math.floor(Math.random() * chars.length)];
      const x = i * 14;
      const b = Math.random();
      ctx.fillStyle = b > .97 ? 'rgba(255,255,255,.9)' : b > .85 ? 'rgba(0,255,65,.9)' : `rgba(0,255,65,${.2+b*.4})`;
      ctx.fillText(c, x, y * 14);
      if (y * 14 > canvas.height && Math.random() > .95) drops[i] = 0;
      drops[i] += 0.6;
    });
  }

  const mi = setInterval(drawMatrix, 35);
  document.querySelectorAll('.vault-ring').forEach(r => r.style.opacity = '1');

  const steps = [
    {p:8,  m:'INITIALIZING SECURE BOOT SEQUENCE...'},
    {p:20, m:'LOADING ENCRYPTION MODULES [AES-256-GCM]...'},
    {p:35, m:'ESTABLISHING NEURAL NETWORK TOPOLOGY...'},
    {p:48, m:'VERIFYING CERTIFICATE CHAIN [CA:ROOT]...'},
    {p:62, m:'CALIBRATING THREAT DETECTION SYSTEMS...'},
    {p:75, m:'DECRYPTING VAULT ARCHIVE [RSA-4096]...'},
    {p:88, m:'AUTHENTICATING BIOMETRIC SIGNATURE...'},
    {p:96, m:'OPENING VAULT DOOR...'},
    {p:100,m:'ACCESS GRANTED — WELCOME, AGENT ✓'},
  ];

  const prog = document.getElementById('intro-progress');
  const status = document.getElementById('intro-status');
  const logo = document.getElementById('intro-logo');
  const sub = document.getElementById('intro-sub');
  let si = 0;

  function nextStep() {
    if (si >= steps.length) {
      clearInterval(mi);
      logo.style.cssText = 'opacity:1;transition:opacity .6s';
      sub.style.cssText  = 'opacity:1;transition:opacity .6s .3s';
      const lock = document.getElementById('vault-lock');
      lock.classList.add('visible');
      setTimeout(completeIntro, 1800);
      return;
    }
    const s = steps[si++];
    prog.style.width = s.p + '%';
    status.textContent = s.m;
    setTimeout(nextStep, 380 + Math.random() * 250);
  }
  setTimeout(nextStep, 500);
}

function completeIntro() {
  const intro = document.getElementById('cinematic-intro');
  intro.style.cssText = 'opacity:0;transition:opacity .9s;pointer-events:none';
  setTimeout(() => {
    intro.style.display = 'none';
    document.getElementById('app').classList.add('visible');
    document.getElementById('loading-screen').classList.add('hidden');
    initAll();
  }, 900);
}

function skipIntro() {
  document.getElementById('intro-progress').style.cssText = 'width:100%;transition:none';
  setTimeout(completeIntro, 200);
}


/* ============================================================
   SECTION 8 — MASTER INIT
   ============================================================ */

function initAll() {
  initHeroCanvas();
  initNeuralMap();
  renderAlertTicker();
  renderHomeCourses();
  renderHomeEvents();
  renderHomeOffline();
  renderTestimonials();
  renderFAQ();
  renderCourses('all');
  renderOfflineGrid('offline-grid');
  renderEvents('all');
  renderGallery();
  renderBlog();
  renderTeam();
  renderTeamVerifyGrid();
  renderCertDemoIds();
  renderJobs();
  renderInternships();
  renderPlacementCompanies();
  renderUniPartners();
  renderProposalList();
  renderActivePartners();
  updateAuthUI();
  addLog('SYSTEM: CyberSchool Academy v5.0.0 initialized');
}

/* ============================================================
   THEME TOGGLE — Academy (Crimson/Gold) ↔ Cyber (Neon)
   ============================================================ */

function toggleTheme() {
  const body = document.body;
  const btn  = document.getElementById('theme-toggle-btn');
  const isAcademy = body.classList.toggle('academy-theme');

  if (btn) {
    btn.innerHTML = isAcademy
      ? '<span class="theme-toggle-icon">💻</span> CYBER MODE'
      : '<span class="theme-toggle-icon">🛡️</span> ACADEMY MODE';
  }

  localStorage.setItem('csa_theme', isAcademy ? 'academy' : 'cyber');
}

/* Restore saved theme preference on load */
(function restoreTheme() {
  if (localStorage.getItem('csa_theme') === 'academy') {
    document.body.classList.add('academy-theme');
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.innerHTML = '<span class="theme-toggle-icon">💻</span> CYBER MODE';
  }
})();

/* ============================================================
   SECTION 9 — NAVIGATION
   ============================================================ */

function navigate(page) {
  STATE.currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const t = document.getElementById('page-' + page);
  if (t) t.classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset && l.dataset.page === page);
  });

  const hideFooter = ['login','register','student-dashboard','admin-dashboard'];
  document.getElementById('main-footer').style.display = hideFooter.includes(page) ? 'none' : 'block';

  window.scrollTo(0, 0);
  addLog(`NAV: /${page}`);

  if (page === 'student-dashboard') initStudentDashboard();
  if (page === 'admin-dashboard')   initAdminDashboard();
  if (page === 'login' || page === 'register') initAuthCanvas(page);
}

function goToDashboard() {
  if (!STATE.currentUser) return navigate('login');
  navigate(STATE.currentUser.role === 'admin' ? 'admin-dashboard' : 'student-dashboard');
}


/* ============================================================
   SECTION 10 — HERO CANVAS (Particle Network)
   ============================================================ */

function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth || window.innerWidth;
    canvas.height = canvas.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const nodes = Array.from({length:70}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - .5) * .4,
    vy: (Math.random() - .5) * .4,
    r: Math.random() * 2 + .5,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,255,65,0.35)';
      ctx.fill();
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i+1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${(1 - d/130) * .13})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }
    STATE.heroAnimId = requestAnimationFrame(draw);
  }
  if (STATE.heroAnimId) cancelAnimationFrame(STATE.heroAnimId);
  draw();
  animateCounter('stat-students', 0, 12847, 2400);
}

function animateCounter(id, from, to, dur) {
  const el = document.getElementById(id);
  if (!el) return;
  const s = Date.now();
  function upd() {
    const p = Math.min((Date.now() - s) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(from + e * (to - from)).toLocaleString();
    if (p < 1) requestAnimationFrame(upd);
  }
  upd();
}


/* ============================================================
   SECTION 11 — NEURAL MAP (3D Rotating Node Network)
   ============================================================ */

function initNeuralMap() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const container = document.getElementById('neural-map-container');
  canvas.width = container.offsetWidth || 900;
  canvas.height = 480;
  const ctx = canvas.getContext('2d');

  const nodeLabels = ['Mumbai HQ','Delhi Center','Cert Engine','OSINT Lab','Student DB','Partner API','CTF Server','Verify Node','Admin Core','Firewall'];
  const nodeColors = ['#00ff41','#00d4ff','#7b2fff','#ff6b2b','#00ff41','#00d4ff','#ff3366','#00ff41','#ffd700','#00d4ff'];

  const nodes = nodeLabels.map((label, i) => {
    const angle = i * (Math.PI * 2 / 10) + Math.random() * .3;
    const r = 140 + Math.random() * 60;
    return { x: Math.cos(angle)*r, y: (Math.random()-.5)*140, z: Math.sin(angle)*r, label, color: nodeColors[i], pulse:0, size: 4 + Math.random()*3 };
  });

  let rot = 0, isDragging = false, lastX = 0;

  function project(x, y, z, rot) {
    const cx = Math.cos(rot)*x - Math.sin(rot)*z;
    const cz = Math.sin(rot)*x + Math.cos(rot)*z;
    const scale = 380 / (380 + cz);
    return { sx: canvas.width/2 + cx*scale, sy: canvas.height/2 + y*scale, scale };
  }

  function draw3d() {
    ctx.fillStyle = 'rgba(5,5,5,.28)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const proj = nodes.map(n => {
      const p = project(n.x, n.y, n.z, rot);
      return {...n, ...p};
    }).sort((a,b) => a.scale - b.scale);

    /* connections */
    proj.forEach((a, i) => {
      proj.slice(i+1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.z - b.z);
        if (d < 220) {
          ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy);
          ctx.strokeStyle = `rgba(0,212,255,${(.5 - d/440) * a.scale * .5})`;
          ctx.lineWidth = .5 * a.scale;
          ctx.stroke();
        }
      });
    });

    /* nodes */
    proj.forEach(n => {
      n.pulse = (n.pulse + .04) % 1;
      const r = n.size * n.scale;
      ctx.beginPath(); ctx.arc(n.sx, n.sy, r, 0, Math.PI*2);
      ctx.fillStyle = n.color; ctx.fill();
      /* pulse ring */
      ctx.beginPath(); ctx.arc(n.sx, n.sy, r + n.pulse * 14, 0, Math.PI*2);
      ctx.strokeStyle = n.color.replace('#', 'rgba(') + `,${.25*(1-n.pulse)})`.replace('rgba(','rgba(')
        .replace(/(rgba\()([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})(,)/, (_,a,r,g,b,c) =>
          `rgba(${parseInt(r,16)},${parseInt(g,16)},${parseInt(b,16)},`);
      ctx.globalAlpha = .3*(1-n.pulse);
      ctx.lineWidth = 1; ctx.stroke();
      ctx.globalAlpha = 1;
      /* label */
      if (n.scale > .82) {
        ctx.font = `${Math.floor(9 * n.scale)}px JetBrains Mono`;
        ctx.fillStyle = 'rgba(240,240,240,.8)';
        ctx.fillText(n.label, n.sx + r + 4, n.sy + 3);
      }
    });

    if (!isDragging) rot += .003;
    const coordEl = document.getElementById('neural-coords');
    if (coordEl) coordEl.textContent = `ROT: ${rot.toFixed(2)} | NODES: ${nodes.length} | LATENCY: ${Math.floor(Math.random()*5+2)}ms`;
    requestAnimationFrame(draw3d);
  }
  draw3d();

  canvas.addEventListener('mousedown', e => { isDragging=true; lastX=e.clientX; });
  canvas.addEventListener('mousemove', e => { if(isDragging){ rot += (e.clientX-lastX)*.005; lastX=e.clientX; }});
  canvas.addEventListener('mouseup',   () => isDragging=false);
  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    nodes.forEach(n => {
      const p = project(n.x, n.y, n.z, rot);
      if (Math.hypot(mx - p.sx, my - p.sy) < 20) showToast(`Node: ${n.label} — Active | ${Math.floor(Math.random()*10)+1}ms`, 'info', '⬡');
    });
  });

  /* live feed */
  function addNeuralEvent() {
    const feedEl = document.getElementById('neural-events');
    if (!feedEl) return;
    const ev = document.createElement('div');
    ev.className = 'neural-event new';
    ev.textContent = SEED.neuralEvents[STATE.neuralEventIdx % SEED.neuralEvents.length];
    feedEl.insertBefore(ev, feedEl.firstChild);
    if (feedEl.children.length > 7) feedEl.removeChild(feedEl.lastChild);
    STATE.neuralEventIdx++;
    setTimeout(() => ev.classList.remove('new'), 3000);
  }
  addNeuralEvent();
  setInterval(addNeuralEvent, 2800);
}


/* ============================================================
   SECTION 12 — CYBER ALERT TICKER
   ============================================================ */

function renderAlertTicker() {
  const el = document.getElementById('alert-ticker-content');
  if (!el) return;
  const repeated = [...SEED.cyberAlerts, ...SEED.cyberAlerts].join('   ·   ');
  el.textContent = repeated;
}


/* ============================================================
   SECTION 13 — HOME PAGE RENDERERS
   ============================================================ */

function renderHomeCourses() {
  const el = document.getElementById('home-courses-grid');
  if (!el) return;
  el.innerHTML = SEED.courses.slice(0, 4).map(c => courseCardHTML(c, true)).join('');
}

function renderHomeEvents() {
  const el = document.getElementById('home-events-grid');
  if (!el) return;
  el.innerHTML = SEED.events.slice(0, 3).map(e => eventCardHTML(e)).join('');
}

function renderHomeOffline() {
  const el = document.getElementById('home-offline-grid');
  if (!el) return;
  el.innerHTML = SEED.offlineCenters.slice(0, 3).map(c => offlineCenterHTML(c)).join('');
}

function renderTestimonials() {
  const el = document.getElementById('testimonials-grid');
  if (!el) return;
  el.innerHTML = SEED.testimonials.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">${'★'.repeat(t.rating)}</div>
      <div class="testimonial-text">"${t.text}"</div>
      <div class="testimonial-author">${t.name}</div>
      <div class="testimonial-role">${t.role}</div>
    </div>`).join('');
}

function renderFAQ() {
  const el = document.getElementById('faq-list');
  if (!el) return;
  el.innerHTML = SEED.faqs.map((f, i) => `
    <div class="faq-item">
      <div class="faq-question" onclick="toggleFAQ(${i},this)">
        <span>${f.q}</span>
        <span class="faq-arrow">▶</span>
      </div>
      <div class="faq-answer" id="faq-${i}">${f.a}</div>
    </div>`).join('');
}

function toggleFAQ(i, el) {
  const ans = document.getElementById('faq-' + i);
  const isOpen = ans.classList.contains('open');
  document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('open'));
  if (!isOpen) { ans.classList.add('open'); el.classList.add('open'); }
}


/* ============================================================
   SECTION 14 — COURSES PAGE
   ============================================================ */

function renderCourses(dept) {
  ['courses-grid', 'home-courses-grid'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const list = dept === 'all' ? SEED.courses : SEED.courses.filter(c => c.dept === dept);
    el.innerHTML = list.map(c => courseCardHTML(c)).join('');
  });
}

function courseCardHTML(c, mini=false) {
  const seatsLeft = c.maxSeats - c.seats;
  const pct = Math.round((seatsLeft / c.maxSeats) * 100);
  const seatClass = pct < 30 ? 'low' : pct < 60 ? 'med' : 'high';
  const seatColor = pct < 30 ? 'var(--red)' : pct < 60 ? 'var(--orange)' : 'var(--green)';
  return `
  <div class="course-card" data-dept="${c.dept}">
    <button class="pdf-badge" onclick="downloadSyllabus('${c.id}')">📄 SYLLABUS</button>
    <div class="course-dept">${c.dept.toUpperCase()} / ${c.level}</div>
    <div class="course-title">${c.title}</div>
    <div class="course-desc">${c.desc}</div>
    <div class="course-meta">${c.tags.map(t=>`<span class="course-tag">${t}</span>`).join('')}</div>
    <div class="course-seats">
      <span style="color:${seatColor};font-size:.62rem">${seatsLeft} seats</span>
      <div class="seats-bar"><div class="seats-fill ${seatClass}" style="width:${pct}%"></div></div>
      <span style="color:var(--text3);font-size:.62rem">${c.duration}</span>
    </div>
    <div class="course-footer">
      <div class="course-price">${c.price}</div>
      <button class="course-enroll" onclick="openEnrollModal('${c.id}')">ENROLL →</button>
    </div>
  </div>`;
}

function filterDept(el, dept) {
  document.querySelectorAll('.dept-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderCourses(dept);
}

function downloadSyllabus(id) {
  const c = SEED.courses.find(x => x.id === id);
  if (!c) return;
  const text = `CYBERSCHOOL ACADEMY\n${'='.repeat(50)}\nSYLLABUS — ${c.title}\nID: ${id} | Duration: ${c.duration} | Level: ${c.level}\n\nDESCRIPTION:\n${c.desc}\n\nMODULES:\n1. Foundation & Environment Setup\n2. Core Concepts & Theory\n3. Hands-On Labs (20+)\n4. Advanced Techniques\n5. CTF Challenges & Real-World Scenarios\n6. Final Assessment & Certificate\n\nTAGS: ${c.tags.join(', ')}\nPRICE: ${c.price}\n\nFor queries: info@cyberschool.ac`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], {type:'text/plain'}));
  a.download = `CSA-Syllabus-${id}.txt`;
  a.click();
  showToast(`Syllabus downloaded: ${c.title}`, 'success');
  addLog(`SYLLABUS DOWNLOAD: ${id}`);
}

function openEnrollModal(courseId) {
  if (!STATE.currentUser) { navigate('login'); showToast('Login to enroll', 'info'); return; }
  const c = SEED.courses.find(x => x.id === courseId);
  if (!c) return;
  STATE.currentEnrollCourse = c;
  document.getElementById('course-modal-title').textContent = c.title;
  document.getElementById('course-modal-meta').textContent = `${c.price} · ${c.duration} · ${c.level}`;
  document.getElementById('enroll-name').value  = STATE.currentUser.name  || '';
  document.getElementById('enroll-email').value = STATE.currentUser.email || '';
  document.getElementById('enroll-phone').value = STATE.currentUser.phone || '';
  openModal('course-modal');
}

function completeEnroll() {
  const name  = document.getElementById('enroll-name').value.trim();
  const email = document.getElementById('enroll-email').value.trim();
  const phone = document.getElementById('enroll-phone').value.trim();
  const pay   = document.getElementById('enroll-payment').value;
  if (!name || !email || !phone) { showToast('Fill all fields', 'error'); return; }

  const c = STATE.currentEnrollCourse;
  const enrollment = {
    id: 'ENR'+Date.now(),
    userId: STATE.currentUser.id,
    courseId: c.id,
    courseName: c.title,
    name, email, phone, payment: pay,
    date: new Date().toISOString(),
    progress: 0,
    status: 'active',
  };
  const enrs = DB.enrollments;
  enrs.push(enrollment);
  DB.saveEnrollments(enrs);

  const payments = DB.payments;
  payments.push({ id:'PAY'+Date.now(), userId: STATE.currentUser.id, desc: c.title, amount: c.price, date: new Date().toLocaleDateString(), status:'Completed' });
  DB.savePayments(payments);

  addNotification(`Enrolled in ${c.title}`, 'success');
  addLog(`ENROLL: ${email} → ${c.title}`);
  showToast(`Enrolled in ${c.title}! Check your dashboard.`, 'success', '🎉');
  closeModal('course-modal');
}


/* ============================================================
   SECTION 15 — OFFLINE CENTERS
   ============================================================ */

function offlineCenterHTML(c) {
  return `
  <div class="offline-card">
    <div class="offline-city">${c.city}</div>
    <div class="offline-address">${c.address}</div>
    <div class="offline-badges">
      ${c.badges.map(b=>`<span class="offline-badge ${b}">${b.toUpperCase()}</span>`).join('')}
    </div>
    <div class="offline-capacity">Capacity: ${c.capacity} seats · ${c.phone}</div>
    <button class="course-enroll" style="margin-top:.8rem;font-size:.6rem" onclick="showToast('Redirecting to ${c.city} center booking...','info')">BOOK SEAT →</button>
  </div>`;
}

function renderOfflineGrid(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = SEED.offlineCenters.map(c => offlineCenterHTML(c)).join('');
}


/* ============================================================
   SECTION 16 — EVENTS PAGE
   ============================================================ */

function eventCardHTML(ev) {
  const date = new Date(ev.date);
  const now  = new Date();
  const diff = date - now;
  const days = Math.max(0, Math.floor(diff / 86400000));
  const seatsLeft = ev.maxSeats - ev.seats;
  const pct = Math.round((seatsLeft / ev.maxSeats) * 100);
  return `
  <div class="event-card" data-type="${ev.type}">
    <div class="event-type-badge">${ev.type.toUpperCase()}</div>
    <div class="event-title">${ev.title}</div>
    <div class="event-meta">
      <span>📅 ${ev.date} · ${ev.time}</span>
      <span>📍 ${ev.location}</span>
      <span>💰 ${ev.fee}</span>
    </div>
    <div class="event-desc">${ev.desc}</div>
    ${days > 0 ? `<div class="event-countdown" id="countdown-${ev.id}">⏱ ${days}d ${Math.floor((diff%(86400000))/3600000)}h remaining</div>` : '<div class="event-countdown" style="color:var(--red)">⚡ LIVE NOW</div>'}
    <div class="course-seats" style="margin:.75rem 0">
      <span style="color:var(--green);font-size:.62rem">${seatsLeft} spots left</span>
      <div class="seats-bar"><div class="seats-fill high" style="width:${pct}%"></div></div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center">
      <span class="event-mode ${ev.mode}">${ev.mode.toUpperCase()}</span>
      <button class="course-enroll" onclick="openEventModal('${ev.id}')">REGISTER →</button>
    </div>
  </div>`;
}

function renderEvents(type) {
  const el = document.getElementById('events-grid');
  if (!el) return;
  const list = type === 'all' ? SEED.events : SEED.events.filter(e => e.type === type);
  el.innerHTML = list.map(e => eventCardHTML(e)).join('');
}

function filterEvents(el, type) {
  document.querySelectorAll('.events-filter-tabs .dept-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderEvents(type);
}

function renderGallery() {
  const el = document.getElementById('gallery-grid');
  if (!el) return;
  el.innerHTML = SEED.pastEvents.map(e => `
    <div class="gallery-item">
      <div style="font-size:3rem;text-align:center;padding:1.5rem">${e.img}</div>
      <div style="font-family:var(--font-head);font-weight:600;font-size:.85rem;padding:.5rem 1rem">${e.title}</div>
      <div style="font-family:var(--font-mono);font-size:.62rem;color:var(--text3);padding:0 1rem .75rem">${e.date} · ${e.attendees.toLocaleString()} attendees</div>
    </div>`).join('');
}

function openEventModal(evId) {
  const ev = SEED.events.find(e => e.id === evId);
  if (!ev) return;
  STATE.currentEventReg = ev;
  document.getElementById('event-modal-title').textContent = ev.title;
  document.getElementById('event-modal-meta').textContent = `${ev.date} · ${ev.time} · ${ev.location} · Fee: ${ev.fee}`;
  if (STATE.currentUser) {
    document.getElementById('ev-name').value  = STATE.currentUser.name  || '';
    document.getElementById('ev-email').value = STATE.currentUser.email || '';
    document.getElementById('ev-phone').value = STATE.currentUser.phone || '';
  }
  openModal('event-modal');
}

function registerEvent() {
  const name  = document.getElementById('ev-name').value.trim();
  const email = document.getElementById('ev-email').value.trim();
  const phone = document.getElementById('ev-phone').value.trim();
  const mode  = document.getElementById('ev-mode').value;
  if (!name || !email || !phone) { showToast('Fill all fields', 'error'); return; }
  const ev = STATE.currentEventReg;
  const regs = DB.evRegs;
  regs.push({ id:'ER'+Date.now(), evId: ev.id, evTitle: ev.title, name, email, phone, mode, date: new Date().toISOString() });
  DB.saveEvRegs(regs);
  addLog(`EVENT REG: ${email} → ${ev.title}`);
  showToast(`Registered for ${ev.title}! Confirmation WhatsApp message sent.`, 'success', '🎉');
  addNotification(`Event registration confirmed: ${ev.title}`, 'success');
  closeModal('event-modal');
}


/* ============================================================
   SECTION 17 — CERTIFICATE VERIFICATION
   ============================================================ */

function renderCertDemoIds() {
  const el = document.getElementById('cert-demo-ids');
  if (!el) return;
  el.innerHTML = Object.keys(SEED.certDB).map(id =>
    `<button class="demo-id-btn" onclick="document.getElementById('cert-verify-input').value='${id}';verifyCertificate()">${id}</button>`
  ).join('');
}

function verifyCertificate() {
  const id  = (document.getElementById('cert-verify-input').value || '').trim().toUpperCase();
  const res = document.getElementById('cert-verify-result');
  if (!id) { showToast('Enter a certificate ID', 'error'); return; }

  const r = SEED.certDB[id];
  if (!r) {
    res.className = 'verify-result invalid show';
    res.innerHTML = verifyStatusHTML('invalid', 'SECURITY CLEARANCE: FAKE / NOT FOUND', 'This ID does not exist in our database. This may be a fraudulent certificate.', []);
    addLog(`CERT VERIFY: ${id} — NOT FOUND`);
    return;
  }

  const statusClass = r.status === 'valid' ? 'valid' : 'invalid';
  const statusLabel = r.status === 'valid' ? 'SECURITY CLEARANCE: VALID' : r.status === 'expired' ? 'CLEARANCE: EXPIRED' : 'CLEARANCE: FAKE — FRAUDULENT';
  const details = [
    { label:'HOLDER',    value: r.name },
    { label:'COURSE',    value: r.course },
    { label:'DATE',      value: r.date },
    { label:'GRADE',     value: r.grade },
    { label:'DURATION',  value: r.duration },
    { label:'ISSUER',    value: r.issuer },
  ];

  res.className = `verify-result ${statusClass} show`;
  res.innerHTML = verifyStatusHTML(statusClass, statusLabel, `Certificate ID: ${id}`, details);
  addLog(`CERT VERIFY: ${id} — ${r.status.toUpperCase()}`);
}

function verifyPartner() {
  const id  = (document.getElementById('partner-verify-input').value || '').trim().toUpperCase();
  const res = document.getElementById('partner-verify-result');
  if (!id) { showToast('Enter a partner ID', 'error'); return; }

  const r = SEED.partners.find(p => p.id === id);
  if (!r) {
    res.className = 'verify-result invalid show';
    res.innerHTML = verifyStatusHTML('invalid', 'PARTNER: NOT FOUND', 'This partner ID does not exist in our registry.', []);
    return;
  }
  const statusClass = r.status === 'verified' ? 'valid' : 'invalid';
  const statusLabel = r.status === 'verified' ? 'PARTNER: VERIFIED ✓' : 'PARTNER: NOT VERIFIED ✗';
  const details = [
    { label:'ORGANIZATION', value: r.org },
    { label:'TYPE',         value: r.type },
    { label:'TIER',         value: r.tier },
    { label:'SINCE',        value: r.since },
    { label:'OPENINGS',     value: r.openings > 0 ? r.openings + ' active jobs' : 'N/A' },
  ];
  res.className = `verify-result ${statusClass} show`;
  res.innerHTML = verifyStatusHTML(statusClass, statusLabel, `Partner ID: ${id}`, details);
  addLog(`PARTNER VERIFY: ${id} — ${r.status.toUpperCase()}`);
}

function verifyTeamMember() {
  const id  = (document.getElementById('team-verify-input').value || '').trim().toUpperCase();
  const res = document.getElementById('team-verify-result');
  if (!id) { showToast('Enter a team ID', 'error'); return; }

  const r = SEED.team.find(t => t.id === id);
  if (!r) {
    res.className = 'verify-result invalid show';
    res.innerHTML = verifyStatusHTML('invalid', 'MEMBER: NOT FOUND', 'This ID is not in our team registry.', []);
    return;
  }
  const details = [
    { label:'NAME',      value: r.name },
    { label:'ROLE',      value: r.role },
    { label:'CLEARANCE', value: r.clearance },
    { label:'JOINED',    value: r.joined },
  ];
  res.className = 'verify-result valid show';
  res.innerHTML = verifyStatusHTML('valid', 'MEMBER: VERIFIED ✓', `Team ID: ${id}`, details);
  addLog(`TEAM VERIFY: ${id} — VALID`);
}

function verifyStatusHTML(statusClass, statusLabel, sub, details) {
  const icon = statusClass === 'valid' ? '✓' : '✗';
  return `
    <div class="verify-status">
      <div class="status-icon ${statusClass}">${icon}</div>
      <div><div class="status-label ${statusClass}">${statusLabel}</div>
      <div style="font-family:var(--font-mono);font-size:.65rem;color:var(--text3)">${sub}</div></div>
    </div>
    ${details.length ? `<div class="verify-details">
      ${details.map(d=>`<div class="verify-detail"><div class="verify-detail-label">${d.label}</div><div class="verify-detail-value">${d.value}</div></div>`).join('')}
    </div>` : ''}`;
}

function renderTeamVerifyGrid() {
  const el = document.getElementById('team-verify-grid');
  if (!el) return;
  el.innerHTML = SEED.team.map(t => `
    <div class="team-verify-card">
      <div class="team-verify-photo">${t.photo}</div>
      <div class="team-verify-name">${t.name}</div>
      <div class="team-verify-role">${t.role}</div>
      <div class="team-verify-id" onclick="document.getElementById('team-verify-input').value='${t.id}';verifyTeamMember()">${t.id}</div>
      <div class="verify-badge-green">✓ VERIFIED</div>
    </div>`).join('');
}


/* ============================================================
   SECTION 18 — COLLABORATION / B2B PORTAL
   ============================================================ */

function handleDragOver(e) { e.preventDefault(); e.currentTarget.classList.add('dragover'); }
function handleDrop(e) {
  e.preventDefault(); e.currentTarget.classList.remove('dragover');
  const f = e.dataTransfer.files[0];
  if (f) document.getElementById('file-name').textContent = '📎 ' + f.name;
}
function handleFileSelect(input) {
  const f = input.files[0];
  if (f) document.getElementById('file-name').textContent = '📎 ' + f.name;
}

function submitProposal() {
  const orgType   = document.getElementById('org-type').value;
  const orgName   = document.getElementById('org-name').value.trim();
  const contact   = document.getElementById('org-contact').value.trim();
  const email     = document.getElementById('org-email').value.trim();
  const phone     = document.getElementById('org-phone').value.trim();
  const purpose   = document.getElementById('org-purpose').value;
  const proposal  = document.getElementById('org-proposal').value.trim();

  if (!orgType || !orgName || !email || !purpose) { showToast('Fill all required fields', 'error'); return; }

  const p = {
    id: 'PROP-'+Date.now(),
    orgType, orgName, contact, email, phone, purpose, proposal,
    date: new Date().toLocaleDateString(),
    stepIdx: 0,
    status: 'Submitted',
  };
  const props = DB.proposals;
  props.push(p);
  DB.saveProposals(props);
  renderProposalList();

  ['org-name','org-contact','org-email','org-phone','org-proposal'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  document.getElementById('file-name').textContent = '';
  addLog(`B2B PROPOSAL: ${orgName} (${orgType}) submitted`);
  showToast(`Proposal submitted! Tracking ID: ${p.id}`, 'success', '✓');

  setTimeout(() => {
    p.stepIdx = 1; p.status = 'Under Review';
    DB.saveProposals(DB.proposals.map(x => x.id===p.id ? p : x));
    renderProposalList();
  }, 4000);
}

function renderProposalList() {
  const el = document.getElementById('proposal-list');
  if (!el) return;
  const props = DB.proposals;
  if (!props.length) {
    el.innerHTML = `<div style="font-family:var(--font-mono);font-size:.7rem;color:var(--text3);text-align:center;padding:1.5rem">No proposals yet. Submit your first one →</div>`;
    return;
  }
  const steps = ['Submitted','Under Review','Approved','Active'];
  el.innerHTML = props.slice(-5).reverse().map(p => `
    <div style="background:var(--surface3);padding:1rem;margin-bottom:.6rem;border-left:2px solid var(--green)">
      <div style="font-family:var(--font-head);font-weight:600;font-size:.9rem">${p.orgName}</div>
      <div style="font-family:var(--font-mono);font-size:.6rem;color:var(--text3);margin:.2rem 0">${p.orgType} · ${p.date}</div>
      <div style="margin-top:.5rem">
        ${steps.map((s,i) => `
          <div class="tracker-step">
            <div class="tracker-dot ${i < p.stepIdx ? 'done' : i===p.stepIdx ? 'active' : 'pending'}"></div>
            <div class="tracker-label ${i < p.stepIdx ? 'done' : i===p.stepIdx ? 'active' : 'pending'}">${s}</div>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

function renderActivePartners() {
  const el = document.getElementById('active-partners-list');
  if (!el) return;
  el.innerHTML = SEED.partners.filter(p=>p.status==='verified').slice(0,3).map(p => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:.45rem 0;border-bottom:1px solid var(--border);font-family:var(--font-mono);font-size:.7rem">
      <span>${p.logo} ${p.org}</span>
      <span style="color:var(--green);font-size:.62rem">${p.tier}</span>
    </div>`).join('');
}


/* ============================================================
   SECTION 19 — BLOG
   ============================================================ */

function renderBlog() {
  const el = document.getElementById('blog-grid');
  if (!el) return;
  el.innerHTML = SEED.blogs.map(b => `
    <div class="blog-card" onclick="showToast('Blog post: ${b.title.slice(0,30)}...','info')">
      <div class="blog-tag">${b.tag}</div>
      <div class="blog-title">${b.title}</div>
      <div class="blog-excerpt">${b.excerpt}</div>
      <div class="blog-meta">
        <span>${b.author}</span>
        <span>${b.date} · ${b.readTime} read</span>
      </div>
    </div>`).join('');
}


/* ============================================================
   SECTION 20 — TEAM PAGE
   ============================================================ */

function renderTeam() {
  const el = document.getElementById('team-grid');
  if (!el) return;
  el.innerHTML = SEED.team.map(t => `
    <div class="team-card">
      <div class="team-photo">${t.photo}</div>
      <div class="team-name">${t.name}</div>
      <div class="team-role">${t.role}</div>
      <div class="team-clearance">${t.clearance}</div>
      <div class="team-id" onclick="navigate('verify-team');document.getElementById('team-verify-input').value='${t.id}';verifyTeamMember()">${t.id}</div>
      <div class="team-bio">${t.bio}</div>
    </div>`).join('');
}


/* ============================================================
   SECTION 21 — JOBS, INTERNSHIPS & PLACEMENTS
   ============================================================ */

function renderJobs() {
  const el = document.getElementById('jobs-list');
  if (!el) return;
  el.innerHTML = SEED.jobs.map(j => `
    <div class="job-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.5rem">
        <div>
          <div class="job-title">${j.title}</div>
          <div class="job-company">${j.company} · ${j.location}</div>
        </div>
        <span class="job-type-badge">${j.type}</span>
      </div>
      <div class="job-salary">${j.salary}</div>
      <div class="job-skills">${j.skills.map(s=>`<span class="course-tag">${s}</span>`).join('')}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:.75rem">
        <span style="font-family:var(--font-mono);font-size:.6rem;color:var(--text3)">Deadline: ${j.deadline}</span>
        <button class="course-enroll" onclick="applyJob('${j.id}')">APPLY →</button>
      </div>
    </div>`).join('');
}

function renderInternships() {
  const el = document.getElementById('internship-list');
  if (!el) return;
  el.innerHTML = SEED.internships.map(i => `
    <div class="job-card" style="border-color:var(--purple)">
      <div class="job-title">${i.title} <span style="font-family:var(--font-mono);font-size:.6rem;color:var(--purple)">INTERNSHIP</span></div>
      <div class="job-company">${i.company} · ${i.location}</div>
      <div class="job-salary">${i.stipend} · ${i.duration}</div>
      <button class="course-enroll" style="margin-top:.6rem;width:100%" onclick="applyJob('${i.id}')">APPLY →</button>
    </div>`).join('');
}

function renderPlacementCompanies() {
  const el = document.getElementById('placement-companies');
  if (!el) return;
  el.innerHTML = SEED.partners.filter(p=>p.status==='verified').map(p => `
    <div class="partner-card">
      <div class="partner-logo">${p.logo}</div>
      <div class="partner-name">${p.org}</div>
      <div class="partner-type">${p.type} · ${p.tier}</div>
      <div class="partner-openings" style="color:var(--green)">${p.openings} openings</div>
    </div>`).join('');
}

function renderUniPartners() {
  const el = document.getElementById('uni-partners');
  if (!el) return;
  el.innerHTML = SEED.uniPartners.map(u => `
    <div style="background:var(--surface2);border:1px solid var(--border);padding:1rem;margin-bottom:.75rem">
      <div style="font-family:var(--font-head);font-weight:700;color:var(--purple);margin-bottom:.3rem">${u.name}</div>
      <div style="font-family:var(--font-mono);font-size:.7rem;color:var(--text2)">${u.degree}</div>
      <div style="font-family:var(--font-mono);font-size:.62rem;color:var(--text3);margin-top:.3rem">${u.city} · Intake: ${u.intake} · ${u.accredited}</div>
      <button class="course-enroll" style="margin-top:.6rem;font-size:.6rem;width:100%" onclick="showToast('Application portal opening soon','info')">APPLY →</button>
    </div>`).join('');
}

function applyJob(id) {
  if (!STATE.currentUser) { navigate('login'); showToast('Login to apply', 'info'); return; }
  showToast('Application submitted! Our placement team will contact you within 48 hours.', 'success', '✓');
  addLog(`JOB APPLY: ${STATE.currentUser.email} → ${id}`);
}


/* ============================================================
   SECTION 22 — CONTACT PAGE
   ============================================================ */

function submitContact() {
  const name  = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const subj  = document.getElementById('contact-subject').value;
  const msg   = document.getElementById('contact-msg').value.trim();
  if (!name || !email || !msg) { showToast('Fill all fields', 'error'); return; }
  const inqs = DB.inquiries;
  inqs.push({ id:'INQ'+Date.now(), name, email, subject:subj, message:msg, date:new Date().toISOString(), status:'New' });
  DB.saveInquiries(inqs);
  addLog(`INQUIRY: ${email} — ${subj}`);
  showToast(`Message sent! We'll reply within 24 hours.`, 'success', '✓');
  ['contact-name','contact-email','contact-msg'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}


/* ============================================================
   SECTION 23 — AUTH (Login / Register / 2FA)
   ============================================================ */

function initAuthCanvas(page) {
  const id = page === 'login' ? 'login-canvas' : 'register-canvas';
  const canvas = document.getElementById(id);
  if (!canvas || canvas._init) return;
  canvas._init = true;
  const ctx = canvas.getContext('2d');
  function resize() { canvas.width = canvas.offsetWidth||window.innerWidth; canvas.height = canvas.offsetHeight||window.innerHeight; }
  resize();
  const pts = Array.from({length:60}, () => ({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*2+.5}));
  function draw() {
    ctx.fillStyle = 'rgba(10,10,10,.18)'; ctx.fillRect(0,0,canvas.width,canvas.height);
    pts.forEach(p => {
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>canvas.width)p.vx*=-1; if(p.y<0||p.y>canvas.height)p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle='rgba(0,255,65,.25)'; ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

function fillCred(email, pass) {
  document.getElementById('login-email').value = email;
  document.getElementById('login-pass').value  = pass;
}

function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;
  if (!email || !pass) { showToast('Fill all fields', 'error'); return; }

  const user = DB.users.find(u => u.email === email && u.password === pass);
  if (!user) {
    showToast('Invalid credentials. Access denied.', 'error', '✗');
    addLog(`FAILED LOGIN: ${email}`);
    return;
  }
  STATE.loginAttemptUser = user;

  /* 2FA */
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  localStorage.setItem('csa_otp', otp);
  document.getElementById('otp-hint').textContent = `Demo OTP: ${otp}`;
  document.querySelectorAll('.otp-input').forEach(i => i.value = '');
  openModal('twofa-modal');
  setTimeout(() => document.querySelector('.otp-input') && document.querySelector('.otp-input').focus(), 200);
}

function verify2FA() {
  const code   = Array.from(document.querySelectorAll('.otp-input')).map(i => i.value).join('');
  const stored = localStorage.getItem('csa_otp');
  if (code === stored) {
    STATE.currentUser = STATE.loginAttemptUser;
    localStorage.setItem('csa_session', JSON.stringify(STATE.currentUser));
    closeModal('twofa-modal');
    addLog(`LOGIN: ${STATE.currentUser.email} (2FA verified)`);
    showToast(`Welcome back, ${STATE.currentUser.name}!`, 'success', '✓');
    updateAuthUI();
    goToDashboard();
  } else {
    showToast('Invalid OTP. Access denied.', 'error', '✗');
    document.querySelectorAll('.otp-input').forEach(i => { i.value=''; i.style.borderColor='var(--red)'; });
    setTimeout(() => document.querySelectorAll('.otp-input').forEach(i => i.style.borderColor=''), 1500);
  }
}

function otpInput(el, idx) { if (el.value && idx < 5) document.querySelectorAll('.otp-input')[idx+1].focus(); }
function otpKey(e, idx) {
  if (e.key === 'Backspace' && !e.target.value && idx > 0) document.querySelectorAll('.otp-input')[idx-1].focus();
  if (e.key === 'Enter') verify2FA();
}

function handleRegister() {
  const fname  = document.getElementById('reg-fname').value.trim();
  const lname  = document.getElementById('reg-lname').value.trim();
  const email  = document.getElementById('reg-email').value.trim();
  const phone  = document.getElementById('reg-phone').value.trim();
  const track  = document.getElementById('reg-track').value;
  const pass   = document.getElementById('reg-pass').value;
  const pass2  = document.getElementById('reg-pass2').value;
  const agree  = document.getElementById('reg-agree').checked;

  if (!fname||!lname||!email||!phone||!track||!pass) { showToast('All fields required', 'error'); return; }
  if (pass !== pass2) { showToast('Passwords do not match', 'error'); return; }
  if (pass.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }
  if (!agree) { showToast('Please accept the terms', 'error'); return; }
  if (DB.users.some(u => u.email === email)) { showToast('Email already registered', 'error'); return; }

  const u = { id:'USR'+Date.now(), email, password:pass, name:`${fname} ${lname}`, phone, role:'student', track, joined:new Date().toISOString(), active:true };
  const users = DB.users;
  users.push(u);
  DB.saveUsers(users);
  addLog(`REGISTER: ${email} (${track})`);
  showToast('Account created! Please login.', 'success', '✓');
  navigate('login');
}

function logout() {
  STATE.currentUser = null;
  localStorage.removeItem('csa_session');
  updateAuthUI();
  navigate('home');
  showToast('Logged out securely', 'info', '🔒');
  addLog('LOGOUT');
}

function updateAuthUI() {
  const loggedIn = !!STATE.currentUser;
  document.getElementById('nav-login-btn')?.classList.toggle('hidden', loggedIn);
  document.getElementById('nav-register-btn')?.classList.toggle('hidden', loggedIn);
  document.getElementById('nav-dashboard-btn')?.classList.toggle('hidden', !loggedIn);
  document.getElementById('nav-logout-btn')?.classList.toggle('hidden', !loggedIn);
}

function checkPassStrength(val) {
  const fill  = document.getElementById('pass-fill');
  const label = document.getElementById('pass-label');
  if (!fill || !label) return;
  let score = 0;
  if (val.length >= 8)  score++;
  if (val.length >= 12) score++;
  if (/[A-Z]/.test(val))     score++;
  if (/[0-9]/.test(val))     score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  const colors = ['','#ff3366','#ff6b2b','#ffd700','#00d4ff','#00ff41'];
  const texts  = ['','Very Weak','Weak','Fair','Strong','Very Strong'];
  fill.style.width = (score * 20) + '%';
  fill.style.background = colors[score] || '';
  label.textContent = texts[score] || '';
  label.style.color = colors[score] || 'var(--text3)';
}

function togglePass(id, btn) {
  const el = document.getElementById(id);
  el.type = el.type === 'password' ? 'text' : 'password';
  btn.textContent = el.type === 'password' ? '👁' : '🙈';
}


/* ============================================================
   SECTION 24 — MODAL HELPERS
   ============================================================ */

function openModal(id)  { const m=document.getElementById(id); if(m){m.classList.add('show');m.style.display='flex';} }
function closeModal(id) { const m=document.getElementById(id); if(m){m.classList.remove('show');m.style.display='none';} }

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) closeModal(e.target.id);
});


/* ============================================================
   SECTION 25 — CLI SEARCH
   ============================================================ */

function handleSearch(val) {
  const box = document.getElementById('cli-search');
  const res = document.getElementById('cli-results');
  if (!val || val.length < 2) { box.classList.remove('open'); return; }
  const q = val.toLowerCase().replace('/search ','');
  const hits = [
    ...SEED.courses.filter(c => c.title.toLowerCase().includes(q) || c.dept.includes(q) || c.tags.some(t=>t.toLowerCase().includes(q))).map(c => ({label:`[COURSE] ${c.title}`, action:`navigate('courses')`})),
    ...SEED.events.filter(e => e.title.toLowerCase().includes(q)).map(e => ({label:`[EVENT] ${e.title}`, action:`openEventModal('${e.id}')`})),
    ...SEED.blogs.filter(b => b.title.toLowerCase().includes(q)).map(b => ({label:`[BLOG] ${b.title.slice(0,45)}`, action:`navigate('blog')`})),
    ...SEED.team.filter(t => t.name.toLowerCase().includes(q)).map(t => ({label:`[TEAM] ${t.name} — ${t.role}`, action:`navigate('verify-team')`})),
  ];
  if (!hits.length) { box.classList.remove('open'); return; }
  res.innerHTML = hits.slice(0,6).map(h => `<div class="cli-result-item" onclick="${h.action};document.getElementById('cli-search').classList.remove('open');document.getElementById('cli-input').value=''">${h.label}</div>`).join('');
  box.classList.add('open');
}

function handleSearchKey(e) {
  if (e.key === 'Escape') { document.getElementById('cli-search').classList.remove('open'); e.target.value = ''; }
  if (e.key === 'Enter' && e.target.value) { navigate('courses'); document.getElementById('cli-search').classList.remove('open'); }
}

document.addEventListener('click', e => {
  if (!e.target.closest('#cli-search')) document.getElementById('cli-search')?.classList.remove('open');
});


/* ============================================================
   SECTION 26 — STUDENT DASHBOARD
   ============================================================ */

function initStudentDashboard() {
  if (!STATE.currentUser) { navigate('login'); return; }
  const u = STATE.currentUser;

  /* sidebar user info */
  const avatarEl = document.getElementById('student-avatar-lg');
  const nameEl   = document.getElementById('student-sidebar-name');
  if (avatarEl) avatarEl.textContent = u.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);
  if (nameEl)   nameEl.textContent   = u.name;

  renderStudentPanels();
  showStudentPanel('overview', document.querySelector('#page-student-dashboard .sidebar-item'));
}

function renderStudentPanels() {
  const u       = STATE.currentUser;
  const enrs    = DB.enrollments.filter(e => e.userId === u.id);
  const pays    = DB.payments.filter(p => p.userId === u.id);
  const myCerts = DB.genCerts.filter(c => c.studentId === u.id);

  const panels = {
    overview: `
      <div class="dashboard-header">
        <div>
          <div class="dashboard-title">Command Center</div>
          <div style="font-family:var(--font-mono);font-size:.68rem;color:var(--text3)">Welcome back, <span style="color:var(--green)">${u.name}</span></div>
        </div>
        <div style="display:flex;align-items:center;gap:.75rem">
          <div class="user-avatar-lg" style="width:36px;height:36px;font-size:.7rem">${u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
          <div>
            <div style="font-family:var(--font-mono);font-size:.75rem">${u.name}</div>
            <div style="font-family:var(--font-mono);font-size:.58rem;color:var(--text3)">${u.track || 'STUDENT AGENT'}</div>
          </div>
        </div>
      </div>
      <div class="stats-row">
        <div class="stat-card green"><div class="stat-num">${enrs.length}</div><div class="stat-label">COURSES ENROLLED</div></div>
        <div class="stat-card blue"><div class="stat-num">7</div><div class="stat-label">LABS COMPLETED</div></div>
        <div class="stat-card purple"><div class="stat-num">${myCerts.length}</div><div class="stat-label">CERTIFICATES</div></div>
        <div class="stat-card orange"><div class="stat-num">1,240</div><div class="stat-label">XP POINTS</div></div>
      </div>
      <div class="dash-grid-2">
        <div class="progress-card">
          <div class="progress-title">Course Progress</div>
          ${enrs.length ? enrs.map(e => `
            <div class="progress-item">
              <div class="progress-item-header">
                <span class="progress-item-name">${e.courseName}</span>
                <span class="progress-item-pct">${e.progress || Math.floor(Math.random()*80+10)}%</span>
              </div>
              <div class="progress-bar"><div class="progress-fill" style="width:${e.progress||60}%"></div></div>
            </div>`).join('') : '<div style="font-family:var(--font-mono);font-size:.7rem;color:var(--text3);text-align:center;padding:1rem">No courses enrolled yet. <a onclick="navigate(\'courses\')" style="color:var(--green);cursor:none">Browse Courses →</a></div>'}
        </div>
        <div class="activity-feed">
          <div class="progress-title">Recent Activity</div>
          ${['Completed Lab: SQL Injection','Submitted Assignment: Recon Report','Earned: CTF Badge','Enrolled: Ethical Hacking Pro','Logged in from new device'].map(a=>`
          <div class="activity-item">
            <div class="activity-dot"></div>
            <div><div class="activity-text">${a}</div><div class="activity-time">${Math.floor(Math.random()*23)+1}h ago</div></div>
          </div>`).join('')}
        </div>
      </div>`,

    courses: `
      <div class="dashboard-header"><div class="dashboard-title">My Courses</div></div>
      ${enrs.length ? enrs.map(e => `
        <div style="background:var(--surface2);border:1px solid var(--border);padding:1.25rem;margin-bottom:.75rem;display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-family:var(--font-head);font-weight:600">${e.courseName}</div>
            <div style="font-family:var(--font-mono);font-size:.62rem;color:var(--text3)">Enrolled: ${new Date(e.date).toLocaleDateString()} · Status: Active</div>
          </div>
          <button class="course-enroll" onclick="showToast('Opening course content...','info')">CONTINUE →</button>
        </div>`).join('') : `<div style="font-family:var(--font-mono);font-size:.75rem;color:var(--text3);padding:2rem;text-align:center">No courses enrolled. <a onclick="navigate('courses')" style="color:var(--green);cursor:none">Browse →</a></div>`}`,

    assignments: `
      <div class="dashboard-header"><div class="dashboard-title">Assignments</div></div>
      ${['Network Recon Lab Report','OSINT Target Profile','Forensics Case Study'].map((a,i) => `
        <div style="background:var(--surface2);border:1px solid var(--border);padding:1.25rem;margin-bottom:.75rem;display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-family:var(--font-head);font-weight:600">${a}</div>
            <div style="font-family:var(--font-mono);font-size:.62rem;color:var(--text3)">Due: 2025-08-${20+i*5}</div>
          </div>
          <div style="display:flex;align-items:center;gap:.75rem">
            <span style="font-family:var(--font-mono);font-size:.65rem;padding:.18rem .5rem;border:1px solid ${i===0?'var(--orange)':i===1?'var(--blue)':'var(--green)'};color:${i===0?'var(--orange)':i===1?'var(--blue)':'var(--green)'}">${i===0?'PENDING':i===1?'SUBMITTED':'GRADED'}</span>
            ${i===0?`<button class="course-enroll" onclick="showToast('File upload dialog...','info')">SUBMIT</button>`:''}
          </div>
        </div>`).join('')}
      <div class="section-header" style="margin-top:2rem"><span class="section-tag">// LIVE CLASSES</span></div>
      ${['Web App Pentesting — LIVE','Red Team Fundamentals','OSINT Advanced'].map((c,i) => `
        <div class="liveclass-card">
          <div class="liveclass-info">
            <div class="class-title">${c}</div>
            <div class="class-meta">Today, ${8+i*2}:00 PM · Zoom</div>
          </div>
          ${i===0?'<div class="live-indicator">● LIVE</div>':`<button class="course-enroll" onclick="showToast('Class starts in ${2-i}h','info')">JOIN →</button>`}
        </div>`).join('')}`,

    certificates: `
      <div class="dashboard-header"><div class="dashboard-title">My Certificates</div></div>
      ${myCerts.length ? myCerts.map(c => `
        <div class="cert-preview">
          <div class="cert-title">CYBERSCHOOL ACADEMY</div>
          <div class="cert-body">This certifies that<br><strong style="color:var(--gold);font-size:1.1rem">${c.studentName}</strong><br>has completed<br><strong>${c.course}</strong><br>with <strong>${c.grade}</strong></div>
          <div class="cert-id">ID: ${c.id} · ${c.date}</div>
          <div class="cert-seal">🏆</div>
          <button class="course-enroll" style="margin-top:.75rem" onclick="downloadCertText('${c.id}')">DOWNLOAD PDF</button>
        </div>`) .join('') : `<div style="font-family:var(--font-mono);font-size:.75rem;color:var(--text3);text-align:center;padding:2rem">No certificates yet. Complete a course to earn one.</div>`}`,

    liveclass: `
      <div class="dashboard-header"><div class="dashboard-title">Live Classes</div></div>
      ${['Web App Pentesting — Module 8','Advanced OSINT Techniques','Red Team Operations — Lab 3','Cloud Security Architecture Review'].map((c,i)=>`
        <div class="liveclass-card">
          <div class="liveclass-info">
            <div class="class-title">${c}</div>
            <div class="class-meta">Today, ${i%2===0?'7':'9'}:00 PM · Zoom Secure Room</div>
          </div>
          ${i===0?'<div class="live-indicator">● LIVE NOW</div>':`<span style="font-family:var(--font-mono);font-size:.6rem;color:var(--text3)">${2+i}h left</span>`}
        </div>`).join('')}`,

    payments: `
      <div class="dashboard-header"><div class="dashboard-title">Payment History</div></div>
      ${pays.length ? pays.map(p=>`
        <div class="payment-card">
          <div><div class="payment-desc">${p.desc}</div><div class="payment-date">${p.date}</div></div>
          <div style="text-align:right"><div class="payment-amount">${p.amount}</div><div style="font-family:var(--font-mono);font-size:.6rem;color:var(--green)">${p.status}</div></div>
        </div>`).join('') : `<div style="font-family:var(--font-mono);font-size:.75rem;color:var(--text3);text-align:center;padding:2rem">No payment records yet.</div>`}`,

    profile: `
      <div class="dashboard-header"><div class="dashboard-title">My Profile</div></div>
      <div style="background:var(--surface2);border:1px solid var(--border);padding:2rem;max-width:500px">
        <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" id="p-name" value="${u.name}"></div>
        <div class="form-group"><label class="form-label">Email</label><input class="form-input" id="p-email" value="${u.email}" type="email"></div>
        <div class="form-group"><label class="form-label">Phone</label><input class="form-input" id="p-phone" value="${u.phone||''}"></div>
        <div class="form-group"><label class="form-label">Track</label><input class="form-input" value="${u.track||''}" readonly style="color:var(--text3)"></div>
        <button class="submit-btn" onclick="updateProfile()">⟶ UPDATE PROFILE</button>
      </div>`,
  };

  document.getElementById('student-panels').innerHTML = Object.entries(panels).map(([k,v]) =>
    `<div id="student-panel-${k}" class="dash-panel${k==='overview'?'':' hidden'}">${v}</div>`
  ).join('');
}

function showStudentPanel(id, el) {
  document.querySelectorAll('#page-student-dashboard .dash-panel').forEach(p => p.classList.add('hidden'));
  const panel = document.getElementById('student-panel-' + id);
  if (panel) panel.classList.remove('hidden');
  document.querySelectorAll('#page-student-dashboard .sidebar-item').forEach(i => i.classList.remove('active'));
  if (el) el.classList.add('active');
}

function updateProfile() {
  const name  = document.getElementById('p-name')?.value.trim();
  const email = document.getElementById('p-email')?.value.trim();
  const phone = document.getElementById('p-phone')?.value.trim();
  if (!name || !email) { showToast('Name and email required', 'error'); return; }
  const users = DB.users;
  const idx = users.findIndex(u => u.id === STATE.currentUser.id);
  if (idx > -1) { users[idx].name=name; users[idx].email=email; users[idx].phone=phone; DB.saveUsers(users); }
  STATE.currentUser.name=name; STATE.currentUser.email=email; STATE.currentUser.phone=phone;
  localStorage.setItem('csa_session', JSON.stringify(STATE.currentUser));
  showToast('Profile updated!', 'success');
  addLog(`PROFILE UPDATE: ${email}`);
}


/* ============================================================
   SECTION 27 — ADMIN DASHBOARD
   ============================================================ */

function initAdminDashboard() {
  if (!STATE.currentUser || STATE.currentUser.role !== 'admin') { navigate('login'); return; }
  const u = STATE.currentUser;
  const avatarEl = document.getElementById('admin-avatar-lg');
  const nameEl   = document.getElementById('admin-sidebar-name');
  if (avatarEl) avatarEl.textContent = 'A';
  if (nameEl)   nameEl.textContent   = u.name;
  renderAdminPanels();
  showAdminPanel('overview', document.querySelector('#page-admin-dashboard .sidebar-item'));
}

function renderAdminPanels() {
  const allUsers    = DB.users;
  const students    = allUsers.filter(u => u.role === 'student');
  const proposals   = DB.proposals;
  const certs       = DB.genCerts;
  const payments    = DB.payments;
  const inquiries   = DB.inquiries;
  const logs        = DB.logs;
  const evRegs      = DB.evRegs;

  const panels = {
    overview: `
      <div class="dashboard-header">
        <div><div class="dashboard-title">Admin Dashboard</div><div class="admin-badge">⚡ GOD MODE ACTIVE</div></div>
      </div>
      <div class="stats-row">
        <div class="stat-card green"><div class="stat-num">${students.length}</div><div class="stat-label">TOTAL STUDENTS</div></div>
        <div class="stat-card blue"><div class="stat-num">${proposals.length}</div><div class="stat-label">PROPOSALS</div></div>
        <div class="stat-card purple"><div class="stat-num">${certs.length}</div><div class="stat-label">CERTS ISSUED</div></div>
        <div class="stat-card orange"><div class="stat-num">${inquiries.length}</div><div class="stat-label">INQUIRIES</div></div>
      </div>
      <div class="dash-grid-2">
        <div class="progress-card">
          <div class="progress-title">Platform Analytics</div>
          ${[['Course Enrollments',DB.enrollments.length,50],['Event Registrations',evRegs.length,20],['Job Applications',12,30],['Proposals',proposals.length,10]].map(([label,val,max])=>`
          <div class="analytics-bar">
            <div class="analytics-label">${label}</div>
            <div class="analytics-track"><div class="analytics-fill" style="width:${Math.min(100,Math.round(val/Math.max(max,1)*100))}%"></div></div>
            <div class="analytics-value">${val}</div>
          </div>`).join('')}
        </div>
        <div class="activity-feed">
          <div class="progress-title">Live Activity Log</div>
          ${logs.slice(0,6).map(l=>`
          <div class="activity-item">
            <div class="activity-dot"></div>
            <div><div class="activity-text">${l.msg}</div><div class="activity-time">${l.time}</div></div>
          </div>`).join('')}
        </div>
      </div>`,

    courses: `
      <div class="dashboard-header"><div class="dashboard-title">Manage Courses</div></div>
      <button class="submit-btn" style="width:auto;margin-bottom:1rem" onclick="showToast('Course editor coming — add to DB','info')">+ ADD COURSE</button>
      ${SEED.courses.map(c=>`
        <div style="background:var(--surface2);border:1px solid var(--border);padding:1rem;margin-bottom:.6rem;display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-family:var(--font-head);font-weight:600">${c.title}</div>
            <div style="font-family:var(--font-mono);font-size:.62rem;color:var(--text3)">${c.dept} · ${c.price} · ${c.maxSeats-c.seats} seats left</div>
          </div>
          <div style="display:flex;gap:.5rem">
            <button class="course-enroll" onclick="showToast('Edit: ${c.title}','info')">EDIT</button>
            <button class="course-enroll" style="border-color:var(--red);color:var(--red)" onclick="showToast('Delete course?','error')">DEL</button>
          </div>
        </div>`).join('')}`,

    events: `
      <div class="dashboard-header"><div class="dashboard-title">Manage Events</div></div>
      <button class="submit-btn" style="width:auto;margin-bottom:1rem" onclick="showToast('Event editor: add to SEED.events','info')">+ ADD EVENT</button>
      ${SEED.events.map(e=>`
        <div style="background:var(--surface2);border:1px solid var(--border);padding:1rem;margin-bottom:.6rem;display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-family:var(--font-head);font-weight:600">${e.title}</div>
            <div style="font-family:var(--font-mono);font-size:.62rem;color:var(--text3)">${e.date} · ${e.type} · ${evRegs.filter(r=>r.evId===e.id).length} registrations</div>
          </div>
          <div style="display:flex;gap:.5rem">
            <button class="course-enroll" onclick="showToast('Edit event: ${e.title}','info')">EDIT</button>
          </div>
        </div>`).join('')}`,

    team: `
      <div class="dashboard-header"><div class="dashboard-title">Team Members</div></div>
      <button class="submit-btn" style="width:auto;margin-bottom:1rem" onclick="showToast('Add team member form','info')">+ ADD MEMBER</button>
      ${SEED.team.map(t=>`
        <div style="background:var(--surface2);border:1px solid var(--border);padding:1rem;margin-bottom:.6rem;display:flex;justify-content:space-between;align-items:center">
          <div style="display:flex;align-items:center;gap:.75rem">
            <div style="font-size:1.5rem">${t.photo}</div>
            <div>
              <div style="font-family:var(--font-head);font-weight:600">${t.name}</div>
              <div style="font-family:var(--font-mono);font-size:.62rem;color:var(--text3)">${t.role} · ${t.id}</div>
            </div>
          </div>
          <div style="display:flex;gap:.5rem">
            <button class="course-enroll" onclick="showToast('Edit: ${t.name}','info')">EDIT</button>
            <button class="course-enroll" style="border-color:var(--red);color:var(--red)" onclick="showToast('Remove member?','error')">DEL</button>
          </div>
        </div>`).join('')}`,

    partners: `
      <div class="dashboard-header"><div class="dashboard-title">Partners</div></div>
      <button class="submit-btn" style="width:auto;margin-bottom:1rem" onclick="showToast('Add partner form','info')">+ ADD PARTNER</button>
      ${SEED.partners.map(p=>`
        <div style="background:var(--surface2);border:1px solid var(--border);padding:1rem;margin-bottom:.6rem;display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-family:var(--font-head);font-weight:600">${p.org}</div>
            <div style="font-family:var(--font-mono);font-size:.62rem;color:var(--text3)">${p.id} · ${p.tier} · ${p.status}</div>
          </div>
          <span style="font-family:var(--font-mono);font-size:.65rem;padding:.2rem .5rem;border:1px solid;${p.status==='verified'?'border-color:var(--green);color:var(--green)':'border-color:var(--red);color:var(--red)'}">${p.status.toUpperCase()}</span>
        </div>`).join('')}`,

    certgen: `
      <div class="dashboard-header"><div class="dashboard-title">Certificate Generator</div></div>
      <div class="cert-generator">
        <div class="dash-grid-2" style="margin-bottom:1rem">
          <div class="form-group"><label class="form-label">Student Name</label><input class="form-input" id="cg-name" placeholder="Full Name"></div>
          <div class="form-group"><label class="form-label">Student Email</label><input class="form-input" id="cg-email" placeholder="student@email.com"></div>
        </div>
        <div class="dash-grid-2" style="margin-bottom:1rem">
          <div class="form-group"><label class="form-label">Course</label>
            <select class="form-select" id="cg-course">
              ${SEED.courses.map(c=>`<option value="${c.id}">${c.title}</option>`).join('')}
            </select>
          </div>
          <div class="form-group"><label class="form-label">Grade</label>
            <select class="form-select" id="cg-grade"><option>Distinction</option><option>Merit</option><option>Pass</option></select>
          </div>
        </div>
        <button class="submit-btn" style="width:auto;padding:.6rem 2rem" onclick="generateCert()">⟶ GENERATE CERTIFICATE</button>
        <div id="cert-preview" class="cert-preview" style="display:none;margin-top:1.5rem"></div>
      </div>`,

    students: `
      <div class="dashboard-header"><div class="dashboard-title">Student Database (${students.length})</div></div>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-family:var(--font-mono);font-size:.68rem">
          <thead><tr style="border-bottom:1px solid var(--border)">
            <th style="padding:.6rem;text-align:left;color:var(--text3)">NAME</th>
            <th style="padding:.6rem;text-align:left;color:var(--text3)">EMAIL</th>
            <th style="padding:.6rem;text-align:left;color:var(--text3)">TRACK</th>
            <th style="padding:.6rem;text-align:left;color:var(--text3)">JOINED</th>
            <th style="padding:.6rem;text-align:left;color:var(--text3)">ACTION</th>
          </tr></thead>
          <tbody>
            ${students.map(s=>`<tr style="border-bottom:1px solid var(--border)">
              <td style="padding:.5rem;color:var(--text1)">${s.name}</td>
              <td style="padding:.5rem;color:var(--text3)">${s.email}</td>
              <td style="padding:.5rem;color:var(--blue)">${s.track||'—'}</td>
              <td style="padding:.5rem;color:var(--text3)">${new Date(s.joined).toLocaleDateString()}</td>
              <td style="padding:.5rem">
                <button onclick="showToast('View profile: ${s.name}','info')" style="font-family:var(--font-mono);font-size:.6rem;padding:.18rem .5rem;border:1px solid var(--border2);color:var(--text3);background:none;cursor:none">VIEW</button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`,

    proposals: `
      <div class="dashboard-header"><div class="dashboard-title">Collaboration Proposals (${proposals.length})</div></div>
      ${proposals.length ? proposals.reverse().map(p=>`
        <div style="background:var(--surface2);border:1px solid var(--border);padding:1rem;margin-bottom:.6rem">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <div style="font-family:var(--font-head);font-weight:600">${p.orgName}</div>
              <div style="font-family:var(--font-mono);font-size:.62rem;color:var(--text3)">${p.orgType} · ${p.purpose} · ${p.date}</div>
              <div style="font-family:var(--font-mono);font-size:.7rem;color:var(--text2);margin-top:.3rem">${p.email}</div>
            </div>
            <div style="display:flex;gap:.4rem">
              <button class="course-enroll" onclick="approveProposal('${p.id}')">APPROVE</button>
              <button class="course-enroll" style="border-color:var(--red);color:var(--red)" onclick="rejectProposal('${p.id}')">REJECT</button>
            </div>
          </div>
        </div>`).join('') : `<div style="font-family:var(--font-mono);font-size:.75rem;color:var(--text3);text-align:center;padding:2rem">No proposals yet.</div>`}`,

    payments: `
      <div class="dashboard-header"><div class="dashboard-title">Payment Records (${payments.length})</div></div>
      ${payments.length ? payments.map(p=>`
        <div class="payment-card">
          <div><div class="payment-desc">${p.desc}</div><div class="payment-date">${p.date}</div></div>
          <div style="text-align:right"><div class="payment-amount">${p.amount}</div><div style="font-family:var(--font-mono);font-size:.6rem;color:var(--green)">${p.status}</div></div>
        </div>`).join('') : `<div style="font-family:var(--font-mono);font-size:.75rem;color:var(--text3);text-align:center;padding:2rem">No payment records.</div>`}`,

    inquiries: `
      <div class="dashboard-header"><div class="dashboard-title">Inquiries (${inquiries.length})</div></div>
      ${inquiries.length ? inquiries.map(i=>`
        <div style="background:var(--surface2);border:1px solid var(--border);padding:1rem;margin-bottom:.6rem">
          <div style="display:flex;justify-content:space-between">
            <div style="font-family:var(--font-head);font-weight:600">${i.name} — ${i.subject}</div>
            <span style="font-family:var(--font-mono);font-size:.6rem;color:var(--green)">NEW</span>
          </div>
          <div style="font-family:var(--font-mono);font-size:.65rem;color:var(--text3)">${i.email} · ${new Date(i.date).toLocaleDateString()}</div>
          <div style="font-family:var(--font-mono);font-size:.7rem;color:var(--text2);margin-top:.4rem">${i.message.slice(0,120)}...</div>
          <button class="course-enroll" style="margin-top:.6rem;font-size:.6rem" onclick="showToast('Opening reply editor for ${i.name}','info')">REPLY</button>
        </div>`).join('') : `<div style="font-family:var(--font-mono);font-size:.75rem;color:var(--text3);text-align:center;padding:2rem">No inquiries yet.</div>`}`,

    analytics: `
      <div class="dashboard-header"><div class="dashboard-title">Analytics Report</div></div>
      <div class="stats-row" style="margin-bottom:2rem">
        <div class="stat-card green"><div class="stat-num">₹${(payments.reduce((a,p)=>{const n=parseInt(p.amount.replace(/[^0-9]/g,''));return a+(isNaN(n)?0:n);},0)/1000).toFixed(0)}K</div><div class="stat-label">REVENUE</div></div>
        <div class="stat-card blue"><div class="stat-num">${DB.enrollments.length}</div><div class="stat-label">ENROLLMENTS</div></div>
        <div class="stat-card purple"><div class="stat-num">${evRegs.length}</div><div class="stat-label">EVENT REGS</div></div>
        <div class="stat-card orange"><div class="stat-num">94%</div><div class="stat-label">PLACEMENT RATE</div></div>
      </div>
      <div class="progress-card">
        <div class="progress-title">Course Popularity</div>
        ${SEED.courses.slice(0,6).map(c=>`
          <div class="analytics-bar">
            <div class="analytics-label">${c.title.slice(0,18)}...</div>
            <div class="analytics-track"><div class="analytics-fill" style="width:${Math.floor(Math.random()*80+20)}%"></div></div>
            <div class="analytics-value">${Math.floor(Math.random()*50+5)}</div>
          </div>`).join('')}
      </div>`,

    logs: `
      <div class="dashboard-header"><div class="dashboard-title">Activity Logs (${logs.length})</div></div>
      <div style="background:var(--surface2);border:1px solid var(--border);padding:1rem;font-family:var(--font-mono);font-size:.65rem;height:500px;overflow-y:auto;color:var(--green)">
        ${logs.map(l=>`<div style="border-bottom:1px solid var(--border);padding:.3rem 0">&gt; [${l.date} ${l.time}] ${l.msg}</div>`).join('')}
        ${!logs.length ? '> No logs yet.' : ''}
      </div>`,

    content: `
      <div class="dashboard-header"><div class="dashboard-title">Content Editor</div></div>
      ${['Hero Title','Hero Description','About Text','Contact Email','WhatsApp Number'].map(item=>`
        <div class="content-editor-item">
          <div class="content-editor-label">${item}</div>
          <input class="form-input" placeholder="Edit ${item}...">
          <button class="submit-btn" style="width:auto;margin-top:.5rem;padding:.4rem 1rem;font-size:.65rem" onclick="showToast('${item} updated (localStorage)','success')">SAVE</button>
        </div>`).join('')}`,

    notifications: `
      <div class="dashboard-header"><div class="dashboard-title">Notification Control</div></div>
      <div class="form-group" style="max-width:400px">
        <label class="form-label">Send Broadcast Notification</label>
        <input class="form-input" id="notif-msg" placeholder="Message to all students...">
        <select class="form-select" id="notif-type" style="margin-top:.5rem"><option value="info">Info</option><option value="warning">Warning</option><option value="success">Success</option></select>
        <button class="submit-btn" style="margin-top:.5rem" onclick="sendBroadcast()">⟶ SEND NOTIFICATION</button>
      </div>
      <div style="margin-top:1.5rem">
        <div class="progress-title">Recent Notifications</div>
        ${DB.notifications.slice(0,8).map(n=>`
          <div class="notification-item unread">
            <div class="notification-dot"></div>
            <div><div class="notification-text">${n.msg}</div><div class="notification-time">${n.time}</div></div>
          </div>`).join('')}
      </div>`,
  };

  document.getElementById('admin-panels').innerHTML = Object.entries(panels).map(([k,v]) =>
    `<div id="admin-panel-${k}" class="dash-panel${k==='overview'?'':' hidden'}">${v}</div>`
  ).join('');
}

function showAdminPanel(id, el) {
  document.querySelectorAll('#page-admin-dashboard .dash-panel').forEach(p => p.classList.add('hidden'));
  const panel = document.getElementById('admin-panel-' + id);
  if (panel) panel.classList.remove('hidden');
  document.querySelectorAll('#page-admin-dashboard .sidebar-item').forEach(i => i.classList.remove('active'));
  if (el) el.classList.add('active');
}

function generateCert() {
  const name  = document.getElementById('cg-name')?.value.trim();
  const email = document.getElementById('cg-email')?.value.trim();
  const cId   = document.getElementById('cg-course')?.value;
  const grade = document.getElementById('cg-grade')?.value;
  if (!name || !email || !cId) { showToast('Fill all fields', 'error'); return; }

  const course = SEED.courses.find(c => c.id === cId);
  const id = `CSA-${new Date().getFullYear()}-${String(Math.floor(Math.random()*999999)).padStart(6,'0')}`;
  const cert = { id, studentName:name, studentId:'USR-'+email, email, course:course?.title||cId, grade, date:new Date().toLocaleDateString(), issuer:STATE.currentUser.name, type:'certificate', status:'valid', duration:course?.duration||'N/A' };

  const certs = DB.genCerts;
  certs.push(cert);
  DB.saveGenCerts(certs);
  SEED.certDB[id] = cert;

  const preview = document.getElementById('cert-preview');
  if (preview) {
    preview.style.display = 'block';
    preview.innerHTML = `
      <div class="cert-title">CYBERSCHOOL ACADEMY</div>
      <div style="font-family:var(--font-mono);font-size:.65rem;color:var(--text3);margin-bottom:.5rem">CERTIFICATE OF COMPLETION</div>
      <div class="cert-body">This certifies that<br><strong style="color:var(--gold);font-size:1.1rem">${name}</strong><br>has successfully completed<br><strong>${course?.title||cId}</strong><br>with <strong>${grade}</strong></div>
      <div class="cert-id">ID: ${id} · ${cert.date}</div>
      <div class="cert-seal">🏆</div>
      <div style="font-family:var(--font-mono);font-size:.62rem;color:var(--text3);margin-top:.5rem">Verify at: cyberschool.ac/verify-cert</div>
      <button class="course-enroll" style="margin-top:.75rem" onclick="downloadCertText('${id}')">DOWNLOAD</button>`;
  }

  showToast(`Certificate generated: ${id}`, 'success', '🏆');
  addLog(`CERT GEN: ${name} — ${course?.title} [${id}]`);
}

function downloadCertText(id) {
  const c = SEED.certDB[id];
  if (!c) return;
  const text = `
╔════════════════════════════════════════════════════════════╗
║            CYBERSCHOOL ACADEMY — CERTIFICATE              ║
╚════════════════════════════════════════════════════════════╝

CERTIFICATE OF COMPLETION

This is to certify that:

  Name   : ${c.studentName||c.name}
  Course : ${c.course}
  Grade  : ${c.grade}
  Date   : ${c.date}
  ID     : ${id}
  Issuer : ${c.issuer||'CSA Admin'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Verify at: https://cyberschool.ac/verify-cert
ID: ${id}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CYBERSCHOOL ACADEMY © ${new Date().getFullYear()} | ISO 27001 Certified
`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], {type:'text/plain'}));
  a.download = `CSA-Certificate-${id}.txt`;
  a.click();
  showToast('Certificate downloaded!', 'success');
}

function approveProposal(id) {
  const props = DB.proposals;
  const p = props.find(x => x.id === id);
  if (p) { p.stepIdx = 2; p.status = 'Approved'; DB.saveProposals(props); }
  showToast(`Proposal approved: ${id}`, 'success');
  addLog(`PROPOSAL APPROVED: ${id}`);
  renderAdminPanels();
  showAdminPanel('proposals', null);
}

function rejectProposal(id) {
  const props = DB.proposals;
  const idx = props.findIndex(x => x.id === id);
  if (idx > -1) { props.splice(idx, 1); DB.saveProposals(props); }
  showToast(`Proposal rejected and removed: ${id}`, 'error');
  addLog(`PROPOSAL REJECTED: ${id}`);
  renderAdminPanels();
  showAdminPanel('proposals', null);
}

function sendBroadcast() {
  const msg  = document.getElementById('notif-msg')?.value.trim();
  const type = document.getElementById('notif-type')?.value;
  if (!msg) { showToast('Enter notification message', 'error'); return; }
  addNotification(msg, type);
  showToast(`Broadcast sent to all students`, 'success', '📢');
  addLog(`BROADCAST: ${msg}`);
  document.getElementById('notif-msg').value = '';
}


/* ============================================================
   SECTION 28 — WINDOW INIT
   ============================================================ */

window.addEventListener('load', () => {
  document.getElementById('loading-screen').classList.add('hidden');
  runIntro();
});

window.addEventListener('resize', () => {
  const hc = document.getElementById('hero-canvas');
  if (hc) { hc.width = hc.offsetWidth||window.innerWidth; hc.height = hc.offsetHeight||window.innerHeight; }
});


/* ============================================================

   ██████████████████████████████████████████████████████████
   ██                                                      ██
   ██   AWS MIGRATION GUIDE — READ THIS BEFORE DEPLOYING   ██
   ██                                                      ██
   ██████████████████████████████████████████████████████████

   HOW TO MIGRATE FROM localStorage TO AWS:
   =========================================

   STEP 1: CHOOSE YOUR STACK
   ─────────────────────────
   Recommended for CyberSchool Academy:

   Frontend  : S3 + CloudFront (your existing HTML/CSS/JS)
   Backend   : API Gateway + Lambda (Node.js / Python)
   Database  : DynamoDB (NoSQL, serverless, scales auto)
   Auth      : Amazon Cognito (2FA, JWT tokens built-in)
   File Store : S3 (syllabus PDFs, assignment uploads)
   Email/WA   : SES (email) + Twilio (WhatsApp API)
   CDN        : CloudFront (global edge, low latency India)
   Domain     : Route 53 + ACM SSL (free SSL cert)

   ─────────────────────────────────────────────────────────
   STEP 2: REPLACE DB CALLS (One-liner swaps)
   ─────────────────────────────────────────────────────────

   CURRENT (localStorage):
     const users = DB.users;
     DB.saveUsers(users);

   AWS VERSION (fetch → Lambda → DynamoDB):
     // GET
     const res = await fetch('https://api.cyberschool.ac/users',{
       headers:{'Authorization':'Bearer '+getJWT()}
     });
     const users = await res.json();

     // POST
     await fetch('https://api.cyberschool.ac/users',{
       method:'POST',
       headers:{'Content-Type':'application/json','Authorization':'Bearer '+getJWT()},
       body: JSON.stringify(newUser)
     });

   ─────────────────────────────────────────────────────────
   STEP 3: DynamoDB TABLE DESIGN
   ─────────────────────────────────────────────────────────

   Table: csa_users
     PK: userId (String)    SK: email (String)
     Attributes: name, role, phone, track, joined, active

   Table: csa_certificates
     PK: certId (String)    SK: studentId
     Attributes: course, grade, date, issuer, status

   Table: csa_enrollments
     PK: enrollId           SK: userId
     Attributes: courseId, courseName, date, progress

   Table: csa_proposals
     PK: propId             SK: orgEmail
     Attributes: orgName, type, purpose, status, stepIdx

   Table: csa_events_reg
     PK: regId              SK: evId
     Attributes: name, email, phone, mode, date

   Table: csa_logs
     PK: logId              SK: timestamp
     TTL: 90 days           Attributes: msg, user

   ─────────────────────────────────────────────────────────
   STEP 4: COGNITO AUTH SETUP
   ─────────────────────────────────────────────────────────

   import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

   const poolData = {
     UserPoolId: 'ap-south-1_XXXXXXXXX',   // Mumbai region
     ClientId: 'YYYYYYYYYYYYYYYYYYYYYY',
   };
   const userPool = new CognitoUserPool(poolData);

   // Login
   function awsLogin(email, password) {
     const authDetails = new AuthenticationDetails({Username:email, Password:password});
     const cognitoUser = new CognitoUser({Username:email, Pool:userPool});
     cognitoUser.authenticateUser(authDetails, {
       onSuccess: (result) => {
         const token = result.getAccessToken().getJwtToken();
         localStorage.setItem('csa_jwt', token);
         // Then navigate to dashboard
       },
       mfaRequired: (codeDeliveryDetails) => {
         // Trigger your existing 2FA modal, then:
         cognitoUser.sendMFACode(otpCode, this);
       },
       onFailure: (err) => showToast(err.message, 'error'),
     });
   }

   ─────────────────────────────────────────────────────────
   STEP 5: LAMBDA FUNCTION (Node.js example)
   ─────────────────────────────────────────────────────────

   // Lambda: csa-get-students
   const AWS = require('aws-sdk');
   const dynamo = new AWS.DynamoDB.DocumentClient();

   exports.handler = async (event) => {
     const result = await dynamo.scan({ TableName:'csa_users' }).promise();
     return {
       statusCode: 200,
       headers: {'Access-Control-Allow-Origin':'*'},
       body: JSON.stringify(result.Items),
     };
   };

   ─────────────────────────────────────────────────────────
   STEP 6: DEPLOY FRONTEND TO S3 + CLOUDFRONT
   ─────────────────────────────────────────────────────────

   # Install AWS CLI
   pip install awscli
   aws configure   # Enter Access Key, Secret, Region: ap-south-1

   # Create S3 bucket
   aws s3 mb s3://cyberschool-academy-prod --region ap-south-1

   # Upload files
   aws s3 sync ./ s3://cyberschool-academy-prod --exclude "*.md"

   # Create CloudFront distribution (via console or CDK)
   # Point to S3 bucket, enable HTTPS, set default root = index.html

   ─────────────────────────────────────────────────────────
   STEP 7: COST ESTIMATE (Monthly, India — ap-south-1)
   ─────────────────────────────────────────────────────────

   Service             Free Tier          Paid (est.)
   ─────────────────────────────────────────────────
   S3 (5GB storage)    5GB free           ~$0.12/GB
   CloudFront CDN      1TB transfer free  ~$0.085/GB India
   API Gateway         1M req/month free  ~$3.50/M req
   Lambda              1M calls free      ~$0.20/M calls
   DynamoDB            25GB free          ~$1.25/GB/month
   Cognito             50,000 MAU free    ~$0.0055/MAU
   SES (email)         62K emails free    ~$0.10/1000 emails
   Route 53 (domain)   —                  ~$0.50/month
   ACM SSL             FREE               FREE
   ─────────────────────────────────────────────────────────

   STARTER PLAN (0–500 students):
   ✅ Stays entirely within AWS Free Tier
   💰 Cost: $0–$5/month

   GROWTH PLAN (500–5,000 students):
   💰 Est. Cost: $15–$40/month

   SCALE PLAN (5,000–50,000 students):
   💰 Est. Cost: $80–$200/month

   ENTERPRISE (50,000+ students, multi-region):
   💰 Est. Cost: $400–$1,200/month

   NOTE: For India, ap-south-1 (Mumbai) is cheapest.
   Register at aws.amazon.com — first 12 months FREE tier.

   ─────────────────────────────────────────────────────────
   STEP 8: SECURITY HARDENING (Production Checklist)
   ─────────────────────────────────────────────────────────

   ✅ WAF (Web Application Firewall)   — $5/month blocks DDoS
   ✅ Shield Standard                  — FREE DDoS protection
   ✅ CloudFront HTTPS only             — Free via ACM
   ✅ Cognito MFA (TOTP / SMS)          — Replaces your 2FA modal
   ✅ IAM roles (least privilege)       — Lambda can only access its table
   ✅ S3 bucket policy (no public PUT)  — Secure file uploads via presigned URL
   ✅ API Gateway throttling (rate limit) — Prevents brute force
   ✅ CloudTrail (audit logs)           — Replaces addLog()
   ✅ Secrets Manager (API keys)        — Never hardcode credentials
   ✅ VPC (if using RDS)                — Isolate database from internet

   ─────────────────────────────────────────────────────────
   NEED HELP? Contact us at dev@cyberschool.ac
   ============================================================ */