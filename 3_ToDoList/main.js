window.addEventListener('load', () => {
    const form = document.querySelector('.new-task-container');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('.task-list');
    const body = document.querySelector('body');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = input.value;
        if (task) {
            const task_div_el = document.createElement('div');
            task_div_el.classList.add('task');

            const content_el = document.createElement('div');
            content_el.classList.add('content')
            
            task_div_el.appendChild(content_el);

            const text_el = document.createElement('input');
            text_el.classList.add('text');
            text_el.type = 'text';
            text_el.setAttribute('readonly', 'readonly');
            text_el.value = task;
            
            content_el.appendChild(text_el);

            const buttons_el = document.createElement('div');
            buttons_el.classList.add('buttons');

            task_div_el.appendChild(buttons_el);

            const edit_button_el = document.createElement('button');
            edit_button_el.classList.add('edit');
            edit_button_el.innerText = 'EDIT';

            buttons_el.appendChild(edit_button_el);
            
            const delete_button_el = document.createElement('button');
            delete_button_el.classList.add('delete');
            delete_button_el.innerText = 'X';
            
            buttons_el.appendChild(delete_button_el);

            list_el.appendChild(task_div_el);

            console.log(list_el.childElementCount)
            edit_button_el.addEventListener('click', () => {
                if (text_el.getAttribute('readonly')) {
                    text_el.removeAttribute('readonly');
                    edit_button_el.classList.add('save');
                    edit_button_el.innerText = 'SAVE';
                } 
                
                else {
                    text_el.setAttribute('readonly', 'readonly');
                    edit_button_el.classList.remove('save');
                    edit_button_el.innerText = 'EDIT';
                }
            });

            delete_button_el.addEventListener('click', () => {
                list_el.removeChild(task_div_el);
            });
            
            const clear_button = document.querySelector('.clear');
            clear_button.addEventListener('click', () => {
                body.style.height = "100vh";
                while(list_el.firstChild) {
                    list_el.removeChild(list_el.lastChild);
                }
            });

            input.value = '';

            if(list_el.childElementCount >= 8) {
                body.style.height = "100%";
            }

        }
        else {
            const error_el = document.createElement('div');
            error_el.classList.add('error-container');
        }
    });
});