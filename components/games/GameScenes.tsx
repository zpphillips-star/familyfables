// ── SVG scenes for Find Differences and Hidden Objects games ─────────────────
// Each scene has:
//   - A React SVG component accepting variant: 'a'|'b' (for Find Differences)
//   - differences[]: 5 hotspot zones {x,y,r} in SVG coords where A≠B
//   - hiddenItems[]: 6 items to find in the base scene

export interface Zone { x: number; y: number; r: number; }
export interface HiddenItem { id: string; emoji: string; label: string; zone: Zone; }
export interface SceneConfig {
  viewBox: string;
  Scene: React.FC<{ variant: "a" | "b" }>;
  differences: (Zone & { label: string })[];
  hiddenItems: HiddenItem[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function Star({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.45;
    return `${cx + Math.cos(a) * radius},${cy + Math.sin(a) * radius}`;
  }).join(" ");
  return <polygon points={pts} fill={fill} />;
}

function Cloud({ cx, cy, fill, scale = 1 }: { cx: number; cy: number; fill: string; scale?: number }) {
  const s = scale;
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={28 * s} ry={14 * s} fill={fill} />
      <ellipse cx={cx - 14 * s} cy={cy + 5 * s} rx={18 * s} ry={10 * s} fill={fill} />
      <ellipse cx={cx + 14 * s} cy={cy + 5 * s} rx={18 * s} ry={10 * s} fill={fill} />
    </g>
  );
}

// ── Dream Ideas — Night Bedroom ───────────────────────────────────────────────
function DreamIdeasScene({ variant: v }: { variant: "a" | "b" }) {
  return (
    <g>
      {/* Sky */}
      <rect x="0" y="0" width="400" height="280" fill="#0d1b3e" />
      {/* Stars */}
      {[[30,25],[90,15],[160,35],[280,20],[320,50],[370,18],[55,60],[200,10]].map(([x,y],i) =>
        <circle key={i} cx={x} cy={y} r={i===3 && v==="b" ? 0 : 2.5} fill="#fff" opacity={0.85} />
      )}
      {/* Moon — bigger in A, smaller in B */}
      <circle cx="340" cy="40" r={v === "b" ? 22 : 30} fill="#FFE66D" />
      {/* Window */}
      <rect x="298" y="18" width="70" height="90" fill="#1a3a7c" rx="4" />
      <rect x="304" y="24" width="28" height="38" fill="#0d1b3e" />
      <rect x="336" y="24" width="28" height="38" fill="#0d1b3e" />
      {/* Bookshelf */}
      <rect x="10" y="80" width="55" height="130" fill="#6b3d14" rx="3" />
      <rect x="15" y="90" width="12" height="35" fill={v === "b" ? "#22c55e" : "#e04444"} rx="2" />
      <rect x="30" y="90" width="12" height="28" fill="#4444e0" rx="2" />
      <rect x="45" y="90" width="15" height="32" fill="#e0a044" rx="2" />
      <rect x="15" y="135" width="14" height="30" fill="#9444e0" rx="2" />
      <rect x="32" y="140" width="10" height="25" fill="#44b0e0" rx="2" />
      {/* Floor */}
      <rect x="0" y="240" width="400" height="40" fill="#3d2510" />
      {/* Rug */}
      <ellipse cx="200" cy="243" rx="120" ry="12" fill="#6b48c8" opacity="0.5" />
      {/* Bed frame */}
      <rect x="65" y="165" width="250" height="70" fill="#6b3d14" rx="8" />
      {/* Headboard */}
      <rect x="65" y="140" width="60" height="55" fill="#8B5014" rx="6" />
      {/* Mattress */}
      <rect x="75" y="160" width="230" height="65" fill="#e8e0f0" rx="6" />
      {/* Blanket — purple in A, teal in B */}
      <rect x="75" y="190" width="230" height="35" fill={v === "b" ? "#0d9488" : "#6B48C8"} rx="6" />
      {/* Pillow */}
      <rect x="85" y="163" width="80" height="40" fill="#f5f0ff" rx="8" />
      {/* Nightstand */}
      <rect x="315" y="200" width="55" height="50" fill="#6b3d14" rx="4" />
      {/* Lamp base */}
      <rect x="334" y="190" width="8" height="14" fill="#8B5014" />
      {/* Lamp shade — warm in A, pink in B */}
      <ellipse cx="338" cy="183" rx="18" ry="12" fill={v === "b" ? "#f472b6" : "#ffe4a0"} />
      {/* Lamp glow */}
      <circle cx="338" cy="195" r={v === "b" ? 0 : 20} fill="#fff7e0" opacity="0.15" />
    </g>
  );
}

// ── Amber — Dragon Cave ───────────────────────────────────────────────────────
function AmberScene({ variant: v }: { variant: "a" | "b" }) {
  return (
    <g>
      {/* Cave bg */}
      <rect x="0" y="0" width="400" height="280" fill="#2d1060" />
      {/* Cave walls */}
      <ellipse cx="0" cy="140" rx="80" ry="140" fill="#1a0840" />
      <ellipse cx="400" cy="140" rx="80" ry="140" fill="#1a0840" />
      {/* Floor */}
      <rect x="0" y="220" width="400" height="60" fill="#1a0840" />
      {/* Stalactites */}
      {[[60,0,12,55],[110,0,9,45],[165,0,14,60],[230,0,10,42],[290,0,16,65],[340,0,11,50]].map(([x,y,w,h],i) =>
        <polygon key={i} points={`${x-w/2},${y} ${x+w/2},${y} ${x},${y+h}`} fill="#150630" />
      )}
      {/* Stalagmites */}
      {[[80,280,10,40],[150,280,12,50],[240,280,9,38],[320,280,14,55]].map(([x,y,w,h],i) =>
        <polygon key={i} points={`${x-w/2},${y} ${x+w/2},${y} ${x},${y-h}`} fill="#150630" />
      )}
      {/* Fire glow */}
      <ellipse cx="200" cy="230" rx={v==="b" ? 30 : 45} ry="15" fill="#ff6b1a" opacity="0.4" />
      <ellipse cx="200" cy="215" rx="20" ry={v==="b" ? 25 : 38} fill="#ff9500" opacity="0.5" />
      <ellipse cx="200" cy="215" rx="12" ry={v==="b" ? 18 : 28} fill="#FFE66D" opacity="0.7" />
      {/* Gem piles */}
      {[[50,230,18,v==="b"?"#ff4444":"#e44"],[55,222,14,"#f44"],[60,228,16,"#c44"]].map(([x,y,r,fill],i) =>
        <circle key={i} cx={x as number} cy={y as number} r={r as number} fill={fill as string} />
      )}
      {[[330,225,16,"#4a90e2"],[340,218,12,"#357abd"],[320,230,14,"#5ba3f5"]].map(([x,y,r,fill],i) =>
        <circle key={i} cx={x as number} cy={y as number} r={r as number} fill={fill as string} />
      )}
      {/* Gem sparkles */}
      {[[52,218],[335,215],[58,215]].map(([x,y],i) =>
        <Star key={i} cx={x} cy={y} r={5} fill="#fff" />
      )}
      {/* Dragon egg — large in A, small in B */}
      <ellipse cx="180" cy="238" rx={v==="b" ? 16 : 22} ry={v==="b" ? 20 : 28} fill="#7c3aed" />
      <ellipse cx="174" cy="228" rx={v==="b" ? 5 : 7} ry={v==="b" ? 5 : 7} fill="#a78bfa" opacity="0.6" />
      {/* Treasure chest */}
      <rect x="270" y="210" width="60" height="38" fill="#8B5014" rx="4" />
      <rect x="270" y="210" width="60" height="15" fill={v==="b" ? "#6b3d14" : "#a0621a"} rx="4" />
      <rect x="292" y="222" width="16" height="10" fill="#FFD700" rx="3" />
      {/* Gold coins */}
      {v==="a" && [[275,252],[290,252],[305,252]].map(([x,y],i) =>
        <circle key={i} cx={x} cy={y} r={7} fill="#FFD700" />
      )}
      {/* Crystals */}
      {[[120,190],[130,185],[140,195]].map(([x,y],i) =>
        <polygon key={i} points={`${x},${y-15} ${x-7},${y} ${x},${y+8} ${x+7},${y}`} fill={v==="b" ? "#60a5fa" : "#c084fc"} />
      )}
    </g>
  );
}

