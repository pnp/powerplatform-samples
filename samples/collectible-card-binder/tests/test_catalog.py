"""Local reference/data checks. These do not execute Power Fx or test import."""
import collections,json,unittest,xml.etree.ElementTree as ET
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
CARDS=json.loads((ROOT/'sourcecode/cards.json').read_text(encoding='utf-8'))
def filter_cards(owned,mode='All',rarity='All rarities',query=''):
 return [c for c in CARDS if (mode=='All' or (c['Id'] in owned)==(mode=='Owned')) and (rarity=='All rarities' or c['Rarity']==rarity) and query.strip().lower() in (c['Name']+' '+c['Realm']).lower()]
class CatalogTests(unittest.TestCase):
 def test_twelve_unique_stable_ids(self):
  self.assertEqual([c['Id'] for c in CARDS],[f'MF-{n:03}' for n in range(1,13)])
 def test_rarity_distribution(self):
  self.assertEqual(collections.Counter(c['Rarity'] for c in CARDS),{'Common':4,'Uncommon':3,'Rare':3,'Legendary':2})
 def test_original_assets_valid_and_embedded(self):
  for c in CARDS:
   asset=(ROOT/'assets/cards'/f"{c['Id']}.svg").read_text(encoding='utf-8')
   self.assertEqual(asset,c['Art']); self.assertEqual(ET.fromstring(asset).tag,'{http://www.w3.org/2000/svg}svg')
   self.assertNotIn('<script',asset); self.assertNotIn('href=',asset)
 def test_empty_collection(self):
  self.assertEqual(len(filter_cards(set(),'Owned')),0);self.assertEqual(len(filter_cards(set(),'Missing')),12)
 def test_full_collection(self):
  owned={c['Id'] for c in CARDS}
  self.assertEqual(len(filter_cards(owned,'Owned')),12);self.assertEqual(len(filter_cards(owned,'Missing')),0)
 def test_combined_filter(self):
  self.assertEqual([c['Id'] for c in filter_cards({'MF-009'},'Owned','Rare',' EMBERWOOD ')],['MF-009'])
 def test_no_match(self):self.assertEqual(filter_cards(set(),query='not-a-card'),[])
 def test_toggle_and_reset_reference(self):
  owned=set();owned.add('MF-001');self.assertEqual(len(owned)/12,1/12)
  owned.discard('MF-001');self.assertEqual(owned,set())
  owned.update(c['Id'] for c in CARDS);owned.clear();self.assertEqual(owned,set())
 def test_owned_ids_well_under_storage_limit(self):
  self.assertLess(len(json.dumps([{'Id':c['Id']} for c in CARDS]).encode()),1024)
 def test_catalogue_matches_embedded_powerfx(self):
  source=(ROOT/'sourcecode/studio/Src/App.pa.yaml').read_text(encoding='utf-8')
  def fx(value):return '"'+value.replace('"','""')+'"'
  for card in CARDS:
   fields=[key+': '+(str(card[key]) if key=='Number' else fx(card[key])) for key in ['Id','Number','Name','Rarity','Realm','Lore','Accent','Art']]
   self.assertIn('{'+', '.join(fields)+'}',source,card['Id'])
  self.assertEqual(source.count('{Id: "MF-'),12)
 def test_source_has_error_handling_and_no_connectors(self):
  src=(ROOT/'sourcecode/studio/Src/App.pa.yaml').read_text(encoding='utf-8')
  self.assertIn('IfError(LoadData',src)
  self.assertNotIn('Launch(',src)
if __name__=='__main__':unittest.main(verbosity=2)
