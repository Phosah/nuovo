<template>
    <div>
        <Hero />
        <PopularProducts />
        <PopularProducts />
        <PopularProducts />
        <PopularProducts />
    </div>
</template>

<script>
import Hero from "../components/Hero.vue";
import PopularProducts from "../components/PopularProducts.vue";
export default {
    name: "Home",
    components: { Hero, PopularProducts }
}

</script>