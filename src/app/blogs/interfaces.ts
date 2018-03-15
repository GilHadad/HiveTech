export interface Post {
    title: string;
    content: string;
    userUID: string;
    created: Date;
    updated: Date;
    lastCommentDate: Date;
    crowns: number;
    comments: number;
    views: number;
    relatedTags: string[];
    active: boolean;
    editable: boolean;

}

export interface Comment {
    content: string;
    userUID: string;
    created: Date;
    updated: Date;
    subTo: Comment;
    active: boolean;
    editable: boolean;

}
