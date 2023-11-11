export type Game = {
	name: string;
	rules: string;
	tags: number[];
	players: { min: number; max: number };
	maxCPU: number;
	measureTurns: boolean;
};

export type Command = {
	name: string;
	description: string;
	category_name: string;
	category_description: string;
	usages: number;
	premium: boolean;
	requiresVote: boolean;
	new: boolean;
	game: Game | null;
};
