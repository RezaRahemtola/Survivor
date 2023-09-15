import { io, Socket } from "socket.io-client";

import { getAccessToken } from "@/cache/accessToken";
import { ChatMessageType, MessageReceiveData } from "@/types/chat";

type SetMessagesFunc = (prev: MessageReceiveData[]) => MessageReceiveData[];

export class ChatSocket {
	private static instances: {
		[key in ChatMessageType]?: Socket;
	} = {
		direct: undefined,
		global: undefined,
	};

	public static async getInstance(
		type: ChatMessageType,
		setMessages: (func: SetMessagesFunc) => void,
		currentUserEmail: string,
	) {
		if (!ChatSocket.instances[type]) {
			const accessToken = await getAccessToken();
			ChatSocket.instances[type] = io(process.env.EXPO_PUBLIC_API_URL!, {
				transportOptions: {
					polling: {
						extraHeaders: {
							Authorization: `Bearer ${accessToken}`,
						},
					},
				},
			});
			ChatSocket.instances[type]!.on(`${type}-message`, ({ sender, message }) => {
				const email = sender === currentUserEmail ? "Me" : sender;
				console.log(`Received ${type} message: ${message} from ${sender} (${email})`);
				setMessages((prev: MessageReceiveData[]) => [...prev, { message, email }]);
			});
		}

		return ChatSocket.instances[type];
	}
}
