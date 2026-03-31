<script lang="ts">
  import '../index.css'
  import AppHeader from '$lib/components/AppHeader.svelte'
  import AppFooter from '$lib/components/AppFooter.svelte'
</script>

<div
  data-theme="quontly"
  class="min-h-screen bg-[radial-gradient(circle_at_8%_8%,rgba(255,122,69,0.22),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(52,180,168,0.2),transparent_30%),linear-gradient(180deg,#0b111b_0%,#111a2a_42%,#0b111b_100%)] text-base-content"
>
  <AppHeader/>
  <slot />
  <AppFooter />
</div>