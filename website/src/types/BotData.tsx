export interface BotData {
	id: string;
	username: string;
	avatar: string;
	discriminator: string;
	public_flags: number;
	premium_type: number;
	flags: number;
	bot: boolean;
	accent_color: number | null;
	global_name: string | null;
	avatar_decoration_data: string | null;
	banner_color: string | null;
	mfa_enabled: boolean;
	locale: string;
	email: string | null;
	verified: boolean;
	bio: string;
	commands: { [key: string]: string };
	images: { number: number; weight: number };
	played: { number: number; duration: number };
	banned: string[];
	guild_count: number;
}
