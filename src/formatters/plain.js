import _ from 'lodash';

const stringifyValue = (data) => (_.isObject(data) ? '[complex value]' : data);

const render = (tree, path = '') => {
  const result = tree.reduce((acc, node) => {
    const {
      key, status, children, value, prevValue,
    } = node;

    const statusMap = {
      added: `Property '${path}${key}' was ${status} with value: ${stringifyValue(value)}`,
      deleted: `Property '${path}${key}' was ${status}`,
      changed: `Property '${path}${key}' was ${status} from ${stringifyValue(prevValue)} to ${stringifyValue(value)}`,
      unchanged: '',
      nested: children ? render(children, `${path}${key}.`) : '',
    };
    return _.flatten([...acc, statusMap[status]]);
  }, []);
  return result;
};

export default (ast) => _.compact(render(ast)).join('\n');
