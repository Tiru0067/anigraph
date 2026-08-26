/**
 * Stats Controller
 * Returns graph summary metrics (total anime, studios, staff, genres, relationships)
 */
export const getStats = async (req, res, next) => {
  try {
    // Stub data for initial verification before DB is connected
    res.status(200).json({
      success: true,
      data: {
        totalAnime: 2,
        totalStudios: 2,
        totalGenres: 5,
        totalRelationships: 8
      }
    });
  } catch (error) {
    next(error);
  }
};
