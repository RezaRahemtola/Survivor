import { io, Socket } from "socket.io-client";

import { getAccessToken } from "@/cache/accessToken";
import { ChatMessageType, MessageReceiveData } from "@/types/chat";

type SetMessagesFunc = (prev: MessageReceiveData[]) => MessageReceiveData[];

export class ChatSocket {
	private static instance: Socket;

	public static async getInstance(
		type: ChatMessageType,
		setMessages: (func: SetMessagesFunc) => void,
		currentUserEmail: string,
	) {
		if (!ChatSocket.instance) {
			const accessToken = await getAccessToken();
			ChatSocket.instance = io(process.env.EXPO_PUBLIC_API_URL!, {
				transportOptions: {
					polling: {
						extraHeaders: {
							Authorization: `Bearer ${accessToken}`,
						},
					},
				},
			});
			ChatSocket.instance.on(`${type}-message`, ({ sender, message }) => {
				const email = sender === currentUserEmail ? "Me" : sender;
				setMessages((prev: MessageReceiveData[]) => [...prev, { message, email }]);
			});
		}

		return ChatSocket.instance;
	}
}
