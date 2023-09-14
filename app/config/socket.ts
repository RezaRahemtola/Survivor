import { io, Socket } from "socket.io-client";

import { getAccessToken } from "@/cache/accessToken";
import { MessageReceiveData } from "@/types/chat";
import axios from "@/config/axios";
import { FullUser } from "@/types/user";

type SetMessagesFunc = (prev: MessageReceiveData[]) => MessageReceiveData[];

export class ChatSocket {
	private static instance: Socket;
	private static email: string;
	private static setupStarted: boolean = false;

	public static async getInstance(setMessages: (func: SetMessagesFunc) => void) {
		if (!ChatSocket.instance && !ChatSocket.setupStarted) {
			ChatSocket.setupStarted = true;
			const accessToken = await getAccessToken();
			const response = await axios.get<FullUser>("/employees/me", {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			ChatSocket.email = response.data.email;
			ChatSocket.instance = io(process.env.EXPO_PUBLIC_API_URL!, {
				transportOptions: {
					polling: {
						extraHeaders: {
							Authorization: `Bearer ${accessToken}`,
						},
					},
				},
			});
			ChatSocket.instance.on("global-message", ({ sender, message }) => {
				const email = sender === ChatSocket.email ? "Me" : sender;
				setMessages((prev: MessageReceiveData[]) => [...prev, { message, email }]);
			});
		}

		return ChatSocket.instance;
	}
}
