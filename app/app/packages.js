import { get, compact, keys } from 'lodash';

const use = (modules = []) => ({
  reducers: combine(modules, 'reducers'),
  actions: combine(modules, 'actions'),
  sagas: combine(modules, 'sagas'),
  selectors: combine(modules, 'selectors'),
});

const combine = (modules = [], name = '') => {
  if (!name) return {};

  const propFromModules = compact(
    modules.map((module) => get(module, name, null)),
  );

  return propFromModules.reduce(
    (merged, property) =>
      !property
        ? merged
        : keys(property).reduce(
            (accumulator, key) => ({
              ...accumulator,
              [key]: accumulator[key] || property[key],
            }),
            merged,
          ),
    {},
  );
};

export const packages = use([
  require('@woozy/app'),
  require('@woozy/theme'),
  require('@woozy/user'),
  require('@woozy/conversations'),
  require('@woozy/settings'),
]);
