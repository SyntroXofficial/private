export const missions = [
  {
    id: 1,
    title: "Website Explorer",
    description: "Stay on the website and explore our services",
    image: "/missions/website-explorer.jpg",
    background: "/missions/website-explorer.jpg",
    progress: 0,
    requirement: 5,
    unit: "minutes",
    reward: {
      type: "pin",
      rarity: "rare",
      title: "RARE PIN",
      code: "8293"
    },
    locked: false
  },
  {
    id: 2,
    title: "Community Builder",
    description: "Join our Discord community and invite new members",
    image: "/missions/discord-community.jpg",
    background: "/missions/discord-community.jpg",
    progress: 0,
    requirement: 10,
    unit: "invites",
    reward: {
      type: "pin",
      rarity: "epic",
      title: "EPIC PIN",
      code: "4617"
    },
    locked: true
  },
  {
    id: 3,
    title: "Game Master",
    description: "Play games from our premium collection",
    image: "/missions/game-master.jpg",
    background: "/missions/game-master.jpg",
    progress: 0,
    requirement: 15,
    unit: "hours",
    reward: {
      type: "pin",
      rarity: "legendary",
      title: "LEGENDARY PIN",
      code: "2716"
    },
    locked: true
  },
  {
    id: 4,
    title: "Elite Explorer",
    description: "Complete all previous missions and become an elite member",
    image: "/missions/elite-explorer.jpg",
    background: "/missions/elite-explorer.jpg",
    progress: 0,
    requirement: 100,
    unit: "percent",
    reward: {
      type: "pin",
      rarity: "mythic",
      title: "MYTHIC PIN",
      code: "5026"
    },
    locked: true
  }
];

export const categories = [
  {
    title: "MISSIONS",
    image: "/missions/website-explorer.jpg",
    description: "Complete tasks and earn rewards",
    active: true
  },
  {
    title: "STEAM",
    image: "/missions/game-master.jpg",
    description: "Steam game accounts and services"
  },
  {
    title: "CLOUD GAMING",
    image: "/missions/elite-explorer.jpg",
    description: "GeForce NOW and cloud services"
  },
  {
    title: "STREAMING",
    image: "/missions/discord-community.jpg",
    description: "Streaming platforms and content"
  },
  {
    title: "SPECIAL",
    image: "/missions/elite-explorer.jpg",
    description: "Limited time offers and events"
  }
];