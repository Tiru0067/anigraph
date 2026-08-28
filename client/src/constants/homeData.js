import { GitBranch, Layers, Database } from "lucide-react";

export const POPULAR_SEARCHES = [
  "Attack on Titan",
  "MAPPA",
  "WIT Studio",
  "Tetsurou Araki",
  "Chainsaw Man",
  "Steins;Gate",
  "Military",
  "Psychological",
];

export const FALLBACK_ANIME = [
  {
    id: 154587,
    titleRomaji: "Sousou no Frieren",
    titleEnglish: "Frieren: Beyond Journey's End",
    coverImage:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
    averageScore: 91,
    format: "TV",
    seasonYear: 2023,
    studios: ["Madhouse"],
  },
  {
    id: 16498,
    titleRomaji: "Shingeki no Kyojin",
    titleEnglish: "Attack on Titan",
    coverImage:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-buvcRTBx4NSm.jpg",
    averageScore: 85,
    format: "TV",
    seasonYear: 2013,
    studios: ["WIT Studio"],
  },
  {
    id: 5114,
    titleRomaji: "Hagane no Renkinjutsushi: FULLMETAL ALCHEMIST",
    titleEnglish: "Fullmetal Alchemist: Brotherhood",
    coverImage:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5114-nSWCgQlmOMtj.jpg",
    averageScore: 90,
    format: "TV",
    seasonYear: 2009,
    studios: ["Bones"],
  },
  {
    id: 127230,
    titleRomaji: "Chainsaw Man",
    titleEnglish: "Chainsaw Man",
    coverImage:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-DdP4vAdssLoz.png",
    averageScore: 83,
    format: "TV",
    seasonYear: 2022,
    studios: ["MAPPA"],
  },
  {
    id: 9253,
    titleRomaji: "Steins;Gate",
    titleEnglish: "Steins;Gate",
    coverImage:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9253-tIUXF2gfU8Sg.jpg",
    averageScore: 89,
    format: "TV",
    seasonYear: 2011,
    studios: ["White Fox"],
  },
  {
    id: 1535,
    titleRomaji: "DEATH NOTE",
    titleEnglish: "Death Note",
    coverImage:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-kUgkcrfOrkUM.jpg",
    averageScore: 84,
    format: "TV",
    seasonYear: 2006,
    studios: ["Madhouse"],
  },
  {
    id: 144411,
    titleRomaji: "BLEACH: Sennen Kessen-hen",
    titleEnglish: "Bleach: Thousand-Year Blood War",
    coverImage:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx144411-xTvHspTqVq0F.jpg",
    averageScore: 88,
    format: "TV",
    seasonYear: 2022,
    studios: ["Pierrot"],
  },
  {
    id: 1575,
    titleRomaji: "Code Geass: Hangyaku no Lelouch",
    titleEnglish: "Code Geass: Lelouch of the Rebellion",
    coverImage:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1575-REPLACE.jpg",
    averageScore: 85,
    format: "TV",
    seasonYear: 2006,
    studios: ["Sunrise"],
  },
  {
    id: 11061,
    titleRomaji: "HUNTER×HUNTER (2011)",
    titleEnglish: "Hunter x Hunter (2011)",
    coverImage:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11061-REPLACE.jpg",
    averageScore: 89,
    format: "TV",
    seasonYear: 2011,
    studios: ["Madhouse"],
  },
  {
    id: 101922,
    titleRomaji: "Kimetsu no Yaiba",
    titleEnglish: "Demon Slayer: Kimetsu no Yaiba",
    coverImage:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg",
    averageScore: 83,
    format: "TV",
    seasonYear: 2019,
    studios: ["ufotable"],
  },
  {
    id: 101348,
    titleRomaji: "VINLAND SAGA",
    titleEnglish: "Vinland Saga",
    coverImage:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101348-REPLACE.jpg",
    averageScore: 88,
    format: "TV",
    seasonYear: 2019,
    studios: ["WIT Studio"],
  },
  {
    id: 120377,
    titleRomaji: "Cyberpunk: Edgerunners",
    titleEnglish: "Cyberpunk: Edgerunners",
    coverImage:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx120377-REPLACE.jpg",
    averageScore: 85,
    format: "ONA",
    seasonYear: 2022,
    studios: ["Trigger"],
  },
  {
    id: 113415,
    titleRomaji: "Jujutsu Kaisen",
    titleEnglish: "Jujutsu Kaisen",
    coverImage:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg",
    averageScore: 84,
    format: "TV",
    seasonYear: 2020,
    studios: ["MAPPA"],
  },
  {
    id: 21827,
    titleRomaji: "Violet Evergarden",
    titleEnglish: "Violet Evergarden",
    coverImage:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21827-REPLACE.jpg",
    averageScore: 85,
    format: "TV",
    seasonYear: 2018,
    studios: ["Kyoto Animation"],
  },
];

export const STATS_ITEMS = [
  {
    key: "totalAnime",
    title: "ANIME ENTRIES",
    description:
      "Curated top anime and seasonal hits loaded with rich AniList metadata.",
  },
  {
    key: "totalStudios",
    title: "STUDIOS & DIRECTORS",
    description:
      "Animation houses like WIT, MAPPA, Madhouse & series chief directors.",
  },
  {
    key: "totalGenres",
    title: "GENRES & RANKED TAGS",
    description: "Thematic categories with community relevance percentages.",
  },
  {
    key: "totalRelationships",
    title: "GRAPH RELATIONSHIPS",
    description:
      "Multi-hop Cypher connections enabling explainable recommendations.",
  },
];

export const GRAPH_FEATURES = [
  {
    id: "multi-hop",
    icon: GitBranch,
    title: "Multi-Hop Creative Links",
    description:
      "Connects anime through shared directors (e.g. Tetsurou Araki for Death Note & Attack on Titan) and animation studios in 2-hop traversals.",
    snippet: "MATCH (a)-[r1]->(shared)<-[r2]-(rec)",
  },
  {
    id: "weighted-scores",
    icon: Layers,
    title: "Weighted Relationship Scores",
    description:
      "Tags hold community relevance percentages (rank: 95%) directly on the edge, dynamically scaling the recommendation match score.",
    snippet: "(r1.rank * r2.rank) / 1000.0",
  },
  {
    id: "explainable",
    icon: Database,
    title: "Explainable Recommendations",
    description:
      "No black-box recommendations. Every suggestion displays exact reasons like 'Same Director', 'Same Studio', or 'Shared Tag: Military'.",
    snippet: "collect({ type: type(r1), name: ... })",
  },
];
