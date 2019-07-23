<template>
  <el-submenu v-if="menu.type === 'submenu'" :index="menu.index">
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

				<template v-if="menuItem.type === 'group'">
					<menu-group :menu="menuItem" :key="menuItem.id"></menu-group>
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
	data(){
		return {

		}
	}
}
</script>

