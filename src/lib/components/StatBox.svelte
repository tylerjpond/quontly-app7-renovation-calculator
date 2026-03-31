<script lang="ts">
  export let label: string
  export let value: string
</script>

<div class="rounded-box border border-base-300 bg-base-100/75 p-4">
  <p class="text-sm text-base-content/60">{label}</p>
  <p class="mt-1 text-lg font-semibold">{value}</p>
</div>
