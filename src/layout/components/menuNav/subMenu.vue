<template>
  <el-submenu v-if="menu.menuType === 'menuLabel'" :index="String(menu.menuId)">
		<template slot="title" v-if="menu.name !== null">
			<!-- <i :class="menu.icon"></i> -->
			<!--submenu绑定的index为id唯一项，可操作默认展开  -->
			<span slot="title">{{ menu.name }}</span>
		</template>

		<template v-if="menu.children !== null">
			<template v-for="menuItem in menu.children">
				<template v-if="menuItem.menuType === 'menuPage'">
					<menu-item :menu="menuItem" :key="menuItem.menuId"></menu-item>
				</template>

				<template v-if="menuItem.menuType === 'menuLabel'">
					<sub-menu :menu="menuItem" :key="menuItem.menuId"></sub-menu>
				</template>

				<template v-if="menuItem.menuType === 'group'">
					<menu-group :menu="menuItem" :key="menuItem.menuId"></menu-group>
				</template>
			</template>
		</template>

	</el-submenu>
</template>
<script>
import menuItem from './menuItem'
import menuGroup from './menuGroup'
export default {
	name:"subMenu",
	props:{
		menu:{
			type:Object
		}
	},
	components:{
		menuItem,
		menuGroup
	},
	created(){
		// console.log(this.menu)
	},
	data(){
		return {

		}
	}
}
</script>

