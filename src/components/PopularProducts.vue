<template>
    <div>
        <section aria-labelledby="trending-heading">
            <div class="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:pt-32 lg:px-8">
                <div class="md:flex md:items-center md:justify-between">
                    <h2
                        id="favorites-heading"
                        class="text-2xl font-extrabold tracking-tight text-gray-900"
                    >Trending Products</h2>
                    <a
                        href="#"
                        class="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block"
                    >
                        Shop the collection
                        <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>

                <div
                    class="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8"
                >
                    <div
                        v-for="product in trendingProducts"
                        :key="product.id"
                        class="group relative"
                    >
                        <div
                            class="w-full h-56 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80"
                        >
                            <img
                                :src="product.image"
                                :alt="product.title"
                                class="w-full h-full object-center object-cover"
                            />
                        </div>
                        <h3 class="mt-4 text-sm text-gray-700">
                            <router-link to="/product">
                                <span class="absolute inset-0" />
                            </router-link>
                            {{ product.title }}
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">Natural</p>
                        <p class="mt-1 text-sm font-medium text-gray-900">{{ product.price }}</p>
                    </div>
                </div>

                <div class="mt-8 text-sm md:hidden">
                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                        Shop the collection
                        <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>
        </section>

        <section aria-labelledby="perks-heading" class="bg-gray-50 border-t border-gray-200">
            <h2 id="perks-heading" class="sr-only">Our perks</h2>

            <div class="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
                <div
                    class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0"
                >
                    <div
                        v-for="perk in perks"
                        :key="perk.name"
                        class="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                    >
                        <div class="md:flex-shrink-0">
                            <div class="flow-root">
                                <img class="-my-1 h-24 w-auto mx-auto" :src="perk.imageUrl" alt />
                            </div>
                        </div>
                        <div class="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                            <h3
                                class="text-sm font-semibold tracking-wide uppercase text-gray-900"
                            >{{ perk.name }}</h3>
                            <p class="mt-3 text-sm text-gray-500">{{ perk.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue"
const trendingProducts = ref([])
const perks = [
    {
        name: 'Free returns',
        imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
        description: 'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
    },
    {
        name: 'Same day delivery',
        imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
        description:
            'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
    },
    {
        name: 'All year discount',
        imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
        description: 'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
    },
    {
        name: 'For the planet',
        imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
        description: 'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.',
    },
]

const getProducts = () => {
    axios.get("https://fakestoreapi.com/products?limit=4").then((res) => {
        console.log(res.data);
        trendingProducts.value = res.data
    })
}

getProducts();
</script>