import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  getItem<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (value) return JSON.parse(value) as T;
    return null;
  }

  setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
