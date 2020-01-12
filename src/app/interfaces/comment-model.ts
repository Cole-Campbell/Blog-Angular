export interface CommentModel {
    id: string;
    content: string;
    date: Date;
    parent_id: number;
    postId: number;
    user: string;
}
