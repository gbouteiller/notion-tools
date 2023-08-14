import {z, type ZodRawShape} from 'zod';
import {pageCommonFrom, pageFrom} from '../utils';
import {zPageAny as zNPageAny, zPageCommon as zNPageCommon} from './input';

// MAIN ====================================================================================================================================
export const zPageAny = zNPageAny.transform(pageFrom);
export type PageAny = z.infer<typeof zPageAny>;

export function zPage<P extends ZodRawShape>(props: P) {
  return z.object({...zNPageCommon.shape, properties: z.object(props)}).transform(pageCommonFrom);
}

export function zPageProps<P extends ZodRawShape>(props: P) {
  return zPage(props).transform(({properties}) => properties!);
}
