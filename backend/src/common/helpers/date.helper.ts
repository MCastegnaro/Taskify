export class DateHandler {
  /**
   * Converts a string in MM/DD/YYYY format to a Date object
   * @param dateStr - Date in format MM/DD/YYYY
   * @returns Object Date
   */
  static stringToDate(dateStr: string): Date {
    if (!dateStr) throw new Error('Invalid Date!');

    const [month, day, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  /**
   * Converts a Date object to a string in MM/DD/YYYY format
   * @param date - Object Date
   * @returns String in format MM/DD/YYYY
   */
  static dateToString(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Data inválida!');
    }

    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adiciona zero à esquerda
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }
}
