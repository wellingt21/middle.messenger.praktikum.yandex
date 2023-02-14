import {UserInfo} from "../../core/controllers/types";

export interface ChatListProp {
    id?: number;
    title?: string;
    avatar?: string | null;
    unread_count?: number;
    last_message?: LastMessage | null; // todo: maybe implement object
}

export interface ChatListProps {
    chats?: ChatListProp[];
    events?: {
        click: (event: Event) => void;
    }
}


interface LastMessage {
    user: UserInfo;
    time: string;
    content: string;
}

export interface ChatListProp {
    id?: number;
    title?: string;
    avatar?: string | null;
    unread_count?: number;
    last_message?: LastMessage | null ;
}

export interface ChatListProps {
    chats?: ChatListProp[];
    events?: {
        click: (event: Event) => void;
    }
}