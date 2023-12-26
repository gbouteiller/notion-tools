import {extname} from 'pathe';
import {kebabCase} from 'scule';
import {parseFilename} from 'ufo';

export function getExtensionFromUrl(src: string) {
  const filename = parseFilename(src, {strict: true});
  if (!filename) throw new Error('UNDEFINED_FILENAME');
  return extname(filename);
}

export function getImageDimensions({aspectRatio, height, width}: GetImageDimensionsParams) {
  if (!aspectRatio) return {height, width};
  if (aspectRatio >= width / height) return {height: Math.round(width / aspectRatio), width};
  return {height, width: Math.round(height * aspectRatio)};
}

export function getImageName({alt, extension, height, width}: GetImageNameParams) {
  return `${kebabCase(alt)}_${width}x${height}${extension}`;
}

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type ImageDimensions = {height: number; width: number};
export type GetImageDimensionsParams = ImageDimensions & {aspectRatio?: number};
export type GetImageNameParams = ImageDimensions & {alt: string; extension: string};
