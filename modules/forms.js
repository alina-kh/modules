import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    //forms

    const forms = document.querySelectorAll(formSelector);
    const mess = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо. Скоро мы с Вами  свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMess = document.createElement('img');
            statusMess.src = mess.loading;
            statusMess.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
            form.insertAdjacentElement('afterend', statusMess);

            const formData = new FormData(form);

            const json = JSON.stringify(Object(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(mess.success);
                    statusMess.remove();
                }).catch(() => {
                    showThanksModal(mess.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

      
    function showThanksModal(mess) {
        const prevModalDialog = document.querySelector('.modal__dialog');
           
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>×</div>
				<div class="modal__title">${mess}</div>
			</div>
		`;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

}

export default forms;