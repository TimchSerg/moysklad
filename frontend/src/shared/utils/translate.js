let arr_ru = [
  "Я", "я", "Ю", "ю", "Ч", "ч", "Ш", "ш", "Щ",
  "щ", "Ж", "ж", "А", "а", "Б", "б", "В", "в",
  "Г", "г", "Д", "д", "Е", "е", "Ё", "ё", "З",
  "з", "И", "и", "Й", "й", "К", "к", "Л", "л",
  "М", "м", "Н", "н", "О", "о", "П", "п", "Р",
  "р", "С", "с", "Т", "т", "У", "у", "Ф", "ф",
  "Х", "х", "Ц", "ц", "Ы", "ы", "Ь", "ь", "Ъ",
  "ъ", "Э", "э",
];
  
let arr_en = [
  "Ya", "ya", "Yu", "yu", "Ch", "ch", "Sh", "sh",
  "Sh", "sh", "Zh", "zh", "A", "a", "B", "b", "V",
  "v", "G", "g", "D", "d", "E", "e", "E", "e", "Z",
  "z", "I", "i", "J", "j", "K", "k", "L", "l", "M",
  "m", "N", "n", "O", "o", "P", "p", "R", "r", "S",
  "s", "T", "t", "U", "u", "F", "f", "H", "h", "C",
  "c", "Y", "y", "`", "`", "'", "'", "E", "e",
];
  
  export function cyril_to_latin(text) {
    for (let i = 0; i < arr_ru.length; i++) {
      let reg = new RegExp(arr_ru[i], "g");
      text = text.replace(reg, arr_en[i]);
    }
    return text;
  }
  
  export function latin_to_cyril(text) {
    for (let i = 0; i < arr_en.length; i++) {
      let reg = new RegExp(arr_en[i], "g");
      text = text.replace(reg, arr_ru[i]);
    }
    return text;
  }
  
  export let isCyrillic = function (str) {
    return /[а-я]/i.test(str);
  };