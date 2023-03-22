document.querySelector('.register').querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault()

    // TODO how to get all data from form inputs

    document.querySelector('.register').classList.add('off')

    document.querySelector('.login').classList.remove('off')
})

document.querySelector('.login').querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault()
    
    document.querySelector('.login').classList.add('off')

    document.querySelector('.home').classList.remove('off')
})

document.querySelector('.nitems').querySelector('.alogin').addEventListener('click', function (event) {
    event.preventDefault()
    
    document.querySelector('.register').classList.add('off')
    document.querySelector('.home').classList.add('off')
    document.querySelector('.login').classList.remove('off')
    
})
$(function(){
    $("alogin").on("click",function(){
	$(this).parent().toggleClass("active");
    });
});