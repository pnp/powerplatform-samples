"""Generate original Moonfield Archive sample data and SVG artwork (stdlib only)."""
from pathlib import Path
import json, math
ROOT=Path(__file__).resolve().parents[1]
CARDS=[
('Lantern Fox','Common','Emberwood','A quiet guide whose tail keeps the last light of dusk.', 'fox', '#E6A86B'),
('Moss Courier','Common','Emberwood','Carries tiny letters between the roots of ancient trees.', 'moth','#8DC99A'),
('Rainbell Finch','Common','Tideglass','Its song rings only when the first raindrop falls.', 'bird','#87CBD5'),
('Pebble Dreamer','Common','Tideglass','Sleeps beneath the river and remembers every passing star.', 'orb','#A6BBD6'),
('Cinder Moth','Uncommon','Emberwood','Follows the warmth of stories told around a winter fire.', 'moth','#F2B078'),
('Cloud Orchard','Uncommon','Skyreach','A floating grove where silver fruit ripens in moonlight.', 'tree','#BAC7E8'),
('Coral Compass','Uncommon','Tideglass','Always points toward a place you have never imagined.', 'star','#EFADAB'),
('Velvet Comet','Rare','Skyreach','Crosses the sky so softly that even the owls keep sleeping.', 'comet','#BDACEA'),
('Aurora Stag','Rare','Emberwood','Its antlers gather ribbons of color from the northern sky.', 'stag','#90D5C8'),
('Tidekeeper','Rare','Tideglass','Counts the waves so that no shore is ever forgotten.', 'orb','#89BEEB'),
('Sunseed Phoenix','Legendary','Skyreach','Plants a new dawn wherever its golden feathers land.', 'bird','#F3CD79'),
('The Last Observatory','Legendary','Skyreach','A little tower watching over every unfinished wish.', 'tower','#EBD995')]

def artwork(shape, color, index):
    motifs={
      'fox':'<path d="M85 180 L90 93 L142 124 L195 87 L199 180 L147 224 Z"/><path d="M90 170 L125 184 L147 224 L108 199 Z M199 169 L167 184 L147 224 L184 200 Z" fill="#f6ead8"/><path d="M118 161 L129 165 M167 165 L178 160" stroke="#172631" stroke-width="5"/>',
      'moth':'<path d="M148 161 Q60 68 65 159 Q64 219 143 185 Q68 245 108 249 L150 199 L192 249 Q232 245 156 185 Q233 219 235 159 Q240 68 152 161Z"/><path d="M150 143 V208 M150 151 L137 134 M150 151 L163 134" stroke="#f6ead8" stroke-width="5"/>',
      'bird':'<path d="M146 174 Q119 75 64 112 L128 194 Q131 226 181 218 L223 239 L198 198 L221 184 L185 180 Q184 147 163 152Z"/><path d="M124 179 L77 176 L139 215" fill="#f6ead8"/>',
      'orb':'<circle cx="150" cy="170" r="57"/><ellipse cx="150" cy="170" rx="95" ry="23" transform="rotate(-25 150 170)" fill="none" stroke="#f6ead8" stroke-width="4"/><circle cx="135" cy="153" r="14" fill="#f6ead8" opacity=".65"/>',
      'tree':'<path d="M148 226 V154 M150 194 L113 166 M150 182 L185 148" fill="none" stroke="#f6ead8" stroke-width="7"/><circle cx="114" cy="148" r="30"/><circle cx="176" cy="131" r="39"/><circle cx="139" cy="111" r="33"/><path d="M90 233 Q150 270 209 233Z"/>',
      'star':'<path d="M150 93 L164 151 L217 170 L164 188 L150 247 L134 188 L83 170 L134 151Z"/><circle cx="150" cy="170" r="74" fill="none" stroke="#f6ead8" stroke-width="2"/><circle cx="150" cy="170" r="15" fill="#f6ead8"/>',
      'comet':'<path d="M99 218 L226 84 L181 196Z" opacity=".4"/><path d="M91 204 L207 109 L156 218Z"/><circle cx="117" cy="202" r="34" fill="#f6ead8"/>',
      'stag':'<path d="M117 157 L148 180 L185 151 L177 209 L151 237 L126 209Z"/><path d="M132 168 L112 124 L93 108 M111 128 L118 94 M108 121 L85 131 M169 168 L190 124 L210 108 M191 126 L184 94 M196 121 L217 131" fill="none" stroke="#f6ead8" stroke-width="5"/>',
      'tower':'<path d="M106 231 H194 L184 144 H115Z"/><path d="M99 145 Q150 61 201 145Z" fill="#f6ead8"/><path d="M142 183 H162 V232 H142Z" fill="#172631"/><path d="M181 101 L216 79" stroke="#f6ead8" stroke-width="8"/>'}
    stars=''.join(f'<circle cx="{25+(i*47+index*19)%250}" cy="{35+(i*71+index*13)%252}" r="{1+i%2}" fill="#f6ead8" opacity=".45"/>' for i in range(16))
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="300" height="320" viewBox="0 0 300 320"><rect width="300" height="320" fill="#172631"/><circle cx="150" cy="166" r="112" fill="{color}" opacity=".08"/><circle cx="150" cy="166" r="99" fill="none" stroke="{color}" opacity=".25"/>{stars}<g fill="{color}">{motifs[shape]}</g><path d="M30 280 Q150 255 270 280" fill="none" stroke="{color}" opacity=".4"/></svg>'

cards=[]
for i,(name,rarity,realm,lore,shape,color) in enumerate(CARDS,1):
    id=f'MF-{i:03}'
    svg=artwork(shape,color,i)
    (ROOT/'assets/cards'/f'{id}.svg').write_text(svg)
    cards.append(dict(Id=id,Number=i,Name=name,Rarity=rarity,Realm=realm,Lore=lore,Accent=color,Art=svg))
(ROOT/'sourcecode/cards.json').write_text(json.dumps(cards,indent=2)+'\n')
print(f'Generated {len(cards)} original cards and SVG assets.')
