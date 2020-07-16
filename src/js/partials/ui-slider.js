function uiSliderInit() {
    $(".ui-slider-item-js").each(function () {
        $(this).slider({
            min: $(this).data('min'),
            max: $(this).data('max'),
            values: [$(this).data('min'),$(this).data('max')],
            range: true,
            step: $(this).data('step'),
            animate: 'slow',
            stop: function(event, ui) {
                $(this).parent().find('.min-value-js input').val($(".ui-slider-item-js").slider("values",0));
                $(this).parent().find('.max-value-js input').val($(".ui-slider-item-js").slider("values",1));
            },
            slide: function(event, ui){
                $(this).parent().find('.min-value-js input').val($(".ui-slider-item-js").slider("values",0));
                $(this).parent().find('.max-value-js input').val($(".ui-slider-item-js").slider("values",1));
            }
        });
    });

    $(".ui-slider-container .min-value-js").find('input').change(function(){
        var container = $(this).closest('.ui-slider-container');

        var minPrice = $(this).val();
        var maxPrice = container.find('max-value-js input').val();

        if(parseInt(minPrice) > parseInt(maxPrice)){
            minPrice = maxPrice;
            $(this).val(minPrice);
        }
        container.find(".ui-slider-item-js").slider("values",0,minPrice);
    });

    $(".ui-slider-container .max-value-js").find('input').change(function(){
        var container = $(this).closest('.ui-slider-container');

        var minPrice = container.find('min-value-js input').val();
        var maxPrice = $(this).val();

        if (maxPrice > 5000) {
            maxPrice = 5000;
            $(this).val(maxPrice);
        }

        if(parseInt(minPrice) > parseInt(maxPrice)){
            maxPrice = minPrice;
            $(this).val(maxPrice);
        }
        container.find(".ui-slider-item-js").slider("values",1,maxPrice);
    });

    $(document).find(".ui-slider-item-js--single").each(function () {
        $(this).slider({
            min: $(this).data('min'),
            max: $(this).data('max'),
            values: [$(this).data('min'),$(this).data('current')],
            range: true,
            step: $(this).data('step'),
            animate: 'slow',
            stop: function(event, ui) {
                $(this).parent().find('.max-value-js').val(ui.value);
            },
            slide: function(event, ui){
                $(this).parent().find('.max-value-js').val(ui.value);
                $(this).parent().find('.current-value-js .value').html(ui.value)
            },
            create: function( event, ui ) {
                $(this).find('.ui-slider-handle').eq(0).css('display', 'none');
                $(this).parent().find('.current-value-js .value').html($(this).slider("values",1));
                $(this).parent().find('.max-value-js').val($(this).slider("values",1));
            }
        });
    });

    // бегунки с рейнджем
    $(document).find(".ui-slider-item-js--double").each(function () {
        $(this).slider({
            min: $(this).data('min'),
            max: $(this).data('max'),
            values: [$(this).data('current-min'),$(this).data('current-max')],
            range: true,
            step: $(this).data('step'),
            animate: 'slow',
            stop: function(event, ui) {
                $(this).closest('.ui-slider-container').find('.min-value-js input').val($(this).slider("values",0));
                $(this).closest('.ui-slider-container').find('.max-value-js input').val($(this).slider("values",1));
            },
            slide: function(event, ui){
                $(this).closest('.ui-slider-container').find('.min-value-js input').val($(this).slider("values",0));
                $(this).closest('.ui-slider-container').find('.max-value-js input').val($(this).slider("values",1));
            },
            create: function( event, ui ) {
                $(this).closest('.ui-slider-container').find('.min-value-js input').val($(this).slider("values",0));
                $(this).closest('.ui-slider-container').find('.max-value-js input').val($(this).slider("values",1));
            }
        });
    });

    $(".ui-slider-container--double .min-value-js").find('input').change(function(){

        var container = $(this).closest('.ui-slider-container');
        var minPrice = $(this).val();
        var maxPrice = container.find('.max-value-js input').val();

        if(parseInt(minPrice) > parseInt(maxPrice)){
            minPrice = maxPrice;
            $(this).val(minPrice);
        }
        container.find(".ui-slider-item-js--double").slider("values",0,minPrice);
    });

    $(".ui-slider-container--double .max-value-js").find('input').change(function(){

        var container = $(this).closest('.ui-slider-container');
        var maxPrice = $(this).val();
        var minPrice = container.find('.min-value-js input').val();

        if (maxPrice > container.find('.ui-slider-item-js--double').data('max')) {
            maxPrice = container.find('.ui-slider-item-js--double').data('max');
            $(this).val(maxPrice);
        }

        if(parseInt(minPrice) > parseInt(maxPrice)){
            maxPrice = minPrice;
            $(this).val(maxPrice);
        }

        container.find(".ui-slider-item-js--double").slider("values",1,maxPrice);
    });

};