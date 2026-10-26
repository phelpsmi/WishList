import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

    private apiUrl = '';

    constructor() {

    }

    /**
     * Use to change api url
     * @data type: string
     */
    setApiUrl(url?: string) {
      this.apiUrl = url || location.origin;
    }

    getApiUrl(): string {
      return this.apiUrl;
    }
}
