import { or, head, prop, find, propEq, compose, __ } from 'ramda'

export const formatMoney = (number) =>
  number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.').slice(0, -3);

export const getFilters = compose(
  or(__, []),
  prop('path_from_root'),
  or(__, {}),
  head,
  or(__, []),
  prop('values'),
  or(__, {}),
  find(propEq('id', 'category')),
  or(__, []),
  prop('filters'),
  or(__, {})
)
