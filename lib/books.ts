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
      "Going number two on the potty isn't always easy! A little boy and his dad scour the earth to uncover a remedy to poo poo problems, discovering that even teachers, firefighters, unicorns, and dragons make a PooPoo face when it's time to go.",
    image: "/images/books/poo-poo-face.png",
    tag: "Fan Favorite",
    featured: true,
    accentColor: "#9B6FD0",
  },
  {
    id: "dream-ideas",
    title: "Dream Ideas",
    description:
      "There are so many things out there to dream about when you fall asleep each night. Here are some of our favorites, and in song form!",
    image: "/images/books/dream-ideas.png",
    tag: "Bedtime Read",
    accentColor: "#5B9BD5",
  },
  {
    id: "amber-dragon-keeper",
    title: "Amber The Dragon Keeper",
    description:
      "Amber is a little girl who lives the same life as every other child her age, but when she enters a magical and mystical land she becomes someone far more.",
    image: "/images/books/amber-dragon-keeper.jpg",
    tag: "Adventure",
    accentColor: "#E86BB5",
  },
  {
    id: "gilroys-gobble",
    title: "Gilroy's Gobble",
    description:
      "Gilroy the turkey works with his barnyard pals to try and figure out what his turkey call should sound like, in this tale about building confidence and self-esteem.",
    image: "/images/books/gilroys-gobble.png",
    tag: "Feel-Good",
    accentColor: "#F4A839",
  },
  {
    id: "finding-hampton",
    title: "Finding Hampton",
    description:
      "What on EARTH could a rhino want for her birthday!!! Follow Hampton on his quest to find the most perfect birthday gift for his best rhino friend!",
    image: "/images/books/finding-hampton.jpg",
    tag: "Heartwarming",
    accentColor: "#5CB85C",
  },
  {
    id: "lumpiest-pumpkin",
    title: "The Lumpiest Pumpkin",
    description:
      "In this tale about a girl on her quest to win a carving contest, she stumbles upon an unsuspecting pumpkin and learns an important lesson about inner beauty.",
    image: "/images/books/lumpiest-pumpkin.png",
    tag: "Seasonal",
    accentColor: "#E07B39",
  },
  {
    id: "one-tom-turkey",
    title: "One Tom Turkey",
    description:
      'An instant Thanksgiving classic! One Tom Turkey follows the tune of "Wheels on the Bus" as it sings you through some of the best Thanksgiving traditions.',
    image: "/images/books/one-tom-turkey.png",
    tag: "Holiday",
    accentColor: "#C06B39",
  },
  {
    id: "ollie-come-home",
    title: "Ollie Come Home",
    description:
      "Ollie is an indoor cat with a loving family and an adventurous spirit. Join him as he discovers his favorite place of all when he experiences the outdoors for the first time.",
    image: "/images/books/ollie-come-home.png",
    tag: "Adventure",
    accentColor: "#5CB85C",
  },
  {
    id: "what-a-doodle-do",
    title: "What-a-Doodle-Do",
    description:
      "Doodle-Do is a very busy rooster. Let him guide you and your family through the hustle and bustle of his daily life! Perfect for sharing out loud with your little ones.",
    image: "/images/books/what-a-doodle-do.jpg",
    tag: "Read Aloud",
    accentColor: "#E86BB5",
  },
  {
    id: "shut-in-button",
    title: "The Shut-In Button",
    description:
      "Buttons fall off jackets all the time, but how often do they pop off on purpose? Follow a baby button who avoids adventure to stay as pristine and new as the day he was born.",
    image: "/images/books/shut-in-button.png",
    tag: "Life Lessons",
    accentColor: "#5B9BD5",
  },
  {
    id: "frog-a-dog",
    title: "Frog a Dog",
    description:
      "Despite her canine upbringing, Bailey has always longed to live the frog life. Read along as we unveil how Halloween brings her closer to her dream.",
    image: "/images/books/frog-a-dog.png",
    tag: "Halloween",
    accentColor: "#9B6FD0",
  },
];

