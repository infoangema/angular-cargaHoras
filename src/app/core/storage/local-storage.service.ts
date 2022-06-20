import { Injectable } from '@angular/core';

const APP_PREFIX = 'APP-';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setItem<TItem>(key: string, value: TItem): void {
    return localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  getItem<TItem>(key: string): TItem | null {
    const data = localStorage.getItem( `${ APP_PREFIX }${ key }` );
    return this.getParse( data );
  }

  private getParse<TItem>( data: string | null ): TItem | null {
    if (data !== 'undefined') {
      return JSON.parse( <string>data ) as TItem;
    } else {
      return null;
    }
  }

  updateItem<TItem>(key: string, value: TItem): void {
    return localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  removeItem(key: string): void {
    return localStorage.removeItem(`${APP_PREFIX}${key}`);
  }

  clear(): void {
    return localStorage.clear();
  }
}
