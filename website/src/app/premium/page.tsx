import React from "react";
import { HiXMark, HiCheck } from "react-icons/hi2";
import { IoInfiniteOutline } from "react-icons/io5";
import style from "./page.module.scss";
import getPremium from "@/utils/getPremium";

function Boolean({ value }: { value: boolean }) {
	return value ? (
		<HiCheck className={style.boolean} />
	) : (
		<HiXMark className={style.boolean} />
	);
}

export const metadata = {
	title: "Tiny Games | Premium",
	description:
		"Buy Tiny Premium to get access to exclusive features and support the bot!",
};

export default async function Page() {
	const premium = await getPremium();

	return (
		<section className={style.pageContent}>
			<div className={style.head}>
				<h1 className={style.title}>Get Tiny Premium</h1>
				<h3 className={style.command}>premium</h3>
			</div>
			<table className={style.table}>
				<tr className={style.row}>
					<th />
					<th className={style.row__blank} />
					<th className={style.row__default__head}>Classic</th>
					<th className={style.row__premium__head}>Tiny Premium</th>
				</tr>
				{premium.map((slot, key) => (
					<tr key={key} className={style.row}>
						<td className={style.row__title}>{slot.title}</td>
						<td className={style.row__description}>{slot.description}</td>
						<td className={style.row__default}>
							{typeof slot.default === "boolean" ? (
								<Boolean value={slot.default} />
							) : slot.default === "Infinity" ? (
								<IoInfiniteOutline />
							) : (
								slot.default
							)}
						</td>
						<td className={style.row__premium}>
							{typeof slot.premium === "boolean" ? (
								<Boolean value={slot.premium} />
							) : slot.premium === "Infinity" ? (
								<IoInfiniteOutline />
							) : (
								slot.premium
							)}
						</td>
					</tr>
				))}
			</table>
		</section>
	);
}
