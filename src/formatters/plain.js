import _ from 'lodash';

const stringifyValue = (data) => (_.isObject(data) ? '[complex value]' : data);

const render = (tree, path = '') => {
  const result = tree.map((node) => {
    const {
      key, status, children, value, prevValue,
    } = node;

    const statusMap = {
      added: () => `Property '${path}${key}' was ${status} with value: ${stringifyValue(value)}`,
      deleted: () => `Property '${path}${key}' was ${status}`,
      changed: () => `Property '${path}${key}' was ${status} from ${stringifyValue(prevValue)} to ${stringifyValue(value)}`,
      unchanged: () => '',
      nested: () => render(children, `${path}${key}.`),
    };

    return statusMap[status]();
  });
  return _.flattenDeep(result);
};

export default (ast) => _.compact(render(ast)).join('\n');
