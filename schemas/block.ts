import {listBlockFrom} from '../utils';
import {zListBlock as zNListBlock} from './input';

export const zListBlock = zNListBlock.transform(listBlockFrom);