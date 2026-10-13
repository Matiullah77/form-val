
(() => {
    'use strict';

    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            updatePasswordMatch(form);

            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
            updateValidationClasses(form);
        }, false);

        form.addEventListener('input', () => {
            updatePasswordMatch(form);

            if (form.classList.contains('was-validated')) {
                updateValidationClasses(form);
            }
        });

        form.addEventListener('change', () => {
            updatePasswordMatch(form);

            if (form.classList.contains('was-validated')) {
                updateValidationClasses(form);
            }
        });

        form.addEventListener('reset', () => {
            window.setTimeout(() => {
                form.classList.remove('was-validated');

                form.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
                    field.classList.remove('is-valid', 'is-invalid');
                });

                updatePasswordMatch(form);
            }, 0);
        });
    });

    function updatePasswordMatch(form) {
        const password = form.querySelector('#password4');
        const confirmPassword = form.querySelector('#confirmPassword4');

        if (password && confirmPassword) {
            if (confirmPassword.value === '') {
                confirmPassword.setCustomValidity('');
            } else if (password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity('Passwords do not match.');
            } else {
                confirmPassword.setCustomValidity('');
            }
        }
    }

    function updateValidationClasses(form) {
        const fields = form.querySelectorAll('input, textarea, select');

        fields.forEach(field => {
            if (field.type === 'radio') {
                const group = form.querySelectorAll(
                    'input[type="radio"][name="' + field.name + '"]'
                );

                const groupIsValid = Array.from(group).some(radio => radio.checked);

                group.forEach(radio => {
                    radio.classList.remove('is-valid', 'is-invalid');

                    if (form.classList.contains('was-validated')) {
                        radio.classList.add(
                            groupIsValid ? 'is-valid' : 'is-invalid'
                        );
                    }
                });

                return;
            }

            field.classList.remove('is-valid', 'is-invalid');

            if (form.classList.contains('was-validated')) {
                field.classList.add(
                    field.checkValidity() ? 'is-valid' : 'is-invalid'
                );
            }
        });
    }
})();
