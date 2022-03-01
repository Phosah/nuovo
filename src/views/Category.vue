<template>
    <div v-if="$store.state.loading" class="h-screen w-full text-center text-3xl">LOADING.....</div>
    <main v-else>
        <div class="bg-white">
            <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{{ categoryName }}</h1>
                <p
                    class="mt-4 max-w-xl text-sm text-gray-700"
                >Our thoughtfully designed workspace objects are crafted in limited runs. Improve your productivity and organization with these sale items before we run out.</p>
            </div>
        </div>

        <!-- Filters -->
        <section aria-labelledby="filter-heading">
            <h2 id="filter-heading" class="sr-only">Filters</h2>

            <div class="relative z-10 bg-white border-b border-gray-200 pb-4">
                <div
                    class="max-w-7xl mx-auto px-4 flex items-center justify-between sm:px-6 lg:px-8"
                >
                    <Menu as="div" class="relative inline-block text-left">
                        <div>
                            <MenuButton
                                class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                            >
                                Sort
                                <ChevronDownIcon
                                    class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                            </MenuButton>
                        </div>

                        <transition
                            enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95"
                        >
                            <MenuItems
                                class="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                                <div class="py-1">
                                    <MenuItem
                                        v-for="option in sortOptions"
                                        :key="option.name"
                                        v-slot="{ active }"
                                    >
                                        <a
                                            :href="option.href"
                                            :class="[option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm']"
                                        >{{ option.name }}</a>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </transition>
                    </Menu>

                    <button
                        type="button"
                        class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                        @click="mobileFiltersOpen = true"
                    >Filters</button>

                    <div class="hidden sm:block">
                        <div class="flow-root">
                            <PopoverGroup class="-mx-4 flex items-center divide-x divide-gray-200">
                                <Popover
                                    v-for="(section, sectionIdx) in filters"
                                    :key="section.name"
                                    class="px-4 relative inline-block text-left"
                                >
                                    <PopoverButton
                                        class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                                    >
                                        <span>{{ section.name }}</span>
                                        <span
                                            v-if="sectionIdx === 0"
                                            class="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums"
                                        >1</span>
                                        <ChevronDownIcon
                                            class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </PopoverButton>

                                    <transition
                                        enter-active-class="transition ease-out duration-100"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-75"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95"
                                    >
                                        <PopoverPanel
                                            class="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        >
                                            <form class="space-y-4">
                                                <div
                                                    v-for="(option, optionIdx) in section.options"
                                                    :key="option.value"
                                                    class="flex items-center"
                                                >
                                                    <input
                                                        :id="`filter-${section.id}-${optionIdx}`"
                                                        :name="`${section.id}[]`"
                                                        :value="option.value"
                                                        type="checkbox"
                                                        :checked="option.checked"
                                                        class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <label
                                                        :for="`filter-${section.id}-${optionIdx}`"
                                                        class="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                                                    >{{ option.label }}</label>
                                                </div>
                                            </form>
                                        </PopoverPanel>
                                    </transition>
                                </Popover>
                            </PopoverGroup>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Active filters -->
            <div class="bg-gray-100">
                <div class="max-w-7xl mx-auto py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
                    <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Filters
                        <span class="sr-only">, active</span>
                    </h3>

                    <div aria-hidden="true" class="hidden w-px h-5 bg-gray-300 sm:block sm:ml-4" />

                    <div class="mt-2 sm:mt-0 sm:ml-4">
                        <div class="-m-1 flex flex-wrap items-center"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Product grid -->
        <section
            aria-labelledby="products-heading"
            class="max-w-2xl mx-auto pt-12 pb-16 px-4 sm:pt-16 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8"
        >
            <h2 id="products-heading" class="sr-only">Products</h2>
            <div
                class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
            >
                <div
                    v-for="product in products"
                    :key="product.id"
                    :href="product.href"
                    class="group"
                >
                    <div
                        class="h-96 w-full aspect-w-1 aspect-h-1 p-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
                    >
                        <router-link :to="'/products/' + product.id">
                            <img
                                :src="product.image"
                                :alt="product.imageAlt"
                                class="w-full h-full object-center object-contain group-hover:opacity-75 inset-0"
                            />
                        </router-link>
                    </div>
                    <h3 class="mt-4 text-sm text-gray-700">{{ product.title }}</h3>
                    <p class="mt-1 text-lg font-medium text-gray-900">{{ product.price }}</p>
                    <div class="flex space-x-1">
                        <div v-for="n in 5" :key="n">
                            <StarIcon
                                class="w-5 h-5"
                                :class="n <= getRating(product.rating.rate) ? 'text-yellow-600' : 'text-gray-300'"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { computed, onMounted, onActivated, onUpdated, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'
import { StarIcon } from '@heroicons/vue/solid'
const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]
const filters = [
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'new-arrivals', label: 'All New Arrivals', checked: false },
            { value: 'tees', label: 'Tees', checked: false },
            { value: 'objects', label: 'Objects', checked: true },
            { value: 'sweatshirts', label: 'Sweatshirts', checked: false },
            { value: 'pants-shorts', label: 'Pants & Shorts', checked: false },
        ],
    },
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: false },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
        ],
    },
    {
        id: 'sizes',
        name: 'Sizes',
        options: [
            { value: 'xs', label: 'XS', checked: false },
            { value: 's', label: 'S', checked: false },
            { value: 'm', label: 'M', checked: false },
            { value: 'l', label: 'L', checked: false },
            { value: 'xl', label: 'XL', checked: false },
            { value: '2xl', label: '2XL', checked: false },
        ],
    },
]

const route = useRoute();
const store = useStore();

const products = computed(() => {
    return store.state.products
})

const categoryName = computed(() => {
    return route.params.category;
})

onMounted(() => {
    store.dispatch("getCategoryProducts", categoryName.value)
})

const getRating = (rating) => {
    return Math.round(rating)
};
</script>