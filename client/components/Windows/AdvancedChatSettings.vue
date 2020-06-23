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
			style="flex: initial;"
			class="colored-nicks container wide"
			@change="onRulesetChange('nickColorRules', $event)"
			@submit.prevent
		>
			<div>
				<h1 class="title inline-block">Nick Color Settings</h1>
				<button type="button" class="btn button float-right" @click="createColorRule">
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
					<NickColorPicker
						name="color"
						class="space-around"
						:data-rId="rule.id"
						:value="rule.color"
					/>
					<button
						type="button"
						class="btn button float-right"
						@click="deleteChatRule('nickColorRules', rule.id)"
					>
						Delete
					</button>
				</div>
			</Draggable>
			<div class="nick-color-rule default">
				<span class="label">Default</span>
				<NickColorPicker
					name="defaultNickColor"
					class="space-around"
					:value="$store.state.settings.defaultNickColor"
				/>
			</div>
		</form>
		<form
			ref="LinkDetectorSettingsForm"
			class="container wide"
			@change="onRulesetChange('linkDetectors', $event)"
			@submit.prevent
		>
			<div>
				<h1 class="title inline-block">Custom Link Detectors</h1>
				<button type="button" class="btn button float-right" @click="createLinkDetector">
					Add Rule
				</button>
			</div>
			<br />
			<Draggable
				v-model="linkDetectors"
				draggable=".nick-color-rule"
				handle=".handle"
				ghost-class="ui-sortable-ghost"
				drag-class="ui-sortable-dragged"
			>
				<div v-for="rule in linkDetectors" :key="rule.id" class="nick-color-rule">
					<div class="handle icon bars" />
					<input
						:value="rule.pattern"
						type="text"
						name="pattern"
						class="input"
						:data-rId="rule.id"
						placeholder="Pattern (Regex)"
					/>
					<input
						:value="rule.link"
						type="text"
						name="link"
						class="input space-around"
						:data-rId="rule.id"
						placeholder="Destination Link (Use '$@' to reference matched text)"
					/>
					<button
						type="button"
						class="btn button float-right"
						@click="deleteChatRule('linkDetectors', rule.id)"
					>
						Delete
					</button>
				</div>
			</Draggable>
		</form>
	</div>
</template>

<script>
import {v4 as uuidv4} from "uuid";

import Draggable from "vuedraggable";
import NickColorPicker from "../NickColorPicker.vue";
import SidebarToggle from "../SidebarToggle.vue";

export default {
	name: "AdvancedChatSettings",
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
		linkDetectors: {
			get() {
				return Object.values(this.$store.state.settings.linkDetectors);
			},
			set(value) {
				this.commitChange(
					"linkDetectors",
					value.reduce((acc, rule) => {
						acc[rule.id] = rule;
						return acc;
					}, {})
				);
			},
		},
	},
	methods: {
		createChatRule(rulesetName, template) {
			const nextRuleset = {...this.$store.state.settings[rulesetName]};
			const rulesetId = uuidv4();

			nextRuleset[rulesetId] = {
				id: rulesetId,
				...template,
			};

			this.commitChange(rulesetName, nextRuleset);
		},

		createColorRule() {
			this.createChatRule("nickColorRules", {
				pattern: "",
				regex: false,
				color: "1",
			});
		},

		createLinkDetector() {
			this.createChatRule("linkDetectors", {
				pattern: "",
				link: "",
			});
		},

		deleteChatRule(rulesetName, id) {
			const nextRuleset = {...this.$store.state.settings[rulesetName]};

			delete nextRuleset[id];

			this.commitChange(rulesetName, nextRuleset);
		},

		onRulesetChange(rulesetName, event) {
			const {value, name} = event.target;
			const rId = event.target.getAttribute("data-rId");

			if (rId) {
				const nextRuleset = {...this.$store.state.settings[rulesetName]};

				nextRuleset[rId][name] = value;

				this.commitChange(rulesetName, nextRuleset);
			} else {
				this.commitChange(name, value)
			}
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
