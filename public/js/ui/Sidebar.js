/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
    /**
     * Запускает initAuthLinks и initToggleButton
     * */
    static init() {
        this.initAuthLinks();
        this.initToggleButton();
    }

    /**
     * Отвечает за скрытие/показа боковой колонки:
     * переключает два класса для body: sidebar-open и sidebar-collapse
     * при нажатии на кнопку .sidebar-toggle
     * */
    static initToggleButton() {
        const body = document.body;
        const sidebarButton = document.querySelector('.sidebar-toggle');

        sidebarButton.onclick = function (e) {
            e.preventDefault();
            body.classList.toggle('sidebar-open');
            body.classList.toggle('sidebar-collapse');
        }
    }

    /**
     * При нажатии на кнопку входа, показывает окно входа
     * (через найденное в App.getModal)
     * При нажатии на кнопку регастрации показывает окно регистрации
     * При нажатии на кнопку выхода вызывает User.logout и по успешному
     * выходу устанавливает App.setState( 'init' )
     * */
    static initAuthLinks() {
        const menuItem = document.querySelectorAll('.menu-item');

        for (let item of menuItem) {
            item.onclick = function (e) {
                e.preventDefault();
                const current = e.currentTarget;
                if (current.classList.contains('menu-item_login')) {
                    App.getModal('login').open();
                } else if (current.classList.contains('menu-item_register')) {
                    App.getModal('register').open();
                } else if (current.classList.contains('menu-item_logout')) {
                    User.logout(
                        function (err, response) {
                            if (err === null && response.success) {
                                User.unsetCurrent()
                            }
                        }
                    )
                    App.setState('init');
                }
            }
        }
    }
}