<template>
	<div id="settings" class="window" role="tabpanel" aria-label="Settings">
		<div class="header">
			<SidebarToggle />
			<router-link
				to="/settings"
				tag="button"
				class="nick-settings-close button close"
				aria-label="Close Nick Settings"
				role="tab"
				aria-controls="settings"
			/>
		</div>
		<form
			id="chat"
			ref="settingsForm"
			class="colored-nicks container wide"
			@change="onChange"
			@submit.prevent
		>
			<div>
				<h1 class="title inline-block">Nick Color Settings</h1>
				<button type="button" class="btn button float-right" @click="createRule">
					Add Rule
				</button>
			</div>
			<br />
			<Draggable
				v-model="colorRules"
				draggable=".nick-color-rule"
				handle=".handle"
				ghost-class="ui-sortable-ghost"
				drag-class="ui-sortable-dragged"
			>
				<div v-for="rule in colorRules" :key="rule.id" class="nick-color-rule">
					<div class="handle icon bars" />
					<input
						:value="rule.pattern"
						type="text"
						name="pattern"
						class="input"
						:data-rId="rule.id"
						placeholder="nick!ident@hostname"
					/>
					<NickColorPicker name="color" :data-rId="rule.id" :value="rule.color" />
					<button
						type="button"
						class="btn button float-right"
						@click="deleteRule(rule.id)"
					>
						Delete
					</button>
				</div>
			</Draggable>
			<div class="nick-color-rule default">
				<span class="label">Default</span>
				<NickColorPicker
					name="defaultNickColor"
					:value="$store.state.settings.defaultNickColor"
				/>
			</div>
		</form>
	</div>
</template>

<script>
import {v4 as uuidv4} from "uuid";

import Draggable from "vuedraggable";
import NickColorPicker from "../NickColorPicker.vue";
import SidebarToggle from "../SidebarToggle.vue";

export default {
	name: "NickColorSettings",
	components: {
		Draggable,
		NickColorPicker,
		SidebarToggle,
	},
	computed: {
		colorRules: {
			get() {
				return Object.values(this.$store.state.settings.nickColorRules);
			},
			set(value) {
				this.commitChange(
					"nickColorRules",
					value.reduce((acc, rule) => {
						acc[rule.id] = rule;
						return acc;
					}, {})
				);
			},
		},
	},
	methods: {
		createRule() {
			const nextRuleset = {...this.$store.state.settings.nickColorRules};
			const rulesetId = uuidv4();

			nextRuleset[rulesetId] = {
				id: rulesetId,
				pattern: "",
				regex: false,
				color: "1",
			};

			this.commitChange("nickColorRules", nextRuleset);
		},

		deleteRule(id) {
			const nextRuleset = {...this.$store.state.settings.nickColorRules};

			delete nextRuleset[id];

			this.commitChange("nickColorRules", nextRuleset);
		},

		onChange(event) {
			const settingName = event.target.name;

			if (settingName === "defaultNickColor") {
				this.commitChange("defaultNickColor", event.target.value);
				return;
			}

			const rId = event.target.getAttribute("data-rId");

			if (!rId) {
				return;
			}

			const nextRuleset = {...this.$store.state.settings.nickColorRules};

			nextRuleset[rId][settingName] = event.target.value;

			this.commitChange("nickColorRules", nextRuleset);
		},

		commitChange(name, value) {
			this.$store.dispatch("settings/update", {
				name,
				value,
				sync: true,
			});
		},
	},
};
</script>
