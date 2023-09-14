import { getAccessToken } from '@/cache/accessToken';
import { MessageReceiveData } from '@/types/chat';
import { Socket, io } from 'socket.io-client';

export class TrombiSocket {
	private static instance: Socket;

	public static async getInstance(oldMessages: MessageReceiveData[], setMessages: any) {
		if (!TrombiSocket.instance) {
			const token = await getAccessToken();
			TrombiSocket.instance = io(`${process.env.EXPO_PUBLIC_API_URL}`, {
				transportOptions: {
					polling: {
						extraHeaders: {
							Authorization: `Bearer ${token}`,
						},
					},
				},
			});
			TrombiSocket.instance.on("connect", function () {
				console.log("ConnectedReceiver");
			});

			TrombiSocket.instance.on("global-message", function ({ sender, message }) {
				console.log(`${sender} said: ${message}`);
				setMessages([...oldMessages, { message: message, email: sender }]);
			});

			TrombiSocket.instance.on("events", function (data) {
				console.log("Revent", data);
			});

			TrombiSocket.instance.on("exception", function (data) {
				console.error("Rexception", data);
			});

			TrombiSocket.instance.on("disconnect", function () {
				console.warn("RDisconnected");
			});
		}

		return TrombiSocket.instance;
	}
}