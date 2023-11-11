import style from "./footer.module.scss";
import Avatar from "./Avatar";
import Link from "next/link";
import { cookies } from "next/headers";
import { getBotData } from "@/utils/getBotData";

export default async function Footer() {
	const cookieStore = cookies();
	const accessToken = cookieStore.get("access_token");
	const bot = await getBotData();
	let userId: string | null = null;

	if (accessToken) {
		const res = await fetch(`http://129.151.234.121:8080/api/users/@me`, {
			headers: {
				Authorization: `Bearer ${accessToken.value}`,
			},
			next: {
				revalidate: 3600,
			},
		});

		userId = await res.json().then((user) => user.id);
	}

	return (
		<footer className={style.footer}>
			<div className={style.footer__leftContent}>
				<Avatar user={bot} size={64} className={style.avatar} />
				<div className={style.leftTextContent}>
					<h2 className={style.botUsername}>{bot.username}</h2>
					<p className={style.botCredits}>
						© {new Date().getFullYear()} {bot.username}
					</p>
				</div>
			</div>
			<div className={style.footerLinks}>
				<div className={style.category}>
					<h3 className={style.category__title}>Website Links</h3>
					<ul className={style.category__content}>
						<li className={style.category__content__element}>
							<Link href="/" className={style.link}>
								Home
							</Link>
						</li>
						<li className={style.category__content__element}>
							<Link href="/commands" className={style.link}>
								Commands
							</Link>
						</li>
						{userId && (
							<li className={style.category__content__element}>
								<Link href={`/profile/${userId}`} className={style.link}>
									Your Profile
								</Link>
							</li>
						)}
						<li className={style.category__content__element}>
							<Link href="/premium" className={style.link}>
								Premium
							</Link>
						</li>
					</ul>
				</div>
				<div className={style.category}>
					<h3 className={style.category__title}>Links</h3>
					<ul className={style.category__content}>
						<li className={style.category__content__element}>
							<a
								href="https://discord.com/api/oauth2/authorize?client_id=878580419736506388&permissions=463856856272&scope=bot%20applications.commands"
								className={style.link}
								target="_blank"
							>
								Invite Me
							</a>
						</li>
						<li className={style.category__content__element}>
							<a
								href="https://discord.gg/KGvg466yHH"
								className={style.link}
								target="_blank"
							>
								Community Server
							</a>
						</li>
						<li className={style.category__content__element}>
							<a
								href={`https://top.gg/bot/${bot.id}`}
								className={style.link}
								target="_blank"
							>
								Top.gg
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}
