import {pagePropRelationFrom, pagePropRichTextFrom, pagePropTitleFrom, propFilesFrom, propNumberFrom} from '../utils';
import {
  zPagePropFiles as zNPagePropFiles,
  zPagePropNumber as zNPagePropNumber,
  zPagePropRelation as zNPagePropRelation,
  zPagePropRichText as zNPagePropRichText,
  zPagePropTitle as zNPagePropTitle,
} from './input';

export const zPropFiles = zNPagePropFiles.transform(propFilesFrom);
export const zPropFilesValue = zPropFiles.transform(({value}) => value.map(({value}) => value));
export const zPropFilesFirstValue = zPropFiles.transform(({value}) => value[0].value);

export const zPropNumber = zNPagePropNumber.transform(propNumberFrom);
export const zPropNumberValue = zPropNumber.transform(({value}) => value);

export const zPropRelation = zNPagePropRelation.transform(pagePropRelationFrom);
export const zPropRelationValue = zPropRelation.transform(({value}) => value);
export const zPropRelationFirstValue = zPropRelation.transform(({value}) => value[0]);

export const zPropRichText = zNPagePropRichText.transform(pagePropRichTextFrom);
export const zPropRichTextValue = zPropRichText.transform(({value}) => value[0].text);

export const zPropTitle = zNPagePropTitle.transform(pagePropTitleFrom);
export const zPropTitleValue = zPropTitle.transform(({value}) => value[0].text);
