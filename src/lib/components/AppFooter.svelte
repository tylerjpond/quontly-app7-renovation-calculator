<script lang="ts">
  import { siteMeta } from '../content/site'

  const year = new Date().getFullYear()
</script>

<footer class="border-t border-base-300/70 bg-base-100/80">
  <div class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-base-content/75 sm:flex-row sm:items-center sm:justify-between lg:px-6">
    <p>© {year} Quontly</p>
    <p class="max-w-2xl">Educational estimate only. Always verify renovation budgets, scope, and contractor assumptions with licensed professionals.</p>
  </div>
  <div class="mx-auto max-w-7xl px-4 pb-6 text-xs text-base-content/60 lg:px-6">
    {siteMeta.disclosure}
  </div>
</footer>