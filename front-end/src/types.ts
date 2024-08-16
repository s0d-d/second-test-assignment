export interface IDiscussion {
  _id: string;
  number: number;
  operation: string;
  parentId: string | null;
  result: number | null;
  children: IDiscussion[];
  createdAt: Date;
  userId: string;
}

export interface IPost {
  parent: string | null;
}

export interface IUser {
  id: string;
  username: string;
}

export type IAuthStatus = "authenticated" | "unauthenticated" | "loading";
