import React from "react";
import style from "./page.module.scss";
import EloLeaderboard from "./EloLeaderboard";
import MainProfile from "./MainProfile";
import History from "./History";
import Progression from "./Progression";
import getUser from "@/utils/getUser";
import getUsers from "@/utils/getUsers";

export async function generateMetadata({
	params,
}: {
	params: {
		userId: string;
	};
}) {
	const user = await getUser(params.userId);

	if (!user) {
		return {
			title: "Tiny Games | User not found",
			description: "The user you are looking for does not exist.",
		};
	}

	return {
		title: `Tiny Games | ${user.tag}`,
		description: `View ${user.tag}'s profile on Tiny Games.`,
	};
}

export default async function Page({
	params,
}: {
	params: {
		userId: string;
	};
}) {
	const user = await getUser(params.userId);
	const users = await getUsers();
	const sorted = users.sort((a, b) => b.elo - a.elo);
	const range = 5;

	if (!user) {
		return (
			<section className={style.pageError}>
				<h1 className={style.error}>404</h1>
				<h3 className={style.title}>User not found</h3>
			</section>
		);
	}

	const rank = sorted.findIndex((u) => u.id === user.id);
	const surroundings = sorted.slice(
		Math.max(0, rank - Math.floor(range / 2)),
		Math.min(sorted.length, rank + Math.ceil(range / 2))
	);

	while (surroundings.length < Math.min(range, sorted.length)) {
		if (surroundings[0].elo === user.elo) {
			surroundings.push(sorted[rank + surroundings.length]);
		} else {
			surroundings.unshift(sorted[rank - surroundings.length]);
		}
	}

	const userIndex = surroundings.findIndex((u) => u.id === user.id);
	const ranks = surroundings.map((u, i) => ({
		...u,
		rank: rank + i - userIndex,
	}));

	return (
		<div className={style.pageContent}>
			<div className={style.side}>
				<MainProfile user={user} />
				<Progression user={user} />
			</div>
			<div className={style.side}>
				<EloLeaderboard users={ranks} userIndex={userIndex} />
				<History user={user} />
			</div>
		</div>
	);
}
