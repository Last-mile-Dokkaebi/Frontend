const DateToString = (date:Date) => {
  const dateYear  = date.getFullYear();
  const dateMonth = date.getMonth();
  const dateDay   = date.getDate();

  const stringDate = `${dateYear}-${dateMonth.toString().padStart(2, '0')}-${dateDay.toString().padStart(2, '0')}`

  return stringDate;
}

export{
  DateToString,
}