export interface Book {
  id: string;
  title: string;
  description: string;
  image: string;
  tag?: string;
  featured?: boolean;
  accentColor: string;
  ageRange: string;
  hook: string;
  perfectFor: string;
  moods?: string[];
  /** Path to this book's interactive land / reader page, if one exists. */
  readUrl?: string;
}

export const AMAZON_STORE_URL = "https://www.amazon.com/stores/page/1DEB841F-05B8-46B0-A42E-55B618C36B12?ingress=3";

export const books: Book[] = [
  {
    id: "poo-poo-face",
    readUrl: "/read/poo-poo-face",
    title: "What's Your Poo Poo Face",
    description:
      "Spoiler: EVERYONE makes the face. Even unicorns. Even dragons. Even your teacher (especially your teacher). A little boy and his dad go on a heroic quest to uncover the one expression that unites all living things — and yes, it's exactly what you think. Perfect for: fans of Dragons Love Tacos, We Don't Eat Our Classmates.",
    image: "/images/books/poo-poo-face.png",
    tag: "Fan Favorite",
    featured: true,
    accentColor: "#9B6FD0",
    ageRange: "Ages 2–5",
    hook: "Every kid has one. A laugh-out-loud mirror moment that turns bathtime into showtime.",
    perfectFor: "Perfect for fans of Dragons Love Tacos and everyone who has ever made a face they wish someone hadn't seen.",
    moods: ['silly'],
  },
  {
    id: "dream-ideas",
    title: "Dream Ideas",
    description:
      "Warning: may cause extremely vivid dreams about ice cream, rocket ships, and talking animals. This bedtime singalong is the sneakiest way to get kids excited about sleep — set to a tune so catchy it'll be stuck in your head until Thursday. Perfect for: fans of Llama Llama Red Pajama, Goodnight Moon.",
    image: "/images/books/dream-ideas.png",
    tag: "Bedtime Read",
    accentColor: "#5B9BD5",
    ageRange: "Ages 2–5",
    hook: "What if your best idea ever came to you in a dream? And what if you forgot it by morning? A book about chasing the ones worth catching.",
    perfectFor: "Perfect for bedtime stall tactics and fans of Goodnight Moon (but funnier).",
    moods: ['bedtime', 'read-aloud'],
  },
  {
    id: "amber-dragon-keeper",
    readUrl: "/read/amber-dragon-keeper",
    title: "Amber The Dragon Keeper",
    description:
      "She thought she was just a regular kid. The dragons had other plans. When Amber stumbles into a magical land, she discovers a destiny that's way cooler than anything on her schedule — and way more responsibility than she signed up for. Perfect for: fans of Where the Wild Things Are, The Bad Guys.",
    image: "/images/books/amber-dragon-keeper.png",
    tag: "Adventure",
    accentColor: "#E86BB5",
    ageRange: "Ages 4–8",
    hook: "Amber does everything her friends do — except one thing. The twist on the last page? Kids demand it again immediately.",
    perfectFor: "Perfect for fans of Where the Wild Things Are and future herpetologists.",
    moods: ['feel-good'],
  },
  {
    id: "gilroys-gobble",
    title: "Gilroy's Gobble",
    description:
      "Everyone said 'gobble.' Gilroy had... different ideas. This sweet turkey and his barnyard crew are on a mission to find Gilroy's signature sound — and what they discover is that the best voice is the one that's truly yours. Perfect for: fans of Pete the Cat, Elephant & Piggie.",
    image: "/images/books/gilroys-gobble.png",
    tag: "Feel-Good",
    accentColor: "#F4A839",
    ageRange: "Ages 3–7",
    hook: "Gilroy has a plan to avoid Thanksgiving. It's not a great plan. It's a perfect plan.",
    perfectFor: "Perfect for fans of Pete the Cat and kids who are still working on their own signature move.",
    moods: ['feel-good'],
  },
  {
    id: "finding-hampton",
    title: "Finding Hampton",
    description:
      "What do you get a rhino who has everything? One very stressed hippo friend, that's what. Hampton is on a mission to find the most perfect birthday gift ever — which turns out to be a whole lot harder (and funnier) than it sounds. Perfect for: fans of Dragons Love Tacos, Elephant & Piggie.",
    image: "/images/books/finding-hampton.png",
    tag: "Heartwarming",
    accentColor: "#5CB85C",
    ageRange: "Ages 3–7",
    hook: "Hampton needs the perfect birthday gift for a rhino who has everything. Spoiler: it's not a thing.",
    perfectFor: "Perfect for fans of Elephant & Piggie and the chronic over-thinkers in your life (ages 3+).",
    moods: ['feel-good'],
  },
  {
    id: "lumpiest-pumpkin",
    title: "The Lumpiest Pumpkin",
    description:
      "The other pumpkins were round, smooth, and competition-ready. This one was... personality-forward. When a girl picks the lumpiest pumpkin in the patch for a carving contest, she learns that the most beautiful things are the ones nobody else wanted. Perfect for: fans of The Day the Crayons Quit, Pete the Cat.",
    image: "/images/books/lumpiest-pumpkin.png",
    tag: "Seasonal",
    accentColor: "#E07B39",
    ageRange: "Ages 3–7",
    hook: "Every pumpkin in the patch was smooth, round, and ready. This one had personality. Personality wins.",
    perfectFor: "Perfect for fans of The Bad Guys (who are secretly good) and carving contests everywhere.",
    moods: ['feel-good', 'spooky'],
  },
  {
    id: "one-tom-turkey",
    title: "One Tom Turkey",
    description:
      "Sung to the tune of 'Wheels on the Bus' — except now Thanksgiving is permanently stuck in your head. You're welcome. One Tom Turkey takes the whole family through the greatest holiday traditions in a singalong kids will demand every single November. Perfect for: fans of We Don't Eat Our Classmates, Llama Llama Red Pajama.",
    image: "/images/books/one-tom-turkey.png",
    tag: "Holiday",
    accentColor: "#C06B39",
    ageRange: "Ages 2–5",
    hook: "Sung to Wheels on the Bus — except now it's Thanksgiving and there's a turkey. Read it aloud. You will not stop.",
    perfectFor: "Perfect for Thanksgiving tables, fans of Pete the Cat, and anyone who needs a new holiday earworm.",
    moods: ['read-aloud'],
  },
  {
    id: "ollie-come-home",
    title: "Ollie Come Home",
    description:
      "Ollie had a warm bed, a loving family, and absolutely zero business going outside. He went outside anyway. This indoor cat's very first adventure is full of wonder, a little fear, and the kind of homecoming that reminds you exactly where you belong. Perfect for: fans of Where the Wild Things Are, Pete the Cat.",
    image: "/images/books/ollie-come-home.png",
    tag: "Adventure",
    accentColor: "#5CB85C",
    ageRange: "Ages 3–7",
    hook: "Ollie had a warm bed and zero reasons to go outside. He went outside. The whole neighborhood has opinions about this.",
    perfectFor: "Perfect for fans of Elephant & Piggie and cats who think they're ready for adventure (they're not).",
    moods: ['feel-good', 'bedtime'],
  },
  {
    id: "what-a-doodle-do",
    title: "What-a-Doodle-Do",
    description:
      "One very loud rooster. One very packed day. Zero chill. Doodle-Do is here to walk your family through the glorious chaos of daily life in a read-aloud so fun you'll have to do all the voices. Yes, all of them. Don't fight it. Perfect for: fans of Dragons Love Tacos, Dog Man.",
    image: "/images/books/what-a-doodle-do.jpg",
    tag: "Read Aloud",
    accentColor: "#E86BB5",
    ageRange: "Ages 2–5",
    hook: "The rooster has one volume: loud. Read this one with your whole chest — the kids will make you do it again.",
    perfectFor: "Perfect for fans of Dragons Love Tacos and households that run on a very strict schedule (set by the rooster).",
    moods: ['silly', 'read-aloud'],
  },
  {
    id: "shut-in-button",
    title: "The Shut-In Button",
    description:
      "This button had ONE job and absolutely refused to do it. Most buttons pop off by accident. This one popped off on purpose — because adventure is overrated and staying pristine is a lifestyle. Honestly? Kind of inspiring. A story about comfort zones, tiny acts of bravery, and buttons. Perfect for: fans of The Day the Crayons Quit, Elephant & Piggie.",
    image: "/images/books/shut-in-button.png",
    tag: "Life Lessons",
    accentColor: "#5B9BD5",
    ageRange: "Ages 4–8",
    hook: "A button pops off a jacket and decides: actually, we're staying in today. Wildly relatable. Deeply inspiring.",
    perfectFor: "Perfect for fans of The Day the Crayons Quit and the introverts in your life (ages 4+).",
    moods: ['feel-good'],
  },
  {
    id: "frog-a-dog",
    title: "Frog a Dog",
    description:
      "Bailey was a dog. Inside, she was definitely a frog. Her family considered this a phase. Halloween was about to prove everyone wrong in spectacular fashion. A joyful story about being exactly who you are — green, leapy tendencies and all. Perfect for: fans of We Don't Eat Our Classmates, Pete the Cat.",
    image: "/images/books/frog-a-dog.png",
    tag: "Halloween",
    accentColor: "#9B6FD0",
    ageRange: "Ages 3–7",
    hook: "Bailey was a dog with frog dreams — large, green, lily-pad frog dreams. Halloween is about to settle this once and for all.",
    perfectFor: "Perfect for Halloween, fans of We Don't Eat Our Classmates, and anyone who's ever wanted to be something completely different.",
    moods: ['silly', 'spooky'],
  },
  {
    id: "brian-the-ghost",
    title: "Brian the Ghost",
    description:
      "In the town of St. Germaine, every monster had one job: spook, boo, and scare. Every monster except Brian. While Cleo the mummy and Roman the werewolf were out terrifying the neighborhood, Brian was just... waving. A heartwarming Halloween story about the friendliest ghost around — and why being different is its own kind of magic.",
    image: "/images/books/brian-the-ghost.jpg",
    tag: "Halloween",
    accentColor: "#7B5EA7",
    ageRange: "Ages 3–7",
    hook: "All the monsters loved to spook and scare. Brian loved to wave. This is Brian's story.",
    perfectFor: "Perfect for Halloween, fans of The Bad Guys, and kids who prefer hugs over haunts.",
    moods: ['feel-good', 'spooky'],
  },
];
