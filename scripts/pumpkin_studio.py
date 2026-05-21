"""Replace PumpkinStudio with realistic pumpkins + themed face builder."""

path = r'C:\Users\zaphilli\projects\familyfables\components\BookActivity.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = 'function PumpkinStudio({ accentColor }: { accentColor: string }) {'
end_marker   = 'function ODBtnShape'
start = content.index(start_marker)
end   = content.index(end_marker)
print(f'Replacing chars {start}..{end}')

# ── SVG PUMPKIN BODIES (200×200 viewBox, multi-layer ellipses for 3D shading) ──
PUMP_BODIES = {
'classic': """
  <ellipse cx='100' cy='172' rx='56' ry='10' fill='rgba(0,0,0,0.18)'/>
  <ellipse cx='60'  cy='117' rx='20' ry='53' fill='#a03d00'/>
  <ellipse cx='140' cy='117' rx='20' ry='53' fill='#a03d00'/>
  <ellipse cx='79'  cy='111' rx='24' ry='61' fill='#c45000'/>
  <ellipse cx='121' cy='111' rx='24' ry='61' fill='#c45000'/>
  <ellipse cx='100' cy='108' rx='28' ry='66' fill='#e86000'/>
  <ellipse cx='100' cy='108' rx='17' ry='62' fill='#ff8c10' opacity='0.75'/>
  <ellipse cx='92'  cy='90'  rx='9'  ry='22' fill='#ffb040' opacity='0.35'/>
  <line x1='100' y1='46' x2='100' y2='172' stroke='#a03d00' stroke-width='2'   opacity='0.35'/>
  <line x1='88'  y1='48' x2='86'  y2='171' stroke='#a03d00' stroke-width='1.5' opacity='0.2'/>
  <line x1='112' y1='48' x2='114' y2='171' stroke='#a03d00' stroke-width='1.5' opacity='0.2'/>
  <rect x='95' y='32' width='10' height='25' rx='5' fill='#5d4037'/>
  <path d='M104 40 Q121 32 124 20' stroke='#7cb342' stroke-width='3.5' fill='none' stroke-linecap='round'/>
""",
'tall': """
  <ellipse cx='100' cy='174' rx='46' ry='9'  fill='rgba(0,0,0,0.18)'/>
  <ellipse cx='66'  cy='112' rx='16' ry='62' fill='#954000'/>
  <ellipse cx='134' cy='112' rx='16' ry='62' fill='#954000'/>
  <ellipse cx='82'  cy='106' rx='20' ry='70' fill='#b85200'/>
  <ellipse cx='118' cy='106' rx='20' ry='70' fill='#b85200'/>
  <ellipse cx='100' cy='102' rx='24' ry='76' fill='#e06800'/>
  <ellipse cx='100' cy='102' rx='14' ry='72' fill='#ff9020' opacity='0.7'/>
  <ellipse cx='93'  cy='82'  rx='8'  ry='24' fill='#ffb040' opacity='0.3'/>
  <line x1='100' y1='38' x2='100' y2='174' stroke='#954000' stroke-width='2'   opacity='0.35'/>
  <line x1='90'  y1='40' x2='88'  y2='173' stroke='#954000' stroke-width='1.5' opacity='0.2'/>
  <line x1='110' y1='40' x2='112' y2='173' stroke='#954000' stroke-width='1.5' opacity='0.2'/>
  <rect x='95' y='26' width='10' height='22' rx='5' fill='#5d4037'/>
  <path d='M104 36 Q116 28 118 18' stroke='#7cb342' stroke-width='3' fill='none' stroke-linecap='round'/>
""",
'chubby': """
  <ellipse cx='100' cy='168' rx='68' ry='12' fill='rgba(0,0,0,0.18)'/>
  <ellipse cx='54'  cy='122' rx='28' ry='46' fill='#b04500'/>
  <ellipse cx='146' cy='122' rx='28' ry='46' fill='#b04500'/>
  <ellipse cx='100' cy='116' rx='36' ry='54' fill='#e07000'/>
  <ellipse cx='100' cy='116' rx='22' ry='52' fill='#ff9430' opacity='0.75'/>
  <ellipse cx='90'  cy='98'  rx='14' ry='20' fill='#ffb850' opacity='0.35'/>
  <line x1='100' y1='66' x2='100' y2='165' stroke='#b04500' stroke-width='2'   opacity='0.35'/>
  <line x1='82'  y1='72' x2='78'  y2='164' stroke='#b04500' stroke-width='1.5' opacity='0.2'/>
  <line x1='118' y1='72' x2='122' y2='164' stroke='#b04500' stroke-width='1.5' opacity='0.2'/>
  <rect x='95' y='44' width='10' height='28' rx='5' fill='#5d4037'/>
  <path d='M104 52 Q120 44 122 32' stroke='#7cb342' stroke-width='3.5' fill='none' stroke-linecap='round'/>
""",
'lumpy': """
  <ellipse cx='100' cy='170' rx='55' ry='10' fill='rgba(0,0,0,0.18)'/>
  <ellipse cx='58'  cy='122' rx='19' ry='48' fill='#8a3800'/>
  <ellipse cx='142' cy='118' rx='21' ry='50' fill='#8a3800'/>
  <ellipse cx='76'  cy='114' rx='23' ry='57' fill='#b04a00'/>
  <ellipse cx='124' cy='116' rx='25' ry='55' fill='#b04a00'/>
  <ellipse cx='100' cy='110' rx='28' ry='64' fill='#d86000'/>
  <ellipse cx='100' cy='110' rx='17' ry='60' fill='#f07820' opacity='0.7'/>
  <circle  cx='68'  cy='88'  r='8'  fill='#8a3800' opacity='0.6'/>
  <circle  cx='136' cy='92'  r='7'  fill='#8a3800' opacity='0.6'/>
  <circle  cx='84'  cy='68'  r='6'  fill='#8a3800' opacity='0.5'/>
  <circle  cx='115' cy='72'  r='5'  fill='#8a3800' opacity='0.5'/>
  <ellipse cx='90'  cy='92'  rx='8' ry='18' fill='#f8a040' opacity='0.3'/>
  <line x1='100' y1='48' x2='100' y2='170' stroke='#8a3800' stroke-width='2'   opacity='0.3'/>
  <rect x='95' y='34' width='10' height='24' rx='5' fill='#5d4037'/>
  <path d='M104 42 Q118 34 120 24' stroke='#7cb342' stroke-width='3' fill='none' stroke-linecap='round'/>
""",
'ghost': """
  <ellipse cx='100' cy='174' rx='54' ry='9'  fill='rgba(180,180,220,0.25)'/>
  <ellipse cx='100' cy='110' rx='48' ry='70' fill='#d0d0e8'/>
  <ellipse cx='100' cy='110' rx='40' ry='68' fill='#e8e8f4'/>
  <ellipse cx='100' cy='110' rx='30' ry='64' fill='#f4f4fa'/>
  <ellipse cx='92'  cy='90'  rx='12' ry='24' fill='white' opacity='0.6'/>
  <path d='M52 148 Q55 168 60 168 Q65 168 68 148 Q71 168 76 168 Q81 168 84 148 Q87 168 92 168 Q97 168 100 155 Q103 168 108 168 Q113 168 116 148 Q119 168 124 168 Q129 168 132 148 Q135 168 140 168 Q145 168 148 148' fill='white' stroke='#c8c8e0' stroke-width='1'/>
  <rect x='96' y='34' width='8' height='20' rx='4' fill='#8888aa'/>
  <path d='M103 40 Q115 34 117 24' stroke='#9999bb' stroke-width='3' fill='none' stroke-linecap='round'/>
""",
'spooky': """
  <ellipse cx='100' cy='172' rx='56' ry='10' fill='rgba(0,0,0,0.35)'/>
  <ellipse cx='60'  cy='117' rx='20' ry='53' fill='#1a0030'/>
  <ellipse cx='140' cy='117' rx='20' ry='53' fill='#1a0030'/>
  <ellipse cx='79'  cy='111' rx='24' ry='61' fill='#2d0050'/>
  <ellipse cx='121' cy='111' rx='24' ry='61' fill='#2d0050'/>
  <ellipse cx='100' cy='108' rx='28' ry='66' fill='#5500aa'/>
  <ellipse cx='100' cy='108' rx='17' ry='62' fill='#7700cc' opacity='0.75'/>
  <ellipse cx='92'  cy='90'  rx='9'  ry='22' fill='#cc44ff' opacity='0.3'/>
  <line x1='100' y1='46' x2='100' y2='172' stroke='#1a0030' stroke-width='2'   opacity='0.5'/>
  <line x1='88'  y1='48' x2='86'  y2='171' stroke='#1a0030' stroke-width='1.5' opacity='0.35'/>
  <line x1='112' y1='48' x2='114' y2='171' stroke='#1a0030' stroke-width='1.5' opacity='0.35'/>
  <rect x='95' y='32' width='10' height='25' rx='5' fill='#2a2a4a'/>
  <path d='M104 40 Q121 32 124 20' stroke='#8866cc' stroke-width='3.5' fill='none' stroke-linecap='round'/>
""",
'mini': """
  <ellipse cx='100' cy='164' rx='40' ry='8'  fill='rgba(0,0,0,0.15)'/>
  <ellipse cx='74'  cy='124' rx='16' ry='40' fill='#c04500'/>
  <ellipse cx='126' cy='124' rx='16' ry='40' fill='#c04500'/>
  <ellipse cx='100' cy='118' rx='22' ry='48' fill='#e86000'/>
  <ellipse cx='100' cy='118' rx='14' ry='46' fill='#ff9020' opacity='0.75'/>
  <ellipse cx='94'  cy='104' rx='7'  ry='16' fill='#ffb040' opacity='0.35'/>
  <line x1='100' y1='76' x2='100' y2='162' stroke='#c04500' stroke-width='1.5' opacity='0.35'/>
  <line x1='91'  y1='78' x2='90'  y2='161' stroke='#c04500' stroke-width='1'   opacity='0.2'/>
  <line x1='109' y1='78' x2='110' y2='161' stroke='#c04500' stroke-width='1'   opacity='0.2'/>
  <rect x='96' y='60' width='8' height='20' rx='4' fill='#5d4037'/>
  <path d='M103 68 Q114 62 116 52' stroke='#7cb342' stroke-width='2.5' fill='none' stroke-linecap='round'/>
""",
'neon': """
  <ellipse cx='100' cy='172' rx='56' ry='10' fill='rgba(0,80,0,0.25)'/>
  <ellipse cx='60'  cy='117' rx='20' ry='53' fill='#003a00'/>
  <ellipse cx='140' cy='117' rx='20' ry='53' fill='#003a00'/>
  <ellipse cx='79'  cy='111' rx='24' ry='61' fill='#005500'/>
  <ellipse cx='121' cy='111' rx='24' ry='61' fill='#005500'/>
  <ellipse cx='100' cy='108' rx='28' ry='66' fill='#00aa00'/>
  <ellipse cx='100' cy='108' rx='17' ry='62' fill='#22dd22' opacity='0.75'/>
  <ellipse cx='92'  cy='90'  rx='9'  ry='22' fill='#88ff88' opacity='0.35'/>
  <line x1='100' y1='46' x2='100' y2='172' stroke='#003a00' stroke-width='2'   opacity='0.4'/>
  <line x1='88'  y1='48' x2='86'  y2='171' stroke='#003a00' stroke-width='1.5' opacity='0.25'/>
  <line x1='112' y1='48' x2='114' y2='171' stroke='#003a00' stroke-width='1.5' opacity='0.25'/>
  <rect x='95' y='32' width='10' height='25' rx='5' fill='#2e5d2e'/>
  <path d='M104 40 Q121 32 124 20' stroke='#88cc44' stroke-width='3.5' fill='none' stroke-linecap='round'/>
""",
'warty': """
  <ellipse cx='100' cy='172' rx='56' ry='10' fill='rgba(0,0,0,0.18)'/>
  <ellipse cx='60'  cy='117' rx='20' ry='53' fill='#8b3a00'/>
  <ellipse cx='140' cy='117' rx='20' ry='53' fill='#8b3a00'/>
  <ellipse cx='79'  cy='111' rx='24' ry='61' fill='#b04e00'/>
  <ellipse cx='121' cy='111' rx='24' ry='61' fill='#b04e00'/>
  <ellipse cx='100' cy='108' rx='28' ry='66' fill='#d46400'/>
  <ellipse cx='100' cy='108' rx='17' ry='62' fill='#ee8010' opacity='0.75'/>
  <circle cx='62'  cy='100' r='5' fill='#7a3200' opacity='0.8'/>
  <circle cx='64'  cy='134' r='4' fill='#7a3200' opacity='0.7'/>
  <circle cx='138' cy='108' r='5' fill='#7a3200' opacity='0.8'/>
  <circle cx='135' cy='138' r='4' fill='#7a3200' opacity='0.7'/>
  <circle cx='80'  cy='162' r='3' fill='#7a3200' opacity='0.6'/>
  <circle cx='120' cy='160' r='3' fill='#7a3200' opacity='0.6'/>
  <ellipse cx='92'  cy='90'  rx='9'  ry='22' fill='#f8a040' opacity='0.3'/>
  <line x1='100' y1='46' x2='100' y2='172' stroke='#8b3a00' stroke-width='2'   opacity='0.35'/>
  <rect x='95' y='32' width='10' height='25' rx='5' fill='#5d4037'/>
  <path d='M104 40 Q121 32 124 20' stroke='#7cb342' stroke-width='3.5' fill='none' stroke-linecap='round'/>
""",
'giant': """
  <ellipse cx='100' cy='172' rx='70' ry='11' fill='rgba(0,0,0,0.18)'/>
  <ellipse cx='44'  cy='120' rx='16' ry='45' fill='#8a3500'/>
  <ellipse cx='156' cy='120' rx='16' ry='45' fill='#8a3500'/>
  <ellipse cx='62'  cy='116' rx='20' ry='54' fill='#a84500'/>
  <ellipse cx='138' cy='116' rx='20' ry='54' fill='#a84500'/>
  <ellipse cx='80'  cy='110' rx='24' ry='62' fill='#cc5a00'/>
  <ellipse cx='120' cy='110' rx='24' ry='62' fill='#cc5a00'/>
  <ellipse cx='100' cy='106' rx='28' ry='68' fill='#f07010'/>
  <ellipse cx='100' cy='106' rx='17' ry='64' fill='#ff9030' opacity='0.75'/>
  <ellipse cx='92'  cy='86'  rx='10' ry='24' fill='#ffb850' opacity='0.3'/>
  <line x1='100' y1='42' x2='100' y2='172' stroke='#8a3500' stroke-width='2'   opacity='0.35'/>
  <line x1='88'  y1='44' x2='86'  y2='172' stroke='#8a3500' stroke-width='1.5' opacity='0.2'/>
  <line x1='112' y1='44' x2='114' y2='172' stroke='#8a3500' stroke-width='1.5' opacity='0.2'/>
  <line x1='74'  y1='48' x2='70'  y2='168' stroke='#8a3500' stroke-width='1.5' opacity='0.15'/>
  <line x1='126' y1='48' x2='130' y2='168' stroke='#8a3500' stroke-width='1.5' opacity='0.15'/>
  <rect x='95' y='28' width='10' height='26' rx='5' fill='#5d4037'/>
  <path d='M104 36 Q122 28 125 16' stroke='#7cb342' stroke-width='4' fill='none' stroke-linecap='round'/>
""",
}

# ── FACE PARTS ──────────────────────────────────────────────────────────────────
# Rendered at 200×200. Eye zone: left~(60-96,76-104) right~(104-140,76-104)
# Nose zone: center~(90-110,106-128). Mouth zone: center~(68-132,128-162)

# EYES
E_TRI  = "<polygon points='65,78 91,78 78,97' fill='#1a0800'/><polygon points='109,78 135,78 122,97' fill='#1a0800'/>"
E_ROUND = "<circle cx='78' cy='90' r='12' fill='#1a0800'/><circle cx='122' cy='90' r='12' fill='#1a0800'/><circle cx='74' cy='86' r='4' fill='white' opacity='0.5'/><circle cx='118' cy='86' r='4' fill='white' opacity='0.5'/>"
E_DIA  = "<polygon points='78,77 93,90 78,103 63,90' fill='#1a0800'/><polygon points='122,77 137,90 122,103 107,90' fill='#1a0800'/>"
E_STAR = "<path d='M78,76 L81,86 L92,83 L84,91 L88,102 L78,96 L68,102 L72,91 L64,83 L75,86 Z' fill='#FFD700'/><path d='M122,76 L125,86 L136,83 L128,91 L132,102 L122,96 L112,102 L116,91 L108,83 L119,86 Z' fill='#FFD700'/>"
E_XEYE = "<line x1='66' y1='80' x2='90' y2='100' stroke='#1a0800' stroke-width='6' stroke-linecap='round'/><line x1='90' y1='80' x2='66' y2='100' stroke='#1a0800' stroke-width='6' stroke-linecap='round'/><line x1='110' y1='80' x2='134' y2='100' stroke='#1a0800' stroke-width='6' stroke-linecap='round'/><line x1='134' y1='80' x2='110' y2='100' stroke='#1a0800' stroke-width='6' stroke-linecap='round'/>"
E_HEART = "<path d='M78,96 C78,88 65,81 65,91 C65,101 78,109 78,109 C78,109 91,101 91,91 C91,81 78,88 78,96 Z' fill='#FF69B4'/><path d='M122,96 C122,88 109,81 109,91 C109,101 122,109 122,109 C122,109 135,101 135,91 C135,81 122,88 122,96 Z' fill='#FF69B4'/>"
E_ALIEN = "<ellipse cx='78' cy='90' rx='18' ry='13' fill='#00cc55'/><ellipse cx='78' cy='88' rx='7' ry='5' fill='#001a00'/><circle cx='80' cy='87' r='2' fill='white' opacity='0.6'/><ellipse cx='122' cy='90' rx='18' ry='13' fill='#00cc55'/><ellipse cx='122' cy='88' rx='7' ry='5' fill='#001a00'/><circle cx='124' cy='87' r='2' fill='white' opacity='0.6'/>"
E_ANGRY = "<path d='M64,84 L92,92' stroke='#1a0800' stroke-width='7' stroke-linecap='round'/><path d='M64,92 L92,84' stroke='#1a0800' stroke-width='4' stroke-linecap='round' opacity='0.4'/><path d='M108,84 L136,92' stroke='#1a0800' stroke-width='7' stroke-linecap='round'/><path d='M108,92 L136,84' stroke='#1a0800' stroke-width='4' stroke-linecap='round' opacity='0.4'/>"
E_MOON = "<path d='M67,78 A14,14 0 1,1 67,102 A10,10 0 1,0 67,78 Z' fill='#FFD700'/><path d='M111,78 A14,14 0 1,1 111,102 A10,10 0 1,0 111,78 Z' fill='#FFD700'/>"
E_DOT  = "<circle cx='78' cy='90' r='10' fill='#1a0800'/><circle cx='122' cy='90' r='10' fill='#1a0800'/><circle cx='75' cy='87' r='3' fill='white' opacity='0.55'/><circle cx='119' cy='87' r='3' fill='white' opacity='0.55'/>"
E_BOLT = "<polygon points='72,76 79,90 74,90 81,104 67,90 73,90' fill='#FFD700'/><polygon points='116,76 123,90 118,90 125,104 111,90 117,90' fill='#FFD700'/>"

# NOSES
N_TRI  = "<polygon points='96,106 104,106 100,120' fill='#1a0800'/>"
N_DOT  = "<circle cx='100' cy='113' r='8' fill='#1a0800'/>"
N_DIA  = "<polygon points='100,105 108,113 100,121 92,113' fill='#1a0800'/>"
N_HEART = "<path d='M100,120 C100,113 91,107 91,114 C91,121 100,128 100,128 C100,128 109,121 109,114 C109,107 100,113 100,120 Z' fill='#FF69B4'/>"
N_STAR = "<path d='M100,105 L102.5,112 L110,112 L104,117 L106,124 L100,120 L94,124 L96,117 L90,112 L97.5,112 Z' fill='#FFD700'/>"

# MOUTHS
M_SMILE = "<path d='M74,134 Q100,156 126,134' stroke='#1a0800' stroke-width='5' fill='none' stroke-linecap='round'/>"
M_GRIN  = "<path d='M70,130 Q100,160 130,130 L127,130 Q100,152 73,130 Z' fill='#1a0800'/><rect x='84' y='130' width='7' height='9' fill='white' rx='1'/><rect x='96' y='130' width='8' height='9' fill='white' rx='1'/><rect x='109' y='130' width='7' height='9' fill='white' rx='1'/>"
M_JAGGED = "<path d='M70,128 L80,142 L90,128 L100,142 L110,128 L120,142 L130,128 L130,142 L70,142 Z' fill='#1a0800'/>"
M_FROWN = "<path d='M74,150 Q100,130 126,150' stroke='#1a0800' stroke-width='5' fill='none' stroke-linecap='round'/>"
M_OMOUTH = "<ellipse cx='100' cy='142' rx='17' ry='13' fill='#1a0800'/>"
M_ZIG   = "<polyline points='70,138 80,128 90,138 100,128 110,138 120,128 130,138' stroke='#1a0800' stroke-width='5' fill='none' stroke-linecap='round' stroke-linejoin='round'/>"
M_WIDE  = "<path d='M66,130 Q100,162 134,130' stroke='#1a0800' stroke-width='6' fill='none' stroke-linecap='round'/>"
M_BUCK  = "<path d='M76,130 Q100,150 124,130 L122,130 Q100,144 78,130 Z' fill='#1a0800'/><rect x='90' y='130' width='9' height='13' fill='white' rx='2'/><rect x='101' y='130' width='9' height='13' fill='white' rx='2'/>"
M_HEART_MOUTH = "<path d='M100,150 C100,141 87,133 87,142 C87,151 100,160 100,160 C100,160 113,151 113,142 C113,133 100,141 100,150 Z' fill='#FF69B4'/>"
M_SMIRKBIG = "<path d='M78,136 Q100,154 126,132' stroke='#1a0800' stroke-width='5' fill='none' stroke-linecap='round'/><path d='M118,132 Q130,134 128,142' stroke='#1a0800' stroke-width='3' fill='none' stroke-linecap='round'/>"

# ── THEMES ──────────────────────────────────────────────────────────────────────
# Each theme: id, label, emoji, bg, accent, [(eye_id,label,svg), ...], [noses], [mouths]
THEMES = [
  ('scary','Scary','😱','#1a0800','#ff4400',
    [('tri','Triangle',E_TRI),('dia','Diamond',E_DIA),('dot','Classic',E_DOT)],
    [('tri','Triangle',N_TRI),('dia','Diamond',N_DIA)],
    [('jag','Jagged',M_JAGGED),('zig','Zigzag',M_ZIG),('grin','Buck Teeth',M_BUCK)],
  ),
  ('princess','Princess','👸','#fff0f8','#ff69b4',
    [('heart','Hearts',E_HEART),('star','Stars',E_STAR),('round','Round',E_ROUND)],
    [('heart','Heart',N_HEART),('star','Star',N_STAR)],
    [('hm','Heart',M_HEART_MOUTH),('smile','Sweet Smile',M_SMILE),('wide','Big Smile',M_WIDE)],
  ),
  ('space','Space','🚀','#000820','#4488ff',
    [('alien','Alien',E_ALIEN),('moon','Moon',E_MOON),('star','Stars',E_STAR)],
    [('star','Star',N_STAR),('dot','Dot',N_DOT)],
    [('o','Surprised',M_OMOUTH),('smile','Cool Smile',M_SMILE),('zig','Zigzag',M_ZIG)],
  ),
  ('silly','Silly','🤪','#fffde0','#ffcc00',
    [('x','X Eyes',E_XEYE),('dot','Dots',E_DOT),('star','Stars',E_STAR)],
    [('dot','Big Dot',N_DOT),('heart','Heart',N_HEART)],
    [('o','O Face',M_OMOUTH),('zig','Zigzag',M_ZIG),('buck','Buck Teeth',M_BUCK)],
  ),
  ('monster','Monster','🧟','#0a1a0a','#22aa44',
    [('angry','Angry',E_ANGRY),('tri','Triangle',E_TRI),('dia','Diamond',E_DIA)],
    [('tri','Triangle',N_TRI),('dia','Diamond',N_DIA)],
    [('jag','Jagged',M_JAGGED),('grin','Big Grin',M_GRIN),('wide','Wide',M_WIDE)],
  ),
  ('rainbow','Rainbow','🌈','#fff8f0','#ff8800',
    [('round','Round',E_ROUND),('dot','Dots',E_DOT),('heart','Hearts',E_HEART)],
    [('dot','Round',N_DOT),('star','Star',N_STAR)],
    [('smile','Happy Smile',M_SMILE),('wide','Big Smile',M_WIDE),('grin','Toothy Grin',M_GRIN)],
  ),
  ('unicorn','Unicorn','🦄','#f8f0ff','#cc44ff',
    [('heart','Hearts',E_HEART),('star','Stars',E_STAR),('moon','Moons',E_MOON)],
    [('heart','Heart',N_HEART),('star','Star',N_STAR)],
    [('hm','Heart Mouth',M_HEART_MOUTH),('smile','Cute Smile',M_SMILE),('wide','Big Smile',M_WIDE)],
  ),
  ('hero','Hero','🦸','#1a0a00','#ff2200',
    [('angry','Determined',E_ANGRY),('bolt','Lightning',E_BOLT),('round','Focused',E_ROUND)],
    [('dia','Diamond',N_DIA),('tri','Triangle',N_TRI)],
    [('grin','Hero Grin',M_GRIN),('smirk','Smirk',M_SMIRKBIG),('wide','Strong Jaw',M_WIDE)],
  ),
  ('harvest','Harvest','🍂','#fff4e0','#cc7700',
    [('round','Friendly',E_ROUND),('tri','Classic',E_TRI),('moon','Moons',E_MOON)],
    [('dot','Round',N_DOT),('tri','Triangle',N_TRI)],
    [('smile','Happy Smile',M_SMILE),('wide','Big Grin',M_WIDE),('jag','Carved',M_JAGGED)],
  ),
  ('ocean','Ocean','🌊','#f0f8ff','#0088cc',
    [('alien','Wave Eyes',E_ALIEN),('round','Bubble Eyes',E_ROUND),('moon','Crescent',E_MOON)],
    [('dot','Bubble Nose',N_DOT),('heart','Heart',N_HEART)],
    [('smile','Gentle Smile',M_SMILE),('o','Bubble O',M_OMOUTH),('wide','Splash Grin',M_WIDE)],
  ),
]

PUMPS_LIST = [
  ('classic','Classic','🎃'),
  ('tall','Tall','🏔️'),
  ('chubby','Chubby','🫃'),
  ('lumpy','Lumpy','🤭'),
  ('ghost','Ghost','👻'),
  ('spooky','Spooky','🔮'),
  ('mini','Mini','🍊'),
  ('neon','Neon','💚'),
  ('warty','Warty','🐸'),
  ('giant','Giant','🫙'),
]

# ── BUILD TSX COMPONENT ─────────────────────────────────────────────────────────
def build_tsx():
    lines = []
    # Pumpkin data
    lines.append('function PumpkinStudio({ accentColor }: { accentColor: string }) {')
    lines.append('  const hf = "var(--font-concert-one),\'Concert One\',cursive";')
    lines.append('  const bf = "var(--font-catamaran),\'Catamaran\',sans-serif";')
    lines.append('')
    # PUMPKINS array
    lines.append('  interface PumpkinDef { id:string; label:string; emoji:string; body:string }')
    lines.append('  const PUMPKINS: PumpkinDef[] = [')
    for pid, plabel, pemoji in PUMPS_LIST:
        body = PUMP_BODIES[pid].replace('\\', '\\\\').replace('`', '\\`')
        lines.append(f'    {{id:"{pid}", label:"{plabel}", emoji:"{pemoji}", body:`{body}`}},')
    lines.append('  ];')
    lines.append('')
    # THEMES array
    lines.append('  interface FacePart {{ id:string; label:string; svg:string }}')
    lines.append('  interface FacePart { id:string; label:string; svg:string }')
    lines.append('  interface ThemeDef { id:string; label:string; emoji:string; bg:string; accent:string; eyes:FacePart[]; noses:FacePart[]; mouths:FacePart[] }')
    lines.append('  const THEMES: ThemeDef[] = [')
    for tid, tlabel, temoji, tbg, taccent, eyes, noses, mouths in THEMES:
        def fparts(parts):
            items = []
            for pid2, plabel2, psvg2 in parts:
                svg_esc = psvg2.replace('\\', '\\\\').replace('`', '\\`')
                items.append(f'{{id:"{pid2}",label:"{plabel2}",svg:`{svg_esc}`}}')
            return '[' + ','.join(items) + ']'
        lines.append(f'    {{id:"{tid}",label:"{tlabel}",emoji:"{temoji}",bg:"{tbg}",accent:"{taccent}",eyes:{fparts(eyes)},noses:{fparts(noses)},mouths:{fparts(mouths)}}},')
    lines.append('  ];')
    lines.append('')
    # State and logic
    lines.append('''  const [pumpkinIdx, setPumpkinIdx] = useState(0);
  const [themeIdx,   setThemeIdx]   = useState(0);
  const [faceTab,    setFaceTab]    = useState<\'eyes\'|\'nose\'|\'mouth\'>(\'eyes\');
  const [selEye,     setSelEye]     = useState<string|null>(null);
  const [selNose,    setSelNose]    = useState<string|null>(null);
  const [selMouth,   setSelMouth]   = useState<string|null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => { setSelEye(null); setSelNose(null); setSelMouth(null); }, [themeIdx]);

  const pump  = PUMPKINS[pumpkinIdx];
  const theme = THEMES[themeIdx];
  const ac    = accentColor;

  const faceHtml = [
    selEye   ? (theme.eyes.find(e => e.id === selEye)?.svg   ?? \'\') : \'\',
    selNose  ? (theme.noses.find(e => e.id === selNose)?.svg  ?? \'\') : \'\',
    selMouth ? (theme.mouths.find(e => e.id === selMouth)?.svg ?? \'\') : \'\',
  ].join(\'\');

  const tabParts = faceTab === \'eyes\' ? theme.eyes : faceTab === \'nose\' ? theme.noses : theme.mouths;
  const tabSel   = faceTab === \'eyes\' ? selEye : faceTab === \'nose\' ? selNose : selMouth;
  const tabSet   = faceTab === \'eyes\' ? setSelEye : faceTab === \'nose\' ? setSelNose : setSelMouth;

  const renderCanvas = (size: number) => (
    <div style={{position:\'relative\', width:size, height:size*1.05, flexShrink:0}}>
      <svg viewBox=\'0 0 200 200\' width={size} height={size} style={{display:\'block\',overflow:\'visible\'}}>
        <g dangerouslySetInnerHTML={{__html: pump.body}}/>
        {faceHtml && <g dangerouslySetInnerHTML={{__html: faceHtml}}/>}
      </svg>
    </div>
  );

  const inner = (
    <div style={{display:\'flex\',flexDirection:\'column\',gap:16}}>

      {/* Title */}
      <div style={{textAlign:\'center\',fontFamily:hf,fontSize:\'clamp(15px,2.3vw,18px)\',color:ac}}>
        🎃 Pumpkin Studio — Build Your Face!
      </div>

      {/* Pumpkin type picker */}
      <div>
        <p style={{fontFamily:hf,fontSize:12,color:\'#888\',margin:\'0 0 6px 0\',textAlign:\'center\'}}>Choose Your Pumpkin</p>
        <div style={{display:\'flex\',gap:6,overflowX:\'auto\',paddingBottom:4}}>
          {PUMPKINS.map((p,i) => (
            <button key={p.id} onClick={() => setPumpkinIdx(i)}
              style={{flexShrink:0,padding:\'6px 10px\',borderRadius:12,border:`2px solid ${i===pumpkinIdx?ac:\'#ddd\'}`,
                background:i===pumpkinIdx?`${ac}18`:\'#fff\',fontFamily:bf,fontSize:11,fontWeight:700,
                color:i===pumpkinIdx?ac:\'#555\',cursor:\'pointer\',whiteSpace:\'nowrap\'}}>
              {p.emoji} {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main area: pumpkin + face picker side by side */}
      <div style={{display:\'flex\',gap:16,alignItems:\'flex-start\',flexWrap:\'wrap\'}}>

        {/* Pumpkin canvas */}
        <div style={{display:\'flex\',flexDirection:\'column\',alignItems:\'center\',gap:8,flex:\'0 0 auto\'}}>
          {renderCanvas(200)}
          <button onClick={() => setFullscreen(true)}
            style={{padding:\'6px 16px\',borderRadius:20,border:`1px solid ${ac}`,background:\'#fff\',
              color:ac,fontFamily:bf,fontSize:12,fontWeight:700,cursor:\'pointer\'}}>
            ⛶ Expand
          </button>
        </div>

        {/* Face builder panel */}
        <div style={{flex:1,minWidth:200,display:\'flex\',flexDirection:\'column\',gap:10}}>

          {/* Theme picker */}
          <div>
            <p style={{fontFamily:hf,fontSize:12,color:\'#888\',margin:\'0 0 6px 0\'}}>Choose Theme</p>
            <div style={{display:\'flex\',gap:5,flexWrap:\'wrap\'}}>
              {THEMES.map((t,i) => (
                <button key={t.id} onClick={() => setThemeIdx(i)}
                  style={{padding:\'5px 10px\',borderRadius:20,border:`2px solid ${i===themeIdx?t.accent:\'#ddd\'}`,
                    background:i===themeIdx?t.bg:\'#fff\',fontFamily:bf,fontSize:11,fontWeight:700,
                    color:i===themeIdx?t.accent:\'#555\',cursor:\'pointer\'}}>
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Face part tabs */}
          <div style={{background:theme.bg,borderRadius:16,padding:12,border:`2px solid ${theme.accent}44`}}>
            <div style={{display:\'flex\',gap:6,marginBottom:10}}>
              {([\'eyes\',\'nose\',\'mouth\'] as const).map(tab => (
                <button key={tab} onClick={() => setFaceTab(tab)}
                  style={{flex:1,padding:\'7px 4px\',borderRadius:10,border:`2px solid ${faceTab===tab?theme.accent:\'#ddd\'}`,
                    background:faceTab===tab?theme.accent:\'#fff\',color:faceTab===tab?\'#fff\':\'#666\',
                    fontFamily:hf,fontSize:12,fontWeight:700,cursor:\'pointer\',textTransform:\'capitalize\',
                    transition:\'all 0.15s\'}}>
                  {tab==='eyes\'?\'👁 Eyes\':tab===\'nose\'?\'👃 Nose\':\'👄 Mouth\'}
                </button>
              ))}
            </div>

            {/* Face part thumbnails */}
            <div style={{display:\'flex\',gap:8,flexWrap:\'wrap\'}}>
              {tabParts.map(part => {
                const isSel = tabSel === part.id;
                return (
                  <button key={part.id} onClick={() => tabSet(isSel ? null : part.id)}
                    style={{display:\'flex\',flexDirection:\'column\',alignItems:\'center\',gap:4,
                      padding:\'8px 6px\',borderRadius:12,border:`2px solid ${isSel?theme.accent:\'#ddd\'}`,
                      background:isSel?`${theme.accent}22`:\'#fff\',cursor:\'pointer\',
                      boxShadow:isSel?`0 2px 8px ${theme.accent}55`:\'none\',transition:\'all 0.15s\'}}>
                    <svg viewBox=\'0 0 200 200\' width={56} height={56} style={{display:\'block\'}}>
                      <rect width=\'200\' height=\'200\' fill=\'#ff8c0022\' rx=\'20\'/>
                      <g dangerouslySetInnerHTML={{__html: part.svg}}/>
                    </svg>
                    <span style={{fontFamily:bf,fontSize:10,color:isSel?theme.accent:\'#666\',fontWeight:700}}>
                      {part.label}
                    </span>
                  </button>
                );
              })}
              <button onClick={() => tabSet(null)}
                style={{display:\'flex\',flexDirection:\'column\',alignItems:\'center\',gap:4,
                  padding:\'8px 6px\',borderRadius:12,border:\'2px dashed #ccc\',
                  background:tabSel===null?\'#f0f0f0\':\'#fff\',cursor:\'pointer\'}}>
                <div style={{width:56,height:56,display:\'flex\',alignItems:\'center\',justifyContent:\'center\',fontSize:24}}>✕</div>
                <span style={{fontFamily:bf,fontSize:10,color:\'#888\',fontWeight:700}}>None</span>
              </button>
            </div>
          </div>

          {/* Reset button */}
          <button onClick={() => { setSelEye(null); setSelNose(null); setSelMouth(null); }}
            style={{alignSelf:\'flex-start\',padding:\'8px 18px\',borderRadius:20,border:\'2px solid #ddd\',
              background:\'#fff\',color:\'#888\',fontFamily:bf,fontSize:12,fontWeight:700,cursor:\'pointer\'}}>
            🔄 Clear Face
          </button>
        </div>
      </div>
    </div>
  );

  if (fullscreen) return (
    <div style={{position:\'fixed\',inset:0,background:\'rgba(0,0,0,0.9)\',zIndex:9999,
      display:\'flex\',flexDirection:\'column\',alignItems:\'center\',justifyContent:\'center\',gap:16,padding:20}}>
      {renderCanvas(Math.min(window.innerWidth - 40, 400))}
      <button onClick={() => setFullscreen(false)}
        style={{padding:\'12px 32px\',borderRadius:30,background:ac,color:\'#fff\',border:\'none\',
          fontSize:16,fontWeight:700,fontFamily:hf,cursor:\'pointer\'}}>
        ✕ Close
      </button>
    </div>
  );

  return inner;
}

''')
    return '\n'.join(lines)

new_func = build_tsx()
new_content = content[:start] + new_func + content[end:]
with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f'Done. New length: {len(new_content)} chars. Replaced {end-start} chars with {len(new_func)}.')
