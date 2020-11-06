import SamplePage from "~/components/pages/SamplePage.vue";

export default {
	title: "pages / SamplePage"
};

export const Default = () => ({
	components: { SamplePage },
	template: `
	<div style="height: 100vh;">
		<SamplePage gameJsonUri="/default/game.json" />
	</div>
	`
});
