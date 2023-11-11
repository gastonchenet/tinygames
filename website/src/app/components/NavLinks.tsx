"use client";

import Link from "next/link";
import style from "./navlinks.module.scss";
import { usePathname } from "next/navigation";

export default function NavLinks() {
	const pathname = usePathname();

	return (
		<div className={style.links}>
			<Link
				href="/commands"
				className={`${style.links__element} ${
					pathname === "/commands" && style.active
				}`}
			>
				Commands
			</Link>
			<Link
				href="/premium"
				className={`${style.links__element} ${
					pathname === "/premium" && style.active
				}`}
			>
				Premium
			</Link>
		</div>
	);
}
