<template>
    <header class="relative overflow-hidden">
        <!-- Top navigation -->
        <nav
            aria-label="Top"
            class="relative z-20 bg-white bg-opacity-90 backdrop-filter backdrop-blur-xl"
        >
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="h-16 flex items-center">
                    <button
                        type="button"
                        class="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                        @click="open = true"
                    >
                        <span class="sr-only">Open menu</span>
                        <MenuIcon class="h-6 w-6" aria-hidden="true" />
                    </button>

                    <!-- Logo -->
                    <div class="ml-4 flex lg:ml-0">
                        <router-link to="/">
                            <span class="sr-only">Workflow</span>
                            <img
                                class="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                                alt
                            />
                        </router-link>
                    </div>

                    <div v-for="(item, ix) in navigation" :key="ix">
                        <div class="mx-2 px-2 text-gray-700 capitalize">
                            <router-link :to="'/category/' + item">{{ item }}</router-link>
                        </div>
                    </div>

                    <div class="ml-auto flex items-center">
                        <div
                            class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
                        >
                            <a
                                href="#"
                                class="text-sm font-medium text-gray-700 hover:text-gray-800"
                            >Sign in</a>
                            <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
                            <a
                                href="#"
                                class="text-sm font-medium text-gray-700 hover:text-gray-800"
                            >Create account</a>
                        </div>

                        <div class="hidden lg:ml-8 lg:flex">
                            <a href="#" class="text-gray-700 hover:text-gray-800 flex items-center">
                                <img
                                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                                    alt
                                    class="w-5 h-auto block flex-shrink-0"
                                />
                                <span class="ml-3 block text-sm font-medium">CAD</span>
                                <span class="sr-only">, change currency</span>
                            </a>
                        </div>

                        <!-- Search -->
                        <div class="flex lg:ml-6">
                            <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Search</span>
                                <SearchIcon class="w-6 h-6" aria-hidden="true" />
                            </a>
                        </div>

                        <!-- Cart -->
                        <div class="ml-4 flow-root lg:ml-6">
                            <router-link to="/checkout" class="group -m-2 p-2 flex items-center">
                                <ShoppingBagIcon
                                    class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                                <span
                                    class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
                                >0</span>
                                <span class="sr-only">items in cart, view bag</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import { onMounted, computed, ref } from 'vue'
import axios from "axios"
import { useStore } from 'vuex'
import {
    Dialog,
    DialogOverlay,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/vue/outline'

export default {
    components: {
        Dialog,
        DialogOverlay,
        Popover,
        PopoverButton,
        PopoverGroup,
        PopoverPanel,
        Tab,
        TabGroup,
        TabList,
        TabPanel,
        TabPanels,
        TransitionChild,
        TransitionRoot,
        MenuIcon,
        SearchIcon,
        ShoppingBagIcon,
        XIcon,
    },
    setup() {
        const open = ref(false)
        const store = useStore();

        const navigation = computed(() => {
            return store.state.navigation
        })

        onMounted(() => {
            store.dispatch("getCategories");
        })

        return {
            open,
            navigation
        }
    },
}
</script>