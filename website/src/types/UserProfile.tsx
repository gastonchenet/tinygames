export type UserCoins = {
	crystals: number;
	crowns: number;
	bestCrystals: number;
	bestCrowns: number;
};

export type HistorySlot = {
	game: string;
	gameElo: number;
	globalElo: number;
	playedAt: number;
	duration: number;
	turns: number;
	result: 0 | 1 | 2;
	type: "normal-mode" | "friendly-mode";
};

export type UserProfile = {
	id: string;
	avatar: string;
	tag: string;
	premium: boolean;
	createdAt: number;
	elo: number;
	ranking: { xp: number; level: number };
	lang: string;
	coins: UserCoins;
	history?: HistorySlot[];
	backgroundImage: string;
};
