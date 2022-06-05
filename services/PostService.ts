import DbService from "./DbService";
import { IService } from "./IService";

export interface IPost {
  uid: string | number;
  text: string;
  avatarUrl: string;
  listImageUrl: string[];
  userName: string;
  content: string;
  createdDate: string;
  selectedIndexImage: number | 0;
  likedUsers: string[];
}

export default class PostService implements IService<IPost> {
  private static instance: PostService;
  private constructor() {}

  public static getInstance(): PostService {
    if (!PostService.instance) {
      PostService.instance = new PostService();
    }

    return PostService.instance;
  }

  static async addUser(user: IPost): Promise<void> {
    await PostService.getInstance().add(user);
  }

  static async updateUser(user: IPost): Promise<IPost> {
    return await PostService.getInstance().update(user);
  }

  static async deleteUser(id: string) {
    await PostService.getInstance().delete(id);
  }

  static async listUser(): Promise<IPost[]> {
    return await PostService.getInstance().list();
  }

  async add(post: IPost): Promise<void> {
    await DbService.add(post, `users/${post.uid}`);
  }

  async update(T: IPost): Promise<IPost> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<IPost> {
    throw new Error("Method not implemented.");
  }

  async list(): Promise<IPost[]> {
    throw new Error("Method not implemented.");
  }
}
