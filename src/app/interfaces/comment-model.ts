export interface CommentModel {
    id: Number;
    content: String;
    date: Date;
    parentId: Number;
    postId: Number;
    user: String;
}
