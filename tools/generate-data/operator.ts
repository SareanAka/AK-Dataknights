import OPERATOR_KEY_OVERRIDE from "../../data/custom/operator-key-override.json";
import * as constants from "./constants";
import { GeneratedOutfitData, Outfit } from "./outfit";
import { LocalizationString, normalizeForLocaleFile } from "./utils";

const CHINESE_TO_ENGLISH_TAGS = {
  新手: "STARTER",
  位移: "SHIFT",
  减速: "SLOW",
  削弱: "DEBUFF",
  召唤: "SUMMON",
  快速复活: "FAST_REDEPLOY",
  控场: "CROWD_CONTROL",
  支援: "SUPPORT",
  治疗: "HEALING",
  爆发: "NUKE",
  生存: "SURVIVAL",
  群攻: "AOE",
  费用回复: "DP_RECOVERY",
  输出: "DPS",
  防护: "DEFENSE",
} as const;

export interface AllSkillLvlup {
  unlockCond: UnlockCond;
  lvlUpCost: Cost[] | null;
}

export interface UnlockCond {
  phase: number;
  level: number;
}

export interface Cost {
  id: string;
  count: number;
  type: Type;
}

export enum Type {
  Material = "MATERIAL",
}

export interface KeyFrame {
  level: number;
  data: KeyFrameData;
}

export interface KeyFrameData {
  maxHp: number;
  atk: number;
  def: number;
  magicResistance: number;
  cost: number;
  blockCnt: number;
  moveSpeed: number;
  attackSpeed: number;
  baseAttackTime: number;
  respawnTime: number;
  hpRecoveryPerSec: number;
  spRecoveryPerSec: number;
  maxDeployCount: number;
  maxDeckStackCnt: number;
  tauntLevel: number;
  massLevel: number;
  baseForceLevel: number;
  stunImmune: boolean;
  silenceImmune: boolean;
  sleepImmune: boolean;
  frozenImmune: boolean;
  levitateImmune: boolean;
}

export interface Phase {
  characterPrefabKey: string;
  rangeId: string | null;
  maxLevel: number;
  attributesKeyFrames: KeyFrame[];
  evolveCost: Cost[] | null;
}

export enum Position {
  All = "ALL",
  Melee = "MELEE",
  None = "NONE",
  Ranged = "RANGED",
}

export interface PotentialRank {
  type: number;
  description: string;
  buff: Buff | null;
  equivalentCost: null;
}

export interface Buff {
  attributes: Attributes;
}

export interface Attributes {
  abnormalFlags: null;
  abnormalImmunes: null;
  abnormalAntis: null;
  abnormalCombos: null;
  abnormalComboImmunes: null;
  attributeModifiers: AttributeModifier[];
}

export interface AttributeModifier {
  attributeType: number;
  formulaItem: number;
  value: number;
  loadFromBlackboard: boolean;
  fetchBaseValueFromSourceEntity: boolean;
}

export const ACTUAL_OPERATOR_CLASSES = {
  CASTER: "CASTER",
  TANK: "DEFENDER",
  WARRIOR: "GUARD",
  MEDIC: "MEDIC",
  SNIPER: "SNIPER",
  SPECIAL: "SPECIALIST",
  SUPPORT: "SUPPORTER",
  PIONEER: "VANGUARD",
  TOKEN: "TOKEN", // Non-trap summons
  TRAP: "TRAP", // Trapmaster summons
} as const;

export interface Skill {
  skillId: string | null;
  overridePrefabKey: string | null;
  overrideTokenKey: string | null;
  levelUpCostCond: LevelUpCostCond[];
  unlockCond: UnlockCond;
}

export interface LevelUpCostCond {
  unlockCond: UnlockCond;
  lvlUpTime: number;
  levelUpCost: Cost[] | null;
}

export interface Talent {
  candidates: TalentCandidate[] | null;
}

export interface TalentCandidate {
  unlockCondition: UnlockCond;
  requiredPotentialRank: number;
  prefabKey: string;
  name: string | null;
  description: string | null;
  rangeId: RangeId | null;
  blackboard: Blackboard[];
}

export interface Blackboard {
  key: string;
  value: number;
}

export enum RangeId {
  RangeB1 = "b-1",
  Range11 = "1-1",
  Range31 = "3-1",
  RangeX4 = "x-4",
  RangeX5 = "x-5",
}

export interface Trait {
  candidates: TraitCandidate[];
}

export interface TraitCandidate {
  unlockCondition: UnlockCond;
  requiredPotentialRank: number;
  blackboard: Blackboard[];
  overrideDescripton: string | null;
  prefabKey: string | null;
  rangeId: string | null;
}