// ── Poo Poo Face — Bathroom ───────────────────────────────────────────────────
function PooScene({ variant: v }: { variant: "a" | "b" }) {
  return (
    <g>
      {/* Walls */}
      <rect x="0" y="0" width="400" height="280" fill="#e0f2fe" />
      {/* Tiles */}
      {Array.from({length:7}, (_,r) => Array.from({length:8}, (_,c) =>
        <rect key={`${r}${c}`} x={c*52} y={r*40} width="50" height="38" fill="none" stroke="#b3e0f7" strokeWidth="1" />
      ))}
      {/* Floor */}
      <rect x="0" y="230" width="400" height="50" fill="#c8e6f0" />
      {/* Toilet */}
      <ellipse cx="85" cy="220" rx="42" ry="18" fill="#f0f0f0" />
      <rect x="43" y="170" width="84" height="55" fill="#f8f8f8" rx="10" />
      <rect x="48" y="155" width="74" height="22" fill="#e8e8e8" rx="6" />
      {/* Toilet paper — present in A, absent in B */}
      {v==="a" && <>
        <circle cx="155" cy="178" r={14} fill="#fff" stroke="#ddd" strokeWidth="1.5" />
        <circle cx="155" cy="178" r={4} fill="#eee" />
        <line x1="155" y1="192" x2="155" y2="210" stroke="#ddd" strokeWidth="8" />
      </>}
      {/* Sink */}
      <rect x="220" y="160" width="100" height="70" fill="#f0f0f0" rx="8" />
      <ellipse cx="270" cy="220" rx="38" ry="16" fill="#e8e8e8" />
      <rect x="258" y="195" width="8" height="22" fill={v==="b" ? "#4ade80" : "#94a3b8"} rx="3" />
      <rect x="272" y="195" width="8" height="22" fill={v==="b" ? "#f87171" : "#94a3b8"} rx="3" />
      {/* Mirror */}
      <rect x="220" y="80" width="100" height="70" fill="#e0f7ff" rx={v==="b" ? 0 : 8} stroke="#94a3b8" strokeWidth={v==="b" ? 1 : 4} />
      <text x="270" y="125" textAnchor="middle" fontSize="30">😊</text>
      {/* Bathtub */}
      <rect x="20" y="60" width="150" height="80" fill="#f8f8f8" rx="12" stroke="#ddd" strokeWidth="2" />
      <ellipse cx="95" cy="140" rx="65" ry="12" fill="#e0f2fe" />
      {/* Rubber duck — yellow in A, orange in B */}
      <circle cx="95" cy="110" r={v==="b" ? 18 : 18} fill={v==="b" ? "#fb923c" : "#facc15"} />
      <ellipse cx="95" cy="100" rx="12" ry="10" fill={v==="b" ? "#f97316" : "#fde047"} />
      <polygon points="107,98 115,95 108,103" fill="#f97316" />
      <circle cx="100" cy="100" r="2" fill="#1e293b" />
      {/* Towel on rail */}
      <rect x="330" y="100" width="8" height="80" fill="#94a3b8" rx="2" />
      <rect x="320" y="110" width="28" height="55" fill={v==="b" ? "#86efac" : "#60a5fa"} rx="4" />
    </g>
  );
}

// ── Gilroy — Autumn Barnyard ──────────────────────────────────────────────────
function GilroyScene({ variant: v }: { variant: "a" | "b" }) {
  return (
    <g>
      {/* Sky */}
      <rect x="0" y="0" width="400" height="280" fill="#fde68a" />
      <rect x="0" y="150" width="400" height="130" fill="#a3622a" />
      {/* Sun */}
      <circle cx="350" cy="50" r={v==="b" ? 25 : 35} fill="#f59e0b" />
      {/* Clouds */}
      {v==="a" && <Cloud cx={80} cy={40} fill="rgba(255,255,255,0.8)" scale={0.9} />}
      <Cloud cx={220} cy={30} fill="rgba(255,255,255,0.7)" scale={0.8} />
      {/* Barn */}
      <rect x="80" y="95" width="160" height="100" fill="#dc2626" />
      <polygon points="80,95 160,40 240,95" fill="#b91c1c" />
      <rect x="138" y="145" width="44" height="50" fill="#78350f" />
      <rect x="90" y="110" width="35" height="30" fill="#fef9c3" rx="2" />
      <rect x="175" y="110" width="35" height="30" fill="#fef9c3" rx="2" />
      <rect x="155" y="50" width="10" height="20" fill="#fef9c3" />
      {/* Fence */}
      {[260,285,310,335,360].map((x,i) =>
        <rect key={i} x={x} y={145} width="8" height="50" fill={v==="b" && i===2 ? "#fef9c3" : "#f5f5dc"} rx="2" />
      )}
      <rect x="260" y="158" width="108" height="8" fill="#f5f5dc" rx="2" />
      <rect x="260" y="178" width="108" height="8" fill="#f5f5dc" rx="2" />
      {/* Hay bales */}
      <rect x="295" y="185" width="50" height="35" fill="#d97706" rx="5" />
      <circle cx="320" cy="202" r="15" fill="#d97706" />
      <ellipse cx="320" cy="202" rx="15" ry="15" fill="none" stroke="#b45309" strokeWidth="2" />
      {/* Turkey on fence */}
      <circle cx="280" cy="138" r="14" fill={v==="b" ? "#7c3aed" : "#92400e"} />
      <ellipse cx="280" cy="148" rx="10" ry="14" fill={v==="b" ? "#6d28d9" : "#78350f"} />
      <polygon points="280,128 274,118 286,118" fill="#ef4444" />
      <circle cx="280" cy="128" r="4" fill="#ef4444" />
      {/* Feathers */}
      {[-20,-10,0,10,20].map((da,i) =>
        <ellipse key={i} cx={280+Math.sin((da*Math.PI/180))*18} cy={148+Math.cos((da*Math.PI/180))*18-18} rx="5" ry="14" fill={["#ef4444","#f97316","#eab308","#22c55e","#3b82f6"][i]} transform={`rotate(${da+180},280,148)`} />
      )}
      {/* Autumn leaves */}
      {[[50,200,"#ef4444"],[140,215,"#f97316"],[40,225,"#eab308"],[350,210,"#dc2626"]].map(([x,y,fill],i) =>
        <ellipse key={i} cx={x as number} cy={y as number} rx="12" ry="8" fill={fill as string} transform={`rotate(${i*30},${x},${y})`} />
      )}
    </g>
  );
}

