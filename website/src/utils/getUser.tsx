import type { UserProfile } from "@/types/UserProfile";

export default async function getUser(
	userId: string
): Promise<UserProfile | null> {
	const user = await fetch(`http://129.151.234.121:8080/api/users/${userId}`, {
		next: {
			revalidate: 60,
		},
	});

	if (user.status !== 200) return null;
	return user.json();
}