export enum SubProfessionId {
  // Vanguard
  Pioneer = "pioneer",
  Charger = "charger",
  Tactician = "tactician",
  StandardBearer = "bearer",
  Agent = "agent",
  // Guard
  Centurion = "centurion",
  Fighter = "fighter",
  ArtsFighter = "artsfghter",
  Instructor = "instructor",
  Lord = "lord",
  Swordmaster = "sword",
  Musha = "musha",
  Dreadnought = "fearless",
  Reaper = "reaper",
  Liberator = "librator",
  Crusher = "crusher",
  // Defender
  Protector = "protector",
  Guardian = "guardian",
  Juggernaut = "unyield",
  ArtsProtector = "artsprotector",
  Duelist = "duelist",
  Fortress = "fortress",
  Sentinel = "shotprotector",
  // Sniper
  Marksman = "fastshot",
  Heavyshooter = "closerange",
  Artilleryman = "aoesniper",
  Deadeye = "longrange",
  Spreadshooter = "reaperrange",
  Besieger = "siegesniper",
  Flinger = "bombarder",
  // Caster
  CoreCaster = "corecaster",
  SplashCaster = "splashcaster",
  MechAccordCaster = "funnel",
  PhalanxCaster = "phalanx",
  MysticCaster = "mystic",
  ChainCaster = "chain",
  BlastCaster = "blastcaster",
  // Medic
  Medic = "physician",
  MultiTargetMedic = "ringhealer",
  Therapist = "healer",
  WanderingMedic = "wandermedic",
  IncantationMedic = "incantationmedic",
  ChainMedic = "chainhealer",
  // Supporter
  DecelBinder = "slower",
  Hexer = "underminer",
  Bard = "bard",
  Abjurer = "blessing",
  Summoner = "summoner",
  Artificer = "craftsman",
  // Specialist
  Executor = "executor",
  PushStroker = "pusher",
  Ambusher = "stalker",
  Hookmaster = "hookmaster",
  Geek = "geek",
  Merchant = "merchant",
  Trapmaster = "traper",
  Dollkeeper = "dollkeeper",
  // Other
  OperatorAttachedUnit = "notchar1",
  NoClassTrap = "notchar2",
  None1 = "none1",
  None2 = "none2",
}

export interface CharacterTableData {
  // character-table.json
  name: string;
  appellation: string;
  description: string | null;
  canUseGeneralPotentialItem: boolean;
  potentialItemId: string;
  nationId: string | null;
  groupId: string | null;
  teamId: string | null;
  displayNumber: string | null;
  tokenKey: string | null; // Token summon character id
  position: Position;
  tagList: string[] | null;
  itemUsage: string | null;
  itemDesc: string | null;
  itemObtainApproach: string | null;
  isNotObtainable: boolean; // true if Integrated Strategies operators
  isSpChar: boolean;
  maxPotentialLevel: number;
  rarity: number; // Number of stars in-game, minus one
  profession: keyof typeof ACTUAL_OPERATOR_CLASSES;
  subProfessionId: SubProfessionId;
  trait: Trait | null;
  phases: Phase[];
  skills: Skill[];
  talents: Talent[] | null;
  potentialRanks: PotentialRank[];
  favorKeyFrames: KeyFrame[] | null;
  allSkillLvlup: AllSkillLvlup[];
}

interface DefaultOutfits {
  0: Outfit;
  1?: Outfit;
  2?: Outfit;
}

export interface GeneratedOperatorData {
  key: string;
  id: string;
  displayNumber: string | null;
  rarity: number;
  class: typeof ACTUAL_OPERATOR_CLASSES[keyof typeof ACTUAL_OPERATOR_CLASSES];
  classBranch: SubProfessionId;
  position: Position;
  tagList: string[];
  nationId: string | null;
  groupId: string | null;
  teamId: string | null;
  canUseGeneralPotentialItem: boolean;
  potentialItem: null;
  tokenSummon: null;
  isNotObtainable: boolean;
  defaultOutfits: { [elite: number]: GeneratedOutfitData };
}

export interface GeneratedOperatorIndexData {
  key: string;
  id: string;
  displayNumber: string | null;
  rarity: number;
  class: typeof ACTUAL_OPERATOR_CLASSES[keyof typeof ACTUAL_OPERATOR_CLASSES];
  classBranch: SubProfessionId;
  position: Position;
  tagList: string[];
  nationId: string | null;
  groupId: string | null;
  teamId: string | null;
  isNotObtainable: boolean;
  defaultOutfits: { [elite: number]: string };
}

export class Operator {
  static readonly LOCALIZATION_STRING_ATTRIBUTES = [
    "name",
    "appellation",
    "description",
  ] as const;

  private _unnormalizedKey: string; // Only used if not in OPERATOR_KEY_OVERRIDE

  // Original attributes
  id: string; // Key in charactertable
  name: LocalizationString;
  appellation: LocalizationString;
  description: LocalizationString | null;
  canUseGeneralPotentialItem: boolean;
  potentialItemId: string;
  nationId: string | null;
  groupId: string | null;
  teamId: string | null;
  displayNumber: string | null;
  tokenKey: string | null; // Token summon character id
  position: Position;
  tagList: (keyof typeof CHINESE_TO_ENGLISH_TAGS)[] | null;
  isNotObtainable: boolean; // true if Integrated Strategies operators
  rarity: number; // Number of stars in-game
  class: typeof ACTUAL_OPERATOR_CLASSES[keyof typeof ACTUAL_OPERATOR_CLASSES];
  classBranch: SubProfessionId;

