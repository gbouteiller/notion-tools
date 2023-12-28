import fs from 'fs-extra';
import {ofetch} from 'ofetch';
import sharp from 'sharp';
import {getExtensionFromUrl, getImageDimensions, getImageName, type ImageDimensions} from '../utils';

export function createNotionAssets({baseUrl, dir}: CreateNotionAssetsParams) {
  fs.ensureDirSync(dir);

  async function cacheImage({alt, aspectRatio, height, src, width}: CacheImageParams) {
    const {lqip, img} = getImageDimensions({aspectRatio, height, width});
    const name = getImageName({alt, extension: getExtensionFromUrl(src), ...img});
    const path = `${dir}/${name}`;
    const buffer = await (fs.existsSync(path) ? fs.readFile(path) : ofetch(src, {responseType: 'arrayBuffer'}));
    const sharpImg = sharp(buffer);
    const [rLqip] = await Promise.allSettled([
      sharpImg.resize(lqip.width, lqip.height).blur(1).webp({alphaQuality: 20, quality: 20, smartSubsample: true}).toBuffer(),
      ...(fs.existsSync(path) ? [] : [sharpImg.resize(img.width, img.height).toFile(path)]),
    ]);
    if (rLqip.status === 'rejected') throw new Error('LQIP_ERROR');
    return {lqip: `data:image/webp;base64,${rLqip.value.toString('base64')}`, src: `${baseUrl}/${name}`, ...img};
  }

  return {cacheImage};
}
// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type CreateNotionAssetsParams = {
  baseUrl: string;
  dir: string;
};

export type CacheImageParams = ImageDimensions & {alt: string; aspectRatio?: number; src: string};
