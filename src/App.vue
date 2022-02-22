<template>
  <div class="flex flex-col h-full bg-gray-50">
    <header>
      <Navbar />
    </header>
    <main class="flex-1">
      <router-view></router-view>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Navbar from "@/components/layout/Navbar.vue"
import Footer from "./components/layout/Footer.vue"

export default {
  name: "App",
  components: { Navbar, Footer }
}
</script>
