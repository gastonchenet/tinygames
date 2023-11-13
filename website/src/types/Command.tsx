export enum OptionType {
	SubCommand = 1,
	SubCommandGroup,
	String,
	Integer,
	Boolean,
	User,
	Channel,
	Role,
	Mentionable,
	Number,
	Attachment,
}

export type Game = {
	name: string;
	rules: string;
	tags: number[];
	players: { min: number; max: number };
	maxCPU: number;
	measureTurns: boolean;
};

export type Option = {
	type: OptionType;
	name: string;
	description: string;
	choices?: string[];
	required?: boolean;
	autocomplete?: boolean;
	options?: Option[];
};

export type Command = {
	name: string;
	description: string;
	category_name: string;
	category_description: string;
	options: Option[];
	usages: number;
	premium: boolean;
	requiresVote: boolean;
	new: boolean;
	game: Game | null;
};
