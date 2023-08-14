import type {ListOpts} from '../schemas';

export function listQueryParamsFrom({cursor, take}: ListOpts) {
  return new URLSearchParams([cursor ? ['start_cursor', cursor] : undefined, take ? ['page_size', `${take}`] : undefined].filter(Boolean));
}

export function listQueryFrom(opts: ListOpts) {
  const params = listQueryParamsFrom(opts);
  return params.size > 0 ? `?${params.toString()}` : '';
}
