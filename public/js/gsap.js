
// Navbar

let tl = gsap.timeline();

tl.from(".navbar-brand", {
    y:-20,
    duration:0.4,
    opacity:0,
})

tl.from(".navbar-nav", {
    y:-10,
    duration:0.4,
    opacity:0,
    stagger:0.1,
})


gsap.from(".container-fluid h3", {
    x:-100,
    duration:0.8,
    opacity:0,
    delay:0.2,
})

// Card 

gsap.from(".listing-card",{
    opacity:0,
    scale:0,
    duration:0.6,
    delay:0.5,
    stagger:0.15,
}
)