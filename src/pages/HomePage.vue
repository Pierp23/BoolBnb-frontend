<script>
import { store } from "../store";
import axios from "axios";
import BannerComponent from '../components/BannerComponent.vue';
import ApartmentCard from '../components/ApartmentCard.vue';
import LoadingComponent from '../components/LoadingComponent.vue';
import ReviewsComponent from "../components/ReviewsComponent.vue";
import CitationComponent from "../components/CitationComponent.vue";


export default {
	data() {
		return {
			totalAptPages: null,
			nextPageCounter: 1,
			aptLoading: false,
			inputSearchbar: null,
			store,
			currentPage: ''
		}
	},
	mounted() {
		var options = {
			minNumberOfCharacters: 0,
			searchOptions: {
				key: "KEiNGuhsySt5PgvkmCw7C9Sb5vGdacR6",
				language: "it-IT",
				limit: 5,
			},
			autocompleteOptions: {
				key: "KEiNGuhsySt5PgvkmCw7C9Sb5vGdacR6",
				language: "it-IT",
			},
		}
		var ttSearchBox = new tt.plugins.SearchBox(tt.services, options)
		var searchBoxHTML = ttSearchBox.getSearchBoxHTML()
		let prova = this.$refs.prova;
		prova.appendChild(searchBoxHTML);
		ttSearchBox.on("tomtom.searchbox.resultsfound", this.handleResultsFound)

	},
	methods: {
		handleResultsFound(event) {
			var results = event.data.results;
			this.store.inputSearchBar = results.autocomplete.context.inputQuery
			let lat = results.fuzzySearch.results[0].position.lat
			let lon = results.fuzzySearch.results[0].position.lng
			this.store.lat = lat
			this.store.lon = lon
			this.store.city = results
			if (event.data.results.fuzzySearch.results.length === 0) {
				this.getApt()
			}

		},
		getApt() {
			this.aptLoading = true
			axios.get('http://127.0.0.1:8000/api/apartment')
				.then(res => {
					this.store.apartments = res.data.results.data
					this.currentPage = res.data.results.current_page
					this.totalAptPages = res.data.results.last_page
					this.store.totalApt = res.data.results.total
					this.aptLoading = false
					// console.log(res)

				})
				.catch(err => {
					console.log(err)
					this.aptLoading = false
				})
		},
		search(param, lat, lon) {
			this.aptLoading = true
			let data = {
				data: param, lat, lon
			}
			axios.post('http://127.0.0.1:8000/api/apartment', data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
				.then(res => {
					// console.log(res)
					this.store.apartments = res.data.results.data
					this.totalAptPages = res.data.results.last_page
					this.aptLoading = false
					this.store.totalApt = res.data.results.total
				})
				.catch(err => {
					console.log(err)
				})
		},
		nextPage() {
			// this.scrollToTop()
			if (this.nextPageCounter < this.totalAptPages) {
				this.nextPageCounter++
			}
			else {
				this.nextPageCounter = 1
			}
			this.aptLoading = true
			axios.get(`http://127.0.0.1:8000/api/apartment?page=${this.nextPageCounter}`)
				.then(res => {
					// console.log(res.data.results)
					this.currentPage = res.data.results.current_page
					this.store.apartments = res.data.results.data
					this.aptLoading = false
					this.scrollToTop()
					
				})
				.catch(err => {
					console.log(err)
					this.aptLoading = false
				})
		}
		,
		prevPage() {
			if (this.nextPageCounter > 1) {
				this.nextPageCounter--
			}
			else {
				this.nextPageCounter = this.totalAptPages
			}
			this.aptLoading = true
			axios.get(`http://127.0.0.1:8000/api/apartment?page=${this.nextPageCounter}`)
				.then(res => {
					// console.log(res.data.results)
					this.currentPage = res.data.results.current_page
					this.store.apartments = res.data.results.data
					this.aptLoading = false
					this.scrollToTop()
				})
				.catch(err => {
					console.log(err)
					this.aptLoading = false
				})
		},
		scrollToTop(){
			this.$refs.top.scrollIntoView()
		}
	},
	created() {
		this.getApt();
	},
	components: {
		BannerComponent,
		ApartmentCard,
		LoadingComponent,
		ReviewsComponent,
		CitationComponent
	}
}
</script>

<template>
	<BannerComponent/>

	<div class="search-bar-div" ref="top">
		<div ref="prova" class="w-50 border-rounded-4">

		</div>
		<div class="mt-5">
			<span class="search-link">
				<router-link :to="{ name: 'search' }" class="btn-contact">Cerca</router-link>
			</span>

		</div>
	</div>


	<div class="container">
		<div id="my-container" class="mt-5 d-flex justify-content-center flex-wrap align-content-stretch w-100">
			
			<template v-if="aptLoading">
				<LoadingComponent />
			</template>
			<template v-if="!aptLoading">
				<template v-if="store.apartments.length > 0 || store.apartments.lenght != null">
					<div class="col-12 col-md-4 my-3 px-2 d-flex align-content-stretch" v-for="(apt, i) in store.apartments"
						:key="i">
						<ApartmentCard :arr="apt.sponsorships" :name="apt.name" :address="apt.address" :path="apt.cover_img"
							:price="apt.price" :id="apt.id" :square_meter="apt.square_meter" />
					</div>
				</template>
				<template v-else>
					<h3 class="app-notfound">
						Nessun appartamento trovato
					</h3>
				</template>
				<div v-if="store.apartments.length > 0 || store.apartments.length != null"
					class="col-12 d-flex justify-content-center">
					<button :disabled='nextPageCounter == 1' @click="prevPage" class="btn-contact-opp me-3">
						prev
					</button>
					<button :disabled="currentPage == totalAptPages || store.apartments.length == store.totalApt"
						@click="nextPage" class="btn-contact-opp ms-3">
						next
					</button>
				</div>

			</template>
		</div>


	</div>

	<ReviewsComponent />

	<CitationComponent />
</template>

<style lang="scss" scoped>
.search-link {
	* {
		text-decoration: none;
	}
}

.search-bar-div {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.app-notfound {
	margin-bottom: 2.5rem;
	font-weight: bold;
	color: #3461AB;
}

.btn-contact {
	padding: 8px;
	font-size: 13px;
	background-color: #00ABE8;
	color: white;
	font-weight: bold;
	border-radius: 10px !important;
	border: none !important;
}

.btn-contact:hover {
	background-color: #3461AB;
	color: white;
	font-weight: bold;
}

.btn-contact-opp {
	padding: 8px;
	font-size: 13px;
	background-color: #3461AB;
	color: white;
	font-weight: bold;
	border-radius: 10px !important;
	border: none !important;
}

.btn-contact-opp:hover {
	background-color: #00ABE8;
	color: white;
	font-weight: bold;
}

.btn-contact-opp:disabled {
	background-color: gray;
}
</style>