"""Deterministic reference tests; real Power Fx fixture results are documented separately."""
import json,unittest
from pathlib import Path
CARDS=json.loads((Path(__file__).resolve().parents[1]/'sourcecode/cards.json').read_text())
def rarity(roll):
 if not 0<=roll<1:raise ValueError('roll outside [0,1)')
 return 'Common' if roll<.60 else 'Uncommon' if roll<.85 else 'Rare' if roll<.97 else 'Legendary'
def draw(roll,index):
 choices=[c for c in CARDS if c['Rarity']==rarity(roll)]
 if not 1<=index<=len(choices):raise ValueError('index outside pool')
 return choices[index-1]['Id']
def award(ids,owned):
 seen=set(owned);flags=[]
 for id in ids:flags.append(id not in seen);seen.add(id)
 return seen,flags
class PackTests(unittest.TestCase):
 def test_all_threshold_boundaries(self):
  for roll,expected in [(0,'Common'),(.599999,'Common'),(.60,'Uncommon'),(.849999,'Uncommon'),(.85,'Rare'),(.969999,'Rare'),(.97,'Legendary'),(.999999,'Legendary')]:self.assertEqual(rarity(roll),expected)
 def test_invalid_rolls(self):
  for r in [-.1,1]:
   with self.assertRaises(ValueError):rarity(r)
 def test_every_uniform_pool_index_is_reachable(self):
  for r,n in [(0,4),(.6,3),(.85,3),(.97,2)]:self.assertEqual(len({draw(r,i) for i in range(1,n+1)}),n)
 def test_probabilities_sum_to_one(self):
  self.assertAlmostEqual(4*.60/4+3*.25/3+3*.12/3+2*.03/2,1)
 def test_within_pack_duplicate(self):self.assertEqual(award(['MF-001','MF-001','MF-002'],set()),({'MF-001','MF-002'},[True,False,True]))
 def test_previously_owned_duplicate(self):self.assertEqual(award(['MF-001','MF-002','MF-001'],{'MF-001'}),({'MF-001','MF-002'},[False,True,False]))
 def test_repeated_award_is_idempotent(self):
  first,_=award(['MF-001','MF-001','MF-002'],set());again,flags=award(['MF-001','MF-001','MF-002'],first);self.assertEqual(first,again);self.assertEqual(flags,[False]*3)
 def test_interrupted_reveal_does_not_change_awards(self):
  owned,_=award(['MF-001','MF-002','MF-003'],set());saved=json.dumps([{'Id':i} for i in sorted(owned)]);reloaded={r['Id'] for r in json.loads(saved)};self.assertEqual(reloaded,owned)
 def test_source_guard_and_single_save(self):
  src=Path(__file__).resolve().parents[1]/'sourcecode/studio/Src/PackScreen.pa.yaml'
  if not src.exists():self.skipTest('Final Studio source not yet exported')
  text=src.read_text();self.assertIn('CountIf(colPack, !Revealed)',text);self.assertIn('Distinct(colPack, Card.Id)',text);self.assertIn('Slot < draw.Slot',text)

class ProductionSourceTests(unittest.TestCase):
 def test_production_rng_and_award_location(self):
  root=Path(__file__).resolve().parents[1]/'sourcecode/studio/Src'
  text=(root/'PackScreen.pa.yaml').read_text()
  opening=text.split('      - GeneratePack:')[1].split('      - PackSummary:')[0]
  self.assertEqual(opening.count('Rand()'),1)
  self.assertEqual(opening.count('RandBetween(1, CountRows(choices))'),1)
  self.assertEqual(opening.count('SaveData('),1)
  self.assertEqual(opening.count('Collect(colOwned,'),1)
  for fixture in ['Switch(slot.Value', '0.599999', '0.999999']:
   self.assertNotIn(fixture,text)
  reveal=text.split('            - RevealCard:')[1].split('      - PackRules:')[0]
  self.assertIn('Patch(colPack, ThisItem, {Revealed: true})',reveal)
  self.assertNotIn('colOwned',reveal)
  for screen in ['BinderScreen.pa.yaml','DetailScreen.pa.yaml']:
   source=(root/screen).read_text()
   self.assertNotIn('Collect(colOwned',source)
   self.assertNotIn('RemoveIf(colOwned',source)
 def test_storage_key_compatibility(self):
  root=Path(__file__).resolve().parents[1]/'sourcecode/studio/Src'
  self.assertIn('LoadData(colOwned, "MoonfieldOwnedV1"', (root/'App.pa.yaml').read_text())
  self.assertIn('SaveData(colOwned, "MoonfieldOwnedV1"', (root/'PackScreen.pa.yaml').read_text())

if __name__=='__main__':unittest.main(verbosity=2)
