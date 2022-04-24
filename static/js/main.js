var BASE_URL = "//localhost:5000"
            var vue = new Vue({
                el: '#app',
                delimiters: ["[[","]]"],
                data:{
                    radios:[],
                    search:'',
                    volume: 30,
                    lastVolume: 0,
                    playing: false,
                    currentRadioImage: '',
                    currentRadioName: '',
                    playingIndex: null,
                    noImage : ''

                },
                methods:{
                    returnNoImage(){
                        axios.get(`https://source.unsplash.com/600x400/?radio`).then(
                            response =>{
                                this.noImage = response.request.responseURL
                            }
                        )
                       
                    },
                    getRadios(){
                        if(!this.search){
                            this.getMostPlayed()
                            return
                        }
                        axios.post(`${BASE_URL}/api`, {
                            "search": this.search
                        }).then(response =>{
                            this.radios = response.data
                            
                        })
                    },
                    getMostPlayed(){
                        axios.get(`https://nl1.api.radio-browser.info/json/stations/search?limit=12&hidebroken=true&has_extended_info=true&order=clickcount&reverse=true`)
                        .then(response =>{
                            this.radios = response.data
                        })
                    },
                    pauseRadio(){
                        if(this.playing){
                            this.playing = false
                            document.getElementById('player').pause()
                        }
                        else{
                            this.playing = true
                            document.getElementById('player').play()
                        }
                        
                    
                    },
                    playRadio(index, radio, event){
                        var audio = document.getElementById('player');
                        var vol = document.getElementById("formControlRange")
                        audio.src = ""
                        audio.src = radio.url_resolved
                        this.playing = true
                        audio.volume = vol.value/100
                        
                        // vol.addEventListener("change", function(){
                        //     audio.volume = vol.value/100
                        // })
                        audio.play()
                        this.currentRadioImage = radio.favicon
                        this.currentRadioName = radio.name
                        this.playingIndex = index
                        document.title = `FlaskRadio | ${this.currentRadioName}`
                        // console.log(event.target.parentNode.parentNode.parentNode.parentNode)
                    },
                    changeVolume(){
                        let audio = document.getElementById('player');
                        audio.volume  = this.volume/100
                    },
                    muteVolume(){
                        let audio = document.getElementById('player');
                        
                        if(this.volume > 0){
                            this.lastVolume = this.volume
                            this.volume = 0
                            audio.volume  = this.volume/100
                        }
                        else{
                            this.volume = this.lastVolume
                            audio.volume = this.volume/100
                        }
                    },

                   
                },
                mounted(){
                    this.getMostPlayed()
                    this.returnNoImage()
                }
            })