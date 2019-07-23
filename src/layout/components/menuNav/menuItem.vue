<template>
	<router-link tag="li" :to="menu.path" v-if="menu.path">
		<el-menu-item :index="menu.path">
			<template>
				<!-- <i :class="menu.icon"></i> -->
				<span slot="title">{{menu.lable}}</span>
			</template>
		</el-menu-item>
	</router-link>
</template>
<script>
export default {
	name:'menuItem',
	props:{
		menu:{
			type:Object
		}
	},
	data(){
		return {

		}
	}
}
</script>
