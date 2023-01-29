export abstract class HttpHelper {
  /**
   * Метод выполняет запрос и преобразует ответ в JSON
   * Тип ответа будет брать из дженерик параметра Response
   */

  public static async fetchAsJson<Response>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response> {
    const response = await fetch(input, init);
    const responseText = await response.text();
    const result: Response = JSON.parse(responseText);
    return result;
  }
}
