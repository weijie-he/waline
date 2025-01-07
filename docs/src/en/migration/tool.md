---
title: Migration Helper
icon: helper
---

<MigrationTool />

::: tip

After using the above tools to obtain the exported files, you can import them in the correct storage service.

:::

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const MigrationTool = defineAsyncComponent(() =>
  import( '@MigrationTool')
)
</script>
