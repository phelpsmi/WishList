import { ApiUrlService } from "../api-url.servive";

export class BaseApiService {
  constructor(private areaUrl: string, private apiUrlService: ApiUrlService) {};

  protected getUrl(actionRoute: string): string{
    const urlList = [this.apiUrlService.getApiUrl()];
    urlList.push(...this.areaUrl.split('/'), ...actionRoute.split('/'));
    return urlList.filter(s => s).join('/');
  }
}
