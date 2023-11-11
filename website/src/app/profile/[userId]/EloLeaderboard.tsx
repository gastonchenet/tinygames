import type { UserProfile } from "@/types/UserProfile";
import style from "./eloleaderboard.module.scss";
import Avatar from "../../components/Avatar";
import Link from "next/link";

export default function EloLeaderboard({
	users,
	userIndex,
}: {
	users: (UserProfile & { rank: number })[];
	userIndex: number;
}) {
	const maxElo = users[0].elo;
	const minElo = users[users.length - 1].elo;
	const padding = 40;

	return (
		<section className={style.eloLeaderboard}>
			{users.map((user, k) => (
				<Link
					key={k}
					className={style.leaderboardSlot}
					href={`/profile/${user.id}`}
				>
					<p className={style.rank}>#{user.rank + 1}</p>
					<div
						className={style.eloBar}
						style={{
							width: `calc(${padding}% + ${
								((user.elo - minElo) / (maxElo - minElo)) *
								(100 - padding * 1.5)
							}% - 185px)`,
						}}
						data-userslot={userIndex === k}
						role="progressbar"
					/>
					<Avatar user={user} className={style.avatar} />
					<div className={style.textData}>
						<p className={style.username}>{user.tag}</p>
						<p className={style.elo}>{user.elo.toLocaleString()}</p>
					</div>
				</Link>
			))}
		</section>
	);
}