// ── Hampton — Meadow Birthday ─────────────────────────────────────────────────
function HamptonScene({ variant: v }: { variant: "a" | "b" }) {
  return (
    <g>
      {/* Sky */}
      <rect x="0" y="0" width="400" height="280" fill="#bfdbfe" />
      {/* Hills */}
      <ellipse cx="200" cy="280" rx="300" ry="130" fill="#86efac" />
      <ellipse cx="0" cy="280" rx="150" ry="100" fill="#4ade80" />
      <ellipse cx="400" cy="280" rx="150" ry="90" fill="#4ade80" />
      {/* Clouds */}
      <Cloud cx={80} cy={45} fill="white" />
      <Cloud cx={300} cy={30} fill="white" scale={0.85} />
      {/* Sun */}
      <circle cx="60" cy="55" r="28" fill="#fde047" />
      {/* Balloons */}
      {[[150,80,"#ef4444"],[175,60,"#3b82f6"],[200,75,"#a855f7"],[225,58,v==="b"?"#f97316":"#22c55e"]].map(([x,y,fill],i) => (
        <g key={i}>
          <ellipse cx={x as number} cy={y as number} rx="15" ry="18" fill={fill as string} />
          <line x1={x as number} y1={(y as number)+18} x2={x as number} y2="200" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx={x as number} cy={(y as number)+18} r="2" fill={fill as string} />
        </g>
      ))}
      {/* Gift box */}
      <rect x={v==="b" ? 270 : 240} y="175" width="70" height="60" fill="#fbbf24" rx="6" />
      <rect x={v==="b" ? 270 : 240} y="175" width="70" height="18" fill="#f59e0b" rx="6" />
      <rect x={v==="b" ? 298 : 268} y="175" width="14" height="60" fill="#f59e0b" />
      {/* Bow */}
      <ellipse cx={v==="b" ? 305 : 275} cy="175" rx="18" ry="8" fill="#ef4444" transform={`rotate(-30,${v==="b" ? 305 : 275},175)`} />
      <ellipse cx={v==="b" ? 305 : 275} cy="175" rx="18" ry="8" fill="#ef4444" transform={`rotate(30,${v==="b" ? 305 : 275},175)`} />
      <circle cx={v==="b" ? 305 : 275} cy="175" r="5" fill="#dc2626" />
      {/* Hippo */}
      <ellipse cx="100" cy="215" rx="55" ry="40" fill="#6b7280" />
      <circle cx="90" cy="188" r="30" fill="#6b7280" />
      <ellipse cx="90" cy="205" rx="20" ry="12" fill="#9ca3af" />
      <circle cx="82" cy="182" r="5" fill="#1e293b" />
      <circle cx="98" cy="182" r="5" fill="#1e293b" />
      <ellipse cx="78" cy="178" rx="8" ry="5" fill={v==="b" ? "#a855f7" : "#6b7280"} />
      <ellipse cx="102" cy="178" rx="8" ry="5" fill={v==="b" ? "#a855f7" : "#6b7280"} />
      {/* Flowers */}
      {[[320,210,"#ef4444"],[340,225,"#a855f7"],[360,215,"#f97316"],[310,230,"#fbbf24"]].map(([x,y,fill],i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r="10" fill={fill as string} opacity="0.9" />
          <circle cx={x as number} cy={y as number} r="4" fill="#fde047" />
        </g>
      ))}
    </g>
  );
}

// ── Lumpiest Pumpkin — Halloween Patch ───────────────────────────────────────
function LumpiestPumpkinScene({ variant: v }: { variant: "a" | "b" }) {
  return (
    <g>
      {/* Night sky */}
      <rect x="0" y="0" width="400" height="280" fill="#1e0a3c" />
      {/* Stars */}
      {[[30,20],[80,40],[160,15],[280,30],[350,20],[200,10],[120,50],[310,55]].map(([x,y],i) =>
        <Star key={i} cx={x} cy={y} r={i===4 && v==="b" ? 0 : 3} fill="#fff" />
      )}
      {/* Moon */}
      <circle cx="340" cy="50" r="32" fill="#fde68a" />
      <circle cx="355" cy="42" r="24" fill="#1e0a3c" />
      {/* Ground */}
      <rect x="0" y="200" width="400" height="80" fill="#3d1a00" />
      {/* Vines */}
      {[[60,200],[150,200],[250,200],[340,200]].map(([x,y],i) =>
        <path key={i} d={`M${x},${y} Q${x+20},${y-15} ${x+10},${y-30} Q${x-10},${y-45} ${x+5},${y-55}`} fill="none" stroke="#166534" strokeWidth="3" />
      )}
      {/* Pumpkins */}
      {([[50,190,40,36,v==="b"?"#dc2626":"#ea580c"],[130,185,38,34,"#ea580c"],[210,188,42,38,"#f97316"],[290,186,36,33,"#ea580c"],[360,192,32,28,"#f97316"]] as [number,number,number,number,string][]).map(([x,y,rx,ry,fill],i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={fill} />
          <ellipse cx={x} cy={y} rx={rx*0.3} ry={ry*0.9} fill={`${fill}88`} />
          <rect x={x-4} y={y-ry-8} width="8" height="12" fill="#166534" rx="2" />
        </g>
      ))}
      {/* Jack-o-lantern glow — present in A only */}
      {v==="a" && <ellipse cx="210" cy="195" rx="35" ry="30" fill="#f97316" opacity="0.2" />}
      {/* Triangles — eyes on middle pumpkin */}
      <polygon points="198,183 204,196 192,196" fill={v==="b" ? "#f97316" : "#1e0a3c"} />
      <polygon points="218,183 224,196 212,196" fill={v==="b" ? "#f97316" : "#1e0a3c"} />
      {/* Scarecrow */}
      <rect x="310" y="100" width="8" height="110" fill="#92400e" />
      <rect x="290" y="120" width="48" height="8" fill="#92400e" />
      <circle cx="314" cy="92" r="18" fill="#fde68a" />
      <rect x="299" y="88" width="30" height="20" fill="#b45309" rx="3" />
      {/* Scarecrow hat different color in B */}
      <rect x="299" y="75" width="30" height="15" fill={v==="b" ? "#7c3aed" : "#92400e"} rx="2" />
      <text x="314" y="100" textAnchor="middle" fontSize="14">😊</text>
      <rect x="292" y="125" width="20" height="35" fill="#d97706" />
      <rect x="302" y="125" width="20" height="35" fill="#b45309" />
      {/* Tree */}
      <rect x="30" y="130" width="12" height="80" fill="#44291d" />
      {[[-5,130,30,40],[-15,155,35,35],[0,175,28,30]].map(([dx,y,rx,ry],i) =>
        <ellipse key={i} cx={36+dx} cy={y} rx={rx} ry={ry} fill="#1a3a1a" />
      )}
    </g>
  );
}

