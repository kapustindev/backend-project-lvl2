import _ from 'lodash';

const stringifyValue = (data) => (_.isObject(data) ? '[complex value]' : data);

const render = (tree, path = '') => {
  const result = tree.reduce((acc, node) => {
    const {
      key, status, children, value, prevValue,
    } = node;

    const makeLine = () => {
      switch (status) {
        case 'added':
          return [...acc, `Property '${path}${key}' was ${status} with value: ${stringifyValue(value)}`];
        case 'deleted':
          return [...acc, `Property '${path}${key}' was ${status}`];
        case 'changed':
          return [...acc, `Property '${path}${key}' was ${status} from ${stringifyValue(prevValue)} to ${stringifyValue(value)}`];
        case 'unchanged':
          return [...acc];
        case 'nested':
          return [...acc, ...render(children, `${path}${key}.`)];
        default:
          throw new Error(`Error! '${status}' is invalid`);
      }
    };
    return makeLine();
  }, []);
  return result;
};

export default (ast) => _.compact(render(ast)).join('\n');
