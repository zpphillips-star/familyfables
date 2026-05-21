import sys

path = r'C:\Users\zaphilli\projects\familyfables\components\BookActivity.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = 'function TomTurkeySingAlong({ accentColor }: { accentColor: string }) {'
end_marker = 'function ThanksgivingCountdown'

start = content.index(start_marker)
end = content.index(end_marker)

print(f'Replacing chars {start}..{end} ({end-start} chars)')

new_func = """function TomTurkeySingAlong({ accentColor }: { accentColor: string }) {
  const PAGES = [
    {e:"🦃",words:["One","Tom","Turkey","goes","gobble","gobble","gobble,","gobble","gobble","gobble,","gobble","gobble","gobble.","One","Tom","Turkey","goes","gobble","gobble","gobble,","on","Thanksgiving","day!"]},
    {e:"🥧",words:["Two","pumpkin","pies","go","mix,","bake,","bake!","Mix,","bake,","bake!","Mix,","bake,","bake!","Two","pumpkin","pies","go","mix,","bake,","bake,","on","Thanksgiving","day."]},
    {e:"🍒",words:["Three","cranberry","tasters","go","ooo,","that's","sour!","Ooo,","that's","sour!","Ooo,","that's","sour!","Three","cranberry","tasters","go","ooo,","that's","sour,","on","Thanksgiving","day."]},
    {e:"🥔",words:["Four","boiled","potatoes","go","mash,","mash,","stir!","Mash,","mash,","stir!","Mash,","mash,","stir!","Four","boiled","potatoes","go","mash,","mash,","stir,","on","Thanksgiving","day."]},
    {e:"🏈",words:["Five","flying","footballs","go","spinning","in","the","air,","spinning","in","the","air,","spinning","in","the","air!","Five","flying","footballs","go","spinning","in","the","air,","on","Thanksgiving","day."]},
    {e:"🙏",words:["Six","things","we","are","thankful","for,","thankful","for,","thankful","for.","Six","things","we","are","thankful","for,","on","Thanksgiving","day."]},
    {e:"🔘",words:["Seven","shirt","buttons","go","stretch,","stretch,","POP!","Stretch,","stretch,","POP!","Stretch,","stretch,","POP!","Seven","shirt","buttons","go","stretch,","stretch,","POP!","On","Thanksgiving","day."]},
    {e:"😋",words:["Eight","full","tummies","go","mmm,","that","was","good!","Mmm,","that","was","good!","Mmm,","that","was","good!","Eight","full","tummies","go","mmm,","that","was","good,","on","Thanksgiving","day."]},
    {e:"🍽️",words:["Nine","dirty","dishes","go","clink,","clank,","clink!","Clink,","clank,","clink!","Clink,","clank,","clink!","Nine","dirty","dishes","go","clink,","clank,","clink,","on","Thanksgiving","day."]},
    {e:"😴",words:["Ten","tired","folks","go","yawn,","yawn,","yawn!","Yawn,","yawn,","yawn!","Yawn,","yawn,","yawn!","Ten","tired","folks","go","yawn,","yawn,","yawn,","on","Thanksgiving","day."]},
    {e:"🦃",words:["One","Tom","Turkey","goes","gobble","gobble","gobble,","gobble","gobble","gobble,","gobble","gobble","gobble.","One","Tom","Turkey","goes","gobble","gobble","...","PARDON!!!","On","Thanksgiving","day!"]},
  ];

  const [pageIdx,  setPageIdx]  = useState(0);
  const [wordIdx,  setWordIdx]  = useState(-1);
  const [playing,  setPlaying]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const audioRef    = useRef<HTMLAudioElement|null>(null);
  const audioCtxRef = useRef<AudioContext|null>(null);
  const playingRef  = useRef(false);
  const urlRef      = useRef<string|null>(null);

  const hf = "var(--font-concert-one),'Concert One',cursive";
  const bf = "var(--font-catamaran),'Catamaran',sans-serif";
  const ac = accentColor;

  // Wheels on the Bus background melody (soft ambience under the voice)
  const playMelody = (ctx: AudioContext) => {
    const G4=392,A4=440,E4=330,D4=294,G3=196;
    const beat = 0.42;
    const seq:[number,number][] = [
      [G4,1],[G4,1],[A4,1],[G4,1],[E4,1],[D4,1],
      [G4,1],[G4,1],[G4,1],[G4,1],[G4,2],
      [G4,1],[G4,1],[G4,1],[G4,1],[G4,2],
      [G4,1],[G4,1],[A4,1],[G4,1],[E4,1],[D4,1],
      [A4,1],[G4,1],[E4,1],[G4,2],[G3,0.5],
    ];
    let t = ctx.currentTime + 0.1;
    seq.forEach(([f,b]) => {
      if (f > 0) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = "triangle"; osc.frequency.value = f;
        const dur = beat * b * 0.8;
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
        osc.start(t); osc.stop(t + dur);
      }
      t += beat * b;
    });
  };

  const stopAll = () => {
    playingRef.current = false;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; audioRef.current = null; }
    if (urlRef.current) { URL.revokeObjectURL(urlRef.current); urlRef.current = null; }
    setPlaying(false); setWordIdx(-1);
  };

  const startPlayback = async (pIdx: number) => {
    stopAll();
    setLoading(true);
    setPageIdx(pIdx);
    playingRef.current = true;

    try {
      const verse = PAGES[pIdx].words.join(" ");
      const res = await fetch("/api/tts-one-tom-turkey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: verse }),
      });
      if (!res.ok || !playingRef.current) { setLoading(false); setPlaying(false); return; }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      urlRef.current = url;

      const audio = new Audio(url);
      audioRef.current = audio;
      const words = PAGES[pIdx].words;

      // Proportional word sync: currentTime/duration * wordCount
      audio.ontimeupdate = () => {
        if (!audio.duration || !playingRef.current) return;
        const wi = Math.min(words.length - 1, Math.floor((audio.currentTime / audio.duration) * words.length));
        setWordIdx(wi);
      };

      audio.onended = () => {
        URL.revokeObjectURL(url); urlRef.current = null;
        const np = pIdx + 1;
        if (np < PAGES.length && playingRef.current) {
          startPlayback(np);
        } else {
          setWordIdx(-1); setPlaying(false); playingRef.current = false;
        }
      };
      audio.onerror = () => { setLoading(false); setPlaying(false); setWordIdx(-1); };

      // Soft background melody
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as {webkitAudioContext: typeof AudioContext}).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") await ctx.resume();
      playMelody(ctx);

      setLoading(false); setPlaying(true); setWordIdx(0);
      audio.play().catch(() => { setPlaying(false); setWordIdx(-1); });

    } catch { setLoading(false); setPlaying(false); playingRef.current = false; }
  };

  const handlePlay = () => {
    if (playing || loading) { stopAll(); return; }
    startPlayback(pageIdx);
  };

  const goToPage = (idx: number) => { stopAll(); setPageIdx(idx); };

  useEffect(() => () => stopAll(), []);

  const page = PAGES[pageIdx];

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{textAlign:"center",fontFamily:hf,fontSize:"clamp(15px,2.3vw,18px)",color:ac}}>
        🎵 Sing Along! — Sung to "Wheels on the Bus" 🦃
      </div>

      {/* Page dots */}
      <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
        {PAGES.map((_,i) => (
          <button key={i} onClick={()=>goToPage(i)}
            style={{width:30,height:30,borderRadius:"50%",border:`2px solid ${i===pageIdx?ac:"#ddd"}`,
              background:i===pageIdx?ac:"#fff",color:i===pageIdx?"#fff":"#666",
              fontWeight:700,fontSize:11,fontFamily:bf,cursor:"pointer",padding:0}}>
            {i+1}
          </button>
        ))}
      </div>

      {/* Lyrics display */}
      <div style={{padding:"20px 16px",borderRadius:20,background:`${ac}0d`,border:`2px solid ${ac}33`,
        minHeight:140,display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
        <div style={{fontSize:48}}>{page.e}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:"6px 10px",alignItems:"center",justifyContent:"center",lineHeight:1.7}}>
          {page.words.map((w,i) => {
            const active = i === wordIdx;
            return (
              <span key={i} style={{
                fontFamily:hf,
                fontSize:active?"clamp(22px,4vw,30px)":"clamp(17px,2.8vw,22px)",
                color:active?ac:"#333",
                fontWeight:700,
                display:"inline-block",
                transition:"all 0.1s ease-out",
                transform:active?"scale(1.3) translateY(-5px)":"scale(1) translateY(0)",
                textShadow:active?`0 3px 12px ${ac}55`:"none",
                background:active?`${ac}20`:"transparent",
                borderRadius:active?8:0,
                padding:active?"3px 8px":"0",
              }}>
                {w}
              </span>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div style={{display:"flex",gap:12,justifyContent:"center",alignItems:"center"}}>
        <button onClick={()=>goToPage(Math.max(0,pageIdx-1))} disabled={pageIdx===0}
          style={{width:44,height:44,borderRadius:"50%",border:`2px solid ${ac}`,background:"#fff",color:ac,
            fontWeight:700,fontSize:22,cursor:pageIdx===0?"not-allowed":"pointer",opacity:pageIdx===0?0.3:1}}>
          ‹
        </button>
        <button onClick={handlePlay}
          style={{padding:"14px 40px",borderRadius:50,background:loading?"#888":(playing?"#FF3B30":ac),color:"#fff",border:"none",
            fontSize:"clamp(16px,2.5vw,20px)",fontWeight:700,fontFamily:hf,cursor:loading?"wait":"pointer",
            boxShadow:`0 4px 16px ${loading?"#88888855":(playing?"#FF3B3055":ac+"55")}`,minWidth:150,transition:"background 0.2s"}}>
          {loading ? "⏳ Loading..." : playing ? "⏸ Pause" : "▶ Sing!"}
        </button>
        <button onClick={()=>goToPage(Math.min(PAGES.length-1,pageIdx+1))} disabled={pageIdx===PAGES.length-1}
          style={{width:44,height:44,borderRadius:"50%",border:`2px solid ${ac}`,background:"#fff",color:ac,
            fontWeight:700,fontSize:22,cursor:pageIdx===PAGES.length-1?"not-allowed":"pointer",opacity:pageIdx===PAGES.length-1?0.3:1}}>
          ›
        </button>
      </div>
      <p style={{textAlign:"center",fontFamily:bf,fontSize:12,color:"#999",margin:0}}>
        Verse {pageIdx+1} of {PAGES.length}{loading?" · Loading voice...":playing?" · 🎵 Playing...":" · Tap ▶ to start!"}
      </p>
    </div>
  );
}

"""

new_content = content[:start] + new_func + content[end:]
with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f'Done. Replaced {end-start} chars with {len(new_func)} chars.')
