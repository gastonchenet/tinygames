import type { UserProfile } from "@/types/UserProfile";

export default async function getUsers(): Promise<UserProfile[]> {
	const users = await fetch("http://129.151.234.121:8080/api/users", {
		next: {
			revalidate: 3600,
		},
	});

	return users.json();
}
