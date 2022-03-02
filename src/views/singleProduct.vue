<template>
    <div
        v-if="$store.state.loading"
        class="flex items-center justify-center h-screen w-full text-center text-3xl"
    >
        <div class="animate-spin">
            <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clip-rule="evenodd"
                />
            </svg>
        </div>
    </div>
    <main v-else class="max-w-7xl mx-auto sm:pt-16 sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto lg:max-w-none">
            <!-- Product -->
            <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                <!-- Image gallery -->
                <img
                    :src="product.image"
                    alt
                    class="w-full h-96 inset-0 object-center object-contain"
                />

                <!-- Product info -->
                <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                    <h1
                        class="text-3xl font-extrabold tracking-tight text-gray-900"
                    >{{ product.title }}</h1>

                    <div class="mt-3">
                        <h2 class="sr-only">Product information</h2>
                        <p class="text-3xl text-gray-900">{{ product.price }}</p>
                    </div>

                    <!-- Reviews -->
                    <div class="mt-3">
                        <h3 class="sr-only">Reviews</h3>
                        <div class="flex items-center">
                            <div class="flex items-center">
                                <div v-for="n in totalRatings" :key="n">
                                    <StarIcon class="w-5 h-5" :class="showColor(n)" />
                                </div>
                                <!-- <div v-for="n in totalRatings - getRating" :key="n">
                                    <StarIcon class="w-5 h-5 text-gray-300" />
                                </div>-->
                            </div>
                            <p class="sr-only">{{ product.rating }} out of 5 stars</p>
                        </div>
                    </div>

                    <div class="mt-6">
                        <h3 class="sr-only">Description</h3>

                        <div
                            class="text-base text-gray-700 space-y-6"
                            v-html="product.description"
                        />
                    </div>

                    <form class="mt-6">
                        <!-- Colors -->
                        <div>
                            <h3 class="text-sm text-gray-600">Color</h3>
                        </div>

                        <div class="mt-10 flex sm:flex-col1">
                            <button
                                @click="addToBag(product)"
                                type="button"
                                class="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                            >Add to bag</button>

                            <button
                                @click="$store.commit('TOGGLE_FAVORITES', product)"
                                type="button"
                                :class="favColor(product)"
                                class="ml-4 py-3 px-3 rounded-md flex items-center justify-center hover:bg-gray-100 hover:text-gray-500"
                            >
                                <HeartIcon class="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                <span class="sr-only">Add to favorites</span>
                            </button>
                        </div>
                    </form>

                    <section aria-labelledby="details-heading" class="mt-12">
                        <h2 id="details-heading" class="sr-only">Additional details</h2>

                        <div class="border-t divide-y divide-gray-200">
                            <Disclosure
                                as="div"
                                v-for="detail in product.details"
                                :key="detail.name"
                                v-slot="{ open }"
                            >
                                <h3>
                                    <DisclosureButton
                                        class="group relative w-full py-6 flex justify-between items-center text-left"
                                    >
                                        <span
                                            :class="[open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium']"
                                        >{{ detail.name }}</span>
                                        <span class="ml-6 flex items-center">
                                            <PlusSmIcon
                                                v-if="!open"
                                                class="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            <MinusSmIcon
                                                v-else
                                                class="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </DisclosureButton>
                                </h3>
                                <DisclosurePanel as="div" class="pb-6 prose prose-sm">
                                    <ul role="list">
                                        <li v-for="item in detail.items" :key="item">{{ item }}</li>
                                    </ul>
                                </DisclosurePanel>
                            </Disclosure>
                        </div>
                    </section>
                </div>
            </div>

            <section
                aria-labelledby="related-heading"
                class="mt-10 border-t border-gray-200 py-16 px-4 sm:px-0"
            >
                <h2
                    id="related-heading"
                    class="text-xl font-bold text-gray-900"
                >Customers also bought</h2>

                <div
                    class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                >
                    <div v-for="product in relatedProducts" :key="product.id">
                        <router-link :to="'/products/' + product.id">
                            <div class="relative">
                                <div class="relative w-full h-72 rounded-lg overflow-hidden">
                                    <img
                                        :src="product.image"
                                        :alt="product.imageAlt"
                                        class="w-full h-full inset-0 object-center object-contain"
                                    />
                                </div>
                                <div class="relative mt-4">
                                    <h3
                                        class="text-sm font-medium text-gray-900"
                                    >{{ product.title }}</h3>
                                    <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
                                </div>
                                <div
                                    class="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden"
                                >
                                    <div
                                        aria-hidden="true"
                                        class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                    />
                                    <p
                                        class="relative text-lg font-semibold text-white"
                                    >{{ product.price }}</p>
                                </div>
                            </div>
                        </router-link>
                        <div class="mt-6">
                            <a
                                :href="product.href"
                                class="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
                            >
                                Add to bag
                                <span class="sr-only">, {{ product.name }}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/vue'
import {
    HeartIcon,
    MinusSmIcon,
    PlusSmIcon,
} from '@heroicons/vue/outline'
import { StarIcon } from '@heroicons/vue/solid'

export default {
    components: {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        RadioGroup,
        RadioGroupLabel,
        RadioGroupOption,
        Tab,
        TabGroup,
        TabList,
        TabPanel,
        TabPanels,
        HeartIcon,
        MinusSmIcon,
        PlusSmIcon,
        StarIcon,
    },
    setup() {
        const open = ref(false)
        const route = useRoute()
        const store = useStore()
        const productId = computed(() => {
            return route.params.id
        });

        const product = computed(() => {
            return store.state.singleProduct
        });

        const favorites = computed(() => {
            return store.state.favorites
        });

        const relatedProducts = computed(() => {
            return store.state.products
        });

        const totalRatings = 5
        const getRating = computed(() => {
            if (!product.value.rating) {
                return 0
            } else {
                return Math.round(product.value.rating.rate);
            }
        });

        const showColor = (n) => {
            if (n <= getRating.value) {
                return 'text-orange-300'
            } else {
                return 'text-gray-300'
            }
        }

        const favColor = (p) => {
            if (favorites.value.includes(p.id)) {
                console.log("Color added successfully");
                return '!bg-purple-700 !text-white'
            } else {
                return 'text-gray-400'
            }
        }

        const addToBag = (p) => {
            store.commit("ADD_TO_CART", p)
        }

        onMounted(() => {
            store.dispatch("getSingleProduct", productId.value)
        })

        return {
            product,
            favorites,
            relatedProducts,
            open,
            getRating,
            totalRatings,
            showColor,
            addToBag,
            favColor
        }
    },
}
</script>