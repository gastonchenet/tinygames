import style from "./loading.module.scss";

export const metadata = {
	title: "Tiny Games | Loading",
};

export default function Loading() {
	return (
		<section className={style.pageContent}>
			<div className={style.pl}>
				<div className={style.pl__a}></div>
				<div className={style.pl__b}></div>
				<div className={style.pl__c}></div>
				<div className={style.pl__d}></div>
			</div>
			<h1 className={style.title}>Page Loading...</h1>
			<h3 className={style.subtitle}>Waiting for all resources to be loaded</h3>
		</section>
	);
}
