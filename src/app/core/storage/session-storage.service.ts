import { Injectable } from '@angular/core';

const APP_PREFIX = 'APP-';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  setItem<TItem>(key: string, value: TItem): void {
    return sessionStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  getItem<TItem>(key: string): TItem | null {
    return JSON.parse(<string>sessionStorage.getItem( `${ APP_PREFIX }${ key }` )) as TItem;
  }

  updateItem<TItem>(key: string, value: TItem): void {
    return sessionStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  removeItem(key: string): void {
    return sessionStorage.removeItem(`${APP_PREFIX}${key}`);
  }

  clear(): void {
    return sessionStorage.clear();
  }
}