// ── One Tom Turkey — Thanksgiving Table ──────────────────────────────────────
function TomTurkeyScene({ variant: v }: { variant: "a" | "b" }) {
  return (
    <g>
      {/* Room */}
      <rect x="0" y="0" width="400" height="280" fill="#fef3c7" />
      <rect x="0" y="200" width="400" height="80" fill="#d97706" />
      {/* Window */}
      <rect x="300" y="20" width="80" height="100" fill="#bfdbfe" rx="6" />
      <rect x="337" y="20" width="4" height="100" fill="#93c5fd" />
      <rect x="300" y="68" width="80" height="4" fill="#93c5fd" />
      {/* Table */}
      <rect x="40" y="160" width="320" height="50" fill="#a16207" rx="8" />
      <rect x="40" y="155" width="320" height="14" fill="#92400e" rx="4" />
      {/* Tablecloth */}
      <rect x="40" y="155" width="320" height="20" fill={v==="b" ? "#fca5a5" : "#f97316"} rx="4" opacity="0.7" />
      {/* Turkey centerpiece */}
      <ellipse cx="200" cy="148" rx="35" ry="28" fill="#92400e" />
      {[-40,-20,0,20,40].map((da,i) =>
        <ellipse key={i} cx={200+Math.sin(da*Math.PI/180)*40} cy={148-Math.cos(da*Math.PI/180)*40+5} rx="8" ry="20" fill={["#ef4444","#f97316","#eab308","#22c55e","#3b82f6"][i]} transform={`rotate(${da},200,148)`} />
      )}
      <circle cx="200" cy="135" r="20" fill="#78350f" />
      <ellipse cx="200" cy="145" rx="14" ry="8" fill="#9a3412" />
      <circle cx="200" cy="130" r="4" fill="#ef4444" />
      {/* Candles */}
      {v==="a" && [[100,135],[315,135]].map(([x,y],i) => (
        <g key={i}>
          <rect x={x-5} y={y} width="10" height="30" fill="#fef9c3" />
          <ellipse cx={x} cy={y} rx="8" ry={3} fill="#fde047" opacity="0.8" />
          <ellipse cx={x} cy={y-5} rx="3" ry={8} fill="#f97316" opacity="0.9" />
        </g>
      ))}
      {/* Pie */}
      <ellipse cx="110" cy="160" rx={v==="b" ? 25 : 35} ry={v==="b" ? 10 : 14} fill="#92400e" />
      <ellipse cx="110" cy="155" rx={v==="b" ? 25 : 35} ry={v==="b" ? 10 : 14} fill="#c2410c" />
      {/* Corn */}
      {[[290,148],[310,145],[300,155]].map(([x,y],i) =>
        <ellipse key={i} cx={x} cy={y} rx="8" ry="20" fill="#fde047" transform={`rotate(${i*15-15},${x},${y})`} />
      )}
      {/* Plate */}
      <ellipse cx="200" cy="165" rx="40" ry="8" fill="#f5f5f4" />
    </g>
  );
}

// ── Ollie — Cozy Neighborhood ─────────────────────────────────────────────────
function OllieScene({ variant: v }: { variant: "a" | "b" }) {
  return (
    <g>
      {/* Sky */}
      <rect x="0" y="0" width="400" height="280" fill="#93c5fd" />
      {/* Clouds */}
      <Cloud cx={80} cy={50} fill="white" />
      <Cloud cx={300} cy={35} fill="white" scale={0.85} />
      {/* Ground */}
      <rect x="0" y="200" width="400" height="80" fill="#86efac" />
      {/* Sidewalk */}
      <rect x="0" y="220" width="400" height="25" fill="#e5e7eb" />
      {/* Houses */}
      {/* House 1 */}
      <rect x="20" y="120" width="110" height="90" fill={v==="b" ? "#fca5a5" : "#fde68a"} />
      <polygon points="20,120 75,70 130,120" fill="#ef4444" />
      <rect x="55" y="165" width="40" height="45" fill="#92400e" />
      <rect x="32" y="130" width="28" height="25" fill="#bfdbfe" rx="2" />
      <rect x="82" y="130" width="28" height="25" fill="#bfdbfe" rx="2" />
      {/* House 2 */}
      <rect x="250" y="115" width="130" height="95" fill="#d9f99d" />
      <polygon points="250,115 315,65 380,115" fill="#16a34a" />
      <rect x="296" y="165" width="38" height="45" fill="#6b3d14" />
      <rect x="258" y="128" width="30" height="28" fill="#bfdbfe" rx="2" />
      <rect x="330" y="128" width="30" height="28" fill="#bfdbfe" rx="2" />
      {/* Trees */}
      <rect x="157" y="155" width="10" height="55" fill="#44291d" />
      <circle cx="162" cy="140" r="30" fill="#15803d" />
      <circle cx="150" cy="155" r="20" fill="#166534" />
      {/* Bush where Ollie hides */}
      <ellipse cx="190" cy="215" rx="45" ry="22" fill="#15803d" />
      <ellipse cx="165" cy="218" rx="30" ry="18" fill="#166534" />
      <ellipse cx="215" cy="216" rx="32" ry="20" fill="#15803d" />
      {/* Ollie peeking from bush */}
      <circle cx="190" cy="205" r="12" fill={v==="b" ? "#f97316" : "#92400e"} />
      <ellipse cx="185" cy="200" rx="5" ry="7" fill={v==="b" ? "#f97316" : "#78350f"} />
      <ellipse cx="195" cy="200" rx="5" ry="7" fill={v==="b" ? "#f97316" : "#78350f"} />
      <circle cx="187" cy="204" r="2.5" fill="#1e293b" />
      <circle cx="193" cy="204" r="2.5" fill="#1e293b" />
      <path d="M186,210 Q190,214 194,210" fill="none" stroke="#1e293b" strokeWidth="1.5" />
      {/* Lamp post */}
      <rect x="238" y="150" width="6" height="70" fill="#64748b" />
      <ellipse cx="241" cy="148" rx="14" ry="8" fill="#fde047" opacity="0.8" />
      {/* Mailbox */}
      <rect x="350" y="195" width="30" height="20" fill={v==="b" ? "#3b82f6" : "#dc2626"} rx="3" />
      <rect x="362" y="193" width="6" height="6" fill="#1e293b" rx="1" />
      <rect x="365" y="210" width="4" height="18" fill="#64748b" />
    </g>
  );
}

