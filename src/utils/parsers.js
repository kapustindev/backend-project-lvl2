import yaml from 'js-yaml';
import ini from 'ini';

const parserMap = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default (data, format) => parserMap[format](data);
