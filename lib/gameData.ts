// ── Per-book mini-game data ───────────────────────────────────────────────────

export interface CrosswordWordDef {
  word: string;
  clue: string;
  emoji: string;
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
    scene: string; // scene key
  };
  hiddenObjects: {
    title: string;
    scene: string; // scene key
  };
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
  },
};
