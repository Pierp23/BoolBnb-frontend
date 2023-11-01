<script>
import { store } from "../store";
import axios from "axios";
import BannerSearchComponent from '../components/BannerSearchComponent.vue';
import ApartmentCard from '../components/ApartmentCard.vue';
import LoadingComponent from '../components/LoadingComponent.vue';
import ReviewsComponent from "../components/ReviewsComponent.vue";
import CitationComponent from "../components/CitationComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";
import MapComponent from "../components/Map.vue";



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
		let x = document.getElementsByClassName("tt-search-box-input");
		x[0].setAttribute("value", `${this.store.inputSearchBar}`);
		ttSearchBox.on("tomtom.searchbox.resultsfound", this.handleResultsFound)

	},
	methods: {
		handleResultsFound(event) {
			var results = event.data.results;
			// console.log(results)
			let lat = results.fuzzySearch.results[0].position.lat
			let lon = results.fuzzySearch.results[0].position.lng
			console.log(results)
			this.store.lat = lat
			this.store.lon = lon
			this.store.city = results
			if (event.data.results.fuzzySearch.results.length === 0) {
				this.getApt()
			}
			else {
				this.search(results.autocomplete.context.inputQuery, lat, lon);
			}

		},
		search(city, lat, lon, radius) {
			this.aptLoading = true
			let data = {
				city: this.store.city,
				lat: this.store.lat,
				lon: this.store.lon,
				radius: this.store.range
			}
			console.log(data, 'BELLAAAAAA')
			axios.post('http://127.0.0.1:8000/api/apartment', data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
				.then(res => {
					console.log(res, 'DEBUFG')
					this.store.apartments = res.data.results.data
					this.totalAptPages = res.data.results.last_page
					this.aptLoading = false
					this.store.totalApt = res.data.results.total
				})
				.catch(err => {
					console.log(err)
				})
		},
		editRadius() {
			this.aptLoading = true
			let data = {
				lat: this.store.lat,
				lon: this.store.lon,
				radius: this.store.range
			}
			axios.post('http://127.0.0.1:8000/api/apartment', data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
				.then(res => {
					console.log(this.store.radius, 'E ANCHE QUAAAA')
					console.log(res, 'GUARDA QUA')
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
			if (this.nextPageCounter < this.totalAptPages) {
				this.nextPageCounter++
			}
			else {
				this.nextPageCounter = 1
			}
			this.aptLoading = true
			axios.get(`http://127.0.0.1:8000/api/apartment?page=${this.nextPageCounter}`)
				.then(res => {
					this.currentPage = res.data.results.current_page
					this.store.apartments = res.data.results.data
					this.aptLoading = false
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
					this.currentPage = res.data.results.current_page
					this.store.apartments = res.data.results.data
					this.aptLoading = false
				})
				.catch(err => {
					console.log(err)
					this.aptLoading = false
				})
		}
	},
	created() {
		console.log(this.store, 'QUIIIIIIIIIIII')
		if (this.store.city, this.store.lat, this.store.lon, this.store.range) {
			this.search(this.store.city, this.store.lat, this.store.lon, this.store.range)
		}
	},
	components: {
		BannerSearchComponent,
		ApartmentCard,
		LoadingComponent,
		ReviewsComponent,
		CitationComponent,
		ModalComponent,
		MapComponent
	}
}
</script>

<template>
	<BannerSearchComponent />

	<div class="search-bar-div">
		<div ref="prova" @keyup.enter="search()" class="w-50 border-rounded-4">

		</div>
		<div class="mt-4">
			<span class="search-link">
				<button @click="search(store.city, store.lat, store.lon, store.range)" class="btn-contact">Cerca</button>
			</span>
			<span class="mx-3">
				<button type="button" class="btn-contact" data-bs-toggle="modal" data-bs-target="#exampleModal">
					Filtri
				</button>
			</span>
		</div>


		<div class="mt-3 d-flex align-items-center">
			<label for="customRange1" class="form-label mx-3 col-4">Cerca entro {{ store.range }} Km</label>
			<input type="range" class="form-range" id="customRange1" step="5" min="20" max="100" v-model="store.range">
			<button @click="editRadius()" class="btn-contact mx-3 my-2 py-1">Filtra</button>
		</div>
	</div>

	<template v-if="store.apartments != null">
		<div class="container">
			<div id="my-container" class="mt-5 d-flex justify-content-center flex-wrap align-content-stretch w-100">
				<template v-if="aptLoading">
					<LoadingComponent />
				</template>
				<template v-if="!aptLoading">
					<template v-if="store.apartments.length > 0 || store.apartments.lenght != null">
						<div class="col-12 col-md-4 my-3 px-2 d-flex align-content-stretch"
							v-for="(apt, i) in store.apartments" :key="i">
							<ApartmentCard :arr="apt.sponsorships" :name="apt.name" :address="apt.address"
								:path="apt.cover_img" :price="apt.price" :id="apt.id" :square_meter="apt.square_meter" />
						</div>
					</template>
					<template v-else>
						<h3>
							Nessun appartamento trovato
						</h3>
					</template>

					<div v-if="store.apartments.length > 0 || store.apartments.length != null"
						class="col-12 d-flex justify-content-center mb-5">
						<button :disabled='nextPageCounter == 1' @click="prevPage" class="btn-contact-opp me-3">
							&lt prev
						</button>
						<button :disabled="currentPage == totalAptPages || store.apartments.length == store.totalApt"
							@click="nextPage" class="btn-contact-opp ms-3">
							next &gt
						</button>
					</div>

				</template>
			</div>
		</div>
	</template>
	<template v-if="!aptLoading">
		<MapComponent />
		<ModalComponent />
	</template>


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