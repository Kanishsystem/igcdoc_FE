import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QueryStringParameters } from './query-string-parameters';
import { UrlBuilder } from './url-builder';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsService {

  constructor() { }
  public createUrl(action: string): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(environment.BASE_API_URL[0],action);
    return urlBuilder.toString(); 
  }

  public createUrlWithQueryParameters(action: string,  queryStringHandler?: (queryStringParameters: QueryStringParameters) => void): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(environment.BASE_API_URL[0], action);
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  public createUrlWithPathVariables(action: string, pathVariables: any[] = []): string {
    let encodedPathVariablesUrl: string = '';
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl +=
          `/${encodeURIComponent(pathVariable.toString())}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(environment.BASE_API_URL[0], `${action}${encodedPathVariablesUrl}`
    );
    return urlBuilder.toString();
  }
}
