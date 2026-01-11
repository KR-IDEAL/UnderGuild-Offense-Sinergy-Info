const database = {
    basic: [
        { id: "Knight", name: { ko: "기사", en: "Knight" }, image: "Knight.png", synergies: ["Valor"] },
        { id: "Goblin", name: { ko: "고블린", en: "Goblin" }, image: "Goblin.png", synergies: ["Vampire", "Willpower"] },
        { id: "Archer", name: { ko: "궁수", en: "Archer" }, image: "Archer.png", synergies: ["ClockHand", "Reinforcements"] },
        { id: "Slime", name: { ko: "슬라임", en: "Slime" }, image: "Slime.png", synergies: ["LifeLink"] },
        { id: "FireSpirit", name: { ko: "불정령", en: "Fire Spirit" }, image: "Fire Spirit.png", synergies: ["VitalPotion", "Vampire"] },
        { id: "Orc", name: { ko: "오크", en: "Orc" }, image: "Orc.png", synergies: ["AbundantOrcBarrel"] },
        { id: "SpearKnight", name: { ko: "창기사", en: "Spear Knight" }, image: "Spear Knight.png", synergies: ["GiantFootprint"] },
        { id: "SkeletonSoldier", name: { ko: "해골 병사", en: "Skeleton Soldier" }, image: "Skeleton Soldier.png", synergies: ["Medic"] },
        { id: "IceSpirit", name: { ko: "얼음 정령", en: "Ice Spirit" }, image: "Ice Spirit.png", synergies: ["LifeLink"] },
        { id: "Ghost", name: { ko: "유령", en: "Ghost" }, image: "Ghost.png", synergies: ["AbundantOrcBarrel"] },
        { id: "BeanSprout", name: { ko: "콩나물", en: "Bean Sprout" }, image: "Bean Sprout.png", synergies: ["ClockHand", "VitalPotion"] },
        { id: "Mold", name: { ko: "곰팡이", en: "Mold" }, image: "Mold.png", synergies: ["Necromancy", "DarkEnergy"] },
        { id: "Paladin", name: { ko: "팔라딘", en: "Paladin" }, image: "Paladin.png", synergies: ["Blessing"] },
        { id: "MoaiStatue", name: { ko: "모아이 석상", en: "Moai Statue" }, image: "Moai Statue.png", synergies: ["Valor"] },
        { id: "HawkEarningSheep", name: { ko: "매를 버는 양", en: "Hawk-Earning Sheep" }, image: "Hawk-Earning Sheep.png", synergies: ["GiantFootprint", "Willpower"] },
        { id: "TamedPiranha", name: { ko: "길들여진 피라냐", en: "Tamed Piranha" }, image: "Tamed Piranha.png", synergies: ["DarkEnergy"] },
        { id: "BombMachine", name: { ko: "폭탄 기계", en: "Bomb Machine" }, image: "Bomb Machine.png", synergies: ["Tentacle"] },
        { id: "Will-o'-the-Wisp", name: { ko: "도깨비불", en: "Will-o'-the-Wisp" }, image: "Will-o'-the-Wisp.png", synergies: ["Necromancy"] }
    ],
    legendary: [
        { id: "Hunter", name: { ko: "사냥꾼", en: "Hunter" }, requires: ["Archer"], image: "Hunter.png", synergies: ["Valor", "Reinforcements"] },
        { id: "HammerKnight", name: { ko: "망치 기사", en: "Hammer Knight" }, requires: ["Knight"], image: "Hammer Knight.png", synergies: ["Willpower", "Blessing"] },
        { id: "Tri-HornExecutioner", name: { ko: "삼각두 처형자", en: "Tri-Horn Executioner" }, requires: ["Goblin"], image: "Tri-Horn Executioner.png", synergies: ["DarkEnergy", "LifeLink"] },
        { id: "CursedWarlock", name: { ko: "저주술사", en: "Cursed Warlock" }, requires: ["Slime"], image: "Cursed Warlock.png", synergies: ["Tentacle", "Vampire"] },
        { id: "Void", name: { ko: "보이드", en: "Void" }, requires: ["FireSpirit"], image: "Void.png", synergies: ["ClockHand", "VitalPotion"] },
        { id: "Priest", name: { ko: "성직자", en: "Priest" }, requires: ["Orc"], image: "Priest.png", synergies: ["Medic", "Reinforcements"] },
        { id: "IroncladCharger", name: { ko: "돌격 철갑 병사", en: "Ironclad Charger" }, requires: ["SpearKnight", "SkeletonSoldier"], image: "Ironclad Charger.png", synergies: ["Valor", "GiantFootprint"] },
        { id: "FoolishTree", name: { ko: "바보나무", en: "Foolish Tree" }, requires: ["SkeletonSoldier", "IceSpirit", "Ghost"], image: "Foolish Tree.png", synergies: ["ClockHand", "Blessing"] },
        { id: "CannonPig", name: { ko: "대포를 든 똥돼지", en: "Cannon Pig" }, requires: ["Knight", "Goblin"], image: "Cannon Pig.png", synergies: ["Necromancy", "LifeLink"] },
        { id: "SproutRockGolem", name: { ko: "새싹 바위 골렘", en: "Sprout Rock Golem" }, requires: ["IceSpirit", "BeanSprout", "Mold"], image: "Sprout Rock Golem.png", synergies: ["Tentacle", "Vampire"] },
        { id: "CrabFighter", name: { ko: "게장수", en: "Crab Fighter" }, requires: ["Archer", "Slime"], image: "Crab Fighter.png", synergies: ["AbundantOrcBarrel", "VitalPotion"] },
        { id: "RabbitTombRobber", name: { ko: "토끼 도굴꾼", en: "Rabbit Tomb Robber" }, requires: ["Goblin", "FireSpirit", "Orc"], image: "Rabbit Tomb Robber.png", synergies: ["Reinforcements", "Medic"] },
        { id: "BabyLizard", name: { ko: "새끼 도마뱀", en: "Baby Lizard" }, requires: ["Archer", "Slime", "Knight"], image: "Baby Lizard.png", synergies: ["GiantFootprint", "Valor"] },
        { id: "ThornIroncladDwarf", name: { ko: "가시 철갑 드워프", en: "Thorn Ironclad Dwarf" }, requires: ["BeanSprout", "Mold", "SpearKnight"], image: "Thorn Ironclad Dwarf.png", synergies: ["Willpower", "Blessing"] },
        { id: "TinybutMightyMummy", name: { ko: "작지만 어마어마한 미이라", en: "Tiny but Mighty Mummy" }, requires: ["FireSpirit", "Orc", "SkeletonSoldier"], image: "Tiny but Mighty Mummy.png", synergies: ["DarkEnergy", "LifeLink"] },
        { id: "LoneWerewolf", name: { ko: "고독한 늑대 인간", en: "Lone Werewolf" }, requires: ["Knight", "Goblin"], image: "Lone Werewolf.png", synergies: ["Tentacle", "Vampire"] },
        { id: "JudgeoftheSun", name: { ko: "태양의 심판자", en: "Judge of the Sun" }, requires: ["SpearKnight", "Archer"], image: "Judge of the Sun.png", synergies: ["VitalPotion", "AbundantOrcBarrel"] },
        { id: "CatGhost", name: { ko: "고양이 유령", en: "Cat Ghost" }, requires: ["Ghost", "Mold"], image: "Cat Ghost.png", synergies: ["Medic", "Reinforcements"] },
        { id: "Jiangshi", name: { ko: "강시", en: "Jiangshi" }, requires: ["IceSpirit", "Ghost", "SkeletonSoldier"], image: "Jiangshi.png", synergies: ["Necromancy", "GiantFootprint"] },
        { id: "BrawlerBear", name: { ko: "싸움꾼 곰", en: "Brawler Bear" }, requires: ["Paladin", "HawkEarningSheep", "BombMachine"], image: "Brawler Bear.png", synergies: ["ClockHand", "Blessing"] },
        { id: "DoomSkull", name: { ko: "둠 스컬", en: "Doom Skull" }, requires: ["MoaiStatue", "TamedPiranha", "Will-o'-the-Wisp"], image: "Doom Skull.png", synergies: ["Necromancy", "DarkEnergy"] }
    ],
    myth: [
        { id: "MartialFrog", name: { ko: "무도가 개구리", en: "Martial Frog" }, requires: ["Hunter", "HammerKnight", "Paladin"], image: "Martial Frog.png", synergies: ["Vampire"] },
        { id: "BeetleWarrior", name: { ko: "장수풍뎅이 전사", en: "Beetle Warrior" }, requires: ["Tri-HornExecutioner", "CursedWarlock", "Archer"], image: "Beetle Warrior.png", synergies: ["VitalPotion"] },
        { id: "MuscleCarrotMan", name: { ko: "근육 당근맨", en: "Muscle Carrot Man" }, requires: ["Void", "Priest", "FireSpirit"], image: "Muscle Carrot Man.png", synergies: ["Reinforcements"] },
        { id: "BabyKraken", name: { ko: "아기 크라켄", en: "Baby Kraken" }, requires: ["FoolishTree", "Jiangshi", "TamedPiranha"], image: "Baby Kraken.png", synergies: ["Valor"] },
        { id: "SkeletonBox", name: { ko: "해골 상자", en: "Skeleton Box" }, requires: ["CannonPig", "LoneWerewolf", "Knight"], image: "Skeleton Box.png", synergies: ["Willpower"] },
        { id: "DarkWarlock", name: { ko: "흑마법사", en: "Dark Warlock" }, requires: ["BabyLizard", "CatGhost", "FireSpirit"], image: "Dark Warlock.png", synergies: ["LifeLink"] },
        { id: "Reaper", name: { ko: "사신", en: "Reaper" }, requires: ["IroncladCharger", "JudgeoftheSun", "SpearKnight"], image: "Reaper.png", synergies: ["Tentacle"] },
        { id: "LavaGolem", name: { ko: "용암 골렘", en: "Lava Golem" }, requires: ["ThornIroncladDwarf", "BrawlerBear", "BeanSprout"], image: "Lava Golem.png", synergies: ["AbundantOrcBarrel"] },
        { id: "IceGolem", name: { ko: "얼음 골렘", en: "Ice Golem" }, requires: ["TinybutMightyMummy", "DoomSkull", "Orc"], image: "Ice Golem.png", synergies: ["Medic"] }
    ]
}

const synergyData = {
    "Valor": { goals: [2, 3] },
    "Willpower": { goals: [2, 3] },
    "Vampire": { goals: [2, 3] },
    "ClockHand": { goals: [2, 3] },
    "Reinforcements": { goals: [2, 3] },
    "LifeLink": { goals: [2, 3] },
    "Blessing": { goals: [2, 3] },
    "VitalPotion": { goals: [2, 3] },
    "AbundantOrcBarrel": { goals: [2, 3] },
    "GiantFootprint": { goals: [2, 3] },
    "Medic": { goals: [2, 2] },
    "Necromancy": { goals: [2, 3] },
    "DarkEnergy": { goals: [2, 3] },
    "Tentacle": { goals: [2, 3] }

}

