interface IncomingMessage {
    id: string;
    accountId: string;
    msgid: string;
    from: {
        address: string;
        name: string;
    };
    to: {
        address: string;
        name: string;
    }[];
    subject: string;
    intro: string;
    seen: boolean;
    isDeleted: boolean;
    hasAttachments: boolean;
    size: number;
    downloadUrl: string;
    createdAt: string;
    updatedAt: string;
}

interface TransformedMessage {
    id: string;
    accountId: string;
    msgid: string;
    from: {
        address: string;
        name: string;
    };
    to: {
        address: string;
        name: string;
    }[];
    subject: string;
    intro: string;
    seen: boolean;
    isDeleted: boolean;
    hasAttachments: boolean;
    size: number;
    downloadUrl: string;
    createdAt: string;
    updatedAt: string;
}

export const transformIncomingMessage = (message: IncomingMessage): TransformedMessage => {
    return {
        id: message.id,
        accountId: message.accountId,
        msgid: message.msgid,
        from: message.from,
        to: message.to,
        subject: message.subject,
        intro: message.intro,
        seen: message.seen,
        isDeleted: message.isDeleted,
        hasAttachments: message.hasAttachments,
        size: message.size,
        downloadUrl: message.downloadUrl,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt
    };
};
