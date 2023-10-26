import { LayoutNavbar } from '../.nuxt/components';
<template>
	<ClientOnly>
		<LayoutNavbar />
	</ClientOnly>
	<slot />
</template>