  // Additional attributes
  defaultOutfits: DefaultOutfits;

  // Accepts zh-CN data only
  public constructor(id: string, data: CharacterTableData) {
    this.id = id;
    this.displayNumber = data.displayNumber;
    this.name = new LocalizationString(data.name);
    this.appellation = new LocalizationString(data.appellation);
    this.description = LocalizationString.fromDataOrNull(data.description);
    this.rarity = data.rarity + 1;
    this.class = ACTUAL_OPERATOR_CLASSES[data.profession];
    this.classBranch = data.subProfessionId;
    this.position = data.position;
    // @ts-ignore
    this.tagList = data.tagList;
    this.nationId = data.nationId;
    this.groupId = data.groupId;
    this.teamId = data.teamId;
    this.canUseGeneralPotentialItem = data.canUseGeneralPotentialItem;
    this.potentialItemId = data.potentialItemId;
    this.tokenKey = data.tokenKey;
    this.isNotObtainable = data.isNotObtainable;

    this._unnormalizedKey = data.appellation;

    const skinTable = constants.OUTFIT_TABLES[constants.ORIGINAL_LOCALE];
    this.defaultOutfits = Object.entries(skinTable.buildinEvolveMap[id]).reduce(
      (accumulator: any, [elite, skinId]) => {
        accumulator[elite] = new Outfit(skinTable.charSkins[skinId]);
        return accumulator;
      },
      {}
    );
  }

  public addLocale(
    locale: typeof constants.OUTPUT_LOCALES[number],
    data: CharacterTableData
  ) {
    Operator.LOCALIZATION_STRING_ATTRIBUTES.forEach((attribute) =>
      this[attribute]?.addLocale(locale, data[attribute])
    );

    if (locale === "en-US") this._unnormalizedKey = data.name;
    if (locale === "en-TL" && data.name) this._unnormalizedKey = data.name;
  }

  public toData(): GeneratedOperatorData {
    return {
      key: this.key,
      id: this.id,
      displayNumber: this.displayNumber,
      rarity: this.rarity,
      class: this.class,
      classBranch: this.classBranch,
      position: this.position,
      tagList: this.normalizedTagList,
      nationId: this.nationId,
      groupId: this.groupId,
      teamId: this.teamId,
      canUseGeneralPotentialItem: this.canUseGeneralPotentialItem,
      potentialItem: this.potentialItem,
      tokenSummon: this.tokenSummon,
      isNotObtainable: this.isNotObtainable,
      // @ts-ignore elite is a number string
      defaultOutfits: Object.entries(this.defaultOutfits).reduce(
        (accumulator: { [elite: string]: string }, [elite, outfit]) => {
          accumulator[elite] = outfit.toData();
          return accumulator;
        },
        {}
      ),
    };
  }

  public toIndexData(): GeneratedOperatorIndexData {
    return {
      key: this.key,
      id: this.id,
      displayNumber: this.displayNumber,
      rarity: this.rarity,
      class: this.class,
      classBranch: this.classBranch,
      position: this.position,
      tagList: this.normalizedTagList,
      nationId: this.nationId,
      groupId: this.groupId,
      teamId: this.teamId,
      isNotObtainable: this.isNotObtainable,
      defaultOutfits: Object.entries(this.defaultOutfits).reduce(
        (accumulator: { [elite: string]: string }, [elite, outfit]) => {
          accumulator[elite] = outfit.toIndexData();
          return accumulator;
        },
        {}
      ),
    };
  }

  public toLocaleFileData(locale: typeof constants.OUTPUT_LOCALES[number]) {
    const transformedLocale = locale.replace("-", "_");
    return Operator.LOCALIZATION_STRING_ATTRIBUTES.reduce(
      (accumulator: any, current) => {
        if (locale === "en-TL" && current === "name") {
          accumulator[current] = normalizeForLocaleFile(
            !this.name?.en_US && !this.name?.en_TL
              ? this.appellation.zh_CN
              : this.name?.en_TL ?? null
          );
          return accumulator;
        }
        // @ts-ignore
        const localizedString = this[current]?.[transformedLocale] ?? null;
        accumulator[current] = normalizeForLocaleFile(localizedString);
        return accumulator;
      },
      {}
    );
  }

  public get key(): string {
    // @ts-ignore
    if (OPERATOR_KEY_OVERRIDE[this.id]) return OPERATOR_KEY_OVERRIDE[this.id];
    return this._unnormalizedKey
      .toLowerCase()
      .replace(/[.'()]/g, "")
      .replace(/[-\s]+/g, "-");
  }

  public get normalizedTagList(): string[] {
    return (this.tagList ?? []).map(
      (chineseTag) => CHINESE_TO_ENGLISH_TAGS[chineseTag]
    );
  }

  public get isActualOperator() {
    return (
      !["TRAP", "TOKEN"].includes(this.class) &&
      !constants.FALSE_POSITIVE_ACTUAL_OPERATORS.includes(this.id)
    );
  }

  get potentialItem() {
    // TODO
    this.potentialItemId;
    return null;
  }

  get tokenSummon() {
    // TODO
    this.tokenKey;
    return null;
  }
}
