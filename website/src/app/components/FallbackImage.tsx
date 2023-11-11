"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ({
	fallback,
	alt,
	src,
	className,
	size = 256,
}: {
	fallback: string;
	alt: string;
	src: string;
	className?: string;
	size?: number;
}) {
	const [error, setError] = useState(false);

	useEffect(() => setError(false), [src]);

	return (
		<Image
			width={size}
			height={size}
			alt={alt}
			src={error ? fallback : src}
			onError={() => setError(true)}
			className={className}
		/>
	);
}
