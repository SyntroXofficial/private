export const missions = [
  {
    id: 1,
    title: "First Steps",
    description: "Visit our website and explore the home page",
    image: "/missions/website-explorer.jpg",
    background: "/missions/website-explorer.jpg",
    progress: 0,
    requirement: 1,
    unit: "minute",
    reward: {
      type: "pin",
      rarity: "common",
      title: "COMMON PIN",
      code: "1111"
    },
    locked: false,
    completed: false,
    level: 0,
    xp: 100
  },
  {
    id: 2,
    title: "Website Explorer",
    description: "Browse through our available services",
    image: "/missions/website-explorer.jpg",
    background: "/missions/website-explorer.jpg",
    progress: 0,
    requirement: 3,
    unit: "minutes",
    reward: {
      type: "pin",
      rarity: "uncommon",
      title: "UNCOMMON PIN",
      code: "2222"
    },
    locked: false,
    completed: false,
    level: 1,
    xp: 250
  },
  {
    id: 3,
    title: "Steam Browser",
    description: "Check out our Steam accounts collection",
    image: "/missions/game-master.jpg",
    background: "/missions/game-master.jpg",
    progress: 0,
    requirement: 2,
    unit: "minutes",
    reward: {
      type: "pin",
      rarity: "rare",
      title: "RARE PIN",
      code: "8293"
    },
    locked: false,
    completed: false,
    level: 2,
    xp: 500
  },
  {
    id: 4,
    title: "Community Member",
    description: "Join our Discord community",
    image: "/missions/discord-community.jpg",
    background: "/missions/discord-community.jpg",
    progress: 0,
    requirement: 1,
    unit: "join",
    reward: {
      type: "pin",
      rarity: "rare",
      title: "RARE PIN",
      code: "8293"
    },
    locked: false,
    completed: false,
    level: 3,
    xp: 750
  },
  {
    id: 5,
    title: "Community Helper",
    description: "Invite new members to our Discord community",
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
    locked: true,
    completed: false,
    level: 5,
    xp: 1000
  },
  {
    id: 6,
    title: "Discord Champion",
    description: "Build our Discord community",
    image: "/missions/discord-community.jpg",
    background: "/missions/discord-community.jpg",
    progress: 0,
    requirement: 20,
    unit: "invites",
    reward: {
      type: "pin",
      rarity: "legendary",
      title: "LEGENDARY PIN",
      code: "2716"
    },
    locked: true,
    completed: false,
    level: 10,
    xp: 2000
  },
  {
    id: 7,
    title: "Cloud Gaming Master",
    description: "Master GeForce NOW gaming experience",
    image: "/missions/elite-explorer.jpg",
    background: "/missions/elite-explorer.jpg",
    progress: 0,
    requirement: 5,
    unit: "hours",
    reward: {
      type: "pin",
      rarity: "uncommon",
      title: "UNCOMMON PIN",
      code: "2222"
    },
    locked: true,
    completed: false,
    level: 15,
    xp: 3000
  },
  {
    id: 8,
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
    locked: true,
    completed: false,
    level: 20,
    xp: 5000
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