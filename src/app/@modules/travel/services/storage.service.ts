import { Inject, Injectable } from '@angular/core';
import { Stop } from 'app/interfaces';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
// key that is used to access the data in local storageconst
const STORAGE_KEY = 'fav_list';
@Injectable()
export class LocalStorageService {
  anotherTodolist = [];
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}
  public storeOnLocalStorage(from: Stop, to: Stop): void {
    // get array of tasks from local storage
    const currentFavList = this.storage.get(STORAGE_KEY) || [];
    // push new task to array
    currentFavList.push({
      from: from,
      to: to,
    });
    // insert updated array to local storage
    this.storage.set(STORAGE_KEY, currentFavList);
  }

  public getFavList() {
    return this.storage.get(STORAGE_KEY) || [];
  }
}
