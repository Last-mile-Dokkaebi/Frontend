/**
 * 날짜 형식을 문자형식으로 바꾸어 반환합니다
 * @param date String으로 반환되기를 원하는 날짜
 * @returns 'YYYY-MM-DD'형태의 String
 */
const DateToString = (date:Date): string => {
  const dateYear  = date.getFullYear();
  const dateMonth = date.getMonth()+1;
  const dateDay   = date.getDate();

  const stringDate = `${dateYear}-${dateMonth.toString().padStart(2, '0')}-${dateDay.toString().padStart(2, '0')}`

  return stringDate;
}

/**
 * 날짜(시간을 포함한) 형식을 문자형식으로 바꾸어 반환합니다.
 * @param date String으로 변환되기를 원하는 시간
 * @returns 'HH:MM'형태의 String
 */
const TimeToString = (date:Date): string => {
  const stringTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`

  return stringTime;
}

export{
  DateToString,
  TimeToString
}
