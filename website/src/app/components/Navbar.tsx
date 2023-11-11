import type { User } from "@/types/User";
import type { BotData } from "@/types/BotData";
import Avatar from "./Avatar";
import style from "./navbar.module.scss";
import Link from "next/link";
import { BsDiscord } from "react-icons/bs";
import { cookies } from "next/headers";
import { Kanit } from "next/font/google";
import NavLinks from "./NavLinks";

const kanit = Kanit({ subsets: ["latin"], weight: "400" });

export default async function Navbar({ bot }: { bot: BotData }) {
	const cookieStore = cookies();
	const accessToken = cookieStore.get("access_token");
	let user: User | null = null;

	if (accessToken) {
		const res = await fetch("http://129.151.234.121:8080/api/users/@me", {
			headers: {
				Authorization: `Bearer ${accessToken.value}`,
			},
			next: {
				revalidate: 3600,
			},
		});

		user = await res.json();
	}

	return (
		<nav className={style.navbar}>
			<div className={style.navbar__header}>
				<Link href="/" className={style.homeButton}>
					<Avatar user={bot} className={style.avatar} />
					<h2 className={style.botTitle}>
						<p className={kanit.className}>{bot.username}</p>
					</h2>
				</Link>
				<NavLinks />
			</div>
			{user ? (
				<Link className={style.profileButton} href={`/profile/${user.id}`}>
					<div className={style.profileButton__textData}>
						<p className={style.username}>
							{user.global_name ?? user.username}
						</p>
						<p className={style.elo}>{user.elo.toLocaleString()}</p>
					</div>
					<Avatar user={user} className={style.profileButton__avatar} />
				</Link>
			) : (
				<a
					href="https://discord.com/api/oauth2/authorize?client_id=878580419736506388&redirect_uri=https%3A%2F%2Ftinygames.xyz%2Fapi%2Flogin&response_type=code&scope=identify"
					className={style.loginButton}
				>
					<BsDiscord className={style.loginButton__icon} />
					<p>Sign in with Discord</p>
				</a>
			)}
		</nav>
	);
}