// ── Doodle-Do — Dawn Farm ─────────────────────────────────────────────────────
function DoodleDoScene({ variant: v }: { variant: "a" | "b" }) {
  return (
    <g>
      {/* Dawn sky */}
      <rect x="0" y="0" width="400" height="280" fill="#fde68a" />
      <rect x="0" y="0" width="400" height="120" fill="#fed7aa" />
      <rect x="0" y="0" width="400" height="60" fill="#fca5a5" />
      {/* Sun rising */}
      <circle cx="200" cy={v==="b" ? 60 : 90} r="38" fill="#fbbf24" />
      {Array.from({length:8}, (_,i) => {
        const a = i * Math.PI/4;
        return <line key={i} x1={200+Math.cos(a)*42} y1={(v==="b"?60:90)+Math.sin(a)*42} x2={200+Math.cos(a)*58} y2={(v==="b"?60:90)+Math.sin(a)*58} stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />;
      })}
      {/* Ground */}
      <rect x="0" y="200" width="400" height="80" fill="#86efac" />
      <rect x="0" y="215" width="400" height="65" fill="#4ade80" />
      {/* Barn */}
      <rect x="250" y="100" width="140" height="115" fill="#dc2626" />
      <polygon points="250,100 320,55 390,100" fill="#b91c1c" />
      <rect x="294" y="160" width="52" height="55" fill="#78350f" />
      <rect x="258" y="115" width="38" height="30" fill="#fef9c3" rx="2" />
      {/* Fence */}
      {[20,50,80,110,140,170,200,230].map((x,i) =>
        <rect key={i} x={x} y={170} width="7" height="40" fill="#d4b896" rx="1.5" />
      )}
      <rect x="20" y="182" width="220" height="7" fill="#d4b896" rx="2" />
      {/* Rooster on fence */}
      <ellipse cx="60" cy="162" rx="16" ry="20" fill={v==="b" ? "#fbbf24" : "#92400e"} />
      <circle cx="60" cy="145" r="12" fill={v==="b" ? "#fbbf24" : "#78350f"} />
      <polygon points="60,137 54,128 66,128" fill="#ef4444" />
      <circle cx="60" cy="137" r="4" fill="#ef4444" />
      {[-15,-8,0,8,15].map((da,i) =>
        <rect key={i} x={60-3} y={144} width="6" height="18" fill={["#ef4444","#f97316","#eab308","#22c55e","#3b82f6"][i]} transform={`rotate(${da},60,144)`} />
      )}
      <ellipse cx="60" cy="144" rx="4" ry="6" fill="#facc15" />
      {/* Hens */}
      {[[130,190,"#92400e"],[160,192,v==="b"?"#7c3aed":"#92400e"]].map(([x,y,fill],i) => (
        <g key={i}>
          <ellipse cx={x as number} cy={y as number} rx="18" ry="14" fill={fill as string} />
          <circle cx={(x as number)-8} cy={(y as number)-12} r="10" fill={fill as string} />
          <polygon points={`${(x as number)-8},${(y as number)-22} ${(x as number)-13},${(y as number)-30} ${(x as number)-3},${(y as number)-30}`} fill="#ef4444" />
        </g>
      ))}
      {/* Eggs */}
      {v==="a" && [[200,210],[214,213],[228,210]].map(([x,y],i) =>
        <ellipse key={i} cx={x} cy={y} rx="8" ry="10" fill="#fef9c3" />
      )}
    </g>
  );
}

// ── Shut-In Button — Living Room ─────────────────────────────────────────────
function ShutInButtonScene({ variant: v }: { variant: "a" | "b" }) {
  return (
    <g>
      {/* Room */}
      <rect x="0" y="0" width="400" height="280" fill="#fef3c7" />
      <rect x="0" y="0" width="400" height="10" fill="#d97706" />
      <rect x="0" y="235" width="400" height="45" fill="#92400e" />
      {/* Rug */}
      <ellipse cx="200" cy="240" rx="150" ry="20" fill="#7c3aed" opacity="0.4" />
      {/* Window */}
      <rect x="20" y="30" width="100" height="110" fill="#bfdbfe" rx="6" />
      <rect x="67" y="30" width="6" height="110" fill="#93c5fd" />
      <rect x="20" y="83" width="100" height="6" fill="#93c5fd" />
      {/* Sunshine through window */}
      {v==="a" && <>
        <line x1="20" y1="30" x2="80" y2="100" stroke="#fde047" strokeWidth="20" opacity="0.15" />
        <line x1="80" y1="30" x2="140" y2="100" stroke="#fde047" strokeWidth="15" opacity="0.12" />
      </>}
      {/* Couch */}
      <rect x="150" y="170" width="210" height="65" fill={v==="b" ? "#60a5fa" : "#7c3aed"} rx="10" />
      <rect x="150" y="155" width="210" height="25" fill={v==="b" ? "#3b82f6" : "#6d28d9"} rx="8" />
      <rect x="150" y="158" width="30" height="77" fill={v==="b" ? "#3b82f6" : "#6d28d9"} rx="8" />
      <rect x="330" y="158" width="30" height="77" fill={v==="b" ? "#3b82f6" : "#6d28d9"} rx="8" />
      {/* Cushions */}
      <rect x="160" y="174" width="80" height="52" fill={v==="b" ? "#7dd3fc" : "#8b5cf6"} rx="8" />
      <rect x="250" y="174" width="80" height="52" fill={v==="b" ? "#7dd3fc" : "#8b5cf6"} rx="8" />
      {/* Button on pedestal */}
      <rect x="200" y="130" width="40" height="42" fill="#e5e7eb" rx="4" />
      <rect x="196" y="168" width="48" height="8" fill="#d1d5db" rx="2" />
      <circle cx="220" cy="148" r="18" fill="#fde047" />
      <circle cx="220" cy="148" r="14" fill={v==="b" ? "#f97316" : "#eab308"} />
      <circle cx="220" cy="148" r="8" fill="#fbbf24" />
      {/* Glow effect */}
      {Array.from({length:6}, (_,i) => (
        <circle key={i} cx="220" cy="148" r={22+i*6} fill="none" stroke="#fde047" strokeWidth="1.5" opacity={(0.4-i*0.06)} />
      ))}
      {/* Plant */}
      <rect x="330" y="145" width="16" height="35" fill="#78350f" rx="2" />
      <rect x="322" y="175" width="32" height="12" fill="#92400e" rx="3" />
      {[[-20,-55,18],[-5,-65,22],[15,-58,18]].map(([dx,dy,r],i) =>
        <circle key={i} cx={338+dx} cy={158+dy} r={r} fill={i===1 && v==="b" ? "#86efac" : "#15803d"} opacity="0.9" />
      )}
      {/* Books on floor */}
      {[[50,230,"#ef4444"],[68,228,"#3b82f6"],[86,232,"#a855f7"]].map(([x,y,fill],i) =>
        <rect key={i} x={x as number} y={y as number} width="18" height="28" fill={fill as string} rx="2" transform={`rotate(${(i-1)*10},${(x as number)+9},${(y as number)+14})`} />
      )}
    </g>
  );
}

