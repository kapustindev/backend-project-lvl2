import _ from 'lodash';

const stringifyValue = (data) => (_.isObject(data) ? '[complex value]' : data);

const render = (tree, path = '') => {
  const leafs = Object.keys(tree);
  return leafs.reduce((acc, w) => {
    const {
      value, children, prevValue, status,
    } = tree[w];
    const getBegin = () => `Property '${path}${w}' was ${status}`;
    const statusMap = {
      added: `${getBegin()} with value: ${stringifyValue(value)}`,
      deleted: `${getBegin()}`,
      changed: `${getBegin()} from ${stringifyValue(prevValue)} to ${stringifyValue(value)}`,
    };
    if (!_.has(tree[w], 'children')) {
      return status === 'default' ? acc : [...acc, statusMap[status]];
    }
    return [...acc, ...render(children, `${path}${w}.`)];
  }, []);
};

export default (ast) => render(ast).join('\n');
