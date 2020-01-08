export interface CommentModel {
    id: number;
    content: string;
    date: Date;
    parent_id: number;
    postId: number;
    user: string;
}
