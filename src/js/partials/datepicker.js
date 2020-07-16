function datepickerInit(selector) {
	elements = $(selector).find('input');
	if (elements.length) {
		var datepickers = [];
		for (var i = 0; i < elements.length; i++) {
			datepickers[i] = $(elements[i]).datepicker({
				timepicker: true
			}).data('datepicker');

			$(datepickers[i].$el).closest(selector).attr('data-picker', i);

			$(datepickers[i].$el).closest(selector).on('click', '.prepend-remove', function (e) {
				e.preventDefault();
				var picker_number = $(this).closest(selector).attr('data-picker');
				datepickers[picker_number].hide();
			});

			$(datepickers[i].$el).closest(selector).on('click', '.prepend-icon', function (e) {
				e.preventDefault();
				var picker_number = $(this).closest(selector).attr('data-picker');
				datepickers[picker_number].show();
			});
		}
	}
}

