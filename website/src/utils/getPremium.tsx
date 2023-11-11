import type { PremiumSlot } from "@/types/PremiumSlot";

export default async function getPremium(): Promise<PremiumSlot[]> {
	const res = await fetch("http://129.151.234.121:8080/api/premium", {
		next: {
			revalidate: 86_400,
		},
	});

	return res.json();
}
