import type { UserProfile } from "@/types/UserProfile";
import type { Guild } from "@/types/Guild";
import style from "./mainprofile.module.scss";
import Avatar from "../../components/Avatar";
import Icon from "../../components/Icon";
import { cookies } from "next/headers";

export default async function MainProfile({ user }: { user: UserProfile }) {
	const cookieStore = cookies();
	const accessToken = cookieStore.get("access_token");
	let commonGuilds: Guild[] = [];

	if (accessToken) {
		const res = await fetch(
			`http://129.151.234.121:8080/api/users/@me/compare/${user.id}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken.value}`,
				},
				next: {
					revalidate: 86_400,
				},
			}
		);

		commonGuilds = await res.json();
	}

	return (
		<section className={style.profile}>
			<img
				src={`http://129.151.234.121:8080/api/users/${user.id}/background`}
				alt="User banner"
				className={style.banner}
			/>
			<Avatar user={user} size={512} className={style.avatar} />
			<article className={style.profile__badges}>
				<div className={style.elo}>{user.elo.toLocaleString()}</div>
				{user.premium && (
					<div className={style.premium}>
						<img src="/premium.webp" alt="premium icon, tiny games" />
					</div>
				)}
			</article>
			<article className={style.profile__content}>
				<div className={style.userTopData}>
					<div className={style.textData}>
						<div className={style.userMainData}>
							<h2 className={style.username}>
								{!user.tag.includes("#") && "@"}
								{user.tag}
							</h2>
							<h3 className={style.userId}>{user.id}</h3>
						</div>
						<div className={style.mutualGuilds}>
							<div className={style.mutualGuilds__content}>
								{commonGuilds.map((guild, key) => (
									<Icon
										guild={guild}
										className={style.guilIcon}
										key={key}
										size={32}
									/>
								))}
							</div>
							<p className={style.mutualGuilds__text}>
								{commonGuilds.length.toLocaleString()} mutual servers
							</p>
						</div>
					</div>
					<div
						className={style.progressBar}
						data-center-content={`Lv.${user.ranking.level}`}
						role="progressbar"
						style={{
							background: `radial-gradient(
                closest-side,
                #1f1f24 79%,
                transparent 80% 100%
              ),
              conic-gradient(
                #5865f2 ${Math.round(
									(user.ranking.xp / (user.ranking.level * 500)) * 100
								)}%,
                #19191d 0
              )`,
						}}
					/>
				</div>
			</article>
		</section>
	);
}
