import kebabCase from 'just-kebab-case';
import {extname} from 'pathe';
import {parseFilename} from 'ufo';

export function getExtensionFromUrl(src: string) {
  const filename = parseFilename(src, {strict: true});
  if (!filename) throw new Error('UNDEFINED_FILENAME');
  return extname(filename);
}

export function getImageDimensions({aspectRatio: ar, height, width}: GetImageDimensionsParams) {
  const lqip = {height: Math.round((16 * height) / width), width: 16};
  if (!ar) return {img: {height, width}, lqip};
  if (ar >= width / height) return {img: {height: Math.round(width / ar), width}, lqip: {...lqip, height: Math.round(lqip.width / ar)}};
  return {img: {height, width: Math.round(height * ar)}, lqip: {...lqip, width: Math.round(lqip.height * ar)}};
}

export function getImageName({alt, extension, height, width}: GetImageNameParams) {
  return `${kebabCase(alt)}_${width}x${height}${extension}`;
}

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type ImageDimensions = {height: number; width: number};
//export type GetImageBlurSvg = ImageDimensions
export type GetImageDimensionsParams = ImageDimensions & {aspectRatio?: number};
export type GetImageNameParams = ImageDimensions & {alt: string; extension: string};
