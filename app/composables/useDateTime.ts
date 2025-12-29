export default function useDateTime() {
	const currentTime = new Date().toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});

	const formatTime = (date: string) =>
		new Date(date).toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});

	return {
		currentTime,
		formatTime,
	};
}
