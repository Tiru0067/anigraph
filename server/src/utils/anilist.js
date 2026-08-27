import logger from './logger.js';

const ANILIST_GRAPHQL_ENDPOINT = 'https://graphql.anilist.co';

const ANIME_PAGE_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(type: ANIME, sort: [POPULARITY_DESC], isAdult: false) {
        id
        title {
          romaji
          english
          native
        }
        description
        format
        status
        episodes
        duration
        averageScore
        popularity
        season
        seasonYear
        coverImage {
          extraLarge
          large
          medium
          color
        }
        bannerImage
        genres
        tags {
          id
          name
          rank
          category
          isMediaSpoiler
        }
        studios {
          edges {
            isMain
            node {
              id
              name
              isAnimationStudio
            }
          }
        }
        staff(sort: [RELEVANCE, ROLE], perPage: 8) {
          edges {
            role
            node {
              id
              name {
                full
              }
              image {
                medium
              }
              primaryOccupations
            }
          }
        }
        characters(sort: [ROLE, RELEVANCE], perPage: 6) {
          edges {
            role
            node {
              id
              name {
                full
              }
              image {
                medium
              }
            }
            voiceActors(language: JAPANESE) {
              id
              name {
                full
              }
              image {
                medium
              }
              languageV2
            }
          }
        }
        relations {
          edges {
            relationType
            node {
              id
              title {
                romaji
                english
              }
              type
              format
              coverImage {
                medium
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetches a page of popular/trending anime with graph relation data from AniList
 * @param {number} page
 * @param {number} perPage
 * @returns {Promise<Array>} Array of anime objects
 */
export const fetchAniListData = async (page = 1, perPage = 50) => {
  logger.info(`Fetching page ${page} (${perPage} items) from AniList GraphQL API...`);

  const response = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      query: ANIME_PAGE_QUERY,
      variables: { page, perPage }
    })
  });

  if (!response.ok) {
    throw new Error(`AniList API responded with HTTP status ${response.status}: ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors && json.errors.length > 0) {
    throw new Error(`AniList GraphQL errors: ${json.errors.map(e => e.message).join(', ')}`);
  }

  return json.data?.Page?.media || [];
};

export default {
  fetchAniListData
};
