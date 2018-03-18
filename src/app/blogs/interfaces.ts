export interface User {
    uid: string;
    email?: string | null;
    photoURL?: string;
    displayName?: string;
  }

export interface Post {
    id: string;
    title: string;
    content: string;
    userUID: string;
    userDisplayName: string;
    userPhotoURL: string;
    created: Date;
    updated: Date;
    lastCommentDate: Date;
    cubes: number;
    comments: number;
    views: number;
    relatedTags: string[];

    active: boolean;
    editable: boolean;
    deteted: boolean;

}

export interface Comment {
    id: string;
    content: string;
    userUID: string;
    userDisplayName: string;
    userPhotoURL: string;
    created: Date;
    updated: Date;
    subTo: string;

    active: boolean;
    editable: boolean;
    deteted: boolean;

}

export interface CommentsViewBy {
    title: string;
}
