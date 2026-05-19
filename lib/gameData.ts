// ── Per-book mini-game data ───────────────────────────────────────────────────

export interface CrosswordWordDef {
  word: string;
  clue: string;
  emoji: string;
}

export interface UnscrambleWord {
  word: string;
  hint: string;
}

export interface BookGameData {
  wordSearch: {
    title: string;
    words: string[];
  };
  crossword: {
    title: string;
    words: CrosswordWordDef[];
  };
  findDiff: {
    title: string;
    scene: string;
  };
  hiddenObjects: {
    title: string;
    scene: string;
  };
  memoryMatch: { pairs: string[] };
  unscramble: { words: UnscrambleWord[] };
}

export const GAME_DATA: Record<string, BookGameData> = {
  "dream-ideas": {
    wordSearch: {
      title: "Find the Dream Words!",
      words: ["DREAM", "SLEEP", "WISH", "STARS", "MOON", "CLOUD", "NIGHT", "PILLOW", "BUNNY", "MAGIC"],
    },
    crossword: {
      title: "Dream Ideas Crossword",
      words: [
        { word: "WISH", clue: "Make one on a shooting star", emoji: "⭐" },
        { word: "DREAM", clue: "What happens when you close your eyes", emoji: "💤" },
        { word: "MOON", clue: "Round glow in the night sky", emoji: "🌙" },
        { word: "SLEEP", clue: "Close your eyes and do this", emoji: "😴" },
        { word: "CLOUD", clue: "Fluffy white thing in the sky", emoji: "☁️" },
      ],
    },
    findDiff: { title: "Spot the Differences!", scene: "dream-ideas" },
    hiddenObjects: { title: "Find the Hidden Items!", scene: "dream-ideas" },
    memoryMatch: { pairs: ['💭','⭐','🌈','🚀','🦋','🌙','✨','🎨'] },
    unscramble: { words: [{word:'DREAM',hint:'What you have when you sleep'},{word:'STARS',hint:'They twinkle in the night sky'},{word:'CLOUD',hint:'Fluffy and floats in the sky'},{word:'MAGIC',hint:'Something wonderful and surprising'},{word:'SLEEP',hint:'Close your eyes and drift away'}] },
  },

  "amber-the-dragon-keeper": {
    wordSearch: {
      title: "Dragon Cave Words!",
      words: ["DRAGON", "AMBER", "FIRE", "CAVE", "GEMS", "WINGS", "MAGIC", "ROAR", "SCALE", "JEWEL"],
    },
    crossword: {
      title: "Amber's Crossword",
      words: [
        { word: "FIRE", clue: "Dragons breathe this", emoji: "🔥" },
        { word: "CAVE", clue: "Where Amber lives underground", emoji: "🏔️" },
        { word: "GEMS", clue: "Sparkling treasures in the cave", emoji: "💎" },
        { word: "ROAR", clue: "Loud sound a dragon makes", emoji: "🦁" },
        { word: "WING", clue: "Dragons use these to fly", emoji: "🦅" },
      ],
    },
    findDiff: { title: "Spot the Differences!", scene: "amber" },
    hiddenObjects: { title: "Find the Hidden Gems!", scene: "amber" },
    memoryMatch: { pairs: ['🐉','🔥','💎','🏰','🌋','⚔️','🧪','👑'] },
    unscramble: { words: [{word:'DRAGON',hint:'A fire-breathing flying creature'},{word:'AMBER',hint:"The dragon keeper's name"},{word:'FIRE',hint:'Dragons breathe this'},{word:'CAVE',hint:'Where Amber lives underground'},{word:'WINGS',hint:'Dragons use these to fly'}] },
  },

  "whats-your-poo-poo-face": {
    wordSearch: {
      title: "Silly Poo Poo Words!",
      words: ["GIGGLE", "FUNNY", "STINKY", "LAUGH", "SILLY", "FACE", "TUMMY", "DRAGON", "NOSE", "WIGGLE"],
    },
    crossword: {
      title: "Poo Poo Crossword",
      words: [
        { word: "FACE", clue: "It's on the front of your head", emoji: "😄" },
        { word: "FUNNY", clue: "Something that makes you laugh", emoji: "😂" },
        { word: "NOSE", clue: "It smells things — especially stinky things", emoji: "👃" },
        { word: "LAUGH", clue: "What you do when things are silly", emoji: "🤣" },
        { word: "TUMMY", clue: "Your belly, your middle, your squishiest part", emoji: "🤰" },
      ],
    },
    findDiff: { title: "Spot the Differences!", scene: "poo-poo-face" },
    hiddenObjects: { title: "Find the Hidden Things!", scene: "poo-poo-face" },
    memoryMatch: { pairs: ['💩','😂','🚽','🧻','😆','🤣','🪠','😜'] },
    unscramble: { words: [{word:'SILLY',hint:'Makes you giggle and laugh'},{word:'FUNNY',hint:'Ha ha ha!'},{word:'LAUGH',hint:'What you do when something is silly'},{word:'TUMMY',hint:'Your belly your middle'},{word:'STINKY',hint:'Not a nice smell!'}] },
  },

  "gilroys-gobble": {
    wordSearch: {
      title: "Gobble Gobble Words!",
      words: ["GOBBLE", "TURKEY", "BARN", "FARM", "WINGS", "CLUCK", "VOICE", "NEST", "FLOCK", "PRIDE"],
    },
    crossword: {
      title: "Gilroy's Crossword",
      words: [
        { word: "BARN", clue: "The big red building on a farm", emoji: "🏚️" },
        { word: "BEAK", clue: "A bird uses this to eat", emoji: "🦅" },
        { word: "WING", clue: "Birds use these to fly", emoji: "🪶" },
        { word: "HENS", clue: "Female chickens on the farm", emoji: "🐔" },
        { word: "NEST", clue: "Where a bird lays its eggs", emoji: "🪺" },
      ],
    },
    findDiff: { title: "Spot the Differences!", scene: "gilroy" },
    hiddenObjects: { title: "Find the Farm Things!", scene: "gilroy" },
    memoryMatch: { pairs: ['🦃','🏚️','🌽','🐓','🌾','🥚','🐔','🍂'] },
    unscramble: { words: [{word:'TURKEY',hint:'The big bird on the farm'},{word:'GOBBLE',hint:'Sound a turkey makes'},{word:'BARN',hint:'Big red building on a farm'},{word:'WINGS',hint:'Birds use these to fly'},{word:'NEST',hint:'Where birds lay eggs'}] },
  },

  "finding-hampton": {
    wordSearch: {
      title: "Find Hampton's Words!",
      words: ["HIPPO", "RHINO", "GIFT", "PARTY", "SHARE", "CAKE", "FRIENDS", "SEARCH", "LAUGH", "SMILE"],
    },
    crossword: {
      title: "Hampton's Crossword",
      words: [
        { word: "HIPPO", clue: "Hampton's animal — big, round, and loveable", emoji: "🦛" },
        { word: "GIFT", clue: "Something wrapped in a bow for a friend", emoji: "🎁" },
        { word: "CAKE", clue: "Sweet birthday treat with candles", emoji: "🎂" },
        { word: "BOW", clue: "Tied on top of a present", emoji: "🎀" },
        { word: "PARTY", clue: "Celebration with balloons and friends", emoji: "🎉" },
      ],
    },
    findDiff: { title: "Spot the Differences!", scene: "hampton" },
    hiddenObjects: { title: "Find Hampton's Things!", scene: "hampton" },
    memoryMatch: { pairs: ['🦛','🎁','🎂','🎉','💝','🎈','🎀','🌟'] },
    unscramble: { words: [{word:'HIPPO',hint:"Hampton's big loveable animal"},{word:'PARTY',hint:'Celebration with balloons and cake'},{word:'GIFT',hint:'Something wrapped with a bow'},{word:'CAKE',hint:'Sweet birthday treat'},{word:'SMILE',hint:'Happy face expression'}] },
  },

  "the-lumpiest-pumpkin": {
    wordSearch: {
      title: "Pumpkin Patch Words!",
      words: ["PUMPKIN", "LUMPY", "PATCH", "SEEDS", "ORANGE", "CARVE", "LANTERN", "SPOOKY", "STEM", "GLOW"],
    },
    crossword: {
      title: "Pumpkin Crossword",
      words: [
        { word: "STEM", clue: "The green stalk on top of a pumpkin", emoji: "🌿" },
        { word: "SEEDS", clue: "Slimy insides of a carved pumpkin", emoji: "🌰" },
        { word: "GLOW", clue: "What a jack-o-lantern does in the dark", emoji: "🕯️" },
        { word: "LUMPY", clue: "Not smooth — bumpy and wobbly", emoji: "😄" },
        { word: "PATCH", clue: "A field full of pumpkins", emoji: "🎃" },
      ],
    },
    findDiff: { title: "Spot the Differences!", scene: "lumpiest-pumpkin" },
    hiddenObjects: { title: "Find the Patch Things!", scene: "lumpiest-pumpkin" },
    memoryMatch: { pairs: ['🎃','🍂','🌾','👻','🕯️','🌙','⭐','🍁'] },
    unscramble: { words: [{word:'PUMPKIN',hint:'Orange and round great for Halloween'},{word:'LUMPY',hint:'Not smooth bumpy and wobbly'},{word:'SEEDS',hint:'Slimy insides of a carved pumpkin'},{word:'GLOW',hint:'What a jack-o-lantern does in the dark'},{word:'PATCH',hint:'A field full of pumpkins'}] },
  },

  "one-tom-turkey": {
    wordSearch: {
      title: "Thanksgiving Words!",
      words: ["TURKEY", "FEAST", "GRAVY", "CORN", "PIE", "STUFFED", "TABLE", "THANKFUL", "FAMILY", "PARADE"],
    },
    crossword: {
      title: "Tom Turkey's Crossword",
      words: [
        { word: "FEAST", clue: "A HUGE delicious meal with everyone you love", emoji: "🍽️" },
        { word: "CORN", clue: "Yellow vegetable on the cob", emoji: "🌽" },
        { word: "PIE", clue: "Sweet round dessert — pumpkin flavor!", emoji: "🥧" },
        { word: "TABLE", clue: "Where everyone sits for Thanksgiving dinner", emoji: "🪑" },
        { word: "GRAVY", clue: "Thick brown sauce poured on everything", emoji: "🍲" },
      ],
    },
    findDiff: { title: "Spot the Differences!", scene: "one-tom-turkey" },
    hiddenObjects: { title: "Find the Feast Things!", scene: "one-tom-turkey" },
    memoryMatch: { pairs: ['🦃','🍗','🌽','🥧','🍽️','🙏','🍎','🥕'] },
    unscramble: { words: [{word:'TURKEY',hint:'The main dish on Thanksgiving'},{word:'FEAST',hint:'A huge delicious meal'},{word:'CORN',hint:'Yellow vegetable on the cob'},{word:'GRAVY',hint:'Thick brown sauce on everything'},{word:'FAMILY',hint:'The people you love most'}] },
  },

  "ollie-come-home": {
    wordSearch: {
      title: "Find Ollie's Words!",
      words: ["OLLIE", "MEOW", "HOME", "COZY", "LOST", "PAWS", "FUZZY", "PURR", "WARM", "KITTEN"],
    },
    crossword: {
      title: "Ollie's Crossword",
      words: [
        { word: "MEOW", clue: "The sound a cat makes", emoji: "🐱" },
        { word: "HOME", clue: "Where Ollie really wants to be", emoji: "🏡" },
        { word: "PAWS", clue: "A cat's fluffy feet", emoji: "🐾" },
        { word: "COZY", clue: "Warm, soft, snuggly feeling", emoji: "🛋️" },
        { word: "PURR", clue: "Happy rumbling sound cats make", emoji: "😻" },
      ],
    },
    findDiff: { title: "Spot the Differences!", scene: "ollie" },
    hiddenObjects: { title: "Find Ollie's Things!", scene: "ollie" },
    memoryMatch: { pairs: ['🐱','🏡','🐾','❤️','🌳','🛋️','😻','🎀'] },
    unscramble: { words: [{word:'KITTEN',hint:'A baby cat'},{word:'MEOW',hint:'Sound a cat makes'},{word:'PAWS',hint:"A cat's fluffy feet"},{word:'HOME',hint:'Where Ollie wants to be'},{word:'PURR',hint:'Happy sound cats make'}] },
  },

  "what-a-doodle-do": {
    wordSearch: {
      title: "Wake Up Farm Words!",
      words: ["ROOSTER", "CROW", "DAWN", "FARM", "HENS", "CLUCK", "EGGS", "NEST", "WAKE", "SUNRISE"],
    },
    crossword: {
      title: "Doodle-Do Crossword",
      words: [
        { word: "CROW", clue: "The loud sound a rooster makes at sunrise", emoji: "🐓" },
        { word: "EGGS", clue: "Round things hens lay in the nest", emoji: "🥚" },
        { word: "HENS", clue: "Female chickens — mothers of the eggs", emoji: "🐔" },
        { word: "DAWN", clue: "When the sun first peeks up in the morning", emoji: "🌅" },
        { word: "NEST", clue: "A cozy bed made of straw and twigs", emoji: "🪺" },
      ],
    },
    findDiff: { title: "Spot the Differences!", scene: "doodle-do" },
    hiddenObjects: { title: "Find the Farm Things!", scene: "doodle-do" },
    memoryMatch: { pairs: ['🐓','🌅','☀️','🌾','🥚','🎵','🐔','🌻'] },
    unscramble: { words: [{word:'ROOSTER',hint:'The bird that crows at sunrise'},{word:'DAWN',hint:'When the sun first peeks up'},{word:'CROW',hint:"The rooster's loud morning call"},{word:'EGGS',hint:'Round things hens lay in the nest'},{word:'WAKE',hint:'The opposite of sleep'}] },
  },

  "the-shut-in-button": {
    wordSearch: {
      title: "Magical Button Words!",
      words: ["BUTTON", "MAGIC", "PRESS", "WISH", "GLOW", "POWER", "DANCE", "CANDY", "FLOAT", "DREAM"],
    },
    crossword: {
      title: "Button Crossword",
      words: [
        { word: "WISH", clue: "What you make when you press the button", emoji: "✨" },
        { word: "GLOW", clue: "The magic button shines and does this", emoji: "💡" },
        { word: "DANCE", clue: "Move your body to the music!", emoji: "💃" },
        { word: "PRESS", clue: "What you do with your finger to the button", emoji: "👆" },
        { word: "MAGIC", clue: "How the button makes things happen", emoji: "🪄" },
      ],
    },
    findDiff: { title: "Spot the Differences!", scene: "shut-in-button" },
    hiddenObjects: { title: "Find the Magic Things!", scene: "shut-in-button" },
    memoryMatch: { pairs: ['🔘','✨','🎪','🍬','💃','🌈','🪄','💡'] },
    unscramble: { words: [{word:'BUTTON',hint:'Push it and something magical happens'},{word:'MAGIC',hint:'Wonderful and surprising things'},{word:'WISH',hint:'What you make when you press the button'},{word:'DANCE',hint:'Move your body to the music'},{word:'GLOW',hint:'The button shines and does this'}] },
  },

  "frog-a-dog": {
    wordSearch: {
      title: "Pond Words!",
      words: ["FROG", "DOG", "POND", "BARK", "CROAK", "JUMP", "SWIM", "SLIME", "FETCH", "LILY"],
    },
    crossword: {
      title: "Frog-a-Dog Crossword",
      words: [
        { word: "FROG", clue: "Green, jumpy, and loves lily pads", emoji: "🐸" },
        { word: "POND", clue: "A small still body of water", emoji: "🌊" },
        { word: "BARK", clue: "The loud sound a dog makes", emoji: "🐕" },
        { word: "SWIM", clue: "How frogs move through water", emoji: "🏊" },
        { word: "LILY", clue: "Beautiful flower that floats on the pond", emoji: "🌸" },
      ],
    },
    findDiff: { title: "Spot the Differences!", scene: "frog-a-dog" },
    hiddenObjects: { title: "Find the Pond Things!", scene: "frog-a-dog" },
    memoryMatch: { pairs: ['🐸','🐕','🌿','💧','🌊','🐾','🌳','🐟'] },
    unscramble: { words: [{word:'FROG',hint:'Green jumpy loves lily pads'},{word:'POND',hint:'A small still body of water'},{word:'JUMP',hint:'What frogs love to do'},{word:'BARK',hint:'Loud sound a dog makes'},{word:'SWIM',hint:'How frogs move through water'}] },
  },

  "brian-the-ghost": {
    wordSearch: {
      title: "Spooky Ghost Words!",
      words: ["GHOST", "BRIAN", "WAVE", "KIND", "SPOOK", "FLOAT", "HAUNT", "SMILE", "SCARY", "BOO"],
    },
    crossword: {
      title: "Brian's Crossword",
      words: [
        { word: "WAVE", clue: "What friendly Brian does instead of scaring", emoji: "👋" },
        { word: "KIND", clue: "Brian is this — the opposite of mean", emoji: "💜" },
        { word: "SPOOK", clue: "What other ghosts try to do", emoji: "👻" },
        { word: "FLOAT", clue: "How ghosts move — feet never touch the ground", emoji: "🌫️" },
        { word: "CAPE", clue: "A flowing costume piece ghosts wear", emoji: "🧣" },
      ],
    },
    findDiff: { title: "Spot the Differences!", scene: "brian" },
    hiddenObjects: { title: "Find the Spooky Things!", scene: "brian" },
    memoryMatch: { pairs: ['👻','💜','🏚️','🕯️','🌙','⛓️','🕷️','✨'] },
    unscramble: { words: [{word:'GHOST',hint:'A spooky floating spirit'},{word:'BRIAN',hint:"The friendly ghost's name"},{word:'WAVE',hint:'What friendly Brian does instead of scaring'},{word:'KIND',hint:'Opposite of mean'},{word:'FLOAT',hint:'How ghosts move without touching the ground'}] },
  },
};
