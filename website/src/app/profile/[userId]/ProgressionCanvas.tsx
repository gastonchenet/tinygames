"use client";

import type { UserProfile } from "@/types/UserProfile";
import { Line } from "react-chartjs-2";
import { GameResult } from "./History";
import {
	Chart,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export default function ProgressionCanvas({ user }: { user: UserProfile }) {
	return (
		<Line
			data={{
				datasets: [
					{
						data: user.history?.map((s) => s.globalElo),
						backgroundColor: ["rgba(255, 99, 132, 0.2)"],
						borderColor: ["rgba(255, 99, 132, 1)"],
						borderWidth: 1,
						tension: 0.1,
					},
				],
				labels: user.history?.map((s) => s.globalElo),
			}}
			options={{
				scales: {
					x: {
						ticks: {
							color: "rgba(255, 255, 255, 0.5)",
							font: { size: 14 },
						},
						grid: {
							color: "rgba(255, 255, 255, 0.05)",
						},
					},
					y: {
						ticks: {
							color: "rgba(255, 255, 255, 0.5)",
							font: { size: 14 },
						},
						grid: {
							color: "rgba(255, 255, 255, 0.05)",
						},
					},
				},
				interaction: {
					intersect: false,
					mode: "index",
				},
				plugins: {
					tooltip: {
						enabled: true,
						intersect: false,
						mode: "index",
						callbacks: {
							title: function (context) {
								return "/" + user.history?.[context[0].dataIndex].game;
							},
							label: function (context) {
								return user.history?.[context.dataIndex].globalElo + " TP";
							},
							footer: function (context) {
								return GameResult[
									user.history?.[context[0].dataIndex].result ?? 1
								];
							},
						},
					},
				},
			}}
		/>
	);
}
