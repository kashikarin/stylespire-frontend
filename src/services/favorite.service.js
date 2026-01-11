import { httpService } from "./http.service"

export const favoriteService = {
  query,
  save,
  remove,
  getEmptyFavorite,
  getById,
  getFilterFromSearchParams,
  getDefaultFavoriteFilter,
  createFavorite
}

async function query(filterFavoritesBy = {}) {
console.log('client → filterFavoritesBy:', filterFavoritesBy)  
  return httpService.get(`favorite`, filterFavoritesBy)
}

async function save(favorite) {
  try {
    if (favorite._id) {
      return await httpService.put(`favorite/${favorite._id}`, favorite)
    } else {
      return await httpService.post(`favorite`, favorite)
    }
  } catch (err) {
    console.error('Cannot save favorite', err)
    throw err
  }
}

async function remove(favoriteId) {
  await httpService.delete(`favorite/${favoriteId}`)
}

function getById(favoriteId) {
  return httpService.get(`favorite/${favoriteId}`)
}

function getEmptyFavorite() {
  return {
    imageId: '',
    description: '',
    url: '',
  }
}

function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFavoriteFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || ''
  }
  return filterBy
}

function getDefaultFavoriteFilter() {
  return {
    userId: '',
    description: '',
    imageId: '',
  }
}

function createFavorite(userId, image) {
  return {
    userId,
    image: {
      id: image.id,
      url: image.url,
      description: image.description,
    },
    createdAt: Date.now()
  }
}