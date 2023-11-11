import style from "./notfound.module.scss";

export const metadata = {
	title: "Tiny Games | Page not found",
	description: "The page you are looking for does not exist.",
};

export default function NotFound() {
	return (
		<section className={style.pageError}>
			<h1 className={style.error}>404</h1>
			<h3 className={style.title}>Page not found</h3>
		</section>
	);
}
