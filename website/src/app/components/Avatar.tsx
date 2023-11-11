import defaultAvatar from "./default.png";
import FallbackImage from "./FallbackImage";

export default function Avatar({
	user,
	className,
	size = 256,
}: {
	user: { avatar: string; id: string };
	className?: string;
	size?: number;
}) {
	const url = user.avatar
		? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=${size}`
		: defaultAvatar.src;

	return (
		<FallbackImage
			src={url}
			fallback={defaultAvatar.src}
			alt={`tiny games, ${user.id}, avatar, webp, default, icon, bot, user, discord`}
			className={className}
			size={size}
		/>
	);
}
