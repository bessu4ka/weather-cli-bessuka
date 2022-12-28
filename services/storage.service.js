// определяет папку с дом директорией независимо от операционной системы, встроена в nodeJS
// homedir это функция которая возвращает строку с домашней директорией
import { homedir } from 'os';

// join из двух строк делает путь
// - - - -
// basename вложение последней папки
// - - - -
// dirname весь путь кроме последнего файла/папки
// - - - -
// extname для того чтобы получить расширение файла, в данном случае .json
// - - - -
// relative принимает два аргумента и говорит какой путь нужен относительно
// одного и второго пути надо пройти, например '..' или '../../..' - три шага назад
// - - - -
// isAbsolute проверка на абсолютный путь. Вернет true если путь абсолютный или false если путь относительный
// - - - -
// sep узнать какой сепаратор находится в текущей операционной системе
import { join, basename, dirname, extname, relative, isAbsolute, sep } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city',
};

const saveKeyValue = async (key, value) => {
  // console.log(basename(filePath));
  // console.log(dirname(filePath));
  // console.log(extname(filePath));
  // console.log(relative(filePath, dirname(filePath)));
  // console.log(isAbsolute(filePath));
  // console.log(sep);

  // сохраняем данные которые пришли в функцию
  let data = {};
  // проверка на то существует ли уже файл, и если существует то взять его и распарсить
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;

  // сохраняем данные в виде строки
  await promises.writeFile(filePath, JSON.stringify(data));
};

// проверка на то существует ли файл, и если существует то вытянуть из него ключ
const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
};

const isExist = async (path) => {
  try {
    // проверяет статистику файла, если файла нет то выдает ошибку
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };
