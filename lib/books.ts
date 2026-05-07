export interface Book {
  id: string;
  title: string;
  description: string;
  image: string;
  tag?: string;
  featured?: boolean;
  accentColor: string;
}

export const AMAZON_STORE_URL = "https://www.amazon.com/stores/page/1DEB841F-05B8-46B0-A42E-55B618C36B12?ingress=3";

export const books: Book[] = [
  {
    id: "poo-poo-face",
    title: "What's Your Poo Poo Face",
    description:
      "Spoiler: EVERYONE makes the face. Even unicorns. Even dragons. Even your teacher (especially your teacher). A little boy and his dad go on a heroic quest to uncover the one expression that unites all living things — and yes, it's exactly what you think. Perfect for: fans of Dragons Love Tacos, We Don't Eat Our Classmates.",
    image: "/images/books/poo-poo-face.png",
    tag: "Fan Favorite",
    featured: true,
    accentColor: "#9B6FD0",
  },
  {
    id: "dream-ideas",
    title: "Dream Ideas",
    description:
      "Warning: may cause extremely vivid dreams about ice cream, rocket ships, and talking animals. This bedtime singalong is the sneakiest way to get kids excited about sleep — set to a tune so catchy it'll be stuck in your head until Thursday. Perfect for: fans of Llama Llama Red Pajama, Goodnight Moon.",
    image: "/images/books/dream-ideas.png",
    tag: "Bedtime Read",
    accentColor: "#5B9BD5",
  },
  {
    id: "amber-dragon-keeper",
    title: "Amber The Dragon Keeper",
    description:
      "She thought she was just a regular kid. The dragons had other plans. When Amber stumbles into a magical land, she discovers a destiny that's way cooler than anything on her schedule — and way more responsibility than she signed up for. Perfect for: fans of Where the Wild Things Are, The Bad Guys.",
    image: "/images/books/amber-dragon-keeper.jpg",
    tag: "Adventure",
    accentColor: "#E86BB5",
  },
  {
    id: "gilroys-gobble",
    title: "Gilroy's Gobble",
    description:
      "Everyone said 'gobble.' Gilroy had... different ideas. This sweet turkey and his barnyard crew are on a mission to find Gilroy's signature sound — and what they discover is that the best voice is the one that's truly yours. Perfect for: fans of Pete the Cat, Elephant & Piggie.",
    image: "/images/books/gilroys-gobble.png",
    tag: "Feel-Good",
    accentColor: "#F4A839",
  },
  {
    id: "finding-hampton",
    title: "Finding Hampton",
    description:
      "What do you get a rhino who has everything? One very stressed hippo friend, that's what. Hampton is on a mission to find the most perfect birthday gift ever — which turns out to be a whole lot harder (and funnier) than it sounds. Perfect for: fans of Dragons Love Tacos, Elephant & Piggie.",
    image: "/images/books/finding-hampton.jpg",
    tag: "Heartwarming",
    accentColor: "#5CB85C",
  },
  {
    id: "lumpiest-pumpkin",
    title: "The Lumpiest Pumpkin",
    description:
      "The other pumpkins were round, smooth, and competition-ready. This one was... personality-forward. When a girl picks the lumpiest pumpkin in the patch for a carving contest, she learns that the most beautiful things are the ones nobody else wanted. Perfect for: fans of The Day the Crayons Quit, Pete the Cat.",
    image: "/images/books/lumpiest-pumpkin.png",
    tag: "Seasonal",
    accentColor: "#E07B39",
  },
  {
    id: "one-tom-turkey",
    title: "One Tom Turkey",
    description:
      "Sung to the tune of 'Wheels on the Bus' — except now Thanksgiving is permanently stuck in your head. You're welcome. One Tom Turkey takes the whole family through the greatest holiday traditions in a singalong kids will demand every single November. Perfect for: fans of We Don't Eat Our Classmates, Llama Llama Red Pajama.",
    image: "/images/books/one-tom-turkey.png",
    tag: "Holiday",
    accentColor: "#C06B39",
  },
  {
    id: "ollie-come-home",
    title: "Ollie Come Home",
    description:
      "Ollie had a warm bed, a loving family, and absolutely zero business going outside. He went outside anyway. This indoor cat's very first adventure is full of wonder, a little fear, and the kind of homecoming that reminds you exactly where you belong. Perfect for: fans of Where the Wild Things Are, Pete the Cat.",
    image: "/images/books/ollie-come-home.png",
    tag: "Adventure",
    accentColor: "#5CB85C",
  },
  {
    id: "what-a-doodle-do",
    title: "What-a-Doodle-Do",
    description:
      "One very loud rooster. One very packed day. Zero chill. Doodle-Do is here to walk your family through the glorious chaos of daily life in a read-aloud so fun you'll have to do all the voices. Yes, all of them. Don't fight it. Perfect for: fans of Dragons Love Tacos, Dog Man.",
    image: "/images/books/what-a-doodle-do.jpg",
    tag: "Read Aloud",
    accentColor: "#E86BB5",
  },
  {
    id: "shut-in-button",
    title: "The Shut-In Button",
    description:
      "This button had ONE job and absolutely refused to do it. Most buttons pop off by accident. This one popped off on purpose — because adventure is overrated and staying pristine is a lifestyle. Honestly? Kind of inspiring. A story about comfort zones, tiny acts of bravery, and buttons. Perfect for: fans of The Day the Crayons Quit, Elephant & Piggie.",
    image: "/images/books/shut-in-button.png",
    tag: "Life Lessons",
    accentColor: "#5B9BD5",
  },
  {
    id: "frog-a-dog",
    title: "Frog a Dog",
    description:
      "Bailey was a dog. Inside, she was definitely a frog. Her family considered this a phase. Halloween was about to prove everyone wrong in spectacular fashion. A joyful story about being exactly who you are — green, leapy tendencies and all. Perfect for: fans of We Don't Eat Our Classmates, Pete the Cat.",
    image: "/images/books/frog-a-dog.png",
    tag: "Halloween",
    accentColor: "#9B6FD0",
  },
];
