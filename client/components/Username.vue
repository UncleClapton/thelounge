<template>
	<span
		:class="['user', nickColor, {active: active}]"
		:data-name="user.nick"
		role="button"
		v-on="onHover ? {mouseenter: hover} : {}"
		@click.prevent="openContextMenu"
		@contextmenu.prevent="openContextMenu"
		><slot>{{ user.mode }}{{ user.nick }}</slot></span
	>
</template>

<script>
import eventbus from "../js/eventbus";
import colorClass from "../js/helpers/colorClass";

export default {
	name: "Username",
	props: {
		user: Object,
		active: Boolean,
		onHover: Function,
	},
	computed: {
		nickColor() {
			if (this.$store.state.settings.coloredNicks === "regex") {
				const colorRules = Object.values(this.$store.state.settings.nickColorRules);
				const userString = `${this.user.nick}!${this.user.ident || ""}@${
					this.user.hostname || ""
				}`;

				for (const rule of colorRules) {
					if (userString.includes(rule.pattern)) {
						return `color-${rule.color}`;
					}
				}

				return `color-${this.$store.state.settings.defaultNickColor}`;
			}

			return colorClass(this.user.nick);
		},
	},
	methods: {
		hover() {
			return this.onHover(this.user);
		},
		openContextMenu(event) {
			eventbus.emit("contextmenu:user", {
				event: event,
				user: this.user,
			});
		},
	},
};
</script>
