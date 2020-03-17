import _ from 'lodash';

const stringifyValue = (data) => (_.isObject(data) ? '[complex value]' : data);

const statusMap = ({
  key, status, value, prevValue, children,
}, path, func) => {
  const result = {
    added: () => `Property '${path}${key}' was ${status} with value: ${stringifyValue(value)}`,
    deleted: () => `Property '${path}${key}' was ${status}`,
    changed: () => `Property '${path}${key}' was ${status} from ${stringifyValue(prevValue)} to ${stringifyValue(value)}`,
    unchanged: () => null,
    nested: () => func(children, `${path}${key}.`),
  };
  return result[status]();
};

const render = (tree, path = '') => {
  const result = tree.map((node) => statusMap(node, path, render));
  return _.flattenDeep(result);
};

export default (ast) => _.compact(render(ast)).join('\n');
