export interface IDiscussion {
  _id: string;
  number: number;
  operation: string;
  parentId: string | null;
  result: number | null;
  children: IDiscussion[];
  createdAt: Date;
}

export interface IPost {
  parent: string | null;
}
