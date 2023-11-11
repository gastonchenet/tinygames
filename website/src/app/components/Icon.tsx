import defaultAvatar from "./default.png";
import FallbackImage from "./FallbackImage";

export default function Icon({
	guild,
	className,
	size = 256,
}: {
	guild: { icon: string; id: string };
	className?: string;
	size?: number;
}) {
	const url = guild.icon
		? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=${size}`
		: defaultAvatar.src;

	return (
		<FallbackImage
			src={url}
			fallback={defaultAvatar.src}
			alt={`tiny games, ${guild.id}, avatar, webp, default, icon, bot, guild, server, discord`}
			className={className}
			size={size}
		/>
	);
}
