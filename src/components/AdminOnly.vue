<template>
  <slot v-if="isAdmin"></slot>
</template>

<script setup>
import { useAdmin } from '../composables/useAuth.js'

const { isAdmin } = useAdmin()
</script>
