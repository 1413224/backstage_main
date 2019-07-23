<template>
  <el-menu-item-group>
		<template slot="title" v-if="menu.lable !== null">
			<!-- <i :class="menu.icon"></i> -->
			<span slot="title">{{ menu.lable }}</span>
		</template>	
		<template v-if="menu.children !== null">
			<template v-for="menuItem in menu.children">
				<template v-if="menuItem.type === 'item'">
					<menu-item :menu="menuItem" :key="menuItem.id"></menu-item>
				</template>

				<template v-if="menuItem.type === 'submenu'">
					<sub-menu :menu="menuItem" :key="menuItem.id"></sub-menu>
				</template>

			</template>
		</template>
	</el-menu-item-group>
</template>
<script>
import menuItem from './menuItem'
import subMenu from './subMenu'
export default {
	name:"menuGroup",
	props:{
		menu:{
			type:Object
		}
	},
	components:{
		menuItem,
		subMenu
	},
	data(){
		return {

		}
	}
}
</script>

