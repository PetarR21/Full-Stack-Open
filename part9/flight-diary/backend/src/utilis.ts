import { NewDiaryEntry, Visibility, Weather } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather)
    .map((v) => v.toString())
    .includes(param);
};

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility)
    .map((v) => v.toString())
    .includes(param);
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date');
  }

  return date;
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isString(weather) || !isWeather(weather)) {
    throw new Error('Incorrect or missing weather');
  }

  return weather;
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
    throw new Error('Incorrect or missing visibility');
  }

  return visibility;
};

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
    const newDiaryEntry: NewDiaryEntry = {
      comment: parseComment(object.comment),
      date: parseDate(object.date),
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
    };

    return newDiaryEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewDiaryEntry;
