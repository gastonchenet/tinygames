import React from "react";

export default function RainbowText({ children }: { children: string }) {
	return (
		<React.Fragment>
			{children.split("").map((char, key) => (
				<span
					key={key}
					style={{ color: `hsl(${(key * 360) / children.length}, 100%, 75%)` }}
				>
					{char}
				</span>
			))}
		</React.Fragment>
	);
}
