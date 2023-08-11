const Client = require("./Client");
const Discord = require("discord.js");

class Party {
	/**
	 * @param {Client} client
	 * @param {string} hostId
	 */
	constructor(client, hostId) {
		this.client = client;
		this.hostId = hostId;

		/** @type {Discord.User[]} */
		this.members = [];

		this.createdAt = Date.now();

		this.client.parties.set(hostId, this);
	}

	/**
	 * @param {Discord.User} user
	 */
	addMember(user) {
		if (this.client.inParty.has(user.id)) return;

		this.client.inParty.set(user.id, this.hostId);
		this.members.push(user);
	}

	/**
	 * @param {string} userId
	 */
	removeMember(userId) {
		if (!this.client.inParty.has(userId)) return;

		this.client.inParty.delete(userId);
		this.members.splice(
			this.members.findIndex((m) => m.id === userId),
			1
		);
	}

	disband() {
		this.members.forEach((member) => {
			this.client.inParty.delete(member.id);
		});

		this.client.parties.delete(this.hostId);
	}

	/**
	 * @param {Discord.User} user
	 */
	setLeader(user) {
		this.disband();

		this.members.forEach((member) => {
			this.client.inParty.set(member.id, user.id);
		});

		this.hostId = user.id;
		this.client.parties.set(user.id, this);
		return user;
	}

	/**
	 * @param {Discord.User} user
	 */
	isLeader(user) {
		return user.id === this.hostId;
	}

	get leader() {
		return this.members.find((u) => u.id === this.hostId);
	}
}

module.exports = Party;
