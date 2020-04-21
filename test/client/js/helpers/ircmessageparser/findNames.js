"use strict";

const expect = require("chai").expect;
const findNames = require("../../../../../client/js/helpers/ircmessageparser/findNames").default;

describe("findNames", () => {
	it("should find users in text", () => {
		const input = "<MaxLeiter>: Hello, xPaw, how's it going?";
		const expected = [
			{
				start: 1,
				end: 10,
				user: {
					nick: "MaxLeiter",
				},
			},
			{
				start: 20,
				end: 24,
				user: {
					nick: "xPaw",
				},
			},
		];
		const users = {
			MaxLeiter: {
				nick: "MaxLeiter",
			},
			xPaw: {
				nick: "xPaw",
			},
		};
		const actual = findNames(input, users);

		expect(actual).to.deep.equal(expected);
	});

	it("should not find users as part of a bigger string (issue #1776)", () => {
		const input = "you're very unlucky, luck";
		const expected = [
			{
				start: 21,
				end: 25,
				user: {
					nick: "luck",
				},
			},
		];
		const users = {
			luck: {
				nick: "luck",
			},
		};
		const actual = findNames(input, users);

		expect(actual).to.deep.equal(expected);
	});

	it("should find users as short as one character (issue #1885)", () => {
		const input = "aaa aa abc a";
		const expected = [
			{
				start: 11,
				end: 12,
				user: {
					nick: "a",
				},
			},
		];
		const users = {
			a: {
				nick: "a",
			},
		};
		const actual = findNames(input, users);

		expect(actual).to.deep.equal(expected);
	});

	it("should find same nick multiple times", () => {
		const input = "xPaw xPaw xPaw";
		const expected = [
			{
				start: 0,
				end: 4,
				user: {
					nick: "xPaw",
				},
			},
			{
				start: 5,
				end: 9,
				user: {
					nick: "xPaw",
				},
			},
			{
				start: 10,
				end: 14,
				user: {
					nick: "xPaw",
				},
			},
		];
		const users = {
			xPaw: {
				nick: "xPaw",
			},
		};
		const actual = findNames(input, users);

		expect(actual).to.deep.equal(expected);
	});
});
