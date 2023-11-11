import type { UserProfile } from "@/types/UserProfile";
import ProgressionCanvas from "./ProgressionCanvas";
import style from "./progression.module.scss";

export default function Progression({ user }: { user: UserProfile }) {
	return (
		<section className={style.progression}>
			<h2 className={style.progression__title}>Progression</h2>
			<ProgressionCanvas user={user} />
		</section>
	);
}
