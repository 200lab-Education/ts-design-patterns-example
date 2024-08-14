export class AppSingleton {
  private constructor() { }
  static instance: AppSingleton;

  private storage: Record<string, any> = [];

  getValue(key: string): any | undefined {
    return this.storage[key];
  };

  setValue(key: string, val: any) {
    return this.storage[key] = val;
  }

  static getInstance(): AppSingleton {
    if (!this.instance) {
      this.instance = new AppSingleton();
      console.log("just once");
    }

    return this.instance;
  }
}

AppSingleton.getInstance().setValue('pattern', 'singleton');
AppSingleton.getInstance().setValue('category', 'creational');

console.log(
  AppSingleton.getInstance().getValue('pattern'),
  AppSingleton.getInstance().getValue('category'),
);