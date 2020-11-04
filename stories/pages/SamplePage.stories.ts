import SamplePage from "~/components/pages/SamplePage.vue";

export default {
	title: "pages / SamplePage"
};

export const Default = () => ({
	components: { SamplePage },
	template: `
	<div style="height: 100vh;">
		<SamplePage gameJSONUri="/default/game.json" />
	</div>
	`
});
