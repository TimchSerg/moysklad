export const typeReceipts = [
  { id: "sell", name: "Чек прихода" },
  { id: "sellReturn", name: "Чек возврата прихода" },
  { id: "buy", name: "Чек расхода" },
  { id: "buyReturn", name: "Чек возврата расхода" },
];

export const typeSNO = [
  { id: "osn", name: "Общая система налогооблажения" },
  { id: "usnIncome", name: "Упрощенная (Доход)" },
  { id: "usnIncomeOutcome", name: "Упрощенная (Доход минус Расход)" },
  { id: "envd", name: "ЕНВД" },
  { id: "patent", name: "Патентная СНО" },
  { id: "esn", name: "Единый сельскохозяйственный налог" },
];

export const typeItem = [
  { id: "position", name: "Товар" },
  { id: "text", name: "Текстовая строка" },
  { id: "barcode", name: "Штрихкод" },
  { id: "userAttribute", name: "Дополнительный реквизит пользователя" },
  { id: "additionalAttribute", name: "Дополнительный реквизит чека (БСО)" },
  { id: "pictureFromMemory", name: "Картинка из памяти ККТ" },
  { id: "pixels", name: "Картинка (массив пикселей)" },
];

export const typePayment = [
  { id: "cash", name: "Наличными" },
  { id: "electronically", name: "Безналичными" },
  { id: "prepaid", name: "Предварительная оплата (аванс)" },
  { id: "credit", name: "Последующая оплата (кредит)" },
  { id: "other", name: "Иная форма оплаты (встречное предоставление)" },
];

export const paymentMethod = [
  { id: "fullPrepayment", name: "Предоплата - 100%" },
  { id: "prepayment", name: "Частичная предоплата" },
  { id: "advance", name: "Аванс" },
  { id: "fullPayment", name: "Полный расчет" },
  { id: "partialPayment", name: "Частичный расчет и кредит" },
  { id: "credit", name: "Передача в кредит" },
  { id: "creditPayment", name: "Оплата кредита" },
];

export const paymentObject = [
  { id: "commodity", name: "Товар" },
  { id: "excise", name: "Подакцизный товар" },
  { id: "job", name: "Работа" },
  { id: "service", name: "Услуга" },
  { id: "gamblingBet", name: "Ставка азартной игры" },
  { id: "gamblingPrize", name: "Выигрыш азартной игры" },
  { id: "lottery", name: "Лотерейный билет" },
  { id: "lotteryPrize", name: "Выигрыш лотереи" },
  { id: "intellectualActivity", name: "Предоставление РИД" },
  { id: "payment", name: "Платеж" },
  { id: "agentCommission", name: "Агентское вознаграждение" },
  { id: "composite", name: "Выплата" },
  { id: "another", name: "Иной предмет расчета" },
  { id: "proprietaryLaw", name: "Имущественное право" },
  { id: "nonOperatingIncome", name: "Внереализационный доход" },
  { id: "insuranceContributions", name: "Иные платежи и взносы" },
  { id: "deposit", name: "Залог" },
  { id: "merchantTax", name: "Торговый сбор" },
  { id: "resortFee", name: "Курортный сбор" },
  { id: "consumption", name: "Расход" },
  { id: "soleProprietorCPIContributions", name: "Взносы на ОПС ИП" },
  { id: "cpiContributions", name: "Взносы на ОПС" },
  { id: "cmiContributions", name: "Взносы на ОМС" },
  { id: "csiContributions", name: "Взносы на ОСС" },
  { id: "casinoPayment", name: "Платеж казино" },
];

export const typeNDS = [
  { id: "none", name: "Налогом не облагается", percent: 0 },
  { id: "vat0", name: "0%", percent: 0 },
  { id: "vat10", name: "10%", percent: 10 },
  { id: "vat18", name: "18%", percent: 18 },
  { id: "vat20", name: "20%", percent: 20 },
  { id: "vat110", name: "10/110", percent: 10 },
  { id: "vat118", name: "18/118", percent: 18 },
  { id: "vat120", name: "20/120", percent: 20 },
];

export const typeItemCode = [
  { id: "furs", name: "Меховые изделия" },
  { id: "medicines", name: "Лекарства" },
  { id: "tobacco", name: "Табачная продукция" },
  { id: "shoes", name: "Обувь" },
];

export const typeAgent = [
  { id: "bankPayingAgent", name: "Банковский платежный агент" },
  { id: "bankPayingSubagent", name: "Банковский платежный субагент" },
  { id: "payingAgent", name: "Платежный агент" },
  { id: "payingSubagent", name: "Платежный субагент" },
  { id: "attorney", name: "Поверенный" },
  { id: "commissionAgent", name: "Комиссионер" },
  { id: "another", name: "Другой тип агента" },
];

export const getRole = (code) => {
  switch (code) {
    case 8:
      return "Системный администратор";
    case 7:
      return "Администратор";
    default:
      return "Пользователь";
  }
};

export const typeMark = [
  { id: "other", name: "Другое" },
  { id: "egais20", name: "ЕГАИС 2.0" },
  { id: "egais30", name: "ЕГАИС 3.0" },
];
