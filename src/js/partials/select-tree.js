(function() {
	function SelectTree(settings) {
		var options = mergeObjects(SelectTree.defaults , settings);
		init(options);
	}

	function init(settings) {
		var elements = document.querySelectorAll(settings.selector);
		if (elements.length) {
			for (var i = 0; i < elements.length; i++) {
				addEvents(elements[i]);
			}
		}
		//JQUERY PLUGIN NICESCROLL //
		$(settings.selector).find('.select-tree-box').niceScroll({
			touchbehavior: true,
			autohidemode:false,
			cursorcolor:"#d9dee9",
			cursorborder: "none",
			background: "#f7f9fc",
			grabcursorenabled: false,
		});
	}

	function hide(element) {

	}

	function addEvents(element){
		element.addEventListener('click' , function(e) {
			e.stopPropagation();
			if (!(e.target.closest('.select-tree-options') || e.target.closest('.pseudo-item'))) { // add polyfill for closest
				element.classList.toggle('open');
				updateScroll();
			}
		});

		var inputs = element.querySelectorAll('input[type="checkbox"]');
		if (inputs.length) {
			for (var i = 0; i < inputs.length; i++) {
				inputs[i].addEventListener('change', function (e) {
					updateData(element, this);
				});
			}
		}
		var groups = element.querySelectorAll('.grouped-title');
		if (groups.length) {
			for (var i = 0; i < groups.length; i++) {
				groups[i].addEventListener('click', function (e) {
					e.preventDefault();
					this.closest('.grouped-category').classList.toggle('open');
					updateScroll();
				});
			}
		}
		var pseudoItems = element.querySelectorAll('.pseudo-item i');
		if (pseudoItems.length) {
			for (var i = 0; i < pseudoItems.length; i++) {
				pseudoItems[i].addEventListener('click', function (e) {
					removeItem(element.querySelector('.pseudo-input'), this.parentElement.dataset.value);
				});
			}
		}
	}

	function updateData(element, changedInput) {
		var checkboxContainer = changedInput.parentElement,
			resultInput = element.querySelector('input[type="hidden"]'),
			pseudoInput = element.querySelector('.pseudo-input'),
			result = resultInput.value ? resultInput.value.split(',') : [],
			node = checkboxContainer.closest('.select-tree-node'),
			children = '';

		if (changedInput.checked) {
			if (checkboxContainer.classList.contains('child-item')) {
				result.push(changedInput.value);
				renderItem(pseudoInput, changedInput.dataset.text, changedInput.value);
				if (controlChildCheck(node)) {
					var parent = node.querySelector('.parent-item input[type="checkbox"]');
					parent.checked = true;
					result.push(parent.value);
					renderItem(pseudoInput, parent.dataset.text, parent.value);
				}
				resultInput.value = result.join(',');
				controlPlaceholder(result, pseudoInput);
			} else if (checkboxContainer.classList.contains('parent-item')) {
				children = node.querySelectorAll('input[type="checkbox"]');
				for (var i = 0; i < children.length; i++) {
					children[i].checked = true;
					if (result.indexOf(children[i].value) < 0) {
						result.push(children[i].value);
						renderItem(pseudoInput, children[i].dataset.text, children[i].value);
					}
				}
				resultInput.value = result.join(',');
				controlPlaceholder(result, pseudoInput);
			}
		} else {
			if (checkboxContainer.classList.contains('child-item')) {
				result.splice(result.indexOf(changedInput.value), 1);
				// removeItem(pseudoInput, changedInput.value);
				pseudoInput.removeChild(pseudoInput.querySelector('[data-value="' + changedInput.value + '"]'));
				if (!controlChildCheck(node)) {
					var parent = node.querySelector('.parent-item input[type="checkbox"]');
					parent.checked = false;
					if (result.indexOf(parent.value) >= 0) {
						result.splice(result.indexOf(parent.value), 1);
						// removeItem(pseudoInput, parent.value);
						pseudoInput.removeChild(pseudoInput.querySelector('[data-value="' + parent.value + '"]'));
					}
				}
				resultInput.value = result.join(',');
				controlPlaceholder(result, pseudoInput);
			} else if (checkboxContainer.classList.contains('parent-item')) {
				children = node.querySelectorAll('input[type="checkbox"]');
				for (var i = 0; i < children.length; i++) {
					children[i].checked = false;
					result.splice(result.indexOf(children[i].value), 1);
					pseudoInput.removeChild(pseudoInput.querySelector('[data-value="' + children[i].value + '"]'));
					// removeItem(pseudoInput, children[i].value);
					resultInput.value = result.join(',');
				}
				controlPlaceholder(result, pseudoInput);
			}
		}
	}

	/*
	 * @param {Array} result - array of checked inputs
	 */
	function renderItem(pseudoInput, text, value) {
		var item = document.createElement('div');
		item.className = 'pseudo-item';
		item.dataset.value = value;
		item.innerHTML = '<span>' + text + '</span><i class="fa fa-times"></i>';
		var close = item.querySelector('i');
		close.addEventListener('click', function () {
			removeItem(pseudoInput, value);
		});
		pseudoInput.appendChild(item);
	}

	function removeItem(pseudoInput, value) {
		var element = pseudoInput.closest(SelectTree.defaults.selector),
			item = pseudoInput.querySelector('[data-value="' + value + '"]'),
			checkbox = element.querySelector('.select-tree-options input[value="' + value + '"]'),
			checkboxContainer = checkbox.parentElement,
			node = checkboxContainer.closest('.select-tree-node'),
			resultInput = element.querySelector('input[type="hidden"]'),
			result = resultInput.value ? resultInput.value.split(',') : [];


		if (checkboxContainer.classList.contains('child-item')) {
			checkbox.checked = false;
			pseudoInput.removeChild(item);
			result.splice(result.indexOf(checkbox.value), 1);
			if (!controlChildCheck(node)) {
				var parent = node.querySelector('.parent-item input[type="checkbox"]');
				parent.checked = false;
				if (result.indexOf(parent.value) >= 0) {
					result.splice(result.indexOf(parent.value), 1);
					pseudoInput.removeChild(pseudoInput.querySelector('[data-value="' + parent.value + '"]'));
				}
			}
			resultInput.value = result.join(',');
			controlPlaceholder(result, pseudoInput);
		} else if (checkboxContainer.classList.contains('parent-item')) {
			children = node.querySelectorAll('input[type="checkbox"]');
			for (var i = 0; i < children.length; i++) {
				children[i].checked = false;
				if (result.indexOf(children[i].value) >= 0 ) {
					result.splice(result.indexOf(children[i].value), 1);
					pseudoInput.removeChild(pseudoInput.querySelector('[data-value="' + children[i].value + '"]'));
				}
				resultInput.value = result.join(',');
			}
			controlPlaceholder(result, pseudoInput);
		}
	}

	function updateScroll() {
		$(SelectTree.defaults.selector).find('.select-tree-box').getNiceScroll().resize();
	}

	SelectTree.defaults = { //Дефолтные настройки
		selector: '.select-tree',
		activateWithParent: true,
		placeholderClass: '.placeholder'
	};

	/*
	 * Если все дочерние чекбоксы активированы, то активирует родительский, иначе деактивирует
	 * @return boolean true - если все все дочерние эл-мы активированы, false - в противном случае
	 */
	function controlChildCheck(node) {
		var children = node.querySelectorAll('.child-item input[type="checkbox"]'),
			counter = 0;
		for (var i = 0; i < children.length; i++) {
			if (children[i].checked) counter++;
		}
		return counter === children.length;
	}

	/*
	 * Если все дочерние чекбоксы активированы, то активирует родительский, иначе деактивирует
	 * @return boolean true - если все все дочерние эл-мы активированы, false - в противном случае
	 */
	function controlPlaceholder(result, pseudoInput) {
		var placeholder = pseudoInput.querySelector(SelectTree.defaults.placeholderClass);
		if (typeof(placeholder) !== 'undefined' && placeholder !== null) {
			if (result.length) {
				placeholder.classList.add('hide');
			} else {
				placeholder.classList.remove('hide');
			}
		}
	}

	window.SelectTree = SelectTree;

	function mergeObjects() { // эувивалент object.assign
		var resObj = {};
		for(var i=0; i < arguments.length; i += 1) {
			var obj = arguments[i],
				keys = Object.keys(obj);
			for(var j=0; j < keys.length; j += 1) {
				resObj[keys[j]] = obj[keys[j]];
			}
		}
		return resObj;
	}

})();

(function() {

	// проверяем поддержку
	if (!Element.prototype.closest) {

		// реализуем
		Element.prototype.closest = function(css) {
			var node = this;

			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}

})();
