import type { UserProfile } from "@/types/UserProfile";
import style from "./history.module.scss";
import moment from "moment";

export const GameResult = ["Defeat", "Draw", "Victory"];
export const GameType = {
	"normal-mode": "Normal Mode",
	"friendly-mode": "Friendly Mode",
};

export default function History({ user }: { user: UserProfile }) {
	return (
		<section className={style.history}>
			<h2 className={style.history__title}>Game History</h2>
			<div className={style.history__content}>
				{user.history?.slice(0, 10)?.map((game, key) => (
					<article key={key} className={style.game}>
						<div className={style.game__head}>
							<h3 className={style.game__head__name}>{game.game}</h3>
							<h3
								className={style.game__head__result}
								data-content={game.result}
							>
								{GameResult[game.result]}
							</h3>
						</div>
						<p className={style.game__type}>{GameType[game.type]}</p>
						<div className={style.game__time}>
							<p className={style.game__time__duration}>
								Lasted {moment.duration(game.duration).humanize()}
							</p>
							<p className={style.game__time__date}>
								{moment(game.playedAt).format("ddd MM, hh:mm")}
							</p>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
