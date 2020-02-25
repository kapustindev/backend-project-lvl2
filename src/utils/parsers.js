import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

export default (link) => {
  const ending = path.extname(link);
  if (ending === '.json') {
    return JSON.parse;
  }
  if (ending === '.yml') {
    return yaml.safeLoad;
  }
  return ini.parse;
};
