export interface CommentModel {
  id?: number;
  content: string;
  date: string;
  parent_id?: number;
  postId: number;
  user: string;
}