// ── Frog-a-Dog — Pond ─────────────────────────────────────────────────────────
function FrogADogScene({ variant: v }: { variant: "a" | "b" }) {
  return (
    <g>
      {/* Sky */}
      <rect x="0" y="0" width="400" height="280" fill="#93c5fd" />
      <Cloud cx={80} cy={40} fill="white" />
      <Cloud cx={300} cy={30} fill="white" scale={0.85} />
      {/* Pond */}
      <ellipse cx="200" cy="200" rx="180" ry="90" fill="#2563eb" />
      <ellipse cx="200" cy="200" rx="175" ry="85" fill="#3b82f6" />
      {/* Ripples */}
      {[30,55,80].map((r,i) =>
        <ellipse key={i} cx="200" cy="200" rx={r} ry={r*0.4} fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity={0.5-i*0.1} />
      )}
      {/* Bank / grass */}
      <ellipse cx="200" cy="280" rx="220" ry="80" fill="#4ade80" />
      {/* Reeds */}
      {[[80,160],[95,155],[75,165],[315,158],[330,162],[320,155]].map(([x,y],i) => (
        <g key={i}>
          <rect x={x-2} y={y} width="4" height="60" fill="#166534" />
          <ellipse cx={x} cy={y} rx="5" ry="14" fill={i===2 && v==="b" ? "#7c3aed" : "#44311a"} />
        </g>
      ))}
      {/* Lily pads */}
      {[[150,210,32],[230,185,28],[170,190,24]].map(([x,y,r],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill={v==="b" && i===1 ? "#86efac" : "#15803d"} />
          <path d={`M${x},${y} L${x+r*0.7},${y-r*0.7}`} fill="none" stroke="#166534" strokeWidth="2" />
          {i===0 && <circle cx={x-5} cy={y-5} r="7" fill="#f9a8d4" />}
        </g>
      ))}
      {/* Frog on lily pad */}
      <ellipse cx="150" cy="204" rx="20" ry="14" fill="#22c55e" />
      <circle cx="142" cy="195" r="10" fill="#16a34a" />
      <circle cx="158" cy="195" r="10" fill="#16a34a" />
      <circle cx="140" cy="192" r="5" fill="#4ade80" />
      <circle cx="156" cy="192" r="5" fill="#4ade80" />
      <circle cx="141" cy="192" r="2.5" fill="#1e293b" />
      <circle cx="157" cy="192" r="2.5" fill="#1e293b" />
      {/* Dog on bank */}
      <ellipse cx="310" cy="250" rx="50" ry="30" fill={v==="b" ? "#fde047" : "#f97316"} />
      <circle cx="275" cy="230" r="25" fill={v==="b" ? "#fbbf24" : "#ea580c"} />
      <ellipse cx="266" cy="222" rx="10" ry="14" fill={v==="b" ? "#fbbf24" : "#ea580c"} />
      <ellipse cx="284" cy="222" rx="10" ry="14" fill={v==="b" ? "#fbbf24" : "#ea580c"} />
      <circle cx="272" cy="230" r="3" fill="#1e293b" />
      <circle cx="282" cy="230" r="3" fill="#1e293b" />
      <ellipse cx="268" cy="238" rx="8" ry="5" fill="#fca5a5" />
      {/* Duck */}
      {v==="a" && <>
        <ellipse cx="240" cy="195" rx="20" ry="14" fill="#fde047" />
        <circle cx="225" cy="186" r="12" fill="#fde047" />
        <polygon points="215,186 206,182 215,190" fill="#f97316" />
        <circle cx="222" cy="183" r="2" fill="#1e293b" />
      </>}
    </g>
  );
}

// ── Brian — Halloween Street ──────────────────────────────────────────────────
function BrianScene({ variant: v }: { variant: "a" | "b" }) {
  return (
    <g>
      {/* Night sky */}
      <rect x="0" y="0" width="400" height="280" fill="#1e0a3c" />
      {/* Stars */}
      {[[30,25],[90,15],[170,30],[260,12],[340,28],[200,8],[120,45]].map(([x,y],i) =>
        <Star key={i} cx={x} cy={y} r={i===3 && v==="b" ? 0 : 3} fill="#fff" />
      )}
      {/* Moon */}
      <circle cx={v==="b" ? 50 : 330} cy="52" r="35" fill="#fde68a" />
      <circle cx={v==="b" ? 65 : 345} cy="44" r="26" fill="#1e0a3c" />
      {/* Ground */}
      <rect x="0" y="220" width="400" height="60" fill="#1a1a2e" />
      <rect x="0" y="230" width="400" height="6" fill="#374151" />
      {/* Houses */}
      <rect x="20" y="120" width="100" height="110" fill="#374151" />
      <polygon points="20,120 70,75 120,120" fill="#1f2937" />
      <rect x="45" y="180" width="50" height="50" fill="#111827" />
      <rect x="28" y="133" width="28" height="22" fill="#fde047" opacity="0.6" />
      <rect x="85" y="133" width="28" height="22" fill="#fde047" opacity={v==="b" ? 0 : 0.6} />
      <rect x="280" y="115" width="110" height="115" fill="#374151" />
      <polygon points="280,115 335,68 390,115" fill="#1f2937" />
      <rect x="308" y="180" width="44" height="50" fill="#111827" />
      <rect x="286" y="128" width="30" height="25" fill="#f97316" opacity="0.5" />
      <rect x="344" y="128" width="30" height="25" fill="#f97316" opacity="0.5" />
      {/* Jack-o-lanterns */}
      {[[55,220,16,"#f97316"],[165,218,14,"#ea580c"],[250,221,15,"#f97316"],[340,219,16,"#ea580c"]].map(([x,y,r,fill],i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r={r as number} fill={fill as string} />
          <rect x={(x as number)-3} y={(y as number)-(r as number)-5} width="6" height="8" fill="#166534" rx="1" />
          <polygon points={`${(x as number)-6},${(y as number)-4} ${(x as number)-2},${(y as number)+2} ${(x as number)+2},${(y as number)-4}`} fill="#1e0a3c" />
          <polygon points={`${(x as number)+2},${(y as number)-4} ${(x as number)+6},${(y as number)+2} ${(x as number)+10},${(y as number)-4}`} fill="#1e0a3c" />
        </g>
      ))}
      {/* Brian the ghost — floating */}
      <ellipse cx="200" cy="130" rx="35" ry="45" fill={v==="b" ? "rgba(200,180,255,0.85)" : "rgba(220,200,255,0.9)"} />
      {[-25,-10,10,25].map((dx,i) =>
        <ellipse key={i} cx={200+dx} cy="170" rx="10" ry="12" fill={v==="b" ? "rgba(200,180,255,0.85)" : "rgba(220,200,255,0.9)"} />
      )}
      {/* Brian's friendly wave */}
      <circle cx="232" cy="120" r="10" fill={v==="b" ? "rgba(200,180,255,0.85)" : "rgba(220,200,255,0.9)"} />
      <rect x="230" y="110" width="6" height="22" fill={v==="b" ? "rgba(200,180,255,0.85)" : "rgba(220,200,255,0.9)"} rx="3" />
      {/* Brian face */}
      <circle cx="192" cy="122" r="5" fill="#1e0a3c" />
      <circle cx="208" cy="122" r="5" fill="#1e0a3c" />
      <path d="M190,138 Q200,146 210,138" fill="none" stroke="#1e0a3c" strokeWidth="2" />
      {/* Flying bats */}
      {[[120,80],[280,70]].map(([x,y],i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="18" ry="7" fill="#111827" />
          <circle cx={x} cy={y-4} r="6" fill="#111827" />
          <path d={`M${x-18},${y} Q${x-9},${y-14} ${x},${y}`} fill="#1f2937" />
          <path d={`M${x},${y} Q${x+9},${y-14} ${x+18},${y}`} fill="#1f2937" />
        </g>
      ))}
    </g>
  );
}

