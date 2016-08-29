var ModalBuilder = function(formId) {
    var modalUniqueId = 'pszt_modal_' + Math.round(Math.random() * 1000);
    var form = document.getElementById(formId);

    var validateInputs = function (inputsObject) {
        var errorMessages = [];
        for(var i in inputsObject) {
            if (!inputsObject[i].value.trim().length) {
                errorMessages.push('Please fill ' + i + ' value');
            }
        }

        return errorMessages.length ? errorMessages : true;
    };

    var windowClickEvent = function(event){
        if (event.target == document.getElementById(modalUniqueId)) {
            event.preventDefault();
            closePopup();
        }
    };

    var windowKeyUpEvent = function(event){
        if (event.keyCode == 27) {
            event.preventDefault();
            closePopup();
        }
    };

    var closePopup = function() {
        var modalDiv = document.getElementById(modalUniqueId);
        if (modalDiv) {
            form.removeChild(modalDiv);
            window.removeEventListener('click', windowClickEvent);
            window.removeEventListener('keyup', windowKeyUpEvent);
        }
    };

    var createModalDomObject = function(inputsObject) {
        closePopup();

        var modalDiv = document.createElement('div');
        modalDiv.id = modalUniqueId;
        modalDiv.className = 'modal';

        var modalContentDiv = document.createElement('div');
        modalContentDiv.className = 'modal-content';

        var modalHeaderDiv = document.createElement('div');
        modalHeaderDiv.className = 'modal-header';
        modalHeaderDiv.innerHTML = '<span class="close">x</span><h2>' + inputsObject.title.value + '</h2>';
        modalContentDiv.appendChild(modalHeaderDiv);

        var modalBodyDiv = document.createElement('div');
        modalBodyDiv.className = 'modal-body';
        modalBodyDiv.innerHTML = '<p>' + inputsObject.body.value + '</p>';
        modalContentDiv.appendChild(modalBodyDiv);

        var modalFooterDiv = document.createElement('div');
        modalFooterDiv.className = 'modal-footer';

        var buttons = inputsObject.buttons.value.split(',');
        for(var i in buttons) {
            var buttonTitle = buttons[i];
            if (buttonTitle.trim().length) {
                modalFooterDiv.innerHTML += '<button type="button">' + buttonTitle + '</button>';
            }
        }

        modalContentDiv.appendChild(modalFooterDiv);

        modalDiv.appendChild(modalContentDiv);

        form.appendChild(modalDiv);

        var closeBtn = document.getElementsByClassName("close")[0];
        closeBtn.addEventListener('click', function(event){
            event.preventDefault();
            closePopup();
        });

        window.addEventListener('click', windowClickEvent);
        window.addEventListener('keyup', windowKeyUpEvent);

    };

    if (form) {
        form.addEventListener('submit', function(event){
            event.preventDefault();
            var inputsObject = {
                title   : document.getElementById('modal-title'),
                body    : document.getElementById('modal-body'),
                buttons : document.getElementById('modal-buttons')
            };

            var validationResponse = validateInputs(inputsObject);

            if (validationResponse === true) {
                createModalDomObject(inputsObject);
            } else {
                alert(validationResponse.join("\n"));
            }
        });
    }
};