import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

export default (link) => {
  const ending = path.extname(link);
  const parserMap = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  return parserMap[ending];
};
