export type HistoryItem = {
	game: string;
	gameElo: number;
	globalElo: number;
	playedAt: number;
	duration: number;
	turns: number;
	result: 0 | 1 | 2;
	type: "normal-mode" | "friendly-mode";
};

export type UserCoins = {
	crystals: number;
	crowns: number;
	bestCrystals: number;
	bestCrowns: number;
};

export type Guild = {
	wins: 0;
	losses: 0;
	draws: 0;
	winstreak: 0;
	time: 0;
};

export type Game = {
	guilds: { [key: string]: Guild };
	elo: number;
};

export type User = {
	id: string;
	username: string;
	avatar: string;
	discriminator: string;
	public_flags: number;
	premium_type: number;
	flags: number;
	banner: string | null;
	accentColor: number | null;
	global_name: string | null;
	avatar_decoration_data: string | null;
	banner_color: string | null;
	mfa_enabled: boolean;
	locale: string;
	elo: number;
	premiumEnd: number | null;
	emote: string | null;
	status: string | null;
	lang: string;
	createdAt: number;
	lastDaily: number;
	lastWeekly: number;
	supportJoined: boolean;
	invitedUsers: string[];
	blockedNotif: string[];
	games: { [key: string]: Game };
	ranking: { xp: number; level: number };
	coins: UserCoins;
	history: HistoryItem[];
	style: {
		themes: { list: string[]; selected: string | null };
		backgrounds: { list: string[]; selected: string | null };
	};
};
