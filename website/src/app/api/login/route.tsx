import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
	const response = NextResponse.redirect("https://tinygames.xyz");
	const code = req.nextUrl.searchParams.get("code");
	const params = new URLSearchParams();

	params.set("client_id", process.env.CLIENT_ID as string);
	params.set("client_secret", process.env.CLIENT_SECRET as string);
	params.set("redirect_uri", "https://tinygames.xyz/api/login");
	params.set("grant_type", "authorization_code");
	params.set("code", code as string);

	const oauth = await fetch("https://discord.com/api/oauth2/token", {
		method: "POST",
		body: params,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});

	const credentials = await oauth.json();

	response.cookies.set({
		name: "access_token",
		value: credentials.access_token,
		maxAge: credentials.expires_in,
	});

	return response;
}
