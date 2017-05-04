import { BaseStorage } from "./base-storage";


export class CoreStorage {

    constructor(private storage: Storage) {
    }

    get(key: string): any {
        return BaseStorage.get(this.storage, key);
    }

    set(key: string, value: any): void {
        BaseStorage.set(this.storage, key, value);
    }

    remove(key: string): void {
        BaseStorage.remove(this.storage, key);
    }

    clear(): void {
        this.storage.clear();
    }
}
