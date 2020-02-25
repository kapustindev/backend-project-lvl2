import yaml from 'js-yaml';
import path from 'path';

export default (link) => {
  const ending = path.extname(link);
  const parse = ending === '.json' ? JSON.parse : yaml.safeLoad;
  return parse;
};
