import DbService from "./DbService";

export interface IUser {
  userId: string | null;
  email: string | null;
  emailVerified: boolean;
  accessToken: Promise<string> | null;
}

export default class UserService implements IService<IUser> {
  private static instance: UserService;
  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  static async addUser(user: IUser): Promise<void> {
    await UserService.getInstance().add(user);
  }

  static async updateUser(user: IUser): Promise<IUser> {
    return await UserService.getInstance().update(user);
  }

  static async deleteUser(id: string) {
    await UserService.getInstance().delete(id);
  }

  static async listUser(): Promise<IUser[]> {
    return await UserService.getInstance().list();
  }

  async add(user: IUser): Promise<void> {
    await DbService.add(user, `users/${user.userId}`);
  }

  async update(T: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  async list(): Promise<IUser[]> {
    throw new Error("Method not implemented.");
  }
}
