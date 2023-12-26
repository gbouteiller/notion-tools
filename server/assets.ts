import fs from 'fs-extra';
import {ofetch} from 'ofetch';
import sharp from 'sharp';
import {getExtensionFromUrl, getImageDimensions, getImageName, type ImageDimensions} from '../utils';

export function createNotionAssets({baseUrl, dir}: CreateNotionAssetsParams) {
  fs.ensureDirSync(dir);

  async function cacheImage({alt, aspectRatio, height, src, width}: CacheImageParams) {
    const dimensions = getImageDimensions({aspectRatio, height, width});
    const name = getImageName({alt, extension: getExtensionFromUrl(src), ...dimensions});
    const path = `${dir}/${name}`;
    if (!fs.existsSync(path)) {
      const buffer = await ofetch(src, {responseType: 'arrayBuffer'});
      await sharp(buffer).resize(dimensions.width, dimensions.height).toFile(path);
    }
    return `${baseUrl}/${name}`;
  }

  return {cacheImage};
}
// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type CreateNotionAssetsParams = {
  baseUrl: string;
  dir: string;
};

export type CacheImageParams = ImageDimensions & {alt: string; aspectRatio?: number; src: string};
