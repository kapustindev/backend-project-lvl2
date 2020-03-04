import plainFormatter from './plain.js';
import treeFormatter from './tree.js';
import jsonFormatter from './json.js';

const formatMap = {
  tree: treeFormatter,
  plain: plainFormatter,
  json: jsonFormatter,
};

export default (format) => formatMap[format];
