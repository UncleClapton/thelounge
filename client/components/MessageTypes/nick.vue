<template>
	<span class="content">
		<Username :user="{...message.from, nick: message.old_nick}" />
		is now known as
		<Username :user="message.from" />
	</span>
</template>

<script>
import Username from "../Username.vue";

export default {
	name: "MessageTypeNick",
	components: {
		Username,
	},
	props: {
		network: Object,
		message: Object,
	},
};
</script>
