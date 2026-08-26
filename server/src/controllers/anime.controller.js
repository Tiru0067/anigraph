/**
 * Anime Controller
 * Handles anime listing, search, details, and recommendations
 */

const mockAnime = [
  {
    id: 16498,
    titleRomaji: "Shingeki no Kyojin",
    titleEnglish: "Attack on Titan",
    format: "TV",
    episodes: 25,
    averageScore: 85,
    seasonYear: 2013,
    coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg",
    genres: ["Action", "Drama", "Fantasy", "Mystery"],
    studios: ["WIT Studio", "MAPPA"]
  },
  {
    id: 113415,
    titleRomaji: "Jujutsu Kaisen",
    titleEnglish: "JUJUTSU KAISEN",
    format: "TV",
    episodes: 24,
    averageScore: 86,
    seasonYear: 2020,
    coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pUbAw8.jpg",
    genres: ["Action", "Fantasy", "Supernatural"],
    studios: ["MAPPA"]
  }
];

/**
 * Get anime list with optional search query
 * Route: GET /api/anime?search=...
 */
export const getAnimeList = async (req, res, next) => {
  try {
    const { search } = req.query;
    let results = mockAnime;

    if (search) {
      const query = search.toLowerCase();
      results = results.filter(
        (a) =>
          a.titleRomaji?.toLowerCase().includes(query) ||
          a.titleEnglish?.toLowerCase().includes(query)
      );
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get anime by ID
 * Route: GET /api/anime/:id
 */
export const getAnimeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const animeId = parseInt(id, 10);

    const anime = mockAnime.find((item) => item.id === animeId);

    if (!anime) {
      return res.status(404).json({
        success: false,
        message: `Anime with ID ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: anime
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get recommendations for a specific anime
 * Route: GET /api/anime/:id/recommendations
 */
export const getAnimeRecommendations = async (req, res, next) => {
  try {
    const { id } = req.params;
    const animeId = parseInt(id, 10);

    // Mock recommendations for initial testing
    const recommendations = mockAnime
      .filter((item) => item.id !== animeId)
      .map((item) => ({
        ...item,
        recommendationScore: 88,
        matchReasons: ["Shared Studio: MAPPA", "Shared Genre: Action, Fantasy"]
      }));

    res.status(200).json({
      success: true,
      animeId,
      count: recommendations.length,
      data: recommendations
    });
  } catch (error) {
    next(error);
  }
};
