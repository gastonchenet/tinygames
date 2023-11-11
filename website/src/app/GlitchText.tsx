"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import style from "./glitchtext.module.scss";

const CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function randomChar() {
	return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function randomString(length: number) {
	return Array.from({ length }, randomChar).join("");
}

export default function GlitchText({ children }: { children: string }) {
	const [text, setText] = useState(randomString(children.length));

	useEffect(() => {
		let i = 0;

		const interval = setInterval(() => {
			setText(
				children.slice(0, i) + randomString(Math.ceil(children.length - i))
			);
			i += 0.2;

			if (i > children.length + 1) clearInterval(interval);
		}, 50);
	}, []);

	return (
		<motion.div
			initial={{ filter: "blur(15px)" }}
			animate={{ filter: "blur(0px)" }}
			transition={{
				type: "spring",
				duration: 1,
			}}
			data-text={text}
			className={style.glitchText}
		>
			{text}
		</motion.div>
	);
}
