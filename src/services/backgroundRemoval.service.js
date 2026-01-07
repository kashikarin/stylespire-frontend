import { httpService } from "./http.service.js"


export const backgroundRemovalService = {
    removeBackgroundFromImage
}

async function removeBackgroundFromImage(imageUrl) {
    const response = await httpService.post(
        'background/remove', 
        { imageUrl },
        { responseType: 'blob' }
    )

    const blob =
    response instanceof Blob
      ? response
      : response?.data instanceof Blob
      ? response.data
      : null

  if (!blob) {
    throw new Error('Background removal did not return a Blob')
  }

    return URL.createObjectURL(blob)
}