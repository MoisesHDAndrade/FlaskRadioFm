// function radio(element, event){
//     event.preventDefault()
//     var radio_url = document.getElementById(element)
    
//     radio_url.getElementsByTagName('span').innerText = "Playing"
//     var radio = document.getElementById('radio')
    
//     var radio_source = document.getElementById('audio-source')
//     radio_source.src = radio_url.getAttribute('data-value')
    
//     radio.volume = 0.06
//     radio.pause()
//     radio.load()
//     radio.play()
    
//     return element
// }