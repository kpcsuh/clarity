const prefix = "p1storage";

export class BaseStorage {

    static get(storage: Storage, key: string) {
        let storageKey = BaseStorage.getStorageKey(key);
        let value = storage.getItem(storageKey)
        return BaseStorage.getActualObject(value)
    }

    static set(storage: Storage, key: string, value: any): void {
        let storageKey = BaseStorage.getStorageKey(key);
        let stringifiedValue = BaseStorage.getStringifiedValue(value);
        storage.setItem(storageKey, stringifiedValue);
    }


    static remove(storage: Storage, key: string): void {
        let storageKey = BaseStorage.getStorageKey(key);
        storage.removeItem(storageKey);
    }

    static getStorageKey(key: string): string {
        return `${prefix}_${key}`;
    }

    private static getStringifiedValue(value: any): string {
        return typeof value === "string" ? value : JSON.stringify(value);
    }

    private static getActualObject(value: string): any {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }

}
