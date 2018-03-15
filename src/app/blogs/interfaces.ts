export interface User {
    uid: string;
    email?: string | null;
    photoURL?: string;
    displayName?: string;
  }

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
    subTo: string;
    active: boolean;
    editable: boolean;

}
