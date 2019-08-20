<template>
	<router-link tag="li" :to="menu.path" v-if="menu.path">
		<!-- String(menu.menuId) menu-item项绑定的index为path，默认选中
		与路由关联-->
		<el-menu-item :index="menu.path">
			<template>
				<!-- <i :class="menu.icon"></i> -->
				<span slot="title">{{menu.name}}</span>
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
