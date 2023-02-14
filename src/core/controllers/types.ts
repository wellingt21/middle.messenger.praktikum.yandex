export interface ChatsData {
    title: string;
}

export interface DeleteChatData {
    chatId: number;
}

export interface ChatsUsersData {
    users: [number];
    chatId: number;
}

export interface SelectChatData {
    title: string,
    avatar?: string,
    id: number,
}


export interface UserInfo {
    id?: number;
    first_name: string;
    second_name: string;
    display_name?: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface UpdateProfileData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface UserSearchData {
    login: string
}

export interface UpdatePasswordData {
    oldPassword: string;
    newPassword: string;
}
