var BASE_URL = "//localhost:5000"
            var vue = new Vue({
                el: '#app',
                delimiters: ["[[","]]"],
                data:{
                    radios:[],
                    search:'',
                    volume: 50,
                    playing: false,
                    currentRadioImage: '',
                    currentRadioName: '',
                    playingIndex: null,

                },
                methods:{
                    getRadios(){
                        axios.post(`${BASE_URL}/api`, {
                            "search": this.search
                        }, this.newHeaders()).then(response =>{
                            this.radios = response.data
                            console.log(response.data)
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
                        
                        vol.addEventListener("change", function(){
                            audio.volume = vol.value/100
                        })
                        audio.play()
                        this.currentRadioImage = radio.favicon
                        this.currentRadioName = radio.name
                        this.playingIndex = index
                        // console.log(event.target.parentNode.parentNode.parentNode.parentNode)
                    },

                    getCookie(name) {
                        var cookieValue = null;
                        if (document.cookie && document.cookie !== '') {
                            var cookies = document.cookie.split(';');
                            for (var i = 0; i < cookies.length; i++) {
                                var cookie = cookies[i].trim();
                                // Does this cookie string begin with the name we want?
                                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                    break;
                                }
                            }
                        }
                        return cookieValue;
                    },

                    newHeaders(){
                        axios.defaults.xsrfHeaderName = "X-CSRFToken";
                        const csrftoken = this.getCookie('csrftoken');
                        const headers = {"X-CSRFTOKEN": csrftoken}
                        return headers
                    },
                }
            })