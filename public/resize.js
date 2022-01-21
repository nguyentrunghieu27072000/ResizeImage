$(document).ready(function(){
    const regex = /[0-9]/
    $(document).on('click','.crop',function(){
        $.ajax({
            url: '/crop',
            method: 'post',
            data: {
                'action': $(this).text(),
                'value' : $(this).val(),
            }
        }).done(function(res){
            $('#new_width_cropped').text(res.info.width)
            $('#new_height_cropped').text(res.info.height)
            $('input[name=width_present]').val(res.info.width)
            $('input[name=height_present]').val(res.info.height)
        }).always(() => {
            d = new Date();
            src_img = $('#image-preview').attr('src')
            $('#image-preview').attr('src',`${src_img}?v=${d.getTime()}`)
        })
    })
    $(document).on('input','.resize',function(){
        value = $(this).val()
        $(this).val(value.replace(/[^0-9]/g,''));
    })
})
$(function(){
    
    let estimated = 0;
    $('.resize').on('change',function(){
        let width_present = $('input[name=width_present]').val()
        let height_present = $('input[name=height_present]').val()
        let dimensions = $(this).attr('id');
        let value = $(this).val();

        if(dimensions == 'width'){
            $('#new_width_final').text(value);
            if($('#height').val() == ''){
                estimated = Math.round(value * height_present / width_present)
                $('#new_height_final').text(estimated);
            }
            else if(value == ''){
                estimated = Math.round($('#height').val() * width_present / height_present)
                $('#new_width_final').text(estimated);
            }
            else{
                $('#new_height_final').text($('#height').val());
            }
        }else{
            $('#new_height_final').text(value);
            if($('#width').val() == ''){
                estimated = Math.round(value * width_present / height_present)
                $('#new_width_final').text(estimated);
            }
            else if(value == ''){
                estimated = Math.round($('#width').val() * height_present / width_present)
                $('#new_height_final').text(estimated);
            }else{
                $('#new_width_final').text($('#width').val());
            }
        }
    })
    
})