$('.thumbnails img').on("click", function(){
    $('.large img').attr('src',$(this).attr('src'));
});
