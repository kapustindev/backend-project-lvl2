import plainFormatter from './plain.js';
import treeFormatter from './tree.js';

const formatMap = {
  tree: treeFormatter,
  plain: plainFormatter,
};

export default (format) => formatMap[format];
