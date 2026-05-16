export interface Book {
  id: string;
  /** URL slug used for /books/[slug] pages */
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  /** Full publisher-style summary for book detail pages */
  longDescription?: string;
  image: string;
  /** Alias for image, used on book detail pages */
  coverImage: string;
  characterImage?: string;
  tag?: string;
  featured?: boolean;
  accentColor: string;
  ageRange: string;
  hook: string;
  perfectFor: string;
  moods?: string[];
  /** Emoji + label theme tags, e.g. "🐉 Adventure" */
  themes: string[];
  /** CSS gradient string matching the homepage land section */
  gradient: string;
  /** The land name used on the homepage adventure map */
  landName: string;
  /** Whether a full read-aloud experience exists for this book */
  hasReadAloud: boolean;
  /** Direct Amazon link (falls back to AMAZON_STORE_URL if not set) */
  amazonUrl?: string;
}

export const AMAZON_STORE_URL = "https://www.amazon.com/stores/page/1DEB841F-05B8-46B0-A42E-55B618C36B12?ingress=3";

export const books: Book[] = [
  {
    id: "poo-poo-face",
    slug: "whats-your-poo-poo-face",
    title: "What's Your Poo Poo Face",
    description:
      "Spoiler: EVERYONE makes the face. Even unicorns. Even dragons. Even your teacher (especially your teacher). A little boy and his dad go on a heroic quest to uncover the one expression that unites all living things — and yes, it's exactly what you think. Perfect for: fans of Dragons Love Tacos, We Don't Eat Our Classmates.",
    longDescription:
      "A little boy notices something hilarious — everyone makes a special face when nature calls. His dad, his dog, even the dragon next door. Together they set off on a very important investigation that ends with one big, universal truth: the poo poo face connects us all. Bursting with giggles on every page, this laugh-out-loud read-aloud is the book kids will demand again and again — and parents will secretly love just as much.",
    image: "/images/books/poo-poo-face.png",
    coverImage: "/images/books/poo-poo-face.png",
    characterImage: "/images/characters/poo-poo-dragon.png",
    tag: "Fan Favorite",
    featured: true,
    accentColor: "#9B6FD0",
    ageRange: "Ages 2–5",
    hook: "Every kid has one. A laugh-out-loud mirror moment that turns bathtime into showtime.",
    perfectFor: "Perfect for fans of Dragons Love Tacos and everyone who has ever made a face they wish someone hadn't seen.",
    moods: ['silly'],
    themes: ["😂 Potty Training", "👨‍👧 Parent-Child Bond", "🤣 Laugh-Out-Loud"],
    gradient: "linear-gradient(150deg, #fff3e0 0%, #ffe08a 30%, #ffb3c6 70%, #ff8fab 100%)",
    landName: "Poo Poo Face Town",
    hasReadAloud: true,
  },
  {
    id: "dream-ideas",
    slug: "dream-ideas",
    title: "Dream Ideas",
    description:
      "Warning: may cause extremely vivid dreams about ice cream, rocket ships, and talking animals. This bedtime singalong is the sneakiest way to get kids excited about sleep — set to a tune so catchy it'll be stuck in your head until Thursday. Perfect for: fans of Llama Llama Red Pajama, Goodnight Moon.",
    longDescription:
      "What if the best idea you ever had was waiting for you in a dream? Dream Ideas is a bedtime singalong set to an original tune — one so warm and catchy that getting kids to sleep actually becomes fun. Follow along as dreamland opens its doors and imagination runs wild with ice cream mountains, flying inventions, and the kind of dreams that make you excited for morning. The sneakiest bedtime book in existence.",
    image: "/images/books/dream-ideas.png",
    coverImage: "/images/books/dream-ideas.png",
    characterImage: "/images/characters/dream-ideas-400-height.png",
    tag: "Bedtime Read",
    accentColor: "#5B9BD5",
    ageRange: "Ages 2–5",
    hook: "What if your best idea ever came to you in a dream? And what if you forgot it by morning? A book about chasing the ones worth catching.",
    perfectFor: "Perfect for bedtime stall tactics and fans of Goodnight Moon (but funnier).",
    moods: ['bedtime', 'read-aloud'],
    themes: ["🌙 Bedtime", "🎵 Singalong", "💡 Imagination"],
    gradient: "linear-gradient(160deg, #0a0422 0%, #1a1060 35%, #2d1b80 65%, #4a2da0 100%)",
    landName: "Dream Ideas Land",
    hasReadAloud: false,
  },
  {
    id: "amber-dragon-keeper",
    slug: "amber-the-dragon-keeper",
    title: "Amber The Dragon Keeper",
    description:
      "She thought she was just a regular kid. The dragons had other plans. When Amber stumbles into a magical land, she discovers a destiny that's way cooler than anything on her schedule — and way more responsibility than she signed up for. Perfect for: fans of Where the Wild Things Are, The Bad Guys.",
    longDescription:
      "Amber is just a regular girl — she goes to school, plays with her friends, and has a perfectly ordinary closet. Except her closet opens into Sydar, a magical land where fairies fly free, mermaids swim the deepest seas, and the most extraordinary creatures of all — dragons — soar the skies. In Sydar, Amber is famous. She's the Dragon Keeper. And today, the dragons need her more than ever. A breathtaking adventure about courage, magic, and the extraordinary destiny that might be hiding in your own bedroom.",
    image: "/images/books/amber-dragon-keeper.png",
    coverImage: "/images/books/amber-cover-square.jpg",
    characterImage: "/images/characters/amber-no-background.png",
    tag: "Adventure",
    accentColor: "#E86BB5",
    ageRange: "Ages 4–8",
    hook: "Amber does everything her friends do — except one thing. The twist on the last page? Kids demand it again immediately.",
    perfectFor: "Perfect for fans of Where the Wild Things Are and future herpetologists.",
    moods: ['feel-good'],
    themes: ["🐉 Adventure", "✨ Magic", "💪 Courage"],
    gradient: "linear-gradient(155deg, #2d0a3a 0%, #5a1060 30%, #8b1a6b 60%, #c0394a 100%)",
    landName: "Dragon Mountain",
    hasReadAloud: true,
  },
  {
    id: "gilroys-gobble",
    slug: "gilroys-gobble",
    title: "Gilroy's Gobble",
    description:
      "Everyone said 'gobble.' Gilroy had... different ideas. This sweet turkey and his barnyard crew are on a mission to find Gilroy's signature sound — and what they discover is that the best voice is the one that's truly yours. Perfect for: fans of Pete the Cat, Elephant & Piggie.",
    longDescription:
      "Every turkey in the barnyard goes 'gobble gobble gobble.' Every turkey except Gilroy. Gilroy has... different ideas about what his voice should sound like. As he tries out every sound he can imagine — with enthusiastic (and confused) reactions from his barnyard friends — Gilroy discovers something wonderful: your voice is yours, and yours alone is perfect. A warm, funny Thanksgiving story about confidence, individuality, and finding your own special sound.",
    image: "/images/books/gilroys-gobble.png",
    coverImage: "/images/books/gilroys-gobble.png",
    characterImage: "/images/characters/gilroys-gobble-483-height.png",
    tag: "Feel-Good",
    accentColor: "#F4A839",
    ageRange: "Ages 3–7",
    hook: "Gilroy has a plan to avoid Thanksgiving. It's not a great plan. It's a perfect plan.",
    perfectFor: "Perfect for fans of Pete the Cat and kids who are still working on their own signature move.",
    moods: ['feel-good'],
    themes: ["🦃 Confidence", "🎶 Be Yourself", "❤️ Feel-Good"],
    gradient: "linear-gradient(150deg, #fff8e1 0%, #ffcc80 30%, #ffa726 65%, #e65100 100%)",
    landName: "Gilroy's Harvest Forest",
    hasReadAloud: false,
  },
  {
    id: "finding-hampton",
    slug: "finding-hampton",
    title: "Finding Hampton",
    description:
      "What do you get a rhino who has everything? One very stressed hippo friend, that's what. Hampton is on a mission to find the most perfect birthday gift ever — which turns out to be a whole lot harder (and funnier) than it sounds. Perfect for: fans of Dragons Love Tacos, Elephant & Piggie.",
    longDescription:
      "Hampton the hippo has a BIG problem: his best friend's birthday is tomorrow, and he has absolutely no idea what to get a rhino who already has everything. He searches high and low, asks everyone he meets, and tries every idea he can think of — each one more spectacularly wrong than the last. What Hampton eventually discovers is the most perfect gift of all — and it was with him all along. A sweet, funny story about friendship, generosity, and the gift that truly matters.",
    image: "/images/books/finding-hampton.png",
    coverImage: "/images/books/finding-hampton.png",
    characterImage: "/images/characters/finding-hampton-400-height.png",
    tag: "Heartwarming",
    accentColor: "#5CB85C",
    ageRange: "Ages 3–7",
    hook: "Hampton needs the perfect birthday gift for a rhino who has everything. Spoiler: it's not a thing.",
    perfectFor: "Perfect for fans of Elephant & Piggie and the chronic over-thinkers in your life (ages 3+).",
    moods: ['feel-good'],
    themes: ["🎁 Friendship", "💚 Giving", "🤩 Heartwarming"],
    gradient: "linear-gradient(155deg, #e8f5e9 0%, #a5d6a7 30%, #66bb6a 60%, #43a047 100%)",
    landName: "Hampton's Quest Meadow",
    hasReadAloud: false,
  },
  {
    id: "lumpiest-pumpkin",
    slug: "the-lumpiest-pumpkin",
    title: "The Lumpiest Pumpkin",
    description:
      "The other pumpkins were round, smooth, and competition-ready. This one was... personality-forward. When a girl picks the lumpiest pumpkin in the patch for a carving contest, she learns that the most beautiful things are the ones nobody else wanted. Perfect for: fans of The Day the Crayons Quit, Pete the Cat.",
    longDescription:
      "In the pumpkin patch, every pumpkin was perfectly round, perfectly smooth, and perfectly ready for the carving contest. Every pumpkin except one — lumpy, lopsided, and totally overlooked. But when a little girl spots it in the corner of the patch, she sees something different: personality. What happens when she brings the lumpiest pumpkin home is a beautiful reminder that the things that make us different are often the things that make us most wonderful.",
    image: "/images/books/lumpiest-pumpkin.png",
    coverImage: "/images/books/lumpiest-pumpkin.png",
    characterImage: "/images/characters/lumpiest-pumpkin-400.png",
    tag: "Seasonal",
    accentColor: "#E07B39",
    ageRange: "Ages 3–7",
    hook: "Every pumpkin in the patch was smooth, round, and ready. This one had personality. Personality wins.",
    perfectFor: "Perfect for fans of The Bad Guys (who are secretly good) and carving contests everywhere.",
    moods: ['feel-good', 'spooky'],
    themes: ["🎃 Halloween", "🌟 Be Yourself", "🍂 Seasonal"],
    gradient: "linear-gradient(155deg, #3e1a00 0%, #6a2a0a 25%, #bf5600 55%, #ff8c00 80%, #ff6b35 100%)",
    landName: "The Lumpiest Pumpkin Patch",
    hasReadAloud: false,
  },
  {
    id: "one-tom-turkey",
    slug: "one-tom-turkey",
    title: "One Tom Turkey",
    description:
      "Sung to the tune of 'Wheels on the Bus' — except now Thanksgiving is permanently stuck in your head. You're welcome. One Tom Turkey takes the whole family through the greatest holiday traditions in a singalong kids will demand every single November. Perfect for: fans of We Don't Eat Our Classmates, Llama Llama Red Pajama.",
    longDescription:
      "Ready for Thanksgiving dinner? So is Tom Turkey — and he's brought a song along for the ride. Set to the unforgettable tune of 'Wheels on the Bus,' One Tom Turkey bounces through all the greatest Thanksgiving traditions: the parade, the pie, the cozy family table. It's a read-aloud that gets louder and sillier with every page — and kids will demand it every November for years to come. Warning: this earworm may not leave until January.",
    image: "/images/books/one-tom-turkey.png",
    coverImage: "/images/books/one-tom-turkey.png",
    characterImage: "/images/characters/turkey.jpg",
    tag: "Holiday",
    accentColor: "#C06B39",
    ageRange: "Ages 2–5",
    hook: "Sung to Wheels on the Bus — except now it's Thanksgiving and there's a turkey. Read it aloud. You will not stop.",
    perfectFor: "Perfect for Thanksgiving tables, fans of Pete the Cat, and anyone who needs a new holiday earworm.",
    moods: ['read-aloud'],
    themes: ["🦃 Thanksgiving", "🎵 Singalong", "🍁 Holiday"],
    gradient: "linear-gradient(150deg, #fff3e8 0%, #ffccaa 30%, #e08040 60%, #c0560a 100%)",
    landName: "Tom Turkey's Harvest Parade",
    hasReadAloud: false,
  },
  {
    id: "ollie-come-home",
    slug: "ollie-come-home",
    title: "Ollie Come Home",
    description:
      "Ollie had a warm bed, a loving family, and absolutely zero business going outside. He went outside anyway. This indoor cat's very first adventure is full of wonder, a little fear, and the kind of homecoming that reminds you exactly where you belong. Perfect for: fans of Where the Wild Things Are, Pete the Cat.",
    longDescription:
      "Ollie is an indoor cat with a very cozy life — a warm bed, a sunny window, and a family who loves him. He doesn't need adventure. Adventure is for other cats. But one day, the door swings open, and Ollie takes one small step outside that turns into a whole big adventure he never planned for. Full of wonder, a little bit of fear, and a whole lot of heart, Ollie Come Home is a beautiful story about the courage it takes to explore — and the sweetness of coming back.",
    image: "/images/books/ollie-come-home.png",
    coverImage: "/images/books/ollie-come-home.png",
    characterImage: "/images/characters/ollie-383-height.png",
    tag: "Adventure",
    accentColor: "#5CB85C",
    ageRange: "Ages 3–7",
    hook: "Ollie had a warm bed and zero reasons to go outside. He went outside. The whole neighborhood has opinions about this.",
    perfectFor: "Perfect for fans of Elephant & Piggie and cats who think they're ready for adventure (they're not).",
    moods: ['feel-good', 'bedtime'],
    themes: ["🐱 Adventure", "🏡 Home & Family", "💚 Heartwarming"],
    gradient: "linear-gradient(155deg, #1a2a1a 0%, #2d4a20 30%, #4a7c3f 60%, #6db85c 100%)",
    landName: "Ollie's Cozy Corner",
    hasReadAloud: false,
  },
  {
    id: "what-a-doodle-do",
    slug: "what-a-doodle-do",
    title: "What-a-Doodle-Do",
    description:
      "One very loud rooster. One very packed day. Zero chill. Doodle-Do is here to walk your family through the glorious chaos of daily life in a read-aloud so fun you'll have to do all the voices. Yes, all of them. Don't fight it. Perfect for: fans of Dragons Love Tacos, Dog Man.",
    longDescription:
      "COCK-A-DOODLE-DOO! The rooster is up — which means everyone is up. Doodle-Do has a very important job: announcing the start of the most chaotic, wonderful, laugh-out-loud day on the farm. From wake-up to bedtime, every moment is bigger, louder, and funnier than the last. A perfect read-aloud that demands silly voices, big sound effects, and at least three encores. Parents: you've been warned (and you'll love every second of it).",
    image: "/images/books/what-a-doodle-do.jpg",
    coverImage: "/images/books/what-a-doodle-do.jpg",
    characterImage: "/images/characters/doodle-do-without-background.png",
    tag: "Read Aloud",
    accentColor: "#E86BB5",
    ageRange: "Ages 2–5",
    hook: "The rooster has one volume: loud. Read this one with your whole chest — the kids will make you do it again.",
    perfectFor: "Perfect for fans of Dragons Love Tacos and households that run on a very strict schedule (set by the rooster).",
    moods: ['silly', 'read-aloud'],
    themes: ["🐓 Read Aloud", "😂 Silly", "🌅 Morning Routine"],
    gradient: "linear-gradient(155deg, #fff9e6 0%, #ffe57f 30%, #ffca28 60%, #ff8f00 100%)",
    landName: "Doodle-Do's Barnyard",
    hasReadAloud: false,
  },
  {
    id: "shut-in-button",
    slug: "the-shut-in-button",
    title: "The Shut-In Button",
    description:
      "This button had ONE job and absolutely refused to do it. Most buttons pop off by accident. This one popped off on purpose — because adventure is overrated and staying pristine is a lifestyle. Honestly? Kind of inspiring. A story about comfort zones, tiny acts of bravery, and buttons. Perfect for: fans of The Day the Crayons Quit, Elephant & Piggie.",
    longDescription:
      "Most buttons pop off by accident. This button popped off on purpose. There's a whole world out there — muddy and messy and full of things that could ruin a perfectly good coat — and this button wants absolutely no part of it. But when the little girl who owns the coat really needs all her buttons together, the Shut-In Button faces a big choice: stay safe, or be brave? A charming, funny story about comfort zones, tiny acts of courage, and the surprising bravery of very small things.",
    image: "/images/books/shut-in-button.png",
    coverImage: "/images/books/shut-in-button.png",
    characterImage: "/images/characters/shut-in-button-400.png",
    tag: "Life Lessons",
    accentColor: "#5B9BD5",
    ageRange: "Ages 4–8",
    hook: "A button pops off a jacket and decides: actually, we're staying in today. Wildly relatable. Deeply inspiring.",
    perfectFor: "Perfect for fans of The Day the Crayons Quit and the introverts in your life (ages 4+).",
    moods: ['feel-good'],
    themes: ["💙 Comfort Zone", "🏠 Cozy", "😌 Relatable"],
    gradient: "linear-gradient(150deg, #e3f0ff 0%, #b3d4f5 30%, #7bb8f0 60%, #4a9de0 100%)",
    landName: "Shut-In Button Land",
    hasReadAloud: false,
  },
  {
    id: "frog-a-dog",
    slug: "frog-a-dog",
    title: "Frog a Dog",
    description:
      "Bailey was a dog. Inside, she was definitely a frog. Her family considered this a phase. Halloween was about to prove everyone wrong in spectacular fashion. A joyful story about being exactly who you are — green, leapy tendencies and all. Perfect for: fans of We Don't Eat Our Classmates, Pete the Cat.",
    longDescription:
      "Bailey is a dog. A very normal dog. Except Bailey doesn't feel like a dog — she feels like a frog. A big, green, lily-pad-loving frog. Her family is pretty sure it's a phase. Her friends don't quite get it. But when Halloween arrives and Bailey gets to choose her own costume, the whole neighborhood is about to discover what Bailey has known all along: she's a frog-dog, and that is spectacular. A joyful, bouncy story about being exactly, wonderfully yourself.",
    image: "/images/books/frog-a-dog.png",
    coverImage: "/images/books/frog-a-dog.png",
    characterImage: "/images/characters/bailey-frog-a-dog-400.png",
    tag: "Halloween",
    accentColor: "#9B6FD0",
    ageRange: "Ages 3–7",
    hook: "Bailey was a dog with frog dreams — large, green, lily-pad frog dreams. Halloween is about to settle this once and for all.",
    perfectFor: "Perfect for Halloween, fans of We Don't Eat Our Classmates, and anyone who's ever wanted to be something completely different.",
    moods: ['silly', 'spooky'],
    themes: ["🐸 Halloween", "😂 Silly", "🐶 Be Yourself"],
    gradient: "linear-gradient(155deg, #1a1a3a 0%, #2a3a20 30%, #3a6a2a 60%, #4a9b35 100%)",
    landName: "Bailey's Frog Dream",
    hasReadAloud: false,
  },
  {
    id: "brian-the-ghost",
    slug: "brian-the-ghost",
    title: "Brian the Ghost",
    description:
      "In the town of St. Germaine, every monster had one job: spook, boo, and scare. Every monster except Brian. While Cleo the mummy and Roman the werewolf were out terrifying the neighborhood, Brian was just... waving. A heartwarming Halloween story about the friendliest ghost around — and why being different is its own kind of magic.",
    longDescription:
      "In the spooky town of St. Germaine, Halloween is serious business. Cleo the mummy wraps herself up perfectly. Roman the werewolf practices his most terrifying howl. And Brian the ghost... waves. Just waves. While every other monster is out haunting and scaring and spooking, Brian wanders through the neighborhood saying hello to everyone he meets. The kids aren't scared of him. The grown-ups aren't either. But something unexpected happens when Brian's friendliness spreads through town — something better than any scare. A heartwarming Halloween story about the extraordinary power of simply being kind.",
    image: "/images/books/brian-the-ghost.jpg",
    coverImage: "/images/books/brian-the-ghost.jpg",
    tag: "Halloween",
    accentColor: "#7B5EA7",
    ageRange: "Ages 3–7",
    hook: "All the monsters loved to spook and scare. Brian loved to wave. This is Brian's story.",
    perfectFor: "Perfect for Halloween, fans of The Bad Guys, and kids who prefer hugs over haunts.",
    moods: ['feel-good', 'spooky'],
    themes: ["👻 Halloween", "💜 Kindness", "🤝 Friendship"],
    gradient: "linear-gradient(155deg, #1a0a2a 0%, #2d1260 35%, #4a1a80 65%, #7b5ea7 100%)",
    landName: "Brian's Haunted House",
    hasReadAloud: false,
  },
];