// ── Scene registry ────────────────────────────────────────────────────────────
export const SCENES: Record<string, SceneConfig> = {
  "dream-ideas": {
    viewBox: "0 0 400 280",
    Scene: DreamIdeasScene,
    differences: [
      { x: 340, y: 40, r: 35, label: "Moon size" },
      { x: 200, y: 20, r: 20, label: "Missing star" },
      { x: 160, y: 200, r: 30, label: "Blanket color" },
      { x: 338, y: 183, r: 25, label: "Lamp color" },
      { x: 15, y: 90, r: 22, label: "Book color" },
    ],
    hiddenItems: [
      { id: "star", emoji: "⭐", label: "Shooting star", zone: { x: 10, y: 70, r: 20 } },
      { id: "bunny", emoji: "🐰", label: "Bunny toy", zone: { x: 95, y: 225, r: 22 } },
      { id: "cookie", emoji: "🍪", label: "Night cookie", zone: { x: 335, y: 215, r: 20 } },
      { id: "cloud", emoji: "☁️", label: "Dream cloud", zone: { x: 250, y: 50, r: 25 } },
      { id: "moon", emoji: "🌙", label: "Moon doodle", zone: { x: 110, y: 200, r: 20 } },
      { id: "sock", emoji: "🧦", label: "Lost sock", zone: { x: 290, y: 172, r: 20 } },
    ],
  },

  "amber": {
    viewBox: "0 0 400 280",
    Scene: AmberScene,
    differences: [
      { x: 200, y: 220, r: 40, label: "Fire size" },
      { x: 180, y: 238, r: 28, label: "Dragon egg size" },
      { x: 120, y: 190, r: 22, label: "Crystal color" },
      { x: 290, y: 235, r: 20, label: "Gold coins gone" },
      { x: 42, y: 230, r: 25, label: "Gem color" },
    ],
    hiddenItems: [
      { id: "ruby", emoji: "♦️", label: "Ruby gem", zone: { x: 55, y: 228, r: 22 } },
      { id: "sapphire", emoji: "💠", label: "Sapphire", zone: { x: 335, y: 222, r: 22 } },
      { id: "key", emoji: "🗝️", label: "Old key", zone: { x: 280, y: 250, r: 18 } },
      { id: "egg", emoji: "🥚", label: "Hidden egg", zone: { x: 180, y: 240, r: 20 } },
      { id: "sparkle", emoji: "✨", label: "Magic sparkle", zone: { x: 130, y: 188, r: 18 } },
      { id: "coin", emoji: "🪙", label: "Gold coin", zone: { x: 290, y: 255, r: 18 } },
    ],
  },

  "poo-poo-face": {
    viewBox: "0 0 400 280",
    Scene: PooScene,
    differences: [
      { x: 95, y: 108, r: 25, label: "Rubber duck color" },
      { x: 155, y: 185, r: 22, label: "Toilet paper gone" },
      { x: 258, y: 202, r: 20, label: "Tap color" },
      { x: 270, y: 118, r: 30, label: "Mirror shape" },
      { x: 334, y: 138, r: 30, label: "Towel color" },
    ],
    hiddenItems: [
      { id: "soap", emoji: "🧼", label: "Bar of soap", zone: { x: 240, y: 210, r: 20 } },
      { id: "duck", emoji: "🐥", label: "Hidden ducky", zone: { x: 95, y: 108, r: 22 } },
      { id: "toothbrush", emoji: "🪥", label: "Toothbrush", zone: { x: 350, y: 155, r: 18 } },
      { id: "roll", emoji: "🧻", label: "Toilet paper", zone: { x: 155, y: 185, r: 20 } },
      { id: "comb", emoji: "🪮", label: "Hair comb", zone: { x: 50, y: 135, r: 18 } },
      { id: "towel", emoji: "🛁", label: "Rubber duck friend", zone: { x: 50, y: 75, r: 25 } },
    ],
  },

  "gilroy": {
    viewBox: "0 0 400 280",
    Scene: GilroyScene,
    differences: [
      { x: 350, y: 50, r: 40, label: "Sun size" },
      { x: 80, y: 40, r: 35, label: "Cloud missing" },
      { x: 278, y: 140, r: 22, label: "Turkey color" },
      { x: 295, y: 155, r: 15, label: "Fence post color" },
      { x: 15, y: 90, r: 20, label: "Book spine color" },
    ],
    hiddenItems: [
      { id: "feather", emoji: "🪶", label: "Feather", zone: { x: 280, y: 130, r: 20 } },
      { id: "egg", emoji: "🥚", label: "Hidden egg", zone: { x: 130, y: 250, r: 18 } },
      { id: "apple", emoji: "🍎", label: "Fallen apple", zone: { x: 50, y: 218, r: 20 } },
      { id: "hat", emoji: "👒", label: "Farmer hat", zone: { x: 160, y: 80, r: 22 } },
      { id: "corn", emoji: "🌽", label: "Corn cob", zone: { x: 345, y: 195, r: 20 } },
      { id: "worm", emoji: "🪱", label: "Wiggly worm", zone: { x: 200, y: 250, r: 18 } },
    ],
  },

  "hampton": {
    viewBox: "0 0 400 280",
    Scene: HamptonScene,
    differences: [
      { x: 225, y: 58, r: 22, label: "Balloon color" },
      { x: 265, y: 185, r: 32, label: "Gift box position" },
      { x: 93, y: 195, r: 30, label: "Ear color" },
      { x: 160, y: 70, r: 22, label: "Balloon color" },
      { x: 320, y: 215, r: 18, label: "Flower color" },
    ],
    hiddenItems: [
      { id: "bow", emoji: "🎀", label: "Spare bow", zone: { x: 275, y: 175, r: 20 } },
      { id: "balloon", emoji: "🎈", label: "Lost balloon", zone: { x: 150, y: 82, r: 20 } },
      { id: "candle", emoji: "🕯️", label: "Birthday candle", zone: { x: 335, y: 195, r: 18 } },
      { id: "card", emoji: "💌", label: "Birthday card", zone: { x: 95, y: 210, r: 22 } },
      { id: "cupcake", emoji: "🧁", label: "Mini cupcake", zone: { x: 200, y: 250, r: 20 } },
      { id: "star", emoji: "⭐", label: "Party star", zone: { x: 355, y: 85, r: 18 } },
    ],
  },

  "lumpiest-pumpkin": {
    viewBox: "0 0 400 280",
    Scene: LumpiestPumpkinScene,
    differences: [
      { x: 50, y: 190, r: 35, label: "Pumpkin color" },
      { x: 314, y: 77, r: 20, label: "Scarecrow hat color" },
      { x: 310, y: 48, r: 22, label: "Star missing" },
      { x: 210, y: 195, r: 25, label: "Jack-o-lantern glow" },
      { x: 205, y: 185, r: 20, label: "Eye color" },
    ],
    hiddenItems: [
      { id: "spider", emoji: "🕷️", label: "Sneaky spider", zone: { x: 30, y: 110, r: 18 } },
      { id: "bat", emoji: "🦇", label: "Tiny bat", zone: { x: 200, y: 45, r: 20 } },
      { id: "seed", emoji: "🌰", label: "Pumpkin seed", zone: { x: 170, y: 250, r: 18 } },
      { id: "witch", emoji: "🧙", label: "Witch hat", zone: { x: 360, y: 175, r: 20 } },
      { id: "cat", emoji: "🐱", label: "Black cat", zone: { x: 100, y: 240, r: 20 } },
      { id: "moon", emoji: "🌙", label: "Moon face", zone: { x: 340, y: 50, r: 25 } },
    ],
  },

  "one-tom-turkey": {
    viewBox: "0 0 400 280",
    Scene: TomTurkeyScene,
    differences: [
      { x: 150, y: 160, r: 30, label: "Tablecloth color" },
      { x: 100, y: 140, r: 25, label: "Candle missing" },
      { x: 110, y: 152, r: 28, label: "Pie size" },
      { x: 300, y: 145, r: 22, label: "Candle missing" },
      { x: 200, y: 130, r: 38, label: "Turkey feather" },
    ],
    hiddenItems: [
      { id: "fork", emoji: "🍴", label: "Missing fork", zone: { x: 55, y: 175, r: 18 } },
      { id: "corn", emoji: "🌽", label: "Corn cob", zone: { x: 295, y: 150, r: 22 } },
      { id: "cranberry", emoji: "🫐", label: "Cranberry", zone: { x: 240, y: 165, r: 18 } },
      { id: "leaf", emoji: "🍂", label: "Autumn leaf", zone: { x: 355, y: 145, r: 18 } },
      { id: "butter", emoji: "🧈", label: "Butter dish", zone: { x: 165, y: 165, r: 18 } },
      { id: "apple", emoji: "🍎", label: "Apple", zone: { x: 375, y: 185, r: 18 } },
    ],
  },

  "ollie": {
    viewBox: "0 0 400 280",
    Scene: OllieScene,
    differences: [
      { x: 75, y: 150, r: 38, label: "House color" },
      { x: 190, y: 205, r: 25, label: "Ollie fur color" },
      { x: 350, y: 200, r: 22, label: "Mailbox color" },
      { x: 85, y: 133, r: 18, label: "Window light" },
      { x: 162, y: 140, r: 28, label: "Tree color" },
    ],
    hiddenItems: [
      { id: "paw", emoji: "🐾", label: "Paw print", zone: { x: 230, y: 225, r: 18 } },
      { id: "yarn", emoji: "🧶", label: "Ball of yarn", zone: { x: 130, y: 250, r: 18 } },
      { id: "bird", emoji: "🐦", label: "Little bird", zone: { x: 162, y: 115, r: 18 } },
      { id: "bone", emoji: "🦴", label: "Dog bone", zone: { x: 290, y: 235, r: 18 } },
      { id: "fish", emoji: "🐟", label: "Fish treat", zone: { x: 50, y: 215, r: 18 } },
      { id: "bow", emoji: "🎀", label: "Pink bow", zone: { x: 190, y: 200, r: 20 } },
    ],
  },

  "doodle-do": {
    viewBox: "0 0 400 280",
    Scene: DoodleDoScene,
    differences: [
      { x: 200, y: 88, r: 40, label: "Sun height" },
      { x: 60, y: 155, r: 22, label: "Rooster color" },
      { x: 160, y: 192, r: 20, label: "Hen color" },
      { x: 200, y: 212, r: 20, label: "Eggs missing" },
      { x: 95, y: 150, r: 20, label: "Reed color" },
    ],
    hiddenItems: [
      { id: "worm", emoji: "🪱", label: "Wriggly worm", zone: { x: 180, y: 245, r: 18 } },
      { id: "seed", emoji: "🌾", label: "Corn seed", zone: { x: 230, y: 240, r: 18 } },
      { id: "star", emoji: "⭐", label: "Morning star", zone: { x: 350, y: 25, r: 20 } },
      { id: "egg", emoji: "🥚", label: "Secret egg", zone: { x: 200, y: 212, r: 20 } },
      { id: "hat", emoji: "👒", label: "Farmer hat", zone: { x: 310, y: 100, r: 22 } },
      { id: "fox", emoji: "🦊", label: "Sneaky fox", zone: { x: 40, y: 255, r: 20 } },
    ],
  },

  "shut-in-button": {
    viewBox: "0 0 400 280",
    Scene: ShutInButtonScene,
    differences: [
      { x: 255, y: 190, r: 40, label: "Couch color" },
      { x: 338, y: 140, r: 22, label: "Plant leaf color" },
      { x: 220, y: 145, r: 20, label: "Button color" },
      { x: 80, y: 80, r: 40, label: "Sunlight gone" },
      { x: 68, y: 232, r: 20, label: "Book color" },
    ],
    hiddenItems: [
      { id: "coin", emoji: "🪙", label: "Lost coin", zone: { x: 140, y: 245, r: 18 } },
      { id: "remote", emoji: "📺", label: "TV remote", zone: { x: 200, y: 200, r: 20 } },
      { id: "candy", emoji: "🍬", label: "Hidden candy", zone: { x: 175, y: 210, r: 18 } },
      { id: "sock", emoji: "🧦", label: "Missing sock", zone: { x: 350, y: 240, r: 18 } },
      { id: "sparkle", emoji: "✨", label: "Magic spark", zone: { x: 220, y: 128, r: 20 } },
      { id: "cookie", emoji: "🍪", label: "Sneaky cookie", zone: { x: 60, y: 250, r: 18 } },
    ],
  },

  "frog-a-dog": {
    viewBox: "0 0 400 280",
    Scene: FrogADogScene,
    differences: [
      { x: 275, y: 238, r: 30, label: "Dog color" },
      { x: 95, y: 148, r: 20, label: "Reed color" },
      { x: 230, y: 188, r: 28, label: "Lily pad color" },
      { x: 240, y: 195, r: 25, label: "Duck missing" },
      { x: 150, y: 212, r: 22, label: "Lily pad flower" },
    ],
    hiddenItems: [
      { id: "snail", emoji: "🐌", label: "Snail", zone: { x: 60, y: 255, r: 18 } },
      { id: "fish", emoji: "🐟", label: "Fish", zone: { x: 200, y: 215, r: 20 } },
      { id: "dragonfly", emoji: "🦟", label: "Dragonfly", zone: { x: 285, y: 145, r: 18 } },
      { id: "frog", emoji: "🐸", label: "Baby frog", zone: { x: 165, y: 195, r: 18 } },
      { id: "feather", emoji: "🪶", label: "Duck feather", zone: { x: 255, y: 185, r: 18 } },
      { id: "bubble", emoji: "🫧", label: "Bubble", zone: { x: 215, y: 180, r: 16 } },
    ],
  },

  "brian": {
    viewBox: "0 0 400 280",
    Scene: BrianScene,
    differences: [
      { x: 200, y: 135, r: 40, label: "Ghost color" },
      { x: 330, y: 50, r: 38, label: "Moon position" },
      { x: 90, y: 133, r: 18, label: "Window dark" },
      { x: 260, y: 15, r: 20, label: "Star missing" },
      { x: 165, y: 218, r: 18, label: "Pumpkin gone" },
    ],
    hiddenItems: [
      { id: "bat", emoji: "🦇", label: "Sneaky bat", zone: { x: 120, y: 78, r: 18 } },
      { id: "spider", emoji: "🕷️", label: "Spider", zone: { x: 20, y: 180, r: 18 } },
      { id: "candy", emoji: "🍬", label: "Candy corn", zone: { x: 240, y: 235, r: 18 } },
      { id: "hat", emoji: "🎃", label: "Mini pumpkin", zone: { x: 165, y: 222, r: 18 } },
      { id: "bone", emoji: "🦴", label: "Spooky bone", zone: { x: 380, y: 230, r: 18 } },
      { id: "wave", emoji: "👋", label: "Brian waving", zone: { x: 232, y: 120, r: 20 } },
    ],
  },
};
