<template>
	<select
		:class="['nick-color-picker', 'input', 'user', `color-${value}`]"
		:value="value"
		v-bind="$attrs"
	>
		<option v-for="color in 32" :key="color" :class="`user color-${color}`" :value="color">
			color-{{ color }}
		</option>
	</select>
</template>

<script>
export default {
	name: "NickColorPicker",
	props: {
		value: String,
	},
};
</script>
