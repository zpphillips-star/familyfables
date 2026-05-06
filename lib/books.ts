export interface Book {
  id: string;
  title: string;
  description: string;
  image: string;
  tag?: string;
  featured?: boolean;
  accentColor: string;
}

export const AMAZON_STORE_URL =
  "https://www.amazon.com/stores/page/1DEB841F-05B8-46B0-A42E-55B618C36B12?ingress=3";

export const INSTAGRAM_URL = "https://www.instagram.com/familyfables";

export const books: Book[] = [
  {
    id: "poo-poo-face",
    title: "What's Your Poo Poo Face",
    description:
      "Going number two on the potty isn't always easy! A little boy and his dad scour the earth to uncover a remedy to poo poo problems, discovering that even teachers, firefighters, unicorns, and dragons make a PooPoo face when it's time to go.",
    image:
      "https://www.familyfables.org/wp-content/uploads/2020/10/deep-purple-poo-poo-face-title.png",
    tag: "Fan Favorite",
    featured: true,
    accentColor: "#9B6FD0",
  },
  {
    id: "dream-ideas",
    title: "Dream Ideas",
    description:
      "There are so many things out there to dream about when you fall asleep each night. Here are some of our favorites, and in song form!",
    image:
      "https://www.familyfables.org/wp-content/uploads/2020/10/Dream-Ideas-Paperback-Cover-400.png",
    tag: "Bedtime Read",
    accentColor: "#5B9BD5",
  },
  {
    id: "amber-dragon-keeper",
    title: "Amber The Dragon Keeper",
    description:
      "Amber is a little girl who lives the same life as every other child her age, but when she enters a magical and mystical land she becomes someone far more.",
    image:
      "https://www.familyfables.org/wp-content/uploads/2020/10/amber-the-dragon-keeper.jpg",
    tag: "Adventure",
    accentColor: "#E86BB5",
  },
  {
    id: "gilroys-gobble",
    title: "Gilroy's Gobble",
    description:
      "Gilroy the turkey works with his barnyard pals to try and figure out what his turkey call should sound like, in this tale about building confidence and self-esteem.",
    image:
      "https://www.familyfables.org/wp-content/uploads/2020/10/gilroys-gobble-400.png",
    tag: "Feel-Good",
    accentColor: "#F4A839",
  },
  {
    id: "finding-hampton",
    title: "Finding Hampton",
    description:
      "What on EARTH could a rhino want for her birthday!!! Follow Hampton on his quest to find the most perfect birthday gift for his best rhino friend!",
    image:
      "https://www.familyfables.org/wp-content/uploads/2022/10/Front-Cover-scaled.jpg",
    tag: "Heartwarming",
    accentColor: "#5CB85C",
  },
  {
    id: "lumpiest-pumpkin",
    title: "The Lumpiest Pumpkin",
    description:
      "In this tale about a girl on her quest to win a carving contest, she stumbles upon an unsuspecting pumpkin and learns an important lesson about inner beauty.",
    image:
      "https://www.familyfables.org/wp-content/uploads/2020/10/Lumpiest-Pumpkin-Front-Cover-400.png",
    tag: "Seasonal",
    accentColor: "#E07B39",
  },
  {
    id: "one-tom-turkey",
    title: "One Tom Turkey",
    description:
      'An instant Thanksgiving classic! One Tom Turkey follows the tune of "Wheels on the Bus" as it sings you through some of the best Thanksgiving traditions.',
    image:
      "https://www.familyfables.org/wp-content/uploads/2022/10/Final-One-Tom-Turkey-Square-Cover.png",
    tag: "Holiday",
    accentColor: "#C06B39",
  },
  {
    id: "immortal-firefly",
    title: "The Immortal Firefly",
    description:
      "Written by Victor Plotkin, published posthumously. The book that started it all — a timeless story that sparked the creation of Family Fables and honors a lifetime of creativity.",
    image: "",
    tag: "Origin Story",
    featured: true,
    accentColor: "#F4A839",
  },
];
